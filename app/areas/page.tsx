import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import CtaBanner from "@/components/home/CtaBanner";
import { SITE_URL, OFFICE_ADDRESS } from "@/lib/constants";
import { LIVE_AREAS } from "@/lib/areas";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { breadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Areas We Serve in Lahore | Nurse at Home",
  description:
    "We send nurses and attendants across Lahore, including DHA, Gulberg and Johar Town. Call or leave your number and a real person calls you back.",
  alternates: { canonical: `${SITE_URL}/areas` },
};

const crumbs = [{ name: "Areas we serve", nameUr: "جن علاقوں میں ہم آتے ہیں" }];
const breadcrumbs = breadcrumbList(crumbs);

export default function AreasIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <LandingRoot>
        <Navbar />
        <main className="flex-1">
          <div className="wrap"><Breadcrumbs items={crumbs} /></div>
          <section className="block">
            <div className="wrap">
              <span className="eyebrow">
                <span data-en>Areas we serve &middot; Lahore</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">جن علاقوں میں ہم آتے ہیں &middot; لاہور</span>
              </span>
              <div className="sec-head">
                <h1>
                  <span data-en>We come to all of Lahore</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">ہم پورے لاہور میں آتے ہیں</span>
                </h1>
                <p>
                  <span data-en>
                    These are the areas we are asked for most often. If yours is not
                    listed, call anyway &mdash; we serve the whole city, and we will
                    tell you honestly on the call if we cannot reach you.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    یہ وہ علاقے ہیں جہاں سے ہمیں سب سے زیادہ رابطہ ہوتا ہے۔ اگر آپ کا علاقہ
                    یہاں نہیں لکھا تو بھی کال کریں &mdash; ہم پورے شہر میں آتے ہیں، اور اگر
                    نہ پہنچ سکیں تو کال پر صاف بتا دیں گے۔
                  </span>
                </p>
              </div>

              <div className="id-meta">
                {LIVE_AREAS.map((a) => (
                  <Link
                    key={a.slug}
                    className="id-row"
                    href={`/areas/${a.slug}`}
                    style={{ minHeight: 56 }}
                  >
                    <span className="tick" aria-hidden="true">&#10003;</span>
                    <span>
                      <span data-en><b>Nurse &amp; attendant at home in {a.name.en}</b></span>
                      <span data-ur lang="ur" dir="rtl" className="urdu"><b>{a.name.ur} میں گھر پر نرس اور اٹینڈنٹ</b></span>
                    </span>
                  </Link>
                ))}
              </div>

              <p className="svc-foot" style={{ marginTop: 18 }}>
                <span data-en>Our office: {OFFICE_ADDRESS}</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">ہمارا دفتر: {OFFICE_ADDRESS}</span>
              </p>
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
