// Direction-6 footer — ported from design-explorations-v2/direction-6-combined.html
import Link from "next/link";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, OFFICE_ADDRESS } from "@/lib/constants";
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
                <small style={{ color: "rgba(251,248,242,.7)" }}>
                  <span data-en>bringing the hospital to your home</span>
                  <span data-ur className="urdu">ہسپتال جیسی سہولت، آپ کے گھر پر</span>
                </small>
              </span>
            </div>
            <p data-en>PNC-registered nurses and trained attendants for your home, across Lahore. CNIC checked, references called, police-verified before the visit.</p>
            <p data-ur className="ur urdu">PNC رجسٹرڈ نرسیں اور تربیت یافتہ اٹینڈنٹ، پورے لاہور میں۔ گھر آنے سے پہلے شناختی کارڈ اور حوالہ جات چیک ہو جاتے ہیں، اور پولیس تصدیق بھی ہو جاتی ہے۔</p>
          </div>
          <div className="foot-col">
            <h4><span data-en>Talk to us &middot; 24/7</span><span data-ur className="urdu">ہم سے بات کریں &middot; ہر وقت</span></h4>
            <a className="foot-num" href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a>
            <a href={wa} target="_blank" rel="noopener noreferrer"><span data-en>WhatsApp us</span><span data-ur className="urdu">واٹس ایپ کریں</span></a>
            <p><span data-en>Office</span><span data-ur className="urdu">دفتر</span>: {OFFICE_ADDRESS}</p>
            <Link href="/#get-call"><span data-en>Request a call back</span><span data-ur className="urdu">کال منگوائیں</span></Link>
          </div>
          <div className="foot-col">
            <h4><span data-en>Our care</span><span data-ur className="urdu">ہماری خدمات</span></h4>
            <Link href="/services"><span data-en>Home nursing service</span><span data-ur className="urdu">گھر پر نرسنگ سروس</span></Link>
            <Link href="/services/qualified-nurse"><span data-en>Qualified nurse (PNC)</span><span data-ur className="urdu">PNC رجسٹرڈ نرس</span></Link>
            <Link href="/services/attendant"><span data-en>Patient attendant</span><span data-ur className="urdu">مریض کا اٹینڈنٹ</span></Link>
            <Link href="/charges"><span data-en>Charges &amp; how payment works</span><span data-ur className="urdu">اخراجات اور ادائیگی کا طریقہ</span></Link>
          </div>
          <div className="foot-col">
            <h4><span data-en>On this page</span><span data-ur className="urdu">اس صفحے میں</span></h4>
            <Link href="/#how"><span data-en>How it works</span><span data-ur className="urdu">طریقہ کار</span></Link>
            <Link href="/#price"><span data-en>How payment works</span><span data-ur className="urdu">ادائیگی کا طریقہ</span></Link>
            <Link href="/#services"><span data-en>Care services</span><span data-ur className="urdu">دیکھ بھال کی خدمات</span></Link>
            <Link href="/#faq"><span data-en>Questions families ask</span><span data-ur className="urdu">گھر والوں کے سوالات</span></Link>
          </div>
          <div className="foot-col">
            <h4><span data-en>We serve all Lahore</span><span data-ur className="urdu">ہم پورے لاہور میں دستیاب ہیں</span></h4>
            <Link href="/cities/lahore"><span data-en>Nursing care in Lahore</span><span data-ur className="urdu">لاہور میں گھر پر نرسنگ</span></Link>
            <Link href="/about"><span data-en>About Sehat Connect</span><span data-ur className="urdu">Sehat Connect کے بارے میں</span></Link>
            <p className="areas">
              <span data-en>DHA &middot; Gulberg &middot; Johar Town &middot; Model Town &middot; Bahria Town &middot; Cantt, and everywhere in between.</span>
              <span data-ur className="urdu">ڈی ایچ اے &middot; گلبرگ &middot; جوہر ٹاؤن &middot; ماڈل ٹاؤن &middot; بحریہ ٹاؤن &middot; کینٹ، اور آس پاس کے علاقے۔</span>
            </p>
          </div>
        </div>
        <div className="foot-bottom">
          <span data-en>&copy; 2026 Sehat Connect &middot; Lahore &middot; PNC-registered nurses &middot; CNIC checked, references called, police-verified. Pay after the shift, no advance.</span>
          <span data-ur className="urdu">&copy; 2026 Sehat Connect &middot; لاہور &middot; PNC رجسٹرڈ نرسیں &middot; شناختی کارڈ چیک، حوالہ جات اور پولیس تصدیق۔ شفٹ کے بعد ادائیگی، کوئی پیشگی نہیں۔</span>
        </div>
      </div>
    </footer>
  );
}
