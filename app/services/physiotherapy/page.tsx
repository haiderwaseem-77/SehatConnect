// /services/physiotherapy — the "physiotherapy at home Lahore" SEO landing page.
//
// READ DECISION LEDGER #15 BEFORE EDITING A SINGLE WORD OF THIS PAGE.
// Physiotherapy is listed as a service but is NOT confirmed in-house; early on
// the physiotherapist may be a contractor. The owner has approved exactly one
// framing: "we arrange a physiotherapist". So this page is written around what
// is actually true, and its honesty is the whole point of it existing.
//
// HARD CONSTRAINTS held here:
//   1. NEVER claim we employ, staff, train or directly provide a
//      physiotherapist. The only employment language on the page is an
//      explicit DENIAL ("We do not employ a physiotherapist on our own
//      staff — we arrange one"). No possessive that implies staff.
//   2. NO outcome, no rehabilitation, no course of sessions, no treatment
//      plan, no timeline, no named condition, technique or equipment. The
//      home-page line "Movement, mobility and recovery support at home"
//      (ServicesSection) is the CEILING and is quoted once, as the ceiling.
//   3. The verification promise (CNIC / references / police) is scoped
//      explicitly to the caregivers WE send. It is never stretched over an
//      arranged physiotherapist we have not confirmed we vet the same way.
//   4. What our own nurses and attendants do — helping a patient move, walk,
//      sit up, reposition, and turning to REDUCE THE RISK of bed sores — is
//      framed as ordinary caregiving, never as therapy.
//   5. NO PRICE anywhere (Ledger #9); the do-not-render PRICES constant is
//      not imported. Every promise string is imported VERBATIM from
//      lib/constants.ts (NORTH-STAR §3) — "usually" is mandatory.
//   6. No ventilator or tracheostomy language of any kind (Ledger #16).
//   7. Every user-facing English string carries an Urdu counterpart (§5).
//   8. No new CSS — only existing .d6 classes and inline styles shared with
//      /charges and /services/long-term-care. app/direction6.css is untouched.
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
  title: "Physiotherapy at Home in Lahore",
  description:
    "Physiotherapy at home in Lahore: we arrange a physiotherapist to visit your home, on your doctor's referral or your family's request. Our own nurses and attendants help with day-to-day moving, walking and repositioning on a 12-hour shift. Call or WhatsApp — we call back fast, usually within 15 minutes.",
  alternates: { canonical: `${SITE_URL}/services/physiotherapy` },
};

const WA_MSG = serviceWaMsg("physiotherapist ke visit ka bandobast");

type Bilingual = { en: string; ur: string };

/* ------------------------------------------------------------------ *
 * What our OWN nurses and attendants do about movement. Every line is
 * ordinary caregiving the site already claims (ATTENDANT_SERVICES,
 * /services/attendant, /services/long-term-care). Nothing here is therapy,
 * nothing here promises an outcome, and the bed-sore line says "reduce the
 * risk of" because that is the only honest way to say it.
 * ------------------------------------------------------------------ */
const DAILY_MOVEMENT: Bilingual[] = [
  {
    en: "Helping a patient out of bed, into a chair, and back again — safely, at their own pace",
    ur: "مریض کو بستر سے اٹھانے، کرسی تک لانے اور واپس لٹانے میں مدد — محفوظ طریقے سے، اُن کی اپنی رفتار سے",
  },
  {
    en: "Walking with support to the bathroom and around the house",
    ur: "سہارا دے کر باتھ روم تک اور گھر میں چلنے پھرنے میں مدد",
  },
  {
    en: "Turning and repositioning through the shift, to reduce the risk of bed sores",
    ur: "پوری شفٹ کروٹ اور پوزیشن بدلوانا، تاکہ بستر کے زخموں کا خطرہ کم ہو",
  },
  {
    en: "Helping someone sit up, shift position, and settle comfortably in bed",
    ur: "بستر پر اٹھ کر بیٹھنے، پوزیشن بدلنے اور آرام سے لیٹنے میں مدد",
  },
  {
    en: "Being in the room when a patient is unsteady, so nobody at home is lifting alone",
    ur: "جب مریض ڈگمگاتا ہو تو کمرے میں موجود رہنا، تاکہ گھر میں کسی کو اکیلے وزن نہ اٹھانا پڑے",
  },
  {
    en: "Twelve hours by day or by night, every day — not one appointment a week",
    ur: "دن یا رات کے بارہ گھنٹے، روزانہ — ہفتے میں ایک اپائنٹمنٹ نہیں",
  },
];

