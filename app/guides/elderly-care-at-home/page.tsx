// /guides/elderly-care-at-home — "Elderly care at home in Lahore: what to expect".
//
// This is a GUIDE, not a landing page (NORTH-STAR §12: one honest guide a month,
// written from ops experience, "zero AI-filler pages"). The test it has to pass is
// that it is genuinely useful to a family who never calls us.
//
// It deliberately does NOT re-run /services/elderly-care. That page sells the
// service and answers "nurse or attendant?" with situations, an hour-by-hour day,
// the care formats and the verification artifacts. This page covers what that page
// cannot: the practical, social experience of bringing a stranger into your home to
// look after a parent — the awkward first day, resistance and dignity, the boundary
// of what a caregiver is and is not there for, dividing the work instead of handing
// it over, nights, how the arrangement ages, and arranging it all from abroad.
//
// HARD CONSTRAINTS held here:
//   1. NO PRICE anywhere — copy, meta or JSON-LD (Decision Ledger #9). The
//      do-not-render PRICES constant is deliberately NOT imported.
//   2. Promise strings are imported VERBATIM from lib/constants.ts (NORTH-STAR §3).
//      "usually" in the callback promise is mandatory.
//   3. No physiotherapy / rehabilitation / therapy language (Ledger #15); no
//      ventilator or tracheostomy (Ledger #16).
//   4. Nothing invented: no statistics, no research, no fabricated customer story.
//      Illustrations stay explicitly general ("families often find...").
//   5. Dementia is described only by its practical effect on the daily routine —
//      never symptoms, stages or progression. That is medical territory.
//   6. Every English user-facing string carries an Urdu counterpart (§5).
//   7. No new CSS — .d6 classes and inline styles only; app/direction6.css untouched.
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import CtaBanner from "@/components/home/CtaBanner";
import {
  SITE_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  OFFICE_POSTAL_ADDRESS,
  PROMISES,
  CALLBACK_PROMISE,
  VERIFICATION_PROMISE,
} from "@/lib/constants";
import { breadcrumbList, businessSameAs, OPENING_HOURS } from "@/lib/schema";
import { waLink, serviceWaMsg } from "@/lib/wa";

const PATH = "/guides/elderly-care-at-home";

const HEADLINE = "Elderly care at home in Lahore: what to expect";

const DESCRIPTION =
  "What to expect when elderly care starts at home in Lahore: the first day, how long a parent takes to accept help, what an attendant does and does not do, why nights are hardest, and arranging care from abroad.";

