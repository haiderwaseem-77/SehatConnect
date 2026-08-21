// /areas/dha — the "home nurse in DHA Lahore" local landing page.
//
// THE ANTI-DOORWAY RULE (keyword-map rule 5): this page exists only because it
// says things that are true of DHA and of nowhere else in Lahore. The anchor is
// the `distinct` note in lib/areas.ts — our office is IN DHA Phase 8, so this is
// the area we are closest to. Everything area-specific on this page traces back
// to that, to the two hospitals listed for DHA in lib/areas.ts, or to the office
// address itself. If a paragraph here would read correctly with "Gulberg" or
// "Johar Town" pasted over "DHA", it does not belong.
//
// HARD CONSTRAINTS held here:
//   1. NO PRICE anywhere — copy, meta or JSON-LD (Decision Ledger #9). The
//      do-not-render pricing constant in lib/constants.ts is NOT imported.
//   2. HOSPITALS: named only as a factual statement about where our patients
//      have come from, always with an explicit "no affiliation" line, always
//      with "and hospitals across Lahore" so the list reads as illustrative.
//      Never in the title, the meta description or the H1. Only the names in
//      lib/areas.ts — never invent one.
//   3. NO INVENTED LOCAL DETAIL: no response time, no travel time, no caregiver
//      count, no families-served count, no review. "Closest to" carries no number
//      because no number has been measured.
//   4. Promise strings imported VERBATIM from lib/constants.ts (NORTH-STAR §3).
//   5. Every user-facing English string carries an Urdu counterpart (§5).
//   6. No physiotherapy framing (#15), no ventilator/tracheostomy (#16), and no
//      clinical outcome claims anywhere.
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
const AREA = areaBySlug("dha")!;
const [HOSPITAL_A, HOSPITAL_B] = AREA.hospitals;

export const metadata: Metadata = {
  title: "Home Nurse & Attendant in DHA, Lahore",
  description:
    "Our office is in DHA Phase 8, so DHA is the part of Lahore we are closest to. PNC-registered nurses for a single visit or a 12-hour shift, and trained attendants. First day free, no advance.",
  alternates: { canonical: `${SITE_URL}/areas/${AREA.slug}` },
};

const WA_MSG = serviceWaMsg("DHA mein ghar par nurse ya attendant");

type Bilingual = { en: string; ur: string };

/* ------------------------------------------------------------------ *
 * What DHA families ask for. Derived honestly from the one thing that is
 * true only here — the office is inside this area — and from the kind of
 * hospitals DHA patients come home from. No volume claims: "families ask
 * us for" is a description of requests, not a statistic.
 * ------------------------------------------------------------------ */
const ASKS: { title: Bilingual; body: Bilingual }[] = [
  {
    title: { en: "One nurse, one task, one visit", ur: "ایک نرس، ایک کام، ایک وزٹ" },
    body: {
      en: "An injection, a drip or a dressing change that the patient's own doctor has prescribed. The nurse comes, does that, and leaves — there is no 12-hour commitment for a one-off visit. It is the format that suits the area our office sits in best.",
      ur: "انجیکشن، ڈرپ یا ڈریسنگ — وہی جو مریض کے اپنے ڈاکٹر نے لکھی ہو۔ نرس آتی ہے، وہ کام کرتی ہے اور چلی جاتی ہے۔ ایک وزٹ کے لیے 12 گھنٹے کی پابندی نہیں۔ ہمارا دفتر اسی علاقے میں ہے، اس لیے یہ صورت یہاں سب سے آسانی سے بن جاتی ہے۔",
    },
  },
  {
    title: { en: "A course of visits, not a shift", ur: "وزٹ کا سلسلہ، شفٹ نہیں" },
    body: {
      en: "A dressing that has to be changed every second day, or an injection course that runs for a week. Short visits, repeated — a far easier thing to keep to when the office is in the same area as the house.",
      ur: "ایسی ڈریسنگ جو ہر دوسرے دن بدلنی ہو، یا ہفتہ بھر چلنے والا انجیکشن کا کورس۔ مختصر وزٹ، بار بار — اور جب دفتر اُسی علاقے میں ہو جہاں گھر ہے تو یہ سلسلہ نبھانا کہیں آسان ہوتا ہے۔",
    },
  },
  {
    title: { en: "A day shift for an elderly parent", ur: "بزرگ والدین کے لیے دن کی شفٹ" },
    body: {
      en: "Feeding, hygiene, movement and company from 8:00 AM to 8:00 PM, so the working members of the house are not leaving a parent on their own all day. If there is clinical work too, a nurse comes instead of an attendant.",
      ur: "صبح 8 بجے سے رات 8 بجے تک کھانا، صفائی، چلنا پھرنا اور ساتھ — تاکہ گھر کے کام پر جانے والے افراد والدین کو سارا دن اکیلا نہ چھوڑیں۔ اگر طبی کام بھی ہو تو اٹینڈنٹ کی جگہ نرس آتی ہے۔",
    },
  },
];

