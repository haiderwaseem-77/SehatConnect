// /areas/gulberg — the "home nurse in Gulberg Lahore" local landing page.
//
// THE ANTI-DOORWAY RULE (keyword-map rule 5): this page earns its place only by
// saying things true of Gulberg and nowhere else. Its anchor is the `distinct`
// note in lib/areas.ts — dense, older, well served by private hospitals, and
// full of families arranging care for a parent who has lived in the same house
// for decades. That is why this page is about long-running, night-heavy,
// continuity-of-caregiver work, while /areas/dha is about being next door to our
// office and /areas/johar-town is about the days straight after a discharge.
// If a paragraph here would read correctly with another area's name pasted in,
// it does not belong.
//
// HARD CONSTRAINTS held here:
//   1. NO PRICE anywhere — copy, meta or JSON-LD (Decision Ledger #9). The
//      do-not-render pricing constant in lib/constants.ts is NOT imported.
//   2. HOSPITALS: named once, in body copy only, as a factual statement about
//      where our patients have come from, with an explicit "no affiliation"
//      line and "hospitals across Lahore" so the list reads as illustrative.
//      Never in the title, the meta description or the H1. Only the names in
//      lib/areas.ts.
//   3. NO INVENTED LOCAL DETAIL: no travel time, no response time, no caregiver
//      count, no families-served count, no review. The distance from our office
//      is stated as a fact and deliberately left un-numbered.
//   4. Promise strings imported VERBATIM from lib/constants.ts (NORTH-STAR §3).
//   5. Every user-facing English string carries an Urdu counterpart (§5).
//   6. No physiotherapy framing (#15), no ventilator/tracheostomy (#16), and no
//      clinical outcome claims — helping a parent move about the house is
//      described as caregiving, never as therapy or recovery.
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
const AREA = areaBySlug("gulberg")!;
const [HOSPITAL_A, HOSPITAL_B, HOSPITAL_C] = AREA.hospitals;

export const metadata: Metadata = {
  title: "Home Nurse in Gulberg, Lahore | Day & Night",
  description:
    "Nurses and attendants at home in Gulberg, Lahore: night shifts so the family can sleep, and daily care for an elderly parent. Same caregiver on request.",
  alternates: { canonical: `${SITE_URL}/areas/${AREA.slug}` },
};

const WA_MSG = serviceWaMsg("Gulberg mein ghar par nurse ya attendant");

type Bilingual = { en: string; ur: string };

/* ------------------------------------------------------------------ *
 * What Gulberg families ask for. Derived from the `distinct` note: a
 * parent in the family home of thirty or forty years. That makes the work
 * here long-running and night-heavy, and makes continuity of caregiver
 * matter more than speed. No volume claims — these are requests, not stats.
 * ------------------------------------------------------------------ */
const ASKS: { title: Bilingual; body: Bilingual }[] = [
  {
    title: { en: "The nights, so the house can sleep", ur: "راتیں، تاکہ گھر سو سکے" },
    body: {
      en: "An attendant from 8:00 PM to 8:00 AM, sitting up with a parent who wakes, needs the bathroom, or should not be left alone until morning.",
      ur: "رات 8 بجے سے صبح 8 بجے تک اٹینڈنٹ — ایسے والد یا والدہ کے پاس جو رات میں جاگ جاتے ہیں، باتھ روم جاتے ہیں، یا صبح تک اکیلے نہیں چھوڑے جا سکتے۔",
    },
  },
  {
    title: { en: "Care measured in months, not days", ur: "دنوں کی نہیں، مہینوں کی دیکھ بھال" },
    body: {
      en: "Feeding, washing, dressing, medicines on time, and a hand when a parent wants to move about a house they know far better than we do. Not a hospital routine dropped into a home — a household that already has its own way of doing things, with one more person helping.",
      ur: "کھانا، صفائی، کپڑے، دواؤں کا وقت، اور اُس گھر میں چلنے پھرنے کے لیے سہارا جسے وہ ہم سے کہیں بہتر جانتے ہیں۔ ہسپتال کا معمول گھر میں لا کر رکھ دینا نہیں — بلکہ ایک ایسا گھر جس کا اپنا طریقہ پہلے سے موجود ہے، بس ایک فرد اور مدد کے لیے آ جاتا ہے۔",
    },
  },
  {
    title: { en: "The same face, not a new stranger", ur: "وہی چہرہ، ہر بار نیا اجنبی نہیں" },
    body: {
      en: "Someone who has kept the same house for decades rarely wants a different person in it every week. If a caregiver suits your parent, send us their name on WhatsApp and we try to send the same person again. Female for a female patient whenever you ask.",
      ur: "جس نے دہائیوں ایک ہی گھر سنبھالا ہو، وہ عموماً ہر ہفتے نیا فرد گھر میں نہیں چاہتا۔ اگر کوئی نرس یا اٹینڈنٹ آپ کے والدین کو موافق آئے تو ان کا نام واٹس ایپ پر بھیج دیں، ہم وہی فرد دوبارہ بھیجنے کی کوشش کرتے ہیں۔ خاتون مریضہ کے لیے خاتون نرس یا اٹینڈنٹ، جب بھی کہیں۔",
    },
  },
];

