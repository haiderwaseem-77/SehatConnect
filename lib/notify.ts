// Server-only ntfy notification helper.
//
// Reads the ntfy topic from the server-only env var NTFY_TOPIC (never
// NEXT_PUBLIC_*, so the secret topic name is never shipped to the browser).
// If NTFY_TOPIC is unset/empty, notify() no-ops (it never throws) so that
// callers — e.g. lead capture — keep working even when notifications are
// unconfigured. Optional NTFY_TOKEN is sent as a Bearer token for
// authenticated/reserved topics.
//
// Fire-and-forget safe: a notification failure is caught internally and
// never bubbles up to the caller.
//
// Returns TRUE only when ntfy actually accepted the message. Lead capture treats
// this as an independent delivery channel — if the database write fails, a
// successful notification is what stops the lead being lost — so the caller has
// to be able to tell delivery from silence. Never change this back to `void`.

export async function notify(opts: {
  title: string;
  body: string;
  priority?: string;
  tags?: string;
}): Promise<boolean> {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) {
    console.warn("notify: NTFY_TOPIC is not set — skipping notification.");
    return false;
  }

  const headers: Record<string, string> = {
    "Title": opts.title,
  };
  if (opts.priority) headers["Priority"] = opts.priority;
  if (opts.tags) headers["Tags"] = opts.tags;

  const token = process.env.NTFY_TOKEN;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const res = await fetch(`https://ntfy.sh/${topic}`, {
      method: "POST",
      headers,
      body: opts.body,
    });
    if (!res.ok) {
      console.error("notify: ntfy rejected the message:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("notify: failed to send ntfy notification:", e);
    return false;
  }
}
