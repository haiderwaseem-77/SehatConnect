// /services/injection-drip — "injection & drip at home in Lahore".
//
// WHY THIS PAGE EXISTS (owner-confirmed 2026-08-21): the site used to model ONLY
// 12-hour shifts, so the SHORT ONE-OFF NURSE VISIT — a nurse comes, gives the
// injection or sets the drip, and leaves — was invisible. That single visit is
// exactly what someone searching "drip at home Lahore" / "ghar par drip lagwana"
// wants, and it is the easiest first booking in this category. So the H1, the
// opening paragraph and the first CTA all lead with the single visit; the
// 12-hour shift is offered afterwards, as the option for ongoing care. The
// visit-vs-shift model is imported from CARE_FORMATS, never re-typed here.
//
// HARD CONSTRAINT (NORTH-STAR Decision Ledger #9): no money figure anywhere —
// not in copy, meta, or JSON-LD. The do-not-render pricing constant in
// lib/constants.ts is deliberately NOT imported. Price is quoted on the first call
// (PROMISES.priceOnCall).
//
// HONESTY GAP, deliberately left open: nothing in this repo or in NORTH-STAR
// says who buys or pays for the medicine, the drip set, the cannula or any other
// consumable. So this page never states it. It sends that question to the call,
// exactly the way /charges handles the same gap.
//
// Every promise string is imported verbatim from lib/constants.ts (NORTH-STAR
// §3 promises table). Never paraphrase, soften or strengthen one — "usually" in
// the callback promise is mandatory.
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

export const metadata: Metadata = {
  title: "Injection & Drip at Home in Lahore | Nurse Visit",
  description:
    "A PNC-registered nurse comes home in Lahore for an injection, an IV drip or a dressing — a single visit, no 12-hour commitment. On the doctor's prescription. Call and a real person answers.",
  alternates: { canonical: `${SITE_URL}/services/injection-drip` },
};

const NIGHT_SHIFT = SHIFTS.find((s) => s.id === "night")?.time ?? "";

const WA_MSG = serviceWaMsg("injection ya drip ke liye nurse");

type Bilingual = { en: string; ur: string };

// The single visit is the lead of this page; the shifts are the ongoing-care
// option underneath it. Both come from CARE_FORMATS (lib/constants.ts).
const VISIT_FORMAT = CARE_FORMATS.find((f) => f.id === "visit");
const ONGOING_FORMATS = CARE_FORMATS.filter((f) => f.id !== "visit");

/* ------------------------------------------------------------------ *
 * What a nurse can actually do at home. Every line is already claimed on
 * /services/qualified-nurse — nothing new is invented here. Medical terms
 * are glossed in plain words (NORTH-STAR §5: never jargon without a gloss).
 * ------------------------------------------------------------------ */
const AT_HOME: Bilingual[] = [
  {
    en: "Injections — into the muscle (IM) or into a vein (IV), given on the doctor's prescription",
    ur: "انجیکشن — پٹھے میں (IM) یا رگ میں (IV)، ڈاکٹر کے نسخے کے مطابق",
  },
  {
    en: "IV drips — fluid or medicine given slowly into a vein, on the doctor's prescription",
    ur: "ڈرپ — رگ کے ذریعے آہستہ آہستہ دیا جانے والا پانی یا دوا، ڈاکٹر کے نسخے کے مطابق",
  },
  {
    en: "Wound care and dressing — cleaning the wound and changing the dressing, including after an operation",
    ur: "زخم اور ڈریسنگ — زخم صاف کرنا اور ڈریسنگ بدلنا، آپریشن کے بعد بھی",
  },
  {
    en: "Vitals check — blood pressure, temperature, pulse, blood sugar and oxygen",
    ur: "طبی علامات چیک کرنا — بلڈ پریشر، درجہ حرارت، نبض، شوگر اور آکسیجن",
  },
  {
    en: "Medicines — giving prescribed medicines on time and watching for any reaction",
    ur: "دوائیں — تجویز کردہ دوائیں وقت پر دینا اور کسی ردعمل پر نظر رکھنا",
  },
  {
    en: "Tubes and catheters — looking after a catheter (urine tube) or an NG feeding tube (a feeding tube through the nose), on the doctor's plan",
    ur: "ٹیوب اور کیتھیٹر — ڈاکٹر کے پلان کے مطابق کیتھیٹر (پیشاب کی نالی) یا NG فیڈنگ ٹیوب (ناک کے ذریعے کھانے کی نالی) کی دیکھ بھال",
  },
];

