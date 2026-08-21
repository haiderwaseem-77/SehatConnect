// /areas/johar-town — the "home nurse in Johar Town Lahore" local landing page.
//
// THE ANTI-DOORWAY RULE (keyword-map rule 5): this page exists because Johar
// Town's `distinct` note in lib/areas.ts is a real, area-only fact — it sits
// beside the city's biggest private and cancer hospitals, so a large share of
// what families here ask for is care in the days straight after a discharge.
// That makes this page about the discharge-day call, while /areas/dha is about
// being next door to our office and /areas/gulberg is about long-running care
// for a parent in the family home. If a paragraph here would read correctly
// with another area's name pasted in, it does not belong.
//
// HARD CONSTRAINTS held here:
//   1. NO PRICE anywhere — copy, meta or JSON-LD (Decision Ledger #9). The
//      do-not-render pricing constant in lib/constants.ts is NOT imported.
//   2. HOSPITALS: named as a factual statement about where our patients have
//      come from, always with an explicit "no affiliation" line and "hospitals
//      across Lahore" so the list reads as illustrative. Never in the title,
//      the meta description or the H1; body copy plus ONE FAQ answer only.
//      Only the names in lib/areas.ts — never invent one.
//   3. NO INVENTED LOCAL DETAIL: no travel time, no response time, no caregiver
//      count, no families-served count, no review.
//   4. Promise strings imported VERBATIM from lib/constants.ts (NORTH-STAR §3).
//   5. Every user-facing English string carries an Urdu counterpart (§5).
//   6. NO CLINICAL OUTCOME CLAIMS. Repositioning "reduces the risk of" bed
//      sores — it never prevents them. Nothing here promises recovery, healing
//      or a timeline. No physiotherapy framing (#15); no ventilator or
//      tracheostomy care, which we do not offer (#16) — ICU/HDU step-down only.
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
import { areaBySlug } from "@/lib/areas";
import { breadcrumbList, businessSameAs, OPENING_HOURS } from "@/lib/schema";
import { waLink, serviceWaMsg } from "@/lib/wa";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

// Read the area from lib/areas.ts so this page and /areas can never drift.
const AREA = areaBySlug("johar-town")!;
const [HOSPITAL_A, HOSPITAL_B, HOSPITAL_C] = AREA.hospitals;

export const metadata: Metadata = {
  title: "Home Nurse in Johar Town, Lahore | Post-Op Care",
  description:
    "Nurse or attendant at home in Johar Town, Lahore for the days after a hospital discharge — dressings, drips, medicines on time, help getting out of bed. Care can start within 24 hours of your call.",
  alternates: { canonical: `${SITE_URL}/areas/${AREA.slug}` },
};

const WA_MSG = serviceWaMsg("Johar Town mein ghar par nurse ya attendant");

type Bilingual = { en: string; ur: string };

/* ------------------------------------------------------------------ *
 * What Johar Town families ask for. Derived from the `distinct` note —
 * the discharge-day call. Nothing here claims an outcome: repositioning
 * REDUCES THE RISK of bed sores, and no timeline or recovery is promised.
 * ------------------------------------------------------------------ */
