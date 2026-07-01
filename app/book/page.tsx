import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import LeadFormD6 from "@/components/home/LeadFormD6";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Request a Free Call Back | Sehat Connect Lahore",
  description:
    "Leave your name and phone number — a real person from Sehat Connect calls you back to arrange a verified nurse or attendant at home in Lahore. No payment now, no advance.",
  alternates: { canonical: `${SITE_URL}/book` },
};

export default function BookPage() {
  return (
    <LandingRoot>
      <Navbar />
      <main className="flex-1">
        <section className="block">
          <div className="wrap">
            <div style={{ maxWidth: 560, margin: "0 auto" }}>
              <div className="sec-head" style={{ marginBottom: 24 }}>
                <span className="eyebrow">
                  <span data-en>A real person is one call away</span>
                  <span data-ur className="urdu">ایک حقیقی فرد ایک کال کی دوری پر</span>
                </span>
                <h2>
                  <span data-en>Leave your number. We&rsquo;ll call you back.</span>
                  <span data-ur className="urdu">بس اپنا نمبر دیں۔ ہم آپ کو کال کریں گے۔</span>
                </h2>
                <p>
                  <span data-en>
                    Just your name and phone. No payment now, no advance. A real person calls to understand what you
                    need and arrange a verified nurse or attendant.
                  </span>
                  <span data-ur className="urdu">
                    صرف نام اور فون۔ ابھی کوئی ادائیگی نہیں، کوئی پیشگی نہیں۔ ایک حقیقی فرد کال کر کے آپ کی ضرورت سمجھتا ہے
                    اور تصدیق شدہ نرس یا اٹینڈنٹ کا بندوبست کرتا ہے۔
                  </span>
                </p>
              </div>

              <LeadFormD6 variant="hero" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </LandingRoot>
  );
}
