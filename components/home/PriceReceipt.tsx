// Direction-6 payment section — simple plan summary.
// NOTE: prices hidden from all public surfaces as of 2026-07-02 (see
// NORTH-STAR Decision Ledger). File name + id="price" kept as-is so the
// anchor link and any future restore stay simple.
import { waLink, receiptShareMsg } from "@/lib/wa";

export default function PriceReceipt() {
  return (
    <section className="block receipt-sec" id="price">
      <div className="wrap">
        <div className="receipt-grid receipt-grid-simple">
          <div className="receipt-copy">
            <h2>
              <span data-en>How payment works</span>
              <span data-ur className="urdu">ادائیگی کیسے ہوتی ہے</span>
            </h2>
            <p>
              <span data-en>Choose the care plan that fits your family.</span>
              <span data-ur className="urdu">جو پلان گھر والوں کو ٹھیک لگے، وہ رکھیں۔</span>
            </p>
            <ul className="receipt-points">
              <li>
                <span className="mk" />
                <span>
                  <span data-en>Daily, weekly, and monthly packages are available.</span>
                  <span data-ur className="urdu">روزانہ، ہفتہ وار اور ماہانہ پیکیج مل جاتے ہیں۔</span>
                </span>
              </li>
              <li>
                <span className="mk" />
                <span>
                  <span data-en>First day is free, so your family can feel comfortable first.</span>
                  <span data-ur className="urdu">پہلا دن مفت ہے، پہلے اطمینان کر لیں۔</span>
                </span>
              </li>
              <li>
                <span className="mk" />
                <span>
                  <span data-en>No advance payment.</span>
                  <span data-ur className="urdu">کوئی پیشگی نہیں۔</span>
                </span>
              </li>
              <li>
                <span className="mk" />
                <span>
                  <span data-en>If the nurse or attendant doesn&rsquo;t feel right, we&rsquo;ll replace them until you&rsquo;re satisfied.</span>
                  <span data-ur className="urdu">نرس یا اٹینڈنٹ مناسب نہ لگے تو بدل دیں گے۔</span>
                </span>
              </li>
            </ul>

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
          </div>
        </div>
      </div>
    </section>
  );
}
