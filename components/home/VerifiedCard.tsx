// Direction-6 verified ID card — dark section, sample nurse card + choice note.
export default function VerifiedCard() {
  return (
    <section className="verified" id="who">
      <div className="wrap">
        <div className="verified-layout">
          <div className="verified-head">
            <h2>We send you the nurse&rsquo;s card before the shift.</h2>
            <p>Photo, full name, PNC registration number and verification, on WhatsApp, before anyone enters your home. You meet them first. No strangers, no surprises.</p>
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
                <span className="sample-tag">Sample photo</span>
                <div className="figure" aria-hidden="true">
                  <svg viewBox="0 0 200 230" fill="none">
                    <circle cx="100" cy="80" r="40" fill="rgba(251,248,242,.20)" />
                    <path d="M36 230 v-18 a64 54 0 0 1 128 0 v18" fill="rgba(251,248,242,.20)" />
                  </svg>
                </div>
              </div>
              <div className="id-info">
                <h3>Ayesha Saleem</h3>
                <div className="id-role">Qualified Nurse &middot; 6 yrs experience</div>
                <div className="id-meta">
                  <div className="id-row">
                    <span className="tick"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>
                    <span><b>PNC registered</b><span className="pnc-pill">PNC-LHR-2024-08812</span></span>
                  </div>
                  <div className="id-row">
                    <span className="tick"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>
                    <span><b>CNIC &amp; references checked</b>, verified in person by our team</span>
                  </div>
                  <div className="id-row">
                    <span className="tick"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>
                    <span>Trained in <b>post-op, elderly &amp; night-duty</b> care</span>
                  </div>
                </div>
                <div className="id-foot">
                  <span className="female-badge">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0A6258" strokeWidth="2.4" strokeLinecap="round"><circle cx="12" cy="8" r="5" /><path d="M12 13v8M9 18h6" /></svg>
                    <span className="fb-text"><b>Female-for-female</b><span className="urdu">خواتین کے لیے خاتون</span></span>
                  </span>
                  <span className="id-note">Sample card. Your nurse&rsquo;s real card is sent on WhatsApp before the visit.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="verified-foot">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>
          Every Qualified Nurse is Pakistan Nursing Council registered; every Attendant is background-verified. You always know who is at your door.
        </p>
      </div>
    </section>
  );
}
