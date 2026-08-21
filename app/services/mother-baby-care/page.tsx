// /services/mother-baby-care — postnatal care at home, FOR THE MOTHER.
//
// Target intent: "postnatal care at home Lahore" (primary), "care after
// delivery at home Lahore", "nurse after C-section at home", and the Roman
// Urdu families actually type: "zachgi ke baad dekh bhaal".
//
// SCOPE — owner-confirmed 2026-08-21. Read before touching a word of this file.
// The service is TWO things and only two things:
//   1. Care for the MOTHER after delivery — C-section wound care and dressing,
//      vitals monitoring, prescribed medicines, injections and drips on the
//      doctor's prescription. Qualified Nurse (PNC-registered) work.
//   2. Traditional postnatal support for the mother — the practical help that
//      lets her rest: meals, hygiene, moving around the house, company,
//      overnight duty. Attendant work.
// Whether a nurse or an attendant goes depends on what the family needs,
// decided on the first call — the same as every other service here.
//
// DAY-TO-DAY NEWBORN CARE IS NOT WHAT THIS PAGE SELLS. It is not a refusal
// either: the owner's position (2026-08-21) is that it is simply not something
// we usually do, and could be arranged if a family asked.
// Hard rules for this page, do not loosen:
//   · The page is about the MOTHER. She is the subject of every sentence.
//   · Never PROMISE newborn, baby or neonatal care, and never imply the
//     caregiver will look after the infant — a family expecting a baby nurse
//     and receiving a maternal attendant is the mismatch that destroys trust
//     on day one.
//   · But do NOT slam the door either. Describe what the caregiver comes for,
//     then invite the ask on the first call. Not promising is enough; an
//     explicit "no" turns something we could arrange into something we have
//     publicly refused.
//   · The keyword "baby care nurse Lahore" is deliberately NOT targeted
//     (keyword-map rule 4: never target a term the business cannot deliver).
//
// MEDICAL SAFETY (maternal health is high-stakes YMYL):
//   · Describe only what the caregiver DOES — never what the mother's body
//     will do. No recovery timelines, no healing or outcome claims.
//   · NO breastfeeding advice. NO advice on bleeding, pain or when to resume
//     anything. NO warning-signs or symptom list — that belongs to her doctor
//     and her discharge paper; every clinical worry routes back to the doctor
//     who looked after the delivery, the way /guides/post-operative-care-checklist does.
//   · Postnatal mental health: not diagnosed, not screened, not listed, not
//     promised. One plain, non-clinical sentence about rest — nothing more.
//   · C-section wound care is described exactly like any other wound care:
//     following what the doctor has written down.
//
// OTHER HARD CONSTRAINTS:
//   · NO money figure anywhere — copy, meta or JSON-LD (Decision Ledger #9).
//     The do-not-render PRICES constant is deliberately not imported.
//   · No physiotherapy or rehabilitation language (Ledger #15); no ventilator
//     or tracheostomy (Ledger #16).
//   · Every promise string is imported verbatim from lib/constants.ts — never
//     paraphrased, and "usually" in the callback promise is mandatory.
//   · Every English string has an Urdu counterpart (NORTH-STAR §5).
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
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  // The root layout appends "| Sehat Connect" via its title template.
  title: "Postnatal Care at Home in Lahore",
  description:
    "Postnatal care at home in Lahore for the mother after delivery: a nurse for C-section dressing and prescribed medicines, or an attendant so she can rest.",
  alternates: { canonical: `${SITE_URL}/services/mother-baby-care` },
};

const WA_MSG = serviceWaMsg("zachgi ke baad maa ki dekh bhaal ke liye nurse ya attendant");

type Bilingual = { en: string; ur: string };

/* ------------------------------------------------------------------ *
 * What a PNC-registered nurse does for the mother.
 *
 * Nothing here is new: every line is already published verbatim on
 * /services/qualified-nurse and /services/post-operative-care. The
 * C-section wound is treated as what it is — an operation wound, looked
 * after on the doctor's written plan.
 * ------------------------------------------------------------------ */
