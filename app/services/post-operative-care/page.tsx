// /services/post-operative-care — the discharge-day landing page.
//
// Target intent: "post operative care at home Lahore", "post surgery care at
// home Lahore", "wound dressing at home Lahore", "operation ke baad dekh bhaal",
// "nurse after surgery Lahore".
//
// HARD CONSTRAINTS for this page:
//  1. NO money figure renders anywhere — copy, meta, or JSON-LD (NORTH-STAR
//     Decision Ledger #9). The do-not-render pricing constant is deliberately
//     NOT imported. Price is quoted on the first call (PROMISES.priceOnCall).
//  2. This page borders on medical claims. It describes only what the NURSE
//     DOES — never what the patient will achieve. No recovery timelines, no
//     diagnosis, no prognosis, no healing promises, no outcome or success
//     claims. Every clinical task listed here is already claimed verbatim on
//     /services/qualified-nurse; nothing new is invented.
//  3. ICU step-down only ("care after coming home from the ICU"). Owner
//     confirmed 2026-08-21 that full ventilator or tracheostomy care is NOT
//     offered — this page must never imply otherwise.
//  4. Every promise string is imported verbatim from lib/constants.ts, which
//     mirrors the NORTH-STAR §3 promises table. Never paraphrase one.
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
  CARE_FORMATS,
  PROMISES,
  CALLBACK_PROMISE,
  START_PROMISE,
  VERIFICATION_PROMISE,
} from "@/lib/constants";
import { breadcrumbList, businessSameAs, OPENING_HOURS } from "@/lib/schema";
import { waLink, serviceWaMsg } from "@/lib/wa";

export const metadata: Metadata = {
  // The root layout appends "| Sehat Connect" via its title template — do not
  // repeat the brand here.
  title: "Post-Operative Care at Home in Lahore",
  description:
    "Post-operative care at home in Lahore: a PNC-registered nurse for wound dressing, medicines, drips and monitoring after surgery. Care can start within 24 hours of your call.",
  alternates: { canonical: `${SITE_URL}/services/post-operative-care` },
};

const WA_MSG = serviceWaMsg("operation ke baad dekh bhaal ke liye nurse");

type Bilingual = { en: string; ur: string };

/* ------------------------------------------------------------------ *
 * What the nurse does after surgery.
 *
 * Every line below is the same substance already published on
 * /services/qualified-nurse — clinical tasks a PNC-registered nurse
 * performs on the doctor's plan. Medical words are glossed in plain
 * language (NORTH-STAR §5, voice rule: never jargon without a gloss).
 * ------------------------------------------------------------------ */
