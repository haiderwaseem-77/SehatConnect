"use client";
// Direction-6 FAQ — the worries families ask, answered plainly. Bilingual lines
// are always shown (matches the mockup). Accordion uses the grid-rows 0fr→1fr fix.
import { useState } from "react";
import { PRICES } from "@/lib/constants";

const nurse = `Rs ${PRICES.qualified_nurse.toLocaleString("en-US")}`;
const attendant = `Rs ${PRICES.attendant.toLocaleString("en-US")}`;

type Item = { q: string; qUr: string; a: React.ReactNode; aUr: string };

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
    q: "“Can they actually do the medical work?”",
    qUr: "”کیا وہ اصل طبی کام کر سکتے ہیں؟“",
    a: (
      <>Yes. Our Qualified Nurses are Pakistan Nursing Council registered and do real nursing at home — wounds, dressings, injections, medicines, monitoring, post-op and ICU step-down care. For non-clinical help (feeding, hygiene, movement) an Attendant is enough, and we&rsquo;ll tell you honestly which you need.</>
    ),
    aUr: "جی ہاں — پی این سی رجسٹرڈ نرسیں گھر پر مکمل نرسنگ کرتی ہیں۔",
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
    q: "“How and when do I pay?”",
    qUr: "”ادائیگی کیسے اور کب؟“",
    a: (
      <>Cash after the shift — no advance, ever. Easypaisa and JazzCash are coming soon for convenience. You can cancel or reschedule free up to 4 hours before.</>
    ),
    aUr: "شفٹ کے بعد نقد — کوئی پیشگی نہیں۔ ایزی پیسہ / جاز کیش جلد۔",
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
    q: "“Which areas of Lahore do you cover?”",
    qUr: "”لاہور کے کن علاقوں میں؟“",
    a: (
      <>All of Lahore — DHA, Gulberg, Johar Town, Model Town, Bahria Town, Cantt and everywhere in between, 24/7. We ask your exact area on the call.</>
    ),
    aUr: "پورا لاہور — ڈی ایچ اے، گلبرگ، جوہر ٹاؤن، ماڈل ٹاؤن، بحریہ ٹاؤن، کینٹ۔",
  },
  {
    q: "“What if the caregiver is running late?”",
    qUr: "”اگر نگہداشت کنندہ دیر سے آئے تو؟“",
    a: (
      <>We keep you updated by WhatsApp/SMS, and you can always call us. If there&rsquo;s a delay, we sort out a replacement quickly — you&rsquo;re never left waiting without an answer.</>
    ),
    aUr: "ہم واٹس ایپ / ایس ایم ایس پر اپڈیٹ دیتے ہیں؛ تاخیر ہو تو فوراً متبادل بندوبست۔",
  },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<boolean[]>(() => ITEMS.map(() => false));
  const toggle = (i: number) =>
    setOpen((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section className="block faq" id="faq">
      <div className="wrap">
        <div className="sec-head">
          <h2>The worries we hear most, answered plainly.</h2>
          <p>The real questions stressed families ask before they let us in. Tap any to read the answer.</p>
        </div>

        <div className="faq-list">
          {ITEMS.map((item, i) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
