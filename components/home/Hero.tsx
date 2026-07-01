// Direction-6 hero — worry headline + trust pills + lead form.
import LeadFormD6 from "@/components/home/LeadFormD6";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span data-en>A real person is one call away</span>
              <span data-ur>ایک حقیقی فرد ایک کال کی دوری پر</span>
            </span>
            <h1>
              <span data-en>Worried about caring for someone at home? <span className="hl">Leave your number</span> — a real person calls you back.</span>
              <span data-ur className="urdu">گھر پر کسی کی دیکھ بھال کی فکر ہے؟ <span className="hl">بس اپنا نمبر دیں</span> — ایک حقیقی فرد آپ کو کال کرے گا۔</span>
            </h1>
            <p className="hero-sub">
              <span data-en>Take a breath. No advance to pay, no long form to fight. Tell us your name and number. We&rsquo;ll call, listen, and arrange a verified nurse or attendant.</span>
              <span data-ur className="urdu">ایک لمبا سانس لیں۔ کوئی پیشگی رقم نہیں، کوئی لمبا فارم نہیں۔ بس نام اور نمبر دیں — ہم کال کر کے سب بندوبست کر دیتے ہیں۔</span>
            </p>

            <div className="hero-trust">
              <span className="pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.4-2.9 7.9-7 9-4.1-1.1-7-4.6-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" strokeLinecap="round" /></svg>
                <span data-en>PNC-registered nurses</span>
                <span data-ur className="urdu">پی این سی رجسٹرڈ نرسیں</span>
              </span>
              <span className="pill">
                <span data-en>Pay after the shift</span>
                <span data-ur className="urdu">شفٹ کے بعد ادائیگی</span>
              </span>
              <span className="pill">
                <span data-en>0 advance</span>
                <span data-ur className="urdu">صفر پیشگی</span>
              </span>
            </div>
          </div>

          <div className="hero-form">
            <LeadFormD6 variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
