// /care-from-abroad — the audience page for the overseas adult child.
//
// ROUTE NOTE: this lives at the ROOT, not under /services. It is not a service —
// it is an audience. The service pages (/services/elderly-care,
// /services/long-term-care) still own what a nurse or attendant actually does;
// this page owns "I am in the UK / USA / UAE / Canada and my parents are in
// Lahore" (docs/keyword-map.md: primary phrase "nurse for parents in Lahore from
// abroad", Roman Urdu "bahar se walidain ki dekh bhaal").
//
// It deliberately does NOT re-run the "from abroad" section of
// /guides/elderly-care-at-home. That section is about the limits of checking on a
// parent from a distance inside a longer guide about living with the arrangement.
// This page is the landing page for the search itself: how it is arranged from
// another country, how payment works from abroad, how to judge what a parent
// needs over the phone, and how to keep siblings from tripping over each other.
// Where the two would overlap, this page links there instead of repeating it.
//
// HARD CONSTRAINTS held here:
//   1. NO PRICE anywhere — copy, meta or JSON-LD (Decision Ledger #9). The
//      do-not-render PRICES constant is deliberately NOT imported. No currency
//      conversion and no "cheaper than the UK" comparison, ever: this audience is
//      not price-shopping and a comparison invites one.
//   2. PAYMENT (owner-confirmed 2026-08-21): payment can be made either in
//      Pakistan or in the United States. That is the WHOLE confirmed fact. No
//      bank, no Wise / Zelle / Remitly / PayPal, no IBAN, no account number, no
//      fee, no currency conversion, no card, no portal, no invoice or receipt
//      promise. The mechanism is settled on the first call. Do not add a rail
//      here without the owner confirming it.
//   3. NO MONITORING IMPLICATION. We send the caregiver card before the visit and
//      a message when the caregiver is on the way. We do NOT provide cameras, GPS
//      tracking, live monitoring or a dashboard — and this page says so plainly,
//      because the honest answer is what earns this reader (NORTH-STAR §4 law 6).
//   4. Promise strings are imported VERBATIM from lib/constants.ts (NORTH-STAR
//      §3). "usually" in the callback promise is mandatory. No callback window is
//      promised for another country beyond that exact sentence.
//   5. Nothing invented: no list of countries we operate in, no client counts, no
//      "hundreds of overseas families", no testimonials, no operating hours
//      beyond the verified 24/7. Country names appear only as the READER's
//      location, never as a claim about our footprint.
//   6. No physiotherapy / rehabilitation / therapy language (Ledger #15); no
//      ventilator or tracheostomy (Ledger #16); no clinical outcome claims.
//   7. Every English user-facing string carries an Urdu counterpart (§5).
//   8. No new CSS — .d6 classes and inline styles only; app/direction6.css untouched.
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
import { waLink } from "@/lib/wa";

const PATH = "/care-from-abroad";

const DESCRIPTION =
  "Arranging a nurse or attendant for your parents in Lahore from abroad. Set up by phone and WhatsApp from the UK, USA, UAE or Canada — verified caregivers, first day free, no advance, pay after the shift.";