const NURSE_DOES: Bilingual[] = [
  {
    en: "Wound care and dressing changes — including a C-section wound — exactly as the doctor wrote it down",
    ur: "زخم کی دیکھ بھال اور ڈریسنگ کی تبدیلی — سی سیکشن کے زخم سمیت — بالکل اسی طرح جیسے ڈاکٹر نے لکھ کر دیا ہے",
  },
  {
    en: "Prescribed medicines given at the right hours, from the prescription in your hand",
    ur: "تجویز کردہ دوائیں صحیح وقت پر، اسی نسخے کے مطابق جو آپ کے پاس ہے",
  },
  {
    en: "Injections and IV drips on the doctor's prescription, at home",
    ur: "ڈاکٹر کے نسخے کے مطابق انجیکشن اور ڈرپ، گھر پر",
  },
  {
    en: "Blood pressure, temperature and pulse checked at the times the doctor asked for, and written down",
    ur: "بلڈ پریشر، درجہ حرارت اور نبض ڈاکٹر کے بتائے اوقات پر چیک کر کے لکھی جاتی ہیں",
  },
];

/* ------------------------------------------------------------------ *
 * What an attendant does for the mother. Only the confirmed attendant
 * duties — feeding, hygiene, movement, companionship, comfort, overnight
 * duty — written as they apply to a woman resting after a delivery.
 * "Meals and drinks" means HER meals. Nothing here touches the baby.
 * ------------------------------------------------------------------ */
