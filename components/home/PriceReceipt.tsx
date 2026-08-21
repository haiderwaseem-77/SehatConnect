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
            <span data-ur lang="ur" dir="rtl" className="urdu">ادائیگی کا طریقہ</span>
          </h2>
          <p className="d6-rc-lede">
            <span data-en>
              Start without pressure. Payment begins only when your family is
              comfortable with the caregiver.
            </span>
            <span data-ur lang="ur" dir="rtl" className="urdu">
              بغیر دباؤ کے شروع کریں۔ ادائیگی تب شروع ہوتی ہے جب گھر والے نرس
              یا اٹینڈنٹ سے مطمئن ہوں۔
            </span>
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
            <div className="d6-receipt-head">
              <span className="d6-receipt-brand">Sehat Connect</span>
              <span className="d6-receipt-kicker">
                <span data-en>Payment terms</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">ادائیگی کی شرائط</span>
              </span>
            </div>

            {/* quick ledger — short values, dotted leaders */}
            <dl className="d6-rc-ledger">
              <div className="d6-rc-row">
                <dt>
                  <span data-en>Before approval</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">منظوری سے پہلے</span>
                </dt>
                <span className="d6-rc-dots" aria-hidden="true" />
                <dd className="is-free">
                  <span data-en>No payment</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">کوئی ادائیگی نہیں</span>
                </dd>
              </div>
              <div className="d6-rc-row">
                <dt>
                  <span data-en>If not right</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">مناسب نہ لگے</span>
                </dt>
                <span className="d6-rc-dots" aria-hidden="true" />
                <dd>
                  <span data-en>Replacement</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">متبادل</span>
                </dd>
              </div>
              <div className="d6-rc-row">
                <dt>
                  <span data-en>Hidden fees</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">چھپی ہوئی فیس</span>
                </dt>
                <span className="d6-rc-dots" aria-hidden="true" />
                <dd>
                  <span data-en>None</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">کوئی نہیں</span>
                </dd>
              </div>
            </dl>

            {/* terms — the fuller payment promises */}
            <dl className="d6-rc-terms">
              <div className="d6-rc-term">
                <dt>
                  <span data-en>Exact price</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">صحیح قیمت</span>
                </dt>
                <dd>
                  <span data-en>Quoted on your first call, before care starts.</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">پہلی کال پر، دیکھ بھال شروع ہونے سے پہلے بتا دی جاتی ہے۔</span>
                </dd>
              </div>
              <div className="d6-rc-term">
                <dt>
                  <span data-en>Caregiver fit</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">فرد مناسب نہ لگے</span>
                </dt>
                <dd>
                  <span data-en>
                    If the person does not feel right, tell us. We arrange a
                    replacement.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    اگر فرد مناسب نہ لگے تو ہمیں بتائیں۔ ہم متبادل کا بندوبست
                    کرتے ہیں۔
                  </span>
                </dd>
              </div>
              <div className="d6-rc-term">
                <dt>
                  <span data-en>After approval</span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">منظوری کے بعد</span>
                </dt>
                <dd>
                  <span data-en>
                    Once your family is comfortable, we confirm the daily,
                    weekly, or monthly payment plan.
                  </span>
                  <span data-ur lang="ur" dir="rtl" className="urdu">
                    گھر والے مطمئن ہوں تو ہم روزانہ، ہفتہ وار یا ماہانہ ادائیگی
                    کا طریقہ طے کرتے ہیں۔
                  </span>
                </dd>
              </div>
            </dl>

            {/* the punchline "total" */}
            <div className="d6-rc-total">
              <span className="d6-rc-total-label">
                <span data-en>Payment starts</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">ادائیگی شروع ہوتی ہے</span>
              </span>
              <span className="d6-rc-total-value">
                <span data-en>On approval</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">منظوری کے بعد</span>
              </span>
            </div>

            {/* stamp + honesty footer */}
            <div className="d6-receipt-foot">
              <span className="d6-receipt-stamp">
                <span data-en>No advance</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">پیشگی ادائیگی نہیں</span>
              </span>
              <span className="d6-receipt-hidden">
                <span data-en>Nothing hidden</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">کچھ بھی چھپا نہیں</span>
              </span>
            </div>
          </div>
        </div>

        {/* ---- share (unchanged WhatsApp deep-link behavior) ---- */}
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
              <span data-en>Share these terms with your family</span>
              <span data-ur lang="ur" dir="rtl" className="urdu">
                یہ شرائط گھر والوں کو واٹس ایپ کریں
              </span>
            </span>
            <span className="d6-receipt-share-sub">
              <span data-en>Opens WhatsApp with a ready-to-send message</span>
              <span data-ur lang="ur" dir="rtl" className="urdu">
                واٹس ایپ میں بھیجنے کے لیے تیار پیغام کھلے گا
              </span>
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
