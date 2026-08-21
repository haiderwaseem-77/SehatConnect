// /guides/post-operative-care-checklist — "Bringing someone home after surgery".
//
// Target intent: "post operative care checklist", "what to prepare before
// bringing a patient home after surgery", "care after discharge Lahore".
//
// WHAT THIS PAGE IS (NORTH-STAR §9.3 / §12): a GUIDE, not a landing page. The
// test it has to pass is "genuinely useful to a family who never calls us" —
// something you could print and stick on the fridge. It sells once, in one
// paragraph, in the section where a nurse is the honest answer.
//
// HARD CONSTRAINTS for this page:
//  1. PREPARATION AND LOGISTICS ONLY — never clinical guidance. We are not the
//     treating clinician. So: no list of warning signs or red flags, no wound
//     care or dressing technique, no medication timing or dosing, no pain,
//     diet or activity advice, no "when to go to hospital", and no recovery
//     timelines. Every clinical question routes back to the discharge summary
//     and the treating surgeon — that is both the safe answer and the correct
//     one. The absence of a warning-signs list is deliberate and the page says
//     so out loud (see NOT_YOURS below).
//  2. NO money figure renders anywhere — copy, meta or JSON-LD (Decision
//     Ledger #9). The do-not-render pricing constant is deliberately NOT
//     imported. Price is quoted on the first call (PROMISES.priceOnCall).
//  3. ICU step-down only (Decision Ledger #16): care after coming home from
//     ICU/HDU, yes. Ventilator and tracheostomy care are NOT offered and are
//     therefore not named anywhere in the rendered copy — nothing on this page
//     may imply we do them.
//  4. No physiotherapy, rehabilitation, therapy or recovery-programme language
//     (Decision Ledger #15). Helping someone sit up, move or reach the
//     bathroom is ordinary caregiving and is described as such.
//  5. No invented facts: no hospital names, no statistics, no outcome claims,
//     no dates (which is also why the Article JSON-LD omits datePublished and
//     dateModified rather than inventing them).
//  6. Every promise string is imported verbatim from lib/constants.ts, which
//     mirrors the NORTH-STAR §3 promises table. "usually" in the callback
//     promise is mandatory. Never paraphrase or strengthen one.
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import CtaBanner from "@/components/home/CtaBanner";
import {
  SITE_URL,
  CONTACT_PHONE_TEL,
  CONTACT_EMAIL,
  OFFICE_POSTAL_ADDRESS,
  PROMISES,
  CALLBACK_PROMISE,
  START_PROMISE,
} from "@/lib/constants";
import { breadcrumbList, businessSameAs } from "@/lib/schema";

const PATH = "/guides/post-operative-care-checklist";
const HEADLINE =
  "Bringing someone home after surgery: a post-operative care checklist";
const DESCRIPTION =
  "A plain post-operative care checklist for families in Lahore: what to ask before you leave the hospital, how to set the room up, how to plan the first nights, and how to keep the paperwork straight. Preparation only — the medical side stays with your surgeon.";

