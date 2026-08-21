import type { PromiseCopy } from "./constants";

/**
 * Lahore areas with their own page.
 *
 * DELIBERATELY THREE, not seven. Seven near-identical pages for one city is the
 * doorway-page pattern Google discounts, and they would cannibalise each other
 * and /cities/lahore for the same terms. Three that each say something only true
 * of that area beat seven that could swap names and still read correctly — that
 * swap test is the bar for adding a fourth.
 *
 * Why area pages matter here specifically: map-pack rank falls off with distance
 * from the office, and the office is in DHA Phase 8 on the city's eastern edge.
 * Gulberg and Johar Town are far enough that proximity works against us, so an
 * area page plus reviews naming that area are the levers we actually have.
 *
 * `hospitals` are real, verified Lahore hospitals in or beside each area. They
 * appear ONLY as "families call us after discharge from…" — a factual statement
 * about our patients. Never as partnership, affiliation or endorsement: we have
 * no relationship with any of them, and implying one invites a complaint.
 */
export interface Area {
  slug: string;
  /**
   * Whether `app/areas/<slug>/page.tsx` actually exists yet.
   *
   * Mirrors the LIVE_CITIES pattern in lib/constants.ts: a declared area is not
   * a published one. Only live areas enter the sitemap or get linked from the
   * index, so a half-built area can never advertise a URL that 404s. Flip to
   * true in the same commit that adds the page.
   */
  live: boolean;
  name: PromiseCopy;
  /** Hospitals in or adjacent to this area. Verified names only — never invent one. */
  hospitals: string[];
  /** What is true of this area and no other — the anti-doorway anchor. */
  distinct: string;
}

export const AREAS: Area[] = [
  {
    slug: "dha",
    live: true,
    name: { en: "DHA", ur: "ڈی ایچ اے" },
    hospitals: ["National Hospital & Medical Centre", "CMH Lahore"],
    distinct:
      "Our office is in DHA Phase 8, so this is the area we reach fastest. Do not attach a number to that — no measured response times exist yet.",
  },
  {
    slug: "gulberg",
    live: true,
    name: { en: "Gulberg", ur: "گلبرگ" },
    hospitals: ["Surgimed Hospital", "Fatima Memorial Hospital", "Hameed Latif Hospital"],
    distinct:
      "Dense, older, well-served by private hospitals. Many families here are arranging care for a parent who has lived in the same house for decades.",
  },
  {
    slug: "johar-town",
    live: true,
    name: { en: "Johar Town", ur: "جوہر ٹاؤن" },
    hospitals: ["Doctors Hospital", "Shaukat Khanum Memorial Cancer Hospital", "Omar Hospital & Cardiac Centre"],
    distinct:
      "Home to the city's biggest private and cancer hospitals, so a large share of requests here are post-surgery and post-treatment care after discharge.",
  },
];

export const LIVE_AREAS = AREAS.filter((a) => a.live);

export const areaBySlug = (slug: string) => AREAS.find((a) => a.slug === slug);
