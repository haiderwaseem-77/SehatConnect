// /guides/nurse-or-attendant — the question families ask on literally every
// first call, answered as a GUIDE, not a sales page (NORTH-STAR §12: roughly one
// guide a month, written from real ops experience, in the site's plain voice).
//
// The test this page has to pass: it must be genuinely useful to someone who
// never calls us. So the selling is confined to the soft close and the shared
// CtaBanner; the body answers the question and stops.
//
// HARD CONSTRAINTS honoured here:
//   - Decision Ledger #9 — no price figure, range or multiple anywhere, and
//     `PRICES` is deliberately NOT imported. We say only that the two are priced
//     differently because the work is different.
//   - Decision Ledger #15 — no physiotherapy / therapy / rehabilitation language.
//     Helping someone move, turn or walk is described as ordinary caregiving.
//   - Decision Ledger #16 — ICU means step-down only. No page may imply we take
//     machine-dependent patients; the ICU situation below says the limit plainly.
//   - Every promise string is imported verbatim from lib/constants.ts.
//   - No clinical advice, no diagnosis, no dosing. This page describes ROLES.
//
// Every task attributed to a nurse or an attendant below already exists in the
// repo: QUALIFIED_NURSE_SERVICES / ATTENDANT_SERVICES in lib/constants.ts, the
// CAN_DO and DOES lists on the two service pages, and the COMPARE table on
// /services. Nothing new is claimed.
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import CtaBanner from "@/components/home/CtaBanner";
import {
  SITE_URL,
  SHIFTS,
  PROMISES,
  CALLBACK_PROMISE,
  START_PROMISE,
  VERIFICATION_PROMISE,
} from "@/lib/constants";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { breadcrumbList, businessSameAs } from "@/lib/schema";
import { guideBySlug } from "@/lib/guides";

const GUIDE = guideBySlug("nurse-or-attendant");

const TITLE_EN = GUIDE?.name.en ?? "Nurse or attendant — which does your patient need?";
const TITLE_UR = GUIDE?.name.ur ?? "نرس یا اٹینڈنٹ — آپ کے مریض کو کس کی ضرورت ہے؟";
const DEK_EN = GUIDE?.dek.en ?? "";
const DEK_UR = GUIDE?.dek.ur ?? "";

const DAY_SHIFT = SHIFTS.find((s) => s.id === "morning")?.time ?? "";
const NIGHT_SHIFT = SHIFTS.find((s) => s.id === "night")?.time ?? "";

const META_DESCRIPTION =
  "The difference between a nurse and an attendant, explained through eight real situations: a dressing after surgery, a daily drip, nights with dementia.";

