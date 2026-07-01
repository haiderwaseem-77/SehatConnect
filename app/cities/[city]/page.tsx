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
  WHATSAPP_NUMBER,
  PRICES,
  SITE_URL,
} from "@/lib/constants";

export function generateStaticParams() {
  return ["lahore", "karachi", "islamabad", "rawalpindi", "faisalabad"].map(city => ({ city }));
}

function resolveCity(slug: string) {
  const cityName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Your City";
  const isLive = LIVE_CITIES.some(c => c.toLowerCase() === slug.toLowerCase());
  return { cityName, isLive };
}

const nursePrice = `Rs ${PRICES.qualified_nurse.toLocaleString("en-US")}`;
const attendantPrice = `Rs ${PRICES.attendant.toLocaleString("en-US")}`;

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const slug = (city ?? "").toLowerCase();
  const { cityName, isLive } = resolveCity(slug);
  const canonical = `${SITE_URL}/cities/${slug}`;

  return {
    title: { absolute: `Home Nurse in ${cityName} | Sehat Connect` },
    description: isLive
      ? `Verified male and female nurses and attendants at home in ${cityName} — PNC-registered and background-checked. From ${attendantPrice}–${nursePrice} per 12-hour shift, pay after the shift. Call ${CONTACT_PHONE_DISPLAY}.`
      : `Sehat Connect is launching verified home nursing in ${cityName} soon. Leave your name and number and we'll call you the day we go live. Call ${CONTACT_PHONE_DISPLAY}.`,
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
        areaServed: {
          "@type": "City",
          name: cityName,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: cityName,
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
        openingHours: "Mo-Su 00:00-23:59",
        priceRange: `Rs. ${PRICES.attendant.toLocaleString()} - Rs. ${PRICES.qualified_nurse.toLocaleString()} per shift`,
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
                        <span data-en>Home nurse in <span className="hl">{cityName}</span></span>
                        <span data-ur className="urdu"><span className="hl">{cityName}</span> میں گھر پر نرس</span>
                      </>
                    ) : (
                      <>
                        <span data-en>Home nurse in <span className="hl">{cityName}</span> &mdash; coming soon</span>
                        <span data-ur className="urdu"><span className="hl">{cityName}</span> میں گھر پر نرس &mdash; جلد آ رہا ہے</span>
                      </>
                    )}
                  </h1>

                  <p className="hero-sub">
                    {isLive ? (
                      <>
                        <span data-en>Verified male and female nurses and attendants at home in {cityName} — PNC-registered and background-checked. From {attendantPrice}–{nursePrice} per 12-hour shift, and you pay after.</span>
                        <span data-ur className="urdu">{cityName} میں گھر پر تصدیق شدہ مرد و خاتون نرسیں اور اٹینڈنٹ — پی این سی رجسٹرڈ اور پس منظر کی جانچ شدہ۔ {attendantPrice} سے {nursePrice} فی 12 گھنٹے کی شفٹ، اور ادائیگی شفٹ کے بعد۔</span>
                      </>
                    ) : (
                      <>
                        <span data-en>We&rsquo;re launching Sehat Connect in {cityName} soon. Leave your name and number and we&rsquo;ll call you the day we go live.</span>
                        <span data-ur className="urdu">ہم جلد ہی {cityName} میں سہت کنیکٹ شروع کر رہے ہیں۔ اپنا نام اور نمبر دیں، جس دن ہم شروع ہوں گے ہم آپ کو کال کریں گے۔</span>
                      </>
                    )}
                  </p>

                  {isLive && (
                    <div className="hero-trust">
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
                        <span data-en>0 advance</span>
                        <span data-ur className="urdu">صفر پیشگی</span>
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
                        Sehat Connect provides verified home nursing in {cityName}. Our services cover post-operative care, elderly care, paediatric care, ICU step-down care, diabetic care, night duty, mother &amp; baby care, dementia care, and long-term palliative care — delivered by PNC-registered qualified nurses or trained attendants, depending on what your patient needs.
                      </span>
                      <span data-ur className="urdu">
                        سہت کنیکٹ {cityName} میں تصدیق شدہ گھریلو نرسنگ فراہم کرتا ہے۔ ہماری خدمات میں آپریشن کے بعد کی دیکھ بھال، بزرگوں کی دیکھ بھال، بچوں کی دیکھ بھال، آئی سی یو کے بعد کی دیکھ بھال، ذیابیطس کی دیکھ بھال، رات کی ڈیوٹی، ماں اور بچے کی دیکھ بھال، ڈیمنشیا کی دیکھ بھال، اور طویل مدتی آرام دہ نگہداشت شامل ہیں — جو پی این سی رجسٹرڈ نرسیں یا تربیت یافتہ اٹینڈنٹ آپ کے مریض کی ضرورت کے مطابق فراہم کرتے ہیں۔
                      </span>
                    </p>
                    <p style={{ fontSize: "17px", color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 500 }}>
                      <span data-en>
                        Every caregiver is CNIC-verified and background-checked. You can request a female or male nurse. Pricing is transparent: {nursePrice} per 12-hour shift for a qualified nurse, {attendantPrice} for an attendant. You pay after the shift — no advance payment.
                      </span>
                      <span data-ur className="urdu">
                        ہر نگہداشت کرنے والے کی شناختی کارڈ اور پس منظر کی تصدیق کی جاتی ہے۔ آپ خاتون یا مرد نرس کی درخواست کر سکتے ہیں۔ قیمت واضح ہے: کوالیفائیڈ نرس کے لیے {nursePrice} فی 12 گھنٹے کی شفٹ، اٹینڈنٹ کے لیے {attendantPrice}۔ ادائیگی شفٹ کے بعد — کوئی پیشگی رقم نہیں۔
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
                      Sehat Connect is bringing verified home nursing to {cityName} — post-operative care, elderly care, paediatric care and more, from PNC-registered nurses and trained attendants, all CNIC-verified and background-checked. We&apos;re not live in {cityName} yet — leave your details and we&apos;ll call you as soon as we launch. Questions? Call or WhatsApp{" "}
                      <strong style={{ color: "var(--teal-deep)" }}>{CONTACT_PHONE_DISPLAY}</strong>.
                    </span>
                    <span data-ur className="urdu">
                      سہت کنیکٹ {cityName} میں تصدیق شدہ گھریلو نرسنگ لا رہا ہے — آپریشن کے بعد کی دیکھ بھال، بزرگوں کی دیکھ بھال، بچوں کی دیکھ بھال اور بہت کچھ، پی این سی رجسٹرڈ نرسوں اور تربیت یافتہ اٹینڈنٹس کی طرف سے، سب شناختی کارڈ اور پس منظر کی جانچ شدہ۔ ہم ابھی {cityName} میں شروع نہیں ہوئے — اپنی تفصیلات دیں اور جیسے ہی ہم شروع ہوں گے ہم آپ کو کال کریں گے۔ سوالات؟ کال یا واٹس ایپ کریں{" "}
                      <strong style={{ color: "var(--teal-deep)" }}>{CONTACT_PHONE_DISPLAY}</strong>۔
                    </span>
                  </p>
                )}
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </LandingRoot>
    </>
  );
}
