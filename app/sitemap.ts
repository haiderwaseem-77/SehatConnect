import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { MetadataRoute } from "next";
import { LIVE_CITIES, SITE_URL } from "@/lib/constants";

/**
 * The sitemap derives its static routes from the filesystem rather than a
 * hand-kept list.
 *
 * It used to be a hardcoded array, and it drifted exactly as you would expect:
 * /services/long-term-care, /services/female-nurse, /services/male-nurse and
 * /services/mother-baby-care all shipped and none of them were in the sitemap.
 * A page Google is never told about is a page that took a day to write and earns
 * nothing. Walking `app/` means a new route is listed the moment it exists, and
 * no one has to remember a second place.
 *
 * Dynamic routes (`[city]`) can't be enumerated this way and are added below
 * from LIVE_CITIES, which is the same list that decides which cities are
 * indexable in the first place.
 */

/** Routes that exist but must never be indexed. Keep the reason with each one. */
const EXCLUDED = new Set([
  "/book/confirm", // post-submit confirmation — noindex by design
]);

/**
 * Priority is editorial, so it stays explicit. Anything unlisted gets the
 * default: a real page, but not one of the pages we most want ranked.
 */
const PRIORITY: Record<string, number> = {
  "/": 1.0,
  "/services": 0.9,
  "/services/qualified-nurse": 0.9,
  "/services/attendant": 0.9,
  "/services/injection-drip": 0.9,
  "/services/post-operative-care": 0.9,
  "/services/elderly-care": 0.9,
  "/charges": 0.9,
  "/care-from-abroad": 0.8,
  "/book": 0.8,
};
const DEFAULT_PRIORITY = 0.7;

const WEEKLY = new Set(["/", "/services", "/charges"]);

/** Every static route under `app/`, as URL paths. */
function staticRoutes(dir: string, prefix = ""): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    // Dynamic segments, route groups, private folders and the API tree are not
    // indexable pages.
    if (name.startsWith("[") || name.startsWith("(") || name.startsWith("_") || name === "api") {
      continue;
    }
    const route = `${prefix}/${name}`;
    const child = join(dir, name);
    if (readdirSync(child).includes("page.tsx")) out.push(route);
    out.push(...staticRoutes(child, route));
  }
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const now = new Date();

  const appDir = join(process.cwd(), "app");
  const routes = ["/", ...staticRoutes(appDir)].filter((r) => !EXCLUDED.has(r));

  const staticPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: route === "/" ? base : `${base}${route}`,
    lastModified: now,
    changeFrequency: WEEKLY.has(route) ? ("weekly" as const) : ("monthly" as const),
    priority: PRIORITY[route] ?? DEFAULT_PRIORITY,
  }));

  // Only live cities (Lahore) appear; the not-yet-live cities are noindexed
  // "coming soon" pages and stay out of the sitemap until they launch.
  const cityPages: MetadataRoute.Sitemap = LIVE_CITIES.map((city) => ({
    url: `${base}/cities/${city.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...cityPages].sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0) || a.url.localeCompare(b.url),
  );
}
