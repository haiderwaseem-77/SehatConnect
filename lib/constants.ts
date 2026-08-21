// Canonical domain — used for canonical URLs, sitemap, robots, and JSON-LD.
// mysehatconnect.com is the FINAL and ONLY domain (decided 2026-08-21). There is no
// interim domain and no second host: the non-www apex is canonical, and www must 301
// to it at the DNS/Vercel layer. Every canonical tag, sitemap entry, JSON-LD `url`,
// OG URL, and external citation points at this exact string — one host, forever, so
// no link equity is ever split. Do not add a trailing slash.
export const SITE_URL = "https://mysehatconnect.com";

// Prices are HIDDEN from every public surface (UI, SEO/JSON-LD, WhatsApp
// prefills) as of 2026-07-02 — partner decision, see NORTH-STAR Decision
// Ledger. Do NOT render these values anywhere; they are kept here only so
// pricing can be restored later without re-deriving them. Use
// PROMISES.priceOnCall for the public-facing copy instead.
export const PRICES = {
  qualified_nurse: 4000,
  attendant: 3000,
};

// ---------------------------------------------------------------------------
// PROMISES — canonical promise copy (2026-07-02 Decision Ledger update).
// Every load-bearing promise on the site must match one of these verbatim,
// in both languages — import from here, never hardcode or paraphrase a
// promise string in a component.
// ---------------------------------------------------------------------------
export interface PromiseCopy {
  en: string;
  ur: string;
}

export interface TrialPromiseCopy extends PromiseCopy {
  /** Short form for compact UI (badges, chips). */
  enShort: string;
  urShort: string;
}

export interface PromisesShape {
  /** NEW 2026-07-02 — first day is a free, no-obligation trial. */
  trial: TrialPromiseCopy;
  /**
   * UPGRADED 2026-07-02 — supersedes the old "Not comfortable after the
   * first shift? Tell us — we send someone else." everywhere it appeared.
   * The new version drops the "first shift" limit and promises repeat,
   * free replacement until the family is satisfied.
   */
  replacement: PromiseCopy;
  /**
   * NEW 2026-07-02 — replaces any on-site shown price now that PRICES is
   * hidden from public surfaces (see comment above).
   */
  priceOnCall: PromiseCopy;
  /** Unchanged (NORTH-STAR §3) — kept here so components import it instead
   * of re-hardcoding it. */
  payment: PromiseCopy;
}

export const PROMISES: PromisesShape = {
  trial: {
    en: "Your first day is free — no cost, no obligation. Continue only if you're happy.",
    ur: "پہلا دن مفت ہے؛ پسند آئے تو ہی آگے جاری رکھیں۔",
    enShort: "First day free",
    urShort: "پہلا دن مفت",
  },
  replacement: {
    en: "Not comfortable? Tell us — we replace the caregiver, free, until you're fully satisfied.",
    ur: "اطمینان نہ ہو تو بتائیں؛ ہم نرس یا اٹینڈنٹ مفت بدلتے رہیں گے، جب تک آپ مطمئن نہ ہوں۔",
  },
  priceOnCall: {
    en: "We tell you the exact price on the first call — before care starts. No fine print, no surprises.",
    ur: "صحیح قیمت پہلی کال پر، کام شروع ہونے سے پہلے بتا دیں گے۔ کوئی چھپی ہوئی شرط نہیں۔",
  },
  payment: {
    en: "No advance. Pay after the shift.",
    ur: "کوئی پیشگی ادائیگی نہیں۔ ادائیگی شفٹ کے بعد۔",
  },
};

