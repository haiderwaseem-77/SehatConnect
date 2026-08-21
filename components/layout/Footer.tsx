// Direction-6 footer — ported from design-explorations-v2/direction-6-combined.html
import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { LIVE_AREAS } from "@/lib/areas";
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
                  <span data-ur lang="ur" dir="rtl" className="urdu">ہسپتال جیسی سہولت، آپ کے گھر پر</span>
                </small>
              </span>
            </div>
            <p data-en>PNC-registered nurses and trained attendants for your home, across Lahore. CNIC checked, references called, police-verified before the visit.</p>
            <p data-ur lang="ur" dir="rtl" className="ur urdu">PNC رجسٹرڈ نرسیں اور تربیت یافتہ اٹینڈنٹ، پورے لاہور میں۔ گھر آنے سے پہلے شناختی کارڈ اور حوالہ جات چیک ہو جاتے ہیں، اور پولیس تصدیق بھی ہو جاتی ہے۔</p>
          </div>
          <div className="foot-col">
            <h4><span data-en>Talk to us &middot; 24/7</span><span data-ur lang="ur" dir="rtl" className="urdu">ہم سے بات کریں &middot; ہر وقت</span></h4>
            <a className="foot-num" href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a>
            <a href={wa} target="_blank" rel="noopener noreferrer"><span data-en>WhatsApp us</span><span data-ur lang="ur" dir="rtl" className="urdu">واٹس ایپ کریں</span></a>
            <p><span data-en>Office</span><span data-ur lang="ur" dir="rtl" className="urdu">دفتر</span>: {OFFICE_ADDRESS}</p>
            <Link href="/#get-call"><span data-en>Request a call back</span><span data-ur lang="ur" dir="rtl" className="urdu">کال منگوائیں</span></Link>
          </div>
          <div className="foot-col">
            <h4><span data-en>Our care</span><span data-ur lang="ur" dir="rtl" className="urdu">ہماری خدمات</span></h4>
            <Link href="/services"><span data-en>All home nursing services</span><span data-ur lang="ur" dir="rtl" className="urdu">گھر پر نرسنگ کی تمام خدمات</span></Link>
            <Link href="/services/qualified-nurse"><span data-en>Qualified nurse (PNC)</span><span data-ur lang="ur" dir="rtl" className="urdu">PNC رجسٹرڈ نرس</span></Link>
            <Link href="/services/attendant"><span data-en>Patient attendant</span><span data-ur lang="ur" dir="rtl" className="urdu">مریض کا اٹینڈنٹ</span></Link>
            <Link href="/services/injection-drip"><span data-en>Injection &amp; drip at home</span><span data-ur lang="ur" dir="rtl" className="urdu">گھر پر انجیکشن اور ڈرپ</span></Link>
            <Link href="/services/post-operative-care"><span data-en>Post-operative care</span><span data-ur lang="ur" dir="rtl" className="urdu">آپریشن کے بعد دیکھ بھال</span></Link>
            <Link href="/services/elderly-care"><span data-en>Elderly care at home</span><span data-ur lang="ur" dir="rtl" className="urdu">بزرگوں کی گھر پر دیکھ بھال</span></Link>
            <Link href="/services/long-term-care"><span data-en>Long-term &amp; bedridden care</span><span data-ur lang="ur" dir="rtl" className="urdu">طویل مدتی اور بستر پر دیکھ بھال</span></Link>
            <Link href="/services/mother-baby-care"><span data-en>Care after delivery</span><span data-ur lang="ur" dir="rtl" className="urdu">زچگی کے بعد دیکھ بھال</span></Link>
            <Link href="/services/female-nurse"><span data-en>Female nurse at home</span><span data-ur lang="ur" dir="rtl" className="urdu">گھر پر خاتون نرس</span></Link>
            <Link href="/services/male-nurse"><span data-en>Male nurse at home</span><span data-ur lang="ur" dir="rtl" className="urdu">گھر پر مرد نرس</span></Link>
            <Link href="/services/physiotherapy"><span data-en>Physiotherapy at home</span><span data-ur lang="ur" dir="rtl" className="urdu">گھر پر فزیوتھراپی</span></Link>
            <Link href="/charges"><span data-en>Charges &amp; how payment works</span><span data-ur lang="ur" dir="rtl" className="urdu">اخراجات اور ادائیگی کا طریقہ</span></Link>
          </div>
          <div className="foot-col">
            <h4><span data-en>Guides for families</span><span data-ur lang="ur" dir="rtl" className="urdu">گھر والوں کے لیے رہنمائی</span></h4>
            {/* Driven by lib/guides.ts, so a new guide links itself from every
                page on the site the moment it is declared. */}
            <Link href="/guides"><span data-en>All guides</span><span data-ur lang="ur" dir="rtl" className="urdu">تمام رہنمائی</span></Link>
            {GUIDES.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`}>
                <span data-en>{g.name.en}</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">{g.name.ur}</span>
              </Link>
            ))}
            <Link href="/#how"><span data-en>How it works</span><span data-ur lang="ur" dir="rtl" className="urdu">طریقہ کار</span></Link>
            <Link href="/#faq"><span data-en>Questions families ask</span><span data-ur lang="ur" dir="rtl" className="urdu">گھر والوں کے سوالات</span></Link>
          </div>
          <div className="foot-col">
            <h4><span data-en>Where we come</span><span data-ur lang="ur" dir="rtl" className="urdu">ہم کہاں آتے ہیں</span></h4>
            <Link href="/cities/lahore"><span data-en>Nursing care in Lahore</span><span data-ur lang="ur" dir="rtl" className="urdu">لاہور میں گھر پر نرسنگ</span></Link>
            <Link href="/areas"><span data-en>Areas we serve</span><span data-ur lang="ur" dir="rtl" className="urdu">جن علاقوں میں ہم آتے ہیں</span></Link>
            {/* Driven by lib/areas.ts — only live areas, so this can never link a 404. */}
            {LIVE_AREAS.map((a) => (
              <Link key={a.slug} href={`/areas/${a.slug}`}>
                <span data-en>Nurse in {a.name.en}</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">{a.name.ur} میں نرس</span>
              </Link>
            ))}
            <Link href="/care-from-abroad"><span data-en>Arranging care from abroad</span><span data-ur lang="ur" dir="rtl" className="urdu">بیرونِ ملک سے بندوبست</span></Link>
            <Link href="/about"><span data-en>About Sehat Connect</span><span data-ur lang="ur" dir="rtl" className="urdu">Sehat Connect کے بارے میں</span></Link>
            <p className="areas">
              <span data-en>Model Town &middot; Bahria Town &middot; Cantt &middot; Wapda Town, and everywhere in between.</span>
              <span data-ur lang="ur" dir="rtl" className="urdu">ماڈل ٹاؤن &middot; بحریہ ٹاؤن &middot; کینٹ &middot; واپڈا ٹاؤن، اور آس پاس کے علاقے۔</span>
            </p>
          </div>
        </div>
        <div className="foot-bottom">
          <span data-en>&copy; 2026 Sehat Connect &middot; Lahore &middot; PNC-registered nurses &middot; CNIC checked, references called, police-verified. Pay after the shift, no advance.</span>
          <span data-ur lang="ur" dir="rtl" className="urdu">&copy; 2026 Sehat Connect &middot; لاہور &middot; PNC رجسٹرڈ نرسیں &middot; شناختی کارڈ چیک، حوالہ جات اور پولیس تصدیق۔ شفٹ کے بعد ادائیگی، کوئی پیشگی نہیں۔</span>
        </div>
      </div>
    </footer>
  );
}
