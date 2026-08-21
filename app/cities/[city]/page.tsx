import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import LeadFormD6 from "@/components/home/LeadFormD6";
import {
  CITIES,
  LIVE_CITIES,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_EMAIL,
  SITE_URL,
  OFFICE_POSTAL_ADDRESS,
} from "@/lib/constants";
import { breadcrumbList, businessSameAs } from "@/lib/schema";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export function generateStaticParams() {
  return ["lahore", "karachi", "islamabad", "rawalpindi", "faisalabad"].map(city => ({ city }));
}

function resolveCity(slug: string) {
  const city = CITIES.find(c => c.en.toLowerCase() === slug.toLowerCase());
  const cityName = city?.en ?? (slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Your City");
  const cityUr = city?.ur ?? cityName;
  const isLive = LIVE_CITIES.some(c => c.toLowerCase() === slug.toLowerCase());
  return { cityName, cityUr, isLive };
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
  const { cityName, cityUr, isLive } = resolveCity(slug);

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
        sameAs: businessSameAs(),
      }
    : null;

  // Only live (indexable) cities get a trail — a noindex "coming soon" page
  // should not advertise itself as part of the site's structure.
  const crumbs = isLive
    ? [
        { name: "Cities we serve", nameUr: "جن شہروں میں ہم آتے ہیں", path: "/cities" },
        { name: cityName, nameUr: cityUr },
      ]
    : null;
  const breadcrumbs = crumbs ? breadcrumbList(crumbs) : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {breadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
      )}
      <LandingRoot>
        <Navbar />
        <main className="flex-1">
          {crumbs && <div className="wrap"><Breadcrumbs items={crumbs} /></div>}

          {/* Hero — two-column: copy + lead form (mirrors the home hero) */}
          <section className="hero">
            <div className="wrap">
              <div className="hero-grid">
                <div className="hero-copy">

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
                        <span data-ur lang="ur" dir="rtl" className="urdu">جلد آ رہا ہے</span>
                      </span>
                    </div>
                  )}

                  {isLive && (
                    <span className="eyebrow" style={{ marginBottom: "12px" }}>
                      <span data-en>A real person is one call away</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">حقیقی انسان، صرف ایک کال دور</span>
                    </span>
                  )}

                  <h1>
                    {isLive ? (
                      <>
                        <span data-en>Nurse or attendant at home in <span className="hl">{cityName}</span></span>
                        <span data-ur lang="ur" dir="rtl" className="urdu"><span className="hl">{cityUr}</span> میں گھر پر نرس یا اٹینڈنٹ</span>
                      </>
                    ) : (
                      <>
                        <span data-en>Nurse or attendant at home in <span className="hl">{cityName}</span> &mdash; coming soon</span>
                        <span data-ur lang="ur" dir="rtl" className="urdu"><span className="hl">{cityUr}</span> میں گھر پر نرس یا اٹینڈنٹ &mdash; جلد آ رہا ہے</span>
                      </>
                    )}
                  </h1>

                  <p className="hero-sub">
                    {isLive ? (
                      <>
                        <span data-en>PNC-registered nurses and trained attendants at home in {cityName}. CNIC checked, references called, police-verified. First day free. Pay after the shift. No advance.</span>
                        <span data-ur lang="ur" dir="rtl" className="urdu">{cityUr} میں گھر پر PNC رجسٹرڈ نرسیں اور تربیت یافتہ اٹینڈنٹ۔ شناختی کارڈ اور حوالہ جات چیک ہو جاتے ہیں، اور پولیس تصدیق بھی ہو جاتی ہے۔ پہلا دن مفت۔ پیشگی ادائیگی نہیں۔ ادائیگی شفٹ کے بعد۔</span>
                      </>
                    ) : (
                      <>
                        <span data-en>Sehat Connect is coming to {cityName} soon. Leave your name and number and we&rsquo;ll call you the day we go live.</span>
                        <span data-ur lang="ur" dir="rtl" className="urdu">Sehat Connect جلد {cityUr} میں شروع ہو رہا ہے۔ نام اور نمبر دیں؛ سروس شروع ہوتے ہی ہم کال کریں گے۔</span>
                      </>
                    )}
                  </p>

                  {isLive && (
                    <div className="hero-trust">
                      <span className="pill">
                        <span data-en>First day free</span>
                        <span data-ur lang="ur" dir="rtl" className="urdu">پہلا دن مفت</span>
                      </span>
                      <span className="pill">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.4-2.9 7.9-7 9-4.1-1.1-7-4.6-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" strokeLinecap="round" /></svg>
                        <span data-en>PNC-registered nurses</span>
                        <span data-ur lang="ur" dir="rtl" className="urdu">PNC رجسٹرڈ نرسیں</span>
                      </span>
                      <span className="pill">
                        <span data-en>Pay after the shift</span>
                        <span data-ur lang="ur" dir="rtl" className="urdu">شفٹ کے بعد ادائیگی</span>
                      </span>
                      <span className="pill">
                        <span data-en>No advance</span>
                        <span data-ur lang="ur" dir="rtl" className="urdu">کوئی پیشگی نہیں</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="hero-form">
                  {!isLive && (
                    <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", margin: "0 0 12px" }}>
                      <span data-en>Be first in line in {cityName}:</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{cityUr} میں پہلے اطلاع پائیں:</span>
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
                  <span data-ur lang="ur" dir="rtl" className="urdu">ہم کیا کرتے ہیں</span>
                </span>
                <h2>
                  {isLive ? (
                    <>
                      <span data-en>Home nursing services in {cityName}</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{cityUr} میں گھر پر نرسنگ خدمات</span>
                    </>
                  ) : (
                    <>
                      <span data-en>Coming to {cityName} soon</span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">{cityUr} میں جلد آ رہا ہے</span>
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
                      <span data-ur lang="ur" dir="rtl" className="urdu">
                        Sehat Connect {cityUr} میں گھر پر نرس یا اٹینڈنٹ کا بندوبست کرتا ہے: آپریشن کے بعد، بزرگوں کی دیکھ بھال، بچوں کی دیکھ بھال، ICU کے بعد، شوگر، رات کی ڈیوٹی، ماں اور بچہ، ڈیمنشیا اور طویل مدتی نگہداشت۔ طبی کام کے لیے نرس، روزمرہ مدد کے لیے اٹینڈنٹ مناسب ہوتا ہے۔
                      </span>
                    </p>
                    <p style={{ fontSize: "17px", color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                      <span data-en>
                        Every caregiver is CNIC checked, references called, police-verified. You can request a female or male caregiver. We tell you the exact price on the first call before care starts. No advance. Pay after the shift.
                      </span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">
                        ہر فرد کا شناختی کارڈ اور حوالہ جات چیک ہو جاتے ہیں، اور پولیس تصدیق بھی ہو جاتی ہے۔ خاتون یا مرد نرس/اٹینڈنٹ مانگ سکتے ہیں۔ صحیح قیمت پہلی کال پر بتا دیتے ہیں۔ پیشگی ادائیگی نہیں؛ ادائیگی شفٹ کے بعد۔
                      </span>
                    </p>
                    <p style={{ fontSize: "17px", color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                      <span data-en>Call or WhatsApp us at </span>
                      <span data-ur lang="ur" dir="rtl" className="urdu">ہمیں کال یا واٹس ایپ کریں: </span>
                      <strong style={{ color: "var(--teal-deep)" }}>{CONTACT_PHONE_DISPLAY}</strong>.
                    </p>
                  </div>
                ) : (
                  <p style={{ fontSize: "17px", color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                    <span data-en>
                      Sehat Connect is not live in {cityName} yet. We plan to offer PNC-registered nurses and trained attendants for home care. Leave your details and we&apos;ll call when we launch. Questions? Call or WhatsApp{" "}
                      <strong style={{ color: "var(--teal-deep)" }}>{CONTACT_PHONE_DISPLAY}</strong>.
                    </span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">
                      Sehat Connect ابھی {cityUr} میں شروع نہیں ہوا۔ ہم گھر پر PNC رجسٹرڈ نرسیں اور تربیت یافتہ اٹینڈنٹ لانے کی تیاری کر رہے ہیں۔ اپنی تفصیلات دیں؛ سروس شروع ہوتے ہی ہم کال کریں گے۔ سوال ہو تو کال یا واٹس ایپ کریں{" "}
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
                    <span data-ur lang="ur" dir="rtl" className="urdu">لاہور کے وہ علاقے جہاں ہم آتے ہیں</span>
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
                        <span data-ur lang="ur" dir="rtl" className="urdu">{area.ur}</span>
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: "16px", color: "var(--ink-soft)", lineHeight: 1.6, fontWeight: 500, margin: "16px 0 0" }}>
                    <span data-en>And everywhere in between, 24/7. We ask your exact area on the call.</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">اور آس پاس کے علاقے بھی، 24/7۔ صحیح علاقہ کال پر پوچھ لیتے ہیں۔</span>
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
