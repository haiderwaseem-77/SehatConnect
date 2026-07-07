// Direction-6 price receipt — scalloped ticket with dotted leaders.
// NOTE: prices hidden from all public surfaces as of 2026-07-02 (see
// NORTH-STAR Decision Ledger). This card now explains HOW payment works
// instead of showing rupee amounts. File name + id="price" kept as-is so
// the anchor link and any future restore stay simple.
import { PROMISES } from "@/lib/constants";
import { waLink, receiptShareMsg } from "@/lib/wa";

export default function PriceReceipt() {
  return (
    <section className="block receipt-sec" id="price">
      <div className="wrap">
        <div className="receipt-grid">
          <div className="receipt-copy">
            <h2>
              <span data-en>How payment works</span>
              <span data-ur className="urdu">ادائیگی کیسے ہوتی ہے</span>
            </h2>
            <p>
              <span data-en>{PROMISES.priceOnCall.en}</span>
              <span data-ur className="urdu">{PROMISES.priceOnCall.ur}</span>
            </p>
            <p>
              <span data-en>No pressure. Cash after the 12-hour shift, not before.</span>
              <span data-ur className="urdu">کوئی دباؤ نہیں۔ 12 گھنٹے کی شفٹ کے بعد نقد ادائیگی کریں، پہلے نہیں۔</span>
            </p>
            <ul className="receipt-points">
              <li>
                <span className="mk" />
                <span>
                  <span data-en><b>No advance.</b> You pay cash <b>after</b> the 12-hour shift</span>
                  <span data-ur className="urdu"><b>کوئی پیشگی نہیں۔</b> 12 گھنٹے کی شفٹ کے <b>بعد</b> نقد ادائیگی کریں</span>
                </span>
              </li>
              <li>
                <span className="mk" />
                <span>
                  <span data-en>Same terms, day or night, anywhere in Lahore</span>
                  <span data-ur className="urdu">دن ہو یا رات، لاہور میں کہیں بھی — ایک جیسی شرائط</span>
                </span>
              </li>
              <li>
                <span className="mk" />
                <span>
                  <span data-en>Cancel or reschedule free up to <b>4 hours before</b></span>
                  <span data-ur className="urdu">شفٹ سے <b>4 گھنٹے پہلے</b> تک مفت منسوخ یا تبدیل کریں</span>
                </span>
              </li>
            </ul>
          </div>

          <aside className="receipt" aria-label="Payment terms">
            <div className="receipt-head">
              <div className="r-title">
                <span data-en>Sehat Connect</span>
                <span data-ur className="urdu">Sehat Connect</span>
              </div>
              <div className="r-sub">
                <span data-en>In-home care &middot; Lahore &middot; 24/7</span>
                <span data-ur className="urdu">گھر پر دیکھ بھال &middot; لاہور &middot; 24/7</span>
              </div>
            </div>
            <div className="rline">
              <span className="rname">
                <span data-en>Exact price</span>
                <span data-ur className="urdu">صحیح قیمت</span>
              </span>
              <span className="dots" />
              <span className="rval">
                <span data-en>Told on the call</span>
                <span data-ur className="urdu">کال پر بتائی جائے گی</span>
              </span>
            </div>
            <div className="rline">
              <span className="rname">
                <span data-en>First day</span>
                <span data-ur className="urdu">پہلا دن</span>
              </span>
              <span className="dots" />
              <span className="rval free">
                <span data-en>Free</span>
                <span data-ur className="urdu">مفت</span>
              </span>
            </div>
            <div className="rline">
              <span className="rname">
                <span data-en>Advance</span>
                <span data-ur className="urdu">پیشگی</span>
              </span>
              <span className="dots" />
              <span className="rval free">
                <span data-en>None</span>
                <span data-ur className="urdu">کوئی نہیں</span>
              </span>
            </div>
            <div className="rline">
              <span className="rname">
                <span data-en>Hidden fees</span>
                <span data-ur className="urdu">چھپی ہوئی فیس</span>
              </span>
              <span className="dots" />
              <span className="rval free">
                <span data-en>None</span>
                <span data-ur className="urdu">کوئی نہیں</span>
              </span>
            </div>
            <div className="rline total">
              <span className="rname">
                <span data-en>You pay</span>
                <span data-ur className="urdu">آپ ادا کریں</span>
              </span>
              <span className="dots" />
              <span className="rval free">
                <span data-en>AFTER THE 12-HR SHIFT</span>
                <span data-ur className="urdu">12 گھنٹے کی شفٹ کے بعد</span>
              </span>
            </div>
            <div className="receipt-foot">
              <span data-en>PNC-registered &middot; CNIC checked &middot; police-verified</span>
              <span data-ur className="urdu">PNC رجسٹرڈ &middot; شناختی کارڈ چیک &middot; پولیس تصدیق</span>
              <b>
                <span data-en>NOTHING HIDDEN</span>
                <span data-ur className="urdu">کچھ نہیں چھپا</span>
              </b>
            </div>

            <a
              className="receipt-share"
              href={waLink(receiptShareMsg())}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="wa-mini">
                <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Z" /></svg>
              </span>
              <span>
                <span data-en>Share this with your family</span>
                <span data-ur className="urdu">اپنے گھر والوں کو بھیجیں</span>
              </span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
