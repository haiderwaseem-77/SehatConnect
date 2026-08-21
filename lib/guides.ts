import type { PromiseCopy } from "./constants";

/**
 * The guides index.
 *
 * URL shape is `/guides/<slug>` — deliberately not `/blog/`. NORTH-STAR §12 caps
 * these at roughly one a month, written from real ops experience: "blog" signals
 * volume publishing, which is the opposite of the intent, and thin filler pages
 * would damage exactly the trust the rest of the site is built on.
 *
 * Declared here rather than in each page file so the index, the sitemap and the
 * cross-links between guides all read from one list. Add a guide here first,
 * then create `app/guides/<slug>/page.tsx`.
 */
export interface Guide {
  slug: string;
  /** Short label for cards and cross-links — not the page's full <title>. */
  name: PromiseCopy;
  /** One-line summary shown on the index card. */
  dek: PromiseCopy;
}

export const GUIDES: Guide[] = [
  {
    slug: "nurse-or-attendant",
    name: {
      en: "Nurse or attendant — which does your patient need?",
      ur: "نرس یا اٹینڈنٹ — آپ کے مریض کو کس کی ضرورت ہے؟",
    },
    dek: {
      en: "The question families ask on every first call, answered with real situations.",
      ur: "ہر پہلی کال پر پوچھا جانے والا سوال، اصل حالات کے ساتھ سمجھایا گیا۔",
    },
  },
  {
    slug: "post-operative-care-checklist",
    name: {
      en: "Bringing someone home after surgery: a checklist",
      ur: "آپریشن کے بعد گھر لانا: ایک چیک لسٹ",
    },
    dek: {
      en: "What to prepare, what to watch for, and when to call someone.",
      ur: "کیا تیار رکھنا ہے، کس چیز پر نظر رکھنی ہے، اور کب کسی کو بلانا ہے۔",
    },
  },
  {
    slug: "elderly-care-at-home",
    name: {
      en: "Elderly care at home in Lahore: what to expect",
      ur: "لاہور میں بزرگوں کی گھر پر دیکھ بھال: کیا توقع رکھیں",
    },
    dek: {
      en: "What a caregiver actually does, what changes over time, and how families cope.",
      ur: "کیئر گیور اصل میں کیا کرتا ہے، وقت کے ساتھ کیا بدلتا ہے، اور گھر والے کیسے سنبھالتے ہیں۔",
    },
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
