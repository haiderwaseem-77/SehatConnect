"use client";
import { useState } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import { QUALIFIED_NURSE_SERVICES, ATTENDANT_SERVICES, PRICES } from "@/lib/constants";

const SERVICE_ICONS: Record<string, ReactElement> = {
  post_op_care: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  elderly_care: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  ),
  paediatric_care: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/>
    </svg>
  ),
  icu_stepdown: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
    </svg>
  ),
  night_duty: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  ),
  diabetic_care: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
    </svg>
  ),
  mother_baby_care: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 011.8 3.9 2 2 0 010 3.6 9 9 0 01-17.6 0 2 2 0 010-3.6A9 9 0 0112 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>
    </svg>
  ),
  dementia_care: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 10-5.997.142 4 4 0 00-2.526 5.77 4 4 0 00.556 6.588A4 4 0 1012 18Z"/><path d="M12 5a3 3 0 115.997.142 4 4 0 012.526 5.77 4 4 0 01-.556 6.588A4 4 0 1112 18Z"/>
    </svg>
  ),
  palliative_care: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 14h2a2 2 0 002-2 2 2 0 00-2-2h-3c-.6 0-1.1.2-1.4.6L3 18"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 00-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0016 4a2.78 2.78 0 00-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"/>
    </svg>
  ),
};

export default function ServicesSection() {
  const [gender, setGender] = useState<"male" | "female">("female");
  const [category, setCategory] = useState<"qualified_nurse" | "attendant">("qualified_nurse");

  const services = category === "qualified_nurse" ? QUALIFIED_NURSE_SERVICES : ATTENDANT_SERVICES;
  const price = PRICES[category];

  return (
    <section style={{ backgroundColor: "#F5FAF9", padding: "56px 0" }}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "#0A2E2B", marginBottom: "6px" }}>
              Our Services
            </h2>
            <p style={{ fontSize: "14px", color: "#5A7572" }}>Choose the right care for your family</p>
          </div>

          {/* Gender toggle — always visible */}
          <div style={{ display: "flex", gap: "8px", backgroundColor: "#fff", border: "1px solid #B2DED9", borderRadius: "10px", padding: "4px" }}>
            {(["female", "male"] as const).map((g) => (
              <button key={g} onClick={() => setGender(g)}
                style={{
                  padding: "7px 20px", borderRadius: "7px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.15s",
                  backgroundColor: gender === g ? (g === "female" ? "#F4E8F4" : "#EEF9F7") : "transparent",
                  color: gender === g ? (g === "female" ? "#7A3D8A" : "#0D7A6E") : "#5A7572",
                }}>
                {g === "female" ? "Female" : "Male"}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {(["qualified_nurse", "attendant"] as const).map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{
                padding: "9px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                backgroundColor: category === cat ? "#0D7A6E" : "#fff",
                color: category === cat ? "#fff" : "#3D5E5A",
                border: category === cat ? "none" : "1px solid #B2DED9",
              }}>
              {cat === "qualified_nurse" ? "Qualified Nurse" : "Attendant"}
            </button>
          ))}
        </div>

        {/* Price badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#EEF9F7", border: "1px solid #B2DED9", borderRadius: "20px", padding: "5px 14px", marginBottom: "20px" }}>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#0D7A6E" }}>Rs. {price.toLocaleString()} / 12hr shift</span>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s.id}
              style={{ backgroundColor: "#fff", border: "0.5px solid #B2DED9", borderRadius: "12px", padding: "18px 16px" }}
              className="hover:border-[#0D7A6E] transition-colors">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{ backgroundColor: "#EEF9F7", borderRadius: "8px", width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", color: "#0D7A6E", flexShrink: 0 }}>
                  {SERVICE_ICONS[s.id]}
                </div>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#0A2E2B" }}>{s.label}</h3>
              </div>
              <p style={{ fontSize: "13px", color: "#5A7572", lineHeight: 1.6, marginBottom: "14px" }}>{s.description}</p>
              <Link href={`/book?service=${s.id}&category=${category}&gender=${gender}`}
                style={{ fontSize: "12px", fontWeight: 600, color: "#0D7A6E" }}>
                Book Now →
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison strip */}
        <div style={{ marginTop: "32px", backgroundColor: "#fff", border: "0.5px solid #B2DED9", borderRadius: "12px", padding: "20px 24px" }}
          className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#0A2E2B" }}>Not sure which to choose?</span>
            <p style={{ fontSize: "12px", color: "#5A7572", marginTop: "2px" }}>
              A Qualified Nurse handles medical tasks. An Attendant helps with daily care and personal support.
            </p>
          </div>
          <Link href="/services"
            style={{ backgroundColor: "#EEF9F7", color: "#0D7A6E", fontWeight: 600, fontSize: "13px", padding: "9px 20px", borderRadius: "8px", whiteSpace: "nowrap" }}
            className="hover:bg-[#B2DED9] transition-colors">
            Compare Services
          </Link>
        </div>
      </div>
    </section>
  );
}
