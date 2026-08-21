// /services/male-nurse — "male nurse at home Lahore" (keyword-map row: primary
// phrase "male nurse at home Lahore", Roman Urdu "male nurse ghar par").
// Owner confirmed 2026-08-21 that male nurses ARE on the roster, which unblocked
// this row. This page describes a real, available service.
//
// WHY THIS PAGE EXISTS, AND WHY IT IS NOT THE FEMALE PAGE WITH A WORD SWAPPED:
// somebody typing "male nurse at home Lahore" is usually arranging care for a
// MAN who has to be lifted, turned, or helped to the bathroom — a father after a
// stroke or a fall, a heavy patient who cannot bear his own weight — or for an
// older man who would not be comfortable being bathed by a woman. So this page
// is about PHYSICAL HANDLING, DIGNITY and NIGHT DUTY. /services/female-nurse
// answers a completely different question (modesty, privacy, the female patient,
// how to make the request) and the two must never converge — see
// docs/keyword-map.md rule 1.
//
// HARD CONSTRAINTS:
//   - No money figure anywhere (Decision Ledger #9). PRICES is deliberately not
//     imported. Gender does not change the price and this page must not hint
//     that it does.
//   - Helping a patient turn, sit up, stand or walk a few steps inside the house
//     is ORDINARY CAREGIVING and is described as such. It is never called
//     therapy, rehabilitation or a recovery programme (Decision Ledger #15), and
//     this page contains no physiotherapy language at all.
//   - ICU is step-down only — care after coming home. No ventilator, no
//     tracheostomy, not even implied (Decision Ledger #16).
//   - NO CLINICAL OUTCOME CLAIMS. Repositioning is described as "to reduce the
//     risk of bed sores" — never as preventing them.
//   - Every promise string comes verbatim from lib/constants.ts (NORTH-STAR §3).
//     "usually" in the callback promise is mandatory.
//   - Both gender pages state plainly that the clinical work, the PNC
//     registration and the verification are identical.
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import LeadFormD6 from "@/components/home/LeadFormD6";
import CtaBanner from "@/components/home/CtaBanner";
import {
  SITE_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_EMAIL,
  OFFICE_ADDRESS,
  OFFICE_POSTAL_ADDRESS,
  SHIFTS,
  CARE_FORMATS,
  PROMISES,
  CALLBACK_PROMISE,
  START_PROMISE,
  VERIFICATION_PROMISE,
} from "@/lib/constants";
import { breadcrumbList, businessSameAs, OPENING_HOURS } from "@/lib/schema";
import { waLink, serviceWaMsg } from "@/lib/wa";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Male Nurse at Home in Lahore | Night Duty",
  description:
    "A male nurse at home in Lahore for a father, husband or brother who needs lifting, turning or help to the bathroom, plus dressings and night duty.",
  alternates: { canonical: `${SITE_URL}/services/male-nurse` },
};

const NIGHT_SHIFT = SHIFTS.find((s) => s.id === "night")?.time ?? "";

const WA_MSG = serviceWaMsg("male nurse");

type Bilingual = { en: string; ur: string };

// Night cover leads on this page — it is the format families arranging care for
// a heavy or bedridden man ask about first. The female page orders these
// differently, around the short single visit.
const NIGHT = CARE_FORMATS.find((f) => f.id === "night");
const DAY_AND_REST = CARE_FORMATS.filter((f) => f.id !== "night");

/* ------------------------------------------------------------------ *
 * Who asks for a man, and why. Physical handling and an older man's
 * dignity — not the female page's reasons.
 * ------------------------------------------------------------------ */