/* ------------------------------------------------------------------ *
 * Who comes — the verification artifacts, all of them already published
 * elsewhere on the site (FAQ_ITEMS, /charges, NORTH-STAR §3).
 * ------------------------------------------------------------------ */
const WHO_COMES: Bilingual[] = [
  {
    en: "A Qualified Nurse, registered with the Pakistan Nursing Council — the PNC registration number is checked by our team",
    ur: "PNC (پاکستان نرسنگ کونسل) میں رجسٹرڈ نرس — رجسٹریشن نمبر ہماری ٹیم خود چیک کرتی ہے",
  },
  {
    en: "Their card on WhatsApp before the visit — photo, name and PNC number, so you know who is at the door",
    ur: "آنے سے پہلے واٹس ایپ پر ان کا کارڈ: تصویر، نام اور PNC نمبر — تاکہ آپ کو معلوم ہو کہ دروازے پر کون ہے",
  },
  {
    en: "A WhatsApp message from us when the nurse is on the way",
    ur: "جب نرس راستے میں ہو تو ہماری طرف سے واٹس ایپ پر اطلاع",
  },
  {
    en: "A female nurse when you ask for one — many families prefer that for a female patient",
    ur: "خاتون نرس، جب آپ کہیں — بہت سے گھرانے خاتون مریض کے لیے یہی پسند کرتے ہیں",
  },
  {
    en: "Liked the nurse? Send us their name on WhatsApp and we will try to send the same person again",
    ur: "نرس پسند آئی؟ ان کا نام واٹس ایپ کر دیں، ہم دوبارہ وہی فرد بھیجنے کی کوشش کریں گے",
  },
];

/* ------------------------------------------------------------------ *
 * What to keep ready. Two verified items, then the honest gap.
 * ------------------------------------------------------------------ */
const KEEP_READY: Bilingual[] = [
  {
    en: "The doctor's prescription. Injections and drips are given on the doctor's prescription — we do not diagnose and we do not prescribe.",
    ur: "ڈاکٹر کا نسخہ۔ انجیکشن اور ڈرپ ڈاکٹر کے نسخے کے مطابق لگتے ہیں — ہم نہ تشخیص کرتے ہیں، نہ دوا تجویز کرتے ہیں۔",
  },
  {
    en: "The medicine or the drip itself, if you have already bought it. Keep it with the prescription so the nurse can check both.",
    ur: "دوا یا ڈرپ، اگر آپ پہلے ہی خرید چکے ہیں۔ اسے نسخے کے ساتھ رکھ لیں تاکہ نرس دونوں دیکھ سکے۔",
  },
  {
    en: "A place for the patient to sit or lie down comfortably, and the address with a landmark so the nurse finds you quickly.",
    ur: "مریض کے آرام سے بیٹھنے یا لیٹنے کی جگہ، اور پتہ کسی نشانی کے ساتھ تاکہ نرس جلدی پہنچ جائے۔",
  },
];

/* ------------------------------------------------------------------ *
 * FAQ — the real query variants families type and say out loud.
 * One question is in Roman Urdu, because that is how many of them search
 * (NORTH-STAR §5 rule 3 and §9.2). Mirrored into the FAQPage JSON-LD.
 * ------------------------------------------------------------------ */
