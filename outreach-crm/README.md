# Outreach CRM

Source of the live Outreach CRM: a single-page sales cockpit for account-based
outbound (email, LinkedIn, calls), with a daily plan, call list, deals board,
meetings log and configurable outreach rules.

The app is one self-contained file, `index.html` (HTML, CSS and vanilla JS, no
build step, no framework). It is published as a claude.ai Artifact and reads
and writes its records through the Artifact runtime database.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole app. Copied byte for byte from the live artifact. |
| `data/sheet.sample.json` | Synthetic sample of the spreadsheet import, same schema as production. Fictional people and companies only. |
| `data/sheet.json` | Production import of the contact spreadsheet. **Not in git** (prospect PII). Ignored in the repo `.gitignore`. |

## Architecture

Data comes from two sources and is merged per contact at render time:

1. **Spreadsheet import** (`data/sheet.json`, fetched once on load). Read-only
   baseline built from the outreach workbook: `contacts[]`, `meetings[]`
   (the Meetings Conducted Log) and a `domains` map of email domain to account.
2. **Runtime database** (`claude.use('db')`, live via `onSnapshot`). Everything
   you change in the UI. Collections:
   - `contacts/{id}`: per-contact overrides and activity (stage, calls, touches,
     snoozes, DNC, deal stage and value, notes).
   - `daily/{YYYY-MM-DD}`: the touch log for a day (`items[]` of calls, emails,
     LinkedIn touches).
   - `meetings/{key}`: meetings marked in the CRM or picked up from sent mail.
   - `plan/{YYYY-MM-DD}`: the frozen Today plan for a day.
   - `accounts/{slug}`: account-level fields.
   - `meta/run` (sync status) and `meta/config` (rule settings, see `RDEF`).

`merge()` / `merge0()` combine the two: database values win, except that
"hard" stages from the database are never downgraded by the sheet and email
counts take the max of both sides. `contacts()` caches the merged list in
`S.merged`; any snapshot sets it back to `null`.

Write access comes from `claude.use('user')` → `can('data.write')`. Viewers
without it get a read-only UI (`body.ro`). The stored database rule is read for
anyone who can view, write for admins only.

## Code map (`index.html`)

| Lines (approx.) | Section |
| --- | --- |
| 1–150 | Styles and the sidebar shell |
| 150–285 | State `S`, constants (stages, holidays, time zones, `RDEF` rule defaults, `RINFO` rule copy), merge logic, `plan()` next-call scheduler, `score()`, `blockReason()` |
| 285–385 | Dashboard and account pages, SVG charts |
| 385–535 | Meetings, deals board (drag and drop), warm connects |
| 535–613 | Today page: the daily plan under caps and rules |
| 613–686 | Calls, contacts table, daily log, accounts, contact drawer |
| 686–791 | Writes (`upd`, `addItem`) and event handlers |
| 791–end | Data bootstrap and database subscriptions |

## Business rules worth reviewing

Days are IST and run until 4 AM (`SHIFT`), so a late US calling shift counts as
the same day. Business-day arithmetic (`isBD`, `addBD`) skips weekends and the
US and Indian holiday tables, each toggleable. A LinkedIn touch counts against
email caps. Do-not-contact is detected from an explicit flag, the stage, or a
regex over the sheet status (`DNCRX`), and blocks every channel. The full rule
list with user-facing copy lives in `RINFO`.

## Running it

The page depends on the claude.ai Artifact runtime (`claude.use`). Opened
outside it, the app shows "Sign in to claude.ai to see this CRM". For review,
read the code here and use the live artifact to see behaviour. To exercise the
import path, copy the sample into place:

```bash
cp data/sheet.sample.json data/sheet.json
```

## Known review items

- `USHOL` declares `'2027-12-24'` twice (harmless, last one wins).
- One 800-line inline script; worth splitting into modules if this grows.
