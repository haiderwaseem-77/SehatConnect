// /services/elderly-care — the "elderly care at home in Lahore" SEO landing page.
//
// Written for the Arranger (NORTH-STAR §2): an adult son or daughter, often at
// work, sometimes abroad, worried about a parent who is no longer managing at
// home. The spine of the page is the question every one of them asks first —
// nurse or attendant? — answered with concrete situations rather than adjectives.
//
// HARD CONSTRAINTS held here:
//   1. NO PRICE anywhere — not in copy, meta, or JSON-LD (Decision Ledger #9).
//      The do-not-render pricing constant in lib/constants.ts is NOT imported.
//   2. Every promise string is imported VERBATIM from lib/constants.ts, which
//      mirrors the NORTH-STAR §3 promises table. Never paraphrase or strengthen.
//   3. Round-the-clock = TWO caregivers on TWO 12-hour shifts (CARE_FORMATS,
//      owner-confirmed 2026-08-21). Said plainly — it is a real trust win.
//   4. ICU step-down only. Nothing on this page implies machine-supported care
//      at home; that question is routed to the first call, not answered here.
//   5. Every user-facing English string carries an Urdu counterpart (§5).
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
  title: "Elderly Care at Home in Lahore",
  description:
    "Elderly care at home in Lahore — attendants for daily support, PNC-registered nurses for medical care. Day, night or round-the-clock (two caregivers, two shifts). First day free, no advance, pay after the shift.",
  alternates: { canonical: `${SITE_URL}/services/elderly-care` },
};

const WA_MSG = serviceWaMsg("buzurgon ki dekh bhaal ke liye attendant ya nurse");

type Bilingual = { en: string; ur: string };

/* ------------------------------------------------------------------ *
 * Nurse or attendant — the spine of the page.
 *
 * Every "answer" below is derived from the split the site already states in
 * FAQ_ITEMS / HomeFAQ / ServiceDetailPage: a Qualified Nurse is PNC registered
 * and does clinical work; an Attendant does non-clinical daily support. No new
 * capability is claimed here.
 * ------------------------------------------------------------------ */
const NURSE: Bilingual = { en: "A Qualified Nurse", ur: "PNC رجسٹرڈ نرس" };
const ATTENDANT: Bilingual = { en: "An Attendant", ur: "اٹینڈنٹ" };

