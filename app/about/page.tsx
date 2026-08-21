import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import FounderNote from "@/components/home/FounderNote";
import CtaBanner from "@/components/home/CtaBanner";
import { SITE_URL, OFFICE_ADDRESS, CONTACT_PHONE_DISPLAY } from "@/lib/constants";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { breadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us | Home Nursing Service in Lahore",
  description:
    "Meet Sehat Connect: a Lahore home nursing service run by real people, with PNC-registered nurses, trained attendants, no advance, and 24/7 phone support.",
  alternates: { canonical: `${SITE_URL}/about` },
};

const CREDENTIALS: { en: React.ReactNode; ur: string }[] = [
  {
    en: (
      <>
        <b>PNC registered</b> — every Qualified Nurse is on the Pakistan Nursing Council register
      </>
    ),
    ur: "ہر نرس پاکستان نرسنگ کونسل میں رجسٹرڈ ہے",
  },
  {
    en: (
      <>
        <b>CNIC checked, references called, police-verified</b>, in person by our team
      </>
    ),
    ur: "شناختی کارڈ، حوالہ جات اور پولیس تصدیق ہماری ٹیم خود چیک کرتی ہے",
  },
  {
    en: (
      <>
        We send their <b>card on WhatsApp</b> before the visit: photo, name and PNC number for nurses
      </>
    ),
    ur: "آنے سے پہلے واٹس ایپ پر کارڈ بھیجتے ہیں: تصویر، نام، اور نرس کے لیے PNC نمبر",
  },
  {
    en: (
      <>
        <b>Female-for-female</b> matching whenever a family asks for it
      </>
    ),
    ur: "خاتون مریض کے لیے خاتون نرس یا اٹینڈنٹ، جب گھر والے کہیں",
  },
];

const cardStyle: React.CSSProperties = {
  background: "var(--paper)",
  border: "1px solid var(--line)",
  borderRadius: 20,
  padding: "28px 24px",
  position: "relative",
  overflow: "hidden",
  boxShadow: "var(--shadow-sm)",
};

const crumbs = [{ name: "About", nameUr: "ہمارے بارے میں" }];
const breadcrumbs = breadcrumbList(crumbs);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    <LandingRoot>
      <Navbar />
      <main className="flex-1">
          <div className="wrap"><Breadcrumbs items={crumbs} /></div>
        {/* Intro + mission */}
        <section className="block">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow eyebrow-plain">
                <span data-en>About Sehat Connect</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">Sehat Connect کے بارے میں</span>
              </span>
              {/* The page's H1 — /about had none, which is costly on the page
                  Google leans on hardest for E-E-A-T. */}
              <h1>
                <span data-en>A Lahore home nursing service built for worried families.</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">پریشان گھر والوں کے لیے لاہور کی گھریلو نرسنگ سروس۔</span>
              </h1>
              <p>
                <span data-en>
                  When someone is ill, the family needs clear answers: who will come, what can they do, and when do we pay?
                </span>
                <span data-ur lang="ur" dir="rtl" className="urdu">
                  جب کوئی بیمار ہو تو گھر والوں کو صاف جواب چاہیے: کون آئے گا، کیا کر سکے گا، اور ادائیگی کب ہو گی؟
                </span>
              </p>
            </div>

            <div style={{ ...cardStyle, paddingLeft: 32 }}>
              <span
                aria-hidden="true"
                style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "var(--teal)" }}
              />
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>
                <span data-en>Our mission</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">ہمارا مقصد</span>
              </h3>
              <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                <span data-en>
                  After surgery or illness, many families face two bad choices: untrained help at home, or a longer
                  hospital stay. Sehat Connect gives them a clearer option: PNC-registered nurses and trained attendants
                  sent to the home, with checks you can verify.
                </span>
                <span data-ur lang="ur" dir="rtl" className="urdu">
                  آپریشن یا بیماری کے بعد گھر والوں کے سامنے اکثر دو مشکل راستے ہوتے ہیں: گھر پر غیر تربیت یافتہ مدد، یا ہسپتال میں مزید دن رکنا۔
                  Sehat Connect ایک صاف راستہ دیتا ہے: PNC رجسٹرڈ نرسیں اور تربیت یافتہ اٹینڈنٹ گھر بھیجنا، ایسی تصدیق کے ساتھ جسے آپ خود چیک کر سکیں۔
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Founder story — reuses the home page human-proof block */}
        <FounderNote />

        {/* Credentials / trust */}
        <section className="block" style={{ background: "var(--cream-2)" }}>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow eyebrow-plain">
                <span data-en>Why families trust us</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">گھر والے ہم پر بھروسہ کیوں کرتے ہیں</span>
              </span>
              <h2>
                <span data-en>Checks happen before anyone reaches your door.</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">دروازے تک پہنچنے سے پہلے ہر فرد کی تصدیق ہوتی ہے۔</span>
              </h2>
            </div>

            <div style={cardStyle}>
              <div className="id-meta">
                {CREDENTIALS.map((c, i) => (
                  <div className="id-row" key={i}>
                    <span className="tick">
                      <svg viewBox="0 0 24 24">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <span>
                      <span data-en>{c.en}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{c.ur}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Office — a real, checkable address (rare in this category); also
            keeps NAP (name/address/phone) consistent with the footer, GBP
            and JSON-LD once the profile is live. */}
        <section className="block" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div style={cardStyle}>
              <h3 style={{ fontSize: 18, marginBottom: 8 }}>
                <span data-en>Our office</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">ہمارا دفتر</span>
              </h3>
              <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.6, fontWeight: 500 }}>
                <span data-en>{OFFICE_ADDRESS} &middot; </span>
                <span data-ur lang="ur" dir="rtl" className="urdu">{OFFICE_ADDRESS} &middot; </span>
                <strong style={{ color: "var(--teal-deep)" }}>{CONTACT_PHONE_DISPLAY}</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Closer — repeat lead form + call/WhatsApp */}
        <CtaBanner />
        <div className="seam-gold" aria-hidden="true" />
      </main>
      <Footer />
    </LandingRoot>
    </>
  );
}