const AFTER_SURGERY: { title: Bilingual; body: Bilingual }[] = [
  {
    title: {
      en: "Wounds and dressings",
      ur: "زخم اور ڈریسنگ",
    },
    body: {
      en: "Cleaning the wound, changing the dressing and looking after the operation site — the place the surgeon cut — exactly as the surgeon wrote it down. Whether the dressing is due daily or every second day, the nurse comes on that schedule.",
      ur: "زخم صاف کرنا، ڈریسنگ بدلنا اور آپریشن والی جگہ کی دیکھ بھال — بالکل اسی طرح جیسے سرجن نے لکھ کر دیا ہے۔ ڈریسنگ روز کرنی ہو یا ایک دن چھوڑ کر، نرس اسی حساب سے آتی ہے۔",
    },
  },
  {
    title: {
      en: "Medicines, injections and drips",
      ur: "دوائیں، انجیکشن اور ڈرپ",
    },
    body: {
      en: "Prescribed medicines given at the right hours, and IM or IV injections and IV drips on the doctor's prescription — so a patient with fresh stitches is not taken back out of the house for one injection.",
      ur: "تجویز کردہ دوائیں صحیح وقت پر، اور ڈاکٹر کے نسخے کے مطابق IM یا IV انجیکشن اور IV ڈرپ — تاکہ تازہ ٹانکوں والے مریض کو ایک انجیکشن کے لیے دوبارہ گھر سے باہر نہ لے جانا پڑے۔",
    },
  },
  {
    title: {
      en: "Vitals, checked and written down",
      ur: "طبی علامات کی نگرانی",
    },
    body: {
      en: "Blood pressure, temperature, pulse, blood sugar and oxygen — the body's basic readings — checked at the times the doctor asked for and noted down, so the follow-up visit is not guesswork.",
      ur: "بلڈ پریشر، درجہ حرارت، نبض، شوگر اور آکسیجن — جسم کی بنیادی علامات — ڈاکٹر کے بتائے وقت پر چیک کر کے لکھی جاتی ہیں، تاکہ اگلے چیک اپ پر اندازوں سے کام نہ چلانا پڑے۔",
    },
  },
  {
    title: {
      en: "Tubes and catheters",
      ur: "ٹیوب اور کیتھیٹر",
    },
    body: {
      en: "Looking after a catheter (the tube that drains urine) or a feeding tube through the nose (an NG tube), on the doctor's plan. If your surgeon has left a drain or any other tube in place, tell us on the first call and we will say honestly whether our nurse can look after it.",
      ur: "کیتھیٹر (پیشاب کی نالی) یا ناک کے ذریعے کھانے والی ٹیوب (NG ٹیوب) کی دیکھ بھال، ڈاکٹر کے پلان کے مطابق۔ اگر سرجن نے کوئی ڈرین یا کوئی اور ٹیوب لگا رکھی ہے تو پہلی کال پر بتا دیں؛ ہم صاف بتا دیں گے کہ ہماری نرس اسے سنبھال سکتی ہے یا نہیں۔",
    },
  },
  {
    title: {
      en: "Sitting up and moving",
      ur: "اٹھنا بیٹھنا اور چلنا پھرنا",
    },
    body: {
      en: "Ordinary bedside help: getting the patient up safely, shifting position so they are not lying in one place for hours, and steadying them while they walk — only as far as the surgeon has already allowed.",
      ur: "روزمرہ بستر کی مدد: مریض کو محفوظ طریقے سے اٹھانا، کروٹ بدلوانا تاکہ وہ گھنٹوں ایک ہی حالت میں نہ پڑا رہے، اور چلتے وقت سہارا دینا — صرف اتنا جتنا سرجن پہلے ہی اجازت دے چکے ہوں۔",
    },
  },
  {
    title: {
      en: "Watching for warning signs",
      ur: "خطرے کی علامات پر نظر",
    },
    body: {
      en: "Following the surgeon's after-care and spotting warning signs early — fever, a wound that has started bleeding or smelling, swelling, pain that is not settling — and telling you at once so you can contact your doctor.",
      ur: "سرجن کی ہدایات پر عمل اور خطرے کی علامات جلد پہچاننا — بخار، زخم سے خون یا بو، سوجن، یا وہ درد جو کم نہ ہو رہا ہو — اور فوراً آپ کو بتانا تاکہ آپ اپنے ڈاکٹر سے رابطہ کر سکیں۔",
    },
  },
];

/* ------------------------------------------------------------------ *
 * What you need ready. Only the two documents the hospital itself hands
 * the family — nothing about who buys or pays for dressings, medicines
 * or consumables, because no confirmed answer exists for that. That
 * question goes to the first call, the same way /charges handles it.
 * ------------------------------------------------------------------ */
const READY: Bilingual[] = [
  {
    en: "The discharge summary — the paper the hospital gives you when the patient leaves",
    ur: "ڈسچارج سمری — وہ کاغذ جو ہسپتال مریض کو گھر بھیجتے وقت دیتا ہے",
  },
  {
    en: "The surgeon's after-care instructions — how often the dressing is to be changed, and what to watch for",
    ur: "سرجن کی ہدایات — ڈریسنگ کتنے وقفے سے بدلنی ہے اور کن باتوں پر نظر رکھنی ہے",
  },
  {
    en: "The prescription and the follow-up date, so medicines are given exactly as written",
    ur: "نسخہ اور اگلے چیک اپ کی تاریخ، تاکہ دوائیں بالکل لکھے ہوئے مطابق دی جائیں",
  },
  {
    en: "A photo of any of these on WhatsApp is enough — you do not have to explain it all on the phone",
    ur: "ان میں سے کسی کاغذ کی تصویر واٹس ایپ کر دیں تو کافی ہے — سب کچھ فون پر بتانا ضروری نہیں",
  },
];

/* ------------------------------------------------------------------ *
 * The trust facts, all already published elsewhere on the site.
 * ------------------------------------------------------------------ */
