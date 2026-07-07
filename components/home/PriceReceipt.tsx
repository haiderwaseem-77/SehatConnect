// Direction-6 payment section — the "How payment works" receipt artifact.
// Redesigned 2026-07-07 (visual-elevation pass): a literal printed-receipt
// object that makes the payment promises feel signed and official.
// NOTE: prices are hidden from all public surfaces as of 2026-07-02 (see
// NORTH-STAR Decision Ledger + the PRICES do-not-render note in lib/constants.ts).
// No Rs amounts render here — the exact price is quoted on the first call.
// File name + id="price" kept as-is so the anchor link and any future restore
// stay simple. Copy phrasings are verbatim from NORTH-STAR §3.
import { waLink, receiptShareMsg } from "@/lib/wa";
import PulseAccent from "@/components/home/PulseAccent";

export default function PriceReceipt() {
  return (
    <section className="block receipt-sec" id="price">
      <div className="wrap">
        {/* ---- standard section-header stack: pulse accent -> H2 -> lede ---- */}
        <div className="d6-rc-head" data-reveal>
          {/* shared mini-ECG section accent (brand motif) — see PulseAccent. */}
          <PulseAccent />
          <h2>
            <span data-en>How payment works</span>
            <span data-ur className="urdu">ادائیگی کیسے ہوتی ہے</span>
          </h2>
          {/* TODO: Urdu counterpart for this lede (EN-only this pass). */}
          <p className="d6-rc-lede">
            Start without pressure. Payment begins only when your family is
            comfortable with the caregiver.
          </p>
        </div>

        {/* ---- the receipt artifact ---- */}
        <div
          className="d6-receipt"
          data-reveal
          role="group"
          aria-label="Sehat Connect payment terms"
        >
          <div className="d6-receipt-inner">
            {/* TODO: Urdu counterpart for the receipt header labels. */}
            <div className="d6-receipt-head">
              <span className="d6-receipt-brand">Sehat Connect</span>
              <span className="d6-receipt-kicker">Payment terms</span>
            </div>

            {/* quick ledger — short values, dotted leaders */}
            <dl className="d6-rc-ledger">
              <div className="d6-rc-row">
                <dt>Before approval</dt>
                <span className="d6-rc-dots" aria-hidden="true" />
                <dd className="is-free">No payment</dd>
              </div>
              <div className="d6-rc-row">
                <dt>If not right</dt>
                <span className="d6-rc-dots" aria-hidden="true" />
                <dd>Replacement</dd>
              </div>
              <div className="d6-rc-row">
                <dt>Hidden fees</dt>
                <span className="d6-rc-dots" aria-hidden="true" />
                <dd>None</dd>
              </div>
            </dl>

            {/* terms — the fuller payment promises */}
            <dl className="d6-rc-terms">
              <div className="d6-rc-term">
                <dt>Exact price</dt>
                <dd>Quoted on your first call, before care starts.</dd>
              </div>
              <div className="d6-rc-term">
                <dt>Caregiver fit</dt>
                <dd>
                  If the person does not feel right, tell us. We arrange a
                  replacement.
                </dd>
              </div>
              <div className="d6-rc-term">
                <dt>After approval</dt>
                <dd>
                  Once your family is comfortable, we confirm the daily,
                  weekly, or monthly payment plan.
                </dd>
              </div>
            </dl>

            {/* the punchline "total" */}
            <div className="d6-rc-total">
              <span className="d6-rc-total-label">Payment starts</span>
              <span className="d6-rc-total-value">On approval</span>
            </div>

            {/* stamp + honesty footer */}
            <div className="d6-receipt-foot">
              <span className="d6-receipt-stamp">No advance</span>
              <span className="d6-receipt-hidden">Nothing hidden</span>
            </div>
          </div>
        </div>

        {/* ---- share (unchanged WhatsApp deep-link behavior) ---- */}
        {/* TODO: Urdu counterpart for the share label + caption. */}
        <a
          className="d6-receipt-share"
          data-reveal
          href={waLink(receiptShareMsg())}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="d6-receipt-share-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Z" />
            </svg>
          </span>
          <span className="d6-receipt-share-text">
            <span className="d6-receipt-share-title">
              Share these terms with your family
            </span>
            <span className="d6-receipt-share-sub">
              Opens WhatsApp with a ready-to-send message
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