export const metadata: Metadata = {
  title: "Nurse for Parents in Lahore, Arranged From Abroad",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

// Roman Urdu prefill written for this reader specifically — they are messaging
// at an odd hour, from another country, about parents they cannot visit.
const WA_MSG =
  "Assalam o Alaikum. Main mulk se bahar hoon aur Lahore mein apne walidain ke liye nurse ya attendant chahta hoon. Bara-e-karam rabta kar lein, shukriya.";

type Bilingual = { en: string; ur: string };

/* ================================================================== *
 * Hero copy
 * ================================================================== */
const HERO_INTRO: Bilingual[] = [
  {
    en: "You are in London, or Dubai, or Toronto, and your mother is in Lahore. A flight this month is not possible, the phone calls are not telling you enough, and you are trying to arrange a nurse for parents in Lahore from abroad without being able to look anyone in the eye first. It is a hard position, and it is not something you have failed at.",
    ur: "آپ لندن، دبئی یا ٹورنٹو میں ہیں، اور آپ کی والدہ لاہور میں ہیں۔ اس مہینے آنا ممکن نہیں، فون پر بات سے پوری بات معلوم نہیں ہوتی، اور آپ لاہور میں والدین کے لیے نرس کا بندوبست کرنے کی کوشش کر رہے ہیں — بغیر کسی کو خود سامنے دیکھے۔ یہ آسان صورتحال نہیں، اور اس میں آپ کی کوئی کوتاہی نہیں۔",
  },
  {
    en: "All of it is arranged by phone and on WhatsApp. You do not have to be in Pakistan, and a relative in Lahore does not have to be the one who calls us.",
    ur: "یہ سارا بندوبست فون اور واٹس ایپ پر ہو جاتا ہے۔ آپ کا پاکستان میں ہونا ضروری نہیں، اور یہ بھی ضروری نہیں کہ لاہور والا رشتہ دار ہی ہمیں کال کرے۔",
  },
];

const HERO_PILLS: Bilingual[] = [
  { en: PROMISES.trial.enShort, ur: PROMISES.trial.urShort },
  { en: "No advance", ur: "کوئی پیشگی نہیں" },
  { en: "Pay after the shift", ur: "شفٹ کے بعد ادائیگی" },
  { en: "WhatsApp from any country", ur: "کسی بھی ملک سے واٹس ایپ" },
  { en: "Exact price on the first call", ur: "صحیح قیمت پہلی کال پر" },
];

const DIAL_NOTE: Bilingual = {
  en: "The number is Pakistani. From outside Pakistan, dial it with the country code. Our team answers it 24/7, and WhatsApp reaches the same team.",
  ur: "یہ نمبر پاکستانی ہے۔ ملک سے باہر سے کال کریں تو کنٹری کوڈ کے ساتھ ملائیں۔ ہماری ٹیم یہ نمبر چوبیس گھنٹے اٹھاتی ہے، اور واٹس ایپ بھی اسی ٹیم تک پہنچتا ہے۔",
};

/* ================================================================== *
 * 1. How it works from abroad
 * ================================================================== */
const ABROAD_STEPS: { title: Bilingual; body: Bilingual }[] = [
  {
    title: {
      en: "You call or message us, from wherever you are",
      ur: "آپ جہاں بھی ہیں، وہیں سے کال یا پیغام کریں",
    },
    body: {
      en: "Call with the country code, send a WhatsApp, or leave your name and number here. Tell us which country you are in.",
      ur: "کنٹری کوڈ کے ساتھ کال کریں، واٹس ایپ بھیجیں، یا یہاں اپنا نام اور نمبر چھوڑ دیں۔ بتا دیں کہ آپ کس ملک میں ہیں۔",
    },
  },
  {
    title: {
      en: "A real person calls you back, at a time that works where you are",
      ur: "ایک اصل انسان آپ کو واپس کال کرتا ہے، آپ کے وقت کے مطابق",
    },
    body: {
      en: "Tell us the hours you can talk and we will call in them, not in the middle of your working day.",
      ur: "ہمیں بتا دیں کہ آپ کن اوقات میں بات کر سکتے ہیں، ہم اسی وقت کال کریں گے — کام کے دن کے بیچ میں نہیں۔",
    },
  },
  {
    title: {
      en: "We ask what is happening at home, and quote the price on that call",
      ur: "ہم پوچھتے ہیں کہ گھر میں کیا صورتحال ہے، اور اسی کال پر قیمت بتا دیتے ہیں",
    },
    body: {
      en: "Who the patient is, what they are struggling with, whether a nurse or an attendant fits, and which shift — then one exact price, before anybody goes to the house.",
      ur: "مریض کون ہے، کس چیز میں دشواری ہے، نرس مناسب ہے یا اٹینڈنٹ، اور کون سی شفٹ — پھر ایک صحیح قیمت، کسی کے گھر جانے سے پہلے۔",
    },
  },
  {
    title: {
      en: "You see who is coming before they arrive",
      ur: "آنے والا کون ہے، یہ آپ کو پہلے معلوم ہو جاتا ہے",
    },
    body: {
      en: "The caregiver card reaches you on WhatsApp before the visit: photo, name, and for a Qualified Nurse the PNC registration number our team has checked. We message you again when they are on the way.",
      ur: "آنے سے پہلے واٹس ایپ پر کیئر گیور کا کارڈ آ جاتا ہے: تصویر، نام، اور نرس کی صورت میں PNC رجسٹریشن نمبر جو ہماری ٹیم خود چیک کرتی ہے۔ جب وہ راستے میں ہوں تو ہم دوبارہ اطلاع دیتے ہیں۔",
    },
  },
  {
    title: {
      en: "Care starts, and you have not paid anything yet",
      ur: "دیکھ بھال شروع ہو جاتی ہے، اور اب تک آپ نے کچھ ادا نہیں کیا",
    },
    body: {
      en: "Care can start within 24 hours of your call. Your first day is free, and you pay after the shift, never before it.",
      ur: "دیکھ بھال آپ کی کال کے 24 گھنٹوں کے اندر شروع ہو سکتی ہے۔ پہلا دن مفت ہے، اور ادائیگی شفٹ کے بعد ہوتی ہے، اس سے پہلے کبھی نہیں۔",
    },
  },
];

/* ================================================================== *
 * 2. What you can verify, and what does not exist
 *
 * The whole page rests on this section being honest. The three things in
 * WHAT_REACHES_YOU are artifacts this business already produces. The
 * WHAT_WE_DO_NOT list exists because the reader has been sold "live tracking"
 * by somebody else, and the only durable answer is to say plainly that we do
 * not have it (NORTH-STAR §4 law 6). The deeper version of this thinking lives
 * in /guides/elderly-care-at-home, which this section links to rather than
 * repeating.
 * ================================================================== */
const WHAT_REACHES_YOU: Bilingual[] = [
  {
    en: "The caregiver card on WhatsApp before the visit — photo, name, and the checked PNC registration number for a nurse. You know the face before it is at the door.",
    ur: "آنے سے پہلے واٹس ایپ پر کیئر گیور کا کارڈ — تصویر، نام، اور نرس کی صورت میں چیک شدہ PNC رجسٹریشن نمبر۔ چہرہ آپ کو دروازے پر پہنچنے سے پہلے معلوم ہو جاتا ہے۔",
  },
  {
    en: VERIFICATION_PROMISE.en,
    ur: VERIFICATION_PROMISE.ur,
  },
  {
    en: "A message from us when the caregiver is on the way.",
    ur: "جب کیئر گیور راستے میں ہو تو ہماری طرف سے پیغام۔",
  },
  {
    en: "A person on the other end at any hour, from any country.",
    ur: "کسی بھی وقت، کسی بھی ملک سے، دوسری طرف ایک انسان۔",
  },
];

const WHAT_WE_DO_NOT: Bilingual[] = [
  {
    en: "No cameras. We do not install one in your parents house.",
    ur: "کوئی کیمرہ نہیں۔ ہم آپ کے والدین کے گھر میں کیمرہ نہیں لگاتے۔",
  },
  {
    en: "No GPS tracking, no live location, no app with a moving dot on it.",
    ur: "نہ جی پی ایس ٹریکنگ، نہ لائیو لوکیشن، نہ کوئی ایپ جس پر نقطہ چلتا دکھائی دے۔",
  },
  {
    en: "No live monitoring of the room. Nothing on a screen tells you how the afternoon went.",
    ur: "کمرے کی کوئی براہِ راست نگرانی نہیں۔ کسی اسکرین سے یہ معلوم نہیں ہوتا کہ دوپہر کیسی گزری۔",
  },
  {
    en: "The most reliable check is the oldest one: ask your parent directly, on a video call, when the caregiver is not standing beside them.",
    ur: "سب سے بھروسے کی جانچ وہی پرانی ہے: والد یا والدہ سے براہِ راست ویڈیو کال پر پوچھیں، جب کیئر گیور ساتھ کھڑا نہ ہو۔",
  },
];

/* ================================================================== *
 * 3. Paying from abroad
 *
 * Owner-confirmed 2026-08-21 and nothing beyond it. See the header note.
 * ================================================================== */
const PAY_INTRO: Bilingual[] = [
  {
    en: "Payment can be made either in Pakistan or in the United States. Some families have somebody in Lahore pay after the shift; others pay from the US side. Which of the two suits you is settled on the first call, before care starts.",
    ur: "ادائیگی پاکستان میں بھی ہو سکتی ہے اور امریکہ میں بھی۔ کچھ گھرانوں میں لاہور میں موجود کوئی فرد شفٹ کے بعد ادائیگی کر دیتا ہے؛ کچھ امریکہ کی طرف سے کرتے ہیں۔ ان دونوں میں سے کون سا طریقہ آپ کے لیے مناسب ہے، یہ پہلی کال پر، کام شروع ہونے سے پہلے طے ہو جاتا ہے۔",
  },
];

const PAY_POINTS: Bilingual[] = [
  PROMISES.payment,
  PROMISES.trial,
  PROMISES.priceOnCall,
  PROMISES.replacement,
  {
    en: "No registration fee and no booking fee.",
    ur: "نہ رجسٹریشن فیس، نہ بکنگ فیس۔",
  },
];

const PAY_OUTRO: Bilingual[] = [
  {
    en: "Paying nothing until after the shift matters more from four thousand miles away than it does from across town.",
    ur: "شفٹ سے پہلے کچھ ادا نہ کرنا، ہزاروں میل دور بیٹھے فرد کے لیے شہر کے اندر بیٹھے فرد سے کہیں زیادہ اہمیت رکھتا ہے۔",
  },
];

/* ================================================================== *
 * 4. Deciding what your parent needs from a distance
 * ================================================================== */
const DECIDE_INTRO: Bilingual[] = [
  {
    en: "The hard part of arranging this from abroad is not the arranging. It is that your father will tell you he is fine. He is not being dishonest — he does not want to be a burden to a child who already lives far away.",
    ur: "بیرونِ ملک سے بندوبست کرنے میں مشکل کام بندوبست نہیں۔ مشکل یہ ہے کہ آپ کے والد آپ کو یہی کہیں گے کہ وہ ٹھیک ہیں۔ وہ جھوٹ نہیں بول رہے — وہ اُس اولاد پر بوجھ نہیں بننا چاہتے جو پہلے ہی دور رہتی ہے۔",
  },
  {
    en: "So ask about facts instead of feelings. Has he stopped cooking? Is the medicine box empty on the days it should be? Has anyone heard a fall? Who helped him to the bathroom last week? Those answers travel down a phone line better than the word fine.",
    ur: "اس لیے احساسات کے بجائے حقائق پوچھیں۔ کیا انہوں نے کھانا پکانا چھوڑ دیا ہے؟ کیا دوائی کا ڈبہ اُن دنوں خالی ہوتا ہے جن دنوں ہونا چاہیے؟ کیا کسی نے گرنے کی آواز سنی؟ پچھلے ہفتے انہیں باتھ روم تک کون لے کر گیا؟ ان سوالوں کے جواب فون پر ”ٹھیک ہوں“ سے زیادہ بتاتے ہیں۔",
  },
  {
    en: "You do not have to reach a conclusion alone. Tell us what you have noticed and we will say honestly whether a nurse is needed or an attendant is enough — we do not send a nurse where an attendant will do. A single short visit is a low-stakes way to get a trained person into the house once.",
    ur: "نتیجہ آپ کو اکیلے نکالنے کی ضرورت نہیں۔ آپ نے جو محسوس کیا ہے وہ ہمیں بتا دیں، ہم صاف بتا دیں گے کہ نرس چاہیے یا اٹینڈنٹ کافی ہے — جہاں اٹینڈنٹ سے کام چل جائے، وہاں ہم نرس نہیں بھیجتے۔ ایک مختصر وزٹ اس کا آسان طریقہ ہے کہ ایک تربیت یافتہ فرد گھر میں ایک بار جا آئے۔",
  },
];

/* ================================================================== *
 * 5. Siblings and the local contact
 * ================================================================== */
const SIBLINGS: Bilingual[] = [
  {
    en: "Pick one name in Lahore — a cousin, a neighbour, somebody who can reach the house in twenty minutes and open a door.",
    ur: "لاہور میں کسی ایک فرد کا نام طے کر لیں — کوئی کزن یا پڑوسی، ایسا فرد جو بیس منٹ میں گھر پہنچ کر دروازہ کھلوا سکے۔",
  },
  {
    en: "Pick one point of contact among the siblings. When three people in three countries all message the caregiver separately, the caregiver stops looking after your parent and starts managing your family.",
    ur: "بہن بھائیوں میں سے رابطے کے لیے ایک فرد طے کریں۔ جب تین ملکوں میں بیٹھے تین لوگ الگ الگ کیئر گیور کو پیغام بھیجتے ہیں تو وہ والدین کی دیکھ بھال چھوڑ کر آپ کے گھر والوں کو سنبھالنے لگتا ہے۔",
  },
  {
    en: "Agree in advance who decides the ordinary things — extend the shift, switch days to nights, ask for a different caregiver. Medical questions belong with your parents doctor.",
    ur: "پہلے سے طے کر لیں کہ روزمرہ کے فیصلے کون کرے گا — شفٹ بڑھانی ہے، دن سے رات پر جانا ہے، یا کوئی دوسرا کیئر گیور مانگنا ہے۔ طبی سوالات آپ کے والدین کے ڈاکٹر کے دائرے میں ہیں۔",
  },
  {
    en: "Ask the person in Lahore to drop in once without arranging it first. One unannounced visit tells a family more than a month of messages.",
    ur: "لاہور والے فرد سے کہیں کہ ایک بار بغیر بتائے چکر لگا لیں۔ ایک بار بغیر اطلاع پہنچ جانا مہینے بھر کے پیغامات سے زیادہ بتا دیتا ہے۔",
  },
];

/* ================================================================== *
 * FAQ — mirrored byte-for-byte into the FAQPage JSON-LD below.
 * ================================================================== */
const ABROAD_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "I live in the UK or the USA. Can I call you from there?",
    qUr: "میں برطانیہ یا امریکہ میں رہتا ہوں۔ کیا میں وہاں سے آپ کو کال کر سکتا ہوں؟",
    a: `Yes. The number is Pakistani, so dial it with the country code: ${CONTACT_PHONE_TEL}. WhatsApp reaches the same team and works from any country. Or leave your name and number here and tell us which country you are in — we will call in hours that suit you there. We call back fast — usually within 15 minutes.`,
    aUr: `جی ہاں۔ نمبر پاکستانی ہے، اس لیے کنٹری کوڈ کے ساتھ ملائیں: ${CONTACT_PHONE_TEL}۔ واٹس ایپ اسی ٹیم تک پہنچتا ہے اور ہر ملک سے چلتا ہے۔ یا یہاں اپنا نام اور نمبر چھوڑ دیں اور بتا دیں کہ آپ کس ملک میں ہیں — ہم آپ کے وہاں کے مناسب اوقات میں کال کریں گے۔ ہم جلد واپس کال کرتے ہیں — عموماً 15 منٹ کے اندر۔`,
  },
  {
    q: "How do I pay from abroad?",
    qUr: "میں بیرونِ ملک سے ادائیگی کیسے کروں؟",
    a: "Payment can be made either in Pakistan or in the United States. Many families have somebody in Lahore pay after the shift; others pay from the US side. We settle which one suits you on the first call, before care starts. Either way: No advance. Pay after the shift. And your first day is free — no cost, no obligation. Continue only if you're happy.",
    aUr: "ادائیگی پاکستان میں بھی ہو سکتی ہے اور امریکہ میں بھی۔ بہت سے گھرانوں میں لاہور میں موجود کوئی فرد شفٹ کے بعد ادائیگی کر دیتا ہے؛ کچھ امریکہ کی طرف سے کرتے ہیں۔ آپ کے لیے کون سا طریقہ مناسب ہے، یہ پہلی کال پر، کام شروع ہونے سے پہلے طے کر لیتے ہیں۔ دونوں صورتوں میں یہ نہیں بدلتا: کوئی پیشگی ادائیگی نہیں۔ ادائیگی شفٹ کے بعد۔ اور پہلا دن مفت ہے؛ پسند آئے تو ہی آگے جاری رکھیں۔",
  },
  {
    q: "Can you send me updates while I am at work here?",
    qUr: "جب میں یہاں کام پر ہوں، کیا آپ مجھے اطلاع بھیجتے رہیں گے؟",
    a: "You get the caregiver card on WhatsApp before the visit — photo, name, and the checked PNC number for a nurse — and a message when the caregiver is on the way. Call or WhatsApp at any hour and a person answers. What we do not have is a camera, GPS tracking or a live monitoring screen, and we will not pretend otherwise. For how the day really went, ask your parent on a video call when the caregiver is not beside them.",
    aUr: "آنے سے پہلے آپ کو واٹس ایپ پر کیئر گیور کا کارڈ ملتا ہے — تصویر، نام، اور نرس کی صورت میں چیک شدہ PNC نمبر — اور روانگی کے وقت پیغام۔ کسی بھی وقت کال یا واٹس ایپ کریں، ایک انسان جواب دیتا ہے۔ ہمارے پاس کیمرہ، جی پی ایس ٹریکنگ یا براہِ راست نگرانی کی کوئی اسکرین نہیں، اور ہم اس کا دعویٰ بھی نہیں کریں گے۔ دن واقعی کیسا گزرا، یہ والد یا والدہ سے ویڈیو کال پر پوچھیں، جب کیئر گیور ساتھ نہ ہو۔",
  },
  {
    q: "Walidain kehte hain unhein kisi ki zarurat nahi — my parents say they do not need anyone. What do I do?",
    qUr: "والدین کہتے ہیں انہیں کسی کی ضرورت نہیں — میں کیا کروں؟",
    a: "This is the most common thing overseas families run into, and it is usually about dignity rather than about the help. Do not spring a stranger on them: tell them a day before who is coming and why. Start small — one visit, or one day rather than a permanent arrangement. Your first day is free — no cost, no obligation. Continue only if you're happy. And if the person does not suit your parent: Not comfortable? Tell us — we replace the caregiver, free, until you're fully satisfied.",
    aUr: "بیرونِ ملک مقیم گھرانوں کو یہ مسئلہ سب سے زیادہ پیش آتا ہے، اور عموماً یہ مدد کا نہیں، عزتِ نفس کا معاملہ ہوتا ہے۔ اجنبی کو اچانک سامنے نہ لائیں: ایک دن پہلے بتا دیں کہ کون آ رہا ہے اور کیوں۔ چھوٹی شروعات کریں — ایک وزٹ، یا مستقل بندوبست کے بجائے ایک دن۔ پہلا دن مفت ہے؛ پسند آئے تو ہی آگے جاری رکھیں۔ اور اگر فرد مناسب نہ لگے: اطمینان نہ ہو تو بتائیں؛ ہم نرس یا اٹینڈنٹ مفت بدلتے رہیں گے، جب تک آپ مطمئن نہ ہوں۔",
  },
  {
    q: "Can care start before I fly in?",
    qUr: "کیا میرے پہنچنے سے پہلے دیکھ بھال شروع ہو سکتی ہے؟",
    a: "Yes. Care can start within 24 hours of your call, and you do not need to be in Lahore for it. Somebody at the house has to be able to let the caregiver in — a parent, a relative, a neighbour with a key. We send the caregiver card before the visit and message you when they are on the way.",
    aUr: "جی ہاں۔ دیکھ بھال آپ کی کال کے 24 گھنٹوں کے اندر شروع ہو سکتی ہے، اور اس کے لیے آپ کا لاہور میں ہونا ضروری نہیں۔ بس گھر پر کوئی ایسا فرد ہو جو کیئر گیور کو اندر آنے دے — والد یا والدہ، کوئی رشتہ دار، یا چابی رکھنے والا پڑوسی۔ آنے سے پہلے ہم کیئر گیور کا کارڈ بھیجتے ہیں اور روانگی پر اطلاع دیتے ہیں۔",
  },
];