export const QUALIFIED_NURSE_SERVICES = [
  { id: 'post_op_care',    label: 'Post-op Care',    urdu: 'آپریشن کے بعد دیکھ بھال', icon: 'Activity',    description: 'Wound care, dressing changes, and recovery support after surgery', descriptionUrdu: 'زخم کی دیکھ بھال، ڈریسنگ کی تبدیلی اور ریکوری میں مدد' },
  { id: 'elderly_care',    label: 'Elderly Care',    urdu: 'بزرگوں کی دیکھ بھال',    icon: 'Heart',        description: 'Help with medicines, movement, and day-to-day health monitoring for elderly patients', descriptionUrdu: 'دواؤں، چلنے پھرنے اور روزمرہ صحت کی نگرانی میں مدد' },
  { id: 'paediatric_care', label: 'Paediatric Care', urdu: 'بچوں کی نرسنگ',      icon: 'Baby',         description: 'Nursing care for newborns, infants, and young children at home', descriptionUrdu: 'نومولود، شیر خوار اور کم عمر بچوں کی گھر پر نرسنگ' },
  { id: 'icu_stepdown',    label: 'ICU Step-down',   urdu: 'آئی سی یو کے بعد دیکھ بھال',       icon: 'HeartPulse',   description: 'Care for patients coming home after a stay in ICU or HDU', descriptionUrdu: 'آئی سی یو یا ایچ ڈی یو سے گھر آنے والے مریض کی دیکھ بھال' },
  { id: 'night_duty',      label: 'Night Duty',      urdu: 'رات کی ڈیوٹی',           icon: 'Moon',         description: 'A nurse stays through the night to monitor and care for your patient', descriptionUrdu: 'رات بھر مریض کی نگرانی اور دیکھ بھال' },
  { id: 'diabetic_care',   label: 'Diabetic Care',   urdu: 'شوگر کی دیکھ بھال',   icon: 'Droplets',     description: 'Blood sugar checks, insulin injections, and diet guidance for diabetic patients', descriptionUrdu: 'شوگر چیک، انسولین اور خوراک کے بارے میں رہنمائی' },
  { id: 'mother_baby_care', label: 'Mother & Baby Care', urdu: 'ماں اور بچے کی دیکھ بھال', icon: 'Baby',     description: 'Newborn care plus postnatal support for new mothers — feeding, recovery, and hygiene at home', descriptionUrdu: 'نوزائیدہ بچے اور زچگی کے بعد ماں کی مدد' },
  { id: 'dementia_care',   label: "Dementia & Alzheimer's Care", urdu: 'ڈیمنشیا اور الزائمر کی دیکھ بھال', icon: 'Brain', description: "Patient, specialised care for dementia and Alzheimer's patients — routine, safety, and companionship", descriptionUrdu: 'روٹین، حفاظت اور نرم مزاج ساتھ' },
  { id: 'palliative_care', label: 'Palliative & Long-term Care', urdu: 'طویل مدتی آرام دہ نگہداشت', icon: 'HandHeart', description: 'Comfort-focused nursing for cancer, stroke, and long-term patients, including pain and symptom management', descriptionUrdu: 'درد، علامات اور روزمرہ آرام میں مدد' },
];

export const ATTENDANT_SERVICES = [
  { id: 'elderly_care',    label: 'Elderly Care',    urdu: 'بزرگوں کی روزمرہ دیکھ بھال',  icon: 'Heart',    description: 'Helping elderly patients with feeding, hygiene, movement, and daily routines', descriptionUrdu: 'کھانا، صفائی، چلنے پھرنے اور روزمرہ معمولات میں مدد' },
  { id: 'paediatric_care', label: 'Paediatric Care', urdu: 'بچوں کی روزمرہ دیکھ بھال',    icon: 'Baby',     description: 'Non-clinical care and support for children at home', descriptionUrdu: 'بچوں کے لیے گھر پر غیر طبی دیکھ بھال اور نگرانی' },
  { id: 'night_duty',      label: 'Night Duty',      urdu: 'رات کی ڈیوٹی',         icon: 'Moon',     description: 'An attendant stays through the night to keep your patient comfortable and safe', descriptionUrdu: 'رات بھر آرام، حفاظت اور بنیادی دیکھ بھال کا خیال' },
];

export const CITIES = [
  { en: 'Lahore', ur: 'لاہور' },
  { en: 'Karachi', ur: 'کراچی' },
  { en: 'Islamabad', ur: 'اسلام آباد' },
  { en: 'Rawalpindi', ur: 'راولپنڈی' },
  { en: 'Faisalabad', ur: 'فیصل آباد' },
];

export const LIVE_CITIES = ['Lahore'];

export const SHIFTS = [
  { id: 'morning', label: 'Day',   time: '8:00 AM – 8:00 PM' },
  { id: 'night',   label: 'Night', time: '8:00 PM – 8:00 AM' },
];

export const WHATSAPP_NUMBER = '923288489988';
export const CONTACT_PHONE_DISPLAY = '0328-8489988';
export const CONTACT_PHONE_TEL = '+923288489988';
// Office address — the single NAP (name/address/phone) source of truth.
// Updated 2026-08-21: supersedes the former Phase 6 address entirely. The old
// address must not appear anywhere — site, citations, GBP or docs.
// This exact string is what goes into Google Business Profile and every citation;
// they must match it character for character or local ranking signals fragment.
export const OFFICE_ADDRESS = '4th Floor, 26-T, Commercial Area, DHA Phase 8, Lahore, Pakistan';
export const CONTACT_EMAIL = 'care@mysehatconnect.com';

