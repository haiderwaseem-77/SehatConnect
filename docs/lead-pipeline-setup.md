# Lead pipeline — setup runbook

How to get the "Call me back" form working in production, end to end.

Nothing here needs a developer. It needs about ninety minutes, a laptop, and the
phone number that will act as the business WhatsApp sender. Work through the
sections in order — section 5 (Vercel) only makes sense once you have the values
from sections 2, 3 and 4.

The variables named here are the ones in `.env.example`, which is the
authoritative list. If the two ever disagree, `.env.example` wins and this file
should be fixed.

---

## 1. What this is, and why three channels

A family fills in name and phone. The browser POSTs that to `/api/lead`, and that
endpoint sends the lead to **three places at once**:

| Channel | Role | Why |
|---|---|---|
| Google Sheet | The **record** the team works | Sortable, has your call notes and outcome, no admin screen to build |
| WhatsApp Cloud API | The **primary alert** | It is the app the team is already in all day |
| Telegram | The **backup alert** | Free, no verification, almost never fails |

All three run concurrently. **The request succeeds if any one of them
delivered.** That is the whole design, and the rule behind it is: never lose a
lead. A frightened person has just typed their number; that has to reach a human
even when Meta is rate-limiting us or Google is having a bad morning.

What the family sees:

- **All three worked** — they land on the confirmation page with a reference
  like `SC-260821-K4QP`.
- **One or two worked** — exactly the same thing. They see success, because the
  lead *is* safe. The failure is written to the Vercel logs for you to fix. This
  is why you must check the `delivered` list after any change (section 6): a
  silent partial failure looks identical to a healthy submission from outside.
- **All three failed** — the endpoint returns an error, the form says
  *"Something went wrong. Please call us directly."* in English and Urdu, and
  the Call and WhatsApp buttons are right there under the form. Before that, the
  browser has already retried once by itself. The server writes a
  `[lead] LEAD LOST` line to the Vercel log containing the name and phone
  number, so the lead can still be recovered by hand.

Two more behaviours worth knowing before you test:

- The same phone number submitted twice within about 90 seconds is treated as a
  double-tap. The second one is acknowledged but not re-sent, and the response
  says `"duplicate": true`.
- A form filled in impossibly fast, or with the hidden `company` field filled,
  is silently discarded as a bot. It returns success and sends nothing. That is
  deliberate — a bot that learns which check it tripped just edits its script.

---

## 2. Google Sheet and Apps Script

This is the longest section and the one worth doing carefully, because the sheet
is where the team actually works.

### 2.1 Create the sheet

1. Create a new Google Sheet in the account the business will keep long-term —
   not a personal account someone might lose access to.
2. Name the sheet tab **`Leads`** (bottom-left tab, double-click to rename). The
   script looks for that name and falls back to the first tab if it is missing,
   but naming it removes the ambiguity.
3. Put this **exact header row** in row 1, one value per cell, A through K:

   | A | B | C | D | E | F | G | H | I | J | K |
   |---|---|---|---|---|---|---|---|---|---|---|
   | received at | name | phone | area | page | ref | called at | who called | outcome | reason if lost | notes |

**Columns A–F are written by the script. Columns G–K are yours.** The script
appends a new row and writes six cells; it never touches G–K on any row, so your
call notes cannot be overwritten. **Reason if lost is its own column rather than
buried in notes** so you can sort by it — after thirty leads, the pattern in that
column tells you more about what to fix than any analytics dashboard will. Do not reorder A–F — the script writes by
position, so a moved column silently puts phone numbers under "area".

If you want more team columns, add them to the right of `notes`. Never insert a
column inside A–F.

### 2.2 Set the shared secret as a Script Property

The secret is what stops a stranger writing rows into your sheet. It lives in
the script's properties, **not in the code**, because the code is easy to
copy-paste into a chat, screenshot, or share with a helper — and a secret that
has been pasted anywhere is no longer a secret. Properties are not shown when
you share the script.

1. Open the sheet, then open its Apps Script editor from the sheet's Extensions
   menu.