/* ------------------------------------------------------------------ *
 * Who comes into your home — site-wide facts, weighted here toward the
 * things a months-long arrangement depends on, with one Gulberg-only line.
 * ------------------------------------------------------------------ */
const WHO_COMES: Bilingual[] = [
  VERIFICATION_PROMISE,
  {
    en: "For a Qualified Nurse, a PNC registration number our team has checked",
    ur: "نرس کی صورت میں PNC رجسٹریشن نمبر، جو ہماری ٹیم خود چیک کرتی ہے",
  },
  {
    en: "Their card on WhatsApp before the first visit — photo, name, and PNC number for nurses",
    ur: "پہلی بار آنے سے پہلے واٹس ایپ پر کارڈ: تصویر، نام، اور نرس کے لیے PNC نمبر",
  },
  {
    en: "The same caregiver again on request — send us the name and we try to send that person",
    ur: "درخواست پر وہی فرد دوبارہ — نام بھیج دیں، ہم اُسی کو بھیجنے کی کوشش کرتے ہیں",
  },
  {
    en: "No charge to cancel or move a shift, if you tell us up to 4 hours before it starts",
    ur: "شفٹ شروع ہونے سے 4 گھنٹے پہلے بتا دیں تو منسوخی یا وقت بدلنے کا کوئی چارج نہیں",
  },
  {
    en: "We ask for a landmark as well as the address — we come from the other side of the city",
    ur: "ہم پتے کے ساتھ ساتھ گھر کے قریب کوئی نشانی بھی پوچھتے ہیں — ہم شہر کی دوسری طرف سے آ رہے ہوتے ہیں",
  },
];

/* ------------------------------------------------------------------ *
 * FAQ — mirrored byte-for-byte into the FAQPage JSON-LD. One question is
 * Gulberg-only (coverage across the city from our office), one carries
 * natural Roman Urdu. No hospital name appears in this FAQ.
 * ------------------------------------------------------------------ */