export const metadata: Metadata = {
  // The root layout appends "| Sehat Connect" via its title template — do not
  // repeat the brand here.
  title: "Post-Operative Care Checklist — Coming Home After Surgery",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

type Bilingual = { en: string; ur: string };

/* ------------------------------------------------------------------ *
 * The honesty label that sets the boundary of this page, right at the
 * top. It is load-bearing: everything below is preparation, and the
 * reader should know that before they start following a checklist.
 * ------------------------------------------------------------------ */
const SCOPE_NOTE: Bilingual = {
  en: "This is a preparation checklist, not medical advice. Nothing here tells you how to look after a wound, when to give a medicine, or what a symptom means. All of that belongs to your discharge summary and to the surgeon who operated.",
  ur: "یہ تیاری کی چیک لسٹ ہے، طبی مشورہ نہیں۔ یہاں یہ نہیں بتایا گیا کہ زخم کی دیکھ بھال کیسے کرنی ہے، دوا کب دینی ہے، یا کسی علامت کا کیا مطلب ہے۔ یہ سب آپ کی ڈسچارج سمری اور آپریشن کرنے والے سرجن کا کام ہے۔",
};

/* ------------------------------------------------------------------ *
 * Opening — discharge day, described the way it actually happens.
 * ------------------------------------------------------------------ */
const INTRO: Bilingual[] = [
  {
    en: "Discharge day rarely goes calmly. Someone hands you a folder at the ward counter, explains three or four things quickly, and then there is a wheelchair, a lift, a car and a road. By the time you reach home, half of it has gone. Nobody was careless — everybody was tired and in a hurry.",
    ur: "ڈسچارج والا دن شاذ و نادر ہی سکون سے گزرتا ہے۔ وارڈ کے کاؤنٹر پر کوئی آپ کے ہاتھ میں فائل تھما دیتا ہے، تین چار باتیں جلدی جلدی سمجھاتا ہے، اور پھر ویل چیئر، لفٹ، گاڑی اور سڑک۔ گھر پہنچتے پہنچتے آدھی باتیں ذہن سے نکل چکی ہوتی ہیں۔ کسی نے لاپروائی نہیں کی — سب تھکے ہوئے اور جلدی میں تھے۔",
  },
  {
    en: "This guide is about the hours on either side of that moment: what to prepare before bringing a patient home after surgery, and what makes the first days at home easier. It is written from the calls Lahore families make to us — usually two or three days later than they needed to.",
    ur: "یہ رہنمائی اسی لمحے کے آگے پیچھے کے گھنٹوں کے بارے میں ہے: آپریشن کے بعد مریض کو گھر لانے سے پہلے کیا تیار کرنا ہے، اور گھر کے پہلے دن کیسے آسان ہوتے ہیں۔ یہ لاہور کے اُن گھرانوں کی کالوں سے لکھی گئی ہے جو ہمیں کرتے ہیں — اکثر دو تین دن اُس وقت سے دیر سے، جب ضرورت تھی۔",
  },
];

/* ------------------------------------------------------------------ *
 * 1. Before you leave the hospital.
 *
 * Every item is a QUESTION TO ASK or a PAPER TO COLLECT. None of it
 * requires medical knowledge and none of it gives clinical direction —
 * the answers all come from the ward, not from this page.
 * ------------------------------------------------------------------ */
const BEFORE_LEAVING: Bilingual[] = [
  {
    en: "The discharge summary in your hand before you leave the ward — not promised for later",
    ur: "ڈسچارج سمری وارڈ سے نکلنے سے پہلے آپ کے ہاتھ میں ہو — یہ نہیں کہ بعد میں مل جائے گی",
  },
  {
    en: "The surgeon's written after-care instructions and the prescription, on paper",
    ur: "سرجن کی لکھی ہوئی ہدایات اور نسخہ، کاغذ پر",
  },
  {
    en: "The date, time and place of the next follow-up — written down, not remembered",
    ur: "اگلے چیک اپ کی تاریخ، وقت اور جگہ — لکھی ہوئی، یاد کے بھروسے پر نہیں",
  },
  {
    en: "A number to call out of hours, and the name of whoever answers it. Ask it plainly: who do we call at two in the morning?",
    ur: "رات یا چھٹی کے وقت رابطے کا نمبر، اور یہ کہ اسے کون اٹھائے گا۔ صاف پوچھ لیں: رات دو بجے ہم کسے کال کریں؟",
  },
  {
    en: "What the patient is allowed to do at home, and what they are not — ask it as a question, and ask again if the answer came quickly",
    ur: "مریض گھر پر کیا کر سکتا ہے اور کیا نہیں — یہ سوال کر کے پوچھیں، اور اگر جواب جلدی میں ملا ہو تو دوبارہ پوچھ لیں",
  },
  {
    en: "When the dressing is next due to be changed, and who is expected to change it",
    ur: "اگلی ڈریسنگ کب بدلنی ہے، اور یہ کام کس نے کرنا ہے",
  },
  {
    en: "If a drain, a catheter or any other tube is going home with the patient, ask what it is and who looks after it",
    ur: "اگر مریض کے ساتھ کوئی ڈرین، کیتھیٹر یا کوئی اور ٹیوب گھر جا رہی ہے تو پوچھ لیں کہ وہ کیا ہے اور اس کی دیکھ بھال کون کرے گا",
  },
  {
    en: "Anything on the paper you cannot read or do not understand — ask a nurse on the ward to say it in plain Urdu before you walk out",
    ur: "کاغذ پر جو بات پڑھی یا سمجھ نہ آ رہی ہو — نکلنے سے پہلے وارڈ کی نرس سے سادہ اردو میں سمجھ لیں",
  },
  {
    en: "A photograph of every page on your phone, taken at the counter",
    ur: "ہر صفحے کی تصویر اپنے فون میں، کاؤنٹر پر ہی لے لیں",
  },
];

const BEFORE_LEAVING_NOTE: Bilingual = {
  en: "If you take one thing from this section, take this: photograph the papers before you leave the building. Paper goes missing on exactly the day you need it, and a photograph reaches a brother in another city in four seconds.",
  ur: "اس حصے سے صرف ایک بات یاد رکھنی ہو تو یہ: عمارت سے نکلنے سے پہلے کاغذوں کی تصویر لے لیں۔ کاغذ ٹھیک اُسی دن گم ہوتا ہے جس دن ضرورت ہو، اور تصویر دوسرے شہر میں بیٹھے بھائی تک چار سیکنڈ میں پہنچ جاتی ہے۔",
};

/* ------------------------------------------------------------------ *
 * 2. The room. Furniture, light, floor and reach — no clinical setup.
 * ------------------------------------------------------------------ */
const THE_ROOM: Bilingual[] = [
  {
    en: "A bed that can be reached from both sides, if the room allows it — someone will need to help from the other side",
    ur: "ایسا بستر جس تک دونوں طرف سے پہنچا جا سکے، اگر کمرہ اجازت دے — کسی نہ کسی کو دوسری طرف سے مدد کرنی پڑے گی",
  },
  {
    en: "A clear path from the bed to the bathroom: no rug edge, no wire, no chair in the way",
    ur: "بستر سے باتھ روم تک راستہ بالکل صاف: نہ قالین کا کنارہ، نہ تار، نہ راستے میں کرسی",
  },
  {
    en: "A light that can be switched on from the bed. A torch or a phone on the side table does the same job",
    ur: "ایسی روشنی جو بستر سے ہی جلائی جا سکے۔ سائیڈ ٹیبل پر ٹارچ یا فون بھی یہی کام دے دیتا ہے",
  },
  {
    en: "A chair beside the bed, so whoever sits with them is not standing for hours",
    ur: "بستر کے ساتھ ایک کرسی، تاکہ ساتھ بیٹھنے والا گھنٹوں کھڑا نہ رہے",
  },
  {
    en: "One place — one tray, one box, one shelf — where every medicine lives, and nowhere else",
    ur: "ایک ہی جگہ — ایک ٹرے، ایک ڈبہ یا ایک شیلف — جہاں ساری دوائیں رکھی جائیں، اور کہیں نہیں",
  },
  {
    en: "Water, a glass and a bin within arm's reach of the bed",
    ur: "پانی، گلاس اور کوڑے دان بستر سے ہاتھ کے فاصلے پر",
  },
  {
    en: "A phone charger that reaches the bed. A dead phone at three in the morning is its own small emergency",
    ur: "ایسا چارجر جو بستر تک پہنچے۔ رات تین بجے بند فون اپنی جگہ ایک مصیبت ہے",
  },
  {
    en: "If they can be moved, somewhere to sit near the family during the day — a back room is a very long day for someone who cannot get up on their own",
    ur: "اگر انہیں ہلایا جا سکتا ہو تو دن میں گھر والوں کے پاس بیٹھنے کی جگہ — پچھلا کمرہ ایسے شخص کے لیے بہت لمبا دن ہوتا ہے جو خود اٹھ نہیں سکتا",
  },
  {
    en: "Which pharmacy near you stays open late, with its number saved — find that out now, not on the night you need it",
    ur: "آپ کے قریب کون سا میڈیکل سٹور رات دیر تک کھلا رہتا ہے، اور اس کا نمبر محفوظ — یہ آج معلوم کر لیں، اُس رات نہیں جب ضرورت پڑ جائے",
  },
];

/* ------------------------------------------------------------------ *
 * 3. The first night. Honest about how families actually cope, and
 * about when they call — no clinical content at all.
 * ------------------------------------------------------------------ */
const FIRST_NIGHT: Bilingual[] = [
  {
    en: "The day is busy and full of people. The night is one person, awake, in a quiet house, listening.",
    ur: "دن مصروف ہوتا ہے اور لوگوں سے بھرا ہوا۔ رات میں صرف ایک شخص ہوتا ہے — جاگتا ہوا، خاموش گھر میں، ہر آواز سنتا ہوا۔",
  },
  {
    en: "What usually happens is this. Somebody volunteers for the first night and manages it. They manage the second. By the third or fourth they have not slept properly in days, and they are the person making decisions about a patient. That is when families call us — almost never on discharge day, and very often at eleven at night on day three.",
    ur: "عام طور پر ہوتا یہ ہے: کوئی ایک فرد پہلی رات کے لیے تیار ہو جاتا ہے اور نکال لیتا ہے۔ دوسری رات بھی نکل جاتی ہے۔ تیسری یا چوتھی رات تک اسے کئی دن سے ٹھیک نیند نہیں ملی ہوتی، اور فیصلے وہی کر رہا ہوتا ہے۔ گھر والے ہمیں اسی وقت کال کرتے ہیں — ڈسچارج والے دن تقریباً کبھی نہیں، اور تیسرے دن رات گیارہ بجے اکثر۔",
  },
  {
    en: "So settle it at a table, before the car reaches the gate:",
    ur: "اس لیے گاڑی کے گیٹ پر پہنچنے سے پہلے، بیٹھ کر یہ طے کر لیں:",
  },
];

const NIGHT_PLAN: Bilingual[] = [
  {
    en: "Who is awake tonight, and who is awake tomorrow night",
    ur: "آج رات کون جاگے گا، اور کل رات کون",
  },
  {
    en: "When that person sleeps afterwards — an actual hour, not the word later",
    ur: "وہ شخص اس کے بعد کب سوئے گا — ایک اصل وقت طے کریں، صرف یہ نہیں کہ بعد میں",
  },
  {
    en: "Who is second on the list, if the first person falls ill or has work",
    ur: "فہرست میں دوسرا کون ہے، اگر پہلا بیمار ہو جائے یا اسے کام پر جانا پڑے",
  },
  {
    en: "How many nights the family can honestly cover before someone breaks",
    ur: "گھر والے سچ مچ کتنی راتیں نکال سکتے ہیں، اس سے پہلے کہ کوئی ٹوٹ جائے",
  },
];

const NIGHT_CLOSE: Bilingual[] = [
  {
    en: "Be honest at that table. Four working people cannot cover a fortnight of nights on goodwill alone. Saying so early is not giving up — it is the difference between help you planned and a phone call you make in a panic.",
    ur: "اس بیٹھک میں سچ بولیں۔ ملازمت کرنے والے چار افراد صرف نیک نیتی کے بل پر دو ہفتوں کی راتیں نہیں نکال سکتے۔ یہ بات پہلے کہہ دینا ہار ماننا نہیں — یہ سوچے سمجھے بندوبست اور گھبراہٹ میں کی گئی کال کا فرق ہے۔",
  },
  {
    en: "And if you do arrange help for the nights, from us or from anyone, know what round-the-clock actually means: two caregivers across two 12-hour shifts. Never one person awake for 24 hours, because nobody does that well.",
    ur: "اور اگر آپ راتوں کے لیے مدد لیں، ہم سے یا کسی اور سے، تو یہ جان لیں کہ چوبیس گھنٹے کا مطلب کیا ہے: دو کیئر گیور، دو بارہ گھنٹے کی شفٹوں میں۔ ایک ہی شخص 24 گھنٹے نہیں، کیونکہ یہ کوئی بھی ٹھیک طرح نہیں کر سکتا۔",
  },
];

/* ------------------------------------------------------------------ *
 * 4. Paperwork. Filing, photographing and handing over — never what
 * the papers should say.
 * ------------------------------------------------------------------ */
const PAPERWORK: Bilingual[] = [
  {
    en: "One folder or one large envelope. Discharge summary, prescriptions, reports, receipts — all of it in there, and nothing anywhere else",
    ur: "ایک فائل یا ایک بڑا لفافہ۔ ڈسچارج سمری، نسخے، رپورٹیں، رسیدیں — سب کچھ اسی میں، کہیں اور کچھ نہیں",
  },
  {
    en: "Every page photographed on a phone, as the backup that survives a lost folder",
    ur: "ہر صفحے کی تصویر فون میں، تاکہ فائل گم بھی ہو جائے تو ریکارڈ باقی رہے",
  },
  {
    en: "Those photographs sent to one more person — a sibling, the family group — so you are not the only one holding them",
    ur: "وہ تصویریں کم از کم ایک اور فرد کو بھیج دیں — بہن بھائی یا گھر کے واٹس ایپ گروپ کو — تاکہ سب کچھ صرف آپ کے پاس نہ ہو",
  },
  {
    en: "The medicine list kept with the medicines, and a written note of what was given and at what time — handovers between family members are where records go missing",
    ur: "دواؤں کی فہرست دواؤں کے ساتھ ہی رکھیں، اور لکھتے جائیں کہ کیا دیا اور کس وقت — گھر والوں کے آپس میں ذمہ داری بدلنے پر ہی ریکارڈ ٹوٹتا ہے",
  },
  {
    en: "The follow-up date somewhere the whole house sees it — the calendar, the fridge, the family group",
    ur: "اگلے چیک اپ کی تاریخ ایسی جگہ جہاں پورا گھر دیکھے — کیلنڈر، فریج، یا گھر کا گروپ",
  },
  {
    en: "The surgeon's number and the out-of-hours number written large and stuck on the fridge — readable by anyone in the house, including someone who does not have your phone",
    ur: "سرجن کا نمبر اور رات کے وقت رابطے کا نمبر بڑا لکھ کر فریج پر لگا دیں — تاکہ گھر کا ہر فرد پڑھ سکے، چاہے اس کے پاس آپ کا فون نہ ہو",
  },
  {
    en: "The discharge summary itself kept visible, not filed away in a cupboard — it is the paper anyone will reach for first",
    ur: "ڈسچارج سمری خود کسی نظر آنے والی جگہ رکھیں، الماری میں بند نہ کریں — سب سے پہلے یہی کاغذ چاہیے ہوتا ہے",
  },
];

/* ------------------------------------------------------------------ *
 * 5. The boundary section. This is where the page says out loud that
 * it has NOT printed a warning-signs list, and why — and it is the one
 * place where what our nurse does is mentioned, in context.
 * ------------------------------------------------------------------ */
const NOT_YOURS: Bilingual[] = [
  {
    en: "You will have noticed there is no list of warning signs on this page. That is deliberate. Your discharge summary already says what to watch for in this patient, after this operation, and that beats anything a website can print. Keep the paper where everyone in the house can see it, and if anything worries you, call the surgeon's number on it. That is the right answer at three in the afternoon and it is the right answer at three in the morning.",
    ur: "آپ نے دیکھا ہو گا کہ اس صفحے پر خطرے کی علامات کی کوئی فہرست نہیں۔ یہ جان بوجھ کر ہے۔ آپ کی ڈسچارج سمری پہلے ہی بتاتی ہے کہ اِس مریض میں، اِس آپریشن کے بعد، کن باتوں پر نظر رکھنی ہے — اور یہ کسی بھی ویب سائٹ کی لکھی فہرست سے بہتر ہے۔ وہ کاغذ ایسی جگہ رکھیں جہاں گھر کا ہر فرد دیکھ سکے، اور کوئی بات پریشان کرے تو اُسی پر لکھا سرجن کا نمبر ملائیں۔ یہ جواب دن کے تین بجے بھی درست ہے اور رات کے تین بجے بھی۔",
  },
  {
    en: "The same holds for the dressing, the drip and the medicines. Learning wound care from a video, or settling a dose between family members, is how avoidable trouble begins. If the paper says one thing and the house believes another, the paper wins — and if the paper is unclear, the surgeon settles it, not the internet and not us.",
    ur: "یہی بات ڈریسنگ، ڈرپ اور دواؤں پر بھی لاگو ہوتی ہے۔ ویڈیو دیکھ کر زخم کی دیکھ بھال سیکھنا، یا گھر والوں کا آپس میں خوراک طے کر لینا — مسائل یہیں سے شروع ہوتے ہیں۔ اگر کاغذ کچھ کہہ رہا ہے اور گھر والوں کی رائے مختلف ہے تو کاغذ کی بات مانیں — اور کاغذ پر بات واضح نہ ہو تو فیصلہ سرجن کرے گا، انٹرنیٹ نہیں اور ہم بھی نہیں۔",
  },
];

// The single, in-context mention of what we do. Every task named here is
// already published verbatim on /services/qualified-nurse and
// /services/post-operative-care — nothing new is claimed. Care formats are the
// CARE_FORMATS facts (single visit / 12-hour shift). ICU step-down only.
const NURSE_CAN: Bilingual = {
  en: "This is the part a trained nurse is for. A PNC-registered Qualified Nurse can clean a wound and change a dressing, give injections and drips on the doctor's prescription, check and write down vitals, look after a catheter or a feeding tube on the doctor's plan, and give the prescribed medicines — following your surgeon's after-care plan, never a plan of ours. If one dressing change is the only gap, a nurse can come for a single visit and leave; if the nights are the problem, that is a 12-hour shift. We also take patients home after a stay in ICU or HDU, which is called step-down care.",
  ur: "یہی وہ کام ہے جس کے لیے تربیت یافتہ نرس ہوتی ہے۔ PNC رجسٹرڈ نرس زخم صاف کر کے ڈریسنگ بدل سکتی ہے، ڈاکٹر کے نسخے کے مطابق انجیکشن اور ڈرپ لگا سکتی ہے، طبی علامات چیک کر کے لکھ سکتی ہے، ڈاکٹر کے پلان کے مطابق کیتھیٹر یا کھانے والی ٹیوب سنبھال سکتی ہے، اور تجویز کردہ دوائیں دے سکتی ہے — یہ سب آپ کے سرجن کی ہدایات کے مطابق، اپنی مرضی سے کبھی نہیں۔ اگر کمی صرف ایک ڈریسنگ کی ہے تو نرس ایک وزٹ کے لیے آ کر چلی جاتی ہے؛ اگر مشکل راتوں کی ہے تو وہ 12 گھنٹے کی شفٹ ہے۔ آئی سی یو یا ایچ ڈی یو سے گھر آنے والے مریض کی دیکھ بھال بھی ہم کرتے ہیں، جسے سٹیپ ڈاؤن کیئر کہتے ہیں۔",
};

/* ------------------------------------------------------------------ *
 * FAQ — mirrored byte-for-byte into the FAQPage JSON-LD below. Q2
 * carries the Roman Urdu families actually type. Q3 is the safe answer
 * to the question this page most often gets asked: it routes back to
 * the discharge summary and the surgeon, and prints no symptom list.
 * ------------------------------------------------------------------ */
const GUIDE_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "What should I ask the doctor before we take the patient home?",
    qUr: "مریض کو گھر لے جانے سے پہلے ڈاکٹر سے کیا پوچھنا چاہیے؟",
    a: "Four things, at minimum: when the next follow-up is, who to call out of hours, what the patient is and is not allowed to do at home, and when the dressing is next due to be changed. Take the discharge summary and the written instructions in your hand before you leave the ward, and ask a nurse to explain in plain Urdu anything on the paper you cannot read. Once you are in the car, the same question takes three phone calls.",
    aUr: "کم از کم چار باتیں: اگلا چیک اپ کب ہے، رات یا چھٹی کے وقت کس کو کال کرنی ہے، مریض گھر پر کیا کر سکتا ہے اور کیا نہیں، اور اگلی ڈریسنگ کب بدلنی ہے۔ ڈسچارج سمری اور لکھی ہوئی ہدایات وارڈ سے نکلنے سے پہلے ہاتھ میں لے لیں، اور کاغذ پر جو بات سمجھ نہ آئے وہ نرس سے سادہ اردو میں پوچھ لیں۔ گاڑی میں بیٹھنے کے بعد یہی سوال پوچھنے میں تین فون کال لگ جاتی ہیں۔",
  },
  {
    q: "Operation ke baad ghar par kya tayari karni chahiye? What do we prepare at home?",
    qUr: "آپریشن کے بعد گھر پر کیا تیاری کرنی چاہیے؟",
    a: "Three things, and together they take about half an hour. The room: a bed reachable from both sides, a clear path to the bathroom, a light that works from the bed, and one single place where all the medicines live. The papers: one folder, photographed on a phone, with the follow-up date and the doctor's number stuck on the fridge. The nights: decide who is awake on which night before the patient is home, not after.",
    aUr: "تین کام، اور سب مل کر تقریباً آدھا گھنٹہ لیتے ہیں۔ کمرہ: بستر جس تک دونوں طرف سے پہنچا جا سکے، باتھ روم تک صاف راستہ، ایسی روشنی جو بستر سے جلے، اور ایک ہی جگہ جہاں ساری دوائیں ہوں۔ کاغذات: ایک فائل، جس کی تصویر فون میں ہو، اور چیک اپ کی تاریخ اور ڈاکٹر کا نمبر فریج پر لگا ہو۔ راتیں: کون سی رات کون جاگے گا، یہ مریض کے گھر آنے سے پہلے طے کر لیں، بعد میں نہیں۔",
  },
  {
    q: "How do I know if something is going wrong after surgery?",
    qUr: "آپریشن کے بعد کچھ غلط ہو رہا ہو تو کیسے پتہ چلے؟",
    a: "We are not your treating doctor, so we will not print a list of symptoms here, and no website should. Your discharge summary lists what to watch for in this patient — keep it where everyone can see it, and call the surgeon's number on it if anything worries you, at any hour. If it feels like an emergency, the hospital comes first, always.",
    aUr: "ہم آپ کے علاج کرنے والے ڈاکٹر نہیں، اس لیے ہم یہاں علامات کی کوئی فہرست نہیں لکھیں گے — اور کسی ویب سائٹ کو نہیں لکھنی چاہیے۔ آپ کی ڈسچارج سمری بتاتی ہے کہ اِس مریض میں کن باتوں پر نظر رکھنی ہے؛ وہ کاغذ ایسی جگہ رکھیں جہاں سب دیکھ سکیں، اور کوئی بات پریشان کرے تو اُسی پر لکھا سرجن کا نمبر ملائیں، وقت جو بھی ہو۔ ایمرجنسی لگے تو پہلے ہسپتال — ہمیشہ۔",
  },
  {
    q: "Do we need a nurse at home after discharge, or can the family manage?",
    qUr: "ڈسچارج کے بعد گھر پر نرس کی ضرورت ہے یا گھر والے خود سنبھال سکتے ہیں؟",
    a: `Many families manage, and we say so plainly. Two questions usually settle it. First: is there a clinical task written on the paper — a dressing, an injection, a drip — that nobody at home can do? If that is the only gap, a nurse can come for a single visit instead of a full shift. Second: can the family really cover the nights for as long as this will take? If the answer to that one is no, arrange care after discharge before the third night, not after it. Either way: ${PROMISES.priceOnCall.en} ${PROMISES.trial.en}`,
    aUr: `بہت سے گھرانے خود سنبھال لیتے ہیں، اور ہم یہ صاف کہتے ہیں۔ دو سوال عام طور پر فیصلہ کر دیتے ہیں۔ پہلا: کیا کاغذ پر کوئی ایسا طبی کام لکھا ہے — ڈریسنگ، انجیکشن یا ڈرپ — جو گھر میں کوئی نہیں کر سکتا؟ اگر کمی صرف یہی ہے تو نرس پوری شفٹ کے بجائے ایک وزٹ کے لیے آ سکتی ہے۔ دوسرا: جتنے دن یہ سلسلہ چلے گا، کیا گھر والے واقعی اتنی راتیں نکال سکتے ہیں؟ اگر جواب نہیں ہے تو تیسری رات سے پہلے بندوبست کر لیں، بعد میں نہیں۔ دونوں صورتوں میں: ${PROMISES.priceOnCall.ur} ${PROMISES.trial.ur}`,
  },
];

