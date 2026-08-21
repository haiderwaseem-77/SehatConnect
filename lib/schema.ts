import { SITE_URL, SOCIAL_PROFILES, WHATSAPP_NUMBER } from "./constants";

/**
 * Shared JSON-LD helpers.
 *
 * Every structured-data block on the site is built from these so that the
 * business identity Google reads is byte-identical everywhere. Inconsistent
 * NAP or a business that describes itself differently page to page is exactly
 * the kind of quiet signal-splitting that caps local ranking.
 */

/** 24/7, in schema.org's opening-hours shorthand. */
export const OPENING_HOURS = "Mo-Su 00:00-23:59";

/**
 * `sameAs` — the other places on the web that are demonstrably the same business.
 *
 * WhatsApp is always present because the number is verifiable today. Social and
 * directory profiles are appended from SOCIAL_PROFILES as they get created;
 * until then the array is just the WhatsApp link. Never list a profile here
 * before it exists and is live — a 404 in `sameAs` is worse than an absent one.
 */
export function businessSameAs(): string[] {
  return [`https://wa.me/${WHATSAPP_NUMBER}`, ...SOCIAL_PROFILES];
}

export type Crumb = {
  /** Label, e.g. "Services". Also the value emitted in BreadcrumbList JSON-LD. */
  name: string;
  /**
   * Urdu label for the visible trail. REQUIRED, even though the JSON-LD ignores
   * it. It was optional briefly, and the result was three area pages rendering
   * "DHA" / "Gulberg" / "Johar Town" inside the Urdu layer with no visible
   * error — a silent English fallback is the worst kind of bilingual bug,
   * because nothing looks broken. Let the compiler catch it instead.
   */
  nameUr: string;
  /** Path relative to the site root, e.g. "/services". Omit for the current page. */
  path?: string;
};

/**
 * Build a BreadcrumbList. "Home" is prepended automatically, so callers pass
 * only the trail below it.
 *
 *   breadcrumbList([{ name: "Services", path: "/services" }, { name: "Qualified Nurse" }])
 *
 * The final crumb is the current page and carries no `item`, per Google's
 * guidance that the last element may omit the URL.
 */
export function breadcrumbList(trail: Crumb[]) {
  const crumbs: Crumb[] = [{ name: "Home", nameUr: "ہوم", path: "" }, ...trail];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      ...(i < crumbs.length - 1 ? { item: `${SITE_URL}${crumb.path ?? ""}` } : {}),
    })),
  };
}
