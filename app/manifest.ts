import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sehat Connect — Home Nursing Service in Lahore",
    short_name: "Sehat Connect",
    description:
      "Nurses and patient attendants at home in Lahore. Call or WhatsApp. Our team arranges care.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF8F2",
    theme_color: "#0A6258",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
