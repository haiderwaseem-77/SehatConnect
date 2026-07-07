// Direction-6 price receipt — scalloped ticket with dotted leaders.
// NOTE: prices hidden from all public surfaces as of 2026-07-02 (see
// NORTH-STAR Decision Ledger). This card now explains HOW payment works
// instead of showing rupee amounts. File name + id="price" kept as-is so
// the anchor link and any future restore stay simple.
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
              <span data-en>Choose the care plan that fits your family. Daily, weekly, and monthly packages are available depending on what your loved one needs at home.</span>
              <span data-ur className="urdu">اپنے گھرانے کے لیے مناسب دیکھ بھال کا پلان منتخب کریں۔ آپ کے پیارے کی گھر پر ضرورت کے مطابق روزانہ، ہفتہ وار اور ماہانہ پیکیجز دستیاب ہیں۔</span>
            </p>
            <p>
              <span data-en>First day is free, so your family can feel comfortable first. If the nurse or attendant doesn&rsquo;t feel right, we&rsquo;ll replace them until you&rsquo;re satisfied.</span>
              <span data-ur className="urdu">پہلا دن مفت ہے، تاکہ آپ کا گھرانہ پہلے اطمینان محسوس کر سکے۔ اگر نرس یا اٹینڈنٹ مناسب نہ لگے، ہم آپ کی تسلی تک اسے بدل دیں گے۔</span>
            </p>
            <ul className="receipt-points">
              <li>
                <span className="mk" />
                <span>
                  <span data-en><b>No advance</b> payment</span>
                  <span data-ur className="urdu"><b>کوئی پیشگی</b> ادائیگی نہیں</span>
                </span>
              </li>
              <li>
                <span className="mk" />
                <span>
                  <span data-en>Daily, weekly, and monthly care options</span>
                  <span data-ur className="urdu">روزانہ، ہفتہ وار اور ماہانہ دیکھ بھال کے آپشنز</span>
                </span>
              </li>
              <li>
                <span className="mk" />
                <span>
                  <span data-en>Replacement until you&rsquo;re satisfied</span>
                  <span data-ur className="urdu">آپ کی تسلی تک تبدیلی</span>
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
                <span data-en>Care options</span>
                <span data-ur className="urdu">دیکھ بھال کے آپشنز</span>
              </span>
              <span className="dots" />
              <span className="rval">
                <span data-en>Daily / weekly / monthly</span>
                <span data-ur className="urdu">روزانہ / ہفتہ وار / ماہانہ</span>
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
                <span data-en>Replacement</span>
                <span data-ur className="urdu">تبدیلی</span>
              </span>
              <span className="dots" />
              <span className="rval free">
                <span data-en>Until satisfied</span>
                <span data-ur className="urdu">تسلی تک</span>
              </span>
            </div>
            <div className="rline total">
              <span className="rname">
                <span data-en>You continue</span>
                <span data-ur className="urdu">آپ جاری رکھیں</span>
              </span>
              <span className="dots" />
              <span className="rval free">
                <span data-en>When comfortable</span>
                <span data-ur className="urdu">اطمینان کے بعد</span>
              </span>
            </div>
            <div className="receipt-foot">
              <span data-en>Choose what fits your family</span>
              <span data-ur className="urdu">اپنے گھرانے کے لیے مناسب آپشن منتخب کریں</span>
              <b>
                <span data-en>FAMILY FIRST</span>
                <span data-ur className="urdu">گھرانہ پہلے</span>
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
