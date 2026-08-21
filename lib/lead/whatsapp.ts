import type { Lead, DeliveryResult } from "./types";

/**
 * WhatsApp is the PRIMARY alert, because it is the app the team already lives
 * in all day. A lead landing there needs no new habit and no second device.
 *
 * Meta Cloud API. Two things about it are easy to get wrong:
 *
 * 1. A business-initiated message outside the 24-hour customer service window
 *    MUST use an approved template. Free-form text is silently rejected. So the
 *    lead details travel as template PARAMETERS, not as a message body.
 * 2. The sender number must be registered to the WhatsApp Business Account and
 *    cannot also be signed in to the ordinary WhatsApp app.
 *
 * The template is expected to take four body parameters in this order:
 *    {{1}} name   {{2}} phone   {{3}} area (or "—")   {{4}} ref
 * Create it as a UTILITY template. Exact setup in docs/lead-pipeline-setup.md.
 *
 * Every variable here is server-only. WHATSAPP_TOKEN is a long-lived credential
 * — it must never be NEXT_PUBLIC_.
 */
export async function sendWhatsApp(lead: Lead): Promise<DeliveryResult> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.WHATSAPP_ALERT_TO;
  const template = process.env.WHATSAPP_TEMPLATE_NAME || "new_lead";
  const lang = process.env.WHATSAPP_TEMPLATE_LANG || "en";

  if (!token || !phoneNumberId || !to) {
    return {
      channel: "whatsapp",
      ok: false,
      detail: "WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_ALERT_TO not set",
    };
  }

  const body = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: template,
      language: { code: lang },
      components: [
        {
          type: "body",
          parameters: [lead.name, lead.phone, lead.area || "—", lead.ref].map((text) => ({
            type: "text",
            text,
          })),
        },
      ],
    },
  };

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      // Meta's errors are specific and worth keeping whole in the log — a
      // rejected template or an expired token both surface here.
      return { channel: "whatsapp", ok: false, detail: `HTTP ${res.status}: ${(await res.text()).slice(0, 300)}` };
    }
    return { channel: "whatsapp", ok: true };
  } catch (e) {
    return { channel: "whatsapp", ok: false, detail: String(e) };
  }
}
