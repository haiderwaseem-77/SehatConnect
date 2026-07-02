"use client";
// Direction-6 services — WhatsApp deep-link chips + "Show all services" disclosure.
import { useState } from "react";
import { PRICES } from "@/lib/constants";
import { waLink, serviceWaMsg } from "@/lib/wa";

function WaMini() {
  return (
    <span className="wa-mini">
      <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Z" /></svg>
    </span>
  );
}

const CHIPS: { svc: string; en: string; ur: string }[] = [
  { svc: "Post-op Care", en: "Post-op Care", ur: "آپریشن کے بعد دیکھ بھال" },
  { svc: "Elderly Care", en: "Elderly Care", ur: "بزرگوں کی دیکھ بھال" },
  { svc: "Night Duty", en: "Night Duty", ur: "رات کی ڈیوٹی" },
  { svc: "Mother & Baby Care", en: "Mother & Baby Care", ur: "ماں اور بچے کی دیکھ بھال" },
  { svc: "Diabetic Care", en: "Diabetic Care", ur: "ذیابیطس کی دیکھ بھال" },
  { svc: "Dementia & Alzheimer's Care", en: "Dementia & Alzheimer’s Care", ur: "ڈیمنشیا کی دیکھ بھال" },
];

const NURSE_ROWS: { svc: string; nm: string; ur: string; ds: string }[] = [
  { svc: "Post-op Care", nm: "Post-op Care", ur: "آپریشن کے بعد دیکھ بھال", ds: "Wound care, dressing changes, recovery support after surgery." },
  { svc: "Elderly Care", nm: "Elderly Care", ur: "بزرگوں کی دیکھ بھال", ds: "Medicines, movement, day-to-day health monitoring." },
  { svc: "Paediatric Care", nm: "Paediatric Care", ur: "بچوں کی دیکھ بھال", ds: "Nursing care for newborns, infants and young children." },
  { svc: "ICU Step-down Care", nm: "ICU Step-down", ur: "آئی سی یو کے بعد", ds: "Care for patients sent home after ICU or HDU." },
  { svc: "Night Duty", nm: "Night Duty", ur: "رات کی ڈیوٹی", ds: "A nurse stays through the night to monitor and care." },
  { svc: "Diabetic Care", nm: "Diabetic Care", ur: "ذیابیطس کی دیکھ بھال", ds: "Blood sugar checks, insulin, diet guidance." },
  { svc: "Mother & Baby Care", nm: "Mother & Baby Care", ur: "ماں اور بچے کی دیکھ بھال", ds: "Newborn and postnatal support for new mothers." },
  { svc: "Dementia & Alzheimer's Care", nm: "Dementia & Alzheimer’s", ur: "ڈیمنشیا کی دیکھ بھال", ds: "Routine, safety and gentle companionship." },
  { svc: "Palliative & Long-term Care", nm: "Palliative & Long-term", ur: "آرام دہ نگہداشت", ds: "Comfort-focused nursing, pain & symptom management." },
];

const ATTENDANT_ROWS: { svc: string; nm: string; ur: string; ds: string }[] = [
  { svc: "an Attendant for Elderly Care", nm: "Elderly Care", ur: "بزرگوں کی دیکھ بھال", ds: "Feeding, hygiene, movement and comfort — non-clinical." },
  { svc: "an Attendant for Paediatric Care", nm: "Paediatric Care", ur: "بچوں کی دیکھ بھال", ds: "Day-to-day care and supervision for children." },
  { svc: "an Attendant for Night Duty", nm: "Night Duty", ur: "رات کی ڈیوٹی", ds: "An attendant stays the night for comfort and basic care." },
];

function Row({ svc, nm, ur, ds }: { svc: string; nm: string; ur: string; ds: string }) {
  return (
    <a className="svc-row" href={waLink(serviceWaMsg(svc))} target="_blank" rel="noopener noreferrer">
      <WaMini />
      <div>
        <div className="nm">{nm} <span className="urdu">{ur}</span></div>
        <div className="ds">{ds}</div>
      </div>
    </a>
  );
}

