import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import LeadFormD6 from "@/components/home/LeadFormD6";
import {
  LIVE_CITIES,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_EMAIL,
  WHATSAPP_NUMBER,
  SITE_URL,
  OFFICE_POSTAL_ADDRESS,
} from "@/lib/constants";

export function generateStaticParams() {
  return ["lahore", "karachi", "islamabad", "rawalpindi", "faisalabad"].map(city => ({ city }));
}

function resolveCity(slug: string) {
  const cityName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Your City";
  const isLive = LIVE_CITIES.some(c => c.toLowerCase() === slug.toLowerCase());
  return { cityName, isLive };
}

// Same locality list as the footer's areas line and the HomeFAQ "Which areas
// of Lahore do you cover?" answer — keep these three in sync.
const LAHORE_AREAS = [
  { en: "DHA", ur: "ڈی ایچ اے" },
  { en: "Gulberg", ur: "گلبرگ" },
  { en: "Johar Town", ur: "جوہر ٹاؤن" },
  { en: "Model Town", ur: "ماڈل ٹاؤن" },
  { en: "Bahria Town", ur: "بحریہ ٹاؤن" },
  { en: "Cantt", ur: "کینٹ" },
];

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const slug = (city ?? "").toLowerCase();
  const { cityName, isLive } = resolveCity(slug);
  const canonical = `${SITE_URL}/cities/${slug}`;

  return {
    title: { absolute: `Nurse or Attendant at Home in ${cityName} | Sehat Connect` },
    description: isLive
      ? `Nurses and attendants at home in ${cityName}. PNC-registered nurses; every caregiver is CNIC checked, references called, police-verified. First day free. No advance. Call ${CONTACT_PHONE_DISPLAY}.`
      : `Sehat Connect is coming to ${cityName} soon with nurses and attendants at home. Leave your name and number and we'll call you the day we go live. Call ${CONTACT_PHONE_DISPLAY}.`,
    alternates: { canonical },
    // Not-yet-live cities are thin content — keep them out of the index but let
    // link equity flow. Live cities (Lahore) stay fully indexable.
    ...(isLive ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const slug = (city ?? "").toLowerCase();
  const { cityName, isLive } = resolveCity(slug);

  // LocalBusiness / MedicalBusiness schema only for the LIVE city (Lahore).
  // Non-live cities are noindexed, so no business schema for them.
  const jsonLd = isLive
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        name: "Sehat Connect",
        description: `Home nursing service in ${cityName} providing PNC-registered nurses and trained attendants for post-operative care, elderly care, paediatric care and more.`,
        url: `${SITE_URL}/cities/${slug}`,
        telephone: CONTACT_PHONE_TEL,
        email: CONTACT_EMAIL,
        areaServed: {
          "@type": "City",
          name: cityName,
        },
        // Same physical office for every live city page — one business, one
        // address, areaServed changes per city (matches how GBP models this).
        address: OFFICE_POSTAL_ADDRESS,
        openingHours: "Mo-Su 00:00-23:59",
        // priceRange intentionally omitted — prices are hidden from all public
        // surfaces as of 2026-07-02 (NORTH-STAR Decision Ledger).
        sameAs: [`https://wa.me/${WHATSAPP_NUMBER}`],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <LandingRoot>
        <Navbar />
        <main className="flex-1">

          {/* Hero — two-column: copy + lead form (mirrors the home hero) */}
          <section className="hero">
            <div className="wrap">
              <div className="hero-grid">
                <div className="hero-copy">
                  <Link
                    href="/cities"
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "15px", fontWeight: 700, color: "var(--teal-deep)", marginBottom: "14px" }}
                  >
                    <span aria-hidden="true">&larr;</span>
                    <span data-en>All cities</span>
                    <span data-ur className="urdu">تمام شہر</span>
                  </Link>

                  {!isLive && (
                    <div style={{ marginBottom: "12px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "14px",
                          fontWeight: 800,
                          letterSpacing: ".04em",
                          color: "var(--teal-deep)",
                          background: "var(--mist)",
                          border: "1px solid var(--line)",
                          borderRadius: "999px",
                          padding: "7px 14px",
                        }}
                      >
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gold)", flex: "none" }} />
                        <span data-en>Coming soon</span>
                        <span data-ur className="urdu">جلد آ رہا ہے</span>
                      </span>
                    </div>
                  )}

                  {isLive && (
                    <span className="eyebrow" style={{ marginBottom: "12px" }}>
                      <span data-en>A real person is one call away</span>
                      <span data-ur className="urdu">ایک حقیقی فرد ایک کال کی دوری پر</span>
                    </span>
                  )}

                  <h1>
                    {isLive ? (
                      <>
                        <span data-en>Nurse or attendant at home in <span className="hl">{cityName}</span></span>
                        <span data-ur className="urdu"><span className="hl">{cityName}</span> میں گھر پر نرس یا اٹینڈنٹ</span>
                      </>
                    ) : (
                      <>
                        <span data-en>Nurse or attendant at home in <span className="hl">{cityName}</span> &mdash; coming soon</span>
                        <span data-ur className="urdu"><span className="hl">{cityName}</span> میں گھر پر نرس یا اٹینڈنٹ &mdash; جلد آ رہا ہے</span>
                      </>
                    )}
                  </h1>

                  <p className="hero-sub">
                    {isLive ? (
                      <>
                        <span data-en>PNC-registered nurses and trained attendants at home in {cityName}. CNIC checked, references called, police-verified. First day free. Pay after the shift. No advance.</span>
                        <span data-ur className="urdu">{cityName} میں گھر پر PNC رجسٹرڈ نرسیں اور تربیت یافتہ اٹینڈنٹ۔ شناختی کارڈ، حوالہ جات اور پولیس تصدیق چیک ہوتی ہے۔ پہلا دن مفت۔ ادائیگی شفٹ کے بعد۔ کوئی پیشگی نہیں۔</span>
                      </>
                    ) : (
                      <>
                        <span data-en>Sehat Connect is coming to {cityName} soon. Leave your name and number and we&rsquo;ll call you the day we go live.</span>
                        <span data-ur className="urdu">Sehat Connect جلد ہی {cityName} میں آ رہا ہے۔ اپنا نام اور نمبر دیں، جس دن ہم شروع ہوں گے ہم آپ کو کال کریں گے۔</span>
                      </>
                    )}
                  </p>

                  {isLive && (
                    <div className="hero-trust">
                      <span className="pill">
                        <span data-en>First day free</span>
                        <span data-ur className="urdu">پہلا دن مفت</span>
                      </span>
                      <span className="pill">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.4-2.9 7.9-7 9-4.1-1.1-7-4.6-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" strokeLinecap="round" /></svg>
                        <span data-en>PNC-registered nurses</span>
                        <span data-ur className="urdu">پی این سی رجسٹرڈ نرسیں</span>
                      </span>
                      <span className="pill">
                        <span data-en>Pay after the shift</span>
                        <span data-ur className="urdu">شفٹ کے بعد ادائیگی</span>
                      </span>
                      <span className="pill">
                        <span data-en>No advance</span>
                        <span data-ur className="urdu">کوئی پیشگی نہیں</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="hero-form">
                  {!isLive && (
                    <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", margin: "0 0 12px" }}>
                      <span data-en>Be first in line in {cityName}:</span>
                      <span data-ur className="urdu">{cityName} میں سب سے پہلے شامل ہوں:</span>
                    </p>
                  )}
                  <LeadFormD6 variant="hero" area={cityName} />
                </div>
              </div>
            </div>
          </section>

          {/* SEO prose (long-form, preserved) */}
          <section className="block" style={{ background: "var(--cream-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">
                  <span data-en>What we do</span>
                  <span data-ur className="urdu">ہم کیا کرتے ہیں</span>
                </span>
                <h2>
                  {isLive ? (
                    <>
                      <span data-en>Home nursing services in {cityName}</span>
                      <span data-ur className="urdu">{cityName} میں گھریلو نرسنگ خدمات</span>
                    </>
                  ) : (
                    <>
                      <span data-en>Coming to {cityName} soon</span>
                      <span data-ur className="urdu">{cityName} میں جلد آ رہا ہے</span>
                    </>
                  )}
                </h2>
              </div>

              <div className="founder-card">
                {isLive ? (
                  <div style={{ display: "grid", gap: "16px" }}>
                    <p style={{ fontSize: "17px", color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                      <span data-en>
                        Sehat Connect arranges nurses and attendants at home in {cityName}: post-op, elderly, paediatric, ICU step-down, diabetic, night duty, mother and baby, dementia, and long-term palliative care. We send a Qualified Nurse for medical tasks and an attendant for daily support.
                      </span>
                      <span data-ur className="urdu">
                        Sehat Connect {cityName} میں گھر پر نرس یا اٹینڈنٹ کا بندوبست کرتا ہے: آپریشن کے بعد، بزرگوں، بچوں، ICU کے بعد، ذیابیطس، رات کی ڈیوٹی، ماں اور بچے، ڈیمنشیا، اور طویل مدتی نگہداشت۔ طبی کام کے لیے کوالیفائیڈ نرس، روزمرہ مدد کے لیے اٹینڈنٹ۔
                      </span>
                    </p>
                    <p style={{ fontSize: "17px", color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                      <span data-en>
                        Every caregiver is CNIC checked, references called, police-verified. You can request a female or male caregiver. We tell you the exact price on the first call before care starts. No advance. Pay after the shift.
                      </span>
                      <span data-ur className="urdu">
                        ہر نگہداشت کنندہ کا شناختی کارڈ، حوالہ جات اور پولیس تصدیق چیک ہوتی ہے۔ آپ خاتون یا مرد نگہداشت کنندہ مانگ سکتے ہیں۔ نگہداشت شروع ہونے سے پہلے پہلی کال پر صحیح قیمت بتا دی جاتی ہے۔ کوئی پیشگی نہیں۔ ادائیگی شفٹ کے بعد۔
                      </span>
                    </p>
                    <p style={{ fontSize: "17px", color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                      <span data-en>Call or WhatsApp us at </span>
                      <span data-ur className="urdu">ہمیں کال یا واٹس ایپ کریں: </span>
                      <strong style={{ color: "var(--teal-deep)" }}>{CONTACT_PHONE_DISPLAY}</strong>.
                    </p>
                  </div>
                ) : (
                  <p style={{ fontSize: "17px", color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                    <span data-en>
                      Sehat Connect is not live in {cityName} yet. We plan to offer PNC-registered nurses and trained attendants for home care. Leave your details and we&apos;ll call when we launch. Questions? Call or WhatsApp{" "}
                      <strong style={{ color: "var(--teal-deep)" }}>{CONTACT_PHONE_DISPLAY}</strong>.
                    </span>
                    <span data-ur className="urdu">
                      Sehat Connect ابھی {cityName} میں شروع نہیں ہوا۔ ہم گھر پر PNC رجسٹرڈ نرسیں اور تربیت یافتہ اٹینڈنٹ فراہم کرنے کا ارادہ رکھتے ہیں۔ اپنی تفصیلات دیں، لانچ پر ہم کال کریں گے۔ سوالات؟ کال یا واٹس ایپ کریں{" "}
                      <strong style={{ color: "var(--teal-deep)" }}><bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi></strong>۔
                    </span>
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Named localities — keeps this the one indexed city page with real coverage detail */}
          {isLive && (
            <section className="block" style={{ paddingTop: 0 }}>
              <div className="wrap">
                <div className="sec-head" style={{ marginBottom: "14px" }}>
                  <h2 style={{ fontSize: "clamp(20px,4.4vw,26px)" }}>
                    <span data-en>Areas we serve in Lahore</span>
                    <span data-ur className="urdu">لاہور کے وہ علاقے جہاں ہم خدمات فراہم کرتے ہیں</span>
                  </h2>
                </div>
                <div className="founder-card">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {LAHORE_AREAS.map(area => (
                      <span
                        key={area.en}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "var(--teal-deep)",
                          background: "var(--mist)",
                          border: "1px solid var(--line)",
                          borderRadius: "999px",
                          padding: "7px 14px",
                        }}
                      >
                        <span data-en>{area.en}</span>
                        <span data-ur className="urdu">{area.ur}</span>
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: "16px", color: "var(--ink-soft)", lineHeight: 1.6, fontWeight: 500, margin: "16px 0 0" }}>
                    <span data-en>And everywhere in between, 24/7. We ask your exact area on the call.</span>
                    <span data-ur className="urdu">اور ان کے درمیان ہر جگہ، چوبیس گھنٹے۔ کال پر ہم آپ کا صحیح علاقہ پوچھ لیتے ہیں۔</span>
                  </p>
                </div>
              </div>
            </section>
          )}

        </main>
        <Footer />
      </LandingRoot>
    </>
  );
}
