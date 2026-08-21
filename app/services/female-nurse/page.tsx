// /services/female-nurse — "female nurse at home Lahore" (keyword-map row:
// primary phrase "female nurse at home Lahore", Roman Urdu "female nurse ghar par").
// Owner confirmed 2026-08-21 that both female and male nurses are on the roster,
// which unblocked this row.
//
// WHY THIS PAGE EXISTS, AND WHY IT IS NOT THE MALE PAGE WITH A WORD SWAPPED:
// somebody typing "female nurse at home Lahore" is almost always arranging care
// for a WOMAN — a mother, a wife, an elderly aunt — and the deciding factor is
// modesty, privacy and religious comfort, not clinical scope. So this page is
// about the ASK: what "female-for-female on request" actually means when you
// call, what happens during bathing and hygiene care, and the fact that nobody
// has to justify the preference. /services/male-nurse answers a different
// question (physical handling, dignity for an older man, night duty) and the two
// pages must never converge — see docs/keyword-map.md rule 1.
//
// TONE (binding): the preference is completely normal. Never defensive, never
// apologetic, never over-explaining. One plain sentence that we ask and you
// never have to justify it does more than a paragraph.
//
// HARD CONSTRAINTS:
//   - No money figure anywhere (Decision Ledger #9). PRICES is deliberately not
//     imported. Gender does not change the price and this page must not hint
//     that it does.
//   - Nothing about physiotherapy, therapy or rehabilitation (#15), and nothing
//     about ventilators or tracheostomy (#16).
//   - Every promise string comes verbatim from lib/constants.ts (NORTH-STAR §3).
//     "usually" in the callback promise is mandatory.
//   - Both gender pages state plainly that the clinical work, the PNC
//     registration and the verification are identical — neither page may imply
//     one is more qualified.
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
  title: "Female Nurse at Home in Lahore | Female-for-Female on Request",
  description:
    "Caring for a mother, wife or elderly relative at home in Lahore? Ask for a female nurse and you never have to explain why. Female-for-female whenever you ask, privacy during bathing and hygiene care, PNC-registered and police-verified.",
  alternates: { canonical: `${SITE_URL}/services/female-nurse` },
};

const WA_MSG = serviceWaMsg("female nurse");

type Bilingual = { en: string; ur: string };

// Order matters here: the single visit is what a female patient most often
// needs first (a dressing, an injection), so it leads. The male page orders
// these differently, around night cover.
const VISIT = CARE_FORMATS.find((f) => f.id === "visit");
const OTHER_FORMATS = CARE_FORMATS.filter((f) => f.id !== "visit");

/* ------------------------------------------------------------------ *
 * Who asks, and why. This is the section that makes the page worth
 * existing — every line is a real reason a family says "female only".
 * ------------------------------------------------------------------ */
const WHO_ASKS: Bilingual[] = [
  {
    en: "The patient is your mother, your wife or an elderly aunt, and she would not be comfortable being bathed or changed by a man",
    ur: "مریضہ آپ کی والدہ، اہلیہ یا کوئی بزرگ خاتون ہیں، اور وہ کسی مرد سے غسل یا کپڑے بدلوانے میں آرام محسوس نہیں کریں گی",
  },
  {
    en: "Parda is observed in the house, and a man staying twelve hours is simply not an option",
    ur: "گھر میں پردہ ہے، اور کسی مرد کا بارہ گھنٹے رہنا ممکن ہی نہیں",
  },
  {
    en: "A new mother needs help with feeding, hygiene and rest after delivery, and wants a woman doing it",
    ur: "زچگی کے بعد ماں کو دودھ پلانے، صفائی اور آرام میں مدد چاہیے، اور وہ چاہتی ہیں کہ یہ کام خاتون کرے",
  },
  {
    en: "Your father or brother is away, or working abroad, and only women are at home during the day",
    ur: "والد یا بھائی باہر ہیں یا بیرونِ ملک ہیں، اور دن میں گھر پر صرف خواتین ہوتی ہیں",
  },
  {
    en: "There is no particular reason. You would just prefer a woman. That is reason enough",
    ur: "کوئی خاص وجہ نہیں۔ آپ بس خاتون کو ترجیح دیتے ہیں۔ یہی کافی ہے",
  },
];