/* ------------------------------------------------------------------ *
 * Soft close — the three pages this guide supports, then CtaBanner.
 * ------------------------------------------------------------------ */
const CLOSE_LINKS: { href: string; label: Bilingual }[] = [
  {
    href: "/services/post-operative-care",
    label: {
      en: "Post-operative care at home",
      ur: "گھر پر آپریشن کے بعد کی دیکھ بھال",
    },
  },
  {
    href: "/services/qualified-nurse",
    label: {
      en: "What a qualified nurse does",
      ur: "PNC رجسٹرڈ نرس کیا کرتی ہے",
    },
  },
  {
    href: "/charges",
    label: { en: "How charges work", ur: "چارجز کیسے طے ہوتے ہیں" },
  },
  {
    href: "/guides",
    label: { en: "All guides", ur: "تمام رہنمائی" },
  },
];

const CLOSE_PROMISES: Bilingual[] = [CALLBACK_PROMISE, START_PROMISE, PROMISES.trial];

/* ------------------------------------------------------------------ *
 * JSON-LD.
 *
 * NOTE: datePublished and dateModified are deliberately absent. Both are
 * optional for Article, and inventing a date would be a fabricated fact on a
 * site whose whole position is that nothing on it is invented (NORTH-STAR §3).
 * Add them only when a real publication date is recorded.
 *
 * No price, priceRange, priceCurrency or priceSpecification anywhere in this
 * graph (Decision Ledger #9).
 * ------------------------------------------------------------------ */
