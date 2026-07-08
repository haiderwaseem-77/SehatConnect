import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sehat Connect — Home Nursing Service in Lahore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A6258",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 100px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* ECG pulse line */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          <svg width="120" height="40" viewBox="0 0 120 40">
            <path
              d="M2 20 H30 L40 6 L55 34 L68 14 L78 20 H118"
              fill="none"
              stroke="#FBF8F2"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="4" cy="20" r="5" fill="#6fd0c3" />
            <circle cx="116" cy="20" r="5" fill="#6fd0c3" />
          </svg>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#FBF8F2",
            lineHeight: 1,
            marginBottom: 16,
            display: "flex",
          }}
        >
          Sehat{" "}
          <span style={{ color: "#6fd0c3", marginLeft: 16 }}>Connect</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "rgba(251,248,242,0.75)",
            marginBottom: 60,
            display: "flex",
          }}
        >
          bringing the hospital to your home
        </div>

        {/* Trust pills */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            "PNC-registered nurses",
            "First day free",
            "No advance",
            "24 / 7 Lahore",
          ].map((pill) => (
            <div
              key={pill}
              style={{
                background: "rgba(251,248,242,0.12)",
                border: "1.5px solid rgba(251,248,242,0.25)",
                borderRadius: 50,
                padding: "12px 24px",
                color: "#FBF8F2",
                fontSize: 22,
                display: "flex",
              }}
            >
              {pill}
            </div>
          ))}
        </div>

        {/* Phone number bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 100,
            color: "rgba(251,248,242,0.55)",
            fontSize: 26,
            display: "flex",
          }}
        >
          0328-8489988
        </div>
      </div>
    ),
    { ...size }
  );
}
