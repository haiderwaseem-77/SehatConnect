import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import FounderNote from "@/components/home/FounderNote";
import CtaBanner from "@/components/home/CtaBanner";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Sehat Connect Home Nursing Service Lahore",
  description:
    "Learn about Sehat Connect — Lahore's trusted home nursing service connecting families with PNC-registered nurses and trained attendants. Verified, affordable, open 24/7.",
  alternates: { canonical: `${SITE_URL}/about` },
};

const CREDENTIALS: { en: React.ReactNode; ur: string }[] = [
  {
    en: (
      <>
        <b>PNC registered</b> — every Qualified Nurse is on the Pakistan Nursing Council register
      </>
    ),
    ur: "ہر کوالیفائیڈ نرس پاکستان نرسنگ کونسل میں رجسٹرڈ ہے",
  },
  {
    en: (
      <>
        <b>CNIC &amp; references checked</b>, verified in person by our team
      </>
    ),
    ur: "شناختی کارڈ اور حوالہ جات کی جانچ، ہماری ٹیم کی ذاتی تصدیق",
  },
  {
    en: (
      <>
        Their <b>card is sent on WhatsApp</b> — photo, name and PNC number — before anyone visits
      </>
    ),
    ur: "آنے سے پہلے واٹس ایپ پر کارڈ — تصویر، نام اور پی این سی نمبر",
  },
  {
    en: (
      <>
        <b>Female-for-female</b> matching whenever a family asks for it
      </>
    ),
    ur: "جب گھرانہ چاہے، خاتون مریض کے لیے خاتون نرس",
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
              <span className="eyebrow">
                <span data-en>About Sehat Connect</span>
                <span data-ur className="urdu">سحت کنیکٹ کے بارے میں</span>
              </span>
              <h2>
                <span data-en>Proper nursing care at home — for every family.</span>
                <span data-ur className="urdu">ہر گھرانے کے لیے گھر پر مناسب نرسنگ کیئر۔</span>
              </h2>
              <p>
                <span data-en>
                  We believe every Pakistani family deserves proper nursing care at home — not just those who can
                  afford a long hospital stay.
                </span>
                <span data-ur className="urdu">
                  ہمارا یقین ہے کہ ہر پاکستانی گھرانہ گھر پر مناسب نرسنگ کیئر کا حقدار ہے — نہ کہ صرف وہ جو لمبے ہسپتال قیام
                  کا خرچ اٹھا سکیں۔
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
                  Most families in Pakistan have no easy way to get a qualified nurse at home after surgery or during
                  illness. They either rely on untrained helpers or have to stay in hospital longer than needed. Sehat
                  Connect was started to fix that. We send verified, PNC-registered nurses and trained attendants
                  directly to your home — so your family member recovers safely and comfortably.
                </span>
                <span data-ur className="urdu">
                  پاکستان میں زیادہ تر گھرانوں کے پاس آپریشن کے بعد یا بیماری کے دوران گھر پر کوالیفائیڈ نرس حاصل کرنے کا آسان
                  راستہ نہیں۔ وہ یا تو غیر تربیت یافتہ مددگاروں پر انحصار کرتے ہیں یا ضرورت سے زیادہ ہسپتال میں رہتے ہیں۔ سحت
                  کنیکٹ اسی کو حل کرنے کے لیے شروع ہوا۔ ہم تصدیق شدہ، پی این سی رجسٹرڈ نرسیں اور تربیت یافتہ اٹینڈنٹ براہِ راست
                  آپ کے گھر بھیجتے ہیں — تاکہ آپ کا پیارا محفوظ اور آرام سے صحت یاب ہو۔
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
              <span className="eyebrow">
                <span data-en>Why families trust us</span>
                <span data-ur className="urdu">گھرانے ہم پر بھروسہ کیوں کرتے ہیں</span>
              </span>
              <h2>
                <span data-en>Every caregiver, verified before they reach your door.</span>
                <span data-ur className="urdu">ہر نگہداشت کرنے والا آپ کے دروازے تک پہنچنے سے پہلے تصدیق شدہ۔</span>
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

        {/* Closer — repeat lead form + call/WhatsApp */}
        <CtaBanner />
        <div className="seam-gold" aria-hidden="true" />
      </main>
      <Footer />
    </LandingRoot>
  );
}