const SITUATIONS: { need: Bilingual; answer: Bilingual; why: Bilingual }[] = [
  {
    need: {
      en: "“Papa had an operation and the dressing has to be changed at home.”",
      ur: "“ابو کا آپریشن ہوا ہے اور گھر پر ڈریسنگ بدلوانی ہے۔”",
    },
    answer: NURSE,
    why: {
      en: "Wound care, dressings, injections, drips and monitoring are clinical work. A PNC-registered nurse does them; an attendant does not, and we will not pretend otherwise.",
      ur: "زخم کی دیکھ بھال، ڈریسنگ، انجیکشن، ڈرپ اور نگرانی طبی کام ہیں۔ یہ PNC رجسٹرڈ نرس کرتی ہے، اٹینڈنٹ نہیں — اور ہم اس بارے میں گول مول بات نہیں کرتے۔",
    },
  },
  {
    need: {
      en: "“Ammi has become weak. She cannot bathe, change or get to the bathroom on her own.”",
      ur: "“امی کمزور ہو گئی ہیں۔ نہ خود نہا سکتی ہیں، نہ کپڑے بدل سکتی ہیں، نہ باتھ روم تک جا سکتی ہیں۔”",
    },
    answer: ATTENDANT,
    why: {
      en: "Bathing, changing, toilet help and moving safely from bed to chair are an attendant's everyday work. Ask for a female attendant and we will send one.",
      ur: "نہلانا، کپڑے بدلوانا، بیت الخلا میں مدد، اور بستر سے کرسی تک محفوظ طریقے سے لے جانا — یہ اٹینڈنٹ کا روزمرہ کام ہے۔ خاتون اٹینڈنٹ چاہیے تو کہہ دیں، ہم بھیج دیں گے۔",
    },
  },
  {
    need: {
      en: "“His sugar has to be checked and insulin given at fixed times.”",
      ur: "“ان کی شوگر چیک کرنی ہوتی ہے اور وقت پر انسولین لگانی ہوتی ہے۔”",
    },
    answer: NURSE,
    why: {
      en: "Blood sugar checks and insulin injections are clinical tasks. If that is the only daily job, a short nurse visit may be enough instead of a full shift.",
      ur: "شوگر چیک کرنا اور انسولین لگانا طبی کام ہے۔ اگر روزانہ صرف یہی کام ہے تو پوری شفٹ کے بجائے نرس کا مختصر وزٹ بھی کافی ہو سکتا ہے۔",
    },
  },
  {
    need: {
      en: "“She is not ill exactly. She just forgets her meals and forgets her tablets.”",
      ur: "“وہ بیمار تو نہیں، بس کھانا اور گولیاں لینا بھول جاتی ہیں۔”",
    },
    answer: ATTENDANT,
    why: {
      en: "An attendant helps with meals and gives, at the right time, the medicines you have already sorted and handed over. If something has to be injected or monitored, that part is a nurse's.",
      ur: "اٹینڈنٹ کھانے میں مدد کرتا ہے اور وہ دوائیں وقت پر دیتا ہے جو آپ پہلے سے الگ کر کے حوالے کر دیں۔ اگر کوئی چیز لگانی یا مانیٹر کرنی ہو تو وہ نرس کا کام ہے۔",
    },
  },
  {
    need: {
      en: "“He has just come home after a stay in ICU or HDU.”",
      ur: "“وہ آئی سی یو یا ایچ ڈی یو سے ابھی گھر آئے ہیں۔”",
    },
    answer: NURSE,
    why: {
      en: "Care after coming home from the ICU or HDU needs clinical eyes for the first stretch. Once things settle and the work is daily support again, many families move to an attendant — we will tell you when we think that point has come.",
      ur: "آئی سی یو یا ایچ ڈی یو سے گھر آنے کے بعد شروع کے دنوں میں طبی نگرانی چاہیے ہوتی ہے۔ جب حالت سنبھل جائے اور صرف روزمرہ مدد کی ضرورت رہ جائے تو کئی گھرانے اٹینڈنٹ پر آ جاتے ہیں — ہم آپ کو بتا دیں گے کہ وہ وقت کب آیا ہے۔",
    },
  },
  {
    need: {
      en: "“He is mostly fine. He is just alone all day while we are at work.”",
      ur: "“وہ کافی حد تک ٹھیک ہیں۔ بس سارا دن اکیلے ہوتے ہیں جب ہم کام پر ہوتے ہیں۔”",
    },
    answer: ATTENDANT,
    why: {
      en: "Company, meals, help getting up and moving about, and a responsible person in the house if something goes wrong. This is exactly what an attendant is for.",
      ur: "ساتھ، کھانا، اٹھنے بیٹھنے اور چلنے پھرنے میں مدد، اور گھر میں ایک ذمہ دار فرد کا موجود ہونا اگر کوئی مسئلہ ہو جائے۔ اٹینڈنٹ اسی کام کے لیے ہوتا ہے۔",
    },
  },
];

/* ------------------------------------------------------------------ *
 * A typical day. Deliberately hour-shaped and non-clinical: this is the
 * section that turns an abstract "attendant" into a person a family can
 * picture in their parent's room. Every item maps to work the site already
 * claims (feeding, hygiene, movement/positioning, companionship — see
 * ATTENDANT_SERVICES and /services/attendant). Nothing about cooking,
 * housework or record-keeping is claimed, because we do not claim it.
 * ------------------------------------------------------------------ */