const WHO_ASKS: Bilingual[] = [
  {
    en: "Your father cannot get out of bed on his own, and someone has to take his weight several times a day",
    ur: "والد خود بستر سے نہیں اٹھ سکتے، اور دن میں کئی بار کسی کو ان کا وزن سنبھالنا پڑتا ہے",
  },
  {
    en: "He is a big man, and nobody at home can move him safely without hurting their own back",
    ur: "وہ بھاری جسم کے ہیں۔ گھر کی دو خواتین انہیں محفوظ طریقے سے نہیں ہلا سکتیں، اور گھر والے غلط طریقے سے اٹھا کر اپنی کمر خراب کر رہے ہیں",
  },
  {
    en: "He is an older man who would find it uncomfortable to be bathed or helped to the toilet by a woman, and would rather not say so",
    ur: "وہ بزرگ ہیں اور کسی خاتون سے غسل یا باتھ روم میں مدد لینا انہیں گراں گزرے گا، مگر وہ یہ بات کہنا بھی نہیں چاہتے",
  },
  {
    en: "Nights are the hard part — he wakes, needs the bathroom, needs turning, and nobody at home can stay awake another night",
    ur: "اصل مشکل رات کی ہے — وہ جاگ جاتے ہیں، باتھ روم جانا ہوتا ہے، کروٹ بدلوانی ہوتی ہے، اور گھر میں کوئی ایک اور رات جاگ نہیں سکتا",
  },
  {
    en: "There is no particular reason. The family would simply prefer a man in the house. That is reason enough",
    ur: "کوئی خاص وجہ نہیں۔ گھر والے بس مرد کو ترجیح دیتے ہیں۔ یہی کافی ہے",
  },
];

/* ------------------------------------------------------------------ *
 * The physical side. Ordinary caregiving described as ordinary
 * caregiving — no therapy, no rehabilitation, no outcome promises.
 * "Reduce the risk of bed sores" is the exact permitted phrasing.
 * ------------------------------------------------------------------ */
const PHYSICAL_WORK: Bilingual[] = [
  {
    en: "Turning and repositioning him in bed through the shift, to reduce the risk of bed sores",
    ur: "شفٹ کے دوران بستر پر کروٹ بدلوانا اور پوزیشن تبدیل کرنا، تاکہ بیڈ سور کا خطرہ کم ہو",
  },
  {
    en: "Helping him sit up on the edge of the bed, and moving him between the bed and a chair or wheelchair",
    ur: "بستر کے کنارے پر بٹھانے میں مدد، اور بستر سے کرسی یا وہیل چیئر تک لے جانا",
  },
  {
    en: "Steadying him while he walks a few steps inside the house, so a trip to the next room is not a fall waiting to happen",
    ur: "گھر کے اندر چند قدم چلنے میں سہارا دینا، تاکہ ساتھ والے کمرے تک جانا گرنے کا خطرہ نہ بنے",
  },
  {
    en: "Helping him to the bathroom, and with bathing, shaving and changing clothes",
    ur: "باتھ روم تک لے جانے میں مدد، اور غسل، شیو اور کپڑے بدلنے میں معاونت",
  },
  {
    en: "Keeping the bed clean and dry, and changing sheets under a patient who cannot get up",
    ur: "بستر کو صاف اور خشک رکھنا، اور ایسے مریض کے نیچے چادر بدلنا جو اٹھ نہیں سکتا",
  },
];

/* ------------------------------------------------------------------ *
 * The clinical work. Same scope as /services/qualified-nurse and the
 * female page — written from scratch here, ordered around a man coming
 * home from hospital. ICU is step-down only (Ledger #16).
 * ------------------------------------------------------------------ */
const CLINICAL_WORK: Bilingual[] = [
  {
    en: "Care after he comes home from hospital, including after a stay in ICU or HDU",
    ur: "ہسپتال سے، بشمول آئی سی یو یا ایچ ڈی یو سے، گھر آنے کے بعد کی دیکھ بھال",
  },
  {
    en: "Post-operative wound care — cleaning the wound and changing the dressing as the doctor has written",
    ur: "آپریشن کے بعد زخم کی دیکھ بھال — زخم صاف کرنا اور ڈاکٹر کی ہدایت کے مطابق ڈریسنگ بدلنا",
  },
  {
    en: "Injections and IV drips on the doctor's prescription, so a man who cannot get down the stairs is not taken to a clinic for one injection",
    ur: "ڈاکٹر کے نسخے کے مطابق انجیکشن اور ڈرپ، تاکہ جو مرد سیڑھیاں نہیں اتر سکتے انہیں ایک انجیکشن کے لیے کلینک نہ لے جانا پڑے",
  },
  {
    en: "Prescribed medicines given on time, and vitals — blood pressure, temperature, pulse, blood sugar and oxygen — checked and written down for the doctor",
    ur: "تجویز کردہ دوائیں وقت پر دینا، اور طبی علامات — بلڈ پریشر، درجہ حرارت، نبض، شوگر اور آکسیجن — چیک کر کے ڈاکٹر کے لیے لکھنا",
  },
  {
    en: "A catheter (the urine tube) or an NG feeding tube (a feeding tube through the nose) kept clean and working, on the doctor's plan",
    ur: "کیتھیٹر (پیشاب کی نالی) یا NG فیڈنگ ٹیوب (ناک کے ذریعے کھانے کی نالی) کو صاف اور درست حالت میں رکھنا، ڈاکٹر کے پلان کے مطابق",
  },
];

