// Direction-6 verified ID card — dark section, sample nurse card + choice note.
export default function VerifiedCard() {
  return (
    <section className="verified" id="who">
      <div className="wrap">
        <div className="verified-layout">
          <div className="verified-head">
            <h2>
              <span data-en>We send you the nurse&rsquo;s card before the shift.</span>
              <span data-ur className="urdu">ہم شفٹ سے پہلے آپ کو نرس کا کارڈ بھیجتے ہیں۔</span>
            </h2>
            <p>
              <span data-en>Before anyone enters your home, we WhatsApp the caregiver card: photo, name, PNC number for nurses, and verification date.</span>
              <span data-ur className="urdu">کسی کے گھر آنے سے پہلے ہم واٹس ایپ پر نگہداشت کنندہ کا کارڈ بھیجتے ہیں: تصویر، نام، نرس کے لیے PNC نمبر، اور تصدیق کی تاریخ۔</span>
            </p>
            <div className="choice-note">
              <span className="cn-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="4.2" /><path d="M9 13.2V20M6.2 17h5.6" /><path d="M15.5 8.5 20 4m0 0h-3.6M20 4v3.6" /></svg>
              </span>
              <span className="cn-text">
                <b data-en>Female or male nurses. You choose.</b>
                <b data-ur className="urdu">خاتون یا مرد نرس۔ آپ کی مرضی۔</b>
                <span className="sub" data-en>Many families want a female nurse for a female patient. Just tell us when we call.</span>
                <span className="sub urdu" data-ur>بہت سے گھرانے خاتون مریض کے لیے خاتون نرس چاہتے ہیں۔ کال پر بتا دیں۔</span>
              </span>
            </div>
          </div>

          <div className="id-card" role="group" aria-label="Sample verified nurse card">
            <div className="id-strip" aria-hidden="true" />
            <div className="id-body">
              <div className="id-photo">
                <span className="sample-tag">
                  <span data-en>Sample photo</span>
                  <span data-ur className="urdu">نمونہ تصویر</span>
                </span>
                <div className="figure" aria-hidden="true">
                  <svg viewBox="0 0 200 230" fill="none">
                    <circle cx="100" cy="80" r="40" fill="rgba(251,248,242,.20)" />
                    <path d="M36 230 v-18 a64 54 0 0 1 128 0 v18" fill="rgba(251,248,242,.20)" />
                  </svg>
                </div>
              </div>
              <div className="id-info">
                <h3>Ayesha Saleem</h3>
                <div className="id-role">
                  <span data-en>Qualified Nurse &middot; 6 yrs experience</span>
                  <span data-ur className="urdu">کوالیفائیڈ نرس &middot; 6 سال کا تجربہ</span>
                </div>
                <div className="id-meta">
                  <div className="id-row">
                    <span className="tick"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>
                    <span>
                      <span data-en><b>PNC registered</b><span className="pnc-pill">PNC-LHR-2024-08812</span></span>
                      <span data-ur className="urdu"><b>پی این سی رجسٹرڈ</b><span className="pnc-pill">PNC-LHR-2024-08812</span></span>
                    </span>
                  </div>
                  <div className="id-row">
                    <span className="tick"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>
                    <span>
                      <span data-en><b>CNIC checked, references called, police-verified</b> &mdash; in person by our team</span>
                      <span data-ur className="urdu"><b>شناختی کارڈ کی جانچ، حوالہ جات کی تصدیق اور پولیس تصدیق</b> — ہماری ٹیم کی ذاتی تصدیق سے</span>
                    </span>
                  </div>
                  <div className="id-row">
                    <span className="tick"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>
                    <span>
                      <span data-en>Trained in <b>post-op, elderly &amp; night-duty</b> care</span>
                      <span data-ur className="urdu"><b>آپریشن کے بعد، بزرگوں اور رات کی ڈیوٹی</b> کی دیکھ بھال میں تربیت یافتہ</span>
                    </span>
                  </div>
                  <div className="id-row">
                    <span className="tick"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>
                    <span>
                      <span data-en>Verified on <b>12 June 2026</b></span>
                      <span data-ur className="urdu">تصدیق شدہ بتاریخ <b>12 جون 2026</b></span>
                    </span>
                  </div>
                </div>
                <div className="id-foot">
                  <span className="female-badge">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0A6258" strokeWidth="2.4" strokeLinecap="round"><circle cx="12" cy="8" r="5" /><path d="M12 13v8M9 18h6" /></svg>
                    <span className="fb-text"><b data-en>Female-for-female</b><span data-ur className="urdu">خواتین کے لیے خاتون</span></span>
                  </span>
                  <span className="id-note">
                    <span data-en>Sample card &mdash; your nurse&rsquo;s real card, with their own verification date, is sent on WhatsApp before the visit.</span>
                    <span data-ur className="urdu">نمونہ کارڈ — آپ کی نرس کا اصل کارڈ، اپنی تصدیق کی تاریخ کے ساتھ، ملاقات سے پہلے واٹس ایپ پر بھیجا جاتا ہے۔</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="verified-foot">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>
          <span>
            <span data-en>Every Qualified Nurse is Pakistan Nursing Council registered. Every caregiver is CNIC checked, references called, police-verified. You always know who is at your door.</span>
            <span data-ur className="urdu">ہر کوالیفائیڈ نرس پاکستان نرسنگ کونسل میں رجسٹرڈ ہے۔ ہر نگہداشت کنندہ کا شناختی کارڈ، حوالہ جات اور پولیس تصدیق چیک ہوتی ہے۔ آپ کو ہمیشہ معلوم ہوگا کہ آپ کے دروازے پر کون ہے۔</span>
          </span>
        </p>
      </div>
    </section>
  );
}