const TIMELINE: { when: Bilingual; body: Bilingual }[] = [
  {
    when: { en: "8:00 AM", ur: "صبح 8 بجے" },
    body: {
      en: "The day attendant arrives. On a first day they sit with your parent a while before anything else — being hurried by a stranger is nobody's idea of care.",
      ur: "دن کا اٹینڈنٹ پہنچ جاتا ہے۔ پہلے دن وہ کوئی کام شروع کرنے سے پہلے کچھ دیر آپ کے والد یا والدہ کے پاس بیٹھتا ہے۔ اجنبی کا جلدی مچانا کسی کو اچھا نہیں لگتا۔",
    },
  },
  {
    when: { en: "Morning", ur: "صبح" },
    body: {
      en: "Help out of bed, to the bathroom, and a bath or a sponge bath. Fresh clothes. This is the part most families find hardest to do for a parent.",
      ur: "بستر سے اٹھنے، باتھ روم تک جانے اور نہانے یا سپنج باتھ میں مدد۔ صاف کپڑے۔ یہی وہ کام ہے جو گھر والوں کو اپنے والدین کے لیے کرنا سب سے مشکل لگتا ہے۔",
    },
  },
  {
    when: { en: "Breakfast", ur: "ناشتہ" },
    body: {
      en: "Help with eating and drinking, at your parent's pace — not the attendant's. Then the morning medicines you handed over, taken at the right time.",
      ur: "کھانے پینے میں مدد، آپ کے والد یا والدہ کی رفتار سے — اٹینڈنٹ کی نہیں۔ پھر صبح کی وہ دوائیں جو آپ نے حوالے کی ہوں، وقت پر۔",
    },
  },
  {
    when: { en: "Late morning", ur: "دن چڑھے" },
    body: {
      en: "If your parent can walk, a short walk with support. If they cannot, turning and repositioning, which is what reduces the risk of bed sores.",
      ur: "اگر چل سکتے ہوں تو سہارے کے ساتھ تھوڑی چہل قدمی۔ اگر نہ چل سکتے ہوں تو کروٹ بدلوانا اور پوزیشن بدلنا — اسی سے بیڈ سورز کا خطرہ کم ہوتا ہے۔",
    },
  },
  {
    when: { en: "Midday", ur: "دوپہر" },
    body: {
      en: "Lunch, help with eating, then rest. The attendant stays in the house through the shift; your parent is not left alone in it.",
      ur: "دوپہر کا کھانا، کھانے میں مدد، پھر آرام۔ اٹینڈنٹ پوری شفٹ گھر میں رہتا ہے؛ آپ کے والد یا والدہ اکیلے نہیں چھوڑے جاتے۔",
    },
  },
  {
    when: { en: "Afternoon", ur: "سہ پہر" },
    body: {
      en: "The quiet stretch, and the one families underestimate. Sitting, talking, tea, a bit of television. For an elderly person alone all day, company is half the care.",
      ur: "دن کا خاموش حصہ، اور وہی جسے گھر والے کم اہم سمجھتے ہیں۔ بیٹھنا، باتیں کرنا، چائے، تھوڑی ٹی وی۔ سارا دن اکیلے رہنے والے بزرگ کے لیے ساتھ ہی آدھی دیکھ بھال ہے۔",
    },
  },
  {
    when: { en: "Evening", ur: "شام" },
    body: {
      en: "Evening meal, evening medicines, help to the bathroom, and settling them for the night.",
      ur: "شام کا کھانا، شام کی دوائیں، باتھ روم تک مدد، اور رات کے لیے آرام سے لٹا دینا۔",
    },
  },
  {
    when: { en: "8:00 PM", ur: "رات 8 بجے" },
    body: {
      en: "The shift ends. Ask how the day went — what was eaten, what was taken, how they moved. Then either the night caregiver takes over, or the family does.",
      ur: "شفٹ ختم۔ پوچھ لیں کہ دن کیسا گزرا — کیا کھایا، کون سی دوا لی، چلنے پھرنے میں کیسے رہے۔ اس کے بعد یا تو رات والا فرد سنبھال لیتا ہے، یا گھر والے۔",
    },
  },
];

/* ------------------------------------------------------------------ *
 * Who comes into your home — all six lines are facts the site already
 * publishes (see /charges INCLUDED, /about, FAQ_ITEMS).
 * ------------------------------------------------------------------ */
const WHO_COMES: Bilingual[] = [
  {
    en: "CNIC checked, references called, police-verified — before they reach your door",
    ur: "شناختی کارڈ چیک، حوالہ جات کی تصدیق، اور پولیس ویریفیکیشن — گھر پہنچنے سے پہلے",
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
    en: "A female nurse or attendant when you ask for one — female-for-female, always",
    ur: "خاتون نرس یا اٹینڈنٹ، جب آپ کہیں — خاتون مریضہ کے لیے خاتون",
  },
  {
    en: "A real person on the phone, 24 hours a day, if anything worries you mid-shift",
    ur: "شفٹ کے دوران کوئی فکر ہو تو 24 گھنٹے فون پر ایک اصل انسان موجود",
  },
];

/* ------------------------------------------------------------------ *
 * FAQ — the questions families of elderly parents actually ask.
 * Mirrored byte-for-byte into the FAQPage JSON-LD below.
 * ------------------------------------------------------------------ */