/* ------------------------------------------------------------------ *
 * The clinical work. Same scope as /services/qualified-nurse, written
 * from scratch here around a female patient at home. Nothing invented,
 * nothing beyond what the qualified-nurse page already claims.
 * ------------------------------------------------------------------ */
const NURSE_WORK: Bilingual[] = [
  {
    en: "Wound care and dressing changes — including after an operation, cleaning the wound and re-dressing it as the doctor has written",
    ur: "زخم کی دیکھ بھال اور ڈریسنگ کی تبدیلی — آپریشن کے بعد بھی، زخم صاف کرنا اور ڈاکٹر کی ہدایت کے مطابق دوبارہ ڈریسنگ کرنا",
  },
  {
    en: "Injections into the muscle or the vein, and IV drips, given on the doctor's prescription",
    ur: "پٹھے یا رگ میں انجیکشن، اور ڈرپ — ڈاکٹر کے نسخے کے مطابق",
  },
  {
    en: "Vitals — blood pressure, temperature, pulse, blood sugar and oxygen, checked and written down so the doctor can see them",
    ur: "طبی علامات — بلڈ پریشر، درجہ حرارت، نبض، شوگر اور آکسیجن چیک کر کے لکھنا تاکہ ڈاکٹر دیکھ سکیں",
  },
  {
    en: "Prescribed medicines given on time, with the doses kept in order so nothing is missed or doubled",
    ur: "تجویز کردہ دوائیں وقت پر دینا، اور خوراکوں کا حساب رکھنا تاکہ کوئی دوا رہ نہ جائے یا دوبار نہ لگے",
  },
  {
    en: "Catheters (the urine tube) and NG feeding tubes (a feeding tube through the nose), looked after on the doctor's plan",
    ur: "کیتھیٹر (پیشاب کی نالی) اور NG فیڈنگ ٹیوب (ناک کے ذریعے کھانے کی نالی) کی دیکھ بھال، ڈاکٹر کے پلان کے مطابق",
  },
  {
    en: "Care after coming home from hospital, including after a stay in ICU or HDU, and day-to-day help with bathing, changing and moving in bed",
    ur: "ہسپتال سے، بشمول آئی سی یو یا ایچ ڈی یو سے، گھر آنے کے بعد کی دیکھ بھال، اور روزمرہ میں غسل، کپڑے بدلنے اور بستر پر کروٹ لینے میں مدد",
  },
];

/* ------------------------------------------------------------------ *
 * How to ask. Concrete, unfussy, and short on purpose.
 * ------------------------------------------------------------------ */
const HOW_TO_ASK: Bilingual[] = [
  {
    en: "Say it on the first call — \"female nurse only\" is enough. We write it down before anyone is assigned, so it is settled from the start",
    ur: "پہلی کال پر ہی کہہ دیں — «صرف خاتون نرس» کہنا کافی ہے۔ ہم کسی کو بھیجنے سے پہلے یہ لکھ لیتے ہیں، تاکہ یہ بات شروع ہی سے طے ہو، بعد میں تصحیح نہ کرنی پڑے",
  },
  {
    en: "You do not have to give a reason. We do not ask for one, and we will not make you explain yourself",
    ur: "آپ کو کوئی وجہ بتانے کی ضرورت نہیں۔ ہم وجہ پوچھتے ہی نہیں، اور آپ سے صفائی نہیں مانگیں گے",
  },
  {
    en: "Say it again on WhatsApp if you would rather not say it out loud on the phone. Written is as good as spoken",
    ur: "اگر فون پر کہنا مشکل لگے تو واٹس ایپ پر لکھ دیں۔ لکھی ہوئی بات بھی اتنی ہی معتبر ہے",
  },
  {
    en: "If a female nurse cannot be matched to the time you want, we tell you plainly on that call rather than send someone you did not ask for",
    ur: "اگر آپ کے مطلوبہ وقت پر خاتون نرس دستیاب نہ ہو تو ہم اسی کال پر صاف بتا دیں گے۔ ہم ایسا فرد بھیجنے کے بجائے سچ بتانا بہتر سمجھتے ہیں جو آپ نے مانگا ہی نہ ہو",
  },
];

