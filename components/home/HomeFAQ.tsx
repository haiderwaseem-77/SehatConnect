"use client";
// Direction-6 FAQ — the worries families ask, answered plainly.
// Accordion uses the grid-rows 0fr→1fr fix.
// Page diet: 6 highest-intent items are always visible; the rest sit behind a
// "More questions" disclosure — same disc/disc-head/disc-body pattern used
// elsewhere on the home page for collapsed-but-real content.
import { useState } from "react";
import PulseAccent from "@/components/home/PulseAccent";

type Item = { q: string; qUr: string; a: React.ReactNode; aUr: string };

// First 6 items are always visible; the remaining 5 sit behind "More questions".
const VISIBLE_COUNT = 6;

const ITEMS: Item[] = [
  {
    q: "How do I know my loved one will get the care they deserve?",
    qUr: "مجھے کیسے یقین ہو کہ میرے عزیز کو اچھی دیکھ بھال ملے گی؟",
    a: (
      <>We call first and understand your needs. <b>First day is free</b>, there is no advance, and if the person does not feel right, we replace them until your family is comfortable.</>
    ),
    aUr: "ہم پہلے کال کر کے ضرورت سمجھتے ہیں۔ پہلا دن مفت ہے، کوئی پیشگی ادائیگی نہیں، اور اگر فرد مناسب نہ لگے تو ہم بدلتے رہیں گے جب تک گھر والے مطمئن نہ ہوں۔",
  },
  {
    q: "Who actually comes into my home?",
    qUr: "میرے گھر کون آئے گا؟",
    a: (
      <>We arrange a caring nurse or attendant based on what your loved one needs. Every caregiver is <b>CNIC checked, references called, and police-verified</b>. Caring for a woman? You can ask for female-for-female.</>
    ),
    aUr: "آپ کی ضرورت کے مطابق نرس یا اٹینڈنٹ آئے گا۔ ہر فرد کا شناختی کارڈ اور حوالہ جات چیک ہو جاتے ہیں، اور پولیس تصدیق بھی ہو جاتی ہے۔ خاتون مریض کے لیے خاتون نرس یا اٹینڈنٹ مانگ سکتے ہیں۔",
  },
  {
    q: "How fast can care start?",
    qUr: "دیکھ بھال کتنی جلدی شروع ہو سکتی ہے؟",
    a: (
      <>Often within <b>24 hours</b>. We confirm the details on the call and arrange the right person for your loved one&rsquo;s care.</>
    ),
    aUr: "اکثر 24 گھنٹوں کے اندر۔ ہم کال پر تفصیل لے کر آپ کے عزیز کے لیے مناسب نرس یا اٹینڈنٹ کا بندوبست کرتے ہیں۔",
  },
  {
    q: "What if we’re not comfortable with the caregiver?",
    qUr: "اگر نرس یا اٹینڈنٹ مناسب نہ لگے تو؟",
    a: (
      <>Tell us. <b>We replace the caregiver until your family is comfortable</b>. Payment only starts once the right person is finalized.</>
    ),
    aUr: "ہمیں بتائیں۔ ہم متبادل بھیجیں گے، جب تک گھر والے مطمئن نہ ہوں۔ ادائیگی اسی وقت شروع ہوتی ہے جب مناسب فرد فائنل ہو جائے۔",
  },
  {
    q: "How and when do I pay?",
    qUr: "ادائیگی کب اور کیسے ہوتی ہے؟",
    a: (
      <>There is <b>no advance payment</b>. First day is free, and payment starts only once the right person is finalized and your family is comfortable.</>
    ),
    aUr: "کوئی پیشگی ادائیگی نہیں۔ پہلا دن مفت ہے۔ ادائیگی تب شروع ہوتی ہے جب مناسب فرد فائنل ہو جائے اور گھر والے مطمئن ہوں۔",
  },
  {
    q: "Which areas of Lahore do you cover?",
    qUr: "لاہور کے کن علاقوں میں سروس ہے؟",
    a: (
      <>All of Lahore — DHA, Gulberg, Johar Town, Model Town, Bahria Town, Cantt and everywhere in between, 24/7. We ask your exact area on the call.</>
    ),
    aUr: "پورے لاہور میں: ڈی ایچ اے، گلبرگ، جوہر ٹاؤن، ماڈل ٹاؤن، بحریہ ٹاؤن، کینٹ اور آس پاس کے علاقے۔ صحیح علاقہ کال پر پوچھ لیتے ہیں۔",
  },
  {
    q: "What’s the difference between a nurse and an attendant?",
    qUr: "نرس اور اٹینڈنٹ میں کیا فرق ہے؟",
    a: (
      <>A Qualified Nurse is PNC registered and handles clinical care — injections, drips, wound dressing, medicines and monitoring. An Attendant gives non-clinical support — feeding, hygiene, movement and companionship. We tell you the exact price on the first call, depending on which you need; either way, your first day is free, there is no advance, and you pay cash after the shift.</>
    ),
    aUr: "PNC رجسٹرڈ نرس طبی کام سنبھالتی ہے: انجیکشن، ڈرپ، زخم کی ڈریسنگ، دوائیں اور نگرانی۔ اٹینڈنٹ غیر طبی روزمرہ مدد دیتا ہے: کھانا، صفائی، چلنا پھرنا اور ساتھ بیٹھنا۔ صحیح قیمت پہلی کال پر بتا دیتے ہیں؛ پہلا دن مفت ہے، پیشگی ادائیگی نہیں، اور ادائیگی شفٹ کے بعد ہوتی ہے۔",
  },
  {
    q: "Can they actually do the medical work?",
    qUr: "کیا نرس واقعی طبی کام کر سکتی ہے؟",
    a: (
      <>Yes. Our Qualified Nurses are Pakistan Nursing Council registered and do real nursing at home — wounds, dressings, injections, medicines, monitoring, post-op and ICU step-down care. For non-clinical help (feeding, hygiene, movement) an Attendant is enough, and we&rsquo;ll tell you honestly which you need.</>
    ),
    aUr: "جی ہاں۔ ہماری نرسیں پاکستان نرسنگ کونسل میں رجسٹرڈ ہیں اور گھر پر زخم، ڈریسنگ، انجیکشن، دوائیں، نگرانی، آپریشن کے بعد اور ICU کے بعد کی دیکھ بھال سنبھال سکتی ہیں۔ غیر طبی مدد کے لیے اٹینڈنٹ کافی ہوتا ہے؛ ہم آپ کو صاف بتا دیں گے۔",
  },
  {
    q: "Can I request the same nurse again?",
    qUr: "کیا ہم وہی نرس دوبارہ بلوا سکتے ہیں؟",
    a: (
      <>Yes. Tell us on WhatsApp and we try our best to send the same caregiver, so your loved one sees a familiar face. Familiarity and comfort matter to us too.</>
    ),
    aUr: "جی ہاں۔ واٹس ایپ پر نام بتا دیں؛ ہم کوشش کرتے ہیں کہ وہی نرس یا اٹینڈنٹ دوبارہ آئے، تاکہ مریض کو جانا پہچانا چہرہ ملے۔",
  },
  {
    q: "What if the caregiver is running late?",
    qUr: "اگر نرس یا اٹینڈنٹ دیر سے آ رہا ہو تو؟",
    a: (
      <>We keep you updated on WhatsApp or by phone, and you can always call us. If there is a delay, we sort out the next step quickly so your family is not left waiting without an answer.</>
    ),
    aUr: "ہم واٹس ایپ یا فون پر اپڈیٹ دیتے رہتے ہیں۔ تاخیر ہو تو اگلا بندوبست جلد کرتے ہیں تاکہ گھر والے جواب کے بغیر انتظار میں نہ رہیں۔",
  },
  {
    q: "I live abroad — can I arrange care for my parents in Lahore?",
    qUr: "میں بیرون ملک ہوں — کیا لاہور میں والدین کے لیے دیکھ بھال کا بندوبست ہو سکتا ہے؟",
    a: (
      <>Yes. Many families arrange care for parents in Lahore from abroad. We keep you updated on WhatsApp, and your family in Lahore pays after care begins, same as usual.</>
    ),
    aUr: "جی ہاں۔ بہت سے لوگ بیرون ملک سے لاہور میں والدین کے لیے بندوبست کرتے ہیں۔ ہم واٹس ایپ پر اپڈیٹس دیتے ہیں، اور ادائیگی معمول کے مطابق لاہور میں دیکھ بھال شروع ہونے کے بعد ہوتی ہے۔",
  },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<boolean[]>(() => ITEMS.map(() => false));
  const [moreOpen, setMoreOpen] = useState(false);
  const toggle = (i: number) =>
    setOpen((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const visible = ITEMS.slice(0, VISIBLE_COUNT);
  const more = ITEMS.slice(VISIBLE_COUNT);

  const renderItem = (item: Item, i: number) => (
    <div className={i === 0 ? "faq-item faq-item-featured" : "faq-item"} key={i}>
      <button className="faq-q" type="button" aria-expanded={open[i]} onClick={() => toggle(i)}>
        <span className="qt">
          <span data-en>{item.q}</span>
          <span data-ur className="urdu">{item.qUr}</span>
        </span>
        <span className="qc">+</span>
      </button>
      <div className="faq-a" style={{ gridTemplateRows: open[i] ? "1fr" : "0fr" }}>
        <div className="faq-a-in">
          <div className="faq-a-pad">
            <span data-en>{item.a}</span>
            <span data-ur className="urdu">{item.aUr}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="block faq" id="faq">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <PulseAccent />
          <h2>
            <span data-en>The worries we hear most, answered plainly.</span>
            <span data-ur className="urdu">وہ سوالات جن کی گھر والے سب سے زیادہ فکر کرتے ہیں۔</span>
          </h2>
          <p>
            <span data-en>The real questions stressed families ask before they let us in. Tap any to read the answer.</span>
            <span data-ur className="urdu">گھر میں کسی کو بلانے سے پہلے گھر والے یہی سوال پوچھتے ہیں۔ جواب پڑھنے کے لیے ٹیپ کریں۔</span>
          </p>
        </div>

        <div className="faq-list" data-reveal>
          {visible.map((item, i) => renderItem(item, i))}
        </div>

        <div className="disc" data-open={moreOpen ? "1" : "0"}>
          <button className="disc-head" type="button" aria-expanded={moreOpen} onClick={() => setMoreOpen((o) => !o)}>
            <span className="disc-ico"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" /></svg></span>
            <span className="disc-titles">
              <span className="dt">
                <span data-en>More questions</span>
                <span data-ur className="urdu">مزید سوالات</span>
              </span>{" "}
              <span className="ds">
                <span data-en>5 more answers &middot; tap to read</span>
                <span data-ur className="urdu">5 مزید جواب &middot; پڑھنے کے لیے ٹیپ کریں</span>
              </span>
            </span>
            <span className="disc-chev" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </button>
          <div className="disc-body" style={{ gridTemplateRows: moreOpen ? "1fr" : "0fr" }}>
            <div className="disc-body-inner">
              <div className="disc-body-pad">
                <div className="faq-list">
                  {more.map((item, idx) => renderItem(item, VISIBLE_COUNT + idx))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
