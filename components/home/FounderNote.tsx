import Image from "next/image";
import PulseAccent from "@/components/home/PulseAccent";

// Direction-6 human proof — founder note.
export default function FounderNote() {
  return (
    <section className="block" id="about">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <PulseAccent />
          <h2>
            <span data-en>Who&rsquo;s behind Sehat Connect.</span>
            <span data-ur className="urdu">Sehat Connect کے پیچھے کون ہے۔</span>
          </h2>
        </div>

        <div className="founder-card" data-reveal>
          <div className="founder-q">
            <p>
              <span data-en>When my mother-in-law needed care at home, I learned how stressful it is to let a stranger into your house. That&rsquo;s why Sehat Connect exists. Every caregiver is checked before we send them, you pay only after the shift, and our team is always one call away.</span>
              <span data-ur className="urdu">جب میری ساس کو گھر پر دیکھ بھال چاہیے تھی، مجھے سمجھ آیا کہ اجنبی کو گھر میں بلانا کتنا مشکل فیصلہ ہے۔ اسی لیے Sehat Connect بنایا۔ ہر فرد پہلے چیک ہوتا ہے، ادائیگی شفٹ کے بعد ہوتی ہے، اور ہماری ٹیم ایک کال دور رہتی ہے۔</span>
            </p>
            <p>
              <span data-en>I aim to look after your family the way I wanted <em>mine</em> looked after.</span>
              <span data-ur className="urdu">میرا وعدہ ہے: آپ کے گھر والوں کا خیال ایسے رکھیں گے جیسے اپنے گھر والوں کا۔</span>
            </p>
          </div>
          <div className="founder-sign">
            <span className="founder-photo">
              <Image
                src="/founder/abdullah-waseem.jpg"
                alt="Sardar Waseem Ilyas, founder of Sehat Connect"
                width={62}
                height={62}
              />
            </span>
            <div className="founder-meta">
              <div className="fn">Sardar Waseem Ilyas</div>
              <div className="fr">
                <span data-en>Founder, Sehat Connect &middot; Lahore</span>
                <span data-ur className="urdu">بانی، Sehat Connect &middot; لاہور</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
