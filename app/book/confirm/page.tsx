import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import ConfirmGreeting from "@/components/home/ConfirmGreeting";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/constants";
import { waLink, GENERIC_WA_MSG } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Request Received",
  description: "Thank you — we've got your details. Our team will call you back shortly to arrange care.",
  robots: { index: false, follow: true },
};

const STEPS: { en: string; ur: string }[] = [
  {
    en: "We call you back to understand exactly what you need.",
    ur: "ہم آپ کی ضرورت سمجھنے کے لیے واپس کال کرتے ہیں۔",
  },
  {
    en: "We match you with the right caregiver and share their card with you first.",
    ur: "ہم مناسب نرس یا اٹینڈنٹ کا بندوبست کرتے ہیں اور پہلے اس کا کارڈ بھیجتے ہیں۔",
  },
  {
    en: "Your caregiver arrives at the agreed time.",
    ur: "نرس یا اٹینڈنٹ طے شدہ وقت پر پہنچتا ہے۔",
  },
  {
    en: "You pay after the shift — no advance, ever.",
    ur: "ادائیگی شفٹ کے بعد ہوتی ہے — پیشگی کبھی نہیں۔",
  },
];

export default async function BookingConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const resolvedParams = await searchParams;
  const ref = resolvedParams.ref ?? "";

  return (
    <LandingRoot>
      <Navbar />
      <main className="flex-1">
        <section className="block">
          <div className="wrap">
            <div
              style={{
                maxWidth: 560,
                margin: "0 auto",
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: 22,
                padding: "34px 26px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "var(--shadow)",
                textAlign: "center",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: 6,
                  width: "100%",
                  background: "linear-gradient(90deg,var(--teal),var(--teal-deep))",
                }}
              />

              {/* Success icon */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "var(--mist)",
                  display: "grid",
                  placeItems: "center",
                  margin: "6px auto 20px",
                }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--teal)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>

              <h1 style={{ fontSize: "clamp(24px,5.5vw,30px)", marginBottom: 12 }}>
                <span data-en>Done. Our team will call you back soon.</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">
                  درخواست موصول ہو گئی۔ ہماری ٹیم جلد واپس کال کرے گی۔
                </span>
              </h1>

              <p style={{ fontSize: 18, color: "var(--ink)", fontWeight: 700, marginBottom: 8 }}>
                <ConfirmGreeting />
              </p>

              <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.65, marginBottom: 22, fontWeight: 500 }}>
                <span data-en>
                  We&rsquo;ll call from <strong>{CONTACT_PHONE_DISPLAY}</strong>{" "}
                  to understand what you need and arrange everything — please save it so you know it&rsquo;s us. No payment now.
                </span>
                <span data-ur lang="ur" dir="rtl" className="urdu">
                  ہم آپ کی ضرورت سمجھنے اور بندوبست کرنے کے لیے <strong><bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi></strong>{" "}
                  سے کال کریں گے۔ نمبر محفوظ کر لیں تاکہ آپ پہچان سکیں۔ ابھی کوئی ادائیگی نہیں۔
                </span>
              </p>

              {/* Booking ref */}
              {/* A direct visit to this page has no reference, so the card
                  is hidden rather than shown empty. */}
              {ref && (
              <div
                  style={{
                    background: "var(--cream-2)",
                    borderRadius: 14,
                    padding: 16,
                    marginBottom: 22,
                    border: "1px solid var(--line)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "var(--ink-soft)",
                      marginBottom: 6,
                    }}
                  >
                    <span data-en>Your reference number</span>
                    <span data-ur lang="ur" dir="rtl" className="urdu">آپ کا حوالہ نمبر</span>
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "var(--teal-deep)",
                      letterSpacing: ".06em",
                      fontFamily: "ui-monospace,\"SFMono-Regular\",Menlo,monospace",
                    }}
                  >
                    {ref}
                  </div>
                </div>
              )}

              {/* What happens next */}
              <div style={{ textAlign: "left", marginBottom: 26 }}>
                <p style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)", marginBottom: 14 }}>
                  <span data-en>What happens next?</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">آگے کیا ہوگا؟</span>
                </p>
                <div style={{ display: "grid", gap: 12 }}>
                  {STEPS.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <span
                        style={{
                          flex: "none",
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "var(--teal)",
                          color: "#fff",
                          fontSize: 15,
                          fontWeight: 800,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 16.5, color: "var(--ink-soft)", lineHeight: 1.5, fontWeight: 500 }}>
                        <span data-en>{s.en}</span>
                        <span data-ur lang="ur" dir="rtl" className="urdu">{s.ur}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "grid", gap: 10 }}>
                <a className="btn btn-call btn-block btn-lg" href={`tel:${CONTACT_PHONE_TEL}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  <span data-en>Can&rsquo;t wait? Call us now: {CONTACT_PHONE_DISPLAY}</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">انتظار نہیں کر سکتے؟ ابھی کال کریں: <bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi></span>
                </a>
                <a
                  className="btn btn-wa btn-block btn-lg"
                  href={waLink(GENERIC_WA_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="wadot" />
                  <span data-en>WhatsApp us</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">واٹس ایپ پر بات کریں</span>
                </a>
                <Link className="btn btn-ghost btn-block" href="/">
                  <span data-en>Back to home</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ہوم پر واپس</span>
                </Link>
                <a
                  href={`data:text/vcard;charset=utf-8,${encodeURIComponent(
                    [
                      "BEGIN:VCARD",
                      "VERSION:3.0",
                      "FN:Sehat Connect",
                      `TEL;TYPE=CELL:${CONTACT_PHONE_TEL}`,
                      "END:VCARD",
                    ].join("\n")
                  )}`}
                  download="Sehat-Connect.vcf"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--ink-soft)",
                    textDecoration: "underline",
                    marginTop: 4,
                  }}
                >
                  <span data-en>Save our number, so our call isn&rsquo;t a stranger&rsquo;s number</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ہمارا نمبر محفوظ کر لیں تاکہ ہماری کال پہچان سکیں</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </LandingRoot>
  );
}
