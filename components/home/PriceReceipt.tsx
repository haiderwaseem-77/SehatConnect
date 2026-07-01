// Direction-6 price receipt — scalloped ticket with dotted leaders.
import { PRICES } from "@/lib/constants";

export default function PriceReceipt() {
  const nurse = `Rs ${PRICES.qualified_nurse.toLocaleString("en-US")}`;
  const attendant = `Rs ${PRICES.attendant.toLocaleString("en-US")}`;

  return (
    <section className="block receipt-sec" id="price">
      <div className="wrap">
        <div className="receipt-grid">
          <div className="receipt-copy">
            <h2>The whole price, on one line.</h2>
            <p>No fine print, no salesman, no advance. You read the price here, and you pay it after the shift, not a rupee before.</p>
            <ul className="receipt-points">
              <li><span className="mk" /> <span><b>Advance Rs 0</b>. You pay cash <b>after</b> the 12-hour shift</span></li>
              <li><span className="mk" /> <span>Same flat rate, day or night, anywhere in Lahore</span></li>
              <li><span className="mk" /> <span>Cancel or reschedule free up to <b>4 hours before</b></span></li>
            </ul>
          </div>

          <aside className="receipt" aria-label="Price summary">
            <div className="receipt-head">
              <div className="r-title">Sehat Connect</div>
              <div className="r-sub">In-home care &middot; Lahore &middot; 24/7</div>
            </div>
            <div className="rline"><span className="rname">Qualified Nurse</span><span className="dots" /><span className="rval">{nurse}</span></div>
            <div className="rline"><span className="rname">Attendant</span><span className="dots" /><span className="rval">{attendant}</span></div>
            <div className="rline"><span className="rname">Per shift</span><span className="dots" /><span className="rval">12 hours</span></div>
            <div className="rline"><span className="rname">Advance / deposit</span><span className="dots" /><span className="rval free">Rs 0</span></div>
            <div className="rline"><span className="rname">Hidden fees</span><span className="dots" /><span className="rval free">Rs 0</span></div>
            <div className="rline total"><span className="rname">You pay</span><span className="dots" /><span className="rval free">AFTER SHIFT</span></div>
            <div className="receipt-foot">
              PNC-registered &middot; CNIC &amp; references checked
              <b>NOTHING HIDDEN</b>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