/* ================================================================== *
 * JSON-LD. No price, priceRange or priceSpecification anywhere in this
 * graph (Decision Ledger #9). No payment method is named — the confirmed
 * fact lives in words only, in the page copy.
 * ================================================================== */
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Nurse for parents in Lahore, arranged from abroad",
  description: DESCRIPTION,
  url: `${SITE_URL}${PATH}`,
  inLanguage: "en",
  about: {
    "@type": "MedicalBusiness",
    name: "Sehat Connect",
    description:
      "Home nursing and patient attendant care in Lahore, arranged from abroad by phone and WhatsApp. Every caregiver is CNIC checked, references called and police-verified. First day free, no advance, pay after the shift.",
    url: SITE_URL,
    telephone: CONTACT_PHONE_TEL,
    email: CONTACT_EMAIL,
    address: OFFICE_POSTAL_ADDRESS,
    areaServed: { "@type": "City", name: "Lahore" },
    openingHours: OPENING_HOURS,
    sameAs: businessSameAs(),
  },
  provider: {
    "@type": "MedicalBusiness",
    name: "Sehat Connect",
    url: SITE_URL,
    telephone: CONTACT_PHONE_TEL,
    address: OFFICE_POSTAL_ADDRESS,
    areaServed: { "@type": "City", name: "Lahore" },
    openingHours: OPENING_HOURS,
    sameAs: businessSameAs(),
  },
};

