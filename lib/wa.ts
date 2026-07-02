import { WHATSAPP_NUMBER, PRICES, CONTACT_PHONE_DISPLAY } from "@/lib/constants";

// Roman-Urdu prefills, matching the direction-6 mockup exactly.
export const GENERIC_WA_MSG =
  "Assalam o Alaikum, mujhe ghar par nurse/attendant chahiye. Rabta karein, shukriya.";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function serviceWaMsg(service: string): string {
  return `Assalam o Alaikum. Mujhe ghar par ${service} chahiye. Rates aur details bata dein, shukriya.`;
}

// Forwardable price summary for the receipt "share with family" button.
export function receiptShareMsg(): string {
  const nurse = PRICES.qualified_nurse.toLocaleString("en-US");
  const attendant = PRICES.attendant.toLocaleString("en-US");
  return `Sehat Connect: ghar par Qualified Nurse Rs ${nurse} ya Attendant Rs ${attendant}, per 12-hour shift. Koi advance nahi, sirf shift ke baad payment. Call ya WhatsApp karein: ${CONTACT_PHONE_DISPLAY}.`;
}
