import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import LeadFormD6 from "@/components/home/LeadFormD6";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Request a Free Call Back | Sehat Connect Lahore",
  description:
    "Leave your name and phone number. A real person from Sehat Connect calls back to arrange the right nurse or attendant at home in Lahore. No payment now, no advance.",
  alternates: { canonical: `${SITE_URL}/book` },
};

const breadcrumbs = breadcrumbList([{ name: "Get a call back" }]);

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    <LandingRoot>
      <Navbar />
      <main className="flex-1">
        <section className="block">
          <div className="wrap">
            <div style={{ maxWidth: 560, margin: "0 auto" }}>
              <div className="sec-head" style={{ marginBottom: 24 }}>
                <span className="eyebrow">
                  <span data-en>A real person is one call away</span>
                  <span data-ur className="urdu">حقیقی انسان، صرف ایک کال دور</span>
                </span>
                <h2>
                  <span data-en>Leave your number. We&rsquo;ll call you back.</span>
                  <span data-ur className="urdu">اپنا نمبر چھوڑ دیں۔ ہم واپس کال کریں گے۔</span>
                </h2>
                <p>
                  <span data-en>
                    Name and phone only. First day free. No payment now. No advance. A real person calls to understand what you need
                    and arrange the right nurse or attendant.
                  </span>
                  <span data-ur className="urdu">
                    صرف نام اور نمبر۔ پہلا دن مفت ہے۔ ابھی کوئی ادائیگی نہیں، کوئی پیشگی نہیں۔ ہماری ٹیم کال کر کے ضرورت سمجھے گی
                    اور مناسب نرس یا اٹینڈنٹ کا بندوبست کرے گی۔
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
    </>
  );
}