2. Open the editor's project settings (the gear icon in the left rail).
3. In the script properties area, add a property:
   - **Property**: `SHEET_SECRET`
   - **Value**: a long random string you generate — 32 characters or more, mixed
     letters and digits, no spaces. Do not use a word, a phone number, or the
     business name.
4. Save it, and keep a copy. This exact value goes into Vercel later as
   `SHEET_WEBHOOK_SECRET`. The two must match character for character; a
   trailing space pasted into either one is the most common cause of the sheet
   silently not appending.

### 2.3 Paste the script

In the Apps Script editor, replace everything in `Code.gs` with this, then save.

```javascript
/**
 * Sehat Connect — lead intake.
 *
 * Receives a POST of {secret, lead} from the website and appends one row.
 * Columns A-F are written here. Columns G-K (called at, who called, outcome,
 * notes) belong to the team and are never touched.
 */

var SHEET_NAME = 'Leads';
var HEADERS = [
  'received at', 'name', 'phone', 'area', 'page', 'ref',
  'called at', 'who called', 'outcome', 'reason if lost', 'notes'
];

function doPost(e) {
  try {
    var expected = PropertiesService.getScriptProperties().getProperty('SHEET_SECRET');
    if (!expected) {
      return json({ ok: false, error: 'server_not_configured' });
    }

    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: 'empty_request' });
    }

    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return json({ ok: false, error: 'bad_json' });
    }

    if (payload.secret !== expected) {
      return json({ ok: false, error: 'unauthorised' });
    }

    var lead = payload.lead || {};
    if (!lead.name && !lead.phone) {
      return json({ ok: false, error: 'empty_lead' });
    }

    // One writer at a time, so two leads arriving together cannot land on the
    // same row.
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var sheet = getSheet_();
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
      }
      sheet.appendRow([
        formatReceived_(lead.receivedAt),
        lead.name || '',
        // Leading apostrophe: keeps 0328... a phone number instead of the
        // number 328, which is what Sheets does otherwise.
        lead.phone ? "'" + lead.phone : '',
        lead.area || '',
        lead.source || '',
        lead.ref || ''
      ]);
    } finally {
      lock.releaseLock();
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** A quick liveness check in a browser. Returns no data and needs no secret. */
function doGet() {
  return json({ ok: true, service: 'sehat-connect-lead-intake' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    // Tab renamed or deleted: use the first tab rather than dropping the lead.
    sheet = ss.getSheets()[0];
  }
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

/** The site sends UTC. The team reads Lahore time. */
function formatReceived_(iso) {
  var d = iso ? new Date(iso) : new Date();
  if (isNaN(d.getTime())) {
    d = new Date();
  }
  return Utilities.formatDate(d, 'Asia/Karachi', 'yyyy-MM-dd HH:mm');
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Two things about this code that are not obvious:

- `doPost(e)` is the fixed name and signature Apps Script calls. Renaming it, or
  dropping the `e`, gives you a script that saves fine and never receives
  anything.
- The phone is written with a leading apostrophe so Google Sheets keeps
  `0328-8489988` as text. Without it, Sheets strips the leading zero on numbers
  that look numeric.

### 2.4 Deploy it as a web app

1. In the Apps Script editor, start a new deployment and choose the web app
   type.
2. Set **Execute as: Me**. The script then runs with your permission to write to
   your sheet, which is what you want — the website has no Google login of its
   own.
3. Set **Who has access: Anyone**. This sounds wrong and is not: "anyone" only
   means anyone may *call the URL*. The script checks the secret before it
   writes a single cell, and returns `unauthorised` otherwise. **That check is
   the entire reason the secret exists.** If you ever remove it, "anyone"
   becomes exactly as dangerous as it sounds.
4. The first deployment asks you to authorise the script against your Google
   account. Google will warn that the app is unverified — that warning is for
   apps published to other people; this one is yours, published by you, to your
   own sheet. Continue through it.
5. When the deployment finishes, copy the **web app URL**. It looks like
   `https://script.google.com/macros/s/AKfy…/exec` and ends in `/exec`. This is
   `SHEET_WEBHOOK_URL`.