const ATTENDANT_DOES: Bilingual[] = [
  {
    en: "Her meals and water brought to her, so she is not up and down from the bed all day",
    ur: "اس کا کھانا اور پانی اسی کے پاس، تاکہ اسے سارا دن بستر سے اٹھنا بیٹھنا نہ پڑے",
  },
  {
    en: "Help with washing, changing and keeping her clean and comfortable",
    ur: "نہانے دھونے، کپڑے بدلنے اور صفائی و آرام میں مدد",
  },
  {
    en: "A steady arm when she gets up and moves around the house",
    ur: "اٹھتے وقت اور گھر میں چلتے پھرتے سہارا",
  },
  {
    en: "Someone sitting with her — company, instead of a room she is left alone in",
    ur: "کوئی اس کے پاس بیٹھا ہوا — ساتھ، تاکہ وہ کمرے میں اکیلی نہ رہے",
  },
  {
    en: "Overnight duty, so nobody in the family has to take turns staying awake",
    ur: "رات کی ڈیوٹی، تاکہ گھر والوں کو باری باری جاگنا نہ پڑے",
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
 *
 * Q2 is the honest scope answer about the baby. It is deliberately the
 * second question, phrased as a plain "no", and it is the only place on
 * this page those words appear. Do not soften it, do not move it lower,
 * and do not delete it: the whole page depends on it being here.
 * ------------------------------------------------------------------ */
const POSTNATAL_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "Zachgi ke baad dekh bhaal — can someone come home after the delivery?",
    qUr: "کیا زچگی کے بعد گھر پر دیکھ بھال کے لیے کوئی آ سکتا ہے؟",
    a: `Yes. ${CALLBACK_PROMISE.en} ${START_PROMISE.en} Tell us on the call what she actually needs — a dressing that has to be changed, medicines given on time, or simply somebody in the house so she can sleep — and we will say plainly whether that is a nurse or an attendant, and arrange it around the hours you need.`,
    aUr: `جی ہاں۔ ${CALLBACK_PROMISE.ur} ${START_PROMISE.ur} کال پر ہمیں بتا دیں کہ اصل ضرورت کیا ہے — ڈریسنگ بدلوانی ہے، دوائیں وقت پر دلوانی ہیں، یا صرف یہ کہ گھر میں کوئی ہو تاکہ وہ سو سکے — ہم صاف بتا دیں گے کہ نرس چاہیے یا اٹینڈنٹ، اور آپ کے بتائے اوقات کے مطابق بندوبست کر دیں گے۔`,
  },
  {
    q: "Will your caregiver look after the baby as well?",
    qUr: "کیا آپ کا عملہ بچے کو بھی سنبھالے گا؟",
    a: "What we arrange is care for the mother — her wound and dressing, her prescribed medicines, her meals, help with hygiene and with moving around the house, and somebody with her through the night. That is what the caregiver comes for, so it is worth settling before she arrives rather than on the morning. If your family also wants help with the baby, say so on the first call: we will look at what you need and tell you what we can arrange, before anyone is booked and before you have paid anything.",
    aUr: "ہمارا بندوبست ماں کی دیکھ بھال کے لیے ہوتا ہے — اس کا زخم اور ڈریسنگ، تجویز کردہ دوائیں، اس کا کھانا، صفائی اور چلنے پھرنے میں مدد، اور رات بھر اس کے پاس کوئی۔ عملہ اسی کام کے لیے آتا ہے، اس لیے یہ بات پہلے طے کر لینا بہتر ہے، نہ کہ اُس دن جب وہ گھر پہنچے۔ اگر آپ کے گھر والے بچے کے لیے بھی مدد چاہتے ہیں تو پہلی کال پر بتا دیں: ہم آپ کی ضرورت دیکھ کر بتا دیں گے کہ کیا بندوبست ہو سکتا ہے، کسی بکنگ سے پہلے اور کوئی ادائیگی کیے بغیر۔",
  },
  {
    q: "Can a nurse change the dressing at home after a C-section?",
    qUr: "کیا نرس سی سیکشن کے بعد گھر پر ڈریسنگ بدل سکتی ہے؟",
    a: "Yes. Cleaning a wound and changing a dressing is everyday work for a PNC-registered nurse, and it is done exactly as the doctor wrote it — the same schedule, the same instructions. If the dressing is the only thing you cannot manage at home, you do not need a 12-hour shift: a nurse can come for a single visit, do it, and leave. Send us a photo of the discharge paper on WhatsApp and we will arrange the visit around it.",
    aUr: "جی ہاں۔ زخم صاف کرنا اور ڈریسنگ بدلنا PNC رجسٹرڈ نرس کا روزمرہ کام ہے، اور یہ بالکل اسی طرح ہوتا ہے جیسے ڈاکٹر نے لکھا ہو — وہی وقفہ، وہی ہدایات۔ اگر گھر پر صرف ڈریسنگ ہی نہیں ہو پا رہی تو 12 گھنٹے کی شفٹ لینے کی ضرورت نہیں: نرس ایک وزٹ کے لیے آ سکتی ہے، ڈریسنگ کر کے چلی جائے گی۔ ڈسچارج والے کاغذ کی تصویر واٹس ایپ کر دیں، ہم اسی کے مطابق وزٹ رکھ دیں گے۔",
  },
  {
    q: "Can we ask for a female nurse or a female attendant?",
    qUr: "کیا ہم خاتون نرس یا خاتون اٹینڈنٹ مانگ سکتے ہیں؟",
    a: "Yes, and for this service almost every family does. Say it when we call and we send a female nurse or a female attendant — female-for-female, always, and nobody has to explain why. Before she comes you get her card on WhatsApp: photo, name, and for a nurse her PNC registration number, so the person at your gate is somebody you have already seen.",
    aUr: "جی ہاں، اور اس خدمت کے لیے تقریباً ہر گھرانہ یہی کہتا ہے۔ کال پر بتا دیں، ہم خاتون نرس یا خاتون اٹینڈنٹ بھیجیں گے — خاتون کے لیے خاتون، ہمیشہ، اور وجہ بتانے کی ضرورت نہیں۔ آنے سے پہلے اس کا کارڈ واٹس ایپ پر آ جائے گا: تصویر، نام، اور نرس ہو تو اس کا PNC رجسٹریشن نمبر — تاکہ دروازے پر کھڑا فرد وہی ہو جسے آپ پہلے دیکھ چکے ہیں۔",
  },
  {
    q: "Can somebody stay the night so she can actually sleep?",
    qUr: "کیا رات کو کوئی رک سکتا ہے تاکہ وہ سو سکے؟",
    a: "Yes. The night shift is 8:00 PM to 8:00 AM — the stretch that families run out of after a few nights of taking turns. If you need somebody in the house around the clock, that is two caregivers across two 12-hour shifts, never one person awake for 24 hours, because nobody does that well. Start with the nights if that is where the gap is; you can change the arrangement later.",
    aUr: "جی ہاں۔ رات کی شفٹ رات 8 بجے سے صبح 8 بجے تک ہوتی ہے — یہی وہ وقت ہے جو چند راتوں کی باری باری جاگنے کے بعد گھر والوں سے نہیں سنبھلتا۔ اگر چوبیس گھنٹے کسی کی ضرورت ہو تو وہ دو کیئر گیور، دو بارہ گھنٹے کی شفٹوں میں ہوتے ہیں — ایک ہی شخص 24 گھنٹے نہیں، کیونکہ یہ کوئی بھی ٹھیک طرح نہیں کر سکتا۔ اگر مسئلہ راتوں کا ہے تو رات سے شروع کریں؛ بندوبست بعد میں بدلا جا سکتا ہے۔",
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD — no price, priceRange, priceCurrency or priceSpecification
 * anywhere in this graph (Decision Ledger #9). The Offer states the
 * TERMS in words only. Nothing in this graph mentions newborn, baby or
 * neonatal care: the structured data must describe the same service the
 * page sells, and the page sells care for the mother.
 * ------------------------------------------------------------------ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Postnatal care at home for the mother",
  name: "Postnatal Care at Home in Lahore (Care for the Mother After Delivery)",
  description:
    "Postnatal care at home in Lahore for the mother after delivery. A PNC-registered nurse for wound care and dressing changes including a C-section wound, prescribed medicines, injections and drips on the doctor's prescription, and vitals monitoring; or an attendant for meals, hygiene, help moving around the house, company and overnight duty so the mother can rest. Female caregiver on request. Single visit, 12-hour day or night shift, or round-the-clock as two caregivers across two shifts. CNIC checked, references called, police-verified.",
  url: `${SITE_URL}/services/mother-baby-care`,
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
      "Exact price quoted on the first call, before care starts. First day free. No advance. Pay after the shift. Single visits and 12-hour day or night shifts.",
    areaServed: { "@type": "City", name: "Lahore" },
  },
};

const crumbs = [
  { name: "Services", nameUr: "خدمات", path: "/services" },
  { name: "Care after delivery", nameUr: "زچگی کے بعد دیکھ بھال" },
];
const breadcrumbs = breadcrumbList(crumbs);

// Mirrors the on-page FAQ exactly — Google requires the schema and the
// rendered content to match.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: POSTNATAL_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ------------------------------------------------------------------ *
 * Shared inline styles — the same card language as /charges, /about and
 * the other service pages. No new CSS: direction6.css is not touched.
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

const NOTE: CSSProperties = {
  marginTop: 18,
  paddingTop: 16,
  borderTop: "1px dashed var(--line)",
  fontSize: 16.5,
  color: "var(--ink-soft)",
  fontWeight: 600,
  lineHeight: 1.6,
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

export default function MotherPostnatalCarePage() {
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
          {/* ---- hero: the noun and the city in the H1, the mother as subject ---- */}
          <section className="hero">
            <div className="wrap">
              <div className="hero-grid">
                <div className="hero-copy">
                  <span className="eyebrow eyebrow-plain">
                    <span data-en>After delivery &middot; zachgi ke baad</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">زچگی کے بعد</span>
                  </span>

                  <h1>
                    <span data-en>
                      Postnatal care at home in <span className="hl">Lahore</span> — for the mother
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      <span className="hl">لاہور</span> میں گھر پر زچگی کے بعد ماں کی دیکھ بھال
                    </span>
                  </h1>

                  <p className="hero-sub">
                    <span data-en>
                      Care after delivery at home in Lahore: a PNC-registered nurse for a C-section
                      dressing, prescribed medicines and monitoring — or an attendant in the house
                      so she can actually rest. A female caregiver whenever you ask.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      لاہور میں گھر پر زچگی کے بعد کی دیکھ بھال: سی سیکشن کی ڈریسنگ، تجویز کردہ
                      دوائیں اور نگرانی کے لیے PNC رجسٹرڈ نرس — یا گھر میں اٹینڈنٹ، تاکہ وہ واقعی
                      آرام کر سکے۔ خاتون کیئر گیور، جب بھی آپ کہیں۔
                    </span>
                  </p>

                  <div className="hero-trust">
                    <span className="pill">
                      <span data-en>Female caregiver on request</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">خاتون کیئر گیور، آپ کے کہنے پر</span>
                    </span>
                    <span className="pill">
                      <span data-en>Care can start within 24 hours</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">24 گھنٹوں میں شروع</span>
                    </span>
                    <span className="pill">
                      <span data-en>{PROMISES.trial.enShort}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{PROMISES.trial.urShort}</span>
                    </span>
                    <span className="pill">
                      <span data-en>Single visit or full shift</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">ایک وزٹ یا پوری شفٹ</span>
                    </span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
                    <a className="btn btn-call" href={`tel:${CONTACT_PHONE_TEL}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                      </svg>
                      <span data-en>Call {CONTACT_PHONE_DISPLAY}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">کال کریں <bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi></span>
                    </a>
                    <a className="btn btn-wa" href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer">
                      <span className="wadot" />
                      <span data-en>Ask on WhatsApp</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">واٹس ایپ پر پوچھیں</span>
                    </a>
                  </div>
                </div>

                <div className="hero-form">
                  <LeadFormD6 variant="hero" />
                </div>
              </div>
            </div>
          </section>

          {/* ---- the reader: usually the husband, mother or sister.
                  The one permitted non-clinical sentence about how hard these
                  days are lives here. Nothing diagnostic, nothing promised. ---- */}
          <section className="block" style={{ paddingTop: 34 }}>
            <div className="wrap">
              <div className="sec-head">
                <h2>
                  <span data-en>You are probably arranging this for her.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">یہ بندوبست غالباً آپ اس کے لیے کر رہے ہیں۔</span>
                </h2>
              </div>

              <div style={{ ...CARD, paddingLeft: 30, position: "relative", overflow: "hidden" }}>
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                />
                <p style={BODY}>
                  <span data-en>
                    It is rarely the mother who makes this call. It is her husband, her own mother,
                    or her sister — from the hospital corridor, or from the drawing room at home
                    while she is asleep in the next room.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    یہ کال عموماً ماں خود نہیں کرتی۔ اس کا شوہر، اس کی والدہ یا اس کی بہن کرتی ہے —
                    ہسپتال کی راہداری سے، یا گھر کے ڈرائنگ روم سے، جب وہ ساتھ والے کمرے میں سو رہی
                    ہوتی ہے۔
                  </span>
                </p>
                <p style={{ ...BODY, marginTop: 16 }}>
                  <span data-en>
                    The days after a birth are hard, and a house full of people who mean well is not
                    the same thing as help. One person whose only job is the mother — bringing her
                    meals, helping her up, staying awake at night so the family does not have to —
                    is practical help. That is all we are offering here, and it is enough.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    بچے کی پیدائش کے بعد کے دن مشکل ہوتے ہیں، اور خیرخواہ لوگوں سے بھرا گھر مدد کے
                    برابر نہیں ہوتا۔ ایک ایسا فرد جس کا واحد کام ماں کا خیال رکھنا ہو — اسے کھانا لا
                    کر دینا، اٹھنے میں سہارا دینا، رات کو جاگنا تاکہ گھر والوں کو نہ جاگنا پڑے — یہی
                    اصل عملی مدد ہے۔ ہم یہی پیش کرتے ہیں، اور یہی کافی ہے۔
                  </span>
                </p>
                <p style={{ ...BODY, marginTop: 16 }}>
                  <span data-en>
                    Tell us what she needs and we will tell you plainly whether that is a nurse or an
                    attendant. You do not have to work it out on your own.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    ہمیں بتائیں کہ اسے کیا چاہیے، ہم صاف بتا دیں گے کہ نرس مناسب ہے یا اٹینڈنٹ۔ یہ سب
                    آپ کو خود طے کرنے کی ضرورت نہیں۔
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
                  <span data-ur lang="ur" dir="rtl" className="urdu">{CALLBACK_PROMISE.ur} {START_PROMISE.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- nurse work vs attendant work, split clearly ---- */}
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
                  <span data-en>Postnatal care at home in Lahore — what it actually is</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">لاہور میں گھر پر زچگی کے بعد کی دیکھ بھال — اصل میں کیا</span>
                </span>
                <h2>
                  <span data-en>What the caregiver does — for her.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">کیئر گیور اس کے لیے کیا کرتی ہے۔</span>
                </h2>
                <p>
                  <span data-en>
                    Whether a nurse or an attendant comes depends on what your family actually needs.
                    We settle that together on the first call, and we say honestly which one it is.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    نرس آئے گی یا اٹینڈنٹ، اس کا انحصار آپ کے گھر کی اصل ضرورت پر ہے۔ یہ ہم پہلی کال
                    پر مل کر طے کرتے ہیں اور صاف بتا دیتے ہیں کہ کون سا فرد مناسب ہے۔
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 6, lineHeight: 1.25 }}>
                    <span data-en>A Qualified Nurse — PNC-registered</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">کوالیفائیڈ نرس — PNC رجسٹرڈ</span>
                  </h3>
                  <p style={{ ...BODY, fontSize: 16, marginBottom: 6 }}>
                    <span data-en>
                      The clinical work, always on the doctor&rsquo;s written plan — never on a plan
                      of ours.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      طبی کام، ہمیشہ ڈاکٹر کے لکھے ہوئے پلان کے مطابق — اپنی مرضی سے نہیں۔
                    </span>
                  </p>
                  <TickList items={NURSE_DOES} />
                </div>

                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 6, lineHeight: 1.25 }}>
                    <span data-en>An attendant — the everyday help</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">اٹینڈنٹ — روزمرہ کی مدد</span>
                  </h3>
                  <p style={{ ...BODY, fontSize: 16, marginBottom: 6 }}>
                    <span data-en>
                      Non-clinical, hands-on help so the mother can lie down instead of running the
                      house.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      غیر طبی، عملی مدد — تاکہ ماں گھر چلانے کے بجائے آرام کر سکے۔
                    </span>
                  </p>
                  <TickList items={ATTENDANT_DOES} />
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                <Link className="btn btn-ghost" href="/services/qualified-nurse">
                  <span data-en>Everything a qualified nurse handles</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">نرس کے تمام طبی کام</span>
                </Link>
                <Link className="btn btn-ghost" href="/services/attendant">
                  <span data-en>What an attendant does</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">اٹینڈنٹ کیا کرتا ہے</span>
                </Link>
                <Link className="btn btn-ghost" href="/charges">
                  <span data-en>How charges work</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">چارجز کیسے طے ہوتے ہیں</span>
                </Link>
              </div>
            </div>
          </section>

          {/* ---- after a C-section. Wound care described exactly like any other
                  wound care; every clinical worry routes to her own doctor and
                  NO symptom list is printed. ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Nurse after a C-section at home</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">سی سیکشن کے بعد گھر پر نرس</span>
                </span>
                <h2>
                  <span data-en>After a C-section.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">سی سیکشن کے بعد۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <p style={BODY}>
                  <span data-en>
                    A caesarean leaves an operation wound, and it is looked after the way any
                    operation wound is: cleaned and dressed by a PNC-registered nurse, on the
                    schedule the doctor wrote down, with the medicines from the same prescription and
                    the follow-up date already on the paper in your hand.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    سی سیکشن کے بعد آپریشن کا زخم ہوتا ہے، اور اس کی دیکھ بھال بھی ویسے ہی ہوتی ہے
                    جیسے کسی بھی آپریشن کے زخم کی: PNC رجسٹرڈ نرس اسے صاف کر کے ڈریسنگ کرتی ہے، اسی
                    وقفے سے جو ڈاکٹر نے لکھا ہو، اسی نسخے کی دوائیں، اور اگلے چیک اپ کی وہی تاریخ جو
                    آپ کے کاغذ پر درج ہے۔
                  </span>
                </p>
                <p style={{ ...BODY, marginTop: 14 }}>
                  <span data-en>
                    If the dressing is the one thing nobody at home can manage, you do not need to
                    take a 12-hour shift for it. A nurse can come for a single visit, do it, and
                    leave. Send a photo of the discharge paper on WhatsApp — you do not have to
                    explain it all on the phone.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    اگر گھر میں صرف ڈریسنگ ہی کوئی نہیں کر سکتا تو اس کے لیے 12 گھنٹے کی شفٹ لینے کی
                    ضرورت نہیں۔ نرس ایک وزٹ کے لیے آ سکتی ہے، ڈریسنگ کر کے چلی جائے گی۔ ڈسچارج والے
                    کاغذ کی تصویر واٹس ایپ کر دیں — سب کچھ فون پر بتانا ضروری نہیں۔
                  </span>
                </p>
                <p style={NOTE}>
                  <span data-en>
                    Being straight with you: we are not the doctor who looked after the delivery, and
                    we do not act like it. Our nurse works from the discharge paper and the
                    prescription, and from nothing else — we do not diagnose, and you will not find a
                    list of symptoms on this page, because what to watch for in her case is written
                    on her own paper by her own doctor. If the nurse notices a change, she tells you
                    straight away so you can call that doctor. In an emergency, the hospital comes
                    first — always.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    صاف بات: ہم وہ ڈاکٹر نہیں جنہوں نے ڈیلیوری کروائی، اور ہم ایسا ظاہر بھی نہیں
                    کرتے۔ ہماری نرس صرف ڈسچارج کے کاغذ اور نسخے کے مطابق کام کرتی ہے — ہم تشخیص نہیں
                    کرتے، اور اس صفحے پر آپ کو علامات کی کوئی فہرست نہیں ملے گی، کیونکہ ان کے معاملے
                    میں کن باتوں پر نظر رکھنی ہے، یہ ان کے اپنے ڈاکٹر نے ان کے کاغذ پر لکھا ہے۔ نرس کو
                    کوئی تبدیلی محسوس ہو تو وہ فوراً آپ کو بتاتی ہے تاکہ آپ اسی ڈاکٹر سے رابطہ کر
                    سکیں۔ ایمرجنسی میں پہلے ہسپتال — ہمیشہ۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- traditional postnatal support.
                  NOTHING specific is claimed here: no massage, no dietary
                  practice, no named ritual — none of that is confirmed by ops,
                  so none of it is on the page. Only the confirmed attendant
                  duties, plus an honest invitation to ask on the first call. ---- */}
          <section
            className="block"
            style={{
              background: "var(--cream-2)",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
              paddingTop: 34,
            }}
          >
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Zachgi ke baad dekh bhaal</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">زچگی کے بعد دیکھ بھال</span>
                </span>
                <h2>
                  <span data-en>The help families have always arranged after a birth.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">وہ مدد جو گھرانے ہمیشہ سے بچے کی پیدائش کے بعد کرتے آئے ہیں۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <p style={BODY}>
                  <span data-en>
                    In our homes a new mother is not meant to be running the house. Somebody takes
                    over so she can lie down — traditionally an aunt, an older relative or a
                    neighbour who could stay. In a lot of Lahore households today there is simply
                    nobody free to do it, and the job quietly lands on whoever is least able to
                    refuse.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    ہمارے گھروں میں نئی ماں سے گھر چلوانا مقصود نہیں ہوتا۔ کوئی ذمہ داری سنبھال لیتا
                    ہے تاکہ وہ لیٹ سکے — روایتی طور پر کوئی خالہ، کوئی بڑی رشتہ دار یا کوئی پڑوسن جو
                    چند دن رک سکے۔ آج لاہور کے بہت سے گھروں میں یہ کرنے والا کوئی فارغ نہیں ہوتا، اور
                    یہ کام خاموشی سے اس کے سر آ جاتا ہے جو انکار نہیں کر سکتا۔
                  </span>
                </p>
                <p style={{ ...BODY, marginTop: 14 }}>
                  <span data-en>
                    That is the whole job of the attendant we send. She is in the house for the
                    shift: the mother&rsquo;s meals and water brought to her, help with washing and
                    changing, a hand when she gets up, the bed kept clean, company in the room, and
                    somebody awake at night. Ordinary, practical, hands-on help — the kind that
                    actually lets a mother rest.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    ہم جو اٹینڈنٹ بھیجتے ہیں، اس کا پورا کام یہی ہے۔ وہ پوری شفٹ گھر میں رہتی ہے: ماں
                    کا کھانا اور پانی اسی کے پاس، نہانے دھونے اور کپڑے بدلنے میں مدد، اٹھتے وقت
                    سہارا، بستر صاف، کمرے میں ساتھ، اور رات کو جاگنے والا کوئی۔ سیدھی سادی، عملی مدد
                    — وہی جو ماں کو واقعی آرام دیتی ہے۔
                  </span>
                </p>
                <p style={NOTE}>
                  <span data-en>
                    If your family expects something specific in these days — a particular routine or
                    a practice that matters to you — please say it on the first call. We would rather
                    tell you plainly whether our attendant does that than have you discover on the
                    morning she arrives that she does not.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    اگر ان دنوں کے لیے آپ کے گھر والوں کی کوئی خاص توقع ہے — کوئی مخصوص معمول یا کوئی
                    ایسا طریقہ جو آپ کے لیے اہم ہو — تو پہلی کال پر بتا دیں۔ ہم صاف بتا دینا بہتر
                    سمجھتے ہیں کہ ہماری اٹینڈنٹ وہ کام کرتی ہے یا نہیں، بجائے اس کے کہ آپ کو اس کے
                    آنے والے دن پتہ چلے۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- female caregiver on request ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Female-for-female, always</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">خاتون کے لیے خاتون، ہمیشہ</span>
                </span>
                <h2>
                  <span data-en>A female caregiver, if you ask — and here, most families do.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">خاتون کیئر گیور، اگر آپ کہیں — اور یہاں تقریباً سب کہتے ہیں۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <p style={BODY}>
                  <span data-en>
                    Say it when we call and we send a female nurse or a female attendant. Nobody has
                    to explain why, and you are not asking for a favour — for a service like this it
                    is what we expect to hear.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    کال پر بتا دیں، ہم خاتون نرس یا خاتون اٹینڈنٹ بھیجیں گے۔ وجہ بتانے کی ضرورت نہیں،
                    اور یہ کوئی رعایت مانگنا نہیں — ایسی خدمت کے لیے ہمیں یہی توقع ہوتی ہے۔
                  </span>
                </p>
                <p style={{ ...BODY, marginTop: 14 }}>
                  <span data-en>
                    Before she comes, her card reaches you on WhatsApp — photo, name, and for a nurse
                    her PNC registration number — so the person at your gate is somebody you have
                    already seen. If you tell us up to 4 hours before the shift, there is no charge
                    to cancel or reschedule.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    آنے سے پہلے اس کا کارڈ آپ کو واٹس ایپ پر مل جاتا ہے — تصویر، نام، اور نرس ہو تو
                    اس کا PNC رجسٹریشن نمبر — تاکہ دروازے پر کھڑا فرد وہی ہو جسے آپ پہلے دیکھ چکے
                    ہیں۔ شفٹ سے 4 گھنٹے پہلے تک بتا دیں تو منسوخی یا وقت بدلنے کا کوئی چارج نہیں۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- care formats (CARE_FORMATS) + the promises + verification ---- */}
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
                  <span data-ur lang="ur" dir="rtl" className="urdu">دیکھ بھال کا بندوبست کیسے ہوتا ہے</span>
                </span>
                <h2>
                  <span data-en>One visit, one shift, or somebody here at night.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ایک وزٹ، ایک شفٹ، یا رات بھر کے لیے کوئی۔</span>
                </h2>
                <p>
                  <span data-en>
                    Pick the shape that fits the week you are actually having — and change it as the
                    house settles.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    وہ صورت چنیں جو آپ کے اس ہفتے کے حالات پر پوری اترے — اور گھر کے معمولات بہتر ہوں
                    تو اسے بدل لیں۔
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

              <div style={{ ...CARD, marginTop: 18 }}>
                <TickList items={PROMISE_LINES} />
                <p style={{ ...NOTE, fontSize: 16 }}>
                  <span data-en>{VERIFICATION_PROMISE.en}</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">{VERIFICATION_PROMISE.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="postnatal-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Zachgi ke baad dekh bhaal — the questions families ask</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">زچگی کے بعد دیکھ بھال — عام سوالات</span>
                </span>
                <h2>
                  <span data-en>Straight answers, before you decide.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">فیصلے سے پہلے، سیدھے جواب۔</span>
                </h2>
              </div>

              <div className="faq-list">
                {POSTNATAL_FAQ.map((item) => (
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
                <a className="btn btn-call" href={`tel:${CONTACT_PHONE_TEL}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  <span data-en>Call {CONTACT_PHONE_DISPLAY}</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">کال کریں <bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi></span>
                </a>
                <a className="btn btn-wa" href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer">
                  <span className="wadot" />
                  <span data-en>Ask on WhatsApp</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">واٹس ایپ پر پوچھیں</span>
                </a>
                <Link className="btn btn-ghost" href="/book">
                  <span data-en>Leave your number — we call you back</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">اپنا نمبر لکھ دیں — ہم کال کریں گے</span>
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
