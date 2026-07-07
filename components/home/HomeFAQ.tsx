"use client";
// Direction-6 FAQ — the worries families ask, answered plainly.
// Accordion uses the grid-rows 0fr→1fr fix.
// Page diet: 6 highest-intent items are always visible; the rest sit behind a
// "More questions" disclosure — same disc/disc-head/disc-body pattern used
// elsewhere on the home page for collapsed-but-real content.
import { useState } from "react";

type Item = { q: string; qUr: string; a: React.ReactNode; aUr: string };

// First 6 items are always visible; the remaining 5 sit behind "More questions".
const VISIBLE_COUNT = 6;

const ITEMS: Item[] = [
  {
    q: "How do I know my loved one will get the care they deserve?",
    qUr: "مجھے کیسے پتا کہ میرے پیارے کو اچھی دیکھ بھال ملے گی؟",
    a: (
      <>We call first, understand what your loved one needs, and arrange a caring nurse or attendant for the home. <b>First day is free</b>, there is no advance, and if the person does not feel right, we replace them until you are satisfied.</>
    ),
    aUr: "ہم پہلے کال کر کے آپ کے پیارے کی ضرورت سمجھتے ہیں اور گھر کے لیے خیال رکھنے والی نرس یا اٹینڈنٹ کا بندوبست کرتے ہیں۔ پہلا دن مفت ہے، کوئی پیشگی نہیں، اور اگر فرد مناسب نہ لگے تو ہم آپ کی تسلی تک بدل دیتے ہیں۔",
  },
  {
    q: "Who actually comes into my home?",
    qUr: "میرے گھر میں کون آئے گا؟",
    a: (
      <>We arrange a caring nurse or attendant based on what your loved one needs. Every caregiver is <b>CNIC checked, references called, police-verified</b>. Caring for a woman? Ask for female-for-female.</>
    ),
    aUr: "ہم آپ کے پیارے کی ضرورت کے مطابق خیال رکھنے والی نرس یا اٹینڈنٹ کا بندوبست کرتے ہیں۔ ہر نگہداشت کنندہ کا شناختی کارڈ، حوالہ جات اور پولیس تصدیق چیک ہوتی ہے۔ خاتون کے لیے خاتون مانگ سکتے ہیں۔",
  },
  {
    q: "How fast can care start?",
    qUr: "دیکھ بھال کتنی جلدی شروع ہو سکتی ہے؟",
    a: (
      <>Within <b>24 hours</b> of your call, often sooner. We confirm the details on WhatsApp and arrange the right nurse or attendant.</>
    ),
    aUr: "کال کے 24 گھنٹوں میں دیکھ بھال شروع، اکثر اس سے بھی جلدی۔ ہم واٹس ایپ پر تفصیل کنفرم کر کے صحیح نرس یا اٹینڈنٹ کا بندوبست کرتے ہیں۔",
  },
  {
    q: "What if we’re not comfortable with the caregiver?",
    qUr: "اگر ہمیں نگہداشت کنندہ سے اطمینان نہ ہو تو؟",
    a: (
      <>Tell us — <b>we replace the caregiver, free, until you&rsquo;re fully satisfied</b>. You have paid nothing in advance, so you are never stuck.</>
    ),
    aUr: "ہمیں بتائیں — ہم نگہداشت کنندہ مفت بدلتے رہیں گے، جب تک آپ مکمل مطمئن نہ ہوں۔ آپ نے پیشگی کچھ ادا نہیں کیا، اس لیے آپ کبھی پھنسے نہیں۔",
  },
  {
    q: "How and when do I pay?",
    qUr: "ادائیگی کیسے اور کب؟",
    a: (
      <>Cash after the shift — no advance, ever. Easypaisa and JazzCash are coming soon for convenience. You can cancel or reschedule free up to 4 hours before.</>
    ),
    aUr: "شفٹ کے بعد نقد — کوئی پیشگی نہیں۔ ایزی پیسہ / جاز کیش جلد۔",
  },
  {
    q: "Which areas of Lahore do you cover?",
    qUr: "لاہور کے کن علاقوں میں؟",
    a: (
      <>All of Lahore — DHA, Gulberg, Johar Town, Model Town, Bahria Town, Cantt and everywhere in between, 24/7. We ask your exact area on the call.</>
    ),
    aUr: "پورا لاہور — ڈی ایچ اے، گلبرگ، جوہر ٹاؤن، ماڈل ٹاؤن، بحریہ ٹاؤن، کینٹ۔",
  },
  {
    q: "What’s the difference between a nurse and an attendant?",
    qUr: "نرس اور اٹینڈنٹ میں کیا فرق ہے؟",
    a: (
      <>A Qualified Nurse is PNC registered and handles clinical care — injections, drips, wound dressing, medicines and monitoring. An Attendant gives non-clinical support — feeding, hygiene, movement and companionship. We tell you the exact price on the first call, depending on which you need; either way, your first day is free, there is no advance, and you pay cash after the shift.</>
    ),
    aUr: "کوالیفائیڈ نرس پی این سی رجسٹرڈ ہوتی ہے اور طبی کام سنبھالتی ہے — انجیکشن، ڈرپ، زخم کی ڈریسنگ، دوائیں اور نگرانی۔ اٹینڈنٹ غیر طبی مدد دیتا ہے — کھانا کھلانا، صفائی، چلنا پھرنا اور رفاقت۔ آپ کو کون سا درکار ہے اسی کے مطابق قیمت ہم پہلی کال پر بتا دیتے ہیں؛ دونوں صورتوں میں پہلا دن مفت ہے، کوئی پیشگی نہیں، اور ادائیگی شفٹ کے بعد نقد ہوتی ہے۔",
  },
  {
    q: "Can they actually do the medical work?",
    qUr: "کیا وہ اصل طبی کام کر سکتے ہیں؟",
    a: (
      <>Yes. Our Qualified Nurses are Pakistan Nursing Council registered and do real nursing at home — wounds, dressings, injections, medicines, monitoring, post-op and ICU step-down care. For non-clinical help (feeding, hygiene, movement) an Attendant is enough, and we&rsquo;ll tell you honestly which you need.</>
    ),
    aUr: "جی ہاں — پی این سی رجسٹرڈ نرسیں گھر پر مکمل نرسنگ کرتی ہیں۔",
  },
  {
    q: "Can I request the same nurse again?",
    qUr: "کیا میں دوبارہ وہی نرس مانگ سکتا ہوں؟",
    a: (
      <>Yes. Tell us on WhatsApp and we try our best to send the same caregiver, so your loved one sees a familiar face. Continuity matters to us too.</>
    ),
    aUr: "جی ہاں۔ واٹس ایپ پر بتائیں، ہم وہی نگہداشت کنندہ بھیجنے کی کوشش کرتے ہیں۔",
  },
  {
    q: "What if the caregiver is running late?",
    qUr: "اگر نگہداشت کنندہ دیر سے آئے تو؟",
    a: (
      <>We keep you updated by WhatsApp/SMS, and you can always call us. If there&rsquo;s a delay, we sort out a replacement quickly — you&rsquo;re never left waiting without an answer.</>
    ),
    aUr: "ہم واٹس ایپ / ایس ایم ایس پر اپڈیٹ دیتے ہیں؛ تاخیر ہو تو فوراً متبادل بندوبست۔",
  },
  {
    q: "I live abroad — can I arrange care for my parents in Lahore?",
    qUr: "میں بیرون ملک ہوں — کیا لاہور میں والدین کے لیے بندوبست ہو سکتا ہے؟",
    a: (
      <>Yes. Many families arrange everything over WhatsApp from abroad. We keep you updated on WhatsApp, and your family in Lahore pays after the shift, same as usual.</>
    ),
    aUr: "جی ہاں، واٹس ایپ پر بیرون ملک سے بندوبست ممکن ہے۔ ہم واٹس ایپ پر اپڈیٹس دیتے ہیں۔ ادائیگی شفٹ کے بعد، ہمیشہ کی طرح۔",
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
        <div className="sec-head">
          <h2>
            <span data-en>The worries we hear most, answered plainly.</span>
            <span data-ur className="urdu">سب سے عام پریشانیوں کے صاف جواب۔</span>
          </h2>
          <p>
            <span data-en>The real questions stressed families ask before they let us in. Tap any to read the answer.</span>
            <span data-ur className="urdu">پریشان خاندان ہمیں گھر بلانے سے پہلے یہی سوالات پوچھتے ہیں۔ جواب پڑھنے کے لیے کسی پر بھی ٹیپ کریں۔</span>
          </p>
        </div>

        <div className="faq-list">
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
                <span data-ur className="urdu">5 مزید جوابات &middot; پڑھنے کے لیے ٹیپ کریں</span>
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
