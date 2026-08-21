// /charges — the "how much does a home nurse cost in Lahore?" landing page.
//
// HARD CONSTRAINT (NORTH-STAR Decision Ledger #9, 2026-07-02 — live partner
// decision): pricing figures are INTERNAL ONLY. No money figure renders here —
// not in copy, not in JSON-LD, not in the meta description, not as a range or a
// "from" teaser. The do-not-render pricing constant in lib/constants.ts is
// deliberately NOT imported. This page answers HOW pricing works, never WHAT it
// costs; the exact figure is quoted to the family on the first call, before care
// starts (PROMISES.priceOnCall).
//
// Every promise string below is imported verbatim from lib/constants.ts, which
// mirrors the NORTH-STAR §3 promises table. Never paraphrase or strengthen one.
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
  OFFICE_POSTAL_ADDRESS,
  SHIFTS,
  PROMISES,
  CALLBACK_PROMISE,
  START_PROMISE,
  VERIFICATION_PROMISE,
} from "@/lib/constants";
import { breadcrumbList, businessSameAs, OPENING_HOURS } from "@/lib/schema";
import { waLink, serviceWaMsg } from "@/lib/wa";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Home Nurse & Attendant Charges in Lahore",
  description:
    "How home nursing charges work in Lahore. Your exact price is quoted on the first call, before care starts — first day free, no advance, pay after the shift.",
  alternates: { canonical: `${SITE_URL}/charges` },
};

const DAY_SHIFT = SHIFTS.find((s) => s.id === "morning")?.time ?? "";
const NIGHT_SHIFT = SHIFTS.find((s) => s.id === "night")?.time ?? "";

const WA_MSG = serviceWaMsg("nurse ya attendant");

type Bilingual = { en: string; ur: string };

/* ------------------------------------------------------------------ *
 * What decides the price — the three real variables, nothing hidden.
 * ------------------------------------------------------------------ */
const FACTORS: { title: Bilingual; body: Bilingual }[] = [
  {
    title: {
      en: "Which one you need — nurse or attendant",
      ur: "نرس چاہیے یا اٹینڈنٹ",
    },
    body: {
      en: "A Qualified Nurse is PNC registered and handles clinical care — injections, drips, wound dressing, medicines and monitoring. An Attendant gives non-clinical support — feeding, hygiene, movement and companionship. The two are priced differently because the work is different. If you are not sure which your patient needs, tell us what is happening and we will say honestly — we do not send a nurse where an attendant is enough.",
      ur: "PNC رجسٹرڈ نرس طبی کام سنبھالتی ہے: انجیکشن، ڈرپ، زخم کی ڈریسنگ، دوائیں اور نگرانی۔ اٹینڈنٹ غیر طبی روزمرہ مدد دیتا ہے: کھانا، صفائی، چلنا پھرنا اور ساتھ بیٹھنا۔ کام الگ ہے، اس لیے قیمت بھی الگ ہوتی ہے۔ سمجھ نہ آئے تو ہمیں صورتحال بتا دیں؛ ہم صاف بتا دیں گے — جہاں اٹینڈنٹ کافی ہو، وہاں ہم نرس نہیں بھیجتے۔",
    },
  },
  {
    title: {
      en: "Which shift — day or night",
      ur: "کون سی شفٹ — دن یا رات",
    },
    body: {
      en: `Care is arranged in 12-hour shifts: day (${DAY_SHIFT}) or night (${NIGHT_SHIFT}). You can take one, or both. Tell us the hours your family actually struggles with and we will build the plan around them.`,
      ur: `دیکھ بھال 12 گھنٹے کی شفٹ میں ہوتی ہے: دن (${DAY_SHIFT}) یا رات (${NIGHT_SHIFT})۔ ایک شفٹ لیں یا دونوں۔ ہمیں بتا دیں کہ گھر والوں کو کن گھنٹوں میں سب سے زیادہ مشکل ہوتی ہے، ہم اسی حساب سے بندوبست کر دیں گے۔`,
    },
  },
  {
    title: {
      en: "How many days",
      ur: "کتنے دن",
    },
    body: {
      en: "A few days after an operation, or ongoing care every day? Once your family is comfortable with the caregiver, we confirm the daily, weekly or monthly plan on the call — and the price we agreed does not change afterwards.",
      ur: "آپریشن کے بعد چند دن، یا روزانہ کی مسلسل دیکھ بھال؟ جب گھر والے نرس یا اٹینڈنٹ سے مطمئن ہوں، تو ہم کال پر روزانہ، ہفتہ وار یا ماہانہ منصوبہ طے کر لیتے ہیں — اور جو قیمت طے ہو جائے، بعد میں نہیں بدلتی۔",
    },
  },
];

