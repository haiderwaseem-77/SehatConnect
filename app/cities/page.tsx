import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import { CITIES, LIVE_CITIES, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Cities We Serve | Home Nursing in Lahore | Sehat Connect" },
  description:
    "Sehat Connect provides verified home nursing in Lahore now — PNC-registered nurses and trained attendants. Karachi, Islamabad, Rawalpindi and Faisalabad are coming soon. Leave your number and a real person calls you back.",
  alternates: { canonical: `${SITE_URL}/cities` },
};

export default function CitiesPage() {
  return (
    <LandingRoot>
      <Navbar />
      <main className="flex-1">

        {/* Intro */}
        <section className="hero">
          <div className="wrap">
            <span className="eyebrow" style={{ marginBottom: "12px" }}>
              <span data-en>Where we work</span>
              <span data-ur className="urdu">ہم کہاں کام کرتے ہیں</span>
            </span>
            <h1>
              <span data-en>Cities we <span className="hl">serve</span></span>
              <span data-ur className="urdu">شہر جہاں ہم <span className="hl">خدمت</span> کرتے ہیں</span>
            </h1>
            <p className="hero-sub">
              <span data-en>Verified home nursing in Lahore now — more cities coming soon. Leave your number and a real person calls you back.</span>
              <span data-ur className="urdu">لاہور میں ابھی تصدیق شدہ گھریلو نرسنگ — مزید شہر جلد آ رہے ہیں۔ اپنا نمبر دیں، ایک حقیقی فرد آپ کو کال کرے گا۔</span>
            </p>
          </div>
        </section>

        {/* City card grid */}
        <section className="block" style={{ paddingTop: "10px" }}>
          <div className="wrap">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {CITIES.map(city => {
                const isLive = LIVE_CITIES.some(c => c.toLowerCase() === city.toLowerCase());

                const inner = (
                  <>
                    {!isLive && (
                      <span
                        style={{
                          position: "absolute",
                          top: "16px",
                          right: "16px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "7px",
                          fontSize: "13px",
                          fontWeight: 800,
                          letterSpacing: ".03em",
                          color: "var(--teal-deep)",
                          background: "var(--mist)",
                          border: "1px solid var(--line)",
                          borderRadius: "999px",
                          padding: "5px 12px",
                        }}
                      >
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--gold)", flex: "none" }} />
                        <span data-en>Coming soon</span>
                        <span data-ur className="urdu">جلد</span>
                      </span>
                    )}

                    <span
                      aria-hidden="true"
                      style={{
                        display: "grid",
                        placeItems: "center",
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        background: isLive ? "rgba(13,122,110,.12)" : "var(--cream-2)",
                        color: "var(--teal)",
                        marginBottom: "16px",
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>

                    <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--ink)", marginBottom: "6px", lineHeight: 1.2 }}>
                      {city}
                    </h2>
                    <p style={{ fontSize: "16px", color: "var(--ink-soft)", lineHeight: 1.5, fontWeight: 500, marginBottom: isLive ? "14px" : "0" }}>
                      {isLive ? (
                        <>
                          <span data-en>Nurses &amp; attendants — we&rsquo;ll call you back</span>
                          <span data-ur className="urdu">نرسیں اور اٹینڈنٹ — ہم آپ کو کال کریں گے</span>
                        </>
                      ) : (
                        <>
                          <span data-en>Launching soon</span>
                          <span data-ur className="urdu">جلد شروع ہو رہا ہے</span>
                        </>
                      )}
                    </p>

                    {isLive && (
                      <span style={{ fontSize: "16px", color: "var(--teal-deep)", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <span data-en>Request a call</span>
                        <span data-ur className="urdu">کال کی درخواست کریں</span>
                        <span aria-hidden="true">&rarr;</span>
                      </span>
                    )}
                  </>
                );

                const baseCardStyle: React.CSSProperties = {
                  background: "var(--paper)",
                  border: "1px solid var(--line)",
                  borderRadius: "18px",
                  padding: "26px 22px",
                  display: "block",
                  position: "relative",
                  boxShadow: "var(--shadow-sm)",
                };

                return isLive ? (
                  <Link
                    key={city}
                    href={`/cities/${city.toLowerCase()}`}
                    style={baseCardStyle}
                    className="transition-all hover:-translate-y-0.5 hover:border-[#0D7A6E] hover:shadow-md"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={city}
                    style={{ ...baseCardStyle, opacity: 0.9, borderStyle: "dashed" }}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </LandingRoot>
  );
}
