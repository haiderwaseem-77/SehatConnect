// /services/long-term-care — the "long term care at home Lahore" SEO landing page.
//
// The gap this fills: "Long-term Care & Comfort" is sold on the home page
// (ServicesSection) and named in the city copy, but it was the only service
// with no page of its own. Primary phrase: "long term care at home Lahore";
// also palliative care at home, bedridden patient care, permanent attendant.
//
// SUBJECT MATTER. This page is about months and years of decline, and about
// dying. It describes what a caregiver DOES — never what the family or the
// patient will feel. No recovery, improvement or "peace of mind" is promised.
//
// HARD CONSTRAINTS held here:
//   1. NO PRICE anywhere — copy, meta or JSON-LD (Decision Ledger #9). The
//      do-not-render PRICES constant is NOT imported.
//   2. Every promise string is imported VERBATIM from lib/constants.ts, which
//      mirrors the NORTH-STAR §3 promises table. Never paraphrase.
//   3. Round-the-clock = TWO caregivers on TWO 12-hour shifts (CARE_FORMATS,
//      owner-confirmed 2026-08-21). Stated plainly — it is a real trust win.
//   4. Palliative care is described as caregiving — keeping someone clean,
//      fed, turned and not alone. NOT as treatment, pain management, symptom
//      control or hospice. Those need a doctor we do not provide.
//   5. ICU step-down only (Ledger #16) and no therapy/rehabilitation language
//      of any kind (Ledger #15). Helping someone move is ordinary caregiving.
//   6. Every user-facing English string carries an Urdu counterpart (§5).
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
  title: "Long-term Care at Home in Lahore",
  description:
    "Long term care at home in Lahore — attendants for the daily care of bedridden, dementia and palliative patients, PNC-registered nurses for clinical tasks. Day, night or round-the-clock (two caregivers, two shifts). First day free, no advance, pay after the shift.",
  alternates: { canonical: `${SITE_URL}/services/long-term-care` },
};

const WA_MSG = serviceWaMsg("lambi bimari ke mareez ke liye attendant ya nurse");

type Bilingual = { en: string; ur: string };

/* ------------------------------------------------------------------ *
 * The daily work. Every line is attendant work the site already claims
 * (ATTENDANT_SERVICES, /services/attendant, FAQ_ITEMS): feeding, hygiene,
 * movement, companionship. Nothing clinical is attributed to an attendant,
 * and no housework or cooking is claimed, because we do not claim it.
 * ------------------------------------------------------------------ */
const DAILY_WORK: Bilingual[] = [
  {
    en: "Help out of bed, to the bathroom and back — safely, at your patient's pace",
    ur: "بستر سے اٹھنے، باتھ روم تک جانے اور واپس آنے میں مدد — محفوظ طریقے سے، مریض کی اپنی رفتار سے",
  },
  {
    en: "Bathing, sponge baths in bed, fresh clothes, and keeping your patient clean and dry",
    ur: "نہلانا، بستر پر ہی سپنج باتھ، صاف کپڑے، اور مریض کو صاف اور خشک رکھنا",
  },
  {
    en: "Feeding, and help with drinking water through the day",
    ur: "کھانا کھلانا، اور دن بھر پانی پلانے میں مدد",
  },
  {
    en: "The medicines you have sorted and handed over, given at the times you say",
    ur: "وہ دوائیں جو آپ الگ کر کے حوالے کریں، انہی وقتوں پر دینا جو آپ بتائیں",
  },
  {
    en: "Turning and repositioning through the shift, for a patient who cannot move themselves",
    ur: "پوری شفٹ کروٹ اور پوزیشن بدلوانا، اُس مریض کے لیے جو خود حرکت نہ کر سکے",
  },
  {
    en: "Company through the long hours — sitting with your patient, talking, being in the room",
    ur: "لمبے گھنٹوں میں ساتھ — مریض کے پاس بیٹھنا، بات کرنا، کمرے میں موجود رہنا",
  },
];