/* ------------------------------------------------------------------ *
 * Who comes into your home — site-wide facts, kept short here, with one
 * DHA-only line about the phases at the end.
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
    en: "When you call, we ask which phase of DHA and which block, so nobody is hunting for the gate",
    ur: "کال پر ہم پوچھتے ہیں کہ ڈی ایچ اے کا کون سا فیز اور کون سا بلاک — تاکہ کوئی گیٹ ڈھونڈتا نہ رہے",
  },
];

/* ------------------------------------------------------------------ *
 * FAQ — mirrored byte-for-byte into the FAQPage JSON-LD. One question is
 * DHA-only (the phases), one carries natural Roman Urdu. No hospital name
 * appears in this FAQ: the hospitals sentence lives in the body copy.
 * ------------------------------------------------------------------ */
const AREA_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "Which parts of DHA do you cover?",
    qUr: "ڈی ایچ اے کے کن حصوں میں آپ آتے ہیں؟",
    a: "All of DHA. Our office is in DHA Phase 8, which makes this the area of Lahore we are closest to — we do not put a number on that, because we have not measured one. On the call we ask which phase and which block you are in, and we fix the arrival time with you then.",
    aUr: "پورے ڈی ایچ اے میں۔ ہمارا دفتر ڈی ایچ اے فیز 8 میں ہے، اس لیے لاہور میں یہ علاقہ ہمارے سب سے قریب ہے — ہم اس کے ساتھ کوئی وقت نہیں لکھتے، کیونکہ ہم نے ابھی ناپا نہیں۔ کال پر ہم پوچھ لیتے ہیں کہ کون سا فیز اور کون سا بلاک، اور آنے کا وقت اُسی وقت طے کر لیتے ہیں۔",
  },
  {
    q: "Ghar par drip lagwani hai — can a nurse come for just one visit?",
    qUr: "گھر پر صرف ڈرپ لگوانی ہے — کیا نرس ایک ہی وزٹ کے لیے آ سکتی ہے؟",
    a: "Yes. A nurse can come for a single visit — an injection, a drip or a dressing change that the patient's doctor has prescribed — and leave once it is done. You do not have to take a 12-hour shift to get one task done at home.",
    aUr: "جی ہاں۔ نرس صرف ایک وزٹ کے لیے آ سکتی ہے — انجیکشن، ڈرپ یا ڈریسنگ، جو مریض کے ڈاکٹر نے لکھی ہو — اور کام مکمل ہوتے ہی چلی جاتی ہے۔ ایک کام کے لیے 12 گھنٹے کی شفٹ لینا ضروری نہیں۔",
  },
  {
    q: "My father comes home tomorrow. How soon can someone start?",
    qUr: "والد صاحب کل گھر آ رہے ہیں۔ کتنی جلدی کوئی آ سکتا ہے؟",
    a: "Leave your name and number, or just call. We call back fast — usually within 15 minutes. Care can start within 24 hours of your call. Your first day is free — no cost, no obligation. Continue only if you're happy.",
    aUr: "نام اور نمبر چھوڑ دیں، یا سیدھا کال کر لیں۔ ہم جلد واپس کال کرتے ہیں — عموماً 15 منٹ کے اندر۔ دیکھ بھال آپ کی کال کے 24 گھنٹوں کے اندر شروع ہو سکتی ہے۔ پہلا دن مفت ہے؛ پسند آئے تو ہی آگے جاری رکھیں۔",
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD — one business identity, built from lib/schema.ts, with
 * areaServed narrowed to DHA inside Lahore. No price of any kind.
 * ------------------------------------------------------------------ */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Sehat Connect",
  description:
    "Nurses and attendants at home in DHA, Lahore. Single nurse visits, 12-hour day and night shifts, and round-the-clock cover as two caregivers across two shifts. Office in DHA Phase 8.",
  url: `${SITE_URL}/areas/${AREA.slug}`,
  telephone: CONTACT_PHONE_TEL,
  email: CONTACT_EMAIL,
  address: OFFICE_POSTAL_ADDRESS,
  areaServed: {
    "@type": "Place",
    name: "DHA, Lahore",
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

export default function DhaAreaPage() {
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
                    <span data-en>DHA, Lahore &middot; the area our office is in</span>
                    <span data-ur className="urdu">ڈی ایچ اے، لاہور &middot; وہ علاقہ جہاں ہمارا دفتر ہے</span>
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
                      Our office is in DHA Phase 8 &mdash; inside the area itself. Of everywhere we go
                      in Lahore, DHA is the part we are closest to. We will not attach a number to
                      that, because we have not measured one. What it means in practice is simple: a
                      short nurse visit here is an easy thing for us to arrange.
                    </span>
                    <span data-ur className="urdu">
                      ہمارا دفتر ڈی ایچ اے فیز 8 میں ہے &mdash; یعنی اسی علاقے کے اندر۔ لاہور میں جہاں
                      جہاں ہم جاتے ہیں، ان میں ڈی ایچ اے ہمارے سب سے قریب ہے۔ ہم اس کے ساتھ کوئی وقت
                      نہیں لکھتے، کیونکہ ہم نے ابھی ناپا نہیں۔ عملی طور پر بات سیدھی ہے: یہاں نرس کا
                      مختصر وزٹ ہمارے لیے آسانی سے بن جاتا ہے۔
                    </span>
                  </p>

                  <div className="hero-trust">
                    <span className="pill">
                      <span data-en>Office in DHA Phase 8</span>
                      <span data-ur className="urdu">دفتر ڈی ایچ اے فیز 8 میں</span>
                    </span>
                    <span className="pill">
                      <span data-en>{PROMISES.trial.enShort}</span>
                      <span data-ur className="urdu">{PROMISES.trial.urShort}</span>
                    </span>
                    <span className="pill">
                      <span data-en>No advance</span>
                      <span data-ur className="urdu">کوئی پیشگی نہیں</span>
                    </span>
                    <span className="pill">
                      <span data-en>24/7</span>
                      <span data-ur className="urdu">چوبیس گھنٹے</span>
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

          {/* ---- what DHA families ask for ---- */}
          <section className="block" style={{ paddingTop: 34 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>What families here ask us for</span>
                  <span data-ur className="urdu">یہاں کے گھرانے کیا مانگتے ہیں</span>
                </span>
                <h2>
                  <span data-en>Three requests we hear from DHA homes.</span>
                  <span data-ur className="urdu">ڈی ایچ اے کے گھروں سے آنے والی تین بڑی درخواستیں۔</span>
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
            </div>
          </section>

          {/* ---- hospitals + the office, the two things true only of DHA ---- */}
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
                  <span data-en>Where DHA families are coming home from</span>
                  <span data-ur className="urdu">ڈی ایچ اے کے مریض کہاں سے گھر آ رہے ہوتے ہیں</span>
                </h2>
              </div>

              <div style={{ ...CARD, paddingLeft: 30, position: "relative", overflow: "hidden" }}>
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                />
                <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                  <span data-en>
                    Families in DHA often call us after a discharge from {HOSPITAL_A} or {HOSPITAL_B},
                    and from hospitals right across Lahore. Being plain about what that sentence means:
                    we have no arrangement with any hospital, none of them refer patients to us, and
                    the care we give follows what the patient&rsquo;s own doctor has prescribed. The
                    family finds us and calls &mdash; often on the day they bring someone home.
                  </span>
                  <span data-ur className="urdu">
                    ڈی ایچ اے کے گھرانے اکثر {HOSPITAL_A} یا {HOSPITAL_B} سے، اور لاہور بھر کے دوسرے
                    ہسپتالوں سے، مریض گھر لانے کے بعد ہمیں کال کرتے ہیں۔ اس بات کا مطلب صاف کر دیں: کسی
                    ہسپتال سے ہمارا کوئی معاہدہ نہیں، کوئی ہسپتال ہمیں مریض نہیں بھیجتا، اور ہم وہی
                    دیکھ بھال کرتے ہیں جو مریض کے اپنے ڈاکٹر نے لکھی ہو۔ گھر والے خود ہمیں تلاش کر کے
                    کال کرتے ہیں &mdash; اکثر اُسی دن جس دن مریض گھر آتا ہے۔
                  </span>
                </p>
                <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500, marginTop: 16 }}>
                  <span data-en>
                    Our own address is {OFFICE_ADDRESS} &mdash; the same address in our footer and on
                    every listing we publish. That is the whole reason this page is different from our
                    Gulberg and Johar Town pages: those are trips across the city, and DHA is where we
                    already are.
                  </span>
                  <span data-ur className="urdu">
                    ہمارا اپنا پتہ ہے: {OFFICE_ADDRESS} &mdash; وہی پتہ جو فوٹر میں اور ہماری ہر لسٹنگ
                    میں لکھا ہے۔ یہی وجہ ہے کہ یہ صفحہ گلبرگ اور جوہر ٹاؤن والے صفحوں سے مختلف ہے: وہ
                    شہر کے دوسری طرف کا سفر ہیں، اور ڈی ایچ اے وہ جگہ ہے جہاں ہم پہلے سے موجود ہیں۔
                  </span>
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
                  <span data-en>You meet them before they arrive.</span>
                  <span data-ur className="urdu">وہ پہنچنے سے پہلے آپ ان سے متعارف ہو جاتے ہیں۔</span>
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
                  <span data-en>A visit, a shift, or both shifts.</span>
                  <span data-ur className="urdu">ایک وزٹ، ایک شفٹ، یا دونوں شفٹیں۔</span>
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
                <span data-en>{PROMISES.payment.en} {START_PROMISE.en} {CALLBACK_PROMISE.en}</span>
                <span data-ur className="urdu">{PROMISES.payment.ur} {START_PROMISE.ur} {CALLBACK_PROMISE.ur}</span>
              </p>
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="dha-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Questions we get from DHA</span>
                  <span data-ur className="urdu">ڈی ایچ اے سے آنے والے سوالات</span>
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
                <Link className="btn btn-ghost" href="/areas/gulberg">
                  <span data-en>Gulberg</span>
                  <span data-ur className="urdu">گلبرگ</span>
                </Link>
                <Link className="btn btn-ghost" href="/areas/johar-town">
                  <span data-en>Johar Town</span>
                  <span data-ur className="urdu">جوہر ٹاؤن</span>
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
