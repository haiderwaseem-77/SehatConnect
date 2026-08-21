import type { Lead, DeliveryResult } from "./types";
import { formatLead } from "./types";

/**
 * Telegram is the BACKUP alert, and the one that will almost never fail.
 *
 * Free, no business verification, no dedicated number, and delivery is more
 * reliable than the public ntfy.sh instance this replaced. Point TELEGRAM_CHAT_ID
 * at a GROUP rather than one person: whoever is on shift sees the lead, instead
 * of it waiting on one phone. History is searchable, which matters when you are
 * reconstructing what happened to a lead three weeks later.
 *
 * Both variables are server-only. A bot token is a credential — anyone holding
 * it can post as the bot and read whatever the bot can see.
 */
export async function sendTelegram(lead: Lead): Promise<DeliveryResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { channel: "telegram", ok: false, configured: false, detail: "TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set" };
  }

  const text = `🔔 New lead — Sehat Connect\n\n${formatLead(lead)}\n\nCall back fast: usually within 15 minutes.`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_notification: false }),
    });
    if (!res.ok) {
      return { channel: "telegram", ok: false, configured: true, detail: `HTTP ${res.status}: ${(await res.text()).slice(0, 200)}` };
    }
    return { channel: "telegram", ok: true, configured: true };
  } catch (e) {
    return { channel: "telegram", ok: false, configured: true, detail: String(e) };
  }
}