const ELDERLY_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "Can we ask for the same attendant again — wohi banda dobara bhej dein?",
    qUr: "کیا ہم وہی اٹینڈنٹ دوبارہ منگوا سکتے ہیں؟",
    a: "Yes. If you liked a caregiver, send us their name on WhatsApp. We will try to send the same person again. With an elderly parent, and especially with dementia, a familiar face is worth more than anything else we can arrange.",
    aUr: "جی ہاں۔ کوئی نرس یا اٹینڈنٹ پسند آئے تو ان کا نام واٹس ایپ کر دیں۔ ہم کوشش کرتے ہیں کہ وہی فرد دوبارہ بھیجیں۔ بزرگ مریض کے لیے، اور خاص طور پر ڈیمنشیا میں، ایک جانا پہچانا چہرہ باقی ہر چیز سے زیادہ قیمتی ہوتا ہے۔",
  },
  {
    q: "Can we get a female attendant for our mother?",
    qUr: "کیا ہماری والدہ کے لیے خاتون اٹینڈنٹ مل سکتی ہے؟",
    a: "Yes, of course. Many families prefer a female caregiver for a female patient. Tell us when we call and we will send a female nurse or attendant.",
    aUr: "جی بالکل۔ بہت سے گھرانے خاتون مریضہ کے لیے خاتون کیئر گیور کو ترجیح دیتے ہیں۔ کال پر بتا دیں، ہم خاتون نرس یا اٹینڈنٹ بھیج دیں گے۔",
  },
  {
    q: "What if we need to cancel or change the timing?",
    qUr: "اگر ہمیں شفٹ منسوخ کرنی ہو یا وقت بدلنا ہو تو؟",
    a: "Just call or WhatsApp us up to 4 hours before the shift and we will cancel or reschedule it at no charge. Plans change when someone is unwell, and we do not punish families for that.",
    aUr: "شفٹ سے 4 گھنٹے پہلے تک کال یا واٹس ایپ کر دیں، ہم بغیر کسی چارج کے منسوخ یا وقت تبدیل کر دیں گے۔ مریض کے ساتھ منصوبے بدلتے رہتے ہیں، اور ہم اس پر گھر والوں کو تنگ نہیں کرتے۔",
  },
  {
    q: "Do you handle dementia and Alzheimer's patients?",
    qUr: "کیا آپ ڈیمنشیا اور الزائمر کے مریض سنبھالتے ہیں؟",
    a: "Yes. Dementia and Alzheimer's care is one of the services we arrange, and it is built around routine, safety and companionship rather than argument. Tell us on the call what a bad hour looks like in your house — wandering at night, not recognising family, refusing food — so we send someone suited to it.",
    aUr: "جی ہاں۔ ڈیمنشیا اور الزائمر کی دیکھ بھال ہماری خدمات میں شامل ہے، اور یہ بحث کے بجائے روٹین، حفاظت اور ساتھ پر بنی ہوتی ہے۔ کال پر بتا دیں کہ آپ کے گھر میں مشکل وقت کیسا ہوتا ہے — رات کو گھومنا، گھر والوں کو نہ پہچاننا، کھانے سے انکار — تاکہ ہم اسی کے مطابق فرد بھیجیں۔",
  },
  {
    q: "My father refuses help — “mujhe kisi ki zarurat nahin.” What then?",
    qUr: "میرے والد مدد لینے سے انکار کرتے ہیں — “مجھے کسی کی ضرورت نہیں”۔ پھر کیا کریں؟",
    a: "This is normal, and it is usually about dignity, not about us. Start small: a single day shift instead of a permanent arrangement, and let the first hours be mostly sitting and talking rather than bathing and lifting. Your first day is free, so nothing is lost if it does not go well. If the person does not suit your father, tell us and we replace them, free, until you are fully satisfied.",
    aUr: "یہ عام بات ہے، اور عموماً معاملہ عزتِ نفس کا ہوتا ہے، ہمارا نہیں۔ چھوٹی شروعات کریں: مستقل بندوبست کے بجائے صرف ایک دن کی شفٹ، اور پہلے چند گھنٹے نہلانے اٹھانے کے بجائے زیادہ تر بیٹھنے اور بات چیت کے رکھیں۔ پہلا دن مفت ہے، اس لیے بات نہ بنے تو کوئی نقصان نہیں۔ اگر فرد آپ کے والد کے لیے مناسب نہ لگے تو بتا دیں، ہم مفت بدل دیں گے، جب تک آپ مطمئن نہ ہوں۔",
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD — no price, priceRange or priceSpecification anywhere.
 * ------------------------------------------------------------------ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Elderly care at home",
  name: "Elderly Care at Home (Lahore)",
  description:
    "Elderly care at home in Lahore: attendants for feeding, hygiene, movement and companionship, and PNC-registered nurses for clinical care. Day shift, night shift, or round-the-clock with two caregivers across two 12-hour shifts. CNIC checked, references called, police-verified.",
  url: `${SITE_URL}/services/elderly-care`,
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
      "Exact price told on the first call, before care starts. First day free. No advance. Pay after the shift.",
  },
};

