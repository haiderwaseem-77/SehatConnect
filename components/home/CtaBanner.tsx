// Direction-6 final CTA — teal drench, repeat lead form.
import LeadFormD6 from "@/components/home/LeadFormD6";
import PulseAccent from "@/components/home/PulseAccent";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/constants";
import { waLink, GENERIC_WA_MSG } from "@/lib/wa";

export default function CtaBanner() {
  return (
    <section className="closer" id="get-call">
      <div className="wrap">
        <div className="closer-grid">
          <div className="closer-copy" data-reveal>
            {/* cream-stroke accent so the brand ECG motif reads on the teal band */}
            <PulseAccent tone="cream" />
            <h2>
              <span data-en>Leave your number. We call you back.</span>
              <span data-ur lang="ur" dir="rtl" className="urdu">اپنا نمبر چھوڑ دیں۔ ہم واپس کال کریں گے۔</span>
            </h2>
            <p className="c-sub">
              <span data-en>The form takes less than 30 seconds. Our team will call and guide you from there.</span>
              <span data-ur lang="ur" dir="rtl" className="urdu">فارم 30 سیکنڈ سے کم لیتا ہے۔ ہماری ٹیم کال کر کے اگلا قدم بتا دے گی۔</span>
            </p>
            <p className="closer-urdu">
              <span data-en>Call or WhatsApp. Our team answers.</span>
              <span data-ur lang="ur" dir="rtl" className="urdu">کال یا واٹس ایپ کریں؛ ہماری ٹیم جواب دے گی۔</span>
            </p>
            <div className="closer-actions">
              <a className="btn btn-wa" href={waLink(GENERIC_WA_MSG)} target="_blank" rel="noopener noreferrer" style={{ background: "#fff", borderColor: "#fff" }}>
                <span className="wadot" /> <span data-en>WhatsApp us now</span><span data-ur lang="ur" dir="rtl" className="urdu">ابھی واٹس ایپ کریں</span>
              </a>
              <a className="btn btn-ghost" href={`tel:${CONTACT_PHONE_TEL}`} style={{ color: "#fff", borderColor: "rgba(255,255,255,.3)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
                <span data-en>Call {CONTACT_PHONE_DISPLAY}</span><span data-ur lang="ur" dir="rtl" className="urdu">کال <bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi></span>
              </a>
            </div>
          </div>

          <LeadFormD6 variant="closer" />
        </div>
      </div>
    </section>
  );
}
