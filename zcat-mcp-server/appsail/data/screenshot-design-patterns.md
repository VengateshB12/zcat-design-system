# Screenshot Design Patterns

Production Catalyst UI patterns extracted from `Screenshots referance/` folder. When making design decisions in Phase 2, the agent MUST read the relevant screenshot(s) for the page type being built and follow the exact patterns shown.

**How to use:** During Phase 2 (Design Decisions), look up the page type you're building in this file. Read the listed screenshot file(s). Follow the exact layout, spacing, and component patterns shown — these are the production standard.

---

## Page Type → Screenshot Map

| Page Type | Read These Screenshots | Key Pattern to Extract |
|-----------|----------------------|----------------------|
| **List page (stretch table)** | `06-list-view-stretch-table-deployments.png` | Action bar layout, table style, column types |
| **Detail page (overview with stats)** | `07-detail-view-function-overview-stats.png`, `24-detail-view-sections-kv-url-stats-table.png` | Stat card style, two-column sections, KV pairs |
| **Detail page (KV pairs focus)** | `08-detail-view-general-details-kv-pairs.png` | General Details component usage |
| **Master-detail (sidebar + table)** | `14-container-sidebar-stretch-table-tabs.png` | Sidebar list, detail tabs, table in detail panel |
| **Settings page** | `18-settings-popup-general-kv.png`, `04-settings-popup-billing-overview.png` | Settings sections, toggle rows |
| **Dashboard / analytics** | `02-dashboard-analytics-chart-stats.png`, `03-dashboard-analytics-instances.png` | Chart cards, stat cards on sunken bg |
| **Card grid page** | `22-no-sidebar-card-grid-slate-landing.png`, `23-card-grid-event-listeners-sidebar.png` | Card grid layout, badge placement |
| **Accordion config** | `10-accordion-config-env-vars-table.png`, `11-accordion-config-function-triggers-cards.png` | Accordion with table/cards inside |
| **Code editor** | `13-code-view-file-tree-editor.png`, `12-code-view-boxy-table-indexed-columns.png` | File tree sidebar, code block |
| **Empty state** | `15-empty-state-illustration-cta.png` | Empty State component, no action bar |
| **Popup / dialog** | `16-full-page-popup-pipelines.png`, `20-settings-popup-overlay-permissions-dialog.png` | Popup structure, footer buttons |
| **Landing / no sidebar** | `01-landing-page-no-sidebar.png`, `21-no-sidebar-accordions-list.png` | No Left Menu layout |

---

## Extracted Design Patterns (from production screenshots)

### Pattern A: Stat Cards (from #07, #24)

**Source:** Screenshot 07 — Function Overview

Real production stat cards have:
- **Colored circle icon BG** — NOT square, NOT flat. Each card has a different-colored circle (orange, red/pink, blue, purple) with a stroke icon inside
- **Large value** — bold, prominent (the number is the hero)
- **Label below value** — smaller, secondary text ("Total Invocations", "Invocation Errors")
- **Info tooltip icon** — small (i) icon at the top-right corner of each card
- **Cards in a bordered row** — all 4 cards sit inside ONE bordered container with subtle dividers between them, NOT separate Card BG per stat
- **Equal width** — all cards stretch equally across the row

**Source:** Screenshot 24 — Event Listener Detail

Alternate stat style (inline, no cards):
- Stats as colored numbers inline: "0" in green (Processed), "0" in red (Failed), "0" in amber (Queued)
- Label below each number
- Used when stats are INSIDE a section (e.g., "Today's stats" inside Produce URL card), not as a standalone row