export const metadata: Metadata = {
  title: "Difference Between a Nurse and an Attendant",
  description: META_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/nurse-or-attendant` },
};

type Bilingual = { en: string; ur: string };

/* ------------------------------------------------------------------ *
 * What each one is. Task lists condensed from the CAN_DO list on
 * /services/qualified-nurse and the DOES list on /services/attendant —
 * same facts, shorter sentences.
 * ------------------------------------------------------------------ */
const NURSE_DOES: Bilingual[] = [
  {
    en: "Injections and drips, on the doctor's prescription",
    ur: "ڈاکٹر کے نسخے کے مطابق انجیکشن اور ڈرپ",
  },
  {
    en: "Wound care and dressing changes, including after surgery",
    ur: "زخم کی دیکھ بھال اور ڈریسنگ کی تبدیلی، آپریشن کے بعد بھی",
  },
  {
    en: "Vitals: blood pressure, temperature, pulse, blood sugar, oxygen",
    ur: "طبی علامات: بلڈ پریشر، درجہ حرارت، نبض، شوگر اور آکسیجن",
  },
  {
    en: "Catheters and feeding (NG) tubes, on the doctor's plan",
    ur: "ڈاکٹر کے پلان کے مطابق کیتھیٹر اور NG فیڈنگ ٹیوب کی دیکھ بھال",
  },
  {
    en: "Giving prescribed medicines on time and watching for a reaction",
    ur: "تجویز کردہ دوائیں وقت پر دینا اور کسی ردعمل پر نظر رکھنا",
  },
  {
    en: "Care after an operation, and after coming home from ICU or HDU",
    ur: "آپریشن کے بعد، اور آئی سی یو یا ایچ ڈی یو سے گھر آنے کے بعد دیکھ بھال",
  },
];

const ATTENDANT_DOES: Bilingual[] = [
  {
    en: "Feeding — help with eating, drinking, and medicines you hand over",
    ur: "کھانا — کھانے پینے میں مدد، اور وہ دوا جو آپ خود دیتے ہیں",
  },
  {
    en: "Hygiene — sponge bath, changing, toilet help, keeping them clean",
    ur: "صفائی — سپنج باتھ، کپڑے بدلوانا، بیت الخلا میں مدد، مریض کو صاف رکھنا",
  },
  {
    en: "Movement — turning, sitting up, support while walking",
    ur: "حرکت — کروٹ بدلوانا، بٹھانا، چلنے میں سہارا",
  },
  {
    en: "Company — sitting with them, talking, not leaving them alone",
    ur: "ساتھ — پاس بیٹھنا، بات کرنا، اکیلا نہ چھوڑنا",
  },
  {
    en: "Night duty — staying awake through the night so the family can sleep",
    ur: "رات کی ڈیوٹی — رات بھر جاگ کر خیال رکھنا تاکہ گھر والے سو سکیں",
  },
];

/* ------------------------------------------------------------------ *
 * The core of the piece: eight situations, one clear answer each.
 * Every situation is drawn from care this business already describes
 * elsewhere on the site. None invents a new capability.
 * ------------------------------------------------------------------ */
type Answer = "nurse" | "attendant";

const ANSWER_LABEL: Record<Answer, Bilingual> = {
  nurse: { en: "Qualified Nurse", ur: "PNC رجسٹرڈ نرس" },
  attendant: { en: "Attendant", ur: "اٹینڈنٹ" },
};

const SITUATIONS: { answer: Answer; title: Bilingual; body: Bilingual }[] = [
  {
    answer: "nurse",
    title: {
      en: "Your father is home after an operation and the dressing has to be changed",
      ur: "والد صاحب آپریشن کے بعد گھر آ گئے ہیں اور ڈریسنگ بدلنی ہے",
    },
    body: {
      en: "Changing a dressing on a surgical wound is clinical work. The wound has to be cleaned and dressed properly, and someone has to notice early if it starts to look wrong. An attendant is not trained for this and will not do it.",
      ur: "آپریشن کے زخم کی ڈریسنگ بدلنا طبی کام ہے۔ زخم کو صحیح طریقے سے صاف کر کے ڈریسنگ کرنی ہوتی ہے، اور اگر حالت بگڑنے لگے تو بروقت پہچاننا ہوتا ہے۔ اٹینڈنٹ اس کے لیے تربیت یافتہ نہیں، اور وہ یہ کام نہیں کرے گا۔",
    },
  },
  {
    answer: "attendant",
    title: {
      en: "Your grandmother is bedridden and needs turning, feeding and keeping clean",
      ur: "دادی صاحبہ بستر پر ہیں — کروٹ بدلوانی ہے، کھانا کھلانا ہے اور صفائی کا خیال رکھنا ہے",
    },
    body: {
      en: "This is hard, constant, hands-on work — but none of it is medical. An attendant turns her regularly to reduce the risk of bed sores, helps her eat, and keeps her clean and comfortable. Booking a nurse for this does not get you anything extra.",
      ur: "یہ مشکل اور مسلسل کام ہے، لیکن اس میں کوئی طبی کام نہیں۔ اٹینڈنٹ باقاعدگی سے کروٹ بدلواتا ہے تاکہ بیڈ سورز کا خطرہ کم ہو، کھانے میں مدد کرتا ہے، اور صفائی اور آرام کا خیال رکھتا ہے۔ اس کام کے لیے نرس بلانے سے آپ کو کچھ زیادہ نہیں ملتا۔",
    },
  },
  {
    answer: "nurse",
    title: {
      en: "The doctor has written a daily drip or injection",
      ur: "ڈاکٹر نے روزانہ ڈرپ یا انجیکشن لکھا ہے",
    },
    body: {
      en: "Injections and IV drips are given by a nurse, on the doctor's prescription. Worth knowing: if that is the only thing needed, you do not have to book twelve hours. A nurse can come for a single visit, do it, and leave.",
      ur: "انجیکشن اور آئی وی ڈرپ نرس ہی لگاتی ہے، ڈاکٹر کے نسخے کے مطابق۔ ایک بات جاننے کی ہے: اگر بس یہی کام ہے تو بارہ گھنٹے کی شفٹ لینے کی ضرورت نہیں۔ نرس ایک وزٹ پر آ کر کام کر کے واپس جا سکتی ہے۔",
    },
  },
  {
    answer: "nurse",
    title: {
      en: "Your mother is diabetic and someone has to check her sugar and give insulin",
      ur: "والدہ کو شوگر ہے اور کسی کو شوگر چیک کر کے انسولین دینی ہے",
    },
    body: {
      en: "Blood sugar checks and insulin injections are nursing tasks. Many families do it themselves for years and manage fine. If nobody at home can do it — or nobody can be there at the right times — that is a nurse, not an attendant.",
      ur: "شوگر چیک کرنا اور انسولین لگانا نرسنگ کے کام ہیں۔ بہت سے گھرانے یہ برسوں خود کرتے ہیں اور اچھی طرح سنبھال لیتے ہیں۔ لیکن اگر گھر میں کوئی یہ نہ کر سکتا ہو، یا وقت پر موجود نہ ہو، تو یہ نرس کا کام ہے، اٹینڈنٹ کا نہیں۔",
    },
  },
  {
    answer: "attendant",
    title: {
      en: "Someone with dementia is unsettled and gets up and wanders at night",
      ur: "ڈیمنشیا کے مریض رات کو بے چین ہو کر اٹھ جاتے اور گھومنے لگتے ہیں",
    },
    body: {
      en: "What the night needs most is a calm person who stays awake, keeps them safe, and does not leave them alone. That is attendant work, and a night shift is usually the right answer. If there are prescribed medicines to give through the night and reactions to watch for, say so on the call — then it is a nurse.",
      ur: "رات کو سب سے زیادہ ضرورت ایک پُرسکون شخص کی ہوتی ہے جو جاگتا رہے، حفاظت کرے اور مریض کو اکیلا نہ چھوڑے۔ یہ اٹینڈنٹ کا کام ہے، اور عموماً رات کی شفٹ ہی صحیح جواب ہے۔ اگر رات بھر تجویز کردہ دوائیں دینی ہوں اور ردعمل پر نظر رکھنی ہو تو کال پر بتا دیں — پھر یہ نرس کا کام ہے۔",
    },
  },
  {
    answer: "nurse",
    title: {
      en: "Your patient is coming home after ICU or HDU",
      ur: "مریض آئی سی یو یا ایچ ڈی یو سے گھر آ رہا ہے",
    },
    body: {
      en: "The first days at home usually mean monitoring, medicines, and wound or tube care — a nurse, at least to begin with. Be clear about what this is: care after intensive care, not intensive care at home. If your patient still needs hospital-level equipment beside the bed, we will tell you plainly on the call that this is not something we take on.",
      ur: "گھر کے پہلے دن عموماً نگرانی، دواؤں اور زخم یا ٹیوب کی دیکھ بھال کے ہوتے ہیں — کم از کم شروع میں نرس ہی چاہیے۔ ایک بات صاف رہے: یہ آئی سی یو کے بعد کی دیکھ بھال ہے، گھر پر آئی سی یو نہیں۔ اگر مریض کو اب بھی ہسپتال والی مشینوں کی ضرورت ہے تو ہم کال پر صاف کہہ دیں گے کہ یہ کام ہم نہیں لیتے۔",
    },
  },
  {
    answer: "nurse",
    title: {
      en: "There is a catheter or a feeding tube in place",
      ur: "مریض کو کیتھیٹر یا فیڈنگ ٹیوب لگی ہوئی ہے",
    },
    body: {
      en: "Catheters and NG feeding tubes are looked after by a nurse, following the doctor's plan. An attendant can keep the patient clean and comfortable around it, but the tube itself is nursing work — do not book an attendant and hope.",
      ur: "کیتھیٹر اور این جی فیڈنگ ٹیوب کی دیکھ بھال نرس کرتی ہے، ڈاکٹر کے پلان کے مطابق۔ اٹینڈنٹ مریض کو صاف اور آرام دہ رکھ سکتا ہے، لیکن ٹیوب کا معاملہ نرسنگ کا کام ہے — اٹینڈنٹ بلا کر امید نہ رکھیں۔",
    },
  },
  {
    answer: "attendant",
    title: {
      en: "Your father is alone at night and the family cannot stay awake any more",
      ur: "والد صاحب رات کو اکیلے ہوتے ہیں اور گھر والوں سے مزید جاگا نہیں جاتا",
    },
    body: {
      en: `If there is no medical task, what you need is someone awake in the house from ${NIGHT_SHIFT.toLowerCase()}. That is a night attendant. It is also the most common thing families ask us for, usually after a month of no sleep.`,
      ur: `اگر کوئی طبی کام نہیں تو آپ کو صرف ایسا شخص چاہیے جو رات ${NIGHT_SHIFT} تک گھر میں جاگتا رہے۔ یہ رات کا اٹینڈنٹ ہے۔ اور یہی سب سے زیادہ مانگی جانے والی چیز ہے، عموماً ایک مہینہ بغیر نیند کے گزارنے کے بعد۔`,
    },
  },
];

/* ------------------------------------------------------------------ *
 * Needs change. Formats come from CARE_FORMATS / SHIFTS — a single
 * visit, a 12-hour day or night shift, or round-the-clock as TWO
 * caregivers across two shifts (never one person for 24 hours).
 * ------------------------------------------------------------------ */
const BOTH: Bilingual[] = [
  {
    en: "A nurse for a short visit when the drip or dressing is due, and an attendant for the hours in between — the two do not have to be the same booking.",
    ur: "ڈرپ یا ڈریسنگ کے وقت نرس کا ایک مختصر وزٹ، اور باقی گھنٹوں کے لیے اٹینڈنٹ — دونوں کا ایک ہی بندوبست ہونا ضروری نہیں۔",
  },
  {
    en: `A 12-hour shift, day (${DAY_SHIFT}) or night (${NIGHT_SHIFT}), when someone has to be there for the whole stretch.`,
    ur: `بارہ گھنٹے کی شفٹ — دن (${DAY_SHIFT}) یا رات (${NIGHT_SHIFT}) — جب پوری مدت کسی کا موجود رہنا ضروری ہو۔`,
  },
  {
    en: "Round-the-clock cover is two caregivers across two 12-hour shifts. Never one person awake for 24 hours — nobody can do that well, and anyone who says otherwise is not telling you the truth.",
    ur: "چوبیس گھنٹے کی دیکھ بھال کا مطلب ہے دو افراد، دو بارہ گھنٹے کی شفٹوں میں۔ ایک ہی شخص 24 گھنٹے نہیں — یہ کوئی ٹھیک طرح نہیں کر سکتا، اور جو اس کے برعکس کہے وہ سچ نہیں بول رہا۔",
  },
];

/* ------------------------------------------------------------------ *
 * What we ask on the call — printed so the reader can work the answer
 * out on their own, with or without us.
 * ------------------------------------------------------------------ */
const CALL_STEPS: { title: Bilingual; body: Bilingual }[] = [
  {
    title: { en: "What happened, and when", ur: "کیا ہوا، اور کب" },
    body: {
      en: "An operation, a discharge, a fall, or a long illness that got worse. This alone usually tells us whether there is clinical work in the house.",
      ur: "آپریشن، ہسپتال سے چھٹی، گرنا، یا کوئی پرانی بیماری جو بگڑ گئی۔ اسی سے عموماً پتہ چل جاتا ہے کہ گھر میں کوئی طبی کام ہے یا نہیں۔",
    },
  },
  {
    title: {
      en: "Has a doctor written anything down for home",
      ur: "کیا ڈاکٹر نے گھر کے لیے کچھ لکھ کر دیا ہے",
    },
    body: {
      en: "A prescription, a dressing schedule, a discharge slip. If you have it in your hand, read it out on the phone — that usually settles the question in under a minute.",
      ur: "نسخہ، ڈریسنگ کا شیڈول، یا ڈسچارج سلپ۔ اگر آپ کے ہاتھ میں ہے تو فون پر پڑھ دیں — عموماً ایک منٹ سے کم میں بات طے ہو جاتی ہے۔",
    },
  },
  {
    title: { en: "Which hours are hardest", ur: "کون سے گھنٹے سب سے مشکل ہیں" },
    body: {
      en: "Nights, mornings, or the whole day. This decides the shift, not the person — a nurse and an attendant can both come for either shift.",
      ur: "راتیں، صبحیں، یا سارا دن۔ اس سے شفٹ طے ہوتی ہے، فرد نہیں — نرس اور اٹینڈنٹ، دونوں کسی بھی شفٹ میں آ سکتے ہیں۔",
    },
  },
  {
    title: { en: "Then we say which one, plainly", ur: "پھر ہم صاف بتا دیتے ہیں کہ کون سا" },
    body: {
      en: "Including when the answer is the less involved of the two. We would rather send the right person than the bigger booking.",
      ur: "چاہے جواب کم درجے والا ہی کیوں نہ ہو۔ ہمیں بڑا آرڈر لینے سے زیادہ یہ اہم ہے کہ صحیح فرد بھیجا جائے۔",
    },
  },
];

const CALL_PROMISES: Bilingual[] = [
  CALLBACK_PROMISE,
  START_PROMISE,
  PROMISES.trial,
  PROMISES.replacement,
  VERIFICATION_PROMISE,
];

/* ------------------------------------------------------------------ *
 * FAQ — mirrored byte-for-byte into the FAQPage JSON-LD below.
 * One question carries natural Roman Urdu (NORTH-STAR §5 rule 3).
 * ------------------------------------------------------------------ */
const GUIDE_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "What is the difference between a nurse and an attendant?",
    qUr: "نرس اور اٹینڈنٹ میں کیا فرق ہے؟",
    a: "A Qualified Nurse is registered with the Pakistan Nursing Council and does clinical work: injections and drips on the doctor's prescription, wound dressing, catheters and feeding tubes, giving prescribed medicines, and monitoring blood pressure, temperature, pulse, blood sugar and oxygen. An Attendant does non-clinical care: feeding, hygiene, movement, company and overnight duty. Both are CNIC checked, references called, police-verified.",
    aUr: "PNC رجسٹرڈ نرس طبی کام کرتی ہے: ڈاکٹر کے نسخے کے مطابق انجیکشن اور ڈرپ، زخم کی ڈریسنگ، کیتھیٹر اور فیڈنگ ٹیوب، تجویز کردہ دوائیں دینا، اور بلڈ پریشر، درجہ حرارت، نبض، شوگر اور آکسیجن کی نگرانی۔ اٹینڈنٹ غیر طبی مدد کرتا ہے: کھانا، صفائی، حرکت، ساتھ اور رات کی ڈیوٹی۔ دونوں کا شناختی کارڈ اور حوالہ جات چیک ہوتے ہیں اور پولیس تصدیق بھی ہوتی ہے۔",
  },
  {
    q: "Nurse ya attendant — mujhe kis ki zarurat hai?",
    qUr: "نرس یا اٹینڈنٹ — مجھے کس کی ضرورت ہے؟",
    a: "Ask yourself one question: has a doctor written down something that must be done to the patient at home — an injection, a drip, a dressing, a tube, a reading to be taken? If yes, you need a Qualified Nurse. If the struggle is feeding, bathing, moving and not leaving them alone, an Attendant is the right person. If you are still not sure, tell us what is happening and we will say honestly which one it is.",
    aUr: "خود سے ایک سوال کریں: کیا ڈاکٹر نے گھر پر مریض کے لیے کچھ کرنے کو لکھا ہے — انجیکشن، ڈرپ، ڈریسنگ، ٹیوب، یا کوئی ریڈنگ لینا؟ اگر ہاں، تو آپ کو نرس چاہیے۔ اگر مشکل کھانا کھلانے، نہلانے، چلانے اور اکیلا نہ چھوڑنے کی ہے، تو اٹینڈنٹ صحیح ہے۔ پھر بھی سمجھ نہ آئے تو ہمیں صورتحال بتا دیں، ہم صاف بتا دیں گے۔",
  },
  {
    q: "Can an attendant give an injection or change a dressing?",
    qUr: "کیا اٹینڈنٹ انجیکشن لگا سکتا ہے یا ڈریسنگ بدل سکتا ہے؟",
    a: "No. That is clinical work and it belongs to a Qualified Nurse. An attendant is not trained for it and we will not send one for it. If you book an attendant for a job that needs a nurse, the job simply does not get done — you lose the day and the patient is no better off.",
    aUr: "نہیں۔ یہ طبی کام ہے اور نرس ہی کر سکتی ہے۔ اٹینڈنٹ اس کے لیے تربیت یافتہ نہیں اور ہم اسے یہ کام کرنے نہیں بھیجتے۔ اگر آپ نرس والے کام کے لیے اٹینڈنٹ بلا لیں تو کام ہو ہی نہیں پائے گا — دن ضائع ہو گا اور مریض کا کوئی فائدہ نہیں ہو گا۔",
  },
  {
    q: "What if I choose the wrong one?",
    qUr: "اگر میں غلط انتخاب کر لوں تو؟",
    a: "Tell us and we change it. Your first day is free — no cost, no obligation. Continue only if you're happy. And if the person does not feel right for your home, we replace the caregiver, free, until you're fully satisfied. You can also call or WhatsApp us up to 4 hours before a shift to cancel or reschedule at no charge.",
    aUr: "ہمیں بتا دیں، ہم بدل دیں گے۔ پہلا دن مفت ہے؛ پسند آئے تو ہی آگے جاری رکھیں۔ اور اگر فرد آپ کے گھر کے لیے مناسب نہ لگے تو ہم اسے مفت بدل دیتے ہیں، جب تک آپ پوری طرح مطمئن نہ ہوں۔ شفٹ سے 4 گھنٹے پہلے تک کال یا واٹس ایپ کر کے بغیر کسی چارج کے منسوخی یا وقت کی تبدیلی بھی کروا سکتے ہیں۔",
  },
];

/* ------------------------------------------------------------------ *
 * JSON-LD.
 * datePublished / dateModified are deliberately ABSENT — inventing a
 * date would be a fabricated fact, and the honesty rule outranks the
 * rich-result nicety.
 * ------------------------------------------------------------------ */
const crumbs = [
  { name: "Guides", nameUr: "رہنمائی", path: "/guides" },
  { name: "Nurse or attendant", nameUr: "نرس یا اٹینڈنٹ" },
];
const breadcrumbs = breadcrumbList(crumbs);

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE_EN,
  description: META_DESCRIPTION,
  inLanguage: "en",
  author: {
    "@type": "Organization",
    name: "Sehat Connect",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Sehat Connect",
    url: SITE_URL,
    sameAs: businessSameAs(),
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/guides/nurse-or-attendant`,
  },
  url: `${SITE_URL}/guides/nurse-or-attendant`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GUIDE_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ------------------------------------------------------------------ *
 * Shared inline styles — same card language as /charges and /about.
 * No new CSS: direction6.css is not touched.
 * ------------------------------------------------------------------ */
