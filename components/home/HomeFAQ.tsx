"use client";
// Direction-6 FAQ — the worries families ask, answered plainly. Bilingual lines
// are always shown (matches the mockup). Accordion uses the grid-rows 0fr→1fr fix.
// Page diet: 6 highest-intent items are always visible; the rest sit behind a
// "More questions" disclosure — same disc/disc-head/disc-body pattern as
// ServicesSection's "All services & prices".
import { useState } from "react";
import { PRICES } from "@/lib/constants";

const nurse = `Rs ${PRICES.qualified_nurse.toLocaleString("en-US")}`;
const attendant = `Rs ${PRICES.attendant.toLocaleString("en-US")}`;

type Item = { q: string; qUr: string; a: React.ReactNode; aUr: string };

// First 6 items are always visible; the remaining 5 sit behind "More questions".
const VISIBLE_COUNT = 6;

const ITEMS: Item[] = [
  {
    q: "“How do I know this isn’t a scam?”",
    qUr: "”مجھے کیسے پتا کہ یہ دھوکہ نہیں؟“",
    a: (
      <>There&rsquo;s no advance and no card number to hand over. The nurse finishes the 12-hour shift in your home — <b>then</b> you pay, cash on the visit. We&rsquo;re a real Lahore service working 24/7, and a real person is always one call away.</>
    ),
    aUr: "کوئی پیشگی نہیں، کوئی آن لائن رقم نہیں۔ شفٹ کے بعد نقد ادائیگی۔",
  },
  {
    q: "“Who actually comes into my home?”",
    qUr: "”میرے گھر میں کون آئے گا؟“",
    a: (
      <>A verified person whose card we send you first — photo, name and PNC number on WhatsApp before they arrive. Every Qualified Nurse is <b>PNC registered</b>; attendants are background-verified, CNIC &amp; references checked. Caring for a woman? Ask for a <b>female</b> nurse or attendant — female-for-female, always.</>
    ),
    aUr: "تصدیق شدہ فرد جس کا کارڈ آنے سے پہلے بھیجا جاتا ہے۔ خاتون کے لیے خاتون دستیاب۔",
  },
  {
    q: "“How fast can care start?”",
    qUr: "”دیکھ بھال کتنی جلدی شروع ہو سکتی ہے؟“",
    a: (
      <>Within <b>24 hours</b> of your call, often sooner. We confirm the caregiver on WhatsApp and send their card before they arrive.</>
    ),
    aUr: "کال کے 24 گھنٹوں میں دیکھ بھال شروع، اکثر اس سے بھی جلدی۔ آنے سے پہلے واٹس ایپ پر کارڈ ملتا ہے۔",
  },
  {
    q: "“What if we’re not comfortable with the caregiver?”",
    qUr: "”اگر ہمیں نگہداشت کنندہ سے اطمینان نہ ہو تو؟“",
    a: (
      <>Tell us after the first shift and <b>we&rsquo;ll send someone else</b>. You&rsquo;ve paid nothing in advance, so you&rsquo;re never stuck.</>
    ),
    aUr: "پہلی شفٹ کے بعد بتائیں، ہم دوسرا نگہداشت کنندہ بھیجیں گے۔ آپ نے پیشگی کچھ ادا نہیں کیا، اس لیے آپ کبھی نہیں پھنستے۔",
  },
  {
    q: "“How and when do I pay?”",
    qUr: "”ادائیگی کیسے اور کب؟“",
    a: (
      <>Cash after the shift — no advance, ever. Easypaisa and JazzCash are coming soon for convenience. You can cancel or reschedule free up to 4 hours before.</>
    ),
    aUr: "شفٹ کے بعد نقد — کوئی پیشگی نہیں۔ ایزی پیسہ / جاز کیش جلد۔",
  },
  {
    q: "“Which areas of Lahore do you cover?”",
    qUr: "”لاہور کے کن علاقوں میں؟“",
    a: (
      <>All of Lahore — DHA, Gulberg, Johar Town, Model Town, Bahria Town, Cantt and everywhere in between, 24/7. We ask your exact area on the call.</>
    ),
    aUr: "پورا لاہور — ڈی ایچ اے، گلبرگ، جوہر ٹاؤن، ماڈل ٹاؤن، بحریہ ٹاؤن، کینٹ۔",
  },
  {
    q: "“What’s the difference between a nurse and an attendant?”",
    qUr: "”نرس اور اٹینڈنٹ میں کیا فرق ہے؟“",
    a: (
      <>A <b>Qualified Nurse</b> ({nurse}) handles clinical care — medicines, wounds, injections, monitoring. An <b>Attendant</b> ({attendant}) handles non-clinical care — feeding, hygiene, movement and comfort. Both per 12-hour shift.</>
    ),
    aUr: "نرس طبی کام کرتی ہے؛ اٹینڈنٹ غیر طبی دیکھ بھال کرتا ہے۔",
  },
  {
    q: "“Can they actually do the medical work?”",
    qUr: "”کیا وہ اصل طبی کام کر سکتے ہیں؟“",
    a: (
      <>Yes. Our Qualified Nurses are Pakistan Nursing Council registered and do real nursing at home — wounds, dressings, injections, medicines, monitoring, post-op and ICU step-down care. For non-clinical help (feeding, hygiene, movement) an Attendant is enough, and we&rsquo;ll tell you honestly which you need.</>
    ),
    aUr: "جی ہاں — پی این سی رجسٹرڈ نرسیں گھر پر مکمل نرسنگ کرتی ہیں۔",
  },
  {
    q: "“Can I request the same nurse again?”",
    qUr: "”کیا میں دوبارہ وہی نرس مانگ سکتا ہوں؟“",
    a: (
      <>Yes. Tell us on WhatsApp and we try our best to send the same caregiver, so your loved one sees a familiar face. Continuity matters to us too.</>
    ),
    aUr: "جی ہاں۔ واٹس ایپ پر بتائیں، ہم وہی نگہداشت کنندہ بھیجنے کی کوشش کرتے ہیں۔",
  },
  {
    q: "“What if the caregiver is running late?”",
    qUr: "”اگر نگہداشت کنندہ دیر سے آئے تو؟“",
    a: (
      <>We keep you updated by WhatsApp/SMS, and you can always call us. If there&rsquo;s a delay, we sort out a replacement quickly — you&rsquo;re never left waiting without an answer.</>
    ),
    aUr: "ہم واٹس ایپ / ایس ایم ایس پر اپڈیٹ دیتے ہیں؛ تاخیر ہو تو فوراً متبادل بندوبست۔",
  },
  {
    q: "“I live abroad — can I arrange care for my parents in Lahore?”",
    qUr: "”میں بیرون ملک ہوں — کیا لاہور میں والدین کے لیے بندوبست ہو سکتا ہے؟“",
    a: (
      <>Yes. Many families arrange everything over WhatsApp from abroad — we send the caregiver&rsquo;s card before the shift, just like any booking, and keep you updated by WhatsApp throughout. Your family in Lahore pays after the shift, same as usual.</>
    ),
    aUr: "جی ہاں، واٹس ایپ پر بیرون ملک سے بندوبست ممکن ہے۔ شفٹ سے پہلے کارڈ اور واٹس ایپ پر اپڈیٹس ملتی ہیں۔ ادائیگی شفٹ کے بعد، ہمیشہ کی طرح۔",
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
    <div className="faq-item" key={i}>
      <button className="faq-q" type="button" aria-expanded={open[i]} onClick={() => toggle(i)}>
        <span className="qt">{item.q}<span className="urdu">{item.qUr}</span></span>
        <span className="qc">+</span>
      </button>
      <div className="faq-a" style={{ gridTemplateRows: open[i] ? "1fr" : "0fr" }}>
        <div className="faq-a-in">
          <div className="faq-a-pad">
            {item.a}
            <span className="urdu">{item.aUr}</span>
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
              <span className="dt">More questions <span className="urdu">مزید سوالات</span></span>{" "}
              <span className="ds">5 more answers &middot; tap to read<span className="urdu">5 مزید جوابات &middot; پڑھنے کے لیے ٹیپ کریں</span></span>
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