**Decision rule:** Use the card row pattern (#07) when stats are the hero content at the top of a detail page. Use the inline colored-number pattern (#24) when stats are supplementary data inside another section.

### Pattern B: Detail Page Two-Column Layout (from #07, #24)

**Source:** Screenshot 07 — Function Overview

Two-column layout below stat cards:
- **Left column (~55-60%):** "Function Details" section — bordered card with General Details component (KV pairs: Name, Stack, Created Time, ID, Type, Created By)
- **Right column (~40-45%):** "Invocation URL" section — bordered card with URL label + URL text in sunken input-like box + copy icon button

**Source:** Screenshot 24 — Event Listener Detail

Two-column layout:
- **Left column:** "General Details" bordered section (Event Listener ID, Description, Created on, Created by with avatar)
- **Right column:** "Produce URL" section with URL + copy, then "Today's stats" inline below

**Decision rule:** Detail pages ALWAYS use two-column layout for info sections. Left column = metadata/details (General Details component). Right column = URL/endpoint/supplementary info. NEVER stack everything vertically.

### Pattern C: Action Bar — List Page (from #06)

**Source:** Screenshot 06 — Deployments List

Production action bar:
- **Search on LEFT** — Search component with contextual placeholder ("Search Deployment ID")
- **Primary button on RIGHT** — "Create Deployment" (Fill button)
- **NO filters visible** — only Search + Create. Filters only appear when the page has filterable categories
- **Clean, minimal** — not cluttered with unnecessary controls

**Decision rule:** If the wireframe shows a list page, the action bar is: Search (left) + Create button (right). Add filter dropdowns ONLY if the data has genuine filterable categories (Runtime, Status, Region, etc.). Do NOT add filters just to fill space.

### Pattern D: Table — Status Column (from #06, #24)

**Source:** Screenshot 06 — Deployments

Status column uses **ExecutionStatus** type (green dot + "Success" text), NOT Badge component. This is the standard for operational status (Success/Failed/In Progress/Pending).

**Source:** Screenshot 24 — Event Listener Rules

Status column uses **ExecutionStatus** type (green dot + "Enabled" text).

**Decision rule:** For status columns showing operational state (Running, Stopped, Success, Failed, Enabled, Disabled), use ExecutionStatus column type (dot + text). Use Badge column type only for categorical labels (like Priority: High/Medium/Low, or Environment: Dev/Staging/Prod).

### Pattern E: Master-Detail / Sidebar Layout (from #14)

**Source:** Screenshot 14 — Data Store Tables

Production master-detail:
- **Left panel** has its own heading ("Tables List") + primary button ("+ New Table") in a mini action bar at top
- **Search** below the heading, full width of left panel
- **Table list** — icon + table name per row, selected item highlighted with blue/brand background
- **Divider** — visible vertical line between panels
- **Right panel** — tabs at top (Schema View, Scopes & Permissions, Data View), then table name + ID as heading, then action bar (Search + "+ New Column"), then stretch table below

**Key detail:** The left panel's mini action bar has heading text on the LEFT and primary button on the RIGHT — same balance rule as the main Container action bar.

### Pattern F: Sub Header — Detail Pages (from #06, #07, #24)

**Source:** Screenshot 07 — Function Overview
- Back nav: "< Aaaa" (back arrow + item name)
- Tabs: Overview | Code | Configuration (primary tabs, centered or left-aligned)
- Right side: Help + View Logs (outline button with icon) + three-dot overflow

**Source:** Screenshot 06 — Deployments
- Back nav: "< zcat-mcp" + "Live" badge next to the name
- Tabs: Overview | Instances | Deployments | Configuration
- Right side: View Logs + Help + three-dot

**Source:** Screenshot 24 — Event Listener Detail
- Back nav: "< CUSTOMEVENT"
- NO tabs (single-view detail page)
- Right side: Help + Queued Events (outline button) + Create Rule (primary button) + three-dot

**Decision rule:**
- Detail pages with multiple views → tabs in Sub Header
- Detail pages with single view → NO tabs, buttons go in Sub Header action row (right side)
- Back nav text = "< [item name]"
- Help is ALWAYS present
- Three-dot overflow is ALWAYS present for extra actions
- Common action buttons (View Logs, Queued Events) go as outline/ghost buttons in Sub Header

### Pattern G: Section Headings Inside Container (from #24)

**Source:** Screenshot 24 — Event Listener Detail

Sections inside Container use plain heading text ("General Details", "In Progress", "Rules"), NOT Container Header component. Container Header is for the ACTION BAR (search + filters + buttons), not for section labels inside a multi-section detail page.

Each section heading has:
- **Heading text on LEFT** — bold, 16px SemiBold
- **Action or link on RIGHT** — "Refresh" link for In Progress, "Search Rule" for Rules
- **Content below** — table, empty state, or info cards

**Decision rule:** In multi-section detail pages, use manual heading text + right-aligned action (link or outline button) for section labels. Use Container Header only for the main action bar on list/stretch pages.

### Pattern H: Inline Empty State (from #24)

**Source:** Screenshot 24 — "In Progress" section

When a section within a page has no data (but the page itself is NOT empty):
- Small illustration centered in the section
- Simple text: "No Event in progress"
- NO buttons, NO CTA — the page-level CTA handles creation
- Section still has its heading ("In Progress") with a "Refresh" action

**Decision rule:** Use the full Empty State component only for WHOLE-PAGE empty states. For individual sections with no data, use a simple centered illustration + text with no CTA.

### Pattern I: URL/Endpoint Display (from #07, #24)

**Source:** Screenshot 07 — Invocation URL, Screenshot 24 — Produce URL

URL display pattern:
- **Label** — "URL" or "Produce URL" as section heading
- **URL text** — in a sunken input-like frame (looks like a read-only text field)
- **Copy button** — icon button (clipboard icon) at the right edge of the URL field
- **Full width** — URL field stretches to fill the section

**Decision rule:** For any endpoint, connection string, or copyable URL, use this pattern: label + sunken read-only field + copy icon button. NEVER show URLs as plain text. This pattern is reusable for: API endpoints, connection strings, webhook URLs, invocation URLs, etc.

---

## How to Use This File in Phase 2

During design decisions:

1. **Identify the page type** from the wireframe
2. **Look up the page type** in the table above
3. **Read the listed screenshots** — actually open and view them
4. **Extract the layout decisions:**
   - What does the stat card row look like? → Follow Pattern A
   - How is the info section laid out? → Follow Pattern B (two-column)
   - What's in the action bar? → Follow Pattern C (minimal, not cluttered)
   - What column types does the table use? → Follow Pattern D
   - How does the master-detail work? → Follow Pattern E
5. **Write the design brief** referencing specific patterns: "Will use Pattern A stat cards (colored circle icons, single bordered row) and Pattern B two-column layout (General Details left, URL section right)"

**NEVER improvise a design when a production screenshot shows the exact pattern.** The screenshots are the source of truth for "how Catalyst actually looks."