const breadcrumbs = breadcrumbList([{ name: "Care from abroad" }]);

// Mirrors the on-page FAQ exactly — Google requires the schema and the rendered
// content to match.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ABROAD_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ================================================================== *
 * Shared inline styles — same card language as /charges and the guides.
 * ================================================================== */
const CARD: CSSProperties = {
  background: "var(--paper)",
  border: "1px solid var(--line)",
  borderRadius: 20,
  padding: "26px 22px",
  boxShadow: "var(--shadow-sm)",
};

const BODY: CSSProperties = {
  fontSize: 18,
  color: "var(--ink-soft)",
  lineHeight: 1.7,
  fontWeight: 500,
  maxWidth: "62ch",
};

/** Bilingual paragraph. Every string on this page goes through a bilingual
 *  component, so the en/ur pairing can never drift apart. */
function P({ t, style }: { t: Bilingual; style?: CSSProperties }) {
  return (
    <p style={{ ...BODY, ...style }}>
      <span data-en>{t.en}</span>
      <span data-ur className="urdu">{t.ur}</span>
    </p>
  );
}

function Paras({ items, style }: { items: Bilingual[]; style?: CSSProperties }) {
  return (
    <>
      {items.map((t, i) => (
        <P key={t.en} t={t} style={i === 0 ? style : { ...style, marginTop: 16 }} />
      ))}
    </>
  );
}

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

