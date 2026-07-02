// Direction-6 price receipt — scalloped ticket with dotted leaders.
import { PRICES } from "@/lib/constants";
import { waLink, receiptShareMsg } from "@/lib/wa";

export default function PriceReceipt() {
  const nurse = `Rs ${PRICES.qualified_nurse.toLocaleString("en-US")}`;
  const attendant = `Rs ${PRICES.attendant.toLocaleString("en-US")}`;

  return (
    <section className="block receipt-sec" id="price">
      <div className="wrap">
        <div className="receipt-grid">
          <div className="receipt-copy">
            <h2>
              <span data-en>The whole price, on one line.</span>
              <span data-ur className="urdu">پوری قیمت، ایک ہی جگہ پر۔</span>
            </h2>
            <p>
              <span data-en>No fine print, no salesman, no advance. You read the price here, and you pay it after the shift, not a rupee before.</span>
              <span data-ur className="urdu">کوئی چھپی شرط نہیں، کوئی سیلز مین نہیں، کوئی پیشگی نہیں۔ قیمت یہیں پڑھ لیں، اور شفٹ کے بعد ادا کریں — ایک روپیہ بھی پہلے نہیں۔</span>
            </p>
            <ul className="receipt-points">
              <li>
                <span className="mk" />
                <span>
                  <span data-en><b>Advance Rs 0</b>. You pay cash <b>after</b> the 12-hour shift</span>
                  <span data-ur className="urdu"><b>پیشگی 0 روپے</b>۔ 12 گھنٹے کی شفٹ کے <b>بعد</b> نقد ادائیگی کریں</span>
                </span>
              </li>
              <li>
                <span className="mk" />
                <span>
                  <span data-en>Same flat rate, day or night, anywhere in Lahore</span>
                  <span data-ur className="urdu">دن ہو یا رات، لاہور میں کہیں بھی — ایک ہی قیمت</span>
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

          <aside className="receipt" aria-label="Price summary">
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
                <span data-en>Qualified Nurse</span>
                <span data-ur className="urdu">کوالیفائیڈ نرس</span>
              </span>
              <span className="dots" />
              <span className="rval">{nurse}</span>
            </div>
            <div className="rline">
              <span className="rname">
                <span data-en>Attendant</span>
                <span data-ur className="urdu">اٹینڈنٹ</span>
              </span>
              <span className="dots" />
              <span className="rval">{attendant}</span>
            </div>
            <div className="rline">
              <span className="rname">
                <span data-en>Per shift</span>
                <span data-ur className="urdu">فی شفٹ</span>
              </span>
              <span className="dots" />
              <span className="rval">
                <span data-en>12 hours</span>
                <span data-ur className="urdu">12 گھنٹے</span>
              </span>
            </div>
            <div className="rline">
              <span className="rname">
                <span data-en>Advance / deposit</span>
                <span data-ur className="urdu">پیشگی / ڈپازٹ</span>
              </span>
              <span className="dots" />
              <span className="rval free">Rs 0</span>
            </div>
            <div className="rline">
              <span className="rname">
                <span data-en>Hidden fees</span>
                <span data-ur className="urdu">چھپی ہوئی فیس</span>
              </span>
              <span className="dots" />
              <span className="rval free">Rs 0</span>
            </div>
            <div className="rline total">
              <span className="rname">
                <span data-en>You pay</span>
                <span data-ur className="urdu">آپ ادا کریں</span>
              </span>
              <span className="dots" />
              <span className="rval free">
                <span data-en>AFTER SHIFT</span>
                <span data-ur className="urdu">شفٹ کے بعد</span>
              </span>
            </div>
            <div className="receipt-foot">
              <span data-en>PNC-registered &middot; CNIC &amp; references checked</span>
              <span data-ur className="urdu">PNC رجسٹرڈ &middot; شناختی کارڈ اور حوالہ جات کی تصدیق</span>
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
