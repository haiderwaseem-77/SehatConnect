import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import { CONTACT_PHONE_DISPLAY } from "@/lib/constants";
import { waLink, GENERIC_WA_MSG } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Request Received | Sehat Connect Lahore",
  description: "Thank you — we've got your details. A real person will call you back shortly to arrange care.",
  robots: { index: false, follow: true },
};

const STEPS: { en: string; ur: string }[] = [
  {
    en: "We call you back to understand exactly what you need.",
    ur: "ہم آپ کو کال کر کے سمجھتے ہیں کہ آپ کو بالکل کیا چاہیے۔",
  },
  {
    en: "We match you with a verified caregiver and share their card with you first.",
    ur: "ہم آپ کو تصدیق شدہ نگہداشت کرنے والا دیتے ہیں اور پہلے ان کا کارڈ بھیجتے ہیں۔",
  },
  {
    en: "Your caregiver arrives at the agreed time.",
    ur: "آپ کا نگہداشت کرنے والا طے شدہ وقت پر پہنچتا ہے۔",
  },
  {
    en: "You pay after the shift — no advance, ever.",
    ur: "آپ شفٹ کے بعد ادائیگی کرتے ہیں — کبھی پیشگی نہیں۔",
  },
];

export default async function BookingConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const resolvedParams = await searchParams;
  const ref = resolvedParams.ref ?? "SGH-0000";

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
                <span data-en>Thank you! We&rsquo;ve got your details.</span>
                <span data-ur className="urdu">شکریہ! ہمیں آپ کی تفصیلات مل گئیں۔</span>
              </h1>

              <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.65, marginBottom: 22, fontWeight: 500 }}>
                <span data-en>
                  A real person will call you back shortly to understand what you need and arrange everything. We&rsquo;ll
                  call from <strong>{CONTACT_PHONE_DISPLAY}</strong> — please save it so you know it&rsquo;s us. No payment
                  now.
                </span>
                <span data-ur className="urdu">
                  ایک حقیقی فرد جلد آپ کو کال کر کے آپ کی ضرورت سمجھے گا اور سب بندوبست کرے گا۔ ہم{" "}
                  <strong>{CONTACT_PHONE_DISPLAY}</strong> سے کال کریں گے — براہِ کرم اسے محفوظ کر لیں۔ ابھی کوئی ادائیگی
                  نہیں۔
                </span>
              </p>

              {/* Booking ref */}
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
                  <span data-ur className="urdu">آپ کا حوالہ نمبر</span>
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

              {/* What happens next */}
              <div style={{ textAlign: "left", marginBottom: 26 }}>
                <p style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)", marginBottom: 14 }}>
                  <span data-en>What happens next?</span>
                  <span data-ur className="urdu">آگے کیا ہوگا؟</span>
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
                        <span data-ur className="urdu">{s.ur}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "grid", gap: 10 }}>
                <a
                  className="btn btn-wa btn-block btn-lg"
                  href={waLink(GENERIC_WA_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="wadot" />
                  <span data-en>Chat with us on WhatsApp</span>
                  <span data-ur className="urdu">واٹس ایپ پر بات کریں</span>
                </a>
                <Link className="btn btn-ghost btn-block" href="/">
                  <span data-en>Back to home</span>
                  <span data-ur className="urdu">ہوم پر واپس</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </LandingRoot>
  );
}