const TRUST: Bilingual[] = [
  {
    en: "Every nurse is PNC registered, with a registration number our team has checked",
    ur: "ہر نرس PNC رجسٹرڈ ہے، اور اس کا رجسٹریشن نمبر ہماری ٹیم خود چیک کرتی ہے",
  },
  {
    en: "Their card on WhatsApp before the visit — photo, name and PNC number",
    ur: "آنے سے پہلے واٹس ایپ پر کارڈ: تصویر، نام اور PNC نمبر",
  },
  {
    en: "A WhatsApp message from us when your nurse is on the way",
    ur: "جب نرس راستے میں ہو تو ہماری طرف سے واٹس ایپ پر اطلاع",
  },
  {
    en: "A female nurse when you ask for one",
    ur: "خاتون نرس، جب آپ کہیں",
  },
  {
    en: "No charge to cancel or reschedule, if you tell us up to 4 hours before the shift",
    ur: "شفٹ سے 4 گھنٹے پہلے تک بتا دیں تو منسوخی یا وقت بدلنے کا کوئی چارج نہیں",
  },
];

const PROMISE_LINES: Bilingual[] = [
  CALLBACK_PROMISE,
  START_PROMISE,
  PROMISES.trial,
  PROMISES.replacement,
  PROMISES.payment,
];

/* ------------------------------------------------------------------ *
 * FAQ — mirrored byte-for-byte into the FAQPage JSON-LD below.
 * Promise sentences are composed from the imported constants, never
 * retyped. Q4 carries the Roman Urdu families actually type.
 * ------------------------------------------------------------------ */