const CARD: CSSProperties = {
  background: "var(--paper)",
  border: "1px solid var(--line)",
  borderRadius: 20,
  padding: "26px 22px",
  boxShadow: "var(--shadow-sm)",
};

const BODY_TEXT: CSSProperties = {
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
            <span data-ur lang="ur" dir="rtl" className="urdu">{item.ur}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function AnswerBadge({ answer }: { answer: Answer }) {
  const label = ANSWER_LABEL[answer];
  const isNurse = answer === "nurse";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        alignSelf: "flex-start",
        padding: "7px 13px",
        borderRadius: 999,
        fontSize: 14.5,
        fontWeight: 800,
        letterSpacing: ".01em",
        marginBottom: 12,
        color: isNurse ? "#fff" : "var(--teal-deep)",
        background: isNurse ? "var(--teal)" : "rgba(13,122,110,.12)",
        border: isNurse ? "1px solid var(--teal)" : "1px solid var(--line)",
      }}
    >
      <span data-en>You need: {label.en}</span>
      <span data-ur lang="ur" dir="rtl" className="urdu">ضرورت: {label.ur}</span>
    </span>
  );
}

export default function NurseOrAttendantGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
          {/* ---- H1 is the question; the short answer follows immediately ---- */}
          <section className="hero">
            <div className="wrap">
              <div className="hero-copy" style={{ maxWidth: "62ch" }}>
                <span className="eyebrow eyebrow-plain">
                  <span data-en>Guide</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">رہنمائی</span>
                </span>

                <h1>
                  <span data-en>
                    Nurse or attendant &mdash; <span className="hl">which does your patient need?</span>
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">{TITLE_UR}</span>
                </h1>

                <p className="hero-sub" style={{ maxWidth: "52ch" }}>
                  <span data-en>{DEK_EN}</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">{DEK_UR}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- the short answer, first, so nothing else has to be read ---- */}
          <section className="block" style={{ paddingTop: 6 }}>
            <div className="wrap">
              <div style={{ ...CARD, paddingLeft: 30, position: "relative", overflow: "hidden" }}>
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                />
                <span className="eyebrow" style={{ marginBottom: 12 }}>
                  <span data-en>The short answer</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">مختصر جواب</span>
                </span>
                <p style={{ ...BODY_TEXT, fontSize: 19 }}>
                  <span data-en>
                    The difference between a nurse and an attendant is what they are allowed and trained
                    to do to the patient. A <b style={{ color: "var(--ink)" }}>Qualified Nurse</b> is
                    registered with the Pakistan Nursing Council and does clinical work &mdash; injections,
                    drips, wound dressing, tubes, prescribed medicines, monitoring. An{" "}
                    <b style={{ color: "var(--ink)" }}>Attendant</b> does everything else that keeps a
                    patient comfortable &mdash; feeding, hygiene, movement, company, nights.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    نرس اور اٹینڈنٹ میں فرق یہ ہے کہ مریض کے ساتھ کون سا کام کرنے کی اجازت اور تربیت کس کے
                    پاس ہے۔ <b style={{ color: "var(--ink)" }}>PNC رجسٹرڈ نرس</b> طبی کام کرتی ہے — انجیکشن،
                    ڈرپ، زخم کی ڈریسنگ، ٹیوب، تجویز کردہ دوائیں اور نگرانی۔{" "}
                    <b style={{ color: "var(--ink)" }}>اٹینڈنٹ</b> باقی سب کچھ سنبھالتا ہے جس سے مریض کو
                    آرام ملے — کھانا، صفائی، حرکت، ساتھ اور راتیں۔
                  </span>
                </p>
                <p style={{ ...BODY_TEXT, fontSize: 19, marginTop: 14 }}>
                  <span data-en>
                    So one question usually settles it: <b style={{ color: "var(--ink)" }}>has a doctor
                    written down something that must be done to the patient at home?</b> If yes, you need
                    a nurse. If the struggle is feeding, bathing, moving and not leaving them alone, an
                    attendant is the right person &mdash; and the cheaper mistake to avoid is booking a
                    nurse you did not need.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    اس لیے عموماً ایک سوال سے بات طے ہو جاتی ہے:{" "}
                    <b style={{ color: "var(--ink)" }}>کیا ڈاکٹر نے گھر پر مریض کے لیے کچھ کرنے کو لکھا ہے؟</b>{" "}
                    اگر ہاں، تو نرس چاہیے۔ اگر مشکل کھانا کھلانے، نہلانے، چلانے اور اکیلا نہ چھوڑنے کی ہے،
                    تو اٹینڈنٹ صحیح فرد ہے — اور بغیر ضرورت نرس بلا لینا وہ غلطی ہے جس سے بچا جا سکتا ہے۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- what each one is ---- */}
          <section className="block" style={{ paddingTop: 30 }}>
            <div className="wrap">
              <div className="sec-head">
                <h2>
                  <span data-en>What each one is</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">دونوں میں سے ہر ایک کیا ہے</span>
                </h2>
                <p>
                  <span data-en>
                    Same verification, same shifts, different work. Nothing on either list is a maybe.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    تصدیق ایک جیسی، شفٹیں ایک جیسی، کام الگ۔ دونوں فہرستوں میں کوئی بات &ldquo;شاید&rdquo; والی نہیں۔
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={CARD}>
                  <h3 style={{ fontSize: 21, marginBottom: 8 }}>
                    <span data-en>A Qualified Nurse</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">PNC رجسٹرڈ نرس</span>
                  </h3>
                  <p style={{ ...BODY_TEXT, fontSize: 16.5, marginBottom: 6 }}>
                    <span data-en>
                      Registered with the Pakistan Nursing Council, with a registration number our team
                      checks. She follows the doctor&rsquo;s plan in your home.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      پاکستان نرسنگ کونسل میں رجسٹرڈ، اور اس کا رجسٹریشن نمبر ہماری ٹیم خود چیک کرتی ہے۔ وہ
                      آپ کے گھر میں ڈاکٹر کے پلان پر عمل کرتی ہے۔
                    </span>
                  </p>
                  <TickList items={NURSE_DOES} />
                </div>

                <div style={CARD}>
                  <h3 style={{ fontSize: 21, marginBottom: 8 }}>
                    <span data-en>An Attendant</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">اٹینڈنٹ</span>
                  </h3>
                  <p style={{ ...BODY_TEXT, fontSize: 16.5, marginBottom: 6 }}>
                    <span data-en>
                      Not a nurse, and not pretending to be one. An attendant does the everyday, hands-on
                      care that wears a family out &mdash; and does it all day, or all night.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      نرس نہیں، اور نہ ہی نرس بننے کا دعویٰ۔ اٹینڈنٹ وہ روزمرہ، ہاتھ سے کرنے والی دیکھ بھال
                      کرتا ہے جو گھر والوں کو تھکا دیتی ہے — سارا دن، یا ساری رات۔
                    </span>
                  </p>
                  <TickList items={ATTENDANT_DOES} />
                </div>
              </div>
            </div>
          </section>

          {/* ---- the core: eight situations ---- */}
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
                  <span data-en>Eight situations, eight answers</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">آٹھ حالات، آٹھ جواب</span>
                </span>
                <h2>
                  <span data-en>Find the one that sounds like your house.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">وہ صورتحال ڈھونڈیں جو آپ کے گھر جیسی ہو۔</span>
                </h2>
                <p>
                  <span data-en>
                    These are the situations families describe to us most often, with what we tell them.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    یہ وہی حالات ہیں جو گھر والے ہمیں سب سے زیادہ بتاتے ہیں، اور ہم انہیں جو جواب دیتے ہیں۔
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SITUATIONS.map((s) => (
                  <div key={s.title.en} style={{ ...CARD, display: "flex", flexDirection: "column" }}>
                    <AnswerBadge answer={s.answer} />
                    <h3 style={{ fontSize: 19, marginBottom: 10, lineHeight: 1.3 }}>
                      <span data-en>{s.title.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{s.title.ur}</span>
                    </h3>
                    <p style={BODY_TEXT}>
                      <span data-en>{s.body.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{s.body.ur}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---- what getting it wrong costs ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <h2>
                  <span data-en>What it costs you to get this wrong</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">غلط انتخاب کا نقصان کیا ہوتا ہے</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 10 }}>
                    <span data-en>An attendant, where a nurse was needed</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">نرس والے کام پر اٹینڈنٹ بلا لینا</span>
                  </h3>
                  <p style={BODY_TEXT}>
                    <span data-en>
                      This is the expensive mistake, and not in money. The clinical work simply cannot be
                      done &mdash; the dressing does not get changed, the drip does not go up, the reading
                      is not taken. You lose the day, the family is still doing everything, and the patient
                      is no better off. Nobody can improvise their way around it.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      یہ مہنگی غلطی ہے، اور نقصان پیسوں کا نہیں۔ طبی کام ہو ہی نہیں پاتا — ڈریسنگ نہیں
                      بدلتی، ڈرپ نہیں لگتی، ریڈنگ نہیں لی جاتی۔ دن ضائع ہوتا ہے، سارا بوجھ گھر والوں پر ہی
                      رہتا ہے، اور مریض کا کوئی فائدہ نہیں ہوتا۔ اس میں کوئی جگاڑ نہیں چلتی۔
                    </span>
                  </p>
                </div>

                <div style={CARD}>
                  <h3 style={{ fontSize: 20, marginBottom: 10 }}>
                    <span data-en>A nurse, where an attendant was enough</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">جہاں اٹینڈنٹ کافی تھا، وہاں نرس بلا لینا</span>
                  </h3>
                  <p style={BODY_TEXT}>
                    <span data-en>
                      The care still happens, so it is the softer mistake &mdash; but you pay for skills
                      your patient is not using. A nurse and an attendant are priced differently, because
                      the work is different. If you ask us for the more expensive of the two and your
                      patient does not need it, we will tell you on the call, even though it means a
                      smaller booking for us.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      دیکھ بھال تو ہو جاتی ہے، اس لیے یہ نسبتاً ہلکی غلطی ہے — لیکن آپ ایسی مہارت کے پیسے
                      دیتے ہیں جو مریض استعمال ہی نہیں کر رہا۔ نرس اور اٹینڈنٹ کی قیمت الگ ہوتی ہے، کیونکہ
                      کام الگ ہے۔ اگر آپ دونوں میں سے مہنگا والا مانگیں اور مریض کو اس کی ضرورت نہ ہو، تو ہم
                      کال پر بتا دیں گے — چاہے اس سے ہمارا آرڈر چھوٹا ہو جائے۔
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---- both, and changing needs ---- */}
          <section className="block" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head">
                <h2>
                  <span data-en>When you need both &mdash; and when the answer changes</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">جب دونوں کی ضرورت ہو — اور جب جواب بدل جائے</span>
                </h2>
                <p>
                  <span data-en>
                    Plenty of homes need one of each, and plenty of answers change after a week.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    بہت سے گھروں کو دونوں کی ضرورت ہوتی ہے، اور بہت سے جواب ایک ہفتے بعد بدل جاتے ہیں۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                <TickList items={BOTH} />
                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 18,
                    borderTop: "1px dashed var(--line)",
                    ...BODY_TEXT,
                  }}
                >
                  <span data-en>
                    The commonest change we see: a nurse for the first days after an operation, while the
                    dressing still has to be done, and then an attendant once the doctor stops it and the
                    real job becomes feeding, washing and helping them move. It can go the other way too
                    &mdash; someone gets weaker and a clinical task appears. When that happens, tell us and
                    we change the plan. You can call or WhatsApp us up to 4 hours before a shift to cancel
                    or reschedule at no charge.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    سب سے عام تبدیلی یہ ہوتی ہے: آپریشن کے بعد پہلے چند دن نرس، جب تک ڈریسنگ کرنی ہو، اور
                    پھر جب ڈاکٹر ڈریسنگ بند کر دے تو اٹینڈنٹ، کیونکہ اصل کام کھانا، صفائی اور چلنے پھرنے میں
                    مدد رہ جاتا ہے۔ معاملہ الٹ بھی ہو سکتا ہے — مریض کمزور ہو جائے اور کوئی طبی کام آ جائے۔
                    ایسا ہو تو ہمیں بتا دیں، ہم بندوبست بدل دیتے ہیں۔ شفٹ سے 4 گھنٹے پہلے تک کال یا واٹس ایپ
                    کر کے بغیر کسی چارج کے منسوخی یا وقت کی تبدیلی ہو سکتی ہے۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- how the decision actually gets made ---- */}
          <section className="block" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>How we decide with you</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">فیصلہ ہم آپ کے ساتھ کیسے کرتے ہیں</span>
                </span>
                <h2>
                  <span data-en>Four questions on the call. That is the whole method.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">کال پر چار سوال۔ بس یہی طریقہ ہے۔</span>
                </h2>
                <p>
                  <span data-en>
                    They are printed here so you can work the answer out on your own if you would rather
                    not call anyone.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    یہ یہاں اس لیے لکھے ہیں کہ اگر آپ کسی کو کال نہ کرنا چاہیں تو خود بھی جواب نکال سکیں۔
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CALL_STEPS.map((step, i) => (
                  <div key={step.title.en} style={{ ...CARD, display: "flex", flexDirection: "column" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "rgba(13,122,110,.12)",
                        color: "var(--teal-deep)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 19,
                        fontWeight: 800,
                        marginBottom: 14,
                      }}
                    >
                      {i + 1}
                    </span>
                    <h3 style={{ fontSize: 19, marginBottom: 10, lineHeight: 1.3 }}>
                      <span data-en>{step.title.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{step.title.ur}</span>
                    </h3>
                    <p style={BODY_TEXT}>
                      <span data-en>{step.body.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{step.body.ur}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ ...CARD, marginTop: 18 }}>
                <h3 style={{ fontSize: 19, marginBottom: 6 }}>
                  <span data-en>And if the decision still turns out wrong</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">اور اگر پھر بھی فیصلہ غلط نکلے</span>
                </h3>
                <TickList items={CALL_PROMISES} />
              </div>
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="guide-faq">
            <div className="wrap">
              <div className="sec-head">
                <h2>
                  <span data-en>Questions we get right after this one</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">اس کے فوراً بعد پوچھے جانے والے سوال</span>
                </h2>
              </div>

              <div className="faq-list">
                {GUIDE_FAQ.map((item) => (
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

          {/* ---- soft close: where to read more ---- */}
          <section className="block" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head">
                <h2>
                  <span data-en>Read more before you decide</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">فیصلے سے پہلے مزید پڑھ لیں</span>
                </h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link className="btn btn-ghost" href="/services/qualified-nurse" style={{ minHeight: 56 }}>
                  <span data-en>What a qualified nurse does</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">نرس کیا کرتی ہے</span>
                </Link>
                <Link className="btn btn-ghost" href="/services/attendant" style={{ minHeight: 56 }}>
                  <span data-en>What an attendant does</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">اٹینڈنٹ کیا کرتا ہے</span>
                </Link>
                <Link className="btn btn-ghost" href="/charges" style={{ minHeight: 56 }}>
                  <span data-en>How charges work</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">چارجز کیسے طے ہوتے ہیں</span>
                </Link>
                <Link className="btn btn-ghost" href="/guides" style={{ minHeight: 56 }}>
                  <span data-en>All guides</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">تمام رہنمائی</span>
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
