import { PROMISES } from "@/lib/constants";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Trained patient attendants at home in Lahore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  // Pills swap the nurse pill for the attendant one — this page is not
  // about clinical nursing.
  return ogImage({
    headline: "A trained attendant at home",
    subline: "Feeding, hygiene, help moving around the house, company and night duty.",
    pills: [
      "Trained attendants",
      PROMISES.trial.enShort,
      "No advance",
      "24 / 7 Lahore",
    ],
  });
}
