import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Nurses and attendants at home in Johar Town, Lahore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "Nurse or attendant in Johar Town",
    subline: "For the days after a discharge — dressings, drips, medicines on time.",
  });
}