/* ------------------------------------------------------------------ *
 * The payment promises — VERBATIM from lib/constants.ts (NORTH-STAR §3).
 * ------------------------------------------------------------------ */
const PAYMENT_PROMISES: Bilingual[] = [
  PROMISES.payment,
  PROMISES.trial,
  PROMISES.replacement,
  CALLBACK_PROMISE,
  START_PROMISE,
];

/* ------------------------------------------------------------------ *
 * No hidden charges. Every line below is a fact this business already
 * publishes elsewhere on the site — nothing here is invented. Details we
 * cannot verify are deliberately absent; the closing note sends those to
 * the call instead of guessing (NORTH-STAR §3, the "show the artifact" law).
 * ------------------------------------------------------------------ */
const INCLUDED: Bilingual[] = [
  {
    en: "A full 12-hour shift — day or night, at the time we agree on the call",
    ur: "پوری 12 گھنٹے کی شفٹ — دن ہو یا رات، اسی وقت پر جو کال پر طے ہو",
  },
  {
    en: "A caregiver who is CNIC checked, references called, police-verified before they reach your door",
    ur: "ایسا فرد جس کا شناختی کارڈ اور حوالہ جات چیک ہو چکے ہوں اور پولیس تصدیق بھی ہو چکی ہو — گھر پہنچنے سے پہلے",
  },
  {
    en: "For a Qualified Nurse, a PNC registration number our team has checked",
    ur: "نرس کی صورت میں PNC رجسٹریشن نمبر، جو ہماری ٹیم خود چیک کرتی ہے",
  },
  {
    en: "Their card on WhatsApp before the visit — photo, name, and PNC number for nurses",
    ur: "آنے سے پہلے واٹس ایپ پر کارڈ: تصویر، نام، اور نرس کے لیے PNC نمبر",
  },
  {
    en: "A WhatsApp message from us when your caregiver is on the way",
    ur: "جب نرس یا اٹینڈنٹ راستے میں ہو تو ہماری طرف سے واٹس ایپ پر اطلاع",
  },
  {
    en: "A female nurse or attendant when you ask for one",
    ur: "خاتون نرس یا اٹینڈنٹ، جب آپ کہیں",
  },
];

const NEVER_PAY: Bilingual[] = [
  {
    en: "No advance before the shift — you pay after it",
    ur: "شفٹ سے پہلے کوئی پیشگی ادائیگی نہیں — ادائیگی شفٹ کے بعد",
  },
  {
    en: "Nothing for the first day. It is free, whether you continue or not",
    ur: "پہلے دن کا کچھ نہیں۔ وہ مفت ہے، چاہے آپ آگے جاری رکھیں یا نہ رکھیں",
  },
  {
    en: "Nothing for a replacement. If the person does not feel right, we replace them free, until you are fully satisfied",
    ur: "متبادل کا کوئی خرچہ نہیں۔ فرد مناسب نہ لگے تو ہم مفت بدل دیتے ہیں، جب تک آپ مطمئن نہ ہوں",
  },
  {
    en: "No charge to cancel or reschedule, if you call or WhatsApp us up to 4 hours before the shift",
    ur: "شفٹ سے 4 گھنٹے پہلے تک کال یا واٹس ایپ کر دیں تو منسوخی یا وقت بدلنے کا کوئی چارج نہیں",
  },
  {
    en: "No registration fee and no booking fee — the price agreed on the call is the price you pay",
    ur: "نہ رجسٹریشن فیس، نہ بکنگ فیس — جو قیمت کال پر طے ہوئی، وہی ادا کرنی ہے",
  },
];

