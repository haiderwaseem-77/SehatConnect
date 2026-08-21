import Image from "next/image";
import PulseAccent from "@/components/home/PulseAccent";

/*
 * "The caregivers who come into your home" — five photos, deliberately unnamed.
 * Decision (2026-07-07): we do NOT publish team names, roles or per-person bios.
 * Anything per-person would either be invented (honesty-rule violation — the old
 * mock names were a live audit blocker) or an unverifiable claim. Instead the
 * section shows the team at work and states only what is true for everyone:
 * the NORTH-STAR §3 verification triple. Photos are a horizontal snap-scroller
 * on mobile and a single five-up row on desktop. This must never read as browsable caregiver
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
    photo: "/team/team-photo-3.jpg",
    alt: "Nurse in a white coat in a hospital hallway",
    pos: "center 16%",
  },
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
];

// Extends the founder note: "…and here are the people who enter your home."
// Header + lede reuse the hero/FAQ vocabulary (loved one / nurse or attendant /
// right person / replacement) so the section answers the home-entry worry.
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
            <span data-en>The caregivers who come into your home.</span>
            <span data-ur lang="ur" dir="rtl" className="urdu">وہ لوگ جو آپ کے گھر دیکھ بھال کے لیے آتے ہیں</span>
          </h2>
          <p>
            <span data-en>
              We arrange the right nurse or attendant for your loved one. If
              the person does not feel right, tell us and we arrange a
              replacement.
            </span>
            <span data-ur lang="ur" dir="rtl" className="urdu">
              ہم آپ کے عزیز کے لیے مناسب نرس یا اٹینڈنٹ کا بندوبست کرتے ہیں۔
              اگر فرد مناسب نہ لگے تو ہمیں بتائیں؛ ہم متبادل کا بندوبست کرتے ہیں۔
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
          {/* A formatted variant of VERIFICATION_PROMISE in lib/constants.ts —
              written out here only because this rendering needs <b> emphasis.
              It must keep BOTH halves: all three checks, AND the timing clause.
              The Urdu had lost the timing clause, which is the reassuring half,
              precisely because it was retyped here instead of imported. If you
              edit either language, check it against the constant. */}
          <span>
            <span data-en>
              Every caregiver we send is <b>CNIC checked, references called,
              police-verified</b> &mdash; before anyone reaches your door.
            </span>
            <span data-ur lang="ur" dir="rtl" className="urdu">
              جس فرد کو بھی ہم آپ کے گھر بھیجتے ہیں، اس کا شناختی کارڈ اور
              حوالہ جات چیک ہو جاتے ہیں، اور پولیس تصدیق بھی &mdash; گھر میں
              داخل ہونے سے پہلے۔
            </span>
          </span>
        </p>

      </div>
    </section>
  );
}