const POSTOP_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "How soon after discharge can a nurse start at home?",
    qUr: "ڈسچارج کے کتنی دیر بعد نرس گھر آ سکتی ہے؟",
    a: `${CALLBACK_PROMISE.en} ${START_PROMISE.en} Many families call us from the hospital on discharge day itself, before they have reached home. Tell us the time the patient will be home and the hour the first dressing or injection is due, and we arrange the nurse around that.`,
    aUr: `${CALLBACK_PROMISE.ur} ${START_PROMISE.ur} بہت سے گھرانے ڈسچارج والے دن ہسپتال سے ہی، گھر پہنچنے سے پہلے کال کر لیتے ہیں۔ ہمیں بتا دیں کہ مریض کس وقت گھر پہنچے گا اور پہلی ڈریسنگ یا انجیکشن کب دینا ہے — ہم نرس کا وقت اسی حساب سے رکھ دیں گے۔`,
  },
  {
    q: "Can the nurse change my father's dressing at home after his operation?",
    qUr: "کیا نرس گھر پر آپریشن کے بعد ڈریسنگ بدل سکتی ہے؟",
    a: "Yes. Wound cleaning and dressing changes are everyday work for a PNC-registered nurse, done exactly as the surgeon wrote it. If a dressing change is all you need, you do not have to take a 12-hour shift — a nurse can come for a single visit, do the dressing and leave.",
    aUr: "جی ہاں۔ زخم صاف کرنا اور ڈریسنگ بدلنا PNC رجسٹرڈ نرس کا روزمرہ کام ہے، اور وہ بالکل اسی طرح ہوتا ہے جیسے سرجن نے لکھا ہو۔ اگر صرف ڈریسنگ کروانی ہے تو 12 گھنٹے کی شفٹ لینے کی ضرورت نہیں — نرس ایک وزٹ کے لیے آ سکتی ہے، ڈریسنگ کر کے چلی جائے گی۔",
  },
  {
    q: "Do you follow the surgeon's instructions, or your own plan?",
    qUr: "کیا آپ سرجن کی ہدایات پر عمل کرتے ہیں یا اپنا طریقہ چلاتے ہیں؟",
    a: "The surgeon's, always. Our nurse works from your discharge summary and the prescription — the dressing schedule, the medicines, the follow-up date. We do not change a doctor's plan and we do not give anything that is not on it. If something on the paper is unclear, the nurse tells you so you can ask your doctor.",
    aUr: "ہمیشہ سرجن کی۔ ہماری نرس آپ کی ڈسچارج سمری اور نسخے کے مطابق کام کرتی ہے — ڈریسنگ کا وقفہ، دوائیں، اور اگلے چیک اپ کی تاریخ۔ ہم ڈاکٹر کا پلان نہیں بدلتے اور اس سے باہر کوئی چیز نہیں دیتے۔ کاغذ پر کوئی بات واضح نہ ہو تو نرس آپ کو بتا دیتی ہے تاکہ آپ اپنے ڈاکٹر سے پوچھ لیں۔",
  },
  {
    q: "Operation ke baad raat ko koi rukega? Can a nurse stay through the night?",
    qUr: "کیا آپریشن کے بعد رات کو کوئی رک سکتا ہے؟",
    a: "Yes. The night shift is 8:00 PM to 8:00 AM, which is exactly the stretch families cannot manage after a few days of no sleep. If you need someone at home around the clock, that is two caregivers across two 12-hour shifts — never one person awake for 24 hours, because nobody does that well.",
    aUr: "جی ہاں۔ رات کی شفٹ رات 8 بجے سے صبح 8 بجے تک ہوتی ہے — یہی وہ وقت ہے جو چند راتوں کی بے خوابی کے بعد گھر والوں سے نہیں سنبھلتا۔ اگر چوبیس گھنٹے کسی کی ضرورت ہو تو وہ دو کیئر گیور، دو بارہ گھنٹے کی شفٹوں میں ہوتے ہیں — ایک ہی شخص 24 گھنٹے نہیں، کیونکہ یہ کوئی بھی ٹھیک طرح نہیں کر سکتا۔",
  },
  {
    q: "What if the wound looks wrong, or the patient seems worse?",
    qUr: "اگر زخم ٹھیک نہ لگے یا مریض کی حالت بگڑتی لگے تو؟",
    a: "The nurse tells you at once — no waiting for the next visit, and no diagnosing. Fever, bleeding, a smell from the wound, swelling, pain that is not settling: you hear about it the moment it is seen, so you can contact your surgeon. Our team is a call or WhatsApp away, day or night. In an emergency, the hospital comes first — always.",
    aUr: "نرس فوراً آپ کو بتاتی ہے — وہ اگلے وزٹ کا انتظار نہیں کرتی اور نہ خود تشخیص کرتی ہے۔ بخار، خون آنا، زخم سے بو، سوجن، یا وہ درد جو کم نہ ہو: جیسے ہی وہ دیکھے گی، آپ کو اطلاع دے گی تاکہ آپ اپنے سرجن سے رابطہ کریں۔ ہماری ٹیم دن ہو یا رات، ایک کال یا واٹس ایپ کے فاصلے پر ہے۔ ایمرجنسی میں پہلے ہسپتال — ہمیشہ۔",
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD — no price, priceRange, priceCurrency or priceSpecification
 * anywhere in this graph (Decision Ledger #9). The Offer describes the
 * TERMS in words only.
 * ------------------------------------------------------------------ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Post-Operative Care at Home (Lahore)",
  alternateName: "Post-Surgery Nursing Care at Home in Lahore",
  description:
    "PNC-registered nurses at home in Lahore after surgery: wound cleaning and dressing changes, prescribed medicines on time, injections and drips on the doctor's prescription, vitals monitoring, catheter and feeding-tube care on the doctor's plan, and step-down care for patients coming home after ICU or HDU.",
  url: `${SITE_URL}/services/post-operative-care`,
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
  availableService: [
    { "@type": "MedicalTherapy", name: "Wound care and dressing changes at home" },
    { "@type": "MedicalTherapy", name: "Prescribed medicines given on time at home" },
    { "@type": "MedicalTherapy", name: "IM/IV injections and IV drips on the doctor's prescription" },
    { "@type": "MedicalTherapy", name: "Vitals monitoring at home" },
    { "@type": "MedicalTherapy", name: "Catheter and NG feeding-tube care on the doctor's plan" },
    { "@type": "MedicalTherapy", name: "ICU step-down care after coming home from the ICU" },
  ],
  offers: {
    "@type": "Offer",
    description:
      "Exact price quoted on the first call, before care starts. First day free. No advance. Pay after the shift. Single visits and 12-hour day or night shifts.",
    areaServed: { "@type": "City", name: "Lahore" },
  },
};

const breadcrumbs = breadcrumbList([
  { name: "Services", path: "/services" },
  { name: "Post-operative Care" },
]);

// Mirrors the on-page FAQ exactly — Google requires the schema and the
// rendered content to match.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: POSTOP_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ------------------------------------------------------------------ *
 * Shared inline styles — same card language as /charges, /about and
 * /services. No new CSS: direction6.css is not touched.
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

export default function PostOperativeCarePage() {
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
          {/* ---- hero: the noun and the city, in the H1 ---- */}
          <section className="hero">
            <div className="wrap">
              <div className="hero-grid">
                <div className="hero-copy">
                  <span className="eyebrow eyebrow-plain">
                    <span data-en>After surgery · operation ke baad</span>
                    <span data-ur className="urdu">آپریشن کے بعد</span>
                  </span>

                  <h1>
                    <span data-en>
                      Post-operative care at home in <span className="hl">Lahore</span>
                    </span>
                    <span data-ur className="urdu">
                      <span className="hl">لاہور</span> میں گھر پر آپریشن کے بعد کی دیکھ بھال
                    </span>
                  </h1>

                  <p className="hero-sub">
                    <span data-en>
                      A PNC-registered nurse at home for wound dressing, medicines, injections and
                      monitoring after an operation — for a single visit, or for as many days as
                      your surgeon has asked for.
                    </span>
                    <span data-ur className="urdu">
                      آپریشن کے بعد گھر پر PNC رجسٹرڈ نرس: ڈریسنگ، دوائیں، انجیکشن اور نگرانی —
                      ایک وزٹ کے لیے، یا اتنے دن کے لیے جتنا آپ کے سرجن نے کہا ہو۔
                    </span>
                  </p>

                  <div className="hero-trust">
                    <span className="pill">
                      <span data-en>Care can start within 24 hours</span>
                      <span data-ur className="urdu">24 گھنٹوں میں شروع</span>
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
                      <span data-en>Single visit or full shift</span>
                      <span data-ur className="urdu">ایک وزٹ یا پوری شفٹ</span>
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
                      <span data-en>Send the discharge slip on WhatsApp</span>
                      <span data-ur className="urdu">ڈسچارج پرچی واٹس ایپ کر دیں</span>
                    </a>
                  </div>
                </div>

                <div className="hero-form">
                  <LeadFormD6 variant="hero" />
                </div>
              </div>
            </div>
          </section>

          {/* ---- discharge day: the moment this page is read ---- */}
          <section className="block" style={{ paddingTop: 34 }}>
            <div className="wrap">
              <div className="sec-head">
                <h2>
                  <span data-en>Discharge day, and a page of instructions you did not expect</span>
                  <span data-ur className="urdu">ڈسچارج کا دن، اور ہدایات کا وہ کاغذ جس کی توقع نہیں تھی</span>
                </h2>
              </div>

              <div style={{ ...CARD, paddingLeft: 30, position: "relative", overflow: "hidden" }}>
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                />
                <p style={BODY}>
                  <span data-en>
                    The operation went as it was meant to, and now they are sending your patient home.
                    Someone hands you a discharge summary, a prescription and a few quick sentences at
                    the door: change the dressing, these tablets at these hours, watch for fever, come
                    back on this date. In the hospital, a nurse did all of that. At home, from tonight,
                    it is you.
                  </span>
                  <span data-ur className="urdu">
                    آپریشن ہو گیا، اور اب مریض کو گھر بھیجا جا رہا ہے۔ کوئی آپ کے ہاتھ میں ڈسچارج سمری
                    اور نسخہ تھما دیتا ہے اور دروازے پر چند جملے کہہ دیتا ہے: ڈریسنگ بدلتے رہیں، یہ
                    گولیاں ان اوقات پر، بخار کا خیال رکھیں، اس تاریخ پر واپس آ جائیں۔ ہسپتال میں یہ سب
                    نرس کر رہی تھی۔ گھر پر، آج رات سے، یہ سب آپ کو کرنا ہے۔
                  </span>
                </p>
                <p style={{ ...BODY, marginTop: 16 }}>
                  <span data-en>
                    Most families are not sure they understood all of it — and nobody wants to learn
                    wound dressing on a parent with fresh stitches. You do not have to work it out
                    tonight. Send a photo of the discharge summary on WhatsApp, or leave your number
                    below, and a real person will call you back and arrange a nurse.
                  </span>
                  <span data-ur className="urdu">
                    زیادہ تر گھرانوں کو یقین نہیں ہوتا کہ انہوں نے سب کچھ ٹھیک سمجھا ہے — اور کوئی بھی
                    اپنے والدین کے تازہ ٹانکوں پر ڈریسنگ سیکھنا نہیں چاہتا۔ آپ کو آج رات یہ سب خود
                    سمجھنے کی ضرورت نہیں۔ ڈسچارج سمری کی تصویر واٹس ایپ کر دیں یا نیچے اپنا نمبر لکھ
                    دیں — ایک اصل انسان واپس کال کر کے نرس کا بندوبست کر دے گا۔
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
                  <span data-en>{CALLBACK_PROMISE.en} {START_PROMISE.en}</span>
                  <span data-ur className="urdu">{CALLBACK_PROMISE.ur} {START_PROMISE.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- what the nurse actually does after surgery ---- */}
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
                  <span data-en>Wound dressing and post-surgery care at home in Lahore</span>
                  <span data-ur className="urdu">لاہور میں گھر پر ڈریسنگ اور آپریشن کے بعد کی نگہداشت</span>
                </span>
                <h2>
                  <span data-en>What the nurse actually does after surgery.</span>
                  <span data-ur className="urdu">آپریشن کے بعد نرس اصل میں کیا کرتی ہے۔</span>
                </h2>
                <p>
                  <span data-en>
                    Plain words, and only the work a PNC-registered nurse is qualified to do — always
                    on the doctor&rsquo;s written plan, never on our own.
                  </span>
                  <span data-ur className="urdu">
                    سیدھی بات، اور صرف وہی کام جو PNC رجسٹرڈ نرس کر سکتی ہے — ہمیشہ ڈاکٹر کے لکھے ہوئے
                    پلان کے مطابق، اپنی مرضی سے نہیں۔
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AFTER_SURGERY.map((item) => (
                  <div key={item.title.en} style={CARD}>
                    <h3 style={{ fontSize: 20, marginBottom: 8, lineHeight: 1.25 }}>
                      <span data-en>{item.title.en}</span>
                      <span data-ur className="urdu">{item.title.ur}</span>
                    </h3>
                    <p style={BODY}>
                      <span data-en>{item.body.en}</span>
                      <span data-ur className="urdu">{item.body.ur}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                <Link className="btn btn-ghost" href="/services/qualified-nurse">
                  <span data-en>Everything a qualified nurse handles</span>
                  <span data-ur className="urdu">نرس کے تمام طبی کام</span>
                </Link>
                <Link className="btn btn-ghost" href="/charges">
                  <span data-en>How charges work</span>
                  <span data-ur className="urdu">چارجز کیسے طے ہوتے ہیں</span>
                </Link>
              </div>
            </div>
          </section>

          {/* ---- ICU step-down. Step-down ONLY: no ventilator, no trach care.
                  Glossed in plain words per NORTH-STAR §5. ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>ICU step-down</span>
                  <span data-ur className="urdu">آئی سی یو کے بعد</span>
                </span>
                <h2>
                  <span data-en>Coming home after the ICU.</span>
                  <span data-ur className="urdu">آئی سی یو سے گھر واپسی۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <p style={BODY}>
                  <span data-en>
                    When a patient is discharged after a stay in ICU or HDU, the family often feels the
                    drop the hardest: for days there was a monitor and a nurse at the bedside, and now
                    there is a bedroom. This is called step-down care — care after coming home from the
                    ICU — and it is one of the things our nurses do.
                  </span>
                  <span data-ur className="urdu">
                    جب مریض آئی سی یو یا ایچ ڈی یو سے گھر آتا ہے تو گھر والوں کو سب سے زیادہ فرق یہی
                    محسوس ہوتا ہے: کئی دن مانیٹر اور نرس سرہانے موجود تھے، اور اب صرف ایک کمرہ ہے۔ اسے
                    آئی سی یو کے بعد کی دیکھ بھال کہتے ہیں، اور یہ ہماری نرسیں کرتی ہیں۔
                  </span>
                </p>
                <p style={{ ...BODY, marginTop: 14 }}>
                  <span data-en>
                    At home it is the same steady work: vitals checked and written down at the hours
                    the doctor asked for, medicines on time, the wound looked after, catheters and
                    feeding tubes managed on the doctor&rsquo;s plan, and someone in the room who
                    notices a change early.
                  </span>
                  <span data-ur className="urdu">
                    گھر پر یہ وہی مستقل کام ہے: ڈاکٹر کے بتائے اوقات پر علامات چیک کر کے لکھنا، دوائیں
                    وقت پر، زخم کی دیکھ بھال، ڈاکٹر کے پلان کے مطابق کیتھیٹر اور فیڈنگ ٹیوب سنبھالنا،
                    اور کمرے میں کوئی ایسا فرد جو تبدیلی جلد پہچان لے۔
                  </span>
                </p>
                <p
                  style={{
                    marginTop: 18,
                    paddingTop: 16,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 16.5,
                    color: "var(--ink-soft)",
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  <span data-en>
                    Being straight with you: this is step-down care at home. A patient who still needs
                    machine support to breathe, or a neck tube to breathe through, belongs in hospital —
                    we will tell you that plainly on the call rather than send a nurse who cannot help.
                  </span>
                  <span data-ur className="urdu">
                    صاف بات: یہ گھر پر آئی سی یو کے بعد والی دیکھ بھال ہے۔ جس مریض کو اب بھی سانس کے لیے
                    مشین کا سہارا یا گلے میں نلکی درکار ہو، اس کی جگہ ہسپتال ہے — ہم کال پر آپ کو صاف
                    بتا دیں گے، ایسی نرس بھیجنے کے بجائے جو مدد نہ کر سکے۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- how it works: single visit vs shift (CARE_FORMATS) ---- */}
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
                  <span data-en>How the care is arranged</span>
                  <span data-ur className="urdu">دیکھ بھال کا بندوبست کیسے ہوتا ہے</span>
                </span>
                <h2>
                  <span data-en>One dressing, or someone through the night.</span>
                  <span data-ur className="urdu">صرف ایک ڈریسنگ، یا رات بھر کے لیے کوئی۔</span>
                </h2>
                <p>
                  <span data-en>
                    Not every family needs the same thing after an operation. Pick the shape that fits
                    the week you are actually having — and change it as the patient improves.
                  </span>
                  <span data-ur className="urdu">
                    آپریشن کے بعد ہر گھرانے کی ضرورت ایک جیسی نہیں ہوتی۔ وہ صورت چنیں جو آپ کے اس ہفتے
                    کے حالات پر پوری اترے — اور جیسے جیسے مریض بہتر ہو، اسے بدل لیں۔
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CARE_FORMATS.map((f) => (
                  <div key={f.id} style={CARD}>
                    <h3 style={{ fontSize: 20, marginBottom: 8, lineHeight: 1.25 }}>
                      <span data-en>{f.name.en}</span>
                      <span data-ur className="urdu">{f.name.ur}</span>
                    </h3>
                    <p style={BODY}>
                      <span data-en>{f.detail.en}</span>
                      <span data-ur className="urdu">{f.detail.ur}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ ...CARD, marginTop: 18 }}>
                <TickList items={PROMISE_LINES} />
                <p
                  style={{
                    marginTop: 18,
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

          {/* ---- hospitals / discharges across Lahore ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Discharges across Lahore</span>
                  <span data-ur className="urdu">لاہور بھر سے ڈسچارج</span>
                </span>
                <h2>
                  <span data-en>Whichever hospital you are leaving.</span>
                  <span data-ur className="urdu">آپ کسی بھی ہسپتال سے نکل رہے ہوں۔</span>
                </h2>
              </div>

              {/*
                Hospital names (owner-confirmed 2026-08-21: we take discharges from
                across Lahore, so naming any of them is factually true).
                RULES — do not loosen:
                  · The sentence is a statement about OUR patients, never about the
                    hospital. No affiliation, partnership, referral or endorsement is
                    implied anywhere — we have none, and implying one invites a
                    cease-and-desist. Never write "in partnership with", "affiliated
                    with", "recommended by", "we work with", and never a hospital logo.
                  · Names stay in body copy only — never in the <title>, the meta
                    description, the H1, or any heading (brand-jacking / trademark risk).
                  · The list always ends "and others" so it reads as illustrative, which
                    is also the honest description of reality.
                  · Names stay in Latin script inside the Urdu string — that is how
                    families in Pakistan write them.
              */}
              <div style={CARD}>
                <p style={BODY}>
                  <span data-en>
                    We arrange nurses for families all over Lahore — DHA, Gulberg, Johar Town, Model
                    Town, Bahria Town, Cantt and beyond — and after-surgery care is the most common
                    reason families call us.
                  </span>
                  <span data-ur className="urdu">
                    ہم لاہور بھر میں گھروں کے لیے نرس کا بندوبست کرتے ہیں — ڈی ایچ اے، گلبرگ، جوہر ٹاؤن،
                    ماڈل ٹاؤن، بحریہ ٹاؤن، کینٹ اور اس سے آگے — اور آپریشن کے بعد کی دیکھ بھال سب سے
                    عام وجہ ہے جس پر گھر والے ہمیں کال کرتے ہیں۔
                  </span>
                </p>
                <p style={{ ...BODY, marginTop: 14 }}>
                  <span data-en>
                    Families call us after discharge from hospitals across the city — National Hospital
                    in DHA, Doctors Hospital in Johar Town, Hameed Latif, Fatima Memorial, Shaukat
                    Khanum, Evercare and others. We have no tie-up with any hospital, and we do not need
                    one: whichever hospital performed the operation, our nurse works from the discharge
                    summary and the prescription your surgeon has written.
                  </span>
                  <span data-ur className="urdu">
                    گھر والے شہر بھر کے ہسپتالوں سے ڈسچارج کے بعد ہمیں کال کرتے ہیں — National Hospital
                    (ڈی ایچ اے)، Doctors Hospital (جوہر ٹاؤن)، Hameed Latif، Fatima Memorial، Shaukat
                    Khanum، Evercare اور دیگر۔ کسی ہسپتال کے ساتھ ہمارا کوئی معاہدہ نہیں، اور ضرورت بھی
                    نہیں: آپریشن کسی بھی ہسپتال میں ہوا ہو، ہماری نرس اسی ڈسچارج سمری اور نسخے کے مطابق
                    کام کرتی ہے جو آپ کے سرجن نے لکھا ہے۔
                  </span>
                </p>
                <p style={{ ...BODY, marginTop: 14 }}>
                  <span data-en>
                    Tell us on the call which hospital you are coming home from, which area of Lahore
                    you live in, and when the patient will reach the house. We arrange the nurse around
                    that time, and send you the caregiver&rsquo;s card on WhatsApp before they come.
                  </span>
                  <span data-ur className="urdu">
                    کال پر ہمیں بتا دیں کہ آپ کس ہسپتال سے گھر آ رہے ہیں، لاہور کے کس علاقے میں رہتے ہیں،
                    اور مریض گھر کس وقت پہنچے گا۔ ہم نرس کا وقت اسی حساب سے رکھ دیں گے، اور آنے سے پہلے
                    اس کا کارڈ واٹس ایپ کر دیں گے۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- what you need ready ---- */}
          <section className="block" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Before the first visit</span>
                  <span data-ur className="urdu">پہلے وزٹ سے پہلے</span>
                </span>
                <h2>
                  <span data-en>What you need ready — and what you can leave to us.</span>
                  <span data-ur className="urdu">آپ کے پاس کیا تیار ہونا چاہیے — اور کیا ہم پر چھوڑ دیں۔</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                    <span data-en>Keep these two papers to hand</span>
                    <span data-ur className="urdu">یہ کاغذات پاس رکھیں</span>
                  </h3>
                  <TickList items={READY} />
                </div>

                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                    <span data-en>What we bring with the nurse</span>
                    <span data-ur className="urdu">نرس کے ساتھ ہماری طرف سے کیا آتا ہے</span>
                  </h3>
                  <TickList items={TRUST} />
                </div>
              </div>

              {/* Honesty note: nothing is claimed about who buys or pays for
                  dressings, medicines or consumables — no confirmed answer exists,
                  so the question goes to the first call, exactly as /charges does. */}
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
                  Not sure what else the nurse will need at home — dressing material, medicines,
                  anything on the surgeon&rsquo;s list? Ask on the first call. We would rather answer
                  plainly before care starts than surprise you afterwards.
                </span>
                <span data-ur className="urdu">
                  یہ نہیں معلوم کہ گھر پر نرس کو اور کیا کچھ درکار ہو گا — ڈریسنگ کا سامان، دوائیں، یا
                  سرجن کی فہرست کی کوئی چیز؟ پہلی کال پر پوچھ لیں۔ ہم بعد میں حیران کرنے کے بجائے کام
                  شروع ہونے سے پہلے صاف بات کرنا بہتر سمجھتے ہیں۔
                </span>
              </p>
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="postop-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Operation ke baad dekh bhaal — the questions families ask</span>
                  <span data-ur className="urdu">آپریشن کے بعد دیکھ بھال — عام سوالات</span>
                </span>
                <h2>
                  <span data-en>Straight answers, before you decide.</span>
                  <span data-ur className="urdu">فیصلے سے پہلے، سیدھے جواب۔</span>
                </h2>
              </div>

              <div className="faq-list">
                {POSTOP_FAQ.map((item) => (
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

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
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