/* ------------------------------------------------------------------ *
 * FAQ — the real query variants (charges, rate, price, per day,
 * monthly, advance). Mirrored byte-for-byte into the FAQPage JSON-LD.
 * ------------------------------------------------------------------ */
const CHARGES_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "What are the charges for a home nurse in Lahore?",
    qUr: "لاہور میں گھر پر نرس کے چارجز کیا ہیں؟",
    a: "It depends on whether you need a Qualified Nurse or an Attendant, whether you need the day or the night shift, and how many days. That is why there is no price list on this page. We ask a few questions on the first call and tell you one exact price, before anyone comes to your home. Your first day is free, there is no advance, and you pay after the shift.",
    aUr: "یہ اس پر ہے کہ آپ کو PNC رجسٹرڈ نرس چاہیے یا اٹینڈنٹ، دن کی شفٹ چاہیے یا رات کی، اور کتنے دن کے لیے۔ اسی لیے اس صفحے پر کوئی ریٹ لسٹ نہیں۔ ہم پہلی کال پر چند سوال پوچھ کر ایک صحیح قیمت بتا دیتے ہیں — کسی کے گھر آنے سے پہلے۔ پہلا دن مفت ہے، کوئی پیشگی ادائیگی نہیں، اور ادائیگی شفٹ کے بعد ہوتی ہے۔",
  },
  {
    q: "Why is the rate not shown on your website?",
    qUr: "آپ کی ویب سائٹ پر ریٹ کیوں نہیں لکھا؟",
    a: "Because a single number on a web page would be wrong for most families. One family needs a nurse for dressings and drips for three days; another needs an attendant at night for a month. Instead of a number that does not fit your patient, we give you the exact price for your case on the first call, before care starts — and it does not change afterwards.",
    aUr: "کیونکہ ویب سائٹ پر لکھا ہوا ایک نمبر زیادہ تر گھرانوں کے لیے غلط ہوتا ہے۔ کسی کو تین دن کے لیے ڈریسنگ اور ڈرپ والی نرس چاہیے، کسی کو ایک مہینے کے لیے رات کا اٹینڈنٹ۔ ایسے نمبر کے بجائے ہم آپ کے مریض کے حساب سے صحیح قیمت پہلی کال پر بتاتے ہیں، کام شروع ہونے سے پہلے — اور بعد میں وہ نہیں بدلتی۔",
  },
  {
    q: "Do you charge per day or per month?",
    qUr: "چارج روزانہ کے حساب سے ہوتا ہے یا ماہانہ؟",
    a: "Both are possible. Care is arranged in 12-hour shifts, day or night. Once your family is comfortable with the caregiver, we confirm a daily, weekly or monthly plan on the call, whichever suits your situation.",
    aUr: "دونوں طرح ہو سکتا ہے۔ دیکھ بھال 12 گھنٹے کی شفٹ میں ہوتی ہے، دن یا رات۔ جب گھر والے نرس یا اٹینڈنٹ سے مطمئن ہو جائیں، تو ہم کال پر روزانہ، ہفتہ وار یا ماہانہ منصوبہ طے کر لیتے ہیں — جو آپ کے حالات کے مطابق ہو۔",
  },
  {
    q: "Do I have to pay an advance?",
    qUr: "کیا پیشگی ادائیگی کرنی پڑتی ہے؟",
    a: "No advance. Pay after the shift. And your first day is free — no cost, no obligation. Continue only if you are happy.",
    aUr: "کوئی پیشگی ادائیگی نہیں۔ ادائیگی شفٹ کے بعد۔ اور پہلا دن مفت ہے؛ پسند آئے تو ہی آگے جاری رکھیں۔",
  },
  {
    q: "Are there any hidden charges?",
    qUr: "کیا کوئی چھپے ہوئے چارجز ہیں؟",
    a: "No. There is no registration fee and no booking fee. The first day is free, a replacement caregiver is free, and there is no charge to cancel or reschedule if you tell us up to 4 hours before the shift. The price agreed on the call is the price you pay. If you are unsure whether something is covered, ask us on the call — we answer plainly before care starts, not after.",
    aUr: "نہیں۔ نہ رجسٹریشن فیس، نہ بکنگ فیس۔ پہلا دن مفت، متبادل فرد مفت، اور شفٹ سے 4 گھنٹے پہلے بتا دیں تو منسوخی یا وقت بدلنے کا کوئی چارج نہیں۔ جو قیمت کال پر طے ہوئی، وہی ادا کرنی ہے۔ کسی چیز کے بارے میں شک ہو تو کال پر پوچھ لیں — ہم کام شروع ہونے سے پہلے صاف بتا دیتے ہیں، بعد میں نہیں۔",
  },
  {
    q: "How do I pay, and when?",
    qUr: "ادائیگی کیسے اور کب کرنی ہے؟",
    a: "Cash after the shift. No advance. Easypaisa and JazzCash payments are coming soon.",
    aUr: "شفٹ کے بعد نقد ادائیگی۔ کوئی پیشگی نہیں۔ ایزی پیسہ اور جاز کیش کی سہولت جلد آ رہی ہے۔",
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD
 * ------------------------------------------------------------------ */
const crumbs = [{ name: "Charges", nameUr: "اخراجات" }];
const breadcrumbs = breadcrumbList(crumbs);

// NOTE: no price, priceRange, priceCurrency or priceSpecification anywhere in
// this graph — the Offers describe the TERMS in words only (Decision Ledger #9).
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Sehat Connect",
  description:
    "Home nursing charges in Lahore explained: the exact price is quoted on the first call, before care starts. First day free, no advance, pay after the 12-hour shift.",
  url: `${SITE_URL}/charges`,
  telephone: CONTACT_PHONE_TEL,
  email: CONTACT_EMAIL,
  address: OFFICE_POSTAL_ADDRESS,
  areaServed: { "@type": "City", name: "Lahore" },
  openingHours: OPENING_HOURS,
  sameAs: businessSameAs(),
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "MedicalTherapy", name: "Qualified Nurse at Home (Lahore)" },
      description:
        "Exact price quoted on the first call, before care starts. First day free. No advance. Pay after the 12-hour shift.",
      areaServed: { "@type": "City", name: "Lahore" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Patient Attendant at Home (Lahore)" },
      description:
        "Exact price quoted on the first call, before care starts. First day free. No advance. Pay after the 12-hour shift.",
      areaServed: { "@type": "City", name: "Lahore" },
    },
  ],
};

