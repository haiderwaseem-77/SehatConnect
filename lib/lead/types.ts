/**
 * One captured lead.
 *
 * Deliberately small. NORTH-STAR fixes the form at name + phone; everything
 * else is context we happen to know, never something the family had to type.
 */
export interface Lead {
  /** Required. */
  name: string;
  /** Required. Free-form — Pakistani numbers arrive in many shapes. */
  phone: string;
  /** Which page produced the lead, e.g. "/areas/gulberg". */
  source: string;
  /** Hero form or closing form. */
  variant: string;
  /** Area, when the page implies one. Never asked for. */
  area: string;
  /** Server-generated reference. Never trust one from the client. */
  ref: string;
  /** ISO timestamp, set server-side. */
  receivedAt: string;
}

/** What a delivery channel reports back. */
export interface DeliveryResult {
  channel: string;
  ok: boolean;
  /**
   * False when the channel's environment variables are absent — meaning it was
   * never set up, as opposed to set up and broken.
   *
   * The distinction matters. WhatsApp may be added weeks after Telegram, and
   * logging a hard error on every lead for a channel nobody has configured yet
   * teaches the team that the error log is noise. Unconfigured is reported
   * quietly; configured-but-failing is shouted about.
   */
  configured: boolean;
  /** Present on failure. Logged server-side, never returned to the browser. */
  detail?: string;
}

/** Human-readable one-liner used by every alert channel, so they cannot drift. */
export function formatLead(lead: Lead): string {
  const lines = [
    `Name:  ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.area ? `Area:  ${lead.area}` : null,
    `Page:  ${lead.source}`,
    `Ref:   ${lead.ref}`,
  ].filter(Boolean);
  return lines.join("\n");
}
