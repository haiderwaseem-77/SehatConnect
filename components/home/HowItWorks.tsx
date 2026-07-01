// Direction-6 "How it works" — three numbered steps + WhatsApp on-the-way chip.
export default function HowItWorks() {
  return (
    <section className="block how" id="how">
      <div className="wrap">
        <div className="sec-head">
          <h2>
            <span data-en>How it works. Three simple steps.</span>
            <span data-ur className="urdu">یہ کیسے کام کرتا ہے۔ تین آسان مرحلے۔</span>
          </h2>
          <p>
            <span data-en>From your number to care at home, with a real person the whole way.</span>
            <span data-ur className="urdu">آپ کے نمبر سے لے کر گھر پر دیکھ بھال تک، ہر قدم پر ایک حقیقی فرد ساتھ۔</span>
          </p>
        </div>
        <ol className="steps">
          <li className="step">
            <div className="step-top">
              <span className="step-n">1</span>
              <h3>
                <span data-en>Leave your number, or just call</span>
                <span data-ur className="urdu">اپنا نمبر دیں، یا بس کال کریں</span>
              </h3>
            </div>
            <p>
              <span data-en>Tell us your name and number, or tap Call or WhatsApp. Thirty seconds, no long form.</span>
              <span data-ur className="urdu">بس اپنا نام اور نمبر دیں، یا کال / واٹس ایپ کریں۔ تیس سیکنڈ، کوئی لمبا فارم نہیں۔</span>
            </p>
          </li>
          <li className="step">
            <div className="step-top">
              <span className="step-n">2</span>
              <h3>
                <span data-en>A real person calls you back</span>
                <span data-ur className="urdu">ایک حقیقی فرد آپ کو کال کرتا ہے</span>
              </h3>
            </div>
            <p>
              <span data-en>We listen, understand the patient, and match a verified nurse or attendant. We send you their card on WhatsApp before the visit.</span>
              <span data-ur className="urdu">ہم سنتے ہیں، مریض کو سمجھتے ہیں، اور تصدیق شدہ نرس یا اٹینڈنٹ کا بندوبست کرتے ہیں۔ آنے سے پہلے ان کا کارڈ واٹس ایپ پر بھیجتے ہیں۔</span>
            </p>
          </li>
          <li className="step">
            <div className="step-top">
              <span className="step-n">3</span>
              <h3>
                <span data-en>Care arrives. You pay after</span>
                <span data-ur className="urdu">دیکھ بھال پہنچتی ہے۔ ادائیگی بعد میں</span>
              </h3>
            </div>
            <p>
              <span data-en>Your caregiver reaches home on time. You pay cash only after the shift, never before.</span>
              <span data-ur className="urdu">نگہداشت کنندہ وقت پر گھر پہنچتا ہے۔ آپ صرف شفٹ کے بعد نقد ادائیگی کرتے ہیں، پہلے کبھی نہیں۔</span>
            </p>
            <span className="step-wa">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Z" /></svg>
              <span>
                <span data-en>We message you on WhatsApp when your caregiver is on the way.</span>
                <span data-ur className="urdu">جب نگہداشت کنندہ راستے میں ہو تو ہم واٹس ایپ پر بتا دیتے ہیں۔</span>
              </span>
            </span>
          </li>
        </ol>
      </div>
    </section>
  );
}
