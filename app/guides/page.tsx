import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import CtaBanner from "@/components/home/CtaBanner";
import { SITE_URL } from "@/lib/constants";
import { GUIDES } from "@/lib/guides";
import { breadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Guides for Families Arranging Care at Home",
  description:
    "Plain guides for families arranging nursing care at home in Lahore: choosing between a nurse and an attendant, bringing someone home after surgery, and what elderly care actually involves.",
  alternates: { canonical: `${SITE_URL}/guides` },
};

const breadcrumbs = breadcrumbList([{ name: "Guides" }]);

export default function GuidesIndexPage() {
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
              <span className="eyebrow">
                <span data-en>Guides</span>
                <span data-ur className="urdu">رہنمائی</span>
              </span>
              <div className="sec-head">
                <h2>
                  <span data-en>Written for the person making the decision</span>
                  <span data-ur className="urdu">اُس شخص کے لیے لکھا گیا جو فیصلہ کر رہا ہے</span>
                </h2>
                <p>
                  <span data-en>
                    No selling, no jargon. These answer the questions families actually
                    ask us on the phone &mdash; whether or not you call us afterwards.
                  </span>
                  <span data-ur className="urdu">
                    نہ کوئی سیلز، نہ مشکل الفاظ۔ یہ وہی سوال ہیں جو گھر والے ہم سے فون پر پوچھتے ہیں
                    &mdash; چاہے آپ بعد میں ہمیں کال کریں یا نہ کریں۔
                  </span>
                </p>
              </div>

              <div className="id-meta">
                {GUIDES.map((g) => (
                  <Link
                    key={g.slug}
                    className="id-row"
                    href={`/guides/${g.slug}`}
                    style={{ minHeight: 56 }}
                  >
                    <span className="tick" aria-hidden="true">&#10003;</span>
                    <span>
                      <span data-en><b>{g.name.en}</b><br />{g.dek.en}</span>
                      <span data-ur className="urdu"><b>{g.name.ur}</b><br />{g.dek.ur}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <CtaBanner />
          <div className="seam-gold" aria-hidden="true" />
        </main>
        <Footer />
      </LandingRoot>
    </>
  );
}