/* ------------------------------------------------------------------ *
 * Verification artifacts — already published elsewhere on the site
 * (FAQ_ITEMS, /charges, /services/qualified-nurse, NORTH-STAR §3).
 * ------------------------------------------------------------------ */
const BEFORE_HE_ARRIVES: Bilingual[] = [
  {
    en: "His card on WhatsApp before the visit — photo, name and PNC registration number, so he is not a stranger when he reaches the gate",
    ur: "آنے سے پہلے واٹس ایپ پر ان کا کارڈ — تصویر، نام اور PNC رجسٹریشن نمبر، تاکہ گیٹ پر پہنچنے والا شخص اجنبی نہ لگے",
  },
  {
    en: "A message from us when he is on the way",
    ur: "جب وہ راستے میں ہوں تو ہماری طرف سے اطلاع",
  },
  {
    en: "Registered with the Pakistan Nursing Council — our team checks the registration number itself",
    ur: "پاکستان نرسنگ کونسل میں رجسٹرڈ — رجسٹریشن نمبر ہماری ٹیم خود چیک کرتی ہے",
  },
  {
    en: "Suited your father? Send us his name on WhatsApp and we will try to send the same person again — an older man should not have to get used to somebody new",
    ur: "والد کو مناسب لگے؟ ان کا نام واٹس ایپ کر دیں، ہم دوبارہ وہی فرد بھیجنے کی کوشش کریں گے — بزرگ کو ہر ہفتے نئے شخص کا عادی نہیں ہونا چاہیے",
  },
];

/* ------------------------------------------------------------------ *
 * FAQ. One question is in Roman Urdu, the way families actually search
 * (NORTH-STAR §5 rule 3). Mirrored exactly into the FAQPage JSON-LD.
 * ------------------------------------------------------------------ */
