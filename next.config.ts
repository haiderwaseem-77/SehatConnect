import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the dev-only overlay so it doesn't sit over the sticky mobile bar.
  devIndicators: false,
  async redirects() {
    return [
      { source: "/nurses", destination: "/services", permanent: true },
      { source: "/nurses/:id", destination: "/services", permanent: true },
      { source: "/login", destination: "/", permanent: true },
      { source: "/dashboard", destination: "/", permanent: true },
      { source: "/faq", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      // /cities/lahore near-duplicated the home page: with one live city, a
      // "Lahore" page IS the home page. /areas took over the area-hub job the
      // keyword map had earmarked for it, leaving it with nothing of its own.
      // Redirected rather than retitled, so whatever signal it holds lands on
      // the page that should own the head term (decided 2026-08-21).
      { source: "/cities/lahore", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