/**
 * Social and directory profiles for JSON-LD `sameAs`.
 *
 * EMPTY ON PURPOSE. These profiles do not exist yet — creating them is the
 * "Citations batch 1" task (Facebook, Instagram, LinkedIn, Bing Places, Apple
 * Business Connect), followed by the Google Business Profile.
 *
 * Add each URL here only once the profile is LIVE and shows this exact business
 * name, address and phone. A `sameAs` entry pointing at a 404 or at a profile
 * whose NAP disagrees with OFFICE_ADDRESS actively hurts — it tells Google our
 * identity is inconsistent. One wrong entry is worse than an empty array.
 */
export const SOCIAL_PROFILES: string[] = [];

// Structured (schema.org PostalAddress) form of OFFICE_ADDRESS — single source of
// truth so every JSON-LD block on the site emits an identical, NAP-consistent address.
// NOTE: postalCode is intentionally omitted. The former value (54920) belonged to
// the old Phase 6 address and is wrong for Phase 8. Rather than guess a replacement,
// we ship without it — schema.org treats postalCode as optional, and a WRONG code is
// far more damaging to NAP consistency than a missing one. Add it here once the real
// Phase 8 code is confirmed from Google Business Profile.
export const OFFICE_POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "4th Floor, 26-T, Commercial Area, DHA Phase 8",
  addressLocality: "Lahore",
  addressRegion: "Punjab",
  addressCountry: "PK",
} as const;

export const FAQ_ITEMS = [
  {
    q: 'Are all nurses Pakistan Nursing Council registered?',
    a: 'Yes. Every Qualified Nurse has a PNC registration number checked by our team. Every caregiver is CNIC checked, references called, police-verified.',
  },
  {
    q: 'Can I request a specific nurse again?',
    a: 'Yes. If you liked a caregiver, send us their name on WhatsApp. We will try to send the same person again.',
  },
  {
    q: 'What is the difference between a Qualified Nurse and an Attendant?',
    a: 'A Qualified Nurse is PNC registered and can perform clinical tasks such as wound dressing, IV care, and medication administration. An Attendant provides non-clinical support — feeding, hygiene, companionship, and general patient comfort.',
  },
  {
    q: 'How do I pay?',
    a: 'Cash after the shift. No advance. Easypaisa and JazzCash payments are coming soon.',
  },
  {
    q: 'What if I need to cancel or reschedule?',
    a: 'Just call or WhatsApp us up to 4 hours before the shift and we will cancel or reschedule it at no charge.',
  },
  {
    q: 'Is the service available outside major cities?',
    a: 'Right now we serve all of Lahore: DHA, Gulberg, Johar Town, Model Town, Bahria Town, Cantt and more. Call or WhatsApp us to check your area.',
  },
  {
    q: 'Can I request a female nurse specifically?',
    a: 'Yes, of course. Many families prefer a female caregiver for a female patient. Just tell us when we call and we will send a female nurse or attendant.',
  },
  {
    q: 'What happens if the nurse doesn\'t arrive on time?',
    a: 'We confirm the arrival time with you in advance and message you when your caregiver is on the way. If anyone is running late, our team calls you and sorts it out right away — a real person is always just a call or WhatsApp away.',
  },
];

// ---------------------------------------------------------------------------
// Promise copy that is law in NORTH-STAR §3 but had no bilingual home in
// PROMISES yet. Appended 2026-08-21 for /charges. The English strings are
// VERBATIM from the NORTH-STAR §3 promises table — do not soften or
// strengthen them:
//   - "usually" in the callback promise is mandatory (Decision Ledger #4);
//     never print a bare "within 15 minutes" until ops data proves it.
//   - "can start" keeps the 24-hour promise honest.
//   - the verification promise always names all three checks.
// ---------------------------------------------------------------------------
export const CALLBACK_PROMISE: PromiseCopy = {
  en: "We call back fast — usually within 15 minutes.",
  ur: "ہم جلد واپس کال کرتے ہیں — عموماً 15 منٹ کے اندر۔",
};

export const START_PROMISE: PromiseCopy = {
  en: "Care can start within 24 hours of your call.",
  ur: "دیکھ بھال آپ کی کال کے 24 گھنٹوں کے اندر شروع ہو سکتی ہے۔",
};

export const VERIFICATION_PROMISE: PromiseCopy = {
  en: "Every caregiver: CNIC checked, references called, police-verified — before they enter your home.",
  ur: "ہر نرس یا اٹینڈنٹ کا شناختی کارڈ اور حوالہ جات چیک ہوتے ہیں، اور پولیس تصدیق بھی — گھر میں داخل ہونے سے پہلے۔",
};
