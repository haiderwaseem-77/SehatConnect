import Image from "next/image";
import PulseAccent from "@/components/home/PulseAccent";

/*
 * ============================================================================
 * MOCK DATA — client will replace with real team info + photos.
 * ----------------------------------------------------------------------------
 * Every name, role and one-line description below is a PLACEHOLDER supplied so
 * the section can be designed and reviewed. The photos in /public/team are also
 * placeholders (team-photo-1 is literally named *STOCK-REPLACE*). The client
 * will swap in the real team's names, roles, photos and lines before launch.
 * Do NOT treat any string here as an approved public claim. The only claim that
 * is real and reusable is the verification triple in the closing line, which is
 * the NORTH-STAR §3 canon phrasing and applies to every caregiver we send.
 *
 * TODO: Urdu counterpart for every user-facing string in this section
 *       (name/role/line/header/lede/closing line) — this pass ships EN only,
 *       matching the site's other new-section convention.
 * ============================================================================
 */
type Member = {
  name: string;
  role: string;
  line: string;
  photo: string;
  alt: string;
  /** object-position for the crop — each stock photo frames the face differently */
  pos: string;
};

// MOCK DATA — client will replace with real team info + photos.
const TEAM: Member[] = [
  {
    name: "Bilal Ahmad", // MOCK
    role: "Care Coordinator", // MOCK
    line: "Answers when you call, and matches the right caregiver to your family's needs.", // MOCK
    photo: "/team/team-photo-1-STOCK-REPLACE.jpg",
    alt: "Bilal Ahmad, care coordinator at Sehat Connect", // MOCK
    pos: "center 22%",
  },
  {
    name: "Sana Riaz", // MOCK
    role: "Head Nurse · PNC-registered", // MOCK — "PNC-registered" is the only certification claim allowed for the nurse role
    line: "Reviews the clinical details so the nurse we send fits the care your loved one needs.", // MOCK
    photo: "/team/team-photo-2.jpg",
    alt: "Sana Riaz, head nurse at Sehat Connect, preparing an IV drip", // MOCK
    pos: "32% 24%",
  },
  {
    name: "Hina Farooq", // MOCK
    role: "Attendant Team Lead", // MOCK
    line: "Checks in after the first visit to make sure your family is comfortable.", // MOCK
    photo: "/team/team-photo-3.jpg",
    alt: "Hina Farooq, attendant team lead at Sehat Connect", // MOCK
    pos: "center 18%",
  },
];

// Extends the founder note: "…and here's the team that delivers on it." A calm,
// editorial "the people behind your call" moment — NOT browsable caregiver
// profiles. No per-person actions, no ratings, no marketplace patterns.
//
// Scroll-reveal is handled by the shared mechanism in LandingRoot: `data-reveal`
// elements are fully visible by default (SSR / no-JS / crawlers / reduced-motion)
// and only enhanced once JS + motion allow it. No component-local observer.
export default function TeamSection() {
  return (
    // TODO: Urdu counterpart for header, lede, roles, lines and closing note.
    <section className="block team" id="team" aria-labelledby="team-title">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          {/* shared mini-ECG section accent — the brand motif, drawn on reveal */}
          <PulseAccent />
          <h2 id="team-title">The people behind your call.</h2>
          <p>
            Real people in Lahore who answer when you call, match the right
            caregiver, and stay with your family after the first visit.
          </p>
        </div>

        <ul className="team-grid" role="list">
          {TEAM.map((m) => (
            <li key={m.name} className="team-card" data-reveal>
              <div className="team-photo">
                <Image
                  src={m.photo}
                  alt={m.alt}
                  fill
                  sizes="(min-width:760px) 104px, 96px"
                  style={{ objectFit: "cover", objectPosition: m.pos }}
                />
              </div>
              <div className="team-meta">
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <p className="team-line">{m.line}</p>
              </div>
            </li>
          ))}
        </ul>

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
            Every caregiver they send is <b>CNIC checked, references called,
            police-verified</b> &mdash; before anyone reaches your door.
          </span>
        </p>
      </div>
    </section>
  );
}