const ASKS: { title: Bilingual; body: Bilingual }[] = [
  {
    title: { en: "The first days after an operation", ur: "آپریشن کے بعد کے پہلے دن" },
    body: {
      en: "Wound dressing, a drip or an injection the patient's own doctor has prescribed, medicines at the right hours, and a hand when someone needs to get out of bed and sit up. The clinical work is done by a PNC-registered Qualified Nurse.",
      ur: "زخم کی ڈریسنگ، ڈرپ یا انجیکشن جو مریض کے اپنے ڈاکٹر نے لکھا ہو، دواؤں کا صحیح وقت پر دینا، اور بستر سے اٹھنے اور بیٹھنے میں سہارا۔ طبی کام PNC رجسٹرڈ نرس کرتی ہے۔",
    },
  },
  {
    title: { en: "The nights of that first week", ur: "پہلے ہفتے کی راتیں" },
    body: {
      en: "Somebody awake from 8:00 PM to 8:00 AM while the rest of the house sleeps. If you need cover through the day as well, that is two caregivers across two 12-hour shifts — never one person awake for 24 hours, because nobody does that well.",
      ur: "رات 8 بجے سے صبح 8 بجے تک کوئی جاگتا رہے، جب باقی گھر سو رہا ہو۔ اگر دن کے لیے بھی ضرورت ہو تو وہ دو افراد کی دو بارہ گھنٹے کی شفٹیں ہوتی ہیں — ایک ہی شخص 24 گھنٹے نہیں، کیونکہ یہ کوئی بھی ٹھیک طرح نہیں کر سکتا۔",
    },
  },
  {
    title: { en: "Comfort during a long treatment", ur: "لمبے علاج کے دوران آرام" },
    body: {
      en: "For patients home in the middle of a long course of treatment, the work is mostly comfort: staying clean, eating something, turning and repositioning to reduce the risk of bed sores, and not being alone with it. An attendant does this; a nurse comes if there is clinical work too.",
      ur: "جو مریض لمبے علاج کے دوران گھر پر ہوں، ان کے لیے کام زیادہ تر آرام کا ہوتا ہے: صفائی، کچھ کھا لینا، بیڈ سور کا خطرہ کم کرنے کے لیے کروٹ اور پوزیشن بدلتے رہنا، اور اکیلا نہ چھوڑنا۔ یہ کام اٹینڈنٹ کرتا ہے؛ طبی کام ہو تو نرس آتی ہے۔",
    },
  },
];

/* ------------------------------------------------------------------ *
 * Who comes into your home — site-wide facts, weighted here toward a
 * caregiver arriving into a house on discharge day, plus one Johar
 * Town-only line about the block and house number.
 * ------------------------------------------------------------------ */
const WHO_COMES: Bilingual[] = [
  VERIFICATION_PROMISE,
  {
    en: "For a Qualified Nurse, a PNC registration number our team has checked",
    ur: "نرس کی صورت میں PNC رجسٹریشن نمبر، جو ہماری ٹیم خود چیک کرتی ہے",
  },
  {
    en: "Their card on WhatsApp before the visit — photo, name, and PNC number for nurses",
    ur: "آنے سے پہلے واٹس ایپ پر کارڈ: تصویر، نام، اور نرس کے لیے PNC نمبر",
  },
  {
    en: "A message from us when your caregiver is on the way",
    ur: "جب نرس یا اٹینڈنٹ راستے میں ہو تو ہماری طرف سے اطلاع",
  },
  {
    en: "A female nurse or attendant for a female patient, when you ask",
    ur: "خاتون مریضہ کے لیے خاتون نرس یا اٹینڈنٹ، جب آپ کہیں",
  },
  {
    en: "We ask for the block and the house number, so nobody is circling the streets on a hard day",
    ur: "ہم بلاک اور مکان نمبر پوچھ لیتے ہیں، تاکہ جس دن آپ پہلے ہی تھکے ہوں، کوئی گلیوں میں چکر نہ لگاتا رہے",
  },
];

/* ------------------------------------------------------------------ *
 * FAQ — mirrored byte-for-byte into the FAQPage JSON-LD. One question is
 * Johar Town-only (coverage), one carries natural Roman Urdu, and exactly
 * ONE answer names hospitals — the discharge question, which is where a
 * family actually asks it.
 * ------------------------------------------------------------------ */