export default function ServicesSection() {
  const [open, setOpen] = useState(false);
  const nursePrice = `Rs ${PRICES.qualified_nurse.toLocaleString("en-US")} / 12-hr shift`;
  const attendantPrice = `Rs ${PRICES.attendant.toLocaleString("en-US")} / 12-hr shift`;

  return (
    <section className="block services" id="services">
      <div className="wrap">
        <svg className="pulse" viewBox="0 0 400 18" preserveAspectRatio="none" aria-hidden="true" style={{ marginBottom: 22 }}>
          <path d="M0 9 H150 L160 2 L172 16 L182 9 H400" />
          <circle className="node" cx="3" cy="9" r="3.5" />
        </svg>
        <div className="sec-head">
          <h2>
            <span data-en>Tap the care you need. A real person replies on WhatsApp.</span>
            <span data-ur className="urdu">جو دیکھ بھال چاہیے اسے ٹیپ کریں۔ ایک حقیقی فرد واٹس ایپ پر جواب دیتا ہے۔</span>
          </h2>
          <p>
            <span data-en>Tap a service and a ready-made message opens &mdash; just press send. Someone on our team reads it and matches you with the right nurse or attendant. Every nurse is PNC registered.</span>
            <span data-ur className="urdu">کوئی سروس ٹیپ کریں اور تیار شدہ پیغام کھل جاتا ہے &mdash; بس سینڈ دبائیں۔ ہماری ٹیم کا کوئی رکن اسے پڑھ کر آپ کو صحیح نرس یا اٹینڈنٹ سے ملاتا ہے۔ ہر نرس PNC رجسٹرڈ ہے۔</span>
          </p>
        </div>

        <p className="svc-chips-lead">
          <span data-en>What families ask for most</span>
          <span data-ur className="urdu">گھرانے سب سے زیادہ کیا مانگتے ہیں</span>
        </p>
        <div className="svc-chips">
          {CHIPS.map((c) => (
            <a key={c.svc} className="svc-chip" href={waLink(serviceWaMsg(c.svc))} target="_blank" rel="noopener noreferrer">
              <WaMini />
              <span className="lab"><b>{c.en}</b><span className="urdu">{c.ur}</span></span>
            </a>
          ))}
        </div>

        <p className="svc-help">
          <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Z" /></svg>
          <span data-en>Not sure which one fits? Just WhatsApp us, we&rsquo;ll be honest about whether you need a nurse or an attendant.</span>
          <span data-ur className="urdu">پکا نہیں کون سی درست ہے؟ بس ہمیں واٹس ایپ کریں، ہم صاف بتا دیں گے کہ آپ کو نرس چاہیے یا اٹینڈنٹ۔</span>
        </p>

        <div className="disc" data-open={open ? "1" : "0"}>
          <button className="disc-head" type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span className="disc-ico"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" /></svg></span>
            <span className="disc-titles">
              <span className="dt">
                <span data-en>All services &amp; prices</span>
                <span data-ur className="urdu">تمام سروسز اور قیمتیں</span>
              </span>{" "}
              <span className="ds">
                <span data-en>9 nurse services + attendant, with prices · tap any to WhatsApp</span>
                <span data-ur className="urdu">9 نرسنگ سروسز + اٹینڈنٹ، قیمتوں کے ساتھ · کسی پر بھی ٹیپ کریں اور واٹس ایپ کریں</span>
              </span>
            </span>
            <span className="disc-chev" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </button>
          <div className="disc-body" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
            <div className="disc-body-inner">
              <div className="disc-body-pad">
                <div className="tier-bar"><span className="tn">Qualified Nurse</span><span className="tp">{nursePrice}</span></div>
                <div className="svc-rows">
                  {NURSE_ROWS.map((r) => <Row key={r.svc} {...r} />)}
                </div>

                <div className="tier-bar"><span className="tn">Attendant</span><span className="tp">{attendantPrice}</span></div>
                <div className="svc-rows">
                  {ATTENDANT_ROWS.map((r) => <Row key={r.svc} {...r} />)}
                </div>

                <p className="svc-foot">
                  <span data-en><b>Need a medical task done</b>, like injections, drips or wound dressing? That&rsquo;s a <b>Qualified Nurse</b>, not an attendant. We&rsquo;ll never send the cheaper option for a job it can&rsquo;t do.</span>
                  <span data-ur className="urdu"><b>طبی کام درکار ہے</b>، جیسے انجیکشن، ڈرپ یا زخم کی ڈریسنگ؟ یہ <b>کوالیفائیڈ نرس</b> کا کام ہے، اٹینڈنٹ کا نہیں۔ ہم کبھی ایسا کام سستے آپشن کو نہیں دیں گے جو وہ کر ہی نہیں سکتا۔</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
