"use client";
// Direction-6 header — brand + bilingual toggle + desktop call button.
// Ported from design-explorations-v2/direction-6-combined.html
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/constants";
import { waLink, GENERIC_WA_MSG } from "@/lib/wa";

export default function Navbar() {
  const { lang, toggle } = useLanguage();

  return (
    <>
      <div className="accent-bar" />
      <header className="sc-header">
        <div className="wrap nav">
          <Link className="brand" href="/" aria-label="Sehat Connect home">
            <span className="mark" aria-hidden="true">
              <svg viewBox="0 0 60 30">
                <path d="M2 15 H18 L23 6 L30 24 L36 12 L40 15 H58" fill="none" stroke="#0D7A6E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="4" cy="15" r="3.5" fill="#0A2E2B" />
                <circle cx="56" cy="15" r="3.5" fill="#0A2E2B" />
              </svg>
            </span>
            <span className="name">
              <b>Sehat <span>Connect</span></b>
              <small>
                <span data-en>bringing the hospital to your home</span>
                <span data-ur lang="ur" dir="rtl" className="urdu">ہسپتال جیسی سہولت، آپ کے گھر پر</span>
              </small>
            </span>
          </Link>
          <div className="nav-actions">
            <button className="lang" type="button" aria-label="Switch language" onClick={toggle}>
              <span className="dot" />
              {lang === "en" ? <span className="urdu">اردو</span> : <span>EN</span>}
            </button>
            <a className="btn btn-wa nav-wa" href={waLink(GENERIC_WA_MSG)} target="_blank" rel="noopener noreferrer">
              <span className="wadot" aria-hidden="true" />
              <span data-en>WhatsApp</span>
              <span data-ur lang="ur" dir="rtl" className="urdu">واٹس ایپ</span>
            </a>
            <a className="btn btn-primary nav-call" href={`tel:${CONTACT_PHONE_TEL}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              {CONTACT_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
