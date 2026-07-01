"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CONTACT_PHONE_TEL } from "@/lib/constants";
import { waLink, GENERIC_WA_MSG } from "@/lib/wa";

type Variant = "hero" | "closer";

const CARE_CHIPS: { en: string; ur: string }[] = [
  { en: "Elderly parent", ur: "بزرگ" },
  { en: "After surgery", ur: "آپریشن کے بعد" },
  { en: "Mother & baby", ur: "ماں و بچہ" },
  { en: "Night duty", ur: "رات کی ڈیوٹی" },
  { en: "Bedridden", ur: "صاحبِ فراش" },
  { en: "Not sure yet", ur: "ابھی یقین نہیں" },
];

export default function LeadFormD6({ variant, area }: { variant: Variant; area?: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const namePlaceholder = variant === "hero" ? "e.g. Ahmed Raza" : "e.g. Bilal Ahmed";

  const toggleChip = (en: string) =>
    setSelected((s) => (s.includes(en) ? s.filter((x) => x !== en) : [...s, en]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please add your name so we can call you back.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setError("Please add your phone number so we can call you back.");
      return;
    }
    setError("");
    setLoading(true);
    const ref = "SGH-" + Math.floor(1000 + Math.random() * 9000);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          area: area ?? "",
          careType: selected.join(", "),
          ref,
        }),
      });
      if (!res.ok) {
        setLoading(false);
        setError("Something went wrong. Please call us directly.");
        return;
      }
    } catch {
      setLoading(false);
      setError("Something went wrong. Please call us directly.");
      return;
    }
    setLoading(false);
    router.push("/book/confirm?ref=" + ref);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="ribbon">
        <span className={variant === "closer" ? "dot beat-dot" : "dot"} />
        <span data-en>We&rsquo;ll call you back, usually the same day</span>
        <span data-ur className="urdu">ہم آپ کو کال کریں گے &mdash; عموماً اسی دن</span>
      </div>

      <label className="fld">
        <span className="lbl">
          <span data-en>Your name</span>
          <span data-ur className="urdu">آپ کا نام</span> <span className="req">*</span>
        </span>
        <input
          className="input"
          type="text"
          name="name"
          autoComplete="name"
          placeholder={namePlaceholder}
          value={name}
          onChange={(e) => { setName(e.target.value); if (error) setError(""); }}
          required
        />
      </label>

      <label className="fld">
        <span className="lbl">
          <span data-en>Phone number</span>
          <span data-ur className="urdu">فون نمبر</span> <span className="req">*</span>
        </span>
        <input
          className="input"
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          placeholder="03xx xxxxxxx"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); if (error) setError(""); }}
          required
        />
      </label>

      {variant === "hero" && (
        <>
          <div className="opt-label">
            <span data-en>Who needs care?</span>
            <span data-ur className="urdu">دیکھ بھال کس کے لیے؟</span>{" "}
            <span className="opt" data-en>(optional — tap any)</span>
            <span className="opt urdu" data-ur>(اختیاری)</span>
          </div>
          <div className="chips" role="group" aria-label="Who needs care">
            {CARE_CHIPS.map((c) => (
              <button
                key={c.en}
                type="button"
                className="chip"
                aria-pressed={selected.includes(c.en)}
                onClick={() => toggleChip(c.en)}
              >
                <span data-en>{c.en}</span>
                <span data-ur className="urdu">{c.ur}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {error && (
        <p className="form-err show" role="alert" aria-live="assertive">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.5v5.5" strokeLinecap="round" />
            <path d="M12 16.6h.01" strokeLinecap="round" />
          </svg>
          <span className="form-err-txt">{error}</span>
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
        {loading ? (
          <span>Sending&hellip;</span>
        ) : (
          <>
            <span data-en>Request my callback</span>
            <span data-ur className="urdu">مجھے کال کریں</span>
          </>
        )}
      </button>

      {variant === "hero" && (
        <div className="form-alt">
          <a className="btn btn-call" href={`tel:${CONTACT_PHONE_TEL}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            <span data-en>Call</span>
            <span data-ur className="urdu">کال</span>
          </a>
          <a className="btn btn-wa" href={waLink(GENERIC_WA_MSG)} target="_blank" rel="noopener noreferrer">
            <span className="wadot" /> WhatsApp
          </a>
        </div>
      )}

      <p className="form-foot">
        <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        {variant === "hero" ? (
          <>
            <span data-en>Your number stays private. We only call about your care.</span>
            <span data-ur className="urdu">آپ کا نمبر نجی رہتا ہے۔ ہم صرف دیکھ بھال کے لیے کال کرتے ہیں۔</span>
          </>
        ) : (
          <>
            <span data-en>Name + Phone only. Area is asked on the call.</span>
            <span data-ur className="urdu">صرف نام اور نمبر۔ علاقہ کال پر پوچھا جاتا ہے۔</span>
          </>
        )}
      </p>
    </form>
  );
}