// Mirrors the on-page FAQ above exactly — Google requires the schema and the
// rendered content to match.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CHARGES_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ------------------------------------------------------------------ *
 * Shared inline styles (same card language as /about and /services)
 * ------------------------------------------------------------------ */
const CARD: CSSProperties = {
  background: "var(--paper)",
  border: "1px solid var(--line)",
  borderRadius: 20,
  padding: "26px 22px",
  boxShadow: "var(--shadow-sm)",
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

export default function ChargesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
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
          {/* ---- hero: the query, answered in the H1 ---- */}
          <section className="hero">
            <div className="wrap">
              <div className="hero-grid">
                <div className="hero-copy">
                  <span className="eyebrow eyebrow-plain">
                    <span data-en>Charges, explained honestly</span>
                    <span data-ur className="urdu">قیمت کا معاملہ، صاف الفاظ میں</span>
                  </span>

                  <h1>
                    <span data-en>
                      Home nurse and attendant <span className="hl">charges in Lahore</span>
                    </span>
                    <span data-ur className="urdu">
                      <span className="hl">لاہور</span> میں گھر پر نرس اور اٹینڈنٹ کے چارجز
                    </span>
                  </h1>

                  <p className="hero-sub">
                    <span data-en>
                      There is no price list on this page, and there is an honest reason. What you pay
                      depends on which of the two you need and which shift — so we tell you the exact
                      price on the first call, before care starts.
                    </span>
                    <span data-ur className="urdu">
                      اس صفحے پر ریٹ لسٹ نہیں، اور اس کی ایک صاف وجہ ہے۔ آپ کو کیا دینا ہو گا، یہ اس پر
                      ہے کہ نرس چاہیے یا اٹینڈنٹ، اور کون سی شفٹ — اسی لیے ہم صحیح قیمت پہلی کال پر،
                      کام شروع ہونے سے پہلے بتا دیتے ہیں۔
                    </span>
                  </p>

                  <div className="hero-trust">
                    <span className="pill">
                      <span data-en>{PROMISES.trial.enShort}</span>
                      <span data-ur className="urdu">{PROMISES.trial.urShort}</span>
                    </span>
                    <span className="pill">
                      <span data-en>No advance</span>
                      <span data-ur className="urdu">کوئی پیشگی نہیں</span>
                    </span>
                    <span className="pill">
                      <span data-en>Pay after the shift</span>
                      <span data-ur className="urdu">شفٹ کے بعد ادائیگی</span>
                    </span>
                    <span className="pill">
                      <span data-en>Exact price on the first call</span>
                      <span data-ur className="urdu">صحیح قیمت پہلی کال پر</span>
                    </span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
                    <a className="btn btn-call" href={`tel:${CONTACT_PHONE_TEL}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                      </svg>
                      <span data-en>Call {CONTACT_PHONE_DISPLAY}</span>
                      <span data-ur className="urdu">کال کریں <bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi></span>
                    </a>
                    <a className="btn btn-wa" href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer">
                      <span className="wadot" />
                      <span data-en>Ask on WhatsApp</span>
                      <span data-ur className="urdu">واٹس ایپ پر پوچھیں</span>
                    </a>
                  </div>
                </div>

                <div className="hero-form">
                  <LeadFormD6 variant="hero" />
                </div>
              </div>
            </div>
          </section>

          {/* ---- why no number is printed here ---- */}
          <section className="block" style={{ paddingTop: 34 }}>
            <div className="wrap">
              <div className="sec-head">
                <h2>
                  <span data-en>Why there is no price on this page</span>
                  <span data-ur className="urdu">اس صفحے پر قیمت کیوں نہیں لکھی</span>
                </h2>
              </div>

              <div style={{ ...CARD, paddingLeft: 30, position: "relative", overflow: "hidden" }}>
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                />
                <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                  <span data-en>
                    Two families rarely need the same thing. One needs a Qualified Nurse for dressings
                    and drips for three days after an operation. Another needs an Attendant at night,
                    every night, so their father is not alone. A single number printed here would be
                    wrong for most of them.
                  </span>
                  <span data-ur className="urdu">
                    دو گھرانوں کی ضرورت شاذ و نادر ہی ایک جیسی ہوتی ہے۔ کسی کو آپریشن کے بعد تین دن
                    ڈریسنگ اور ڈرپ کے لیے نرس چاہیے۔ کسی کو ہر رات اٹینڈنٹ چاہیے تاکہ والد صاحب اکیلے
                    نہ رہیں۔ یہاں لکھا ہوا ایک نمبر زیادہ تر گھرانوں کے لیے غلط ہوتا۔
                  </span>
                </p>
                <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500, marginTop: 16 }}>
                  <span data-en>
                    So we ask a few questions on the call instead — who the patient is, what they need,
                    which shift, how many days — and give you one exact price for your case. You hear it
                    before anyone comes to your home, and it does not change afterwards.
                  </span>
                  <span data-ur className="urdu">
                    اس لیے ہم کال پر چند سوال پوچھتے ہیں — مریض کون ہے، کیا ضرورت ہے، کون سی شفٹ،
                    کتنے دن — اور آپ کے کیس کی ایک صحیح قیمت بتا دیتے ہیں۔ یہ قیمت آپ کو کسی کے گھر
                    آنے سے پہلے معلوم ہو جاتی ہے، اور بعد میں نہیں بدلتی۔
                  </span>
                </p>
                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 18,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 19,
                    fontWeight: 800,
                    color: "var(--teal-deep)",
                    lineHeight: 1.55,
                    letterSpacing: "-.01em",
                  }}
                >
                  <span data-en>{PROMISES.priceOnCall.en}</span>
                  <span data-ur className="urdu">{PROMISES.priceOnCall.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- the three things that decide the price ---- */}
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
                  <span data-en>What decides your price</span>
                  <span data-ur className="urdu">قیمت کن باتوں پر ہے</span>
                </span>
                <h2>
                  <span data-en>Three things, and nothing else.</span>
                  <span data-ur className="urdu">صرف تین باتیں، اور کچھ نہیں۔</span>
                </h2>
                <p>
                  <span data-en>
                    You do not have to work any of this out on your own. Tell us the situation on the
                    call and we will do it with you.
                  </span>
                  <span data-ur className="urdu">
                    یہ سب آپ کو خود سمجھنے کی ضرورت نہیں۔ کال پر صورتحال بتا دیں، ہم آپ کے ساتھ مل کر
                    طے کر لیں گے۔
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {FACTORS.map((f, i) => (
                  <div key={f.title.en} style={{ ...CARD, display: "flex", flexDirection: "column" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "rgba(13,122,110,.12)",
                        color: "var(--teal-deep)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 19,
                        fontWeight: 800,
                        marginBottom: 14,
                      }}
                    >
                      {i + 1}
                    </span>
                    <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                      <span data-en>{f.title.en}</span>
                      <span data-ur className="urdu">{f.title.ur}</span>
                    </h3>
                    <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.62, fontWeight: 500 }}>
                      <span data-en>{f.body.en}</span>
                      <span data-ur className="urdu">{f.body.ur}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                <Link className="btn btn-ghost" href="/services/qualified-nurse">
                  <span data-en>What a nurse does</span>
                  <span data-ur className="urdu">نرس کیا کرتی ہے</span>
                </Link>
                <Link className="btn btn-ghost" href="/services/attendant">
                  <span data-en>What an attendant does</span>
                  <span data-ur className="urdu">اٹینڈنٹ کیا کرتا ہے</span>
                </Link>
              </div>
            </div>
          </section>

          {/* ---- the payment promises, verbatim ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>What we promise about money</span>
                  <span data-ur className="urdu">ادائیگی کے بارے میں ہمارا وعدہ</span>
                </span>
                <h2>
                  <span data-en>You risk nothing to find out.</span>
                  <span data-ur className="urdu">معلوم کرنے میں آپ کا کوئی نقصان نہیں۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <TickList items={PAYMENT_PROMISES} />
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
                  <span data-en>{VERIFICATION_PROMISE.en}</span>
                  <span data-ur className="urdu">{VERIFICATION_PROMISE.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- no hidden charges ---- */}
          <section className="block" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>No hidden charges</span>
                  <span data-ur className="urdu">کوئی چھپا ہوا خرچہ نہیں</span>
                </span>
                <h2>
                  <span data-en>What a shift includes — and what you never pay for.</span>
                  <span data-ur className="urdu">شفٹ میں کیا شامل ہے — اور کس چیز کا آپ کبھی نہیں دیتے۔</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                    <span data-en>What a shift includes</span>
                    <span data-ur className="urdu">شفٹ میں کیا شامل ہے</span>
                  </h3>
                  <TickList items={INCLUDED} />
                </div>

                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                    <span data-en>What you never pay for</span>
                    <span data-ur className="urdu">کس چیز کا آپ کبھی نہیں دیتے</span>
                  </h3>
                  <TickList items={NEVER_PAY} />
                </div>
              </div>

              {/* Honesty note: we list only what we can stand behind. Anything we
                  have not confirmed goes to the call, not to a guess on a page. */}
              <p
                style={{
                  marginTop: 18,
                  fontSize: 17,
                  color: "var(--ink-soft)",
                  fontWeight: 600,
                  lineHeight: 1.6,
                  maxWidth: "60ch",
                }}
              >
                <span data-en>
                  Not sure whether something is covered? Ask on the first call. We would rather answer
                  plainly before care starts than surprise you afterwards.
                </span>
                <span data-ur className="urdu">
                  کسی چیز کے بارے میں شک ہو تو پہلی کال پر پوچھ لیں۔ ہم بعد میں حیران کرنے کے بجائے
                  کام شروع ہونے سے پہلے صاف بات کرنا بہتر سمجھتے ہیں۔
                </span>
              </p>
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="charges-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Questions families ask about cost</span>
                  <span data-ur className="urdu">قیمت کے بارے میں عام سوالات</span>
                </span>
                <h2>
                  <span data-en>Straight answers about charges.</span>
                  <span data-ur className="urdu">چارجز کے بارے میں سیدھے جواب۔</span>
                </h2>
              </div>

              <div className="faq-list">
                {CHARGES_FAQ.map((item) => (
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
