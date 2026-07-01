// Direction-6 footer — ported from design-explorations-v2/direction-6-combined.html
import Link from "next/link";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/constants";
import { waLink, GENERIC_WA_MSG } from "@/lib/wa";

export default function Footer() {
  const wa = waLink(GENERIC_WA_MSG);
  return (
    <footer className="sc-footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <div className="brand">
              <span className="mark" aria-hidden="true">
                <svg viewBox="0 0 60 30">
                  <path d="M2 15 H18 L23 6 L30 24 L36 12 L40 15 H58" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="4" cy="15" r="3.5" fill="#6fd0c3" />
                  <circle cx="56" cy="15" r="3.5" fill="#6fd0c3" />
                </svg>
              </span>
              <span className="name">
                <b>Sehat <span style={{ color: "#6fd0c3" }}>Connect</span></b>
                <small style={{ color: "rgba(251,248,242,.7)" }}>bringing the hospital to your home</small>
              </span>
            </div>
            <p>Verified, PNC-registered nurses and background-checked attendants for your home, across Lahore. You always meet the caregiver before they arrive.</p>
            <p className="ur urdu">گھر پر قابلِ بھروسہ نرسیں اور اٹینڈنٹ — پورے لاہور میں۔</p>
          </div>
          <div className="foot-col">
            <h4>Talk to us &middot; 24/7</h4>
            <a className="foot-num" href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a>
            <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
            <Link href="/#get-call">Request a call back</Link>
          </div>
          <div className="foot-col">
            <h4>Our care</h4>
            <Link href="/services">Home nursing service</Link>
            <Link href="/services/qualified-nurse">Qualified nurse (PNC)</Link>
            <Link href="/services/attendant">Patient attendant</Link>
          </div>
          <div className="foot-col">
            <h4>On this page</h4>
            <Link href="/#how">How it works</Link>
            <Link href="/#price">The price receipt</Link>
            <Link href="/#services">What our nurses do</Link>
            <Link href="/#who">Who comes to you</Link>
            <Link href="/#faq">Questions families ask</Link>
          </div>
          <div className="foot-col">
            <h4>We serve all Lahore</h4>
            <Link href="/cities/lahore">Nursing care in Lahore</Link>
            <Link href="/about">About Sehat Connect</Link>
            <p className="areas">DHA &middot; Gulberg &middot; Johar Town &middot; Model Town &middot; Bahria Town &middot; Cantt, and everywhere in between.</p>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 Sehat Connect &middot; Lahore &middot; PNC-registered nurses, CNIC &amp; references checked. Pay after the shift, no advance.</span>
          <span className="urdu">گھر بیٹھے قابلِ بھروسہ نرسنگ کیئر</span>
        </div>
      </div>
    </footer>
  );
}
