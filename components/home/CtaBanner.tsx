// Direction-6 final CTA — teal drench, repeat lead form.
import LeadFormD6 from "@/components/home/LeadFormD6";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/constants";
import { waLink, GENERIC_WA_MSG } from "@/lib/wa";

export default function CtaBanner() {
  return (
    <section className="closer" id="get-call">
      <div className="wrap">
        <div className="closer-grid">
          <div className="closer-copy">
            <h2>
              <span data-en>Leave your number. We call you back.</span>
              <span data-ur className="urdu">بس اپنا نمبر دیں۔ ہم آپ کو کال کریں گے۔</span>
            </h2>
            <p className="c-sub">
              <span data-en>Name and phone only. We&rsquo;ll call, understand the situation, and send the caregiver card before the visit.</span>
              <span data-ur className="urdu">صرف نام اور فون۔ ہم کال کر کے صورتحال سمجھیں گے اور آنے سے پہلے نگہداشت کنندہ کا کارڈ بھیجیں گے۔</span>
            </p>
            <p className="closer-urdu">
              <span data-en>Call or WhatsApp. Our team answers.</span>
              <span data-ur className="urdu">کال یا واٹس ایپ کریں۔ ہماری ٹیم جواب دے گی۔</span>
            </p>
            <div className="closer-actions">
              <a className="btn btn-wa" href={waLink(GENERIC_WA_MSG)} target="_blank" rel="noopener noreferrer" style={{ background: "#fff", borderColor: "#fff" }}>
                <span className="wadot" /> <span data-en>WhatsApp us now</span><span data-ur className="urdu">ابھی واٹس ایپ کریں</span>
              </a>
              <a className="btn btn-ghost" href={`tel:${CONTACT_PHONE_TEL}`} style={{ color: "#fff", borderColor: "rgba(255,255,255,.3)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
                <span data-en>Call {CONTACT_PHONE_DISPLAY}</span><span data-ur className="urdu">کال <bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi></span>
              </a>
            </div>
          </div>

          <LeadFormD6 variant="closer" />
        </div>
      </div>
    </section>
  );
}