const AREA_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "We are being discharged tomorrow. Can care start in time?",
    qUr: "کل ڈسچارج ہو رہا ہے۔ کیا اُس وقت تک بندوبست ہو جائے گا؟",
    a: `Usually, yes. Families in Johar Town often call us on discharge day itself, after ${HOSPITAL_A}, ${HOSPITAL_B}, ${HOSPITAL_C} or another of the hospitals across Lahore — we have no arrangement with any of them. Call as soon as you know the date. We call back fast — usually within 15 minutes. Care can start within 24 hours of your call.`,
    aUr: `عموماً جی ہاں۔ جوہر ٹاؤن کے گھرانے اکثر ڈسچارج والے دن ہی کال کرتے ہیں — ${HOSPITAL_A}، ${HOSPITAL_B}، ${HOSPITAL_C} یا لاہور کے کسی اور ہسپتال سے آنے کے بعد۔ ان میں سے کسی سے ہمارا کوئی معاہدہ نہیں۔ تاریخ معلوم ہوتے ہی کال کر لیں۔ ہم جلد واپس کال کرتے ہیں — عموماً 15 منٹ کے اندر۔ دیکھ بھال آپ کی کال کے 24 گھنٹوں کے اندر شروع ہو سکتی ہے۔`,
  },
  {
    q: "Kya nurse ghar aa kar dressing kar sakti hai?",
    qUr: "کیا نرس گھر آ کر ڈریسنگ کر سکتی ہے؟",
    a: "Yes. A nurse can come for a single visit — a dressing change, an injection or a drip that the patient's doctor has prescribed — and leave when it is done. You do not have to book a 12-hour shift for one task.",
    aUr: "جی ہاں۔ نرس صرف ایک وزٹ کے لیے آ سکتی ہے — ڈریسنگ کی تبدیلی، انجیکشن یا ڈرپ، جو مریض کے ڈاکٹر نے لکھی ہو — اور کام مکمل ہوتے ہی چلی جاتی ہے۔ ایک کام کے لیے 12 گھنٹے کی شفٹ لینا ضروری نہیں۔",
  },
  {
    q: "Do you cover all of Johar Town?",
    qUr: "کیا آپ پورے جوہر ٹاؤن میں آتے ہیں؟",
    a: "Yes, every block. Our office is in DHA Phase 8, on the eastern edge of the city, and Johar Town is well to the west — that distance is real and we are not going to invent a response time to cover it. Instead we agree the exact start time with you on the call, ask for the block and house number, and message you when the caregiver is on the way.",
    aUr: "جی، ہر بلاک میں۔ ہمارا دفتر ڈی ایچ اے فیز 8 میں ہے، یعنی شہر کے مشرقی کنارے پر، اور جوہر ٹاؤن خاصا مغرب میں ہے — یہ فاصلہ حقیقی ہے اور ہم اسے چھپانے کے لیے کوئی جھوٹا وقت نہیں بتائیں گے۔ اس کے بجائے ہم شروع کرنے کا صحیح وقت کال پر طے کرتے ہیں، بلاک اور مکان نمبر پوچھتے ہیں، اور روانگی کے وقت آپ کو اطلاع دیتے ہیں۔",
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD — one business identity, built from lib/schema.ts, with
 * areaServed narrowed to Johar Town inside Lahore. No price of any kind,
 * and no hospital named anywhere in the graph.
 * ------------------------------------------------------------------ */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Sehat Connect",
  description:
    "Nurses and attendants at home in Johar Town, Lahore for the days after a hospital discharge: wound dressing, drips and injections, medicines on time, night shifts, and round-the-clock cover as two caregivers across two shifts.",
  url: `${SITE_URL}/areas/${AREA.slug}`,
  telephone: CONTACT_PHONE_TEL,
  email: CONTACT_EMAIL,
  address: OFFICE_POSTAL_ADDRESS,
  areaServed: {
    "@type": "Place",
    name: "Johar Town, Lahore",
    containedInPlace: { "@type": "City", name: "Lahore" },
  },
  openingHours: OPENING_HOURS,
  sameAs: businessSameAs(),
};

const crumbs = [
  { name: "Areas we serve", nameUr: "جن علاقوں میں ہم آتے ہیں", path: "/areas" },
  { name: AREA.name.en, nameUr: AREA.name.ur },
];
const breadcrumbs = breadcrumbList(crumbs);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: AREA_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const CARD: CSSProperties = {
  background: "var(--paper)",
  border: "1px solid var(--line)",
  borderRadius: 20,
  padding: "26px 22px",
  boxShadow: "var(--shadow-sm)",
};