const PUBLISHER = {
  "@type": "Organization",
  name: "Sehat Connect",
  url: SITE_URL,
  telephone: CONTACT_PHONE_TEL,
  email: CONTACT_EMAIL,
  address: OFFICE_POSTAL_ADDRESS,
  sameAs: businessSameAs(),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: HEADLINE,
  description: DESCRIPTION,
  inLanguage: "en",
  author: PUBLISHER,
  publisher: PUBLISHER,
  url: `${SITE_URL}${PATH}`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}${PATH}`,
  },
  about: {
    "@type": "Thing",
    name: "Preparing a home for a patient discharged after surgery",
  },
  audience: { "@type": "Audience", audienceType: "Families arranging care at home in Lahore" },
};

const breadcrumbs = breadcrumbList([
  { name: "Guides", path: "/guides" },
  { name: "After surgery: a checklist" },
]);

// Mirrors the on-page FAQ exactly — Google requires the schema and the
// rendered content to match.
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
 * Shared inline styles — the same card language as /charges, /about and
 * the service pages. No new CSS: direction6.css is not touched.
 * ------------------------------------------------------------------ */
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

function Paras({ items, style }: { items: Bilingual[]; style?: CSSProperties }) {
  return (
    <>
      {items.map((p, i) => (
        <p key={p.en} style={{ ...BODY, ...style, marginTop: i === 0 ? 0 : 16 }}>
          <span data-en>{p.en}</span>
          <span data-ur className="urdu">{p.ur}</span>
        </p>
      ))}
    </>
  );
}

export default function PostOperativeCareChecklistPage() {
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
          {/* ---- hero: the primary phrase in the H1, no form. This is a
                  guide, not a landing page — the ask comes at the end. ---- */}
          <section className="hero">
            <div className="wrap">
              <div className="hero-copy">
                <span className="eyebrow eyebrow-plain">
                  <span data-en>Guide &middot; discharge day</span>
                  <span data-ur className="urdu">رہنمائی &middot; ڈسچارج والا دن</span>
                </span>

                <h1>
                  <span data-en>
                    Bringing someone home after surgery: a{" "}
                    <span className="hl">post-operative care checklist</span>
                  </span>
                  <span data-ur className="urdu">
                    آپریشن کے بعد کسی کو گھر لانا: <span className="hl">تیاری کی چیک لسٹ</span>
                  </span>
                </h1>

                <p className="hero-sub">
                  <span data-en>
                    What to ask before you leave the hospital, how to set the room up, how to get
                    through the first nights, and how to keep the papers straight. Print it or keep
                    it open on your phone &mdash; it is meant for the fridge door, not for one read.
                  </span>
                  <span data-ur className="urdu">
                    ہسپتال سے نکلنے سے پہلے کیا پوچھنا ہے، کمرہ کیسے تیار کرنا ہے، پہلی راتیں کیسے
                    نکالنی ہیں، اور کاغذات کیسے سنبھالنے ہیں۔ اسے پرنٹ کر لیں یا فون پر کھلا رکھیں
                    &mdash; یہ ایک بار پڑھنے کے لیے نہیں، فریج پر لگانے کے لیے ہے۔
                  </span>
                </p>

                <div className="hero-trust">
                  <span className="pill">
                    <span data-en>Preparation, not medical advice</span>
                    <span data-ur className="urdu">تیاری، طبی مشورہ نہیں</span>
                  </span>
                  <span className="pill">
                    <span data-en>Written for families, not for doctors</span>
                    <span data-ur className="urdu">گھر والوں کے لیے، ڈاکٹروں کے لیے نہیں</span>
                  </span>
                  <span className="pill">
                    <span data-en>Useful whether or not you call us</span>
                    <span data-ur className="urdu">کال کریں یا نہ کریں، کام کی بات</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ---- opening + the scope honesty label ---- */}
          <section className="block" style={{ paddingTop: 8 }}>
            <div className="wrap">
              <div style={{ ...CARD, paddingLeft: 30, position: "relative", overflow: "hidden" }}>
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                />
                <Paras items={INTRO} />
                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 18,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--teal-deep)",
                    lineHeight: 1.6,
                  }}
                >
                  <span data-en>{SCOPE_NOTE.en}</span>
                  <span data-ur className="urdu">{SCOPE_NOTE.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- 1. Before you leave the hospital ---- */}
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
                  <span data-en>1 &middot; Before you leave the hospital</span>
                  <span data-ur className="urdu">1 &middot; ہسپتال سے نکلنے سے پہلے</span>
                </span>
                <h2>
                  <span data-en>Ask while the people who know are still in front of you.</span>
                  <span data-ur className="urdu">جو لوگ سب جانتے ہیں، جب تک وہ سامنے ہیں، تب ہی پوچھ لیں۔</span>
                </h2>
                <p>
                  <span data-en>
                    None of this needs medical knowledge. All of it needs you to still be standing in
                    the ward.
                  </span>
                  <span data-ur className="urdu">
                    ان میں سے کسی بات کے لیے طبی علم کی ضرورت نہیں، صرف وارڈ میں موجود ہونے کی ضرورت ہے۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                <TickList items={BEFORE_LEAVING} />
                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 17,
                    color: "var(--ink-soft)",
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  <span data-en>{BEFORE_LEAVING_NOTE.en}</span>
                  <span data-ur className="urdu">{BEFORE_LEAVING_NOTE.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- 2. The room ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>2 &middot; The room, before they arrive</span>
                  <span data-ur className="urdu">2 &middot; کمرہ، ان کے پہنچنے سے پہلے</span>
                </span>
                <h2>
                  <span data-en>Half an hour of moving furniture saves a difficult week.</span>
                  <span data-ur className="urdu">آدھے گھنٹے میں فرنیچر ٹھیک کر لیں تو پورا ہفتہ آسان ہو جاتا ہے۔</span>
                </h2>
                <p>
                  <span data-en>
                    Do this before the car reaches the gate &mdash; not with the patient standing in
                    the doorway.
                  </span>
                  <span data-ur className="urdu">
                    یہ کام گاڑی کے گیٹ پر پہنچنے سے پہلے کر لیں &mdash; نہ کہ جب مریض دروازے میں کھڑا ہو۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                <TickList items={THE_ROOM} />
              </div>
            </div>
          </section>

          {/* ---- 3. The first night ---- */}
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
                  <span data-en>3 &middot; The first night</span>
                  <span data-ur className="urdu">3 &middot; پہلی رات</span>
                </span>
                <h2>
                  <span data-en>Decide the nights out loud, before the patient is home.</span>
                  <span data-ur className="urdu">راتوں کا فیصلہ مریض کے گھر آنے سے پہلے، سب کے سامنے کر لیں۔</span>
                </h2>
              </div>

              <div style={CARD}>
                <Paras items={FIRST_NIGHT} />
                <div style={{ marginTop: 18 }}>
                  <TickList items={NIGHT_PLAN} />
                </div>
                <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px dashed var(--line)" }}>
                  <Paras items={NIGHT_CLOSE} style={{ fontSize: 17 }} />
                </div>
              </div>
            </div>
          </section>

          {/* ---- 4. Paperwork ---- */}
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>4 &middot; Keeping the paperwork straight</span>
                  <span data-ur className="urdu">4 &middot; کاغذات سنبھال کر رکھنا</span>
                </span>
                <h2>
                  <span data-en>One folder, one set of photographs, one place on the wall.</span>
                  <span data-ur className="urdu">ایک فائل، تصویروں کا ایک سیٹ، اور دیوار پر ایک جگہ۔</span>
                </h2>
                <p>
                  <span data-en>
                    Most of the confusion in the first week is not medical. It is two people in one
                    house working from two different pieces of paper.
                  </span>
                  <span data-ur className="urdu">
                    پہلے ہفتے کی زیادہ تر الجھن طبی نہیں ہوتی۔ وہ یہ ہوتی ہے کہ ایک ہی گھر کے دو افراد
                    الگ الگ کاغذ دیکھ کر کام کر رہے ہوتے ہیں۔
                  </span>
                </p>
              </div>

              <div style={CARD}>
                <TickList items={PAPERWORK} />
              </div>
            </div>
          </section>

          {/* ---- 5. The boundary: what is not yours to judge ---- */}
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
                  <span data-en>5 &middot; What you should not try to judge yourself</span>
                  <span data-ur className="urdu">5 &middot; کن باتوں کا فیصلہ خود نہ کریں</span>
                </span>
                <h2>
                  <span data-en>
                    The wound, the medicines and the warning signs belong to the surgeon.
                  </span>
                  <span data-ur className="urdu">
                    زخم، دوائیں اور خطرے کی علامات — یہ سب سرجن کا معاملہ ہیں۔
                  </span>
                </h2>
              </div>

              <div style={CARD}>
                <Paras items={NOT_YOURS} />
                <p
                  style={{
                    marginTop: 20,
                    paddingTop: 18,
                    borderTop: "1px dashed var(--line)",
                    fontSize: 17,
                    color: "var(--ink-soft)",
                    fontWeight: 600,
                    lineHeight: 1.65,
                  }}
                >
                  <span data-en>{NURSE_CAN.en}</span>
                  <span data-ur className="urdu">{NURSE_CAN.ur}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="guide-faq">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>Questions families ask on discharge day</span>
                  <span data-ur className="urdu">ڈسچارج والے دن پوچھے جانے والے سوال</span>
                </span>
                <h2>
                  <span data-en>Straight answers, and one we will not give.</span>
                  <span data-ur className="urdu">سیدھے جواب، اور ایک جو ہم نہیں دیں گے۔</span>
                </h2>
              </div>

              <div className="faq-list">
                {GUIDE_FAQ.map((item) => (
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

          {/* ---- soft close: the pages this guide supports ---- */}
          <section className="block" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head">
                <h2>
                  <span data-en>If a nurse at home would help</span>
                  <span data-ur className="urdu">اگر گھر پر نرس سے مدد ہو سکتی ہے</span>
                </h2>
                <p>
                  <span data-en>
                    This checklist works whether or not you ever call us. If you do want a hand, these
                    pages say exactly what that involves &mdash; and what it does not.
                  </span>
                  <span data-ur className="urdu">
                    یہ چیک لسٹ آپ کے کام کی ہے، چاہے آپ ہمیں کبھی کال کریں یا نہ کریں۔ اگر مدد چاہیے ہو تو
                    ان صفحات پر لکھا ہے کہ اس میں کیا شامل ہے &mdash; اور کیا نہیں۔
                  </span>
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
                {CLOSE_LINKS.map((l) => (
                  <Link className="btn btn-ghost" href={l.href} key={l.href}>
                    <span data-en>{l.label.en}</span>
                    <span data-ur className="urdu">{l.label.ur}</span>
                  </Link>
                ))}
              </div>

              <div style={CARD}>
                <TickList items={CLOSE_PROMISES} />
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