/* ------------------------------------------------------------------ *
 * Who comes into your home — every line is a fact the site already
 * publishes (/charges INCLUDED, FAQ_ITEMS, /services/elderly-care).
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
    en: "The same caregiver again where we can — send us their name on WhatsApp",
    ur: "جہاں ممکن ہو وہی فرد دوبارہ — ان کا نام واٹس ایپ کر دیں",
  },
];

/* ------------------------------------------------------------------ *
 * FAQ — the five questions long-term families actually ask.
 * Mirrored byte-for-byte into the FAQPage JSON-LD below.
 * ------------------------------------------------------------------ */
const LTC_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "Can we keep the same caregiver for months — wohi banda rozana bhej dein?",
    qUr: "کیا مہینوں تک وہی فرد آ سکتا ہے؟",
    a: "Send us their name on WhatsApp and we will try to send the same person again. Over a long illness this is worth arranging wherever we can: a patient who is losing words, or losing patience, does better with a face they already know. What we will not do is promise the same person for every shift of every month — caregivers take leave and fall ill too, and we would rather say that now than break it later.",
    aUr: "ان کا نام واٹس ایپ کر دیں، ہم کوشش کرتے ہیں کہ وہی فرد دوبارہ بھیجیں۔ لمبی بیماری میں یہ بات بہت اہم ہے: جو مریض بات بھول رہا ہو یا چڑچڑا ہو گیا ہو، وہ جانے پہچانے چہرے کے ساتھ بہتر رہتا ہے۔ البتہ ہم یہ وعدہ نہیں کریں گے کہ ہر مہینے کی ہر شفٹ میں وہی فرد ہوگا — کیئر گیور بھی چھٹی لیتے ہیں اور بیمار ہوتے ہیں، اور ہم یہ بات ابھی بتا دینا بہتر سمجھتے ہیں۔",
  },
  {
    q: "What happens when our patient's needs change?",
    qUr: "اگر مریض کی ضرورت بدل جائے تو کیا ہوگا؟",
    a: "Tell us and we change the arrangement. Long-term care does not stay still: someone who walked in March may not walk in August, and an attendant who was enough by day may not be enough at night. You can add a night shift, move from an attendant to a Qualified Nurse, or keep the attendant on the shift and call a nurse in for a single visit when there is a clinical task. Nothing has to be arranged again from the start.",
    aUr: "ہمیں بتا دیں، ہم بندوبست بدل دیتے ہیں۔ طویل مدتی دیکھ بھال ایک جیسی نہیں رہتی: جو مریض مارچ میں چل رہا تھا، ہو سکتا ہے اگست میں نہ چل سکے، اور جو اٹینڈنٹ دن میں کافی تھا وہ رات کو کافی نہ ہو۔ آپ رات کی شفٹ بڑھا سکتے ہیں، اٹینڈنٹ سے PNC رجسٹرڈ نرس پر آ سکتے ہیں، یا اٹینڈنٹ شفٹ پر رکھ کر کسی طبی کام کے لیے نرس کا ایک وزٹ منگوا سکتے ہیں۔ سب کچھ نئے سرے سے طے کرنے کی ضرورت نہیں۔",
  },
  {
    q: "Can you cover only the nights?",
    qUr: "کیا صرف رات کے لیے بندوبست ہو سکتا ہے؟",
    a: "Yes. The night shift is 12 hours, 8:00 PM to 8:00 AM, and you can take it on its own — no day shift, no round-the-clock. It is arranged for families who cannot stay awake with a patient every night. If you later need the days as well, that is two caregivers across two shifts, and we arrange it the same way.",
    aUr: "جی ہاں۔ رات کی شفٹ 12 گھنٹے کی ہے، رات 8 بجے سے صبح 8 بجے تک، اور آپ صرف یہی لے سکتے ہیں — نہ دن کی شفٹ، نہ چوبیس گھنٹے۔ یہ اُن گھر والوں کے لیے ہے جو ہر رات مریض کے ساتھ جاگ نہیں سکتے۔ بعد میں دن بھی چاہیے ہوا تو وہ دو کیئر گیور، دو شفٹوں میں ہوگا، اور ہم اسی طرح بندوبست کر دیتے ہیں۔",
  },
  {
    q: "What if we need to stop?",
    qUr: "اگر ہمیں یہ سلسلہ روکنا پڑے تو؟",
    a: "Then you stop. There is no advance and nothing paid up front, so there is nothing to unwind — you pay after each shift, for the shifts that happened. Call or WhatsApp us up to 4 hours before a shift and we cancel or reschedule it at no charge. And the first day is free either way, so if the arrangement is not right for your house, you have lost nothing by trying it.",
    aUr: "تو روک دیں۔ کوئی پیشگی ادائیگی نہیں ہوتی، اس لیے واپس کرنے کو کچھ ہوتا ہی نہیں — آپ ہر شفٹ کے بعد، صرف اُسی شفٹ کے پیسے دیتے ہیں۔ شفٹ سے 4 گھنٹے پہلے تک کال یا واٹس ایپ کر دیں، ہم بغیر کسی چارج کے منسوخ یا وقت تبدیل کر دیں گے۔ اور پہلا دن ویسے بھی مفت ہے، تو بات نہ بنے تو آزمانے میں آپ کا کوئی نقصان نہیں۔",
  },
  {
    q: "Do you handle dementia patients over the long term?",
    qUr: "کیا آپ ڈیمنشیا کے مریض لمبے عرصے تک سنبھالتے ہیں؟",
    a: "Yes. Dementia and Alzheimer's care is one of the services we arrange, and over months it is built around routine, safety and company rather than argument: the same things at the same times, a calm voice, and someone in the room when the confusion comes. Nobody argues a patient back into a reality they cannot reach. Ask for the same caregiver where we can send them — a familiar face does more here than anything else we arrange.",
    aUr: "جی ہاں۔ ڈیمنشیا اور الزائمر کی دیکھ بھال ہماری خدمات میں شامل ہے، اور مہینوں کے حساب سے یہ بحث کے بجائے روٹین، حفاظت اور ساتھ پر بنتی ہے: وہی کام انہی وقتوں پر، ٹھہرا ہوا لہجہ، اور جب ذہن الجھے تو کمرے میں کسی کا موجود ہونا۔ کوئی بحث کر کے مریض کو اُس حقیقت میں واپس نہیں لاتا جہاں وہ پہنچ نہیں سکتا۔ جہاں ممکن ہو وہی کیئر گیور مانگ لیں — یہاں جانا پہچانا چہرہ باقی ہر چیز سے زیادہ کام آتا ہے۔",
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD — no price, priceRange or priceSpecification anywhere.
 * ------------------------------------------------------------------ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Long-term care at home",
  name: "Long-term Care at Home (Lahore)",
  description:
    "Long-term care at home in Lahore: attendants for the daily care of bedridden, dementia and palliative patients — feeding, hygiene, repositioning, movement and companionship — and PNC-registered nurses for clinical tasks. Day shift, night shift, or round-the-clock with two caregivers across two 12-hour shifts. CNIC checked, references called, police-verified.",
  url: `${SITE_URL}/services/long-term-care`,
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
      "The exact charge is told on the first call, before care starts. First day free. No advance. Pay after the shift.",
  },
};

