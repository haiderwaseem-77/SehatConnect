import type { Lead, DeliveryResult } from "./types";

/**
 * The Google Sheet is the RECORD — the surface the ops team actually works.
 *
 * Chosen over a database on purpose: the team can open it, sort it, add a
 * "called at" or "converted" column, and leave notes, without anyone building
 * or maintaining an admin UI. A database would have needed one before it was
 * usable by a non-technical team, and its free tier pauses.
 *
 * Written through a Google Apps Script web app rather than the Sheets API.
 * The API route would mean a service-account private key in an env var and JWT
 * signing on every request; Apps Script is a single URL plus a shared secret,
 * costs nothing, and the team can edit the script themselves. See
 * docs/lead-pipeline-setup.md.
 *
 * SHEET_WEBHOOK_URL and SHEET_WEBHOOK_SECRET are server-only. The secret is
 * checked inside the script so a leaked URL alone cannot write rows.
 */
export async function appendToSheet(lead: Lead): Promise<DeliveryResult> {
  const url = process.env.SHEET_WEBHOOK_URL;
  const secret = process.env.SHEET_WEBHOOK_SECRET;

  if (!url || !secret) {
    return { channel: "sheet", ok: false, detail: "SHEET_WEBHOOK_URL / SHEET_WEBHOOK_SECRET not set" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, lead }),
      // Apps Script redirects to a googleusercontent URL on success; follow it,
      // otherwise every append looks like a failure.
      redirect: "follow",
    });
    if (!res.ok) {
      return { channel: "sheet", ok: false, detail: `HTTP ${res.status}: ${(await res.text()).slice(0, 200)}` };
    }
    return { channel: "sheet", ok: true };
  } catch (e) {
    return { channel: "sheet", ok: false, detail: String(e) };
  }
}