const MALE_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "My father is heavy and cannot get out of bed alone. Can a male nurse manage that?",
    qUr: "والد بھاری ہیں اور خود بستر سے نہیں اٹھ سکتے۔ کیا مرد نرس یہ سنبھال لے گا؟",
    a: "Tell us on the call how much he can do for himself — whether he can take any weight on his legs, whether he can sit up, and how often he has to be moved. That is what decides the arrangement, and it is better said before care starts than found out afterwards. Lifting, turning, moving from bed to chair and helping to the bathroom are everyday caregiving work. If the honest answer is that one person cannot do it safely, we say so instead of sending someone to struggle.",
    aUr: "کال پر ہمیں ان کا وزن بتا دیں اور یہ کہ وہ خود کتنا کر لیتے ہیں — کیا ٹانگوں پر وزن ڈال سکتے ہیں، کیا اٹھ کر بیٹھ سکتے ہیں، اور کتنی بار انہیں ہلانا پڑتا ہے۔ اسی سے طے ہوتا ہے کہ کیا بندوبست کرنا ہے، اور یہ بات کام شروع ہونے سے پہلے بتانا بہتر ہے، بعد میں پتا چلنے سے نہیں۔ اٹھانا، کروٹ بدلوانا، بستر سے کرسی تک لے جانا اور باتھ روم میں مدد کرنا روزمرہ دیکھ بھال کا حصہ ہے، اور اگر سچ یہ ہو کہ ایک شخص یہ محفوظ طریقے سے نہیں کر سکتا تو ہم صاف بتا دیں گے، کسی کو مشکل میں ڈالنے کے بجائے۔",
  },
  {
    q: "Abbu ke liye male nurse ghar par chahiye — kya mil jayega?",
    qUr: "ابو کے لیے گھر پر مرد نرس چاہیے — کیا مل جائے گا؟",
    a: "Yes. Male nurses are on our roster in Lahore. Say \"male nurse\" when we call back, or write it on WhatsApp, and we note it before anyone is assigned. You do not have to explain why. If a male nurse cannot be matched to the timing you want, we tell you plainly on that call rather than send someone you did not ask for.",
    aUr: "جی ہاں۔ لاہور میں ہمارے پاس مرد نرس موجود ہیں۔ جب ہم واپس کال کریں تو «مرد نرس» کہہ دیں، یا واٹس ایپ پر لکھ دیں — ہم کسی کو بھیجنے سے پہلے یہ لکھ لیتے ہیں۔ وجہ بتانے کی ضرورت نہیں؛ بہت سے گھرانے یہی کہتے ہیں، عموماً اس لیے کہ مریض مرد ہیں اور انہیں اٹھانے یا ذاتی دیکھ بھال میں مدد چاہیے۔ اگر آپ کے مطلوبہ وقت پر مرد نرس دستیاب نہ ہو تو ہم اسی کال پر صاف بتا دیں گے۔",
  },
  {
    q: "Can a male nurse stay the whole night?",
    qUr: "کیا مرد نرس پوری رات رک سکتا ہے؟",
    a: `Yes. The night shift runs ${NIGHT_SHIFT} — twelve hours, one caregiver at home for the whole of it, so the family can sleep. If you need somebody there day and night, that is two caregivers across two twelve-hour shifts, never one person awake for twenty-four hours. Nobody does that well, and we would rather say so.`,
    aUr: `جی ہاں۔ رات کی شفٹ ${NIGHT_SHIFT} تک ہوتی ہے — بارہ گھنٹے، پوری شفٹ ایک کیئر گیور گھر پر، تاکہ گھر والے سو سکیں۔ اگر دن اور رات دونوں وقت کسی کا ہونا ضروری ہے تو یہ دو کیئر گیور، دو بارہ گھنٹے کی شفٹوں میں ہوتا ہے — ایک ہی شخص چوبیس گھنٹے نہیں۔ یہ کوئی بھی ٹھیک طرح نہیں کر سکتا، اور ہم یہ بات چھپانے کے بجائے صاف کہہ دیتے ہیں۔`,
  },
  {
    q: "Is a male nurse different from a female nurse in what he is allowed to do?",
    qUr: "کیا مرد نرس اور خاتون نرس کے کام میں کوئی فرق ہے؟",
    a: "No. The registration and the checks are identical: the same Pakistan Nursing Council registration, the same CNIC check, reference calls and police verification, and the same clinical work — dressings, injections, drips, vitals, catheters and feeding tubes on the doctor's plan. The only thing that changes is who is in the room, and that is your family's decision.",
    aUr: "نہیں۔ رجسٹریشن اور جانچ بالکل ایک جیسی ہے: وہی پاکستان نرسنگ کونسل کی رجسٹریشن، وہی شناختی کارڈ کی جانچ، وہی حوالہ جات، وہی پولیس ویریفیکیشن، اور وہی طبی کام — ڈریسنگ، انجیکشن، ڈرپ، طبی علامات، کیتھیٹر اور فیڈنگ ٹیوب، ڈاکٹر کے پلان کے مطابق۔ فرق صرف اتنا ہے کہ کمرے میں کون ہوگا، اور یہ فیصلہ صرف آپ کے گھر والوں کا ہے۔",
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD. No price, priceRange, priceCurrency or priceSpecification
 * anywhere in this graph (Decision Ledger #9).
 * ------------------------------------------------------------------ */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Male Nurse at Home (Lahore)",
  alternateName: "Male nurse ghar par Lahore",
  serviceType: "Male home nursing",
  description:
    "A male PNC-registered nurse at home in Lahore for a male patient — lifting, turning and repositioning, help to the bathroom, bathing and changing, plus wound dressings, injections and drips on the doctor's prescription, vitals, catheter and feeding-tube care, and twelve-hour night duty.",
  url: `${SITE_URL}/services/male-nurse`,
  provider: {
    "@type": "MedicalBusiness",
    name: "Sehat Connect",
    telephone: CONTACT_PHONE_TEL,
    email: CONTACT_EMAIL,
    address: OFFICE_POSTAL_ADDRESS,
    areaServed: { "@type": "City", name: "Lahore" },
    openingHours: OPENING_HOURS,
    sameAs: businessSameAs(),
  },
  areaServed: { "@type": "City", name: "Lahore" },
  offers: {
    "@type": "Offer",
    description:
      "Exact price told on the first call, before care starts. No advance. Pay after the shift.",
    areaServed: { "@type": "City", name: "Lahore" },
  },
};

const crumbs = [
  { name: "Services", nameUr: "خدمات", path: "/services" },
  { name: "Male nurse", nameUr: "مرد نرس" },
];
const breadcrumbs = breadcrumbList(crumbs);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: MALE_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ------------------------------------------------------------------ *
 * Shared inline styles — same card language as /charges and
 * /services/injection-drip. No new CSS: every class used on this page
 * already exists in app/direction6.css.
 * ------------------------------------------------------------------ */
const CARD: CSSProperties = {
  background: "var(--paper)",
  border: "1px solid var(--line)",
  borderRadius: 20,
  padding: "26px 22px",
  boxShadow: "var(--shadow-sm)",
};

const BODY: CSSProperties = {
  fontSize: 17,
  color: "var(--ink-soft)",
  lineHeight: 1.65,
  fontWeight: 500,
};

function Tick() {
  return (
    <span className="tick">
      <svg viewBox="0 0 24 24">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function TickList({ items }: { items: Bilingual[] }) {
  return (
    <div className="id-meta">
      {items.map((item) => (
        <div className="id-row" key={item.en}>
          <Tick />
          <span>
            <span data-en>{item.en}</span>
            <span data-ur lang="ur" dir="rtl" className="urdu">{item.ur}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function CallButton() {
  return (
    <a className="btn btn-call" href={`tel:${CONTACT_PHONE_TEL}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
      <span data-en>Call {CONTACT_PHONE_DISPLAY}</span>
      <span data-ur lang="ur" dir="rtl" className="urdu">کال کریں <bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi></span>
    </a>
  );
}

function WhatsAppButton({ label }: { label: Bilingual }) {
  return (
    <a className="btn btn-wa" href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer">
      <span className="wadot" />
      <span data-en>{label.en}</span>
      <span data-ur lang="ur" dir="rtl" className="urdu">{label.ur}</span>
    </a>
  );
}

export default function MaleNursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LandingRoot>
        <Navbar />
        <main className="flex-1">
          <div className="wrap"><Breadcrumbs items={crumbs} /></div>
          {/* ---- hero: the query in the H1, the lifting problem in line one ---- */}
          <section className="hero">
            <div className="wrap">
              <div className="hero-grid">
                <div className="hero-copy">
                  <span className="eyebrow eyebrow-plain">
                    <span data-en>Male nurse ghar par — lifting, turning, night duty</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">گھر پر مرد نرس — اٹھانا، کروٹ بدلوانا، رات کی ڈیوٹی</span>
                  </span>

                  <h1>
                    <span data-en>
                      Male nurse <span className="hl">at home in Lahore</span> — for lifting,
                      personal care and night duty
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      <span className="hl">لاہور</span> میں گھر پر مرد نرس — اٹھانے، ذاتی دیکھ بھال
                      اور رات کی ڈیوٹی کے لیے
                    </span>
                  </h1>

                  <p className="hero-sub">
                    <span data-en>
                      When the patient is a grown man who cannot stand up on his own, the hardest
                      part of the day is not the medicine. It is getting him to the bathroom,
                      turning him in bed at three in the morning, and doing it without hurting him
                      or your own back. That is why families ask for a man. Say so when we call —
                      nobody asks why.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      جب مریض ایک بالغ مرد ہو جو خود کھڑا نہیں ہو سکتا، تو دن کا سب سے مشکل حصہ دوا
                      نہیں ہوتی۔ مشکل انہیں باتھ روم تک لے جانا ہے، رات تین بجے بستر پر کروٹ بدلوانی
                      ہے، اور یہ سب اس طرح کرنا ہے کہ نہ انہیں تکلیف ہو نہ آپ کی کمر خراب ہو۔ اسی لیے
                      گھر والے مرد مانگتے ہیں۔ کال پر بتا دیں، کوئی وجہ نہیں پوچھے گا۔
                    </span>
                  </p>

                  <div className="hero-trust">
                    <span className="pill">
                      <span data-en>Lifting, turning and transfers</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">اٹھانا، کروٹ بدلوانا اور منتقل کرنا</span>
                    </span>
                    <span className="pill">
                      <span data-en>PNC-registered nurse</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">PNC رجسٹرڈ نرس</span>
                    </span>
                    <span className="pill">
                      <span data-en>12-hour night duty</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">بارہ گھنٹے رات کی ڈیوٹی</span>
                    </span>
                    <span className="pill">
                      <span data-en>No reason needed</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">وجہ بتانے کی ضرورت نہیں</span>
                    </span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
                    <CallButton />
                    <WhatsAppButton
                      label={{ en: "Ask for a male nurse", ur: "مرد نرس کے لیے پیغام بھیجیں" }}
                    />
                  </div>

                  <p style={{ ...BODY, fontSize: 16, fontWeight: 600, marginTop: 16 }}>
                    <span data-en>{CALLBACK_PROMISE.en}</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">{CALLBACK_PROMISE.ur}</span>
                  </p>
                </div>

                <div className="hero-form">
                  <LeadFormD6 variant="hero" />
                </div>
              </div>
            </div>
          </section>

          {/* ---- who asks, and why ---- */}
          <section className="block" style={{ paddingTop: 34 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Who asks for a male nurse</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">مرد نرس کون مانگتا ہے</span>
                </span>
                <h2>
                  <span data-en>Usually a son or a wife, arranging care for a man.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">عموماً بیٹا یا اہلیہ، کسی مرد کی دیکھ بھال کے لیے۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <TickList items={WHO_ASKS} />
                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 16,
                    color: "var(--ink-soft)",
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  <span data-en>
                    We ask which you prefer on the first call, so you do not have to bring it up.
                    You never have to explain the answer — not to us, and not to anyone else.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    پہلی کال پر ہم خود پوچھ لیتے ہیں کہ آپ کو مرد چاہیے یا خاتون، تاکہ آپ کو بات شروع
                    نہ کرنی پڑے۔ جواب کی وجہ بتانے کی ضرورت کبھی نہیں — نہ ہمیں، نہ کسی اور کو۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- the physical side ---- */}
          <section
            className="block"
            style={{
              background: "var(--cream-2)",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Lifting, turning and getting about</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">اٹھانا، کروٹ بدلوانا اور چلنے پھرنے میں مدد</span>
                </span>
                <h2>
                  <span data-en>The part of the day nobody warns you about.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">دن کا وہ حصہ جس کے بارے میں کوئی پہلے سے نہیں بتاتا۔</span>
                </h2>
                <p>
                  <span data-en>
                    This is ordinary caregiving, done by someone who does it every day and knows
                    how to take a grown man&rsquo;s weight without hurting him.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    یہ روزمرہ دیکھ بھال کا کام ہے، جو ایسا شخص کرتا ہے جو یہ روز کرتا ہے اور جانتا ہے کہ
                    ایک بالغ مرد کا وزن کیسے سنبھالنا ہے کہ تکلیف نہ ہو۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                <TickList items={PHYSICAL_WORK} />
                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 16,
                    color: "var(--ink-soft)",
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  <span data-en>
                    Being bathed, shaved or helped onto a toilet is a hard thing for an older man to
                    accept from anyone. If there is a way he would rather it was done — the door
                    shut, a son in the room, nothing said about it afterwards — tell us when we call
                    and it goes on the arrangement with everything else.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    غسل، شیو یا باتھ روم میں مدد لینا کسی بھی بزرگ مرد کے لیے آسان بات نہیں ہوتی۔ اگر وہ
                    چاہتے ہیں کہ یہ کام کسی خاص طریقے سے ہو — کسی خاص انداز میں ڈھانپ کر، دروازہ بند
                    رکھ کر، بیٹا کمرے میں ہو، اور بعد میں اس کا ذکر نہ ہو — تو کال پر بتا دیں، یہ بھی
                    باقی باتوں کے ساتھ لکھ لیا جاتا ہے۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- the clinical work ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>The nursing work</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">نرسنگ کا کام</span>
                </span>
                <h2>
                  <span data-en>He is a Qualified Nurse first, and a pair of strong arms second.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">وہ پہلے ایک رجسٹرڈ نرس ہیں، مضبوط ہاتھ بعد میں۔</span>
                </h2>
                <p>
                  <span data-en>
                    A discharge slip comes home full of short forms. Read out anything on it you do
                    not recognise when we call, and we will tell you honestly whether a nurse can do
                    it at home.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    ہسپتال سے ملنے والی ڈسچارج سلپ مشکل اصطلاحات سے بھری ہوتی ہے۔ اس میں سے جو کچھ سمجھ
                    نہ آئے، کال پر پڑھ کر سنا دیں — ہم صاف بتا دیں گے کہ یہ کام گھر پر ہو سکتا ہے یا
                    نہیں۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                <TickList items={CLINICAL_WORK} />
                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 16,
                    color: "var(--ink-soft)",
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  <span data-en>
                    None of this changes with the caregiver&rsquo;s gender — the PNC registration,
                    the CNIC check, the reference calls, the police verification and the tasks are
                    identical for a male nurse and a female nurse. And if what your patient needs is
                    non-clinical — feeding, hygiene, company, help moving — an Attendant may be the
                    right person, and we will say so.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    ان میں سے کوئی چیز کیئر گیور کی جنس سے نہیں بدلتی۔ PNC رجسٹریشن، شناختی کارڈ کی
                    جانچ، حوالہ جات، پولیس ویریفیکیشن اور کام — سب مرد اور خاتون نرس کے لیے ایک جیسے
                    ہیں۔ اور اگر آپ کے مریض کو طبی نہیں بلکہ روزمرہ مدد چاہیے — کھانا، صفائی، ساتھ، چلنے
                    پھرنے میں سہارا — تو اٹینڈنٹ زیادہ مناسب ہو سکتا ہے، اور ہم یہ صاف بتا دیں گے۔
                  </span>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
                  <Link className="btn btn-ghost" href="/services/qualified-nurse">
                    <span data-en>Everything a qualified nurse handles</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">نرس کے تمام کام دیکھیں</span>
                  </Link>
                  <Link className="btn btn-ghost" href="/services/female-nurse">
                    <span data-en>Looking for a female nurse instead?</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">خاتون نرس درکار ہے؟</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ---- care formats (CARE_FORMATS), night cover first ---- */}
          <section
            className="block"
            style={{
              background: "var(--cream-2)",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Nights, days, and round-the-clock</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">راتیں، دن، اور چوبیس گھنٹے</span>
                </span>
                <h2>
                  <span data-en>Somebody has to stay awake. It does not have to be you.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">کسی کو جاگنا تو پڑے گا۔ ضروری نہیں کہ وہ آپ ہوں۔</span>
                </h2>
                <p>
                  <span data-en>
                    Families arranging care for a bedridden man almost always ask about the night
                    first, so that is where this starts.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    جو گھرانے صاحبِ فراش مرد کی دیکھ بھال کروا رہے ہوتے ہیں وہ تقریباً ہمیشہ پہلے رات کے
                    بارے میں پوچھتے ہیں، اس لیے فہرست یہیں سے شروع ہو رہی ہے۔
                  </span>
                </p>
              </div>

              {NIGHT && (
                <div
                  style={{
                    ...CARD,
                    paddingLeft: 30,
                    position: "relative",
                    overflow: "hidden",
                    marginBottom: 16,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                  />
                  <h3 style={{ fontSize: 22, marginBottom: 10, lineHeight: 1.25 }}>
                    <span data-en>{NIGHT.name.en}</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">{NIGHT.name.ur}</span>
                  </h3>
                  <p style={{ ...BODY, fontSize: 18 }}>
                    <span data-en>{NIGHT.detail.en}</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">{NIGHT.detail.ur}</span>
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DAY_AND_REST.map((f) => (
                  <div key={f.id} style={{ ...CARD, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                      <span data-en>{f.name.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{f.name.ur}</span>
                    </h3>
                    <p style={{ ...BODY, fontSize: 16.5 }}>
                      <span data-en>{f.detail.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{f.detail.ur}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Shift-scoped promises, kept under the shift heading on purpose —
                  "first day free" and "pay after the shift" are worded for a shift. */}
              <div style={{ ...CARD, marginTop: 16 }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                  <span data-en>What we promise on a shift</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">شفٹ کے بارے میں ہمارا وعدہ</span>
                </h3>
                <TickList items={[PROMISES.trial, PROMISES.payment, PROMISES.replacement, START_PROMISE]} />
                <p style={{ ...BODY, fontSize: 16, fontWeight: 600, marginTop: 16 }}>
                  <span data-en>{PROMISES.priceOnCall.en}</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">{PROMISES.priceOnCall.ur}</span>
                </p>
                <p style={{ ...BODY, fontSize: 16, fontWeight: 600, marginTop: 12 }}>
                  <span data-en>
                    Need to cancel or move the time? Call or WhatsApp us up to 4 hours before the
                    shift and we cancel or reschedule it at no charge.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    منسوخ کرنا ہو یا وقت بدلنا ہو؟ شفٹ سے 4 گھنٹے پہلے تک کال یا واٹس ایپ کر دیں، ہم
                    بغیر کسی چارج کے منسوخ یا وقت تبدیل کر دیتے ہیں۔
                  </span>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
                  <Link className="btn btn-ghost" href="/charges">
                    <span data-en>How charges work</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">چارجز کیسے طے ہوتے ہیں</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ---- who walks in ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Before he arrives</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ان کے آنے سے پہلے</span>
                </span>
                <h2>
                  <span data-en>You see his card before you open the door.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">دروازہ کھولنے سے پہلے ان کا کارڈ آپ کے پاس ہوتا ہے۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <TickList items={BEFORE_HE_ARRIVES} />
                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 17,
                    color: "var(--teal-deep)",
                    fontWeight: 800,
                    lineHeight: 1.55,
                  }}
                >
                  <span data-en>{VERIFICATION_PROMISE.en}</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">{VERIFICATION_PROMISE.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- areas ---- */}
          <section
            className="block"
            style={{
              background: "var(--cream-2)",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Where we come</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ہم کہاں آتے ہیں</span>
                </span>
                <h2>
                  <span data-en>All of Lahore.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">پورا لاہور۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <p style={{ ...BODY, fontSize: 18 }}>
                  <span data-en>
                    We serve all of Lahore — DHA, Gulberg, Johar Town, Model Town, Bahria Town,
                    Cantt and more. Call or WhatsApp to check your area. Our office is at{" "}
                    {OFFICE_ADDRESS}.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    فی الحال ہم پورے لاہور میں خدمات دیتے ہیں: ڈی ایچ اے، گلبرگ، جوہر ٹاؤن، ماڈل ٹاؤن،
                    بحریہ ٹاؤن، کینٹ اور دیگر علاقے۔ اپنے علاقے کے بارے میں جاننے کے لیے کال یا واٹس ایپ
                    کریں۔ ہمارا دفتر {OFFICE_ADDRESS} میں ہے۔
                  </span>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
                  <CallButton />
                  <WhatsAppButton label={{ en: "Check my area", ur: "میرا علاقہ چیک کریں" }} />
                </div>
              </div>
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="male-nurse-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Male nurse ghar par — common questions</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">گھر پر مرد نرس — عام سوالات</span>
                </span>
                <h2>
                  <span data-en>Straight answers before you call.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">کال کرنے سے پہلے سیدھے جواب۔</span>
                </h2>
              </div>

              <div className="faq-list">
                {MALE_FAQ.map((item) => (
                  <div className="faq-item" key={item.q}>
                    <div className="faq-q" style={{ cursor: "default", alignItems: "flex-start" }}>
                      <h3 className="qt">
                        <span data-en>{item.q}</span>
                        <span data-ur lang="ur" dir="rtl" className="urdu">{item.qUr}</span>
                      </h3>
                    </div>
                    <div className="faq-a" style={{ gridTemplateRows: "1fr" }}>
                      <div className="faq-a-in" style={{ fontSize: 17 }}>
                        <div className="faq-a-pad">
                          <span data-en>{item.a}</span>
                          <span data-ur lang="ur" dir="rtl" className="urdu">{item.aUr}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Closer carries the mobile bottom padding that clears the sticky
              action bar (.d6 .closer .wrap padding-bottom), same as every route. */}
          <CtaBanner />
          <div className="seam-gold" aria-hidden="true" />
        </main>
        <Footer />
      </LandingRoot>
    </>
  );
}