const AREA_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "Do you come to all of Gulberg?",
    qUr: "کیا آپ پورے گلبرگ میں آتے ہیں؟",
    a: "Yes, all of it. Our office is in DHA Phase 8, on the other side of the city, so we plan around that distance: the arrival time is agreed with you on the call, we ask for a landmark as well as the address, and you get a message when your caregiver is on the way.",
    aUr: "جی، پورے گلبرگ میں۔ ہمارا دفتر ڈی ایچ اے فیز 8 میں ہے، یعنی شہر کی دوسری طرف، اس لیے ہم اس فاصلے کو نظرانداز کرنے کے بجائے اُسی حساب سے بندوبست کرتے ہیں: آنے کا وقت کال پر طے ہوتا ہے، ہم پتے کے ساتھ قریبی نشانی بھی پوچھتے ہیں، اور جب نرس یا اٹینڈنٹ راستے میں ہو تو آپ کو اطلاع دیتے ہیں۔",
  },
  {
    q: "Raat ko koi ruk sakta hai? Can someone stay only at night?",
    qUr: "کیا رات کو کوئی رُک سکتا ہے؟ صرف رات کے لیے؟",
    a: "Yes. A night shift is 12 hours, 8:00 PM to 8:00 AM, with one caregiver at home for the whole shift. You can take only the nights and keep the days as they are. If you need cover around the clock, that is two caregivers across two 12-hour shifts — never one person awake for 24 hours.",
    aUr: "جی ہاں۔ رات کی شفٹ 12 گھنٹے کی ہوتی ہے، رات 8 بجے سے صبح 8 بجے تک، اور پوری شفٹ ایک فرد گھر پر رہتا ہے۔ آپ صرف راتیں لے سکتے ہیں اور دن ویسے کے ویسے رکھ سکتے ہیں۔ اگر چوبیس گھنٹے چاہیے تو وہ دو افراد کی دو بارہ گھنٹے کی شفٹیں ہوتی ہیں — ایک ہی شخص 24 گھنٹے نہیں۔",
  },
  {
    q: "My mother will not accept a stranger in her house. What if it does not work?",
    qUr: "امی گھر میں کسی اجنبی کو قبول نہیں کریں گی۔ اگر بات نہ بنی تو؟",
    a: "Then you have lost nothing. Your first day is free — no cost, no obligation. Continue only if you're happy. And if the person is not right for your mother, tell us: we replace the caregiver, free, until you're fully satisfied.",
    aUr: "تو آپ کا کوئی نقصان نہیں۔ پہلا دن مفت ہے؛ پسند آئے تو ہی آگے جاری رکھیں۔ اور اگر فرد آپ کی والدہ کے لیے مناسب نہ ہو تو بتا دیں: ہم نرس یا اٹینڈنٹ مفت بدلتے رہیں گے، جب تک آپ مطمئن نہ ہوں۔",
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD — one business identity, built from lib/schema.ts, with
 * areaServed narrowed to Gulberg inside Lahore. No price of any kind.
 * ------------------------------------------------------------------ */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Sehat Connect",
  description:
    "Nurses and attendants at home in Gulberg, Lahore. Night shifts, long-running daily care for elderly parents at home, single nurse visits, and round-the-clock cover as two caregivers across two shifts.",
  url: `${SITE_URL}/areas/${AREA.slug}`,
  telephone: CONTACT_PHONE_TEL,
  email: CONTACT_EMAIL,
  address: OFFICE_POSTAL_ADDRESS,
  areaServed: {
    "@type": "Place",
    name: "Gulberg, Lahore",
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
            <span data-ur lang="ur" dir="rtl" className="urdu">{item.ur}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default function GulbergAreaPage() {
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
                    <span data-en>Gulberg, Lahore &middot; care for a parent at home</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">گلبرگ، لاہور &middot; گھر پر والدین کی دیکھ بھال</span>
                  </span>

                  <h1>
                    <span data-en>
                      Nurse &amp; attendant at home in <span className="hl">{AREA.name.en}</span>, Lahore
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      لاہور کے <span className="hl">{AREA.name.ur}</span> میں گھر پر نرس اور اٹینڈنٹ
                    </span>
                  </h1>

                  <p className="hero-sub">
                    <span data-en>
                      Most calls from Gulberg are not emergencies. They are about a parent who has
                      lived in the same house for thirty or forty years, is not going to move out of
                      it, and now needs someone through the day or through the night. The care
                      families here ask for is long-running.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      گلبرگ سے آنے والی زیادہ تر کالیں ایمرجنسی نہیں ہوتیں۔ وہ ایسے والد یا والدہ کے
                      بارے میں ہوتی ہیں جو تیس چالیس سال سے ایک ہی گھر میں رہ رہے ہیں، وہ گھر چھوڑنے
                      والے نہیں، اور اب انہیں دن یا رات کسی کے ساتھ کی ضرورت ہے۔ یہاں کے گھرانے جو
                      دیکھ بھال مانگتے ہیں وہ لمبے عرصے کی ہوتی ہے۔
                    </span>
                  </p>

                  <div className="hero-trust">
                    <span className="pill">
                      <span data-en>Night shifts, 8:00 PM to 8:00 AM</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">رات کی شفٹ، 8 بجے سے صبح 8 بجے</span>
                    </span>
                    <span className="pill">
                      <span data-en>Same caregiver on request</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">درخواست پر وہی فرد</span>
                    </span>
                    <span className="pill">
                      <span data-en>{PROMISES.trial.enShort}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{PROMISES.trial.urShort}</span>
                    </span>
                    <span className="pill">
                      <span data-en>No advance</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">کوئی پیشگی نہیں</span>
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
                      <span data-en>WhatsApp us</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">واٹس ایپ کریں</span>
                    </a>
                  </div>
                </div>

                <div className="hero-form">
                  <LeadFormD6 variant="hero" area={AREA.name.en} />
                </div>
              </div>
            </div>
          </section>

          {/* ---- what Gulberg families ask for ---- */}
          <section className="block" style={{ paddingTop: 34 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>What families here ask us for</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">یہاں کے گھرانے کیا مانگتے ہیں</span>
                </span>
                <h2>
                  <span data-en>Care that has to last, in a house nobody is leaving.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ایسی دیکھ بھال جو چلتی رہے، اُس گھر میں جسے کوئی نہیں چھوڑ رہا۔</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ASKS.map((a) => (
                  <div key={a.title.en} style={CARD}>
                    <h3 style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.25 }}>
                      <span data-en>{a.title.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{a.title.ur}</span>
                    </h3>
                    <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.62, fontWeight: 500 }}>
                      <span data-en>{a.body.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{a.body.ur}</span>
                    </p>
                  </div>
                ))}
              </div>
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
                  <span data-en>Well served by hospitals &mdash; and a long way from our office</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ہسپتال قریب &mdash; اور ہمارا دفتر خاصا دور</span>
                </h2>
              </div>

              <div style={{ ...CARD, paddingLeft: 30, position: "relative", overflow: "hidden" }}>
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                />
                <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                  <span data-en>
                    Gulberg is unusually well served by private hospitals, and families here often
                    call us after a stay at {HOSPITAL_A}, {HOSPITAL_B} or {HOSPITAL_C} &mdash; and
                    after stays at hospitals across Lahore. None of them are partners of ours: we are
                    not affiliated with, referred by, or connected to any hospital. What we do at home
                    follows what the patient&rsquo;s own doctor has prescribed.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    گلبرگ میں نجی ہسپتال خاصے قریب ہیں، اور یہاں کے گھرانے اکثر {HOSPITAL_A}، {HOSPITAL_B}
                    یا {HOSPITAL_C} میں داخل رہنے کے بعد &mdash; اور لاہور بھر کے دوسرے ہسپتالوں کے بعد
                    بھی &mdash; ہمیں کال کرتے ہیں۔ ان میں سے کوئی ہمارا پارٹنر نہیں: کسی ہسپتال سے ہمارا
                    کوئی تعلق یا معاہدہ نہیں اور نہ کوئی ہمیں مریض بھیجتا ہے۔ گھر پر ہم وہی کرتے ہیں جو
                    مریض کے اپنے ڈاکٹر نے لکھا ہو۔
                  </span>
                </p>
                <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500, marginTop: 16 }}>
                  <span data-en>
                    Our office is at {OFFICE_ADDRESS}, on the eastern side of the city. Gulberg is a
                    proper trip from there, so we work around it: the arrival time is agreed on
                    the call, we ask for a landmark near the house as well as the address, and you
                    hear from us when your caregiver is on the way.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    ہمارا دفتر {OFFICE_ADDRESS} میں ہے، یعنی شہر کی مشرقی طرف۔ وہاں سے گلبرگ باقاعدہ ایک
                    سفر ہے، اس لیے ہم اسی کے حساب سے بندوبست کرتے ہیں: آنے کا وقت کال پر طے ہوتا ہے، پتے
                    کے ساتھ قریبی نشانی پوچھ لیتے ہیں، اور جب نرس یا اٹینڈنٹ راستے میں ہو تو آپ کو اطلاع
                    دیتے ہیں۔
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
                  <span data-ur lang="ur" dir="rtl" className="urdu">آپ کے گھر کون آتا ہے</span>
                </span>
                <h2>
                  <span data-en>Someone your parent can get used to.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ایسا فرد جس کی آپ کے والدین کو عادت ہو سکے۔</span>
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
                  <span data-ur lang="ur" dir="rtl" className="urdu">{PROMISES.replacement.ur}</span>
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
                  <span data-ur lang="ur" dir="rtl" className="urdu">دیکھ بھال کیسے ترتیب پاتی ہے</span>
                </span>
                <h2>
                  <span data-en>Take the nights, the days, or both.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">راتیں لیں، دن لیں، یا دونوں۔</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CARE_FORMATS.map((f) => (
                  <div key={f.id} style={CARD}>
                    <h3 style={{ fontSize: 20, marginBottom: 8 }}>
                      <span data-en>{f.name.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{f.name.ur}</span>
                    </h3>
                    <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.62, fontWeight: 500 }}>
                      <span data-en>{f.detail.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{f.detail.ur}</span>
                    </p>
                  </div>
                ))}
              </div>

              <p className="svc-foot" style={{ marginTop: 18 }}>
                <span data-en>{PROMISES.payment.en} {START_PROMISE.en} {CALLBACK_PROMISE.en}</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">{PROMISES.payment.ur} {START_PROMISE.ur} {CALLBACK_PROMISE.ur}</span>
              </p>
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="gulberg-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Questions we get from Gulberg</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">گلبرگ سے آنے والے سوالات</span>
                </span>
                <h2>
                  <span data-en>Straight answers.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">سیدھے جواب۔</span>
                </h2>
              </div>

              <div className="faq-list">
                {AREA_FAQ.map((item) => (
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
            </div>
          </section>

          {/* ---- cross-links ---- */}
          <section className="block" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head" style={{ marginBottom: 14 }}>
                <h2 style={{ fontSize: "clamp(20px,4.4vw,26px)" }}>
                  <span data-en>Somewhere else in Lahore?</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">لاہور کے کسی اور علاقے میں؟</span>
                </h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link className="btn btn-ghost" href="/areas/dha">
                  <span data-en>DHA</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ڈی ایچ اے</span>
                </Link>
                <Link className="btn btn-ghost" href="/areas/johar-town">
                  <span data-en>Johar Town</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">جوہر ٹاؤن</span>
                </Link>
                <Link className="btn btn-ghost" href="/areas">
                  <span data-en>All areas we serve</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">تمام علاقے</span>
                </Link>
                <Link className="btn btn-ghost" href="/services/elderly-care">
                  <span data-en>Elderly care at home</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">بزرگوں کی گھر پر دیکھ بھال</span>
                </Link>
                <Link className="btn btn-ghost" href="/charges">
                  <span data-en>How charges work</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">چارجز کیسے طے ہوتے ہیں</span>
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
