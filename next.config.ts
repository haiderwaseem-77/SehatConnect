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
    ];
  },
};

export default nextConfig;
