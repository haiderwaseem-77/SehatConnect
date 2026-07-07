// Direction-6 hero — worry headline + trust pills + lead form.
import LeadFormD6 from "@/components/home/LeadFormD6";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span data-en>Care for your loved one is one call away</span>
              <span data-ur className="urdu">آپ کے پیارے کے لیے دیکھ بھال صرف ایک کال دور</span>
            </span>
            <h1>
              <span data-en>A caring nurse or attendant for your loved one at home. <span className="hl">Leave your number</span> — we&rsquo;ll arrange the right person.</span>
              <span data-ur className="urdu">گھر پر آپ کے پیارے کے لیے خیال رکھنے والی نرس یا اٹینڈنٹ۔ <span className="hl">اپنا نمبر چھوڑیں</span> — ہم مناسب فرد کا بندوبست کریں گے۔</span>
            </h1>
            <p className="hero-sub">
              <span data-en>Leave your name and phone. We&rsquo;ll call and arrange the right nurse or attendant.</span>
              <span data-ur className="urdu">اپنا نام اور فون دیں۔ ہم کال کر کے صحیح نرس یا اٹینڈنٹ کا بندوبست کریں گے۔</span>
            </p>

            <div className="hero-trust">
              <span className="pill">
                <span data-en>First day free</span>
                <span data-ur className="urdu">پہلا دن مفت</span>
              </span>
              <span className="pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.4-2.9 7.9-7 9-4.1-1.1-7-4.6-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" strokeLinecap="round" /></svg>
                <span data-en>PNC-registered nurses</span>
                <span data-ur className="urdu">پی این سی رجسٹرڈ نرسیں</span>
              </span>
              <span className="pill">
                <span data-en>No advance</span>
                <span data-ur className="urdu">کوئی پیشگی نہیں</span>
              </span>
              <span className="pill">
                <span data-en>Day or night</span>
                <span data-ur className="urdu">دن ہو یا رات</span>
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
