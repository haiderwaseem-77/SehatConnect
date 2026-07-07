import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import FounderNote from "@/components/home/FounderNote";
import CtaBanner from "@/components/home/CtaBanner";
import { SITE_URL, OFFICE_ADDRESS, CONTACT_PHONE_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Sehat Connect Home Nursing Service Lahore",
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
    ur: "ہر نرس PNC رجسٹرڈ ہے",
  },
  {
    en: (
      <>
        <b>CNIC checked, references called, police-verified</b>, in person by our team
      </>
    ),
    ur: "شناختی کارڈ، حوالہ جات اور پولیس تصدیق",
  },
  {
    en: (
      <>
        We send their <b>card on WhatsApp</b> before the visit: photo, name and PNC number for nurses
      </>
    ),
    ur: "آنے سے پہلے واٹس ایپ کارڈ: تصویر، نام، PNC نمبر",
  },
  {
    en: (
      <>
        <b>Female-for-female</b> matching whenever a family asks for it
      </>
    ),
    ur: "خاتون مریض کے لیے خاتون نرس، جب آپ کہیں",
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

export default function AboutPage() {
  return (
    <LandingRoot>
      <Navbar />
      <main className="flex-1">
        {/* Intro + mission */}
        <section className="block">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow eyebrow-plain">
                <span data-en>About Sehat Connect</span>
                <span data-ur className="urdu">Sehat Connect کے بارے میں</span>
              </span>
              <h2>
                <span data-en>A Lahore home nursing service built for worried families.</span>
                <span data-ur className="urdu">لاہور میں گھر والوں کے لیے نرسنگ سروس۔</span>
              </h2>
              <p>
                <span data-en>
                  When someone is ill, the family needs clear answers: who will come, what can they do, and when do we pay?
                </span>
                <span data-ur className="urdu">
                  جب کوئی بیمار ہو، گھر والوں کو صاف جواب چاہیے: کون آئے گا، کیا کرے گا، ادائیگی کب ہو گی؟
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
                <span data-ur className="urdu">ہمارا مقصد</span>
              </h3>
              <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                <span data-en>
                  After surgery or illness, many families face two bad choices: untrained help at home, or a longer
                  hospital stay. Sehat Connect gives them a clearer option: PNC-registered nurses and trained attendants
                  sent to the home, with checks you can verify.
                </span>
                <span data-ur className="urdu">
                  آپریشن یا بیماری کے بعد گھر والوں کے پاس اکثر دو مشکل راستے ہوتے ہیں: غیر تربیت یافتہ مدد، یا ہسپتال میں زیادہ دن رہنا۔
                  Sehat Connect گھر پر PNC رجسٹرڈ نرسیں اور تربیت یافتہ اٹینڈنٹ بھیجتا ہے، ایسی تصدیق کے ساتھ جو آپ چیک کر سکیں۔
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
                <span data-ur className="urdu">گھر والے ہم پر بھروسہ کیوں کرتے ہیں</span>
              </span>
              <h2>
                <span data-en>Checks happen before anyone reaches your door.</span>
                <span data-ur className="urdu">دروازے تک آنے سے پہلے ہر فرد چیک ہوتا ہے۔</span>
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
                      <span data-ur className="urdu">{c.ur}</span>
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
                <span data-ur className="urdu">ہمارا دفتر</span>
              </h3>
              <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.6, fontWeight: 500 }}>
                <span data-en>{OFFICE_ADDRESS} &middot; </span>
                <span data-ur className="urdu">{OFFICE_ADDRESS} &middot; </span>
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
  );
}
