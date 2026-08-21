import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/constants";
import { waLink, GENERIC_WA_MSG } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page doesn't exist or has moved. Call or WhatsApp us and a real person will help.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
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

              <h1 style={{ fontSize: "clamp(24px,5.5vw,30px)", marginBottom: 12 }}>
                <span data-en>Let&rsquo;s get you back to a human.</span>
                <span data-ur className="urdu">آئیں، آپ کو ہماری ٹیم تک لے چلتے ہیں۔</span>
              </h1>

              <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.65, marginBottom: 26, fontWeight: 500 }}>
                <span data-en>
                  This page doesn&rsquo;t exist, or it moved. Call or WhatsApp us and we&rsquo;ll help you right away.
                </span>
                <span data-ur className="urdu">
                  یہ صفحہ موجود نہیں یا منتقل ہو گیا ہے۔ کال یا واٹس ایپ کریں؛ ہم فوراً مدد کر دیں گے۔
                </span>
              </p>

              <div style={{ display: "grid", gap: 10 }}>
                <a className="btn btn-primary btn-block btn-lg" href={`tel:${CONTACT_PHONE_TEL}`}>
                  <span data-en>Call {CONTACT_PHONE_DISPLAY}</span>
                  <span data-ur className="urdu">کال کریں <bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi></span>
                </a>
                <a
                  className="btn btn-wa btn-block btn-lg"
                  href={waLink(GENERIC_WA_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="wadot" />
                  <span data-en>WhatsApp us</span>
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
