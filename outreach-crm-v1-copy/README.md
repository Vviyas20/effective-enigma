# Outreach CRM V1 (copy)

A copy of the Outreach CRM repository (version 1), https://github.com/Vviyas20/Outreach-CRM, kept here for reference. Make changes there first.

Code for the outreach CRM: the live app, its sandbox, and the design work for its new look.

| Folder | What it is |
| --- | --- |
| `crm/` | The live Outreach CRM (single `index.html`). It runs as a claude.ai artifact: records live in the artifact's database and contacts load from `data/sheet.json`. |
| `sandbox/` | The Outreach CRM sandbox in the Ospra look: the same app with an in-memory store, invented people and companies, a movable clock and view-only mode. Open `index.html` directly in a browser. |
| `sandbox/previous-look/` | The sandbox before the Ospra restyle (identical logic, original coral and ink styling). |
| `design-styles/` | Four Ospra-based UI/UX directions for the CRM (focus queue, pipeline board, line monitor, account passport). Standalone HTML, see its README. |
| `design-options/` | The four "new look options" boards from the Design canvas (Midnight Pulse, Crisp SaaS, Ink and Coral, Command Center) and the shared `CRMScreen` component they theme. These `.dc.html` files render inside the claude.ai Design tool, which supplies `support.js`. |

## Data is not in this repo

`crm/data/sheet.json` (the BI-sheet export of real contacts with emails and phone numbers) is excluded on purpose and listed in `.gitignore`. Keep it in the artifact, not in git. The sandbox needs no data file.