**The trap in redeploying:** if you later edit the script and create a *new*
deployment, you get a *new* URL, and the old one stops working — leads keep
arriving on WhatsApp and Telegram while the sheet quietly stops filling.
Whenever you edit the script, either update the existing deployment (which keeps
the URL) or copy the new URL into Vercel and redeploy the site.

**About 302s in the logs:** on success Apps Script answers with a redirect to a
`googleusercontent.com` address, and the site follows it. A 302 for a sheet
append is normal and is not an error.

You can confirm the deployment is alive by opening the `/exec` URL in a browser.
It should show `{"ok":true,"service":"sehat-connect-lead-intake"}`. That is the
`doGet` above; it proves the URL works without proving anything about the
secret.

---

## 3. WhatsApp Cloud API — the primary alert

This is the fiddliest of the three, and the one most likely to be silently
broken later. Read 3.2 and 3.4 before you start clicking.

### 3.1 Account, app, and the WhatsApp product

1. Create (or sign in to) a Meta Business account for Sehat Connect.
2. In the Meta developer console, create a new app of the business type.
3. Add the **WhatsApp** product to that app. This creates a WhatsApp Business
   Account and gives you a test setup inside the WhatsApp section of your app's
   dashboard — that section is where the phone numbers, the token, and the
   number IDs all live, and where you will come back to repeatedly.

### 3.2 The sender number cannot be on ordinary WhatsApp

**A number registered as a Cloud API sender cannot also be signed in to the
normal WhatsApp or WhatsApp Business app.** Registering it to the API logs it
out of the app, and re-installing the app on that number breaks the API.

This is the single most common way this setup goes wrong, and it usually goes
wrong by someone reaching for the number the business already uses on their
phone. You have confirmed you have a separate number for this. Use that one, and
tell the team it is off-limits for ordinary chatting.

Note also that `0328-8489988` — the number printed on the site — is the number
customers call and WhatsApp. It stays on the ordinary app. It is not the sender.

### 3.3 The Phone Number ID

In the WhatsApp section of your app's dashboard, the sending number is listed
with a **Phone Number ID** beside it — a long number, not the phone number
itself. Copy that. It is `WHATSAPP_PHONE_NUMBER_ID`.

Copying the phone number instead of the ID produces an error on every send. If
what you copied has a `+` or looks like a phone number, it is the wrong value.

### 3.4 Access tokens — do not ship the temporary one

The dashboard hands you a temporary access token straight away. **It expires in
24 hours.** It is for testing, and only for that.

If you put it into Vercel and go home, WhatsApp alerts stop the next day, with
no warning, no bounce, and no visible change to the family submitting the form —
Telegram and the sheet keep working, so nothing looks broken. That is exactly
the failure this three-channel design is meant to survive, but it is still a
channel you are paying attention to that has gone dark.

For production, create a **System User** in your Meta Business settings, give it
access to the app and the WhatsApp Business Account, and generate a token for it
with the WhatsApp messaging and business-management permissions. Choose the
non-expiring option when generating it. That token is `WHATSAPP_TOKEN`.

Treat it like a password. Anyone holding it can send WhatsApp messages as your
business until you revoke it.

### 3.5 The message template

A business-initiated WhatsApp message — which every lead alert is — must use a
template approved by Meta in advance. Free-form text is rejected. So the code
does not send a message body at all; **it sends four parameters into a template
you create.**

Create the template in the message-templates area of your WhatsApp Business
Account:

- **Category**: UTILITY
- **Name**: `new_lead` — exactly this, lowercase with an underscore. This is
  what `WHATSAPP_TEMPLATE_NAME` defaults to.
- **Language**: whichever you pick, note the code Meta shows for it. If you
  create it as `en_US`, then `WHATSAPP_TEMPLATE_LANG` must be `en_US`, not `en`.
  The site defaults to `en`, so either create the template as plain English `en`
  or change the variable. A mismatched language code fails every send.
- **Body** — four positional parameters, in this order:

```
New enquiry for Sehat Connect.
Name: {{1}}
Phone: {{2}}
Area: {{3}}
Ref: {{4}}
Call back fast, usually within 15 minutes.
```