const DRIP_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "How soon can a nurse come home for an injection or a drip?",
    qUr: "انجیکشن یا ڈرپ کے لیے نرس کتنی جلدی گھر آ سکتی ہے؟",
    a: "Leave your name and number, or just call. We call back fast — usually within 15 minutes. Care can start within 24 hours of your call, and we confirm the exact arrival time with you on that call, before anyone leaves for your home. Someone answers the phone and WhatsApp 24 hours a day.",
    aUr: "اپنا نام اور نمبر چھوڑ دیں، یا صرف کال کر لیں۔ ہم جلد واپس کال کرتے ہیں — عموماً 15 منٹ کے اندر۔ دیکھ بھال آپ کی کال کے 24 گھنٹوں کے اندر شروع ہو سکتی ہے، اور آنے کا صحیح وقت ہم اسی کال پر طے کر لیتے ہیں — کسی کے گھر سے نکلنے سے پہلے۔ فون اور واٹس ایپ پر چوبیس گھنٹے جواب ملتا ہے۔",
  },
  {
    q: "Ghar par drip lagwani ho to nurse akeli aati hai? — does one nurse come alone for the visit?",
    qUr: "کیا ڈرپ لگوانے کے لیے ایک ہی نرس آتی ہے؟",
    a: "Yes. For a single visit, one Qualified Nurse comes to your home, does what the doctor has prescribed — the injection, the drip, the dressing — and leaves. There is no 12-hour commitment. You get the caregiver's card on WhatsApp before they arrive, and if you would prefer a female nurse, tell us when we call and we will send one.",
    aUr: "جی ہاں۔ ایک وزٹ کے لیے ایک نرس آپ کے گھر آتی ہے، ڈاکٹر کے نسخے کے مطابق کام کرتی ہے — انجیکشن، ڈرپ یا ڈریسنگ — اور چلی جاتی ہے۔ 12 گھنٹے کی کوئی پابندی نہیں۔ آنے سے پہلے ان کا کارڈ واٹس ایپ پر آ جاتا ہے، اور اگر آپ خاتون نرس چاہتے ہیں تو کال پر بتا دیں، ہم خاتون نرس بھیج دیں گے۔",
  },
  {
    q: "Do you bring the drip and the medicine, or do we arrange them?",
    qUr: "ڈرپ اور دوا آپ لاتے ہیں یا ہمیں خود منگوانی ہوتی ہے؟",
    a: "Ask us this on the first call, and we will answer plainly before anyone comes to your home. If you have already bought the medicine or the drip on the doctor's prescription, keep it ready with the prescription. If you have not bought it yet, tell us on the call and we will sort it out with you then — we would rather be clear before care starts than surprise you afterwards.",
    aUr: "یہ پہلی کال پر ضرور پوچھ لیں، ہم کسی کے گھر آنے سے پہلے صاف بتا دیں گے۔ اگر آپ ڈاکٹر کے نسخے پر دوا یا ڈرپ خرید چکے ہیں تو اسے نسخے کے ساتھ تیار رکھیں۔ اگر ابھی نہیں خریدی تو کال پر بتا دیں، ہم وہیں طے کر لیں گے — ہم بعد میں حیران کرنے کے بجائے کام شروع ہونے سے پہلے صاف بات کرنا بہتر سمجھتے ہیں۔",
  },
  {
    q: "Is a doctor's prescription needed for an injection or drip at home?",
    qUr: "کیا گھر پر انجیکشن یا ڈرپ کے لیے ڈاکٹر کا نسخہ ضروری ہے؟",
    a: "Yes. A nurse gives injections and drips on the doctor's prescription. We do not diagnose and we do not prescribe — that is the doctor's job, and doing it any other way would not be safe. Keep the prescription with you when the nurse arrives so it can be checked.",
    aUr: "جی ہاں۔ نرس انجیکشن اور ڈرپ ڈاکٹر کے نسخے کے مطابق لگاتی ہے۔ ہم نہ تشخیص کرتے ہیں، نہ دوا تجویز کرتے ہیں — یہ ڈاکٹر کا کام ہے، اور اس کے بغیر کرنا محفوظ نہیں۔ نرس کے آنے پر نسخہ اپنے پاس رکھیں تاکہ وہ اسے دیکھ سکے۔",
  },
  {
    q: "Can a nurse come at night?",
    qUr: "کیا نرس رات کو آ سکتی ہے؟",
    a: `Someone answers the phone and WhatsApp 24 hours a day, every day. Night care is a normal part of what we do — the night shift runs ${NIGHT_SHIFT}. For a single night visit, tell us the time you need and we confirm it with you on the call before anyone sets out.`,
    aUr: `فون اور واٹس ایپ پر چوبیس گھنٹے، ہر روز جواب ملتا ہے۔ رات کی دیکھ بھال ہمارے لیے معمول کی بات ہے — رات کی شفٹ ${NIGHT_SHIFT} تک ہوتی ہے۔ رات کے ایک وزٹ کے لیے ہمیں مطلوبہ وقت بتا دیں، ہم کال پر ہی طے کر لیتے ہیں — کسی کے نکلنے سے پہلے۔`,
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD. No price, priceRange, priceCurrency or priceSpecification
 * anywhere in this graph (Decision Ledger #9).
 * ------------------------------------------------------------------ */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Injection & Drip at Home (Lahore)",
  alternateName: "IV drip at home Lahore",
  description:
    "A PNC-registered nurse visits your home in Lahore to give an IM or IV injection, set up an IV drip, or change a dressing, on the doctor's prescription. Available as a single short visit or as a 12-hour shift for ongoing care.",
  url: `${SITE_URL}/services/injection-drip`,
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
  relevantSpecialty: [
    "Intramuscular injection at home",
    "Intravenous injection at home",
    "IV drip at home",
    "Wound dressing at home",
    "Vitals monitoring at home",
  ],
};

const breadcrumbs = breadcrumbList([
  { name: "Services", path: "/services" },
  { name: "Injection & Drip" },
]);

// Mirrors the on-page FAQ exactly — Google requires the schema and the rendered
// content to match.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DRIP_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ------------------------------------------------------------------ *
 * Shared inline styles — same card language as /charges, /about, /services.
 * No new CSS: every class used here already exists in app/direction6.css.
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

export default function InjectionDripPage() {
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
          {/* ---- hero: the query in the H1, the single visit in the first line ---- */}
          <section className="hero">
            <div className="wrap">
              <div className="hero-grid">
                <div className="hero-copy">
                  <span className="eyebrow eyebrow-plain">
                    <span data-en>One visit is enough — Ghar par drip ya injection</span>
                    <span data-ur className="urdu">ایک وزٹ ہی کافی ہے — گھر پر ڈرپ یا انجیکشن</span>
                  </span>

                  <h1>
                    <span data-en>
                      Injection and drip <span className="hl">at home in Lahore</span>
                    </span>
                    <span data-ur className="urdu">
                      <span className="hl">لاہور</span> میں گھر پر انجیکشن اور ڈرپ
                    </span>
                  </h1>

                  <p className="hero-sub">
                    <span data-en>
                      A nurse can come for a single visit — gives the injection or sets the drip,
                      changes a dressing if that is needed, and leaves — no 12-hour commitment, no
                      taking a sick person to a clinic. Injections and drips are given on the
                      doctor&rsquo;s prescription, by a nurse registered with the Pakistan Nursing
                      Council. If your patient needs care all day or all night instead, we arrange
                      that too.
                    </span>
                    <span data-ur className="urdu">
                      نرس صرف ایک وزٹ کے لیے آ سکتی ہے۔ وہ انجیکشن لگاتی ہے یا ڈرپ لگا دیتی ہے،
                      ضرورت ہو تو ڈریسنگ بھی بدل دیتی ہے، اور چلی جاتی ہے — 12 گھنٹے کی کوئی پابندی
                      نہیں، اور مریض کو کلینک لے جانے کی ضرورت نہیں۔ انجیکشن اور ڈرپ ڈاکٹر کے نسخے کے
                      مطابق لگتے ہیں، اور نرس پاکستان نرسنگ کونسل میں رجسٹرڈ ہوتی ہے۔ اگر مریض کو
                      سارا دن یا ساری رات دیکھ بھال چاہیے تو وہ بھی ہو جاتا ہے۔
                    </span>
                  </p>

                  <div className="hero-trust">
                    <span className="pill">
                      <span data-en>A single visit, not a 12-hour shift</span>
                      <span data-ur className="urdu">ایک وزٹ، 12 گھنٹے کی شفٹ نہیں</span>
                    </span>
                    <span className="pill">
                      <span data-en>PNC-registered nurse</span>
                      <span data-ur className="urdu">PNC رجسٹرڈ نرس</span>
                    </span>
                    <span className="pill">
                      <span data-en>On the doctor&rsquo;s prescription</span>
                      <span data-ur className="urdu">ڈاکٹر کے نسخے کے مطابق</span>
                    </span>
                    <span className="pill">
                      <span data-en>Exact price on the first call</span>
                      <span data-ur className="urdu">صحیح قیمت پہلی کال پر</span>
                    </span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
                    <CallButton />
                    <WhatsAppButton
                      label={{ en: "Ask on WhatsApp", ur: "واٹس ایپ پر پوچھیں" }}
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

          {/* ---- what a nurse can give at home ---- */}
          <section className="block" style={{ paddingTop: 34 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>What a nurse can do at your home</span>
                  <span data-ur className="urdu">نرس گھر پر کیا کر سکتی ہے</span>
                </span>
                <h2>
                  <span data-en>The injection, the drip, and everything around it.</span>
                  <span data-ur className="urdu">انجیکشن، ڈرپ، اور اس سے جڑا ہر کام۔</span>
                </h2>
                <p>
                  <span data-en>
                    Plain words, no short forms left unexplained. If your doctor has written
                    something you do not recognise, read it out to us on the call and we will tell
                    you honestly whether a nurse can do it at home.
                  </span>
                  <span data-ur className="urdu">
                    سیدھی بات، بغیر مشکل اصطلاحات کے۔ اگر ڈاکٹر نے کچھ ایسا لکھا ہے جو آپ کو سمجھ نہیں
                    آ رہا، تو کال پر پڑھ کر سنا دیں — ہم صاف بتا دیں گے کہ نرس یہ کام گھر پر کر سکتی
                    ہے یا نہیں۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                <TickList items={AT_HOME} />
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
                    All of this is nurse work. An Attendant does not give injections or drips — they
                    help with feeding, hygiene, movement and company. We will always tell you
                    honestly which one your patient needs.
                  </span>
                  <span data-ur className="urdu">
                    یہ سب نرس کا کام ہے۔ اٹینڈنٹ انجیکشن یا ڈرپ نہیں لگاتا — وہ کھانے، صفائی، چلنے
                    پھرنے اور ساتھ بیٹھنے میں مدد کرتا ہے۔ ہم ہمیشہ صاف بتا دیں گے کہ آپ کے مریض کے
                    لیے کون سا فرد مناسب ہے۔
                  </span>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
                  <Link className="btn btn-ghost" href="/services/qualified-nurse">
                    <span data-en>Everything a qualified nurse handles</span>
                    <span data-ur className="urdu">نرس کے تمام کام دیکھیں</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ---- who comes into your home ---- */}
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
                  <span data-en>Who walks in with the needle</span>
                  <span data-ur className="urdu">سوئی لے کر گھر میں کون آ رہا ہے</span>
                </span>
                <h2>
                  <span data-en>You know who is coming before they arrive.</span>
                  <span data-ur className="urdu">آنے سے پہلے آپ کو معلوم ہوتا ہے کہ کون آ رہا ہے۔</span>
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

          {/* ---- how it works: the single visit first, shifts second (CARE_FORMATS) ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>How it works</span>
                  <span data-ur className="urdu">یہ کیسے ہوتا ہے</span>
                </span>
                <h2>
                  <span data-en>A short visit, or a full shift. You choose.</span>
                  <span data-ur className="urdu">مختصر وزٹ، یا پوری شفٹ۔ فیصلہ آپ کا۔</span>
                </h2>
                <p>
                  <span data-en>
                    Most families who need a drip or an injection need a nurse for half an hour, not
                    for half a day. So that is the first option, and it is a real one.
                  </span>
                  <span data-ur className="urdu">
                    ڈرپ یا انجیکشن کے لیے زیادہ تر گھرانوں کو نرس آدھے گھنٹے کے لیے چاہیے ہوتی ہے،
                    آدھے دن کے لیے نہیں۔ اسی لیے پہلا آپشن یہی ہے، اور یہ حقیقی آپشن ہے۔
                  </span>
                </p>
              </div>

              {VISIT_FORMAT && (
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
                  <span className="eyebrow" style={{ marginBottom: 12 }}>
                    <span data-en>Start here</span>
                    <span data-ur className="urdu">یہاں سے شروع کریں</span>
                  </span>
                  <h3 style={{ fontSize: 22, marginBottom: 10, lineHeight: 1.25 }}>
                    <span data-en>{VISIT_FORMAT.name.en}</span>
                    <span data-ur className="urdu">{VISIT_FORMAT.name.ur}</span>
                  </h3>
                  <p style={{ ...BODY, fontSize: 18 }}>
                    <span data-en>{VISIT_FORMAT.detail.en}</span>
                    <span data-ur className="urdu">{VISIT_FORMAT.detail.ur}</span>
                  </p>
                  <p style={{ ...BODY, fontSize: 16, fontWeight: 600, marginTop: 14 }}>
                    <span data-en>{PROMISES.priceOnCall.en}</span>
                    <span data-ur className="urdu">{PROMISES.priceOnCall.ur}</span>
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
                    <CallButton />
                    <WhatsAppButton
                      label={{ en: "Book a nurse visit on WhatsApp", ur: "واٹس ایپ پر نرس کا وزٹ بک کریں" }}
                    />
                  </div>
                </div>
              )}

              <p style={{ ...BODY, fontSize: 17, fontWeight: 600, marginBottom: 14, maxWidth: "62ch" }}>
                <span data-en>
                  If the drips run for several days, or the patient needs someone with them through
                  the day or the night, a 12-hour shift is the better fit:
                </span>
                <span data-ur className="urdu">
                  اگر ڈرپ کئی دن لگنی ہے، یا مریض کے پاس دن بھر یا رات بھر کسی کا ہونا ضروری ہے، تو 12
                  گھنٹے کی شفٹ زیادہ مناسب رہتی ہے:
                </span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ONGOING_FORMATS.map((f) => (
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

              {/* The shift-scoped promises. Kept under the shift heading on purpose:
                  "first day free" and "pay after the shift" are worded for a shift,
                  so this page never implies them about a single visit. What applies
                  to a visit is settled on the call. */}
              <div style={{ ...CARD, marginTop: 16 }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                  <span data-en>What we promise on a shift</span>
                  <span data-ur className="urdu">شفٹ کے بارے میں ہمارا وعدہ</span>
                </h3>
                <TickList items={[PROMISES.trial, PROMISES.payment, PROMISES.replacement, START_PROMISE]} />
                <p style={{ ...BODY, fontSize: 16, fontWeight: 600, marginTop: 16 }}>
                  <span data-en>
                    Need to cancel or move the time? Call or WhatsApp us up to 4 hours before the
                    shift and we cancel or reschedule it at no charge. For how charging works in
                    general, read the charges page.
                  </span>
                  <span data-ur className="urdu">
                    منسوخ کرنا ہو یا وقت بدلنا ہو؟ شفٹ سے 4 گھنٹے پہلے تک کال یا واٹس ایپ کر دیں، ہم
                    بغیر کسی چارج کے منسوخ یا وقت تبدیل کر دیتے ہیں۔ ادائیگی کا پورا طریقہ چارجز کے
                    صفحے پر لکھا ہے۔
                  </span>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
                  <Link className="btn btn-ghost" href="/charges">
                    <span data-en>How charges work</span>
                    <span data-ur className="urdu">چارجز کیسے طے ہوتے ہیں</span>
                  </Link>
                  <Link className="btn btn-ghost" href="/services/qualified-nurse">
                    <span data-en>Qualified nurse at home</span>
                    <span data-ur className="urdu">گھر پر PNC رجسٹرڈ نرس</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ---- what to keep ready + the honest gap ---- */}
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
                  <span data-en>Before the nurse arrives</span>
                  <span data-ur className="urdu">نرس کے آنے سے پہلے</span>
                </span>
                <h2>
                  <span data-en>What to keep ready.</span>
                  <span data-ur className="urdu">کیا چیزیں تیار رکھنی ہیں۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <TickList items={KEEP_READY} />

                {/* Honesty note. We have no confirmed policy on who buys or pays for
                    medicines and consumables, so this page states none — it sends the
                    question to the call, the same way /charges does. */}
                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 18,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 17,
                    color: "var(--ink-soft)",
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  <span data-en>
                    Not sure who arranges the medicine, the drip set or anything else the nurse will
                    need? Ask us on the first call. We would rather answer plainly before care starts
                    than surprise you afterwards.
                  </span>
                  <span data-ur className="urdu">
                    یہ واضح نہیں کہ دوا، ڈرپ سیٹ یا نرس کی ضرورت کی کوئی اور چیز کون منگوائے گا؟ پہلی
                    کال پر پوچھ لیں۔ ہم بعد میں حیران کرنے کے بجائے کام شروع ہونے سے پہلے صاف بات کرنا
                    بہتر سمجھتے ہیں۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- areas ---- */}
          <section className="block">
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
                    Right now we serve all of Lahore: DHA, Gulberg, Johar Town, Model Town, Bahria
                    Town, Cantt and more. Call or WhatsApp us to check your area. Our office is at{" "}
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
          <section className="block faq" id="injection-drip-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Ghar par drip aur injection — common questions</span>
                  <span data-ur className="urdu">گھر پر ڈرپ اور انجیکشن — عام سوالات</span>
                </span>
                <h2>
                  <span data-en>Straight answers before you call.</span>
                  <span data-ur className="urdu">کال کرنے سے پہلے سیدھے جواب۔</span>
                </h2>
              </div>

              <div className="faq-list">
                {DRIP_FAQ.map((item) => (
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
