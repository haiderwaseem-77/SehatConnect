// Direction-6 services — full-width WhatsApp service rows.
import { waLink, serviceWaMsg } from "@/lib/wa";

function WaMini() {
  return (
    <span className="wa-mini">
      <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Z" /></svg>
    </span>
  );
}

const CARE_ROWS: { svc: string; nm: string; ur: string; ds: string; dsUr: string }[] = [
  { svc: "Post-op Care", nm: "Post-op Care", ur: "آپریشن کے بعد دیکھ بھال", ds: "Wound care, dressing changes, recovery support after surgery.", dsUr: "زخم کی دیکھ بھال، ڈریسنگ کی تبدیلی، آپریشن کے بعد صحت یابی میں مدد۔" },
  { svc: "Elderly Care", nm: "Elderly Care", ur: "بزرگوں کی دیکھ بھال", ds: "Medicines, movement, feeding, hygiene and daily comfort.", dsUr: "دوائیں، چلنا پھرنا، کھانا، صفائی اور روزمرہ آرام۔" },
  { svc: "Injection & Drip Service", nm: "Injection & Drip Service", ur: "انجیکشن اور ڈرپ", ds: "Qualified help for injections, IV drips and basic monitoring at home.", dsUr: "گھر پر انجیکشن، آئی وی ڈرپ اور بنیادی نگرانی کے لیے کوالیفائیڈ مدد۔" },
  { svc: "Physiotherapy", nm: "Physiotherapy", ur: "فزیوتھراپی", ds: "Movement, mobility and recovery support at home.", dsUr: "گھر پر حرکت، چلنے پھرنے اور صحت یابی میں مدد۔" },
  { svc: "Mother & Baby Care", nm: "Mother & Baby Care", ur: "ماں اور بچے کی دیکھ بھال", ds: "Newborn and postnatal support for new mothers.", dsUr: "نوزائیدہ بچے کی دیکھ بھال اور نئی ماؤں کے لیے زچگی کے بعد مدد۔" },
  { svc: "Long-term Care & Comfort", nm: "Long-term Care & Comfort", ur: "طویل مدتی دیکھ بھال", ds: "Ongoing care, hygiene, feeding, movement and companionship.", dsUr: "مسلسل دیکھ بھال، صفائی، کھانا، چلنا پھرنا اور ساتھ۔" },
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
            <span data-en>Tap a service. WhatsApp opens with a ready message. Send it, and we&rsquo;ll guide you to the right care at home.</span>
            <span data-ur className="urdu">کوئی سروس ٹیپ کریں۔ واٹس ایپ میں تیار پیغام کھل جائے گا۔ اسے بھیج دیں، ہم آپ کو گھر پر صحیح دیکھ بھال تک رہنمائی دیں گے۔</span>
          </p>
        </div>

        <div className="services-list">
          <div className="svc-rows">
            {CARE_ROWS.map((r) => <Row key={r.svc} {...r} />)}
          </div>

          <p className="svc-foot">
            <span data-en>For medical tasks like injections, drips or wound dressing, we send a qualified nurse. Not sure what fits? WhatsApp us and we&rsquo;ll guide you.</span>
            <span data-ur className="urdu">انجیکشن، ڈرپ یا زخم کی ڈریسنگ جیسے طبی کام کے لیے ہم کوالیفائیڈ نرس بھیجتے ہیں۔ پکا نہیں کیا چاہیے؟ ہمیں واٹس ایپ کریں، ہم رہنمائی دیں گے۔</span>
          </p>
        </div>
      </div>
    </section>
  );
}