- **No header and no buttons are needed.** Keep it plain.
- Meta asks for sample values before it will submit the template. Use something
  realistic: `Ahmed Raza`, `0300 1234567`, `Gulberg`, `SC-260821-K4QP`.

**The order is load-bearing.** The code fills the parameters positionally:

| Parameter | Value sent |
|---|---|
| `{{1}}` | name |
| `{{2}}` | phone |
| `{{3}}` | area, or an em dash when the page did not imply one |
| `{{4}}` | ref |

If you write the template with phone before name, nothing errors — you simply
get alerts with the two swapped, and someone rings a name. If you later add a
fifth parameter to the template without changing the code, every send fails,
because Meta rejects a parameter count that does not match.

Approval for a UTILITY template of this kind is usually quick: minutes to a few
hours. Until it is approved, WhatsApp sends fail and Telegram carries the
alerts.

One more limit while you are testing: until the app and business are verified,
Meta restricts sending to a short list of recipient numbers you add in the
WhatsApp section of the dashboard. Add the ops number there, or your test sends
will fail with a permissions error that looks like a token problem.

### 3.6 Who receives the alert

`WHATSAPP_ALERT_TO` is the number that gets told about the lead — the ops phone,
not the customer.

Format: **country code first, no plus sign, no spaces, no dashes.** For the
business number that is:

```
WHATSAPP_ALERT_TO=923288489988
```

`+92 328 8489988`, `03288489988`, and `92-328-8489988` are all wrong and all
fail.

---

## 4. Telegram — the backup alert

Ten minutes, no verification, no cost.

### 4.1 Create the bot

1. In Telegram, search for the contact **@BotFather** and open a chat with it.
2. Send `/newbot`.
3. It asks for a display name (e.g. `Sehat Connect Leads`) and then a username,
   which must be unique and end in `bot` (e.g. `sehatconnect_leads_bot`).
4. BotFather replies with a token that looks like
   `1234567890:AAF3…`. That is `TELEGRAM_BOT_TOKEN`. It is a credential — anyone
   with it can post as your bot. If it leaks, send `/revoke` to BotFather and
   issue a new one.

### 4.2 Use a group, not your personal chat

Point the bot at a **group**, not one person. A lead sitting in one manager's
private chat is invisible when that manager is asleep, driving, or on leave. In
a group, whoever is on shift sees it, and the history is searchable when you are
reconstructing what happened to a lead three weeks later.

1. Create a Telegram group — something like "Sehat Connect — Leads". Add the ops
   team.
2. Add your bot to the group the same way you add any member: search its
   username in the group's add-members screen.
3. The bot must be allowed to post. In a group where you have restricted who can
   send messages, the bot needs that permission explicitly, or simply make it an
   admin. A bot that cannot post fails silently from the site's point of view —
   you just never see leads.

### 4.3 Get the group's chat id

1. Send any message in the group — including the bot's username, e.g.
   `hello @sehatconnect_leads_bot`. Bots have privacy mode on by default and do
   not see ordinary group chatter, so a message that does not mention the bot
   may not show up in the next step. Sending `/start@sehatconnect_leads_bot`
   works too.
2. In a browser, open:

   ```
   https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
   ```

   Replace `<YOUR_TOKEN>` with the whole token, keeping the word `bot` in front
   of it — the URL contains `bot1234567890:AAF3…`, not `bot/1234567890:AAF3…`.
3. In the JSON that comes back, find `"chat":{"id":…}`. **A group id is
   negative** — something like `-1001234567890`. Copy it *with* the minus sign.
   Dropping the minus is the classic mistake here: the value then points at a
   user account that is not yours, and sends fail.

That value is `TELEGRAM_CHAT_ID`.

If `getUpdates` returns an empty `result`, the bot has not seen anything: send
another message that mentions it by username, then reload.

---

## 5. Putting the variables into Vercel

Every variable below is **server-only**. They are read inside the API route,
which runs on Vercel's servers; the browser never sees any of them.