export const metadata: Metadata = {
  title: "Elderly Care at Home: What to Expect",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const WA_MSG = serviceWaMsg("buzurg walidain ke liye attendant ya nurse");

type Bilingual = { en: string; ur: string };

/* ================================================================== *
 * 1. The first day
 * ================================================================== */
const FIRST_DAY_INTRO: Bilingual[] = [
  {
    en: "A stranger walks into a house where somebody is unwell, and everybody performs a little. Your mother is polite in a way she is not usually polite. You hover. The attendant, who has done this in many houses, is still working out where to sit, where to stand, whether to eat here, what you want touched and what you do not. Expect the first day to feel like that, and do not read too much into it.",
    ur: "ایک اجنبی ایسے گھر میں آتا ہے جہاں کوئی بیمار ہے، اور سب لوگ کچھ نہ کچھ تکلف کرتے ہیں۔ آپ کی والدہ اُس انداز میں مہذب ہو جاتی ہیں جس انداز میں وہ عام طور پر نہیں ہوتیں۔ آپ بار بار کمرے میں جھانکتے ہیں۔ اور اٹینڈنٹ، جو کئی گھروں میں یہ کام کر چکا ہے، پھر بھی سوچ رہا ہوتا ہے کہ کہاں بیٹھے، کہاں کھڑا ہو، کھانا یہاں کھائے یا نہیں، کس چیز کو ہاتھ لگانا ہے اور کس کو نہیں۔ پہلا دن ایسا ہی ہوتا ہے، اور اس سے زیادہ نتیجہ نہ نکالیں۔",
  },
  {
    en: "Almost nothing about day one tells you whether the arrangement will work. Less gets done than you expected, because most of the day goes in two people getting used to each other. Judge it on the third or fourth day.",
    ur: "پہلے دن سے یہ اندازہ تقریباً نہیں ہوتا کہ یہ بندوبست چلے گا یا نہیں۔ کام آپ کی توقع سے کم ہوتا ہے، کیونکہ دن کا بڑا حصہ دو لوگوں کے ایک دوسرے سے مانوس ہونے میں جاتا ہے۔ فیصلہ تیسرے یا چوتھے دن کریں۔",
  },
];

const FIRST_DAY_HELPS: Bilingual[] = [
  {
    en: "Tell your parent a day before, in plain words, who is coming and why. Being surprised by a stranger is the part older people resent most.",
    ur: "ایک دن پہلے اپنے والد یا والدہ کو صاف الفاظ میں بتا دیں کہ کون آ رہا ہے اور کیوں۔ اجنبی کا اچانک آ جانا وہ بات ہے جو بزرگوں کو سب سے زیادہ بری لگتی ہے۔",
  },
  {
    en: "Be at home for the first hour or two if you can, and then leave. Staying all day keeps everyone performing for each other.",
    ur: "ہو سکے تو پہلے ایک دو گھنٹے گھر پر رہیں، اور پھر چلے جائیں۔ سارا دن موجود رہیں گے تو سب ایک دوسرے کے سامنے تکلف ہی کرتے رہیں گے۔",
  },
  {
    en: "Walk the caregiver through the house once: the bathroom, the water, where your parent's things are kept, where they can sit and where they can eat.",
    ur: "ایک بار گھر دکھا دیں: باتھ روم، پانی، والد یا والدہ کا سامان کہاں رکھا ہے، اور یہ کہ وہ خود کہاں بیٹھ سکتے ہیں اور کہاں کھانا کھا سکتے ہیں۔",
  },
  {
    en: "Hand over the medicines already sorted for the day, and say out loud what is given at what time. Nobody should be working that out from a bag of strips.",
    ur: "دن کی دوائیں پہلے سے الگ کر کے حوالے کریں، اور زبانی بتا دیں کہ کون سی دوا کس وقت دینی ہے۔ کسی کو دواؤں کے تھیلے میں سے خود اندازہ نہیں لگانا چاہیے۔",
  },
  {
    en: "Say what your parent dislikes. \"He does not like being helped in the bathroom.\" \"She will not eat if she is hurried.\" One sentence like that saves a week.",
    ur: "یہ بھی بتا دیں کہ آپ کے والد یا والدہ کو کیا ناپسند ہے۔ ”انہیں باتھ روم میں مدد لینا اچھا نہیں لگتا۔“ ”جلدی مچائیں تو وہ کھانا نہیں کھائیں گی۔“ ایسا ایک جملہ پورا ہفتہ بچا دیتا ہے۔",
  },
  {
    en: "Introduce the caregiver by name, to your parent, and then use the name all day yourself. A person with a name is much harder to resent than \"the attendant\".",
    ur: "اٹینڈنٹ کا نام لے کر والد یا والدہ سے تعارف کروائیں، اور پھر سارا دن خود بھی نام ہی لیں۔ جس شخص کا نام معلوم ہو، اس سے چڑنا ”اٹینڈنٹ“ کے مقابلے میں بہت مشکل ہوتا ہے۔",
  },
];

/* ================================================================== *
 * 2. Resistance
 * ================================================================== */
const RESISTANCE_INTRO: Bilingual[] = [
  {
    en: "Many older people experience accepting help as losing something rather than gaining it. Someone who ran a household, or a business, or raised six children is now being helped to the bathroom by a person half their age. Refusal is usually about that. It is rarely about the person who arrived, and it is not a sign that you have done something wrong.",
    ur: "بہت سے بزرگ مدد قبول کرنے کو کچھ ملنے کے بجائے کچھ چھن جانے کے طور پر محسوس کرتے ہیں۔ جس شخص نے پورا گھر چلایا، یا کاروبار سنبھالا، یا چھ بچے پالے، وہ اب اپنے سے آدھی عمر کے کسی فرد کے سہارے باتھ روم تک جا رہا ہے۔ انکار عموماً اسی بات کا ہوتا ہے۔ آنے والے شخص کا اس میں کم ہی قصور ہوتا ہے، اور یہ اس بات کی علامت بھی نہیں کہ آپ نے کچھ غلط کیا ہے۔",
  },
];

const RESISTANCE_HELPS: Bilingual[] = [
  {
    en: "Start smaller than you think you need — one day shift, not a permanent arrangement announced as permanent.",
    ur: "ضرورت سے چھوٹی شروعات کریں — صرف ایک دن کی شفٹ، نہ کہ ایسا مستقل بندوبست جسے مستقل کہہ کر شروع کیا جائے۔",
  },
  {
    en: "Let the first hours be sitting and talking rather than bathing and lifting. The hands-on work is easier once there is a face attached to it.",
    ur: "شروع کے گھنٹے نہلانے اور اٹھانے کے بجائے بیٹھنے اور بات چیت کے رکھیں۔ جب چہرہ مانوس ہو جائے تو ہاتھ لگانے والا کام آسان ہو جاتا ہے۔",
  },
  {
    en: "Leave your parent something to decide: which chair, when tea comes, whether the door stays open. Independence lost in large ways is easier to carry when some of it is handed back in small ones.",
    ur: "کچھ فیصلے والد یا والدہ کے پاس رہنے دیں: کون سی کرسی، چائے کب آئے گی، دروازہ کھلا رہے گا یا نہیں۔ بڑی خودمختاری جانے کا دکھ تب کم ہوتا ہے جب چھوٹی چھوٹی باتوں میں اختیار واپس مل جائے۔",
  },
  {
    en: "Do not argue about whether they need help. You will lose, and the argument turns a practical arrangement into a fight about getting old.",
    ur: "اس بات پر بحث نہ کریں کہ انہیں مدد کی ضرورت ہے یا نہیں۔ آپ ہار جائیں گے، اور بحث ایک عملی بندوبست کو بڑھاپے پر جھگڑے میں بدل دیتی ہے۔",
  },
  {
    en: "Give it a week before you conclude anything, unless something is actually wrong.",
    ur: "جب تک واقعی کوئی مسئلہ نہ ہو، ایک ہفتے سے پہلے کوئی نتیجہ نہ نکالیں۔",
  },
];

const RESISTANCE_OUTRO: Bilingual[] = [
  {
    en: "Some parents settle in two days. Some grumble for a month and then ask where the attendant is on their day off. And sometimes the person genuinely does not suit your parent — the wrong fit is a small thing to change, not a failure of the whole idea.",
    ur: "کچھ بزرگ دو دن میں مان جاتے ہیں۔ کچھ مہینہ بھر شکایت کرتے ہیں اور پھر چھٹی والے دن پوچھتے ہیں کہ اٹینڈنٹ کہاں ہے۔ اور کبھی واقعی وہ فرد آپ کے والد یا والدہ کے لیے مناسب نہیں ہوتا — غلط جوڑ بدلنا ایک چھوٹی سی بات ہے، پورے خیال کی ناکامی نہیں۔",
  },
];

/* ================================================================== *
 * 3. The boundary — what a caregiver is and is not there for.
 *
 * Every "does" line maps to work the site already claims (ATTENDANT_SERVICES:
 * feeding, hygiene, movement, companionship, night duty). The "does not" list
 * claims nothing new — it states the absence of claims we have never made.
 * ================================================================== */
const DOES: Bilingual[] = [
  {
    en: "Helping your parent eat and drink, at your parent's pace",
    ur: "کھانے پینے میں مدد، آپ کے والد یا والدہ کی رفتار سے",
  },
  {
    en: "Bathing, changing clothes, toilet help, and keeping them clean and comfortable",
    ur: "نہلانا، کپڑے بدلوانا، بیت الخلا میں مدد، اور صفائی و آرام کا خیال",
  },
  {
    en: "Helping them get up, walk with support, or turn and change position if they cannot walk",
    ur: "اٹھنے میں مدد، سہارے کے ساتھ چلنا، اور اگر چل نہ سکتے ہوں تو کروٹ اور پوزیشن بدلوانا",
  },
  {
    en: "Giving, at the right time, the medicines you have sorted and handed over",
    ur: "وہ دوائیں وقت پر دینا جو آپ نے پہلے سے الگ کر کے حوالے کی ہوں",
  },
  {
    en: "Sitting with them. Company is part of the work, not the gap between tasks",
    ur: "ان کے پاس بیٹھنا۔ ساتھ دینا بھی کام ہی ہے، کاموں کے درمیان خالی وقت نہیں",
  },
  {
    en: "Staying awake through a night shift so that the household can sleep",
    ur: "رات کی شفٹ میں جاگتے رہنا تاکہ گھر والے سو سکیں",
  },
];

const DOES_NOT: Bilingual[] = [
  {
    en: "Cooking for the household, washing the dishes, cleaning the house or doing the family's laundry",
    ur: "پورے گھر کا کھانا پکانا، برتن دھونا، گھر کی صفائی یا گھر والوں کے کپڑے دھونا",
  },
  {
    en: "Shopping, errands, dropping children, answering the gate",
    ur: "بازار کے کام، سودا سلف، بچوں کو چھوڑنا، یا گیٹ کھولنا",
  },
  {
    en: "Clinical work, if the person is an attendant and not a nurse — injections, drips and dressings belong to a Qualified Nurse",
    ur: "طبی کام، اگر آنے والا فرد اٹینڈنٹ ہے نرس نہیں — انجیکشن، ڈرپ اور ڈریسنگ PNC رجسٹرڈ نرس کا کام ہے",
  },
  {
    en: "Staying on past the end of a shift because the next person is late. Call us instead and we sort it out",
    ur: "اگلی شفٹ والے کی تاخیر پر اپنی شفٹ سے آگے رکنا۔ ایسی صورت میں ہمیں کال کریں، ہم بندوبست کر دیتے ہیں",
  },
];

const BOUNDARY_INTRO: Bilingual[] = [
  {
    en: "This is the most common misunderstanding in this whole category, and it is worth being plain about, because getting it wrong quietly ruins arrangements that were working. An attendant is there for one person: your patient.",
    ur: "اس پورے شعبے میں سب سے عام غلط فہمی یہی ہے، اور اس پر صاف بات کرنا ضروری ہے، کیونکہ یہی بات خاموشی سے اچھے بھلے بندوبست کو خراب کر دیتی ہے۔ اٹینڈنٹ ایک ہی فرد کے لیے آتا ہے: آپ کے مریض کے لیے۔",
  },
];

const BOUNDARY_OUTRO: Bilingual[] = [
  {
    en: "None of this is about being difficult. Someone who has spent the morning cleaning a kitchen is not fresh for the hour when your father needs help to the bathroom, and a caregiver who is treated as household staff quietly stops being a caregiver. Saying the boundary out loud in the first week protects your parent and the person looking after them, both.",
    ur: "یہ کوئی سخت گیری نہیں ہے۔ جس شخص کی صبح باورچی خانہ صاف کرنے میں گزری ہو، وہ اُس وقت تازہ دم نہیں ہوتا جب آپ کے والد کو باتھ روم تک مدد چاہیے ہوتی ہے؛ اور جس کیئر گیور کو گھریلو ملازم سمجھ لیا جائے، وہ خاموشی سے کیئر گیور رہنا چھوڑ دیتا ہے۔ پہلے ہفتے میں یہ حد صاف بتا دینا آپ کے والد یا والدہ اور دیکھ بھال کرنے والے، دونوں کے حق میں ہے۔",
  },
  {
    en: "If the household also needs domestic help, that is a separate person and a separate arrangement. Tell us what you need on the call and we will say plainly what we do and do not provide, rather than sending one person to do two jobs badly.",
    ur: "اگر گھر کو گھریلو مدد بھی چاہیے تو وہ الگ فرد اور الگ بندوبست ہے۔ کال پر بتا دیں کہ آپ کو کیا چاہیے؛ ہم صاف بتا دیں گے کہ ہم کیا فراہم کرتے ہیں اور کیا نہیں — ایک فرد سے دو کام آدھے ادھورے کروانے سے بہتر یہی ہے۔",
  },
];

/* ================================================================== *
 * 4. Dividing the work
 * ================================================================== */
const STAYS_YOURS: Bilingual[] = [
  {
    en: "Doctors and decisions — appointments, tests, and what happens next",
    ur: "ڈاکٹر اور فیصلے — اپائنٹمنٹ، ٹیسٹ، اور اگلا قدم کیا ہو گا",
  },
  {
    en: "The medicines themselves: buying them, sorting them, and saying what is given when. Nobody should be improvising doses in your kitchen",
    ur: "دوائیں خود: خریدنا، الگ کرنا، اور بتانا کہ کون سی کب دینی ہے۔ کسی کو آپ کے گھر میں اپنی مرضی سے خوراک طے نہیں کرنی چاہیے",
  },
  {
    en: "Money, and anything that involves your parent's documents or cards",
    ur: "پیسے، اور ہر وہ معاملہ جس میں والد یا والدہ کے کاغذات یا کارڈ شامل ہوں",
  },
  {
    en: "Visiting. Decide with your family, in advance, who comes on which day — otherwise it quietly slides once someone is being paid to be there",
    ur: "ملنے آنا۔ گھر والے پہلے سے طے کر لیں کہ کون کس دن آئے گا — ورنہ جب کوئی تنخواہ پر موجود ہو تو یہ سلسلہ خاموشی سے کم ہوتا چلا جاتا ہے",
  },
  {
    en: "Deciding when the arrangement needs to change",
    ur: "یہ طے کرنا کہ بندوبست کب بدلنا چاہیے",
  },
];

const BECOMES_THEIRS: Bilingual[] = [
  {
    en: "The hands-on daily work, hour by hour",
    ur: "روزمرہ کا ہاتھ سے کیا جانے والا کام، گھنٹہ بہ گھنٹہ",
  },
  {
    en: "Watching, and telling you plainly what they saw",
    ur: "نظر رکھنا، اور جو دیکھا وہ صاف صاف آپ کو بتا دینا",
  },
  {
    en: "The hours you cannot cover — the working day, or the night",
    ur: "وہ گھنٹے جو آپ خود نہیں سنبھال سکتے — دفتر کا وقت، یا رات",
  },
  {
    en: "Calling you, and calling us, when something is not right",
    ur: "کوئی بات ٹھیک نہ لگے تو آپ کو اور ہمیں فون کرنا",
  },
];

const DIVIDE_INTRO: Bilingual[] = [
  {
    en: "This goes best for families who do not hand the whole thing over. In the first week, decide out loud what is now the caregiver's and what stays yours. Ambiguity is what produces the two bad endings: a family that has quietly stepped back from a parent, or a family that hired help and is still doing everything.",
    ur: "یہ اُن گھرانوں میں سب سے بہتر چلتا ہے جو سارا کام دوسرے کے حوالے نہیں کر دیتے۔ پہلے ہفتے میں کھل کر طے کر لیں کہ اب کیا کیئر گیور کا کام ہے اور کیا آپ کا۔ ابہام ہی دو خراب نتیجوں کی جڑ ہے: یا تو گھر والے خاموشی سے پیچھے ہٹ جاتے ہیں، یا مدد رکھنے کے باوجود سب کچھ خود ہی کرتے رہتے ہیں۔",
  },
];

const DIVIDE_OUTRO: Bilingual[] = [
  {
    en: "Ask for a handover at the end of every shift. Two minutes — what was eaten, which medicines were taken, how they moved, how they slept — is worth more than one long conversation a week.",
    ur: "ہر شفٹ کے اختتام پر دو منٹ کی رپورٹ ضرور لیں — کیا کھایا، کون سی دوا لی، چلنے پھرنے میں کیسے رہے، نیند کیسی رہی۔ یہ ہفتے میں ایک لمبی بات چیت سے زیادہ کام کی چیز ہے۔",
  },
];

/* ================================================================== *
 * 5. Nights
 * ================================================================== */
const NIGHTS: Bilingual[] = [
  {
    en: "Almost every family tries to manage nights themselves first. It is the natural thing to do. Hiring someone for the day feels reasonable; paying someone to sit in your house while everyone sleeps feels like an indulgence.",
    ur: "تقریباً ہر گھرانہ پہلے راتیں خود سنبھالنے کی کوشش کرتا ہے۔ یہ فطری بات ہے۔ دن کے لیے کسی کو رکھنا معقول لگتا ہے؛ لیکن رات کو، جب سب سو رہے ہوں، کسی کو بٹھانے پر خرچ کرنا فضول خرچی لگتا ہے۔",
  },
  {
    en: "What follows is fairly predictable. One person in the house becomes the night person — usually whoever lives there. They are up two or three times. They go to work in the morning anyway. It holds for a while, and then it stops holding, and by the time the family calls, the person who was doing the nights is the one who cannot go on.",
    ur: "اس کے بعد جو ہوتا ہے وہ کم و بیش طے شدہ ہے۔ گھر کا ایک فرد ”رات والا“ بن جاتا ہے — عموماً وہی جو ساتھ رہتا ہے۔ رات میں دو تین بار اٹھنا پڑتا ہے۔ صبح پھر بھی کام پر جانا ہوتا ہے۔ کچھ عرصہ یہ چلتا ہے، پھر نہیں چلتا؛ اور جب گھر والے فون کرتے ہیں تو راتیں جاگنے والا فرد خود آگے چلنے کے قابل نہیں رہا ہوتا۔",
  },
  {
    en: "So if you are going to arrange only one shift, ask honestly which twelve hours your household actually cannot cover. For a lot of families that is the night, not the day.",
    ur: "اس لیے اگر آپ صرف ایک شفٹ رکھنے جا رہے ہیں تو ایمانداری سے سوچیں کہ گھر والے کون سے بارہ گھنٹے واقعی نہیں سنبھال سکتے۔ بہت سے گھرانوں کے لیے وہ رات ہوتی ہے، دن نہیں۔",
  },
  {
    en: "One more thing, said plainly because families ask and the honest answer matters: round-the-clock care means two caregivers across two twelve-hour shifts. Never one person awake for twenty-four hours. Nobody does that well, and an arrangement that pretends otherwise falls apart by the third day.",
    ur: "ایک اور بات، صاف الفاظ میں، کیونکہ گھر والے پوچھتے ہیں اور سچ بتانا ضروری ہے: چوبیس گھنٹے کی دیکھ بھال کا مطلب ہے دو کیئر گیور، دو بارہ گھنٹے کی شفٹوں میں۔ ایک ہی فرد چوبیس گھنٹے جاگتا رہے، یہ کبھی نہیں۔ یہ کوئی بھی ٹھیک طرح نہیں کر سکتا، اور ایسا دعویٰ کرنے والا بندوبست تیسرے دن ہی بکھر جاتا ہے۔",
  },
];

/* ================================================================== *
 * 6. How the arrangement ages.
 *
 * The signals below are deliberately about the HOUSEHOLD, not the patient.
 * Listing clinical warning signs would be medical advice; listing the strain
 * a family can observe in itself is both safer and more useful.
 * ================================================================== */
const CHANGE_SIGNALS: Bilingual[] = [
  {
    en: "You are getting calls at work about things that are not emergencies",
    ur: "دفتر میں آپ کو ایسی باتوں پر فون آنے لگے ہیں جو ہنگامی نہیں ہوتیں",
  },
  {
    en: "Somebody in the family has stopped sleeping properly",
    ur: "گھر کے کسی فرد کی نیند پوری ہونا بند ہو گئی ہے",
  },
  {
    en: "The twelve hours you arranged have quietly crept to fifteen",
    ur: "جو بارہ گھنٹے طے ہوئے تھے وہ خاموشی سے پندرہ ہو چکے ہیں",
  },
  {
    en: "Jobs that used to take one person — getting your father up, or into a car — now take two",
    ur: "جو کام پہلے ایک فرد کر لیتا تھا — والد کو اٹھانا، یا گاڑی میں بٹھانا — اب دو افراد سے ہوتا ہے",
  },
  {
    en: "Weekends have stopped being weekends for whoever lives nearest",
    ur: "جو سب سے قریب رہتا ہے، اس کے لیے چھٹی کا دن چھٹی نہیں رہا",
  },
  {
    en: "There is a stretch of the day when your parent is alone that nobody planned for",
    ur: "دن کا کوئی حصہ ایسا بن گیا ہے جس میں والد یا والدہ اکیلے ہوتے ہیں، اور یہ کسی نے طے نہیں کیا تھا",
  },
];

const CHANGE_INTRO: Bilingual[] = [
  {
    en: "Care at home is not a decision you make once. What fits in March often does not fit in September, because needs increase quietly and the family adjusts around them without noticing. It is worth knowing what the signals look like, so the change is a decision rather than a collapse.",
    ur: "گھر پر دیکھ بھال کوئی ایک بار کا فیصلہ نہیں۔ جو بندوبست مارچ میں مناسب تھا وہ اکثر ستمبر میں مناسب نہیں رہتا، کیونکہ ضرورتیں خاموشی سے بڑھتی ہیں اور گھر والے بغیر محسوس کیے اپنے آپ کو ان کے مطابق ڈھالتے چلے جاتے ہیں۔ اس لیے علامتیں جان لینا بہتر ہے، تاکہ تبدیلی ایک فیصلہ ہو، تھک کر بیٹھ جانا نہ ہو۔",
  },
];

const CHANGE_OUTRO: Bilingual[] = [
  {
    en: "None of these mean something has gone wrong. They usually mean the arrangement has become a size too small. The fix is often small too: adding the shift you have been covering yourself, or moving from an attendant to a Qualified Nurse for a stretch if the daily work has become clinical.",
    ur: "ان میں سے کسی بات کا مطلب یہ نہیں کہ کچھ غلط ہو گیا ہے۔ عموماً اس کا مطلب یہ ہوتا ہے کہ بندوبست ضرورت سے چھوٹا رہ گیا ہے۔ حل بھی اکثر چھوٹا ہی ہوتا ہے: وہ شفٹ بھی رکھ لینا جو آپ خود سنبھال رہے تھے، یا اگر روزمرہ کام طبی ہو گیا ہے تو کچھ عرصے کے لیے اٹینڈنٹ کے بجائے PNC رجسٹرڈ نرس رکھ لینا۔",
  },
  {
    en: "If your parent's memory has changed, the practical thing that matters most is sameness: the same face, the same order to the day, the same words for the same things. Ask for a caregiver by name and we will try to send the same person again.",
    ur: "اگر والد یا والدہ کی یادداشت متاثر ہوئی ہے تو عملی طور پر سب سے اہم چیز یکسانیت ہے: وہی چہرہ، دن کی وہی ترتیب، اور وہی الفاظ۔ کسی کیئر گیور کا نام لے کر کہیں، ہم کوشش کریں گے کہ وہی فرد دوبارہ بھیجیں۔",
  },
];

/* ================================================================== *
 * 7. From abroad
 * ================================================================== */
const CAN_CHECK: Bilingual[] = [
  {
    en: "Who is coming: the caregiver's card reaches you on WhatsApp before the visit — photo, name, and for a nurse the PNC registration number our team has checked",
    ur: "کون آ رہا ہے: آنے سے پہلے واٹس ایپ پر کارڈ آ جاتا ہے — تصویر، نام، اور نرس کی صورت میں PNC رجسٹریشن نمبر جو ہماری ٹیم خود چیک کرتی ہے",
  },
  {
    en: VERIFICATION_PROMISE.en,
    ur: VERIFICATION_PROMISE.ur,
  },
  {
    en: "That the shift has started: we message you when the caregiver is on the way",
    ur: "شفٹ شروع ہونے کی اطلاع: جب کیئر گیور راستے میں ہو تو ہم آپ کو پیغام بھیج دیتے ہیں",
  },
  {
    en: "That a real person answers: call or WhatsApp at any hour, from any country",
    ur: "کہ فون پر ایک اصل انسان موجود ہے: کسی بھی وقت، کسی بھی ملک سے کال یا واٹس ایپ کریں",
  },
];

const CANNOT_CHECK: Bilingual[] = [
  {
    en: "You cannot see the room. We do not put cameras in your parent's house and we do not track caregivers by GPS, so nothing on a screen will tell you how the afternoon went",
    ur: "آپ کمرہ نہیں دیکھ سکتے۔ ہم آپ کے والدین کے گھر میں کیمرے نہیں لگاتے اور نہ کیئر گیور کو جی پی ایس سے ٹریک کرتے ہیں، اس لیے کوئی اسکرین آپ کو یہ نہیں بتائے گی کہ دوپہر کیسی گزری",
  },
  {
    en: "A daily report from the person being paid is not the same as knowing. Ask your parent directly, on a video call, at a time when the caregiver is not standing beside them",
    ur: "جسے تنخواہ مل رہی ہو، اس کی روزانہ رپورٹ اور خود جاننا ایک بات نہیں۔ والد یا والدہ سے براہِ راست ویڈیو کال پر پوچھیں، اُس وقت جب کیئر گیور ساتھ کھڑا نہ ہو",
  },
  {
    en: "If you have a relative or a neighbour in Lahore, ask them to drop in once a week without arranging it first. One unannounced visit tells you more than a month of messages",
    ur: "لاہور میں کوئی رشتہ دار یا پڑوسی ہو تو ان سے کہیں کہ ہفتے میں ایک بار بغیر بتائے چکر لگا لیں۔ ایک بار بغیر اطلاع آ جانا مہینے بھر کے پیغامات سے زیادہ بتا دیتا ہے",
  },
  {
    en: "Agree with your siblings on one point of contact. When four people abroad are all messaging the caregiver, the caregiver stops looking after your parent and starts managing your family",
    ur: "بہن بھائیوں سے طے کر لیں کہ رابطہ ایک ہی فرد کرے گا۔ جب بیرونِ ملک سے چار لوگ الگ الگ پیغام بھیجتے ہیں تو کیئر گیور آپ کے والدین کی دیکھ بھال چھوڑ کر آپ کے گھر والوں کو سنبھالنے لگتا ہے",
  },
];

const ABROAD_INTRO: Bilingual[] = [
  {
    en: "A good share of the people who call us are not in Lahore. They are in Dubai, or Manchester, or Toronto, arranging care for a parent they cannot visit this month — and they are right to be careful, because they are trusting a stranger with someone they cannot see.",
    ur: "ہمیں کال کرنے والوں کا ایک بڑا حصہ لاہور میں نہیں ہوتا۔ وہ دبئی، مانچسٹر یا ٹورنٹو میں ہوتے ہیں، اور ایسے والدین کے لیے بندوبست کر رہے ہوتے ہیں جن کے پاس اس مہینے جانا ممکن نہیں — اور ان کا محتاط ہونا بجا ہے، کیونکہ وہ ایک اجنبی کے سپرد ایسے فرد کو کر رہے ہیں جسے وہ خود دیکھ نہیں سکتے۔",
  },
];

/* ================================================================== *
 * 8. The first week
 * ================================================================== */
const FIRST_WEEK: { when: Bilingual; body: Bilingual }[] = [
  {
    when: { en: "Day 1", ur: "پہلا دن" },
    body: {
      en: "Mostly two people getting used to each other. Less is done than you expected. Your parent is either unusually polite or refuses everything; both are normal.",
      ur: "زیادہ تر وقت دو افراد کے ایک دوسرے سے مانوس ہونے میں جاتا ہے۔ کام توقع سے کم ہوتا ہے۔ آپ کے والد یا والدہ یا تو غیر معمولی طور پر تکلف کریں گے یا ہر چیز سے انکار — دونوں باتیں عام ہیں۔",
    },
  },
  {
    when: { en: "Days 2 and 3", ur: "دوسرا اور تیسرا دن" },
    body: {
      en: "A shape starts to appear: meals, bathroom, medicines at fixed times. This is the first point at which you can tell whether this person suits your parent.",
      ur: "ایک ترتیب بننے لگتی ہے: کھانا، باتھ روم، اور دوائیں مقررہ وقت پر۔ یہی پہلا موقع ہوتا ہے جب آپ اندازہ لگا سکتے ہیں کہ یہ فرد آپ کے والد یا والدہ کے لیے مناسب ہے یا نہیں۔",
    },
  },
  {
    when: { en: "Days 4 and 5", ur: "چوتھا اور پانچواں دن" },
    body: {
      en: "The awkwardness usually drops. Your parent starts using the caregiver's name. If they do not, and the fit still feels wrong, this is the point to say so rather than waiting it out.",
      ur: "عموماً جھجک کم ہو جاتی ہے۔ والد یا والدہ کیئر گیور کا نام لینے لگتے ہیں۔ اگر ایسا نہ ہو اور جوڑ اب بھی مناسب نہ لگے تو انتظار کرنے کے بجائے یہی وقت ہے کہ بتا دیں۔",
    },
  },
  {
    when: { en: "Days 6 and 7", ur: "چھٹا اور ساتواں دن" },
    body: {
      en: "By now you have your own list: what is working, what is not, what you want done differently. Say it out loud, to us and to the caregiver. Almost every first-week problem is a small thing nobody mentioned.",
      ur: "اب تک آپ کے پاس اپنی فہرست ہوتی ہے: کیا ٹھیک چل رہا ہے، کیا نہیں، اور کیا مختلف طریقے سے چاہیے۔ یہ ہمیں اور کیئر گیور کو کھل کر بتا دیں۔ پہلے ہفتے کا تقریباً ہر مسئلہ وہی چھوٹی سی بات ہوتی ہے جو کسی نے کہی نہیں۔",
    },
  },
];

const FIRST_WEEK_OUTRO: Bilingual[] = [
  {
    en: "What the first week does not do is settle everything. Needs change, people change, and the arrangement gets revised more than once. What it should do is take a fixed set of hours off the family — the same hours, every day, covered by somebody whose job it is.",
    ur: "پہلا ہفتہ ہر چیز طے نہیں کر دیتا۔ ضرورتیں بدلتی ہیں، لوگ بدلتے ہیں، اور بندوبست ایک سے زیادہ بار بدلنا پڑتا ہے۔ پہلے ہفتے کا اصل کام یہ ہے کہ گھر والوں کے کندھوں سے کچھ مقررہ گھنٹے اتر جائیں — وہی گھنٹے، ہر روز، ایسے فرد کے ذمے جس کا یہی کام ہے۔",
  },
];

/* ================================================================== *
 * FAQ — mirrored byte-for-byte into the FAQPage JSON-LD below.
 * ================================================================== */
const GUIDE_FAQ: { q: string; qUr: string; a: string; aUr: string }[] = [
  {
    q: "The attendant is free for stretches of the day — kya wo ghar ka kaam bhi kar sakta hai?",
    qUr: "اٹینڈنٹ دن میں کافی دیر فارغ رہتا ہے — کیا وہ گھر کا کام بھی کر سکتا ہے؟",
    a: "No, and it is kinder to be plain than polite about it. An attendant is hired for one person: your patient. The quiet stretches are part of the job — somebody who is free the moment your father needs the bathroom is not idle, they are on duty, and sitting with your parent is real work too. If the household also needs domestic help, that is a separate person and a separate arrangement. Tell us what you need on the call and we will say plainly what we do and do not provide.",
    aUr: "نہیں، اور اس پر تکلف کے بجائے صاف بات کرنا ہی بہتر ہے۔ اٹینڈنٹ ایک ہی فرد کے لیے رکھا جاتا ہے: آپ کے مریض کے لیے۔ خالی وقت بھی کام کا حصہ ہے — جو شخص اُسی لمحے دستیاب ہو جب آپ کے والد کو باتھ روم جانا ہو، وہ فارغ نہیں، ڈیوٹی پر ہے؛ اور والد یا والدہ کے پاس بیٹھنا بھی اصل کام ہے۔ اگر گھر کو گھریلو مدد بھی چاہیے تو وہ الگ فرد اور الگ بندوبست ہے۔ کال پر بتا دیں کہ کیا چاہیے، ہم صاف بتا دیں گے کہ ہم کیا فراہم کرتے ہیں اور کیا نہیں۔",
  },
  {
    q: "How long does it take for an elderly parent to accept a caregiver?",
    qUr: "بزرگ والدین کو کیئر گیور قبول کرنے میں کتنا وقت لگتا ہے؟",
    a: "It varies more than families expect. Some settle within two or three days, once the person has a name and the day has a shape. Others take a few weeks of grumbling. Resistance is usually about dignity rather than about the person who arrived, so starting with one short shift and letting the first hours be company rather than bathing tends to go better than starting with a full permanent arrangement. Your first day is free — no cost, no obligation. Continue only if you're happy. And if the person does not suit your parent: Not comfortable? Tell us — we replace the caregiver, free, until you're fully satisfied.",
    aUr: "یہ ہر گھر میں مختلف ہوتا ہے۔ کچھ بزرگ دو تین دن میں مان جاتے ہیں، جب فرد کا نام معلوم ہو جائے اور دن کی ترتیب بن جائے۔ کچھ کو چند ہفتے لگتے ہیں۔ انکار عموماً عزتِ نفس کا معاملہ ہوتا ہے، آنے والے فرد کا نہیں — اس لیے ایک چھوٹی شفٹ سے شروع کرنا، اور پہلے گھنٹے نہلانے کے بجائے ساتھ بیٹھنے کے رکھنا، مستقل بندوبست سے شروع کرنے کے مقابلے میں بہتر رہتا ہے۔ پہلا دن مفت ہے؛ پسند آئے تو ہی آگے جاری رکھیں۔ اور اگر فرد مناسب نہ لگے: اطمینان نہ ہو تو بتائیں؛ ہم نرس یا اٹینڈنٹ مفت بدلتے رہیں گے، جب تک آپ مطمئن نہ ہوں۔",
  },
  {
    q: "Should we tell our parent before the caregiver arrives, or is it easier not to?",
    qUr: "کیا ہمیں کیئر گیور کے آنے سے پہلے والد یا والدہ کو بتا دینا چاہیے؟",
    a: "Tell them. A day is enough. Being handed a stranger without warning is the part older people take worst, and it starts the whole arrangement on the wrong footing. Say who is coming, what they will help with, and for how long — and if it is a trial rather than a permanent arrangement, say that too. It is easier to accept somebody for one day than forever.",
    aUr: "ضرور بتائیں۔ ایک دن پہلے کافی ہے۔ بغیر بتائے اجنبی کا سامنے آ جانا وہ بات ہے جو بزرگوں کو سب سے زیادہ بری لگتی ہے، اور پورا بندوبست اسی سے غلط بنیاد پر شروع ہو جاتا ہے۔ بتا دیں کہ کون آ رہا ہے، کن کاموں میں مدد کرے گا، اور کتنی دیر کے لیے — اور اگر یہ آزمائشی ہے، مستقل نہیں، تو یہ بھی بتا دیں۔ ایک دن کے لیے کسی کو قبول کرنا ہمیشہ کے لیے قبول کرنے سے آسان ہوتا ہے۔",
  },
  {
    q: "I live abroad. Can I arrange elderly care in Lahore from outside Pakistan?",
    qUr: "میں بیرونِ ملک رہتا ہوں۔ کیا میں پاکستان سے باہر رہتے ہوئے لاہور میں دیکھ بھال کا بندوبست کر سکتا ہوں؟",
    a: "Yes. It is arranged over the phone and on WhatsApp, and a family member in Lahore does not have to be the one who calls us. Before the visit you get the caregiver's card on WhatsApp — photo, name, and for a nurse the PNC registration number our team has checked — and a message when they are on the way. What we do not do is put cameras in the house or track anyone by GPS, so ask your parent directly on a video call, and if you have a relative or neighbour nearby, ask them to drop in once without arranging it first.",
    aUr: "جی ہاں۔ یہ سب فون اور واٹس ایپ پر طے ہو جاتا ہے، اور ضروری نہیں کہ لاہور والا ہی ہمیں کال کرے۔ آنے سے پہلے آپ کو واٹس ایپ پر کیئر گیور کا کارڈ ملتا ہے — تصویر، نام، اور نرس کی صورت میں PNC رجسٹریشن نمبر جو ہماری ٹیم چیک کرتی ہے — اور روانگی کے وقت پیغام بھی۔ ہم گھر میں کیمرے نہیں لگاتے اور نہ کسی کو جی پی ایس سے ٹریک کرتے ہیں، اس لیے والد یا والدہ سے ویڈیو کال پر خود پوچھیں، اور قریب کوئی رشتہ دار یا پڑوسی ہو تو ان سے کہیں کہ ایک بار بغیر بتائے چکر لگا لیں۔",
  },
];

/* ================================================================== *
 * JSON-LD.
 * No price anywhere. No datePublished / dateModified — inventing a date
 * would be a fabricated fact, and an absent date is better than a wrong one.
 * ================================================================== */
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: HEADLINE,
  description: DESCRIPTION,
  inLanguage: "en",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${PATH}` },
  url: `${SITE_URL}${PATH}`,
  author: {
    "@type": "Organization",
    name: "Sehat Connect",
    url: SITE_URL,
  },
  publisher: {
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

const breadcrumbs = breadcrumbList([
  { name: "Guides", path: "/guides" },
  { name: "Elderly care at home" },
]);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GUIDE_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ================================================================== *
 * Shared inline styles — same card language as /charges and /services.
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
 *  as approval next to a list of things a caregiver is not there to do. */
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

function SectionHead({
  eyebrow,
  heading,
}: {
  eyebrow: Bilingual;
  heading: Bilingual;
}) {
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

export default function ElderlyCareAtHomeGuide() {
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
          {/* ---- title + who this is for. No form here: this is a guide, and
                  the reader has not asked us for anything yet. ---- */}
          <section className="hero" style={{ paddingBottom: 26 }}>
            <div className="wrap">
              <div className="hero-copy">
                <span className="eyebrow eyebrow-plain">
                  <span data-en>Guide &middot; Buzurgon ki dekh bhaal</span>
                  <span data-ur className="urdu">رہنمائی &middot; بزرگوں کی دیکھ بھال</span>
                </span>

                <h1 style={{ maxWidth: "20ch" }}>
                  <span data-en>
                    Elderly care at home in Lahore: <span className="hl">what to expect</span>
                  </span>
                  <span data-ur className="urdu">
                    لاہور میں بزرگوں کی گھر پر دیکھ بھال: <span className="hl">کیا توقع رکھیں</span>
                  </span>
                </h1>
              </div>

              <div style={{ marginTop: 18 }}>
                <P
                  t={{
                    en: "Most people reading this have already been managing for months. You are the son or the daughter who lives nearest, or the only one still in Lahore. You take the calls at work. You have been sleeping badly. And the family has started saying, carefully, that maybe it is time to bring somebody in.",
                    ur: "یہ صفحہ پڑھنے والوں میں سے اکثر مہینوں سے یہ سب خود سنبھال رہے ہوتے ہیں۔ آپ وہ بیٹا یا بیٹی ہیں جو سب سے قریب رہتا ہے، یا اکلوتا فرد جو اب بھی لاہور میں ہے۔ کام کے دوران فون آپ ہی اٹھاتے ہیں۔ نیند پوری نہیں ہو رہی۔ اور اب گھر والے احتیاط سے یہ کہنے لگے ہیں کہ شاید کسی کو رکھ لینا چاہیے۔",
                  }}
                />
                <P
                  style={{ marginTop: 16 }}
                  t={{
                    en: "This guide is about what to expect when elderly care actually starts at home — the first day, the weeks after it, and the parts nobody warns you about. It is not a sales page. If you read it and decide to carry on by yourselves for another few months, that is a perfectly good outcome.",
                    ur: "یہ رہنمائی اس بارے میں ہے کہ جب گھر پر بزرگوں کی دیکھ بھال واقعی شروع ہوتی ہے تو کیا ہوتا ہے — پہلا دن، اس کے بعد کے ہفتے، اور وہ باتیں جن سے کوئی پہلے سے خبردار نہیں کرتا۔ یہ کوئی سیلز صفحہ نہیں۔ اگر پڑھ کر آپ یہ طے کریں کہ کچھ مہینے مزید خود سنبھال لیں گے، تو یہ بھی ایک بالکل ٹھیک فیصلہ ہے۔",
                  }}
                />
              </div>
            </div>
          </section>

          {/* ---- 1. the first day ---- */}
          <section
            className="block"
            style={{
              paddingTop: 40,
              background: "var(--cream-2)",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div className="wrap">
              <SectionHead
                eyebrow={{ en: "The first day", ur: "پہلا دن" }}
                heading={{
                  en: "The first day is awkward, and it is awkward for everyone.",
                  ur: "پہلا دن عجیب ہوتا ہے، اور سب کے لیے عجیب ہوتا ہے۔",
                }}
              />
              <Paras items={FIRST_DAY_INTRO} />

              <div style={{ ...CARD, marginTop: 22 }}>
                <CardHead t={{ en: "What makes day one easier", ur: "پہلا دن کیسے آسان ہوتا ہے" }} />
                <TickList items={FIRST_DAY_HELPS} />
              </div>
            </div>
          </section>

          {/* ---- 2. resistance ---- */}
          <section className="block">
            <div className="wrap">
              <SectionHead
                eyebrow={{ en: "When a parent says no", ur: "جب والدین انکار کریں" }}
                heading={{
                  en: "Resistance is normal. It is not the arrangement failing.",
                  ur: "انکار عام بات ہے۔ اس کا مطلب بندوبست کا ناکام ہونا نہیں۔",
                }}
              />
              <Paras items={RESISTANCE_INTRO} />

              <div style={{ ...CARD, marginTop: 22 }}>
                <CardHead
                  t={{
                    en: "What families often find helps",
                    ur: "گھر والوں کو عموماً کن باتوں سے فائدہ ہوتا ہے",
                  }}
                />
                <TickList items={RESISTANCE_HELPS} />
              </div>

              <Paras items={RESISTANCE_OUTRO} style={{ marginTop: 22 }} />

              <div
                style={{
                  ...CARD,
                  marginTop: 18,
                  paddingLeft: 30,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
                />
                <P
                  style={{ fontSize: 18, fontWeight: 700, color: "var(--teal-deep)", maxWidth: "58ch" }}
                  t={PROMISES.trial}
                />
                <P
                  style={{ marginTop: 12, fontSize: 18, fontWeight: 700, color: "var(--teal-deep)", maxWidth: "58ch" }}
                  t={PROMISES.replacement}
                />
              </div>
            </div>
          </section>

          {/* ---- 3. the boundary ---- */}
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
                eyebrow={{ en: "The boundary", ur: "کام کی حد" }}
                heading={{
                  en: "What a caregiver does, and what they are not there to do.",
                  ur: "کیئر گیور کیا کرتا ہے، اور کن کاموں کے لیے نہیں آتا۔",
                }}
              />
              <Paras items={BOUNDARY_INTRO} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginTop: 22 }}>
                <div style={CARD}>
                  <CardHead t={{ en: "Their work", ur: "ان کا کام" }} />
                  <TickList items={DOES} />
                </div>
                <div style={CARD}>
                  <CardHead t={{ en: "Not their work", ur: "ان کا کام نہیں" }} />
                  <DashList items={DOES_NOT} />
                </div>
              </div>

              <Paras items={BOUNDARY_OUTRO} style={{ marginTop: 22 }} />
            </div>
          </section>

          {/* ---- 4. dividing the work ---- */}
          <section className="block">
            <div className="wrap">
              <SectionHead
                eyebrow={{ en: "Dividing the work", ur: "کام کی تقسیم" }}
                heading={{
                  en: "Share the responsibility. Do not hand it all over.",
                  ur: "ذمہ داری بانٹیں، پوری کی پوری کسی کے حوالے نہ کریں۔",
                }}
              />
              <Paras items={DIVIDE_INTRO} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginTop: 22 }}>
                <div style={CARD}>
                  <CardHead t={{ en: "Stays with the family", ur: "گھر والوں کے پاس رہتا ہے" }} />
                  <TickList items={STAYS_YOURS} />
                </div>
                <div style={CARD}>
                  <CardHead t={{ en: "Becomes the caregiver's", ur: "کیئر گیور کے ذمے آتا ہے" }} />
                  <TickList items={BECOMES_THEIRS} />
                </div>
              </div>

              <Paras items={DIVIDE_OUTRO} style={{ marginTop: 22 }} />
            </div>
          </section>

          {/* ---- 5. nights ---- */}
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
                eyebrow={{ en: "Nights", ur: "راتیں" }}
                heading={{
                  en: "Nights are usually what breaks a family — raat sab se mushkil hoti hai.",
                  ur: "گھر والے عموماً راتوں سے ہی تھکتے ہیں — رات سب سے مشکل ہوتی ہے۔",
                }}
              />
              <Paras items={NIGHTS} />
            </div>
          </section>

          {/* ---- 6. how the arrangement ages ---- */}
          <section className="block">
            <div className="wrap">
              <SectionHead
                eyebrow={{ en: "Months later", ur: "کچھ مہینوں بعد" }}
                heading={{
                  en: "What changes over months, and how you notice.",
                  ur: "مہینوں میں کیا بدلتا ہے، اور پتہ کیسے چلتا ہے۔",
                }}
              />
              <Paras items={CHANGE_INTRO} />

              <div style={{ ...CARD, marginTop: 22 }}>
                <CardHead
                  t={{
                    en: "Signals that the arrangement needs to change",
                    ur: "علامتیں کہ بندوبست بدلنے کی ضرورت ہے",
                  }}
                />
                <TickList items={CHANGE_SIGNALS} />
              </div>

              <Paras items={CHANGE_OUTRO} style={{ marginTop: 22 }} />
            </div>
          </section>

          {/* ---- 7. from abroad ---- */}
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
                eyebrow={{ en: "Arranging it from abroad", ur: "بیرونِ ملک سے بندوبست" }}
                heading={{
                  en: "What you can check from another country, and what you cannot.",
                  ur: "دوسرے ملک سے آپ کیا جانچ سکتے ہیں، اور کیا نہیں۔",
                }}
              />
              <Paras items={ABROAD_INTRO} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginTop: 22 }}>
                <div style={CARD}>
                  <CardHead t={{ en: "What you can check", ur: "کیا جانچ سکتے ہیں" }} />
                  <TickList items={CAN_CHECK} />
                </div>
                <div style={CARD}>
                  <CardHead t={{ en: "What you cannot — and what to do instead", ur: "کیا نہیں — اور اس کے بجائے کیا کریں" }} />
                  <DashList items={CANNOT_CHECK} />
                </div>
              </div>
            </div>
          </section>

          {/* ---- 8. the first week ---- */}
          <section className="block">
            <div className="wrap">
              <SectionHead
                eyebrow={{ en: "The first week", ur: "پہلا ہفتہ" }}
                heading={{
                  en: "What the first week honestly looks like.",
                  ur: "پہلا ہفتہ سچ میں کیسا گزرتا ہے۔",
                }}
              />

              <div className="id-meta" style={{ gap: 14 }}>
                {FIRST_WEEK.map((d) => (
                  <div key={d.when.en} style={{ ...CARD, padding: "20px 18px" }}>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: "var(--teal-deep)",
                        letterSpacing: ".01em",
                        marginBottom: 8,
                      }}
                    >
                      <span data-en>{d.when.en}</span>
                      <span data-ur className="urdu">{d.when.ur}</span>
                    </p>
                    <P t={d.body} style={{ fontSize: 17, maxWidth: "58ch" }} />
                  </div>
                ))}
              </div>

              <Paras items={FIRST_WEEK_OUTRO} style={{ marginTop: 22 }} />
            </div>
          </section>

          {/* ---- FAQ (mirrored in the FAQPage JSON-LD above) ---- */}
          <section className="block faq" id="guide-faq">
            <div className="wrap">
              <SectionHead
                eyebrow={{ en: "Questions families ask us", ur: "گھر والوں کے عام سوالات" }}
                heading={{ en: "Straight answers.", ur: "سیدھے جواب۔" }}
              />

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

          {/* ---- soft close: where to read further, then the one action ---- */}
          <section className="block" style={{ paddingTop: 44 }}>
            <div className="wrap">
              <div style={CARD}>
                <CardHead
                  t={{
                    en: "If you want to talk it through",
                    ur: "اگر آپ اس پر بات کرنا چاہیں",
                  }}
                />
                <P
                  style={{ fontSize: 17, maxWidth: "58ch" }}
                  t={{
                    en: "Nothing on this page needs a phone call. If you do want one, we will ask what is happening at home, tell you honestly whether your parent needs a nurse or an attendant, and give you the exact price for your case before anyone comes to the house.",
                    ur: "اس صفحے کی کسی بات کے لیے فون کرنا ضروری نہیں۔ اگر آپ بات کرنا چاہیں تو ہم پوچھیں گے کہ گھر میں کیا صورتحال ہے، صاف بتائیں گے کہ نرس چاہیے یا اٹینڈنٹ، اور کسی کے گھر آنے سے پہلے آپ کے کیس کی صحیح قیمت بتا دیں گے۔",
                  }}
                />
                <P
                  style={{ marginTop: 12, fontSize: 17, fontWeight: 700, color: "var(--teal-deep)", maxWidth: "58ch" }}
                  t={CALLBACK_PROMISE}
                />

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
                    <span data-en>Ask on WhatsApp</span>
                    <span data-ur className="urdu">واٹس ایپ پر پوچھیں</span>
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                <Link className="btn btn-ghost" href="/services/elderly-care">
                  <span data-en>Elderly care at home in Lahore</span>
                  <span data-ur className="urdu">لاہور میں بزرگوں کی گھر پر دیکھ بھال</span>
                </Link>
                <Link className="btn btn-ghost" href="/services/attendant">
                  <span data-en>What an attendant does</span>
                  <span data-ur className="urdu">اٹینڈنٹ کیا کرتا ہے</span>
                </Link>
                <Link className="btn btn-ghost" href="/charges">
                  <span data-en>How charges work</span>
                  <span data-ur className="urdu">چارجز کیسے طے ہوتے ہیں</span>
                </Link>
                <Link className="btn btn-ghost" href="/guides">
                  <span data-en>All guides</span>
                  <span data-ur className="urdu">تمام رہنمائیاں</span>
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