/* ------------------------------------------------------------------ *
 * FAQ. The first one is the most important thing on this page: a family
 * that gets a straight answer to the awkward question trusts the rest.
 * Mirrored byte-for-byte into the FAQPage JSON-LD below.
 * ------------------------------------------------------------------ */
const PHYSIO_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "Do you have your own physiotherapist?",
    qUr: "کیا فزیوتھراپسٹ آپ کا اپنا ہے؟",
    a: "No. We do not employ a physiotherapist on our own staff — we arrange one. When you ask for physiotherapy at home, we set up a visit with a physiotherapist who works in Lahore, and that person may be working independently or with another setup rather than for Sehat Connect. We will tell you who is coming, and that they are arranged rather than our own, before they reach your door. One more thing we will not blur: the CNIC checks, reference calls and police verification described on this site are done for the nurses and attendants we send on a shift. We do not stretch that claim over a physiotherapist we have arranged. Ask us on the call what we know about the person coming and you will get a straight answer, including where it ends.",
    aUr: "نہیں۔ فزیوتھراپسٹ ہمارے اپنے عملے کا حصہ نہیں — ہم صرف اُس کے وزٹ کا بندوبست کرتے ہیں۔ جب آپ گھر پر فزیوتھراپی کا کہتے ہیں تو ہم لاہور میں کام کرنے والے کسی فزیوتھراپسٹ سے وقت طے کر دیتے ہیں، اور ہو سکتا ہے وہ آزادانہ یا کسی اور جگہ کے ساتھ کام کرتا ہو، ہمارے ہاں ملازم نہ ہو۔ کون آ رہا ہے، اور یہ کہ وہ ہمارا اپنا نہیں بلکہ بندوبست کیا گیا ہے — یہ آپ کو اُن کے دروازے پر پہنچنے سے پہلے بتا دیا جائے گا۔ ایک بات اور صاف رہے: شناختی کارڈ، حوالہ جات اور پولیس تصدیق جن کا ذکر اس سائٹ پر ہے، وہ اُن نرسوں اور اٹینڈنٹس کی ہوتی ہے جو ہم شفٹ پر بھیجتے ہیں۔ بندوبست کیے گئے فزیوتھراپسٹ پر ہم یہ دعویٰ نہیں پھیلاتے۔ کال پر پوچھ لیں کہ آنے والے کے بارے میں ہم کیا جانتے ہیں — سیدھا جواب ملے گا، اور یہ بھی کہ ہماری معلومات کہاں ختم ہوتی ہے۔",
  },
  {
    q: "Do I need a doctor's referral first?",
    qUr: "کیا پہلے ڈاکٹر کا ریفرل ضروری ہے؟",
    a: "Not to call us. We arrange a visit on the doctor's referral or simply on the family's request. But keep whatever the doctor has written to hand, because it tells the physiotherapist what has already been advised. What we will not do is decide for you: whether physiotherapy suits your patient at all is a question for your doctor, not for us on the phone. We arrange the visit; we do not assess the patient.",
    aUr: "ہم سے رابطے کے لیے ضروری نہیں۔ ہم ڈاکٹر کے ریفرل پر بھی وزٹ کا بندوبست کرتے ہیں اور گھر والوں کی درخواست پر بھی۔ البتہ ڈاکٹر نے جو لکھا ہو وہ سامنے رکھیں، کیونکہ اُسی سے فزیوتھراپسٹ کو پتا چلتا ہے کہ اب تک کیا مشورہ دیا گیا ہے۔ فیصلہ ہم آپ کے لیے نہیں کریں گے: فزیوتھراپی آپ کے مریض کے لیے مناسب ہے یا نہیں، یہ سوال ڈاکٹر کا ہے، فون پر ہمارا نہیں۔ ہم وزٹ کا بندوبست کرتے ہیں، مریض کا معائنہ نہیں۔",
  },
  {
    q: "Can an attendant help instead — kya attendant se kaam chal jayega?",
    qUr: "کیا اٹینڈنٹ سے کام چل جائے گا؟",
    a: "Very often, yes — and we would rather say that than sell you something bigger. A physiotherapist comes for a visit and leaves. An attendant or a nurse is in your house for the whole 12-hour shift, helping your patient out of bed, walking with them to the bathroom, and turning them through the night. If the real trouble at home is that nobody can safely lift your patient five times a day, a visit does not solve that; a shift does. Some families need both, and then we arrange the visit and put an attendant on the shift.",
    aUr: "اکثر، جی ہاں — اور ہم آپ کو بڑی چیز بیچنے کے بجائے یہی بتانا بہتر سمجھتے ہیں۔ فزیوتھراپسٹ ایک وزٹ کے لیے آتا ہے اور چلا جاتا ہے۔ اٹینڈنٹ یا نرس پوری بارہ گھنٹے کی شفٹ آپ کے گھر میں رہتی ہے: مریض کو بستر سے اٹھانا، سہارا دے کر باتھ روم تک لے جانا، اور رات بھر کروٹ بدلواتے رہنا۔ اگر اصل مشکل یہ ہے کہ گھر میں کوئی مریض کو دن میں پانچ بار محفوظ طریقے سے اٹھا نہیں سکتا، تو وہ ایک وزٹ سے حل نہیں ہوتی — شفٹ سے ہوتی ہے۔ کچھ گھرانوں کو دونوں چاہیے ہوتے ہیں، تو ہم وزٹ کا بندوبست بھی کر دیتے ہیں اور شفٹ پر اٹینڈنٹ بھی بھیج دیتے ہیں۔",
  },
  {
    q: "How soon can someone come?",
    qUr: "کوئی کتنی جلدی آ سکتا ہے؟",
    a: "For a nurse or an attendant, the answer is fixed: We call back fast — usually within 15 minutes. Care can start within 24 hours of your call. For an arranged physiotherapist visit we will not print a promise like that, because the timing depends on a physiotherapist's own schedule and not on us. What we do instead is call you back with a real time once we have it, rather than guessing one on this page.",
    aUr: "نرس یا اٹینڈنٹ کے لیے جواب طے ہے: ہم جلد واپس کال کرتے ہیں — عموماً 15 منٹ کے اندر۔ دیکھ بھال آپ کی کال کے 24 گھنٹوں کے اندر شروع ہو سکتی ہے۔ بندوبست کیے گئے فزیوتھراپسٹ کے وزٹ پر ہم ایسا کوئی وعدہ نہیں لکھیں گے، کیونکہ وقت اُس فزیوتھراپسٹ کے اپنے شیڈول پر ہے، ہم پر نہیں۔ اس کے بجائے ہم وقت طے ہوتے ہی آپ کو کال کر کے اصل وقت بتا دیتے ہیں، اس صفحے پر اندازہ لگانے کے بجائے۔",
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD. The Service is ARRANGING a physiotherapy home visit — we are
 * not described as the performer of therapy anywhere in it. No price,
 * priceRange or priceSpecification.
 * ------------------------------------------------------------------ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Arranging a physiotherapist's home visit",
  name: "Physiotherapy at Home in Lahore — visit arranged",
  description:
    "Sehat Connect arranges a physiotherapist to visit a patient at home in Lahore, on a doctor's referral or the family's request. Sehat Connect arranges the visit and does not employ the physiotherapist; no treatment, plan or outcome is decided or promised by Sehat Connect. Separately, Sehat Connect's own attendants and PNC-registered nurses provide day-to-day caregiving on 12-hour shifts, which includes helping a patient get out of bed, walk with support, sit up and be repositioned to reduce the risk of bed sores. That caregiving is not physiotherapy.",
  url: `${SITE_URL}/services/physiotherapy`,
  provider: {
    "@type": "MedicalBusiness",
    name: "Sehat Connect",
    telephone: CONTACT_PHONE_TEL,
    address: OFFICE_POSTAL_ADDRESS,
    areaServed: { "@type": "City", name: "Lahore" },
    openingHours: OPENING_HOURS,
    sameAs: businessSameAs(),
  },
  areaServed: { "@type": "City", name: "Lahore" },
  offers: {
    "@type": "Offer",
    description:
      "What a visit involves and what it costs is told to you on the first call, before anything is arranged.",
  },
};