| Variable | From |
|---|---|
| `SHEET_WEBHOOK_URL` | Section 2.4 — the `/exec` deployment URL |
| `SHEET_WEBHOOK_SECRET` | Section 2.2 — must match `SHEET_SECRET` exactly |
| `WHATSAPP_TOKEN` | Section 3.4 — the System User token |
| `WHATSAPP_PHONE_NUMBER_ID` | Section 3.3 |
| `WHATSAPP_ALERT_TO` | Section 3.6, e.g. `923288489988` |
| `WHATSAPP_TEMPLATE_NAME` | `new_lead` |
| `WHATSAPP_TEMPLATE_LANG` | `en`, or `en_US` if that is how the template was created |
| `TELEGRAM_BOT_TOKEN` | Section 4.1 |
| `TELEGRAM_CHAT_ID` | Section 4.3, negative for a group |

Add them in the Vercel project's environment-variables settings (project
`lucaintel`, account `lucaagent000`), scoped to the Production environment. Add
them to Preview as well only if you want test submissions from preview
deployments landing in the same sheet and groups — usually you do not.

### Never add the `NEXT_PUBLIC_` prefix

Not to one of them, not "just to test something".

`NEXT_PUBLIC_` is not a label. It instructs Next.js to bake the value into the
JavaScript that is downloaded by every visitor, where it is readable by anyone
who opens the browser's view-source. A `NEXT_PUBLIC_WHATSAPP_TOKEN` is a
published credential: strangers can send WhatsApp messages as your business
until you revoke it. A published `SHEET_WEBHOOK_SECRET` lets anyone write rows
into the sheet the team is working from. If it ever happens, the fix is not to
remove the prefix — it is to rotate the credential (new token, new secret) and
then remove the prefix.

The one variable in `.env.example` that legitimately carries the prefix is
`NEXT_PUBLIC_GA4_ID`, which is a public measurement ID and not a secret.

### Changes need a redeploy

Environment variables are read at deploy time. Adding or editing one changes
nothing on the live site until you redeploy — either redeploy the current
deployment from the Vercel dashboard, or from a real terminal:

```
npx vercel deploy --prod
```

If a value looks right in the dashboard and the channel still fails, the most
likely explanation is that you have not redeployed since setting it.

---

## 6. Testing it end to end

### 6.1 The direct test

From a terminal, POST a test lead at the live site:

```bash
curl -sS -X POST https://mysehatconnect.com/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test — Waseem",
    "phone": "0300 1112223",
    "area": "DHA",
    "source": "/areas/dha",
    "variant": "hero",
    "elapsedMs": 9000
  }'
```

`elapsedMs` is how long the form was on screen. Anything under 2500 is treated
as a bot and silently discarded, so keep the value above that when testing.

A healthy response:

```json
{"success":true,"ref":"SC-260821-K4QP","delivered":["sheet","whatsapp","telegram"]}
```

**Read the `delivered` array. It is the only place the truth shows up.** It
names exactly the channels that worked. A response of
`{"success":true,"ref":"SC-…","delivered":["telegram"]}` is a *successful*
response — the lead is safe — and it is also telling you that two of your three
channels are broken. Anything naming fewer than three channels means something
needs fixing, even though the family saw a perfectly normal confirmation. Do not
treat `success: true` as the end of the test.

Other responses you may see:

| Response | Meaning |
|---|---|
| `{"success":true,"duplicate":true}` | Same phone number within ~90 seconds. Change the last digits or wait, then retry. |
| `{"success":true}` with no `ref` | The bot checks discarded it. Usually `elapsedMs` below 2500. |
| `{"error":"delivery_failed"}`, HTTP 503 | All three channels failed. Section 7. |
| `{"error":"name_required"}` / `{"error":"phone_required"}` | Your test body is missing a field. |

### 6.2 The real test

Once curl is clean, **submit the form once from a phone, as a customer would**,
and then check all three destinations:

1. The Google Sheet has a new row, with the time in Lahore terms, the phone
   intact including its leading zero, the page in the `page` column, and columns
   G–K empty and waiting for the team.