/** Same row rhythm as TickList, with a neutral dash marker — a tick would read
 *  as approval next to a list of things we deliberately do not provide. */
function DashList({ items }: { items: Bilingual[] }) {
  return (
    <div className="id-meta">
      {items.map((item) => (
        <div className="id-row" key={item.en}>
          <span
            aria-hidden="true"
            style={{
              width: 24,
              height: 24,
              borderRadius: 7,
              background: "rgba(10,46,43,.08)",
              display: "grid",
              placeItems: "center",
              flex: "none",
              marginTop: 1,
            }}
          >
            <span style={{ width: 11, height: 2.5, borderRadius: 2, background: "var(--ink-soft)" }} />
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

function SectionHead({ eyebrow, heading }: { eyebrow: Bilingual; heading: Bilingual }) {
  return (
    <div className="sec-head">
      <span className="eyebrow">
        <span data-en>{eyebrow.en}</span>
        <span data-ur className="urdu">{eyebrow.ur}</span>
      </span>
      <h2>
        <span data-en>{heading.en}</span>
        <span data-ur className="urdu">{heading.ur}</span>
      </h2>
    </div>
  );
}

function CardHead({ t }: { t: Bilingual }) {
  return (
    <h3 style={{ fontSize: 20, marginBottom: 6, lineHeight: 1.25 }}>
      <span data-en>{t.en}</span>
      <span data-ur className="urdu">{t.ur}</span>
    </h3>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export default function CareFromAbroadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
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
          {/* ---- hero: the situation, named, with the form beside it ---- */}
          <section className="hero">
            <div className="wrap">
              <div className="hero-grid">
                <div className="hero-copy">
                  <span className="eyebrow eyebrow-plain">
                    <span data-en>For families outside Pakistan &middot; Bahar se walidain ki dekh bhaal</span>
                    <span data-ur className="urdu">بیرونِ ملک مقیم گھر والوں کے لیے &middot; باہر سے والدین کی دیکھ بھال</span>
                  </span>

                  <h1>
                    <span data-en>
                      A nurse for your parents in Lahore, <span className="hl">arranged from abroad</span>
                    </span>
                    <span data-ur className="urdu">
                      لاہور میں والدین کے لیے نرس، <span className="hl">بیرونِ ملک سے بندوبست</span>
                    </span>
                  </h1>

                  <div style={{ marginTop: 6 }}>
                    <Paras items={HERO_INTRO} />
                  </div>

                  <div className="hero-trust">
                    {HERO_PILLS.map((pill) => (
                      <span className="pill" key={pill.en}>
                        <span data-en>{pill.en}</span>
                        <span data-ur className="urdu">{pill.ur}</span>
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
                    <a className="btn btn-call" href={`tel:${CONTACT_PHONE_TEL}`}>
                      <PhoneIcon />
                      <span data-en>Call <bdi dir="ltr">{CONTACT_PHONE_TEL}</bdi></span>
                      <span data-ur className="urdu">کال کریں <bdi dir="ltr">{CONTACT_PHONE_TEL}</bdi></span>
                    </a>
                    <a className="btn btn-wa" href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer">
                      <span className="wadot" />
                      <span data-en>WhatsApp us</span>
                      <span data-ur className="urdu">واٹس ایپ کریں</span>
                    </a>
                  </div>

                  <P
                    t={DIAL_NOTE}
                    style={{ marginTop: 14, fontSize: 16, fontWeight: 600, maxWidth: "56ch" }}
                  />
                  <p style={{ marginTop: 6, fontSize: 16, fontWeight: 700, color: "var(--teal-deep)" }}>
                    <span data-en>Inside Pakistan: {CONTACT_PHONE_DISPLAY}</span>
                    <span data-ur className="urdu">
                      پاکستان کے اندر سے: <bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi>
                    </span>
                  </p>
                </div>

                <div className="hero-form">
                  <LeadFormD6 variant="hero" />
                </div>
              </div>
            </div>
          </section>

          {/* ---- 1. how it works from abroad ---- */}
          <section
            className="block how"
            style={{
              paddingTop: 40,
              background: "var(--cream-2)",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div className="wrap">
              <SectionHead
                eyebrow={{ en: "How it works from another country", ur: "دوسرے ملک سے یہ کیسے ہوتا ہے" }}
                heading={{
                  en: "Five steps, none of which need you to be in Lahore.",
                  ur: "پانچ قدم، اور کسی کے لیے بھی آپ کا لاہور میں ہونا ضروری نہیں۔",
                }}
              />

              <ol className="steps">
                {ABROAD_STEPS.map((step, i) => (
                  <li className="step" key={step.title.en}>
                    <div className="step-top">
                      <span className="step-n">{i + 1}</span>
                      <h3>
                        <span data-en>{step.title.en}</span>
                        <span data-ur className="urdu">{step.title.ur}</span>
                      </h3>
                    </div>
                    <p>
                      <span data-en>{step.body.en}</span>
                      <span data-ur className="urdu">{step.body.ur}</span>
                    </p>
                  </li>
                ))}
              </ol>

              <div style={{ ...CARD, marginTop: 22 }}>
                <P
                  style={{ fontSize: 18, fontWeight: 700, color: "var(--teal-deep)", maxWidth: "58ch" }}
                  t={CALLBACK_PROMISE}
                />
                <P
                  style={{ marginTop: 10, fontSize: 18, fontWeight: 700, color: "var(--teal-deep)", maxWidth: "58ch" }}
                  t={START_PROMISE}
                />
              </div>
            </div>
          </section>

          {/* ---- 2. what you can verify, and what does not exist ---- */}
          <section className="block">
            <div className="wrap">
              <SectionHead
                eyebrow={{ en: "I cannot see what is happening", ur: "مجھے نظر نہیں آتا کہ کیا ہو رہا ہے" }}
                heading={{
                  en: "What actually reaches your phone — and what we do not have.",
                  ur: "آپ کے فون تک واقعی کیا پہنچتا ہے — اور ہمارے پاس کیا نہیں ہے۔",
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={CARD}>
                  <CardHead t={{ en: "What reaches you", ur: "آپ تک کیا پہنچتا ہے" }} />
                  <TickList items={WHAT_REACHES_YOU} />
                </div>
                <div style={CARD}>
                  <CardHead t={{ en: "What we do not provide", ur: "ہم کیا فراہم نہیں کرتے" }} />
                  <DashList items={WHAT_WE_DO_NOT} />
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                <Link className="btn btn-ghost" href="/guides/elderly-care-at-home">
                  <span data-en>What the first weeks are actually like</span>
                  <span data-ur className="urdu">پہلے ہفتے سچ میں کیسے گزرتے ہیں</span>
                </Link>
              </div>
            </div>
          </section>

          {/* ---- 3. paying from abroad ----
                Owner-confirmed fact only: Pakistan or the United States. No rail,
                no provider, no fee, no conversion. See the header note. */}
          <section
            className="block"
            style={{
              background: "var(--cream-2)",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div className="wrap">
              <SectionHead
                eyebrow={{ en: "Paying from abroad", ur: "بیرونِ ملک سے ادائیگی" }}
                heading={{
                  en: "You can pay in Pakistan, or in the United States.",
                  ur: "آپ پاکستان میں ادائیگی کر سکتے ہیں، یا امریکہ میں۔",
                }}
              />

              <Paras items={PAY_INTRO} />

              <div style={{ ...CARD, marginTop: 22 }}>
                <CardHead t={{ en: "What does not change, wherever you pay from", ur: "ادائیگی کہیں سے بھی ہو، یہ نہیں بدلتا" }} />
                <TickList items={PAY_POINTS} />
              </div>

              <Paras items={PAY_OUTRO} style={{ marginTop: 22 }} />

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
                <Link className="btn btn-ghost" href="/charges">
                  <span data-en>How charges are worked out</span>
                  <span data-ur className="urdu">چارجز کیسے طے ہوتے ہیں</span>
                </Link>
              </div>
            </div>
          </section>

          {/* ---- 4. deciding what your parent needs ---- */}
          <section className="block">
            <div className="wrap">
              <SectionHead
                eyebrow={{ en: "Deciding from a distance", ur: "دور رہ کر فیصلہ کرنا" }}
                heading={{
                  en: "Your father will say he is fine. He usually will.",
                  ur: "آپ کے والد کہیں گے کہ وہ ٹھیک ہیں۔ عموماً وہ یہی کہتے ہیں۔",
                }}
              />

              <Paras items={DECIDE_INTRO} />

              <div style={{ ...CARD, marginTop: 22 }}>
                <CardHead
                  t={{
                    en: "The formats you can ask for",
                    ur: "آپ کن صورتوں میں مانگ سکتے ہیں",
                  }}
                />
                <div className="id-meta">
                  {CARE_FORMATS.map((format) => (
                    <div className="id-row" key={format.id}>
                      <Tick />
                      <span>
                        <b>
                          <span data-en>{format.name.en}</span>
                          <span data-ur className="urdu">{format.name.ur}</span>
                        </b>
                        <br />
                        <span data-en>{format.detail.en}</span>
                        <span data-ur className="urdu">{format.detail.ur}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                <Link className="btn btn-ghost" href="/services/elderly-care">
                  <span data-en>Elderly care at home in Lahore</span>
                  <span data-ur className="urdu">لاہور میں بزرگوں کی گھر پر دیکھ بھال</span>
                </Link>
                <Link className="btn btn-ghost" href="/services/long-term-care">
                  <span data-en>Long-term care at home</span>
                  <span data-ur className="urdu">گھر پر طویل مدتی دیکھ بھال</span>
                </Link>
              </div>
            </div>
          </section>

          {/* ---- 5. siblings and the local contact ---- */}
          <section
            className="block"
            style={{
              background: "var(--cream-2)",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div className="wrap">
              <SectionHead
                eyebrow={{ en: "Who decides when you are not there", ur: "جب آپ وہاں نہ ہوں تو فیصلہ کون کرے" }}
                heading={{
                  en: "One name in Lahore. One point of contact among you.",
                  ur: "لاہور میں ایک نام۔ اور آپ سب میں سے رابطے کے لیے ایک فرد۔",
                }}
              />

              <div style={CARD}>
                <TickList items={SIBLINGS} />
              </div>
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="abroad-faq">
            <div className="wrap">
              <SectionHead
                eyebrow={{ en: "Questions overseas families ask", ur: "بیرونِ ملک گھرانوں کے عام سوالات" }}
                heading={{ en: "Straight answers.", ur: "سیدھے جواب۔" }}
              />

              <div className="faq-list">
                {ABROAD_FAQ.map((item) => (
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

          {/* ---- close: the one action, plus where to read further ---- */}
          <section className="block" style={{ paddingTop: 44 }}>
            <div className="wrap">
              <div style={CARD}>
                <CardHead
                  t={{
                    en: "Start with one call, at your hour",
                    ur: "ایک کال سے شروع کریں، اپنے وقت پر",
                  }}
                />
                <P
                  style={{ fontSize: 17, maxWidth: "58ch" }}
                  t={{
                    en: "Leave your name, your number and the country you are in. A real person calls back, asks what is happening at home, says honestly whether your parent needs a nurse or an attendant, and gives you the exact price before anybody goes to the house.",
                    ur: "اپنا نام، نمبر اور یہ بتا دیں کہ آپ کس ملک میں ہیں۔ ایک اصل انسان واپس کال کرے گا، پوچھے گا کہ گھر میں کیا صورتحال ہے، صاف بتائے گا کہ نرس چاہیے یا اٹینڈنٹ، اور کسی کے گھر جانے سے پہلے صحیح قیمت بتا دے گا۔",
                  }}
                />
                <P
                  style={{ marginTop: 12, fontSize: 17, fontWeight: 700, color: "var(--teal-deep)", maxWidth: "58ch" }}
                  t={CALLBACK_PROMISE}
                />

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
                  <a className="btn btn-call" href={`tel:${CONTACT_PHONE_TEL}`}>
                    <PhoneIcon />
                    <span data-en>Call <bdi dir="ltr">{CONTACT_PHONE_TEL}</bdi></span>
                    <span data-ur className="urdu">کال کریں <bdi dir="ltr">{CONTACT_PHONE_TEL}</bdi></span>
                  </a>
                  <a className="btn btn-wa" href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer">
                    <span className="wadot" />
                    <span data-en>WhatsApp us</span>
                    <span data-ur className="urdu">واٹس ایپ کریں</span>
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                <Link className="btn btn-ghost" href="/services/elderly-care">
                  <span data-en>Elderly care at home</span>
                  <span data-ur className="urdu">گھر پر بزرگوں کی دیکھ بھال</span>
                </Link>
                <Link className="btn btn-ghost" href="/services/long-term-care">
                  <span data-en>Long-term care at home</span>
                  <span data-ur className="urdu">گھر پر طویل مدتی دیکھ بھال</span>
                </Link>
                <Link className="btn btn-ghost" href="/charges">
                  <span data-en>How charges work</span>
                  <span data-ur className="urdu">چارجز کیسے طے ہوتے ہیں</span>
                </Link>
                <Link className="btn btn-ghost" href="/guides/elderly-care-at-home">
                  <span data-en>Elderly care: what to expect</span>
                  <span data-ur className="urdu">بزرگوں کی دیکھ بھال: کیا توقع رکھیں</span>
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