const crumbs = [
  { name: "Services", nameUr: "خدمات", path: "/services" },
  { name: "Physiotherapy", nameUr: "فزیوتھراپی" },
];
const breadcrumbs = breadcrumbList(crumbs);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PHYSIO_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ------------------------------------------------------------------ *
 * Shared inline styles — the same card language as /charges, /about and
 * /services/long-term-care. No new CSS.
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
  lineHeight: 1.62,
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

function WhatsAppButton() {
  return (
    <a className="btn btn-wa" href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer">
      <span className="wadot" />
      <span data-en>Ask on WhatsApp</span>
      <span data-ur lang="ur" dir="rtl" className="urdu">واٹس ایپ پر پوچھیں</span>
    </a>
  );
}

export default function PhysiotherapyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                    <span data-en>Ghar par physiotherapy &middot; Lahore</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">گھر پر فزیوتھراپی &middot; لاہور</span>
                  </span>

                  <h1>
                    <span data-en>
                      Physiotherapy at home in <span className="hl">Lahore</span>
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      <span className="hl">لاہور</span> میں گھر پر فزیوتھراپی
                    </span>
                  </h1>

                  <p className="hero-sub">
                    <span data-en>
                      If your doctor has advised physiotherapy, or a weak patient simply cannot be
                      taken to a clinic, we can arrange a physiotherapist to visit at home in
                      Lahore. Two things are worth knowing before you call. First, we
                      <em> arrange</em> that visit &mdash; we do not employ a physiotherapist on our
                      own staff. Second, the day-to-day help with getting out of bed, walking and
                      turning is a different thing altogether, and that part is done by our own
                      nurses and attendants on a shift. This page explains both, plainly, so you can
                      pick the one your family actually needs.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      اگر ڈاکٹر نے فزیوتھراپی کا مشورہ دیا ہے، یا کمزور مریض کو کلینک تک لے جانا ممکن
                      ہی نہیں، تو ہم لاہور میں گھر پر فزیوتھراپسٹ کے وزٹ کا بندوبست کر سکتے ہیں۔ کال
                      کرنے سے پہلے دو باتیں جان لیجیے۔ پہلی، ہم اس وزٹ کا <em>بندوبست</em> کرتے ہیں —
                      فزیوتھراپسٹ ہمارے اپنے عملے کا حصہ نہیں۔ دوسری، بستر سے اٹھنے، چلنے پھرنے اور
                      کروٹ بدلنے کی روزمرہ مدد بالکل الگ چیز ہے، اور وہ کام ہماری اپنی نرسیں اور
                      اٹینڈنٹ شفٹ پر کرتے ہیں۔ یہ صفحہ دونوں کو صاف الفاظ میں بتاتا ہے، تاکہ آپ وہی
                      چنیں جس کی آپ کے گھر کو واقعی ضرورت ہے۔
                    </span>
                  </p>

                  <div className="hero-trust">
                    <span className="pill">
                      <span data-en>We arrange the visit</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">وزٹ کا بندوبست ہم کرتے ہیں</span>
                    </span>
                    <span className="pill">
                      <span data-en>At home, across Lahore</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">لاہور بھر میں، گھر پر</span>
                    </span>
                    <span className="pill">
                      <span data-en>Nurses and attendants on shift</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">شفٹ پر نرس اور اٹینڈنٹ</span>
                    </span>
                    <span className="pill">
                      <span data-en>Call or WhatsApp, 24/7</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">کال یا واٹس ایپ، 24/7</span>
                    </span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
                    <CallButton />
                    <WhatsAppButton />
                  </div>
                </div>

                <div className="hero-form">
                  <LeadFormD6 variant="hero" />
                </div>
              </div>
            </div>
          </section>

          {/* ---- what a home visit is, and what it is not ---- */}
          <section className="block" style={{ paddingTop: 34 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>What this actually is</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">یہ اصل میں ہے کیا</span>
                </span>
                <h2>
                  <span data-en>A physiotherapist&rsquo;s home visit, arranged by us</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">فزیوتھراپسٹ کا گھر پر وزٹ، بندوبست ہمارا</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                    <span data-en>What we can arrange</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">ہم کیا بندوبست کر سکتے ہیں</span>
                  </h3>
                  <p style={BODY}>
                    <span data-en>
                      A physiotherapist comes to the house at a time fixed with you, on your
                      doctor&rsquo;s referral or on the family&rsquo;s own request. The reason to do
                      it at home is simple: nobody has to move a frail or painful patient into a car
                      and out again. What happens at that visit, and whether there is another one, is
                      between the physiotherapist, your doctor and your family. Our part is arranging
                      the visit and telling you who is coming.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      فزیوتھراپسٹ آپ سے طے شدہ وقت پر گھر آتا ہے — ڈاکٹر کے ریفرل پر یا گھر والوں کی
                      اپنی درخواست پر۔ گھر پر کرانے کی وجہ سادہ ہے: کمزور یا تکلیف میں مبتلا مریض کو
                      گاڑی میں بٹھا کر لے جانا اور واپس لانا نہیں پڑتا۔ اُس وزٹ میں کیا ہوتا ہے، اور
                      دوسرا وزٹ ہوگا یا نہیں — یہ فزیوتھراپسٹ، آپ کے ڈاکٹر اور گھر والوں کے درمیان کی
                      بات ہے۔ ہمارا کام وزٹ کا بندوبست کرنا اور آپ کو بتانا ہے کہ کون آ رہا ہے۔
                    </span>
                  </p>
                </div>

                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                    <span data-en>What we will not tell you</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">ہم آپ کو کیا نہیں بتائیں گے</span>
                  </h3>
                  <p style={BODY}>
                    <span data-en>
                      We do not decide what is done, we do not write a treatment plan, and we will
                      not promise you a result, a timeline or a number of visits. Nobody honest
                      promises that over the phone about a patient they have not seen. The strongest
                      thing this page will ever say is the line we use everywhere else on this site:
                      movement, mobility and recovery support at home. Whether physiotherapy will
                      help your patient is a question for your doctor, and we will say so on the
                      call rather than guess at it.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      کیا کرنا ہے، یہ ہم طے نہیں کرتے؛ ہم علاج کا کوئی منصوبہ نہیں لکھتے؛ اور نہ کسی
                      نتیجے، مدت یا وزٹ کی تعداد کا وعدہ کرتے ہیں۔ جس مریض کو دیکھا ہی نہ ہو، اُس کے
                      بارے میں فون پر ایسا وعدہ کوئی ایماندار شخص نہیں کرتا۔ اس صفحے پر سب سے بڑی بات
                      بس وہی ہے جو ہم پوری سائٹ پر کہتے ہیں: گھر پر چلنے پھرنے، حرکت اور ریکوری میں
                      مدد۔ فزیوتھراپی آپ کے مریض کے لیے فائدہ مند ہوگی یا نہیں، یہ سوال آپ کے ڈاکٹر
                      کا ہے، اور ہم کال پر یہی کہیں گے، اندازہ نہیں لگائیں گے۔
                    </span>
                  </p>
                </div>
              </div>

              {/* The honesty note. This is the whole reason the page reads
                  the way it does — Decision Ledger #15, stated to the family. */}
              <div style={{ ...CARD, marginTop: 16, background: "var(--mist)" }}>
                <p style={{ ...BODY, fontSize: 16.5, fontWeight: 600 }}>
                  <span data-en>
                    <b style={{ color: "var(--ink)" }}>Said plainly, before you call:</b> we do not
                    employ a physiotherapist on our own staff. We arrange the visit, and the person
                    who comes may not be ours. You will know their name before they arrive, and if
                    you would rather deal with the physiotherapist directly, we will say that too.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    <b style={{ color: "var(--ink)" }}>کال سے پہلے صاف بات:</b> فزیوتھراپسٹ ہمارے
                    اپنے عملے کا حصہ نہیں۔ ہم وزٹ کا بندوبست کرتے ہیں، اور آنے والا شخص ہمارا اپنا نہ
                    بھی ہو تو ہو سکتا ہے۔ اُن کا نام آپ کو آنے سے پہلے معلوم ہوگا، اور اگر آپ براہِ
                    راست فزیوتھراپسٹ سے بات کرنا چاہیں تو ہم یہ بھی کہہ دیں گے۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- what our own caregivers do about movement ---- */}
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
                  <span data-en>The part we do ourselves</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">وہ حصہ جو ہم خود کرتے ہیں</span>
                </span>
                <h2>
                  <span data-en>What our nurses and attendants do for movement, every day</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ہماری نرسیں اور اٹینڈنٹ چلنے پھرنے میں روز کیا کرتے ہیں</span>
                </h2>
                <p>
                  <span data-en>
                    This is ordinary caregiving &mdash; the physical, repetitive help a family runs
                    out of strength for. It is not therapy, and we will not dress it up as therapy.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    یہ عام دیکھ بھال ہے — وہی جسمانی اور بار بار کرنے والا کام جس کے لیے گھر والوں کی
                    ہمت جواب دے جاتی ہے۔ یہ تھراپی نہیں، اور ہم اسے تھراپی بنا کر پیش نہیں کریں گے۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                <TickList items={DAILY_MOVEMENT} />
                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 16.5,
                    color: "var(--ink-soft)",
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  <span data-en>
                    Nobody we send on a shift is a physiotherapist. They do not set exercises, judge
                    what a body should be able to do, or take over anything your doctor has decided.
                    If your patient needs a physiotherapist, that is a separate visit &mdash; and we
                    can arrange it.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    شفٹ پر ہم جو فرد بھیجتے ہیں وہ فزیوتھراپسٹ نہیں ہوتا۔ وہ ورزشیں طے نہیں کرتے، یہ
                    فیصلہ نہیں کرتے کہ جسم کو کیا کر لینا چاہیے، اور ڈاکٹر کے طے کردہ کسی معاملے میں
                    دخل نہیں دیتے۔ اگر آپ کے مریض کو فزیوتھراپسٹ چاہیے تو وہ ایک الگ وزٹ ہے — اور اُس
                    کا بندوبست ہم کر سکتے ہیں۔
                  </span>
                </p>
              </div>

              <div style={{ ...CARD, marginTop: 16, paddingLeft: 30, position: "relative", overflow: "hidden" }}>
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                />
                <h3 style={{ fontSize: 21, marginBottom: 10, lineHeight: 1.3 }}>
                  <span data-en>A visit, or a pair of hands for twelve hours?</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ایک وزٹ چاہیے، یا بارہ گھنٹے کے لیے مددگار ہاتھ؟</span>
                </h3>
                <p style={{ ...BODY, fontSize: 18 }}>
                  <span data-en>
                    A physiotherapist comes for a visit and leaves. An attendant or a nurse is in the
                    house for the whole shift. Families often call asking for physiotherapy when the
                    real trouble is that nobody at home can safely lift their patient five times a
                    day &mdash; and a visit does not fix that. We will say which one we think fits
                    your situation on the first call, even when the honest answer is the smaller
                    arrangement.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    فزیوتھراپسٹ ایک وزٹ کے لیے آتا ہے اور چلا جاتا ہے۔ اٹینڈنٹ یا نرس پوری شفٹ گھر میں
                    رہتی ہے۔ کئی گھرانے فزیوتھراپی کا کہہ کر کال کرتے ہیں جبکہ اصل مشکل یہ ہوتی ہے کہ
                    گھر میں کوئی مریض کو دن میں پانچ بار محفوظ طریقے سے اٹھا نہیں سکتا — اور یہ ایک
                    وزٹ سے حل نہیں ہوتا۔ آپ کی صورتِ حال میں کیا مناسب ہے، ہم پہلی کال پر بتا دیں گے،
                    چاہے ایماندار جواب چھوٹا بندوبست ہی کیوں نہ ہو۔
                  </span>
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                <Link className="btn btn-ghost" href="/services/elderly-care">
                  <span data-en>Elderly care at home</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">بزرگوں کی گھر پر دیکھ بھال</span>
                </Link>
                <Link className="btn btn-ghost" href="/services/long-term-care">
                  <span data-en>Long-term care at home</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">گھر پر طویل مدتی دیکھ بھال</span>
                </Link>
                <Link className="btn btn-ghost" href="/charges">
                  <span data-en>How charges work</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">چارجز کیسے طے ہوتے ہیں</span>
                </Link>
              </div>
            </div>
          </section>

          {/* ---- how to arrange it ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>How to arrange it</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">بندوبست کیسے کریں</span>
                </span>
                <h2>
                  <span data-en>One call, and we say honestly what fits</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ایک کال، اور ہم صاف بتا دیتے ہیں کہ کیا مناسب ہے</span>
                </h2>
                <p>
                  <span data-en>
                    Call, WhatsApp, or leave your name and number and a real person calls you back.
                    Tell us what your patient can and cannot do at home right now. We will tell you
                    whether that sounds like a physiotherapist&rsquo;s visit, a caregiver on a shift,
                    or both &mdash; and if it is a question for your doctor, we will say that instead
                    of selling you something.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    کال کریں، واٹس ایپ کریں، یا اپنا نام اور نمبر چھوڑ دیں — ایک اصل شخص آپ کو واپس کال
                    کرے گا۔ ہمیں بتائیں کہ اِس وقت آپ کا مریض گھر میں کیا کر سکتا ہے اور کیا نہیں۔ ہم
                    بتا دیں گے کہ بات فزیوتھراپسٹ کے وزٹ کی ہے، شفٹ پر کیئر گیور کی، یا دونوں کی — اور
                    اگر یہ سوال ڈاکٹر کا ہے تو ہم آپ کو کچھ بیچنے کے بجائے یہی کہہ دیں گے۔
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CARE_FORMATS.map((f) => (
                  <div key={f.id} style={CARD}>
                    <h3 style={{ fontSize: 20, marginBottom: 8, lineHeight: 1.25 }}>
                      <span data-en>{f.name.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{f.name.ur}</span>
                    </h3>
                    <p style={BODY}>
                      <span data-en>{f.detail.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{f.detail.ur}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Promises, verbatim from lib/constants.ts (NORTH-STAR §3) — and
                  scoped out loud to the caregivers we send, never to an
                  arranged physiotherapist (Ledger #15). */}
              <div style={{ ...CARD, marginTop: 18 }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                  <span data-en>What we promise on the caregivers we send</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">جو نرس یا اٹینڈنٹ ہم بھیجتے ہیں، اُن پر ہمارا وعدہ</span>
                </h3>
                <TickList
                  items={[
                    CALLBACK_PROMISE,
                    START_PROMISE,
                    PROMISES.trial,
                    PROMISES.replacement,
                    PROMISES.payment,
                    PROMISES.priceOnCall,
                    VERIFICATION_PROMISE,
                  ]}
                />
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
                    These promises cover the nurse or attendant we send on a shift. A physiotherapist
                    we arrange is not our own staff, so we do not stretch them over that visit
                    &mdash; what the visit involves, and what it costs, is told to you on the call
                    before anything is arranged.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    یہ وعدے اُس نرس یا اٹینڈنٹ کے بارے میں ہیں جو ہم شفٹ پر بھیجتے ہیں۔ بندوبست کیا
                    گیا فزیوتھراپسٹ ہمارے اپنے عملے کا حصہ نہیں، اس لیے ہم یہ وعدے اُس وزٹ پر نہیں
                    پھیلاتے — اُس وزٹ میں کیا ہوگا اور خرچ کیا ہوگا، یہ آپ کو کال پر بتا دیا جاتا ہے،
                    کوئی بندوبست ہونے سے پہلے۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="physiotherapy-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>The awkward questions first</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">مشکل سوال پہلے</span>
                </span>
                <h2>
                  <span data-en>Straight answers.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">سیدھے جواب۔</span>
                </h2>
              </div>

              <div className="faq-list">
                {PHYSIO_FAQ.map((item) => (
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

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                <CallButton />
                <WhatsAppButton />
                <Link className="btn btn-ghost" href="/book">
                  <span data-en>Ask us to call you back</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ہم سے کال منگوائیں</span>
                </Link>
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