2. The WhatsApp alert arrived at `WHATSAPP_ALERT_TO`, with name, phone, area and
   ref in the right order — read it, do not glance at it. Swapped parameters
   look fine at a glance.
3. The Telegram group has the message.

Then delete the test row from the sheet, so nobody rings a number that does not
exist.

Do this whole check again after any change to the Apps Script, the template, or
the environment variables.

---

## 7. When something breaks

The Vercel runtime logs for the project are where the detail is. Every failed
channel writes a line beginning `[lead] channel <name> failed` with the reason
from Google, Meta, or Telegram kept intact. Start there.

| Symptom | Likely cause | Fix |
|---|---|---|
| Nothing arrives anywhere; form shows "Please call us directly" | No variables set, or set but never deployed | Check the variables are on the Production environment, then redeploy. Search the logs for `LEAD LOST` — the name and phone are in that line, so call the person back by hand first. |
| Everything worked yesterday, nothing on WhatsApp today | The 24-hour temporary token expired | Replace `WHATSAPP_TOKEN` with a System User token (3.4) and redeploy. If you are not sure which kind is in there, assume it is temporary. |
| WhatsApp silent, Telegram and sheet fine | Expired or wrong token; template not yet approved; template name or language code mismatch; recipient not on the test list while the app is unverified | Read the logged Meta error — it names which. Check `WHATSAPP_TEMPLATE_NAME` is `new_lead` and `WHATSAPP_TEMPLATE_LANG` matches the template's language code exactly. |
| WhatsApp alerts arrive but the fields are jumbled | Template parameter order does not match `{{1}}` name, `{{2}}` phone, `{{3}}` area, `{{4}}` ref | Edit the template body to the order in 3.5. The code is correct; the template is wrong. |
| Sheet not appending, alerts fine | Secret mismatch, or the script was redeployed to a new URL | Compare `SHEET_WEBHOOK_SECRET` against the `SHEET_SECRET` script property character by character, watching for a trailing space. Then confirm `SHEET_WEBHOOK_URL` is the current `/exec` URL, and redeploy the site after any change. |
| Sheet rows land in the wrong columns | A column was inserted or moved inside A–F | Restore the header order in 2.1. The script writes by position. |
| Phone numbers lost their leading zero | Rows written before the apostrophe fix, or the cell was retyped | Format the column as plain text; new rows from the current script are fine. |
| Telegram silent, others fine | Wrong chat id (missing minus sign), bot removed from the group, or bot not permitted to post | Re-run `getUpdates` (4.3) and copy the id with its minus sign; confirm the bot is still a member and can send messages. |
| Everything reports delivered but the sheet row is missing | You are looking at the wrong tab | The script falls back to the first tab if `Leads` is missing. Check the tab names. |
| A 302 in the logs for the sheet call | Normal | Apps Script redirects on success and the site follows it. Not an error. |

---

## 8. What it costs

At this volume — a handful of leads a day — **all three channels are free.**
That is not a promotion, it is where the free limits sit.

- **Google Apps Script**: free with a Google account. There are daily quotas on
  script executions and runtime, and they are far above anything a lead form for
  one business will reach. You would notice them if you started using the same
  script for bulk work; you will not notice them here.
- **Telegram Bot API**: free, with no billing relationship at all. There are
  rate limits on how fast a bot may post, which matter to broadcast bots and are
  irrelevant at a few messages a day.
- **WhatsApp Cloud API**: this is the only one with a price list. Meta bills
  business-initiated messages, of which the lead alert is one, and it has
  revised that pricing more than once — including a shift in how utility
  messages are charged. There is also a free allowance. Rather than print a
  rate here that may already be stale, check the current rates and your usage in
  the billing area of your Meta Business account. What is safe to say: we send
  one short utility message to one number per lead, so at this volume the cost
  is somewhere between nothing and negligible. Set a payment method on the
  account anyway, so alerts do not stop over an unpaid balance you did not know
  existed.

If the WhatsApp channel ever does become a cost worth arguing about, it means
lead volume grew enough that the argument is a good problem to have — and
Telegram and the sheet would still carry every lead without it.