/* ------------------------------------------------------------------ *
 * Verification artifacts — all already published elsewhere on the site
 * (FAQ_ITEMS, /charges, /services/qualified-nurse, NORTH-STAR §3).
 * ------------------------------------------------------------------ */
const BEFORE_SHE_ARRIVES: Bilingual[] = [
  {
    en: "Her card on WhatsApp before the visit — photo, name and PNC registration number, so you know who is at the door before you open it",
    ur: "آنے سے پہلے واٹس ایپ پر ان کا کارڈ — تصویر، نام اور PNC رجسٹریشن نمبر، تاکہ دروازہ کھولنے سے پہلے آپ کو معلوم ہو کہ کون آیا ہے",
  },
  {
    en: "A message from us when she is on the way",
    ur: "جب وہ راستے میں ہوں تو ہماری طرف سے اطلاع",
  },
  {
    en: "Registered with the Pakistan Nursing Council — our team checks the registration number itself",
    ur: "پاکستان نرسنگ کونسل میں رجسٹرڈ — رجسٹریشن نمبر ہماری ٹیم خود چیک کرتی ہے",
  },
  {
    en: "Liked her? Send us her name on WhatsApp and we will try to send the same person again",
    ur: "پسند آئیں؟ ان کا نام واٹس ایپ کر دیں، ہم دوبارہ وہی فرد بھیجنے کی کوشش کریں گے — جانا پہچانا چہرہ بہت بڑی بات ہے",
  },
];

/* ------------------------------------------------------------------ *
 * FAQ. One question is in Roman Urdu, the way families actually search
 * (NORTH-STAR §5 rule 3). Mirrored exactly into the FAQPage JSON-LD.
 * ------------------------------------------------------------------ */
