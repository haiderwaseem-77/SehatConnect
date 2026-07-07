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
            <span data-en>From your first call to care at home, we keep the next step simple.</span>
            <span data-ur className="urdu">آپ کی پہلی کال سے گھر پر دیکھ بھال تک، ہم ہر قدم آسان رکھتے ہیں۔</span>
          </p>
        </div>
        <ol className="steps">
          <li className="step">
            <div className="step-top">
              <span className="step-n">1</span>
              <h3>
                <span data-en>Tell us who needs care</span>
                <span data-ur className="urdu">ہمیں بتائیں دیکھ بھال کس کے لیے ہے</span>
              </h3>
            </div>
            <p>
              <span data-en>Leave your name and phone, or call or WhatsApp. Tell us what your loved one needs at home.</span>
              <span data-ur className="urdu">اپنا نام اور فون دیں، یا کال / واٹس ایپ کریں۔ ہمیں بتائیں آپ کے پیارے کو گھر پر کس دیکھ بھال کی ضرورت ہے۔</span>
            </p>
          </li>
          <li className="step">
            <div className="step-top">
              <span className="step-n">2</span>
              <h3>
                <span data-en>We arrange the right person</span>
                <span data-ur className="urdu">ہم مناسب فرد کا بندوبست کرتے ہیں</span>
              </h3>
            </div>
            <p>
              <span data-en>We call back, understand the situation, and match a caring nurse or attendant.</span>
              <span data-ur className="urdu">ہم کال کر کے صورتحال سمجھتے ہیں اور خیال رکھنے والی نرس یا اٹینڈنٹ کا بندوبست کرتے ہیں۔</span>
            </p>
          </li>
          <li className="step">
            <div className="step-top">
              <span className="step-n">3</span>
              <h3>
                <span data-en>Care comes home</span>
                <span data-ur className="urdu">دیکھ بھال گھر پہنچتی ہے</span>
              </h3>
            </div>
            <p>
              <span data-en>Your nurse or attendant arrives at the agreed time. First day is free.</span>
              <span data-ur className="urdu">نرس یا اٹینڈنٹ طے شدہ وقت پر گھر پہنچتا ہے۔ پہلا دن مفت ہے۔</span>
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