const crumbs = [
  { name: "Services", nameUr: "خدمات", path: "/services" },
  { name: "Long-term Care", nameUr: "طویل مدتی دیکھ بھال" },
];
const breadcrumbs = breadcrumbList(crumbs);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: LTC_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ------------------------------------------------------------------ *
 * Shared inline styles — same card language as /charges, /about and
 * /services/elderly-care. No new CSS: app/direction6.css is untouched.
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

function WhatsAppButton() {
  return (
    <a className="btn btn-wa" href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer">
      <span className="wadot" />
      <span data-en>Ask on WhatsApp</span>
      <span data-ur className="urdu">واٹس ایپ پر پوچھیں</span>
    </a>
  );
}

export default function LongTermCarePage() {
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
                    <span data-en>Lambi bimari ki dekh bhaal &middot; Lahore</span>
                    <span data-ur className="urdu">لمبی بیماری کی دیکھ بھال &middot; لاہور</span>
                  </span>

                  <h1>
                    <span data-en>
                      Long-term care at home in <span className="hl">Lahore</span>
                    </span>
                    <span data-ur className="urdu">
                      <span className="hl">لاہور</span> میں گھر پر طویل مدتی دیکھ بھال
                    </span>
                  </h1>

                  <p className="hero-sub">
                    <span data-en>
                      Some illnesses do not end. A stroke, cancer, dementia, a body that has slowly
                      worn out &mdash; and care that goes on for months, sometimes years. Most
                      families who call us have already been carrying it alone for a long time: a
                      daughter who has not slept properly in weeks, a son who has run out of leave, a
                      wife lifting a husband she cannot lift. This page explains what long-term care
                      at home covers, who comes, and how it is arranged over months rather than days.
                    </span>
                    <span data-ur className="urdu">
                      کچھ بیماریاں ختم نہیں ہوتیں۔ فالج، کینسر، ڈیمنشیا، یا وہ جسم جو آہستہ آہستہ جواب
                      دے گیا ہو — اور دیکھ بھال جو مہینوں، کبھی برسوں چلتی ہے۔ ہمیں کال کرنے والے اکثر
                      گھرانے یہ بوجھ کافی عرصے سے اکیلے اٹھا رہے ہوتے ہیں: وہ بیٹی جو ہفتوں سے ٹھیک سے
                      سوئی نہیں، وہ بیٹا جس کی چھٹیاں ختم ہو چکی ہیں، وہ بیوی جو شوہر کو اٹھا نہیں
                      سکتی مگر اٹھا رہی ہے۔ یہ صفحہ بتاتا ہے کہ گھر پر طویل مدتی دیکھ بھال میں کیا کیا
                      شامل ہے، کون آتا ہے، اور یہ مہینوں کے حساب سے کیسے طے ہوتی ہے۔
                    </span>
                  </p>

                  <div className="hero-trust">
                    <span className="pill">
                      <span data-en>{PROMISES.trial.enShort}</span>
                      <span data-ur className="urdu">{PROMISES.trial.urShort}</span>
                    </span>
                    <span className="pill">
                      <span data-en>Day, night or 24 hours</span>
                      <span data-ur className="urdu">دن، رات یا 24 گھنٹے</span>
                    </span>
                    <span className="pill">
                      <span data-en>Same caregiver on request</span>
                      <span data-ur className="urdu">درخواست پر وہی کیئر گیور</span>
                    </span>
                    <span className="pill">
                      <span data-en>Pay after the shift</span>
                      <span data-ur className="urdu">شفٹ کے بعد ادائیگی</span>
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

          {/* ---- what the work actually is ---- */}
          <section className="block" style={{ paddingTop: 34 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>The work itself</span>
                  <span data-ur className="urdu">اصل کام کیا ہے</span>
                </span>
                <h2>
                  <span data-en>What long-term care covers, day after day</span>
                  <span data-ur className="urdu">طویل مدتی دیکھ بھال میں روز کیا کیا ہوتا ہے</span>
                </h2>
                <p>
                  <span data-en>
                    Long-term care is not a programme and not a course of treatment. It is the same
                    ordinary work, done properly, every day &mdash; the work that becomes impossible
                    for a family to keep doing alone, month after month, while also going to work.
                  </span>
                  <span data-ur className="urdu">
                    طویل مدتی دیکھ بھال کوئی پروگرام یا علاج کا کورس نہیں۔ یہ وہی روزمرہ کام ہے جو ہر
                    دن ٹھیک طرح کرنا ہوتا ہے — اور یہی وہ کام ہے جو مہینوں تک، نوکری کے ساتھ ساتھ، گھر
                    والوں سے اکیلے نہیں ہو پاتا۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                <TickList items={DAILY_WORK} />
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
                    Clinical work &mdash; wound dressings, injections, drips, medicines and
                    monitoring &mdash; is a Qualified Nurse&rsquo;s, not an attendant&rsquo;s. We say
                    which one your patient needs on the first call, and we do not send a nurse where
                    an attendant is enough.
                  </span>
                  <span data-ur className="urdu">
                    طبی کام — زخم کی ڈریسنگ، انجیکشن، ڈرپ، دوائیں اور نگرانی — PNC رجسٹرڈ نرس کا ہے،
                    اٹینڈنٹ کا نہیں۔ آپ کے مریض کو کیا چاہیے، یہ ہم پہلی کال پر بتا دیتے ہیں — اور
                    جہاں اٹینڈنٹ کافی ہو، وہاں ہم نرس نہیں بھیجتے۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- nurse or attendant for a long-term patient ---- */}
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
                  <span data-en>Which one you need</span>
                  <span data-ur className="urdu">آپ کو کون چاہیے</span>
                </span>
                <h2>
                  <span data-en>An attendant or a nurse for a long-term patient?</span>
                  <span data-ur className="urdu">لمبی بیماری کے مریض کے لیے اٹینڈنٹ یا نرس؟</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                    <span data-en>An Attendant &mdash; for the daily work</span>
                    <span data-ur className="urdu">اٹینڈنٹ — روزمرہ کام کے لیے</span>
                  </h3>
                  <p style={BODY}>
                    <span data-en>
                      Most long-term patients need an attendant. Feeding, hygiene, changing, helping
                      a person move or reposition, and company through the day &mdash; that is what
                      fills the hours, and none of it is clinical. An attendant does that work and
                      does not pretend to do more. Ask for a female attendant for a female patient
                      and we send one.
                    </span>
                    <span data-ur className="urdu">
                      لمبی بیماری کے زیادہ تر مریضوں کو اٹینڈنٹ چاہیے ہوتا ہے۔ کھانا، صفائی، کپڑے
                      بدلوانا، چلنے پھرنے یا پوزیشن بدلنے میں مدد، اور دن بھر کا ساتھ — دن اسی میں
                      گزرتا ہے، اور ان میں سے کوئی کام طبی نہیں۔ اٹینڈنٹ یہی کام کرتا ہے، اس سے زیادہ
                      کا دعویٰ نہیں کرتا۔ خاتون مریضہ کے لیے خاتون اٹینڈنٹ کہہ دیں، ہم بھیج دیتے ہیں۔
                    </span>
                  </p>
                </div>

                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                    <span data-en>A Qualified Nurse &mdash; for the medical work</span>
                    <span data-ur className="urdu">PNC رجسٹرڈ نرس — طبی کام کے لیے</span>
                  </h3>
                  <p style={BODY}>
                    <span data-en>
                      A Qualified Nurse is PNC registered and carries out what your doctor has asked
                      for: wound dressings, injections, drips, medicines and monitoring. Some
                      long-term families keep an attendant on the shift and call a nurse in for the
                      task alone. Care after coming home from ICU or HDU is a nurse&rsquo;s work for
                      the first stretch.
                    </span>
                    <span data-ur className="urdu">
                      PNC رجسٹرڈ نرس وہ کام کرتی ہے جو ڈاکٹر نے لکھا ہو: زخم کی ڈریسنگ، انجیکشن، ڈرپ،
                      دوائیں اور نگرانی۔ کئی گھرانے شفٹ کے لیے اٹینڈنٹ رکھتے ہیں اور صرف اُس کام کے
                      لیے نرس کا وزٹ منگوا لیتے ہیں۔ آئی سی یو یا ایچ ڈی یو سے گھر آنے کے بعد شروع کے
                      دنوں میں یہ نرس کا کام ہے۔
                    </span>
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                <Link className="btn btn-ghost" href="/services/attendant">
                  <span data-en>What an attendant does</span>
                  <span data-ur className="urdu">اٹینڈنٹ کیا کرتا ہے</span>
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

          {/* ---- months, not days ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>How it is arranged</span>
                  <span data-ur className="urdu">بندوبست کیسے ہوتا ہے</span>
                </span>
                <h2>
                  <span data-en>Arranged in months, not days</span>
                  <span data-ur className="urdu">مہینوں کے حساب سے، دنوں کے نہیں</span>
                </h2>
                <p>
                  <span data-en>
                    Start with the hours your family actually cannot cover &mdash; for most long-term
                    households that is the nights &mdash; and change the plan as the months go.
                  </span>
                  <span data-ur className="urdu">
                    وہاں سے شروع کریں جہاں گھر والے واقعی نہیں سنبھال پا رہے — لمبی بیماری میں اکثر یہ
                    راتیں ہوتی ہیں — اور مہینوں کے ساتھ منصوبہ بدلتے رہیں۔
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

              {/* The two-caregivers truth, stated plainly. Owner-confirmed 2026-08-21. */}
              <div style={{ ...CARD, marginTop: 18, paddingLeft: 30, position: "relative", overflow: "hidden" }}>
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                />
                <h3 style={{ fontSize: 21, marginBottom: 10, lineHeight: 1.3 }}>
                  <span data-en>A permanent attendant in Lahore means two people, not one</span>
                  <span data-ur className="urdu">لاہور میں مستقل اٹینڈنٹ کا مطلب دو افراد ہیں، ایک نہیں</span>
                </h3>
                <p style={{ ...BODY, fontSize: 18 }}>
                  <span data-en>
                    Round-the-clock cover is two caregivers across two 12-hour shifts &mdash; one for
                    the day, one for the night. It is never one person kept awake for 24 hours. Over
                    a long illness that difference decides everything: a caregiver who has not slept
                    stops turning a patient at three in the morning. If an agency quotes you one
                    attendant for 24 hours a day, ask them when that person sleeps.
                  </span>
                  <span data-ur className="urdu">
                    چوبیس گھنٹے کی دیکھ بھال کا مطلب ہے دو کیئر گیور، دو بارہ گھنٹے کی شفٹوں میں — ایک
                    دن کے لیے، ایک رات کے لیے۔ یہ کبھی ایک ہی شخص کو 24 گھنٹے جگا کر نہیں ہوتی۔ لمبی
                    بیماری میں یہی فرق سب کچھ طے کرتا ہے: جو کیئر گیور سویا ہی نہ ہو، وہ رات تین بجے
                    مریض کی کروٹ بدلوانا چھوڑ دیتا ہے۔ کوئی ایجنسی آپ کو ایک ہی اٹینڈنٹ 24 گھنٹے کے
                    لیے دے رہی ہو تو پوچھیے کہ وہ سوتا کب ہے۔
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginTop: 16 }}>
                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                    <span data-en>The same caregiver, wherever we can</span>
                    <span data-ur className="urdu">جہاں ممکن ہو، وہی کیئر گیور</span>
                  </h3>
                  <p style={BODY}>
                    <span data-en>
                      If a caregiver suits your patient, send us their name on WhatsApp and we will
                      try to send the same person again. We do not promise the same face for every
                      shift of every month &mdash; caregivers take leave and fall ill too.
                    </span>
                    <span data-ur className="urdu">
                      کوئی کیئر گیور آپ کے مریض کے لیے مناسب لگے تو ان کا نام واٹس ایپ کر دیں، ہم کوشش
                      کریں گے کہ وہی فرد دوبارہ بھیجیں۔ ہر مہینے کی ہر شفٹ میں وہی چہرہ ہوگا، یہ وعدہ
                      ہم نہیں کرتے — کیئر گیور بھی چھٹی لیتے ہیں اور بیمار ہوتے ہیں۔
                    </span>
                  </p>
                </div>

                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                    <span data-en>When the needs change</span>
                    <span data-ur className="urdu">جب ضرورت بدل جائے</span>
                  </h3>
                  <p style={BODY}>
                    <span data-en>
                      Someone who walked in March may not walk in August. Tell us and we change the
                      arrangement &mdash; add a night shift, move from an attendant to a nurse, or
                      keep the attendant and bring a nurse in for one visit when there is a clinical
                      task.
                    </span>
                    <span data-ur className="urdu">
                      جو مریض مارچ میں چل رہا تھا، ہو سکتا ہے اگست میں نہ چل سکے۔ ہمیں بتا دیں، ہم
                      بندوبست بدل دیں گے — رات کی شفٹ بڑھا دیں، اٹینڈنٹ سے نرس پر لے آئیں، یا اٹینڈنٹ
                      برقرار رکھ کر کسی طبی کام کے لیے نرس کا ایک وزٹ رکھ دیں۔
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---- bedridden and palliative ---- */}
          <section
            className="block"
            style={{
              paddingTop: 0,
            }}
          >
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>The hardest part, said plainly</span>
                  <span data-ur className="urdu">سب سے مشکل حصہ، صاف الفاظ میں</span>
                </span>
                <h2>
                  <span data-en>Bedridden and palliative patients</span>
                  <span data-ur className="urdu">بستر پر پڑے اور آرام دہ نگہداشت کے مریض</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                    <span data-en>A patient who cannot get out of bed</span>
                    <span data-ur className="urdu">وہ مریض جو بستر سے اٹھ نہیں سکتا</span>
                  </h3>
                  <p style={BODY}>
                    <span data-en>
                      Here the work is physical and constant. Turning and repositioning through the
                      shift. Bathing and changing in bed. Feeding, slowly, at the patient&rsquo;s
                      pace. Keeping skin clean and dry, and telling you plainly what they see when
                      they look at it. There is no delicate way to describe this work and no reason
                      to look for one: it is ordinary caregiving, an attendant has done it many times
                      before, and it is done without taking a person&rsquo;s dignity from them. If
                      there is a wound to dress or a medicine to inject, that part is a
                      nurse&rsquo;s.
                    </span>
                    <span data-ur className="urdu">
                      یہاں کام جسمانی بھی ہے اور مسلسل بھی۔ پوری شفٹ کروٹ اور پوزیشن بدلوانا۔ بستر پر
                      ہی نہلانا اور کپڑے بدلوانا۔ آہستہ آہستہ، مریض کی رفتار سے کھانا کھلانا۔ جلد کو
                      صاف اور خشک رکھنا، اور جو نظر آئے وہ آپ کو صاف بتا دینا۔ اس کام کو نرم الفاظ میں
                      کہنے کی نہ کوئی صورت ہے نہ ضرورت: یہ عام دیکھ بھال ہے، اٹینڈنٹ یہ پہلے بھی کئی
                      بار کر چکا ہوتا ہے، اور یہ سب کرتے ہوئے مریض کی عزت برقرار رہتی ہے۔ اگر زخم کی
                      ڈریسنگ یا انجیکشن ہو تو وہ نرس کا کام ہے۔
                    </span>
                  </p>
                </div>

                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                    <span data-en>Palliative care at home</span>
                    <span data-ur className="urdu">گھر پر آرام دہ نگہداشت</span>
                  </h3>
                  <p style={BODY}>
                    <span data-en>
                      Some families call when there is no more treatment to give, and the only
                      question left is how the days at home are spent. What we arrange is caregiving:
                      someone to keep your patient clean, fed, turned and not alone, hour by hour,
                      and to carry a shift of that weight so the family is not carrying all of it.
                      What we do not do is treat. Medicines, decisions and instructions stay with
                      your doctor; a Qualified Nurse carries out what the doctor has written down.
                      Call and tell us the situation &mdash; we will say plainly what we can arrange
                      and what we cannot.
                    </span>
                    <span data-ur className="urdu">
                      کچھ گھرانے تب کال کرتے ہیں جب علاج کے لیے کچھ باقی نہیں رہتا، اور سوال صرف یہ رہ
                      جاتا ہے کہ گھر پر دن کیسے گزریں۔ ہم جو بندوبست کرتے ہیں وہ دیکھ بھال ہے: کوئی جو
                      مریض کو صاف رکھے، کھانا کھلائے، کروٹ بدلواتا رہے، اور اسے اکیلا نہ چھوڑے — اور
                      ایک شفٹ کا بوجھ اٹھا لے تاکہ سارا بوجھ گھر والوں پر نہ رہے۔ ہم علاج نہیں کرتے۔
                      دوائیں، فیصلے اور ہدایات آپ کے ڈاکٹر کے پاس رہتی ہیں؛ PNC رجسٹرڈ نرس وہی کرتی ہے
                      جو ڈاکٹر نے لکھا ہو۔ کال کر کے حالات بتا دیں — ہم صاف بتا دیں گے کہ کیا ہم کر
                      سکتے ہیں اور کیا نہیں۔
                    </span>
                  </p>
                </div>
              </div>

              {/* Honesty note. ICU step-down is the ceiling (Ledger #16): what we
                  do not arrange is not implied away, it is routed to the call. */}
              <div style={{ ...CARD, marginTop: 16, background: "var(--mist)" }}>
                <p style={{ ...BODY, fontSize: 16.5, fontWeight: 600 }}>
                  <span data-en>
                    <b style={{ color: "var(--ink)" }}>What we do not arrange, we say on the call.</b>{" "}
                    We care for patients who have come home after a stay in ICU or HDU. If your
                    patient has come home needing machine support, tell us on the first call: there
                    are things we do not do, and you will hear that from us before anyone is sent,
                    not afterwards.
                  </span>
                  <span data-ur className="urdu">
                    <b style={{ color: "var(--ink)" }}>جو ہم نہیں کر سکتے، وہ کال پر بتا دیتے ہیں۔</b>{" "}
                    آئی سی یو یا ایچ ڈی یو سے گھر آنے والے مریض کی دیکھ بھال ہم کرتے ہیں۔ اگر مریض گھر
                    پر مشین کے سہارے کے ساتھ آیا ہے تو پہلی کال پر بتا دیں: کچھ کام ہم نہیں کرتے، اور
                    یہ آپ کو کسی کے آنے سے پہلے بتا دیا جائے گا، بعد میں نہیں۔
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
                  <span data-en>Who is in your house every day</span>
                  <span data-ur className="urdu">روزانہ آپ کے گھر میں کون ہوتا ہے</span>
                </span>
                <h2>
                  <span data-en>You know who is coming before they arrive.</span>
                  <span data-ur className="urdu">آنے سے پہلے آپ کو معلوم ہوتا ہے کہ کون آ رہا ہے۔</span>
                </h2>
                <p>
                  <span data-en>
                    Over months, a caregiver becomes part of the household. So nothing about that
                    person is a surprise on the first day, or on the hundredth.
                  </span>
                  <span data-ur className="urdu">
                    مہینوں میں کیئر گیور گھر کا حصہ بن جاتا ہے۔ اسی لیے اُس فرد کے بارے میں پہلے دن بھی
                    کچھ اچانک سامنے نہیں آتا، اور سویں دن بھی نہیں۔
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
                  <span data-ur className="urdu">{VERIFICATION_PROMISE.ur}</span>
                </p>
              </div>

              {/* The promises, verbatim from lib/constants.ts (NORTH-STAR §3). */}
              <div style={{ ...CARD, marginTop: 16 }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                  <span data-en>What we promise before you decide</span>
                  <span data-ur className="urdu">فیصلہ کرنے سے پہلے ہمارا وعدہ</span>
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
          <section className="block faq" id="long-term-care-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>What long-term families ask us</span>
                  <span data-ur className="urdu">لمبی بیماری والے گھرانے کیا پوچھتے ہیں</span>
                </span>
                <h2>
                  <span data-en>Straight answers.</span>
                  <span data-ur className="urdu">سیدھے جواب۔</span>
                </h2>
              </div>

              <div className="faq-list">
                {LTC_FAQ.map((item) => (
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
                <CallButton />
                <WhatsAppButton />
                <Link className="btn btn-ghost" href="/book">
                  <span data-en>Ask us to call you back</span>
                  <span data-ur className="urdu">ہم سے کال منگوائیں</span>
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