const FEMALE_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "Can I ask for a female nurse, and do I have to give a reason?",
    qUr: "کیا میں خاتون نرس مانگ سکتا ہوں، اور کیا وجہ بتانی پڑے گی؟",
    a: "Yes, and no. Tell us on the first call that you want a female nurse and that is the end of it — we write it down and arrange accordingly. We do not ask why. It is one of the most ordinary requests we get. It also changes nothing about what you pay: we tell you the exact price on the first call, before care starts, either way.",
    aUr: "جی ہاں، اور نہیں۔ پہلی کال پر بتا دیں کہ آپ کو خاتون نرس چاہیے — بس اتنا کافی ہے۔ ہم لکھ لیتے ہیں اور اسی کے مطابق بندوبست کرتے ہیں۔ ہم وجہ نہیں پوچھتے۔ جو گھرانے یہ کہتے ہیں ان میں زیادہ تر کسی خاتون کی دیکھ بھال کروا رہے ہوتے ہیں، اور یہ ہمارے لیے بالکل عام بات ہے۔ اس سے ادائیگی میں بھی کوئی فرق نہیں پڑتا: صحیح قیمت پہلی کال پر، کام شروع ہونے سے پہلے بتا دی جاتی ہے۔",
  },
  {
    q: "Ammi ke liye female nurse ghar par mil sakti hai? — can a female nurse come home for my mother?",
    qUr: "کیا امی کے لیے گھر پر خاتون نرس مل سکتی ہے؟",
    a: "Yes. A female nurse can come to your home in Lahore for one short visit — an injection, a drip, a dressing change — or stay for a twelve-hour day or night shift. Tell us what your mother needs and we will say honestly whether a nurse or an attendant is the right person. If we cannot match a female nurse to the time you want, we say so on that call.",
    aUr: "جی ہاں۔ خاتون نرس لاہور میں آپ کے گھر ایک مختصر وزٹ کے لیے آ سکتی ہے — انجیکشن، ڈرپ یا ڈریسنگ — یا بارہ گھنٹے کی دن یا رات کی شفٹ کے لیے رک سکتی ہے، اگر امی کے پاس کسی کا ہونا ضروری ہو۔ کال پر بتا دیں کہ کیا کام ہے، ہم صاف بتا دیں گے کہ نرس مناسب رہے گی یا اٹینڈنٹ۔ اگر آپ کے مطلوبہ وقت پر خاتون نرس نہ ہو تو اسی کال پر بتا دیں گے۔",
  },
  {
    q: "Will the female nurse also help with bathing, the toilet and changing clothes?",
    qUr: "کیا خاتون نرس غسل، باتھ روم اور کپڑے بدلنے میں بھی مدد کرے گی؟",
    a: "Yes — that is everyday care at home, and usually the exact reason a family asks for a woman. If you want a female relative in the room while it is done, or the door kept closed, say so when we call and it goes on the arrangement with everything else. Nobody will find the request odd.",
    aUr: "جی ہاں — یہ گھر پر روزمرہ دیکھ بھال کا حصہ ہے، اور عموماً یہی وہ وجہ ہوتی ہے جس کی بنا پر گھر والے خاتون مانگتے ہیں۔ اگر آپ چاہتے ہیں کہ اس دوران گھر کی کوئی خاتون کمرے میں موجود ہو، یا دروازہ بند رہے، یا مریضہ کو کسی خاص طرح ڈھانپا جائے، تو کال پر بتا دیں — یہ بھی باقی باتوں کے ساتھ لکھ لیا جاتا ہے۔ کسی کو یہ بات عجیب نہیں لگے گی۔",
  },
  {
    q: "Is a female nurse less qualified than a male nurse?",
    qUr: "کیا خاتون نرس مرد نرس سے کم اہل ہوتی ہے؟",
    a: "No. Qualification does not change with gender. A female Qualified Nurse carries the same Pakistan Nursing Council registration, the same CNIC check, reference calls and police verification, and does the same clinical work — dressings, injections, drips, vitals, catheters and feeding tubes on the doctor's plan. Choosing a woman is about comfort in your home, not a compromise on care.",
    aUr: "نہیں۔ قابلیت کا جنس سے کوئی تعلق نہیں۔ خاتون نرس بھی بالکل اسی طرح پاکستان نرسنگ کونسل میں رجسٹرڈ ہوتی ہے، اسی طرح شناختی کارڈ چیک ہوتا ہے، حوالہ جات کی تصدیق اور پولیس ویریفیکیشن ہوتی ہے، اور وہی طبی کام کرتی ہے — ڈریسنگ، انجیکشن، ڈرپ، طبی علامات، کیتھیٹر اور فیڈنگ ٹیوب، ڈاکٹر کے پلان کے مطابق۔ خاتون کا انتخاب گھر کے آرام کا فیصلہ ہے، دیکھ بھال میں کمی نہیں۔",
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD. No price, priceRange, priceCurrency or priceSpecification
 * anywhere in this graph (Decision Ledger #9).
 * ------------------------------------------------------------------ */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Female Nurse at Home (Lahore)",
  alternateName: "Female nurse ghar par Lahore",
  serviceType: "Female home nursing",
  description:
    "A female PNC-registered nurse at home in Lahore for a female patient — wound dressings, injections and drips on the doctor's prescription, vitals, medicines, catheter and feeding-tube care, and help with bathing and hygiene. Female-for-female whenever a family asks, with no reason required.",
  url: `${SITE_URL}/services/female-nurse`,
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
  { name: "Female nurse", nameUr: "خاتون نرس" },
];
const breadcrumbs = breadcrumbList(crumbs);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FEMALE_FAQ.map(({ q, a }) => ({
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
            <span data-ur className="urdu">{item.ur}</span>
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
      <span data-ur className="urdu">کال کریں <bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi></span>
    </a>
  );
}

function WhatsAppButton({ label }: { label: Bilingual }) {
  return (
    <a className="btn btn-wa" href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer">
      <span className="wadot" />
      <span data-en>{label.en}</span>
      <span data-ur className="urdu">{label.ur}</span>
    </a>
  );
}

export default function FemaleNursePage() {
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
          {/* ---- hero: the query in the H1, the reason for the search in line one ---- */}
          <section className="hero">
            <div className="wrap">
              <div className="hero-grid">
                <div className="hero-copy">
                  <span className="eyebrow eyebrow-plain">
                    <span data-en>Female nurse ghar par — you never have to explain why</span>
                    <span data-ur className="urdu">گھر پر خاتون نرس — وجہ بتانے کی ضرورت نہیں</span>
                  </span>

                  <h1>
                    <span data-en>
                      Female nurse <span className="hl">at home in Lahore</span> — when the patient
                      is a woman
                    </span>
                    <span data-ur className="urdu">
                      <span className="hl">لاہور</span> میں گھر پر خاتون نرس — جب مریضہ خاتون ہو
                    </span>
                  </h1>

                  <p className="hero-sub">
                    <span data-en>
                      Most families who ask us for a female nurse are arranging care for a woman —
                      a mother after an operation, a wife who cannot reach the bathroom alone, an
                      elderly aunt who needs bathing and dressing every day. For that work, who does
                      it matters as much as how it is done. So we ask on the first call whether you
                      want a woman. You never have to justify the answer.
                    </span>
                    <span data-ur className="urdu">
                      جو گھرانے ہمیں خاتون نرس کے لیے فون کرتے ہیں، ان میں زیادہ تر کسی خاتون کی
                      دیکھ بھال کروا رہے ہوتے ہیں — آپریشن کے بعد والدہ، وہ اہلیہ جو خود باتھ روم تک
                      نہیں جا سکتیں، یا وہ بزرگ خاتون جنہیں روز غسل اور کپڑے بدلنے میں مدد چاہیے۔ ایسے
                      کام میں یہ بات اتنی ہی اہم ہے کہ کام کون کر رہا ہے۔ اسی لیے ہم پہلی کال پر خود
                      پوچھتے ہیں کہ آپ خاتون چاہتے ہیں یا نہیں۔ وجہ بتانے کی ضرورت کبھی نہیں، اور
                      دیکھ بھال میں اس سے کوئی فرق نہیں پڑتا۔
                    </span>
                  </p>

                  <div style={{ marginTop: 16 }}>
                    <span className="female-badge">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: 22, height: 22, flex: "none" }}
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="8" r="5" />
                        <path d="M12 13v8M9 18h6" />
                      </svg>
                      <span className="fb-text">
                        <b data-en>Female-for-female, whenever you ask</b>
                        <span data-ur className="urdu">خاتون مریضہ کے لیے خاتون — جب بھی آپ کہیں</span>
                      </span>
                    </span>
                  </div>

                  <div className="hero-trust" style={{ marginTop: 14 }}>
                    <span className="pill">
                      <span data-en>No reason needed</span>
                      <span data-ur className="urdu">وجہ بتانے کی ضرورت نہیں</span>
                    </span>
                    <span className="pill">
                      <span data-en>PNC-registered nurse</span>
                      <span data-ur className="urdu">PNC رجسٹرڈ نرس</span>
                    </span>
                    <span className="pill">
                      <span data-en>Privacy during bathing and hygiene care</span>
                      <span data-ur className="urdu">غسل اور صفائی کے وقت پردہ داری</span>
                    </span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
                    <CallButton />
                    <WhatsAppButton
                      label={{ en: "Ask for a female nurse", ur: "خاتون نرس کے لیے پیغام بھیجیں" }}
                    />
                  </div>

                  <p style={{ ...BODY, fontSize: 16, fontWeight: 600, marginTop: 16 }}>
                    <span data-en>{CALLBACK_PROMISE.en}</span>
                    <span data-ur className="urdu">{CALLBACK_PROMISE.ur}</span>
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
                  <span data-en>Who asks for a female nurse</span>
                  <span data-ur className="urdu">خاتون نرس کون مانگتا ہے</span>
                </span>
                <h2>
                  <span data-en>Usually, someone caring for a woman at home.</span>
                  <span data-ur className="urdu">عموماً وہ لوگ جو گھر میں کسی خاتون کی دیکھ بھال کروا رہے ہوں۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <TickList items={WHO_ASKS} />
              </div>
            </div>
          </section>

          {/* ---- how to ask ---- */}
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
                  <span data-en>How to ask, and what happens on the call</span>
                  <span data-ur className="urdu">کیسے کہنا ہے، اور کال پر کیا ہوتا ہے</span>
                </span>
                <h2>
                  <span data-en>Four words settle it: &ldquo;a female nurse, please&rdquo;.</span>
                  <span data-ur className="urdu">اتنا کہہ دینا کافی ہے: «خاتون نرس بھیج دیں»۔</span>
                </h2>
                <p>
                  <span data-en>
                    We ask the question ourselves when we call back, so you do not have to raise
                    it. If you would rather answer it first, write it in the form or on WhatsApp.
                  </span>
                  <span data-ur className="urdu">
                    جب ہم واپس کال کرتے ہیں تو یہ سوال ہم خود پوچھ لیتے ہیں، تاکہ آپ کو بات شروع نہ
                    کرنی پڑے۔ اگر آپ پہلے ہی بتانا چاہیں تو فارم میں یا واٹس ایپ پر لکھ دیں۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                <TickList items={HOW_TO_ASK} />
                <p style={{ ...BODY, fontSize: 16, fontWeight: 600, marginTop: 16 }}>
                  <span data-en>{PROMISES.priceOnCall.en}</span>
                  <span data-ur className="urdu">{PROMISES.priceOnCall.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- what the nurse actually does ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>What she does at your home</span>
                  <span data-ur className="urdu">وہ گھر پر کیا کرتی ہیں</span>
                </span>
                <h2>
                  <span data-en>The same nursing work, done by a woman.</span>
                  <span data-ur className="urdu">وہی نرسنگ کا کام، ایک خاتون کے ہاتھوں۔</span>
                </h2>
                <p>
                  <span data-en>
                    Asking for a female nurse narrows who comes, not what she can do. If your
                    doctor has written something you do not recognise, read it out on the call and
                    we will tell you honestly whether a nurse can do it at home.
                  </span>
                  <span data-ur className="urdu">
                    خاتون نرس مانگنے سے یہ طے ہوتا ہے کہ کون آئے گا، یہ نہیں کہ وہ کیا کر سکتی ہیں۔ نیچے
                    سیدھی بات لکھی ہے — اگر ڈاکٹر نے کچھ ایسا لکھا ہے جو سمجھ نہ آئے تو کال پر پڑھ کر
                    سنا دیں، ہم صاف بتا دیں گے کہ یہ کام گھر پر ہو سکتا ہے یا نہیں۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                <TickList items={NURSE_WORK} />
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
                    Nothing on this list changes with the caregiver&rsquo;s gender — the PNC
                    registration, the CNIC check, the reference calls, the police verification and
                    the tasks are identical for a female nurse and a male nurse. If what your patient
                    needs is non-clinical — feeding, hygiene, company, help moving — an Attendant may
                    be the right person, and we will say so.
                  </span>
                  <span data-ur className="urdu">
                    اس فہرست میں کوئی چیز کیئر گیور کی جنس سے نہیں بدلتی۔ PNC رجسٹریشن، شناختی کارڈ کی
                    جانچ، حوالہ جات، پولیس ویریفیکیشن اور کام — سب خاتون اور مرد نرس کے لیے ایک جیسے
                    ہیں۔ اگر آپ کے مریض کو طبی نہیں بلکہ روزمرہ مدد چاہیے — کھانا، صفائی، ساتھ، چلنے
                    پھرنے میں سہارا — تو اٹینڈنٹ زیادہ مناسب ہو سکتا ہے، اور ہم یہ صاف بتا دیں گے۔
                  </span>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
                  <Link className="btn btn-ghost" href="/services/qualified-nurse">
                    <span data-en>Everything a qualified nurse handles</span>
                    <span data-ur className="urdu">نرس کے تمام کام دیکھیں</span>
                  </Link>
                  <Link className="btn btn-ghost" href="/services/male-nurse">
                    <span data-en>Looking for a male nurse instead?</span>
                    <span data-ur className="urdu">مرد نرس درکار ہے؟</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ---- who walks in ---- */}
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
                  <span data-en>Before she arrives</span>
                  <span data-ur className="urdu">ان کے آنے سے پہلے</span>
                </span>
                <h2>
                  <span data-en>You see her card before you open the door.</span>
                  <span data-ur className="urdu">دروازہ کھولنے سے پہلے ان کا کارڈ آپ کے پاس ہوتا ہے۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <TickList items={BEFORE_SHE_ARRIVES} />
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
                  <span data-ur className="urdu">{VERIFICATION_PROMISE.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- care formats (CARE_FORMATS), single visit first ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>For how long</span>
                  <span data-ur className="urdu">کتنی دیر کے لیے</span>
                </span>
                <h2>
                  <span data-en>Half an hour, half a day, or every day.</span>
                  <span data-ur className="urdu">آدھا گھنٹہ، آدھا دن، یا ہر روز۔</span>
                </h2>
                <p>
                  <span data-en>
                    A dressing change or an injection for a female patient often needs a nurse for
                    half an hour, not half a day. That is a real option and it is the first one.
                  </span>
                  <span data-ur className="urdu">
                    خاتون مریضہ کے لیے ڈریسنگ یا انجیکشن میں اکثر نرس آدھے گھنٹے کے لیے چاہیے ہوتی ہے،
                    آدھے دن کے لیے نہیں۔ یہ حقیقی آپشن ہے، اور پہلا یہی ہے۔
                  </span>
                </p>
              </div>

              {VISIT && (
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
                    <span data-en>{VISIT.name.en}</span>
                    <span data-ur className="urdu">{VISIT.name.ur}</span>
                  </h3>
                  <p style={{ ...BODY, fontSize: 18 }}>
                    <span data-en>{VISIT.detail.en}</span>
                    <span data-ur className="urdu">{VISIT.detail.ur}</span>
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {OTHER_FORMATS.map((f) => (
                  <div key={f.id} style={{ ...CARD, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                      <span data-en>{f.name.en}</span>
                      <span data-ur className="urdu">{f.name.ur}</span>
                    </h3>
                    <p style={{ ...BODY, fontSize: 16.5 }}>
                      <span data-en>{f.detail.en}</span>
                      <span data-ur className="urdu">{f.detail.ur}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Shift-scoped promises, kept under the shift heading on purpose —
                  "first day free" and "pay after the shift" are worded for a shift. */}
              <div style={{ ...CARD, marginTop: 16 }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                  <span data-en>What we promise on a shift</span>
                  <span data-ur className="urdu">شفٹ کے بارے میں ہمارا وعدہ</span>
                </h3>
                <TickList items={[PROMISES.trial, PROMISES.payment, PROMISES.replacement, START_PROMISE]} />
                <p style={{ ...BODY, fontSize: 16, fontWeight: 600, marginTop: 16 }}>
                  <span data-en>
                    Need to cancel or move the time? Call or WhatsApp us up to 4 hours before the
                    shift and we cancel or reschedule it at no charge.
                  </span>
                  <span data-ur className="urdu">
                    منسوخ کرنا ہو یا وقت بدلنا ہو؟ شفٹ سے 4 گھنٹے پہلے تک کال یا واٹس ایپ کر دیں، ہم
                    بغیر کسی چارج کے منسوخ یا وقت تبدیل کر دیتے ہیں۔
                  </span>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
                  <Link className="btn btn-ghost" href="/charges">
                    <span data-en>How charges work</span>
                    <span data-ur className="urdu">چارجز کیسے طے ہوتے ہیں</span>
                  </Link>
                </div>
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
                  <span data-ur className="urdu">ہم کہاں آتے ہیں</span>
                </span>
                <h2>
                  <span data-en>All of Lahore.</span>
                  <span data-ur className="urdu">پورا لاہور۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <p style={{ ...BODY, fontSize: 18 }}>
                  <span data-en>
                    We serve all of Lahore — DHA, Gulberg, Johar Town, Model Town, Bahria Town,
                    Cantt and more. Call or WhatsApp to check your area. Our office is at{" "}
                    {OFFICE_ADDRESS}.
                  </span>
                  <span data-ur className="urdu">
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
          <section className="block faq" id="female-nurse-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Female nurse ghar par — common questions</span>
                  <span data-ur className="urdu">گھر پر خاتون نرس — عام سوالات</span>
                </span>
                <h2>
                  <span data-en>Straight answers before you call.</span>
                  <span data-ur className="urdu">کال کرنے سے پہلے سیدھے جواب۔</span>
                </h2>
              </div>

              <div className="faq-list">
                {FEMALE_FAQ.map((item) => (
                  <div className="faq-item" key={item.q}>
                    <div className="faq-q" style={{ cursor: "default", alignItems: "flex-start" }}>
                      <h3 className="qt">
                        <span data-en>{item.q}</span>
                        <span data-ur className="urdu">{item.qUr}</span>
                      </h3>
                    </div>
                    <div className="faq-a" style={{ gridTemplateRows: "1fr" }}>
                      <div className="faq-a-in" style={{ fontSize: 17 }}>
                        <div className="faq-a-pad">
                          <span data-en>{item.a}</span>
                          <span data-ur className="urdu">{item.aUr}</span>
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