function TickList({ items }: { items: Bilingual[] }) {
  return (
    <div className="id-meta">
      {items.map((item) => (
        <div className="id-row" key={item.en}>
          <span className="tick">
            <svg viewBox="0 0 24 24">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span>
            <span data-en>{item.en}</span>
            <span data-ur className="urdu">{item.ur}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default function JoharTownAreaPage() {
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
          {/* ---- hero ---- */}
          <section className="hero">
            <div className="wrap">
              <div className="hero-grid">
                <div className="hero-copy">

                  <span className="eyebrow eyebrow-plain">
                    <span data-en>Johar Town, Lahore &middot; care after a discharge</span>
                    <span data-ur className="urdu">جوہر ٹاؤن، لاہور &middot; ہسپتال سے گھر آنے کے بعد</span>
                  </span>

                  <h1>
                    <span data-en>
                      Nurse &amp; attendant at home in <span className="hl">{AREA.name.en}</span>, Lahore
                    </span>
                    <span data-ur className="urdu">
                      لاہور کے <span className="hl">{AREA.name.ur}</span> میں گھر پر نرس اور اٹینڈنٹ
                    </span>
                  </h1>

                  <p className="hero-sub">
                    <span data-en>
                      Johar Town sits beside some of the largest private and cancer hospitals in the
                      city, and the calls we get from here show it. They come on discharge day: the
                      patient is home, and with them a discharge slip, a bag of medicines, and a list
                      of instructions nobody had time to explain twice.
                    </span>
                    <span data-ur className="urdu">
                      جوہر ٹاؤن شہر کے سب سے بڑے نجی اور کینسر ہسپتالوں کے ساتھ واقع ہے، اور یہاں سے
                      آنے والی کالوں میں یہ بات صاف نظر آتی ہے۔ یہ کالیں ڈسچارج والے دن آتی ہیں: مریض گھر آ چکا ہوتا ہے، ساتھ ڈسچارج سلپ، دواؤں کا تھیلا، اور
                      ہدایات کی ایک فہرست جسے دوبارہ سمجھانے کا وقت کسی کے پاس نہیں تھا۔
                    </span>
                  </p>

                  <div className="hero-trust">
                    <span className="pill">
                      <span data-en>Single visit or 12-hour shift</span>
                      <span data-ur className="urdu">ایک وزٹ یا 12 گھنٹے کی شفٹ</span>
                    </span>
                    <span className="pill">
                      <span data-en>PNC-registered nurses</span>
                      <span data-ur className="urdu">PNC رجسٹرڈ نرسیں</span>
                    </span>
                    <span className="pill">
                      <span data-en>{PROMISES.trial.enShort}</span>
                      <span data-ur className="urdu">{PROMISES.trial.urShort}</span>
                    </span>
                    <span className="pill">
                      <span data-en>Pay after the shift</span>
                      <span data-ur className="urdu">شفٹ کے بعد ادائیگی</span>
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
                      <span data-en>WhatsApp us</span>
                      <span data-ur className="urdu">واٹس ایپ کریں</span>
                    </a>
                  </div>
                </div>

                <div className="hero-form">
                  <LeadFormD6 variant="hero" area={AREA.name.en} />
                </div>
              </div>
            </div>
          </section>

          {/* ---- what Johar Town families ask for ---- */}
          <section className="block" style={{ paddingTop: 34 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>What families here ask us for</span>
                  <span data-ur className="urdu">یہاں کے گھرانے کیا مانگتے ہیں</span>
                </span>
                <h2>
                  <span data-en>Mostly, the week after the hospital.</span>
                  <span data-ur className="urdu">زیادہ تر، ہسپتال کے بعد والا ہفتہ۔</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ASKS.map((a) => (
                  <div key={a.title.en} style={CARD}>
                    <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                      <span data-en>{a.title.en}</span>
                      <span data-ur className="urdu">{a.title.ur}</span>
                    </h3>
                    <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.62, fontWeight: 500 }}>
                      <span data-en>{a.body.en}</span>
                      <span data-ur className="urdu">{a.body.ur}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Scope honesty: ICU/HDU step-down only (Decision Ledger #16). */}
              <p className="svc-foot" style={{ marginTop: 18 }}>
                <span data-en>
                  We take patients home after a stay in ICU or HDU. We do not do ventilator or
                  tracheostomy care &mdash; we do not have the nurses or equipment for it, and you
                  should hear that here rather than at your door.
                </span>
                <span data-ur className="urdu">
                  آئی سی یو یا ایچ ڈی یو سے گھر آنے والے مریض ہم سنبھالتے ہیں۔ وینٹی لیٹر یا
                  ٹریکیوسٹومی کی دیکھ بھال ہم نہیں کرتے &mdash; اس کے لیے ہمارے پاس نہ عملہ ہے نہ
                  سامان، اور یہ بات آپ کو دروازے پر نہیں، یہیں معلوم ہونی چاہیے۔
                </span>
              </p>
            </div>
          </section>

          {/* ---- hospitals + the distance from our office ---- */}
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
                <h2>
                  <span data-en>The hospitals next door, and where we come from</span>
                  <span data-ur className="urdu">ساتھ والے ہسپتال، اور ہم کہاں سے آتے ہیں</span>
                </h2>
              </div>

              <div style={{ ...CARD, paddingLeft: 30, position: "relative", overflow: "hidden" }}>
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                />
                <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                  <span data-en>
                    {HOSPITAL_A}, {HOSPITAL_B} and {HOSPITAL_C} are all in or beside Johar Town, so a
                    large share of what families here ask us for is care after a discharge from one of
                    them &mdash; or from any of the other hospitals across Lahore. Be clear about what
                    that means: we are not affiliated with any hospital and none of them refer patients
                    to us. Families call us themselves, and we follow what their own doctor has
                    prescribed.
                  </span>
                  <span data-ur className="urdu">
                    {HOSPITAL_A}، {HOSPITAL_B} اور {HOSPITAL_C} سب جوہر ٹاؤن میں یا اس کے ساتھ ہیں، اس
                    لیے یہاں کے گھرانے ہم سے زیادہ تر وہی دیکھ بھال مانگتے ہیں جو ان میں سے کسی ہسپتال
                    سے &mdash; یا لاہور کے کسی اور ہسپتال سے &mdash; گھر آنے کے بعد درکار ہوتی ہے۔ اس
                    بات کو صاف کر دیں: کسی ہسپتال سے ہمارا کوئی تعلق نہیں، کوئی ہمیں مریض نہیں بھیجتا،
                    اور گھر پر ہم وہی کرتے ہیں جو مریض کے اپنے ڈاکٹر نے لکھا ہو۔ گھر والے خود ہمیں
                    ڈھونڈ کر کال کرتے ہیں۔
                  </span>
                </p>
                <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500, marginTop: 16 }}>
                  <span data-en>
                    Our office is at {OFFICE_ADDRESS} &mdash; the eastern edge of the city, while
                    Johar Town is well to the west. We will not invent a response time to make that
                    sound shorter. We agree the exact start time with you on the call instead, so a
                    discharge happening tomorrow gets a straight yes or no from us today.
                  </span>
                  <span data-ur className="urdu">
                    ہمارا دفتر {OFFICE_ADDRESS} میں ہے &mdash; شہر کا مشرقی کنارہ، جبکہ جوہر ٹاؤن خاصا
                    مغرب میں ہے۔ ہم اس فاصلے کو چھوٹا دکھانے کے لیے کوئی جھوٹا وقت نہیں لکھیں گے۔ اس کے
                    بجائے شروع کرنے کا صحیح وقت کال پر طے کر لیتے ہیں، تاکہ کل ہونے والے ڈسچارج کا سیدھا
                    جواب آپ کو آج ہی مل جائے۔
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
                  <span data-en>{START_PROMISE.en} {CALLBACK_PROMISE.en}</span>
                  <span data-ur className="urdu">{START_PROMISE.ur} {CALLBACK_PROMISE.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- who comes into your home ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Who comes into your home</span>
                  <span data-ur className="urdu">آپ کے گھر کون آتا ہے</span>
                </span>
                <h2>
                  <span data-en>You know who is coming before they knock.</span>
                  <span data-ur className="urdu">دروازہ بجنے سے پہلے آپ کو معلوم ہوتا ہے کہ کون آ رہا ہے۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <TickList items={WHO_COMES} />
                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--teal-deep)",
                    lineHeight: 1.6,
                  }}
                >
                  <span data-en>{PROMISES.replacement.en}</span>
                  <span data-ur className="urdu">{PROMISES.replacement.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- care formats ---- */}
          <section className="block" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>How the care is arranged</span>
                  <span data-ur className="urdu">دیکھ بھال کیسے ترتیب پاتی ہے</span>
                </span>
                <h2>
                  <span data-en>Start with the week you cannot manage.</span>
                  <span data-ur className="urdu">اُس ہفتے سے شروع کریں جو آپ سے نہیں سنبھلتا۔</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CARE_FORMATS.map((f) => (
                  <div key={f.id} style={CARD}>
                    <h3 style={{ fontSize: 20, marginBottom: 8 }}>
                      <span data-en>{f.name.en}</span>
                      <span data-ur className="urdu">{f.name.ur}</span>
                    </h3>
                    <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.62, fontWeight: 500 }}>
                      <span data-en>{f.detail.en}</span>
                      <span data-ur className="urdu">{f.detail.ur}</span>
                    </p>
                  </div>
                ))}
              </div>

              <p className="svc-foot" style={{ marginTop: 18 }}>
                <span data-en>{PROMISES.payment.en} {PROMISES.trial.en}</span>
                <span data-ur className="urdu">{PROMISES.payment.ur} {PROMISES.trial.ur}</span>
              </p>
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="johar-town-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Questions we get from Johar Town</span>
                  <span data-ur className="urdu">جوہر ٹاؤن سے آنے والے سوالات</span>
                </span>
                <h2>
                  <span data-en>Straight answers.</span>
                  <span data-ur className="urdu">سیدھے جواب۔</span>
                </h2>
              </div>

              <div className="faq-list">
                {AREA_FAQ.map((item) => (
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

          {/* ---- cross-links ---- */}
          <section className="block" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head" style={{ marginBottom: 14 }}>
                <h2 style={{ fontSize: "clamp(20px,4.4vw,26px)" }}>
                  <span data-en>Somewhere else in Lahore?</span>
                  <span data-ur className="urdu">لاہور کے کسی اور علاقے میں؟</span>
                </h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link className="btn btn-ghost" href="/areas/dha">
                  <span data-en>DHA</span>
                  <span data-ur className="urdu">ڈی ایچ اے</span>
                </Link>
                <Link className="btn btn-ghost" href="/areas/gulberg">
                  <span data-en>Gulberg</span>
                  <span data-ur className="urdu">گلبرگ</span>
                </Link>
                <Link className="btn btn-ghost" href="/areas">
                  <span data-en>All areas we serve</span>
                  <span data-ur className="urdu">تمام علاقے</span>
                </Link>
                <Link className="btn btn-ghost" href="/services/elderly-care">
                  <span data-en>Elderly care at home</span>
                  <span data-ur className="urdu">بزرگوں کی گھر پر دیکھ بھال</span>
                </Link>
                <Link className="btn btn-ghost" href="/charges">
                  <span data-en>How charges work</span>
                  <span data-ur className="urdu">چارجز کیسے طے ہوتے ہیں</span>
                </Link>
              </div>
            </div>
          </section>

          <CtaBanner />
          <div className="seam-gold" aria-hidden="true" />
        </main>
        <Footer />
      </LandingRoot>
    </>
  );
}