const crumbs = [
  { name: "Services", nameUr: "خدمات", path: "/services" },
  { name: "Elderly Care", nameUr: "بزرگوں کی دیکھ بھال" },
];
const breadcrumbs = breadcrumbList(crumbs);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ELDERLY_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ------------------------------------------------------------------ *
 * Shared inline styles — same card language as /charges and /about.
 * No new CSS: app/direction6.css is untouched.
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

export default function ElderlyCarePage() {
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
                    <span data-en>Buzurgon ki dekh bhaal &middot; Lahore</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">بزرگوں کی دیکھ بھال &middot; لاہور</span>
                  </span>

                  <h1>
                    <span data-en>
                      Elderly care at home in <span className="hl">Lahore</span>
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      <span className="hl">لاہور</span> میں بزرگوں کی گھر پر دیکھ بھال
                    </span>
                  </h1>

                  <p className="hero-sub">
                    <span data-en>
                      Most people who call us are not the patient. They are a son or a daughter &mdash;
                      at work, in another city, sometimes in another country &mdash; worried about a
                      mother or father who is no longer managing alone at home. This page explains
                      plainly what elderly care at home looks like, and whether your parent needs a
                      nurse or an attendant.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      ہمیں کال کرنے والے اکثر خود مریض نہیں ہوتے۔ وہ بیٹا یا بیٹی ہوتے ہیں — کام پر،
                      کسی دوسرے شہر میں، کبھی کسی دوسرے ملک میں — جو اپنی والدہ یا والد کے لیے فکرمند
                      ہیں جو اب گھر میں اکیلے نہیں سنبھل پا رہے۔ یہ صفحہ صاف الفاظ میں بتاتا ہے کہ گھر
                      پر بزرگوں کی دیکھ بھال کیسی ہوتی ہے، اور آپ کے والدین کو نرس چاہیے یا اٹینڈنٹ۔
                    </span>
                  </p>

                  <div className="hero-trust">
                    <span className="pill">
                      <span data-en>{PROMISES.trial.enShort}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{PROMISES.trial.urShort}</span>
                    </span>
                    <span className="pill">
                      <span data-en>Day, night or 24 hours</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">دن، رات یا 24 گھنٹے</span>
                    </span>
                    <span className="pill">
                      <span data-en>Female attendant on request</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">درخواست پر خاتون اٹینڈنٹ</span>
                    </span>
                    <span className="pill">
                      <span data-en>Pay after the shift</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">شفٹ کے بعد ادائیگی</span>
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

          {/* ---- nurse or attendant: the spine ---- */}
          <section className="block" style={{ paddingTop: 34 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>The first question every family asks</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ہر گھرانے کا پہلا سوال</span>
                </span>
                <h2>
                  <span data-en>Nurse or attendant &mdash; which does your parent need?</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">نرس یا اٹینڈنٹ — آپ کے والدین کو کیا چاہیے؟</span>
                </h2>
                <p>
                  <span data-en>
                    A Qualified Nurse is PNC registered and does the medical work. An Attendant does
                    the daily, hands-on work that keeps a person clean, fed, safe and not alone. Here
                    are the situations we hear most. If yours is not on the list, tell us on the call
                    &mdash; we do not send a nurse where an attendant is enough.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    PNC رجسٹرڈ نرس طبی کام کرتی ہے۔ اٹینڈنٹ روزمرہ کا وہ کام کرتا ہے جس سے فرد صاف
                    رہے، کھانا کھائے، محفوظ رہے اور اکیلا نہ ہو۔ نیچے وہ صورتیں ہیں جو ہم سب سے زیادہ
                    سنتے ہیں۔ آپ کی بات فہرست میں نہ ہو تو کال پر بتا دیں — جہاں اٹینڈنٹ کافی ہو وہاں
                    ہم نرس نہیں بھیجتے۔
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SITUATIONS.map((s) => (
                  <div key={s.need.en} style={{ ...CARD, display: "flex", flexDirection: "column" }}>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", lineHeight: 1.45 }}>
                      <span data-en>{s.need.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{s.need.ur}</span>
                    </p>
                    <p
                      style={{
                        marginTop: 12,
                        display: "inline-flex",
                        alignSelf: "flex-start",
                        alignItems: "center",
                        minHeight: 34,
                        padding: "0 12px",
                        borderRadius: 10,
                        background: "rgba(13,122,110,.12)",
                        color: "var(--teal-deep)",
                        fontSize: 16,
                        fontWeight: 800,
                      }}
                    >
                      <span data-en>{s.answer.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{s.answer.ur}</span>
                    </p>
                    <p style={{ ...BODY, marginTop: 12 }}>
                      <span data-en>{s.why.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{s.why.ur}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                <Link className="btn btn-ghost" href="/services/qualified-nurse">
                  <span data-en>What a nurse does</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">نرس کیا کرتی ہے</span>
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

          {/* ---- day, night, round-the-clock ---- */}
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
                  <span data-en>How much cover you need</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">کتنی دیر کی مدد چاہیے</span>
                </span>
                <h2>
                  <span data-en>Day, night, or round-the-clock.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">دن، رات، یا چوبیس گھنٹے۔</span>
                </h2>
                <p>
                  <span data-en>
                    Care is arranged around the household, not the other way round. Tell us the hours
                    your family actually struggles with and we build the plan from there.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    دیکھ بھال گھر کے حساب سے طے ہوتی ہے، گھر دیکھ بھال کے حساب سے نہیں۔ ہمیں بتا دیں کہ
                    گھر والوں کو کن گھنٹوں میں سب سے زیادہ مشکل ہوتی ہے، ہم اسی سے منصوبہ بناتے ہیں۔
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

              {/* The two-caregivers truth, stated plainly. Owner-confirmed 2026-08-21. */}
              <div style={{ ...CARD, marginTop: 18, paddingLeft: 30, position: "relative", overflow: "hidden" }}>
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                />
                <h3 style={{ fontSize: 21, marginBottom: 10, lineHeight: 1.3 }}>
                  <span data-en>A 24-hour attendant in Lahore means two people, not one</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">لاہور میں 24 گھنٹے کا اٹینڈنٹ یعنی دو افراد، ایک نہیں</span>
                </h3>
                <p style={{ ...BODY, fontSize: 18 }}>
                  <span data-en>
                    Round-the-clock cover is two caregivers across two 12-hour shifts &mdash; one for
                    the day, one for the night. It is never one person kept awake for 24 hours. A
                    person who has not slept is not who you want beside your father at four in the
                    morning. If someone quotes you one attendant for 24 hours a day, ask them when
                    that person sleeps.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    چوبیس گھنٹے کی دیکھ بھال کا مطلب ہے دو کیئر گیور، دو بارہ گھنٹے کی شفٹوں میں — ایک
                    دن کے لیے، ایک رات کے لیے۔ یہ کبھی ایک ہی شخص کو 24 گھنٹے جگا کر نہیں کیا جاتا۔ جو
                    شخص سویا ہی نہ ہو، وہ رات چار بجے آپ کے والد کے پاس ہونے کے قابل نہیں ہوتا۔ کوئی
                    آپ کو ایک ہی اٹینڈنٹ 24 گھنٹے کے لیے دے رہا ہو تو پوچھیے کہ وہ سوتا کب ہے۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- a typical day ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>So you can picture it</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">تاکہ آپ تصور کر سکیں</span>
                </span>
                <h2>
                  <span data-en>What a day with an attendant actually looks like</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">اٹینڈنٹ کے ساتھ ایک دن اصل میں کیسا ہوتا ہے</span>
                </h2>
                <p>
                  <span data-en>
                    This is a day shift, 8:00 AM to 8:00 PM. Nothing dramatic happens in it, and that
                    is the point.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    یہ دن کی شفٹ ہے، صبح 8 بجے سے رات 8 بجے تک۔ اس میں کچھ ڈرامائی نہیں ہوتا، اور یہی
                    اصل بات ہے۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                {TIMELINE.map((t, i) => (
                  <div
                    key={t.when.en}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      paddingTop: i === 0 ? 0 : 16,
                      marginTop: i === 0 ? 0 : 16,
                      borderTop: i === 0 ? "none" : "1px dashed var(--line)",
                    }}
                  >
                    <span
                      style={{
                        flex: "none",
                        minWidth: 96,
                        fontSize: 16,
                        fontWeight: 800,
                        color: "var(--teal-deep)",
                        lineHeight: 1.4,
                      }}
                    >
                      <span data-en>{t.when.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{t.when.ur}</span>
                    </span>
                    <span style={{ ...BODY, minWidth: 0 }}>
                      <span data-en>{t.body.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{t.body.ur}</span>
                    </span>
                  </div>
                ))}

                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 18,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 16.5,
                    color: "var(--ink-soft)",
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  <span data-en>
                    If it is a Qualified Nurse instead, the same day happens &mdash; with the clinical
                    work your doctor has asked for added into it: dressings, injections, drips,
                    medicines and monitoring.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    اگر اٹینڈنٹ کی جگہ PNC رجسٹرڈ نرس ہو تو دن اسی طرح گزرتا ہے — بس اس میں وہ طبی کام
                    شامل ہو جاتا ہے جو ڈاکٹر نے کہا ہو: ڈریسنگ، انجیکشن، ڈرپ، دوائیں اور نگرانی۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- dementia, bedridden, long-term ---- */}
          <section
            className="block"
            style={{
              paddingTop: 0,
            }}
          >
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>When it is harder than that</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">جب معاملہ اس سے مشکل ہو</span>
                </span>
                <h2>
                  <span data-en>Dementia, bedridden and long-term care</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ڈیمنشیا، بستر پر مریض، اور طویل مدتی دیکھ بھال</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                    <span data-en>Dementia and Alzheimer&rsquo;s</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">ڈیمنشیا اور الزائمر</span>
                  </h3>
                  <p style={BODY}>
                    <span data-en>
                      Dementia care is mostly routine, safety and company: the same things happening at
                      the same times, a calm voice, and someone in the room when the confusion comes.
                      Nobody argues a parent back into a reality they cannot reach. If a caregiver
                      suits your mother or father, send us their name on WhatsApp and we will try to
                      send the same person again. A familiar face is worth more here than anything
                      else we can arrange.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      ڈیمنشیا کی دیکھ بھال زیادہ تر روٹین، حفاظت اور ساتھ ہے: وہی کام، انہی وقتوں پر،
                      ٹھہرا ہوا لہجہ، اور جب ذہن الجھے تو کمرے میں کسی کا موجود ہونا۔ کوئی بحث کر کے
                      مریض کو اس حقیقت میں واپس نہیں لاتا جہاں وہ پہنچ نہیں سکتا۔ کوئی کیئر گیور آپ کی
                      والدہ یا والد کے لیے مناسب لگے تو ان کا نام واٹس ایپ کر دیں، ہم کوشش کریں گے کہ
                      وہی فرد دوبارہ بھیجیں — یہاں جانا پہچانا چہرہ باقی ہر چیز سے زیادہ کام آتا ہے۔
                    </span>
                  </p>
                </div>

                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                    <span data-en>A parent who cannot get out of bed</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">وہ والدین جو بستر سے اٹھ نہیں سکتے</span>
                  </h3>
                  <p style={BODY}>
                    <span data-en>
                      The work here is physical and constant: turning and repositioning to reduce the risk of bed
                      sores, bathing and changing in bed, feeding, and keeping them dry and
                      comfortable. There is no delicate way to say that, and no reason to. It is
                      ordinary work, an attendant has done it before, and your parent keeps their
                      dignity while it is done. If there are wounds to dress or medicines to inject,
                      that part is a nurse&rsquo;s &mdash; many families take an attendant for the
                      shift and a single nurse visit for the task.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      یہاں کام جسمانی بھی ہے اور مسلسل بھی: کروٹ اور پوزیشن بدلنا تاکہ بیڈ سورز کا خطرہ کم ہو، بستر پر ہی نہلانا اور کپڑے بدلنا، کھانا کھلانا، اور مریض کو خشک اور آرام
                      دہ رکھنا۔ اسے نرم الفاظ میں کہنے کی نہ کوئی صورت ہے نہ ضرورت۔ یہ عام کام ہے،
                      اٹینڈنٹ پہلے بھی کر چکا ہوتا ہے، اور یہ سب کرتے ہوئے مریض کی عزت برقرار رہتی ہے۔
                      اگر زخم کی ڈریسنگ یا انجیکشن کی ضرورت ہو تو وہ نرس کا کام ہے — کئی گھرانے شفٹ کے
                      لیے اٹینڈنٹ اور اس کام کے لیے نرس کا ایک وزٹ رکھ لیتے ہیں۔
                    </span>
                  </p>
                </div>
              </div>

              {/* Honesty note: ICU step-down is what we do. Anything beyond it goes
                  to the call, where a human answers it, rather than being implied here. */}
              <div style={{ ...CARD, marginTop: 16, background: "var(--mist)" }}>
                <p style={{ ...BODY, fontSize: 16.5, fontWeight: 600 }}>
                  <span data-en>
                    <b style={{ color: "var(--ink)" }}>Long-term and palliative patients</b> &mdash;
                    cancer, stroke, a long decline &mdash; are cared for with comfort as the aim: pain
                    and symptom management, and days that are as easy as they can be. For a parent just
                    home from ICU or HDU, we arrange the care for that stretch. If they have come home
                    needing machine support, say so on the first call &mdash; we will tell you honestly
                    whether we can arrange it, rather than send someone and hope.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    <b style={{ color: "var(--ink)" }}>طویل مدتی اور آرام دہ نگہداشت کے مریض</b> — کینسر،
                    فالج، یا لمبی بیماری — ان کی دیکھ بھال کا مقصد آرام ہوتا ہے: درد اور علامات میں کمی،
                    اور دن جتنا آسان ہو سکے۔ آئی سی یو یا ایچ ڈی یو سے گھر آنے والے مریض کے لیے ہم اُن
                    دنوں کی دیکھ بھال کا بندوبست کرتے ہیں۔ اگر وہ گھر پر مشین کے سہارے کے ساتھ آئے ہیں
                    تو پہلی کال پر بتا دیں — ہم صاف بتا دیں گے کہ یہ ہمارے بس کا کام ہے یا نہیں، کسی کو
                    بھیج کر امید پر نہیں چھوڑیں گے۔
                  </span>
                </p>
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
                  <span data-en>Who walks into your parent&rsquo;s room</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">آپ کے والدین کے کمرے میں کون آتا ہے</span>
                </span>
                <h2>
                  <span data-en>You know who is coming before they arrive.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">آنے سے پہلے آپ کو معلوم ہوتا ہے کہ کون آ رہا ہے۔</span>
                </h2>
                <p>
                  <span data-en>
                    Letting a stranger into the house to help an elderly parent is the hardest part of
                    this decision, so nothing about that person is a surprise.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    بزرگ والدین کی مدد کے لیے کسی اجنبی کو گھر میں آنے دینا اس فیصلے کا سب سے مشکل حصہ
                    ہے، اسی لیے اس فرد کے بارے میں کچھ بھی اچانک سامنے نہیں آتا۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                <TickList items={WHO_COMES} />
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
                  <span data-ur lang="ur" dir="rtl" className="urdu">{VERIFICATION_PROMISE.ur}</span>
                </p>
              </div>

              {/* The promises, verbatim from lib/constants.ts (NORTH-STAR §3). */}
              <div style={{ ...CARD, marginTop: 16 }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                  <span data-en>What we promise before you decide</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">فیصلہ کرنے سے پہلے ہمارا وعدہ</span>
                </h3>
                <TickList
                  items={[
                    CALLBACK_PROMISE,
                    START_PROMISE,
                    PROMISES.trial,
                    PROMISES.replacement,
                    PROMISES.payment,
                    PROMISES.priceOnCall,
                  ]}
                />
              </div>
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="elderly-care-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>What families of elderly parents ask us</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">بزرگ والدین کے گھر والے کیا پوچھتے ہیں</span>
                </span>
                <h2>
                  <span data-en>Straight answers.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">سیدھے جواب۔</span>
                </h2>
              </div>

              <div className="faq-list">
                {ELDERLY_FAQ.map((item) => (
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
