"use client";
// Direction-6 services — WhatsApp deep-link chips + "Show all services" disclosure.
import { useState } from "react";
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

const NURSE_ROWS: { svc: string; nm: string; ur: string; ds: string; dsUr: string }[] = [
  { svc: "Post-op Care", nm: "Post-op Care", ur: "آپریشن کے بعد دیکھ بھال", ds: "Wound care, dressing changes, recovery support after surgery.", dsUr: "زخم کی دیکھ بھال، ڈریسنگ کی تبدیلی، آپریشن کے بعد صحت یابی میں مدد۔" },
  { svc: "Elderly Care", nm: "Elderly Care", ur: "بزرگوں کی دیکھ بھال", ds: "Medicines, movement, day-to-day health monitoring.", dsUr: "دوائیں، چلنا پھرنا، روزمرہ صحت کی نگرانی۔" },
  { svc: "Paediatric Care", nm: "Paediatric Care", ur: "بچوں کی دیکھ بھال", ds: "Nursing care for newborns, infants and young children.", dsUr: "نوزائیدہ، شیرخوار اور چھوٹے بچوں کے لیے نرسنگ دیکھ بھال۔" },
  { svc: "ICU Step-down Care", nm: "ICU Step-down", ur: "آئی سی یو کے بعد", ds: "Care for patients sent home after ICU or HDU.", dsUr: "آئی سی یو یا ایچ ڈی یو سے گھر آنے والے مریضوں کی دیکھ بھال۔" },
  { svc: "Night Duty", nm: "Night Duty", ur: "رات کی ڈیوٹی", ds: "A nurse stays through the night to monitor and care.", dsUr: "ایک نرس رات بھر نگرانی اور دیکھ بھال کے لیے موجود رہتی ہے۔" },
  { svc: "Diabetic Care", nm: "Diabetic Care", ur: "ذیابیطس کی دیکھ بھال", ds: "Blood sugar checks, insulin, diet guidance.", dsUr: "بلڈ شوگر چیک، انسولین، خوراک کی رہنمائی۔" },
  { svc: "Mother & Baby Care", nm: "Mother & Baby Care", ur: "ماں اور بچے کی دیکھ بھال", ds: "Newborn and postnatal support for new mothers.", dsUr: "نوزائیدہ بچے کی دیکھ بھال اور نئی ماؤں کے لیے زچگی کے بعد مدد۔" },
  { svc: "Dementia & Alzheimer's Care", nm: "Dementia & Alzheimer’s", ur: "ڈیمنشیا کی دیکھ بھال", ds: "Routine, safety and gentle companionship.", dsUr: "معمول، حفاظت اور نرمی سے ساتھ۔" },
  { svc: "Palliative & Long-term Care", nm: "Palliative & Long-term", ur: "آرام دہ نگہداشت", ds: "Comfort-focused nursing, pain & symptom management.", dsUr: "آرام پر مرکوز نرسنگ، درد اور علامات کا انتظام۔" },
];

const ATTENDANT_ROWS: { svc: string; nm: string; ur: string; ds: string; dsUr: string }[] = [
  { svc: "an Attendant for Elderly Care", nm: "Elderly Care", ur: "بزرگوں کی دیکھ بھال", ds: "Feeding, hygiene, movement and comfort — non-clinical.", dsUr: "کھانا کھلانا، صفائی، چلنا پھرنا اور آرام — غیر طبی۔" },
  { svc: "an Attendant for Paediatric Care", nm: "Paediatric Care", ur: "بچوں کی دیکھ بھال", ds: "Day-to-day care and supervision for children.", dsUr: "بچوں کی روزمرہ دیکھ بھال اور نگرانی۔" },
  { svc: "an Attendant for Night Duty", nm: "Night Duty", ur: "رات کی ڈیوٹی", ds: "An attendant stays the night for comfort and basic care.", dsUr: "ایک اٹینڈنٹ رات بھر آرام اور بنیادی دیکھ بھال کے لیے موجود رہتا ہے۔" },
];

function Row({ svc, nm, ur, ds, dsUr }: { svc: string; nm: string; ur: string; ds: string; dsUr: string }) {
  return (
    <a className="svc-row" href={waLink(serviceWaMsg(svc))} target="_blank" rel="noopener noreferrer">
      <WaMini />
      <div>
        <div className="nm"><span data-en>{nm}</span> <span data-ur className="urdu">{ur}</span></div>
        <div className="ds"><span data-en>{ds}</span><span data-ur className="urdu">{dsUr}</span></div>
      </div>
    </a>
  );
}

export default function ServicesSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="block services" id="services">
      <div className="wrap">
        <svg className="pulse" viewBox="0 0 400 18" preserveAspectRatio="none" aria-hidden="true" style={{ marginBottom: 22 }}>
          <path d="M0 9 H150 L160 2 L172 16 L182 9 H400" />
          <circle className="node" cx="3" cy="9" r="3.5" />
        </svg>
        <div className="sec-head">
          <h2>
            <span data-en>Tap the care you need. We reply on WhatsApp.</span>
            <span data-ur className="urdu">جو دیکھ بھال چاہیے اسے ٹیپ کریں۔ ہم واٹس ایپ پر جواب دیتے ہیں۔</span>
          </h2>
          <p>
            <span data-en>Tap a service. WhatsApp opens with a ready message. Send it, and we&rsquo;ll guide you to the right nurse or attendant.</span>
            <span data-ur className="urdu">کوئی سروس ٹیپ کریں۔ واٹس ایپ میں تیار پیغام کھل جائے گا۔ اسے بھیج دیں، ہم آپ کو صحیح نرس یا اٹینڈنٹ تک رہنمائی دیں گے۔</span>
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
              <span className="lab"><b data-en>{c.en}</b><span data-ur className="urdu">{c.ur}</span></span>
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
                <span data-en>All services</span>
                <span data-ur className="urdu">تمام سروسز</span>
              </span>{" "}
              <span className="ds">
                <span data-en>9 nurse services + attendant · tap any to WhatsApp</span>
                <span data-ur className="urdu">9 نرسنگ سروسز + اٹینڈنٹ · کسی پر بھی ٹیپ کریں اور واٹس ایپ کریں</span>
              </span>
            </span>
            <span className="disc-chev" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </button>
          <div className="disc-body" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
            <div className="disc-body-inner">
              <div className="disc-body-pad">
                <div className="tier-bar">
                  <span className="tn">Qualified Nurse</span>
                  <span className="tp">
                    <span data-en>Exact price on the call · First day free</span>
                    <span data-ur className="urdu">قیمت کال پر · پہلا دن مفت</span>
                  </span>
                </div>
                <div className="svc-rows">
                  {NURSE_ROWS.map((r) => <Row key={r.svc} {...r} />)}
                </div>

                <div className="tier-bar">
                  <span className="tn">Attendant</span>
                  <span className="tp">
                    <span data-en>Exact price on the call · First day free</span>
                    <span data-ur className="urdu">قیمت کال پر · پہلا دن مفت</span>
                  </span>
                </div>
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
