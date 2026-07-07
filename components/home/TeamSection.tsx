import Image from "next/image";
import PulseAccent from "@/components/home/PulseAccent";

/*
 * "The team on the other end of your call" — five photos, deliberately unnamed.
 * Decision (2026-07-07): we do NOT publish team names, roles or per-person bios.
 * Anything per-person would either be invented (honesty-rule violation — the old
 * mock names were a live audit blocker) or an unverifiable claim. Instead the
 * section shows the team at work and states only what is true for everyone:
 * the NORTH-STAR §3 verification triple, plus a privacy line explaining WHY
 * there are no names. Photos are a horizontal snap-scroller on mobile and a
 * single five-up row on desktop. This must never read as browsable caregiver
 * profiles — no per-person text, badges or actions.
 */
type Shot = {
  photo: string;
  alt: string;
  /** object-position — each photo frames its subject differently */
  pos: string;
};

const SHOTS: Shot[] = [
  {
    photo: "/team/team-photo-1.jpg",
    alt: "Caregiver in navy scrubs standing in a hospital staff room",
    pos: "center 18%",
  },
  {
    photo: "/team/team-photo-5.jpg",
    alt: "Nurse preparing a line at a patient's bedside",
    pos: "center 26%",
  },
  {
    photo: "/team/team-photo-4.jpg",
    alt: "Caregiver in scrubs with a stethoscope, standing outdoors",
    pos: "center 22%",
  },
  {
    photo: "/team/team-photo-2.jpg",
    alt: "Nurse adjusting an IV drip in a hospital corridor",
    pos: "38% 28%",
  },
  {
    photo: "/team/team-photo-3.jpg",
    alt: "Nurse in a white coat in a hospital hallway",
    pos: "center 16%",
  },
];

// Extends the founder note: "…and here's the team that delivers on it."
// Header + lede reuse the hero's exact vocabulary (leave your number / arrange
// the right nurse or attendant / stay with your family) so the section answers
// the promise the hero makes.
//
// Scroll-reveal is handled by the shared mechanism in LandingRoot: `data-reveal`
// elements are fully visible by default (SSR / no-JS / crawlers / reduced-motion)
// and only enhanced once JS + motion allow it. No component-local observer.
export default function TeamSection() {
  return (
    <section className="block team" id="team" aria-labelledby="team-title">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          {/* shared mini-ECG section accent — the brand motif, drawn on reveal */}
          <PulseAccent />
          <h2 id="team-title">
            <span data-en>The team on the other end of your call.</span>
            <span data-ur className="urdu">آپ کی کال کی دوسری جانب — ہماری ٹیم۔</span>
          </h2>
          <p>
            <span data-en>
              Leave your number and our team calls you back, arranges the right
              nurse or attendant, and stays with your family after care starts.
            </span>
            <span data-ur className="urdu">
              اپنا نمبر دیں — ہماری ٹیم کال کرے گی، صحیح نرس یا اٹینڈنٹ کا
              انتظام کرے گی، اور دیکھ بھال شروع ہونے کے بعد بھی آپ کے ساتھ رہے
              گی۔
            </span>
          </p>
        </div>
      </div>

      {/* full-bleed on mobile so the peeking next card signals "swipe" */}
      <ul className="team-strip" role="list" data-reveal>
        {SHOTS.map((s) => (
          <li key={s.photo} className="team-shot">
            <Image
              src={s.photo}
              alt={s.alt}
              fill
              sizes="(min-width:760px) 210px, 64vw"
              style={{ objectFit: "cover", objectPosition: s.pos }}
            />
          </li>
        ))}
      </ul>

      <div className="wrap">
        {/* Single quiet reassurance — carries the NORTH-STAR §3 verification
            canon verbatim. Not a CTA; the final CTA banner follows immediately. */}
        <p className="team-assure" data-reveal>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3l7 3v5c0 4.4-3 7.9-7 9-4-1.1-7-4.6-7-9V6l7-3z"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <path
              d="M9 12l2.2 2.2L15.5 10"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>
            <span data-en>
              Every caregiver we send is <b>CNIC checked, references called,
              police-verified</b> &mdash; before anyone reaches your door.
            </span>
            <span data-ur className="urdu">
              جو بھی آپ کے گھر آئے — اس کا شناختی کارڈ، حوالہ جات اور پولیس
              تصدیق پہلے چیک ہوتی ہے۔
            </span>
          </span>
        </p>

        {/* Why there are no names — an explained absence beats invented bios. */}
        <p className="team-privacy" data-reveal>
          <span data-en>
            We don&rsquo;t put our team&rsquo;s names on the internet &mdash;
            for their privacy and safety. You&rsquo;ll know your caregiver by
            name before care starts.
          </span>
          <span data-ur className="urdu">
            ہم اپنی ٹیم کے نام انٹرنیٹ پر نہیں ڈالتے — ان کی پرائیویسی اور
            حفاظت کے لیے۔ دیکھ بھال شروع ہونے سے پہلے آپ کو نرس یا اٹینڈنٹ کا
            نام بتا دیا جاتا ہے۔
          </span>
        </p>
      </div>
    </section>
  );
}
