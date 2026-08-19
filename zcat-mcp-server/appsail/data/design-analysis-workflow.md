# Design Analysis Workflow

Pre-build analysis phase that MUST complete before any Figma build starts. This ensures creative, consistent, and complete designs by forcing upfront decisions instead of improvising during the build.

**When to use:** Every time the user provides wireframes, screenshots, PRDs, or any multi-screen design task. Skip ONLY for single-component tweaks or quick fixes to existing screens.

## ABSOLUTE RULE: Spec Files BEFORE Building — ZERO Exceptions

**You MUST write ALL page spec MD files BEFORE calling use_figma even once.** This is not optional. This is not "nice to have." Skipping specs is the root cause of every major build failure: wrong column types, wrong component choices, editable forms instead of read-only displays, missing features, inconsistent designs across screens.

**If you catch yourself about to call use_figma without having written spec files → STOP. Go back to Phase 2. Write the specs. THEN build.**

The spec file forces you to think through every decision BEFORE committing tokens to Figma. A bad spec wastes minutes to fix. A bad build wastes the entire token budget.

---

## Design Reference Sources (MUST consult before designing)

Two reference sources exist. The agent MUST look at relevant references BEFORE making any design decisions:

### Source 1: "Me-" Reference Screens in Figma

The design system file (`ugOZk4O0g6XpviEBSN24mF`) has a **"Referance Templates"** page (**node `13302:290`**) containing manually-built production-quality reference screens prefixed with "Me-". These are the GOLD STANDARD — built by the designer, not by an agent.

> ### ⚠️ `get_metadata` CANNOT FIND THIS PAGE — use the node IDs below
>
> Verified 2026-08-19, reproducible: calling `get_metadata` on this file with no
> `nodeId` returns only **2 of its 32 pages** (`COVER` and `✅ Icons`).
> "Referance Templates" is **not** in that list, so an agent that discovers pages
> that way concludes the gold standard does not exist — and silently builds
> without it. That has already happened and shipped defects.
>
> **Never discover pages with `get_metadata`.** Either use the node IDs in the
> table below directly, or enumerate with `use_figma`:
> ```js
> return figma.root.children.map(p => ({ id: p.id, name: p.name }));   // returns all 32
> ```
>
> **If a reference screen still cannot be opened: STOP and tell the user.**
> Do NOT build without it and mention it afterwards. A missing gold standard is a
> blocking condition, not a footnote.

**Available "Me-" reference screens** — node IDs verified live 2026-08-19,
`get_screenshot` them directly, no discovery needed:

| Screen | Node ID | Page Type | What to Learn From It |
|--------|---------|-----------|----------------------|
| Me- Functions - List View | `13302:5544` | List page | Action bar layout, stretch table, column types, sidebar grouping |
| Me- Functions - List View (alt) | `13408:7063` | List page | Second variant of the same pattern |
| Me- Databases - List View | `13302:3465` | List page | Same pattern, different data — confirms list page consistency |
| Me- Applications - Cards View | `13302:5977` | Card grid page | Card layout, badge placement, grid spacing |
| ~~Me -Monitoring - orders-prod~~ | `13302:12743` | Detail/dashboard | **SUPERSEDED — do not match this one.** Audited 2026-08-19: its stat values are 24px `Semibold` with **unbound text styles** (`textStyleId` empty), which violates the zero-unbound-text rule and is off the type scale. Use `Correct- orders-prod Overview` instead |
| Correct- orders-prod Overview | `13324:5503` | Detail/dashboard | Corrected overview pattern — prefer this for dashboards |
| ME- Databases - Empty State | `13302:10638` | Empty state | Empty State component usage, simple Sub Header |
| Me-Create Function Modal | `13302:11531` | Popup/form | Popup structure, form fields, footer buttons |
| Me - Create Database Wizard | `13302:12626` | Wizard popup | Multi-step wizard, Stepper, selection cards, footer layout |
| Three dot menu | `13308:15589` | Overflow menu | Dropdown Menu structure, icon placement |
| Me- Drawer Sample | `13420:10799` | Side drawer / AI assistant | Drawer shell proportions and placement. **Rough sample, not pixel-accurate — take the structure, not the spacing.** NOTE: it includes `Popup Blur`, i.e. a MODAL drawer. The hand-built recipe in `zcat.md` assumes a non-modal drawer with no blur. Match this reference (blur present) unless told otherwise |

**How to use:** Before writing ANY page spec, `get_screenshot` the relevant "Me-" reference screen by its node ID above. Use it as the primary pattern and design-language reference. For a **dashboard or multi-section screen**, use `Correct- orders-prod Overview` (`13324:5503`) — it is the corrected version.

### Source 2: Production Screenshots (Local Folder)

`Screenshots referance/` folder has 24 production Catalyst screenshots. See `references/screenshot-design-patterns.md` for the full catalog with extracted patterns.

### Priority Order

1. **"Me-" screens FIRST** — if a matching "Me-" reference exists, use it as the primary design-language and pattern reference. Preserve its established component usage, hierarchy principles, and visual language, but adapt composition when the current content or user task requires a better arrangement. If the user explicitly says "match this exactly," exact matching wins (user requirement is priority 1)
2. **Production screenshots SECOND** — for page types without a "Me-" reference
3. **decision-rules.md THIRD** — for patterns not covered by either visual reference

---

## How Wireframes Should Be Interpreted

**Wireframes are FUNCTIONAL REFERENCES, not design blueprints. NEVER mirror a wireframe.**

The final Figma screen should look NOTHING like the wireframe visually. Same features, completely different presentation. If someone can look at the wireframe and the final design side by side and say "that's the same layout" — the agent failed. The agent is a DESIGNER, not a wireframe-to-Figma converter.

**Creative design means:** rethink layout, add visual hierarchy, group related info into cards, use proper spacing rhythm, add icon backgrounds to stat values, move tabs to proper positions, balance action bars, use multi-column layouts for detail pages. The wireframe tells you WHAT to show — YOU decide HOW it looks by studying the "Me-" reference screens and production screenshots.

The agent must think from FOUR perspectives when reading a wireframe:

### 1. Product Designer Perspective
- Wireframe tabs placed randomly in content? → Move primary tabs to Sub Header
- Flat text lists? → Use proper components with badges, icons, spacing
- Everything stacked vertically? → Use multi-column layout where appropriate
- No visual hierarchy? → Apply typography scale (24px values, 16px headings, 12px labels)
- Wireframe is a pencil sketch? → Extract the FEATURES, design the VISUALS from scratch using reference screens

### 2. Product Manager Perspective
- Does every button lead somewhere? If "View All" has no destination page, remove it
- Does every action make sense? "Copy" needs something to copy (URL, connection string)
- Is there duplicate info? Storage shown as stat AND section → merge into one
- Are the tabs in the right order? Most important/frequently used tab first
- Does the page flow logically? Stats at top (summary), then details, then related data

### 3. User Perspective
- Can the user find the primary action quickly? (Create button prominent, not buried)
- Is the most important information visible first? (Stats, status, key details at top)
- Are related things grouped together? (Connection info in one card, not scattered)
- Is the page scannable? (Clear headings, consistent spacing, visual hierarchy)
- Are labels clear? (Not technical jargon — "Instance Class" is fine, "db.r6g.xlarge computation tier" is not)

### 4. Developer Perspective
- Are the data types correct? (Status = Badge/ExecutionStatus, not plain text)
- Do table columns match the data model? (Column Name, Data Type, Nullable — not random wireframe labels)
- Are IDs and technical values in appropriate formats? (Monospace for IDs, regular for names)
- Are actions implementable? (Don't design buttons for features that don't exist)

### What to EXTRACT from wireframes:
- Every feature, tab, menu item, button, field, column, section
- The data model (what fields exist, what types they are)
- The user flow (what leads where)
- The functional requirements (what the page needs to DO)

### What to IGNORE from wireframes:
- Exact layout/positioning (redesign with proper patterns)
- Visual styling (apply zcat design system)
- Icon choices (wireframe icons are placeholders)
- Column icons/avatars (match column type to DATA, not wireframe icons)

### CRITICAL: Read-Only Display vs Editable Form

**The #1 wireframe misinterpretation:** agent sees a section with labels + values and builds it as an EDITABLE FORM (Text Box + Dropdown + ± buttons) instead of a READ-ONLY DISPLAY (General Details / Key Value Pair + Copy buttons).

**How to tell the difference:**
- Wireframe shows ACTUAL DATA VALUES (HOST: orders-prod.zcatalyst.com) → **READ-ONLY display** → use General Details or Key Value Pair component with optional Copy Icon Button
- Wireframe shows EMPTY INPUT FIELDS with placeholders ("Enter host...") → **EDITABLE form** → use Text Box, Dropdown components
- Wireframe shows values + "Copy" button → READ-ONLY with copy action, NOT a form
- Wireframe shows values + "Edit" link → READ-ONLY, click-to-edit pattern, NOT a pre-filled form

**Connection sections, metadata panels, config summaries, and detail sections are almost ALWAYS read-only displays.** Only form creation flows (Create, Add New, Edit modal) use editable inputs.

### CRITICAL: Activity Feeds Need Status Dots

When a wireframe shows a list of events/activities with timestamps, EACH item MUST have a colored status dot:
- Green: success/completion (backup completed, deployed)
- Blue: info/change (promoted, modified, created)
- Amber: warning/degradation
- Grey: historical/neutral
- Red: error/failure

An activity feed without colored dots is just a plain text list — it looks unfinished and loses the event-type signal. Build dots as 8×8 circles with semantic color fills.
- Typography (apply zcat text styles)
- Spacing (apply zcat spacing scale)
- Tab/section placement (apply Catalyst layout rules — primary tabs in Sub Header, etc.)

### What to IMPROVE over wireframes:
- Flat content → wrapped in Card BG or bordered frames
- Plain text stat values → stat cards with icon BGs
- Everything vertical → multi-column where appropriate
- Missing search/filters → add if the page has filterable data
- Missing empty states → design them for first-time-use
- Random icon placement → proper zcat stroke icons via clone+swap
- Unclear hierarchy → apply typography scale with proper heading/body/label distinction

---

## Per-Task Storage

All analysis output and page spec files are stored in the **scratchpad directory**:

```
[scratchpad]/design-specs/
  ├── 00-feature-inventory.md      — Phase 1 output (every element on every page)
  ├── 00-page-relationships.md     — Phase 1 output (navigation map)
  ├── 00-design-uniforms.md        — Phase 2 output (locked-in patterns for all pages)
  ├── page-database-list.md        — Build spec for Database List page
  ├── page-database-detail.md      — Build spec for Database Detail page
  ├── page-schema-master-detail.md — Build spec for Schema page
  ├── page-settings.md             — Build spec for Settings page
  ├── popup-create-database.md     — Build spec for Create Database wizard
  └── popup-create-function.md     — Build spec for Create Function modal
```

These files are written ALL AT ONCE during Phase 2 and referenced individually during Phase 3.

---

## Phase 1: Full Scan (before touching Figma)

### Step 1.1 — Capture Every Page

For each wireframe/screenshot/page the user provides:

1. **Take a screenshot** (or read the image) of every page
2. **Name each page** descriptively — e.g., "Database List", "Database Detail - Overview", "Create Database Wizard - Step 1"
3. **Identify the page type** from this list:
   - **List page** — table/cards showing a collection of items
   - **Detail page** — single item with tabs, stats, info sections
   - **Settings page** — configuration with toggles, dropdowns, form sections
   - **Master-detail page** — sidebar list + detail panel (schema, endpoints, etc.)
   - **Form/wizard page** — popup or full-page multi-step form
   - **Empty state page** — first-time or no-data state
   - **Dashboard page** — metrics, charts, activity feeds

### Step 1.2 — Feature Inventory (the "nothing gets dropped" checklist)

For EACH page, create a complete inventory. List EVERY element you see:

```
PAGE: [Page Name] — [Page Type]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUB HEADER:
  - Title: [text]
  - Tabs: [tab1, tab2, tab3, ...]
  - Buttons: [button1, button2, ...]
  - Back navigation: [yes/no, text]

SIDEBAR (if applicable):
  - Menu items: [item1, item2, item3, ...]
  - Groups: [group1: items, group2: items, ...]

CONTAINER CONTENT:
  Action bar:
    - Search: [yes/no]
    - Filters: [filter1, filter2, ...]
    - Buttons: [button1 (type), button2 (type), ...]

  Stat cards: [stat1: value, stat2: value, ...]

  Sections:
    - Section 1: [name]
      Fields/items: [field1, field2, ...]
    - Section 2: [name]
      Fields/items: [field1, field2, ...]

  Table (if any):
    - Columns: [col1, col2, col3, ...]
    - Row count shown: [N]
    - Pagination: [yes/no]

  Other elements: [anything else visible]

INTERACTIONS/LINKS:
  - [Button/link name] → leads to [destination page or action]
  - [Tab name] → shows [what content]
  - [Table row click] → navigates to [where]
```

**CRITICAL: Every single functional element in this inventory MUST appear in the final design. This is the contract. Functional fidelity = 100% (every feature present). Spatial fidelity is flexible — layout, grouping, hierarchy, and emphasis are creative decisions that should be improved when a better composition serves the user goal. Design creativity includes composition, grouping, visual hierarchy, information density, and emphasis — not just visual styling.**

### Step 1.3 — Map Page Relationships

Draw out every navigation path:

```
PAGE RELATIONSHIP MAP:
━━━━━━━━━━━━━━━━━━━━
[Page 1: Database List]
  ├── "Create Database" button → [Page X: Create Database Wizard]
  ├── Table row click → [Page 2: Database Detail]
  └── Sidebar "Settings" → [Page 3: Settings]

[Page 2: Database Detail]
  ├── "Overview" tab → shows stat cards + info sections
  ├── "Settings" tab → [Page 3: Settings content]
  └── Back button → [Page 1: Database List]
```

**If any link/button leads to a page that does NOT have a wireframe:**
- Note it: "MISSING WIREFRAME: [page name]"
- Ask the user: "Should I design that page too?"
- If yes, the agent designs it from scratch using reference screens + PM/designer thinking

### Step 1.4 — Identify Common Patterns Across Pages

Look across ALL pages and identify what repeats. These become the design uniforms.

### Step 1.5 — Duplicate/Redundancy Check

Scan every page for information that appears MORE than once:
- Same data in a stat card AND in a section below
- Same action available in multiple places
- Same metadata shown in different formats

For each duplicate: propose MERGE or REMOVE and note the reasoning.

**MERGE may be applied directly. REMOVE requires user approval BEFORE building.** Deleting a required feature is never a unilateral decision, even when the redundancy looks obvious — surface it as a recommendation and wait. Composition freedom covers HOW required information is presented, never WHETHER required functionality exists. Reposition, resize, de-emphasise, or move to a secondary region freely; deleting needs a yes.

### Step 1.6 — Composition Direction + Design Improvements

Before mapping to components, decide the **composition strategy** for each page. This is where design creativity lives — not in the spec template later.

**Answer these composition questions for each page:**

```
COMPOSITION DIRECTION:
━━━━━━━━━━━━━━━━━━━━━
Page: [Page Name]

1. PRIMARY GOAL: What is the user trying to DO on this page?
   → [e.g., "Find and manage databases", "Configure a specific connection"]

2. FOCAL POINT: What should the user's eye land on FIRST?
   → [e.g., "The status of each database", "The connection string"]

3. INFORMATION HIERARCHY: Rank content by importance (1 = most):
   → 1. [most important content]
   → 2. [second most important]
   → 3. [supporting context]
   → 4. [metadata / less-used]

4. DENSITY: How much information does this page carry?
   → [Sparse (few data points, lots of space) / Dense (many fields, compact)]

5. GROUPING STRATEGY: How should content be organized?
   → [Cards per section? Single card with internal dividers? Multi-column?
      Not every section needs a card — use cards when content needs visual
      separation from surroundings, not as a default wrapper for everything]

6. SECTION RHYTHM: How do sections flow vertically?
   → [Stat overview → detail sections → table? Or table-first? Why?]

7. VIEWPORT ALLOCATION: How is the available height intentionally used?
   → Above-the-fold priority: [what must be visible without scrolling]
   → Approximate section shares: [e.g. summary 15%, table 65%, footer 20%]
   → Where whitespace does real work: [separating what from what]
   → Where more structure is genuinely warranted: [or "none"]
   A screen whose content ends at 50-60% of the viewport with accidental
   empty space below is an unfinished composition. Fix it with section
   proportions, larger primary surfaces, or more rows — NEVER by
   inventing filler content.

8. CREATE/EDIT INTERACTION (if this is a create or edit flow):
   → Catalyst uses a popup/modal for Create and Edit. Preserve that
     interaction model and optimise the composition inside it. A wireframe
     drawn as a page does NOT override the pattern — wireframes define
     fields, not interaction model.
   → Normal Popup by default. Escalate to large/full-page popup only for
     >~8 fields, a Stepper wizard, side-by-side content, or embedded
     tables/code editors. For a merely tall form use type=With Scroll.
   → If an authoritative Catalyst reference shows this flow as a full
     page, follow that reference.
```

**Then note wireframe improvements:**

```
PAGE IMPROVEMENTS:
━━━━━━━━━━━━━━━━━
Page 1: Database List
  - Wireframe places tabs in content body → IMPROVE: move to Sub Header
  - Wireframe has no search → IMPROVE: add Search in action bar
  - Wireframe shows flat text buttons → IMPROVE: use Button components

Page 2: Database Detail
  - Wireframe stacks everything vertically → IMPROVE: two-column layout
  - Wireframe has flat text stat values → IMPROVE: stat cards with icon BGs
  - Wireframe shows storage twice (stat + section) → REMOVE duplicate
  - Wireframe has "Copy" button with nothing to copy → REMOVE
  - Wireframe puts primary tabs in Container → IMPROVE: move to Sub Header
```

---

## Phase 2: Design Decisions + Write ALL Page Specs

**This is the most important phase. ALL page spec files are written HERE, TOGETHER, while the agent has full context of all rules and all design decisions.**

### Step 2.1 — Study Reference Screens

1. `get_screenshot` of every relevant "Me-" reference from the Referance Templates page
2. Read matching production screenshots from `Screenshots referance/`
3. Read `references/screenshot-design-patterns.md` for extracted patterns
4. Note the exact patterns you'll follow for each page type

### Step 2.2 — Lock Design Uniforms

Write `00-design-uniforms.md` to scratchpad. This contains the locked-in patterns for ALL pages:

```markdown
# Design Uniforms — [Product Name]

## Stat Cards
Pattern source: [Me- reference screen name] + Screenshot #[N]
- Container: [describe — single bordered row with dividers? separate Card BGs?]
- Icon BG: [shape, size, radius, fill variable]
- Value text: [text style, color variable]
- Label text: [text style, color variable]
- Icon: [clone source, swap approach]

## Section Cards
- Component: Card BG (key: f94642..., set)
- Padding: [value]px all sides
- Heading: [text style, color variable]
- Heading-to-content gap: [value]px

## Action Bars (List Pages)
Pattern source: [Me- reference]
- Component: Container Header (key: c1e72c..., set)
- Left: Search + [N] filter dropdowns
- Right: Primary button
- All controls size: [Default/Small]

## Action Bars (Detail Page Sections)
- Left: Section heading text ([text style])
- Right: Action button or link
- NOT Container Header — use manual heading + button

## Tables
- List page: Table AI, Style=Stretch, Show Pagination=false (use separate Pagination)
- Detail section: Table AI, Style=Boxy
- Column types MUST match DATA type (see rules-table-columns.md):
  - AvatarName: ONLY for person data (user name, owner, assignee, email)
  - Badge: ONLY for status/category columns — each status value gets its own color
  - Text: names, IDs, amounts, descriptions, regions, counts
  - Date: timestamps, dates
  - ExecutionStatus: running/stopped operational state (dot + text)
  - IconText: entity name with icon (database, function, service)
  - Threedot: row actions
- NEVER use AvatarName for non-person data (IDs, amounts, dates, company names)
- NEVER use Badge for non-status data (customer names, IDs, amounts, dates)
- Badge colors: Green=success/paid, Red=error/failed, Amber=pending/warning, Blue=processing/draft, Grey=inactive

## Sub Header
- Detail pages: back nav "< [item name]" + tabs + Help + three-dot
- List pages: feature name + Help (no tabs unless multiple top-level views)
- Tab count: [N tabs from wireframe] — if > component limit, detach and duplicate tab instances
- CTA in Sub Header: ONLY when tabs exist AND action applies to all tabs (e.g., Connect, Help)

## Button CTA Hierarchy (per action group)
- Primary (Fill): [the ONE most important action]
- Secondary (Outline): [less important actions]
- Tertiary (Ghost): [cancel, dismiss, navigation]
- NEVER more than ONE Fill button per action bar/footer/toolbar

## Typography
- Section heading: `✅ Headlines/H6` (16/20 Semi Bold), BODY/Text/Static/Primary
- Stat value: `✅ Headlines/H3` (24/30 Semi Bold), BODY/Text/Static/Primary
- Stat label: `✅ Body/Body 3` (12/16 Regular), BODY/Text/Static/Secondary
- Body text: `✅ Body/Body 1` (14/20 Regular), BODY/Text/Static/Primary
- Caption: `✅ Body/Body 3` (12/16 Regular), INPUT FIELDS/Text/Place Holder
- ALL text uses zcat text styles — ZERO manual font settings

## Colors
- ALL fills/strokes bound to zcat variables — ZERO hardcoded hex
> Names below are live zcat variables. Full list with keys and Light/Dark values:
> `references/design-tokens.md` (GENERATED). Import BY KEY — never bind by name.

- Backgrounds: CARDS/Bg Default/Primary, CARDS/Bg Default/Secondary, CARDS/Bg Default/Body Bg
- Text: BODY/Text/Static/Primary, BODY/Text/Static/Secondary, INPUT FIELDS/Text/Place Holder
- Borders: CARDS/Borders/Default, BODY/Border/Static/Border

## Spacing
- Card gap (horizontal row): 16px
- Section gap (vertical): 24px
- Heading to content: 12px
- Form field gap: 16px
- Container itemSpacing: 10px
```

### Step 2.3 — Write ALL Page Spec Files AT ONCE

For EVERY page and popup identified in Phase 1, write a complete build spec file. ALL files written now, not one at a time during build.

**Page spec file format:**

```markdown
# Build Spec: [Page Name]

## Reference
- Match: [Me- screen name] (get_screenshot before building to verify)
- Screenshots: #[N] for [pattern], #[N] for [pattern]
- Page type: [list/detail/master-detail/settings/popup/empty]

## Wireframe Improvements Applied
- [what wireframe showed] → [what we're doing instead and why]
- [duplicate removed] → [reason]
- [irrelevant action removed] → [reason]
- [layout improved] → [from what to what]

## Layout Shell
- Layout variant: [Default / No Left Menu]
  Component: Layout (key: c321d468..., set)
- Container width: [1259px / 1489px]

## Sub Header
- Title/back nav: [exact text]
- Tabs: [tab1 (active), tab2, tab3, ...] or NONE
  Component: Tabs (key: 4851c5917e..., set)
  Properties: { Type: "Primary", Count: "[N]" }
- Right side actions: [Help, button names, three-dot]
  Button component: (key: 1e04478db0..., set)
  Properties: { Type: "[value]", Variant: "[value]", Size: "[value]" }
- Tab text overrides: [tab1 text, tab2 text, ...]

## Sidebar
- Groups and items:
  GROUP "[name]":
    - [item1] (active if this is the current page)
    - [item2]
  GROUP "[name]":
    - [item3]
    - [item4]

## Container Setup
- Padding: [top]/[right]/[bottom]/[left]
- layoutMode: VERTICAL
- itemSpacing: [value]
- counterAxisSizingMode: FIXED
- primaryAxisSizingMode: AUTO

## Composition Direction (from Step 1.6)
- Focal point: [what draws the eye first]
- Hierarchy: [ranked content importance]
- Grouping: [card strategy — not every section needs a card]
- Section flow: [vertical rhythm rationale]
- Density: [sparse/dense — affects spacing and card usage]

NOTE: The children below list WHAT to build and WHICH components to use (hard
constraints). The ARRANGEMENT, grouping, and visual emphasis are composition
GUIDANCE — the agent may adjust grouping, reorder sections, combine or split
cards, and change column layouts if it improves the design. Functional coverage
(every feature appears) is mandatory; spatial layout is flexible.

## Container Children (in order, top to bottom)

### Child 1: [Name — e.g., "Stat Cards Row"]
- Type: [component instance / manual frame / detached component]
- Component: [name] (key: [key], type: [set/comp])
- Import: [importComponentSetByKeyAsync / importComponentByKeyAsync]
- Properties: { [property]: [value], ... }
- Layout: [HORIZONTAL/VERTICAL], gap: [N]px, padding: [values]
- Sizing: layoutSizingHorizontal = [FILL/FIXED/HUG]
- Children:
  1. [Child element 1]
     - Component: [name] (key: [key])
     - Properties: { ... }
     - Text overrides:
       - [node path]: "[text]" (load font first)
     - Color bindings:
       - fill → [variable name]
       - stroke → [variable name]
     - Icon: clone from [source], swap to [target icon name]
  2. [Child element 2]
     - ...

### Child 2: [Name — e.g., "Two-Column Info Section"]
- Type: manual frame (HORIZONTAL auto-layout)
- Layout: gap: 16px
- Sizing: layoutSizingHorizontal = FILL
- Children:
  1. Left Column (FILL width)
     - Component: General Details (key: 6dd180e6..., comp)
     - Import: importComponentByKeyAsync
     - Detach: YES (on detach whitelist — to customize rows)
     - Heading text: "[Section Name]"
     - Rows:
       - Label: "[label1]" → Value: "[value1]"
       - Label: "[label2]" → Value: "[value2]"
       - ...
     - Remove extra placeholder rows (hide, do NOT delete — may throw)
  2. Right Column (FILL width)
     - [describe exact contents with same detail level]

### Child 3: [Name — e.g., "Replicas Table Section"]
- Section heading: "[heading text]" `✅ Headlines/H6` (16/20 Semi Bold) BODY/Text/Static/Primary
  - Right side: Button "[label]" (key: 1e04478db0..., Type: Primary, Size: Default)
- Table: Table AI (key: f3a77a..., set)
  - Import: importComponentSetByKeyAsync
  - Properties: { Style: "Boxy", Columns: "5", Show Pagination: false, Show Threedot: true }
  - layoutSizingHorizontal: FILL
  - Style: [Stretch/Boxy] — WHY: [is this a list page (Stretch) or inside a detail/popup (Boxy)?]
  - Column setup (MUST justify each type — ask the decision questions for EVERY column):
    Col 1: Text — header "Replica Name"
           PERSON'S FACE test: NO (replicas don't have faces) → Text, NOT AvatarName
           data: replica-east-1, replica-west-2, ...
    Col 2: Text — header "Region"
           PERSON'S FACE test: NO → Text
           data: us-east-1, us-west-2, ...
    Col 3: Text — header "Replication Lag"
           FINITE STATUS SET test: NO (open-ended numeric) → Text, NOT Badge
           data: 12ms, 8ms, ...
    Col 4: Text — header "Instance Class"
           data: db.r6g.large, db.r6g.xlarge, ...
    Col 5: Badge — header "Status"
           FINITE STATUS SET test: YES (3 values, each has meaning) → Badge
           Badge color mapping:
             "Available" → Green (success)
             "Syncing" → Amber (warning/in-progress)
             "Error" → Red (failure)
      Swap to: importComponentByKeyAsync("f54ff134...")
  - VERIFY: Are column types different from Table AI defaults (AvatarName col 1, Badge col 2)?
    If they match defaults → you probably forgot to swap columns
  - Text update approach: find TEXT nodes, load font, set characters. DO NOT DETACH

## Validation Checklist (verify after build)

### Features & Content
- [ ] Sub Header: ALL [N] tabs from wireframe present (COUNT them — if component had a limit, was it detached to add more?)
- [ ] Sub Header: ACTIVE TAB correctly set (exactly one tab active, matching visible content)
- [ ] Sidebar: all [N] items present, correct group, active item highlighted
- [ ] Stat cards: [N] cards, each with icon BG (DIFFERENT colors) + value + label, HUG height
- [ ] [Section name]: all [N] fields present with correct labels and values
- [ ] No features dropped from wireframe

### Tables
- [ ] Table: [N] columns, correct headers, correct data in cells (data aligned to its column header — no cross-contamination)
- [ ] Table columns: AvatarName ONLY on person columns — ask "Is this about a PERSON?" for each column
- [ ] Table columns: Badge ONLY on status/category columns — ask "Is this a STATUS?" for each column
- [ ] Badge colors: DIFFERENT color per status meaning (green/red/amber/blue/grey) — NEVER all same color

### Buttons & CTAs
- [ ] CTA hierarchy: AT MOST ONE Fill (primary) button per action group — count the Fill buttons
- [ ] Empty state: buttons have DIFFERENT labels (if two shown)
- [ ] Action bar balanced: right buttons have left-side element (Search/heading/filter)

### Components
- [ ] Code/SQL/query content uses Code Block component — NOT plain text frame
- [ ] Read-only data uses General Details — NOT Text Box or Key Value Pair (editable inputs)
- [ ] Master-detail layouts use Side Menu pattern — NOT flat two-panel
- [ ] ALL cards/frames/containers use auto-layout — NO fixed pixel heights or widths
- [ ] Card height: HUG — content determines size, NEVER hardcoded pixels
- [ ] Grouping frames use `createAutoLayout()` — NOT `createFrame()` with absolute x/y
- [ ] Width = FILL, Height = HUG on all content containers

### Popup (if applicable)
- [ ] Header, body, footer ALL stretch to full popup width (layoutSizingHorizontal = FILL)
- [ ] Stepper in HEADER area (below title), FILL width — NOT in body
- [ ] Footer: Cancel/Back LEFT, primary action RIGHT — NOT centered
- [ ] Cancel button is Outline/grey — NEVER Fill/primary blue
- [ ] ALL form elements FILL width — no narrow fixed controls in wide popup

### Quality
- [ ] Colors: ZERO hardcoded hex — EVERY fill, stroke, text color bound to zcat variable (check Selection Colors panel)
- [ ] No raw `{r:0, g:0, b:0}` fills — even black text uses `BODY/Text/Static/Primary` variable
- [ ] No raw white backgrounds — use `CARDS/Bg Default/Primary` variable
- [ ] Icons: all zcat stroke icons — no emoji/unicode/shapes
- [ ] Layout: matches [Me- reference] pattern — NOT a wireframe copy
- [ ] Spacing: matches design uniforms
- [ ] No duplicate information
- [ ] Multi-state pages: each state is a separate design frame
```

**EVERY page and popup gets a spec file this detailed. Write them ALL during Phase 2.**

### Step 2.4 — Present Analysis to User

Show the user:
1. The page list with types and reference matches
2. Key design decisions: improvements over wireframe, duplicates removed, actions removed
3. Design uniforms summary
4. Missing wireframes — pages referenced but not provided

**Approval behavior:**
- **If the user's prompt says "get approval" or "confirm with me before building":** Ask "Does this match your expectations? Any changes before I build?" and WAIT for confirmation before proceeding
- **If the user says nothing about approval, or says "auto" / "proceed automatically":** Show the summary as an FYI, then proceed to Phase 3 immediately without waiting. The user can interrupt if something looks wrong

Default is **auto-proceed** — most users want results, not checkpoints.

---

## Phase 3: Build (one page at a time, spec-driven, autonomous verify)

**Goal: Minimize user effort. The agent reads the page spec, follows hard constraints exactly and uses composition guidance as a starting direction, verifies internally, fixes and improves, and shows ONLY the final verified result.**

### Step 3.1 — Build Order

Build in this order:
1. The page with the MOST common patterns (usually the list page) — establishes the visual language
2. Pages that share patterns with page 1
3. Unique pages and popups last

### Step 3.2 — Per-Page Build Cycle

For EACH page:

```
1. READ SPEC → Read the page's spec file from scratchpad/design-specs/
   (Re-ground on exact components, properties, placement, colors, text)

2. WIREFRAME → Show low-fi wireframe via show_widget for user approval
   (This is the ONLY user checkpoint before the final result)

3. BUILD → Execute in Figma following the spec
   - HARD CONSTRAINTS (follow exactly): component keys, variable bindings,
     component properties, column types, feature list, text content
   - COMPOSITION GUIDANCE (improve if you see a better arrangement):
     section order, grouping strategy, card usage, column layouts
   - Functional coverage is mandatory — every feature in the spec MUST appear
   - Spatial layout is flexible — rearrange, regroup, adjust emphasis
   - Use 2-3 use_figma scripts max

--- SCREEN POLISH & VERIFY (autonomous — user does NOT see this) ---

CRITICAL: Do NOT assume your build looks good. Agents consistently rate their
own output too highly. Be HARSH. If something looks even slightly off, it IS
off and must be fixed. This is a COMPREHENSIVE pass — catch bugs, fix missing
content, AND actively improve anything that looks weak or generic.

Read `references/decision-rules/rules-design-composition.md` "Screen Polish
Patterns" section for the full improvement reference table.

4. SCREENSHOT → Take screenshot of built page

5. AUDIT — Check EVERY area of the screen inch by inch:

   PART A — Structural Integrity:
   - Every frame/card/container uses auto-layout? (no absolute positioning)
   - All cards use HUG height? (no fixed pixel heights anywhere)
   - All containers use FILL horizontal? No child wider than parent?
   - No broken auto-layout chains? No scroll/overflow issues?
   - No overlapping layers?

   PART B — Component Correctness:
   - Every UI element uses a zcat component? (no manual controls)
   - All colors bound to variables? (ZERO raw hex — fills, strokes, text)
   - All text uses zcat text styles?
   - Button sizes consistent within each group/row?
   - Button variants correct? (ONE Fill primary per group, rest Outline/Ghost)
   - Cancel buttons Outline/grey? Danger actions use Color: "Danger"?
   - Badge colors semantic and different per status value?
   - Table AI columns match data types? (not left as defaults)
   - Active tab state set correctly? Sidebar active state correct?
   - Three-dot menus have Dropdown Menu built alongside?
   - Link text bound to `BUTTONS/Link/Text & Icon/Default`?
   - Hover/interaction states set where applicable?

   PART C — Wireframe Completeness (inch by inch):
   - COUNT every tab, button, field, column, menu item, section from wireframe
   - Compare against built screen — list anything missing
   - If component limit hit — detached to add remaining items?
   - Every dropdown shows realistic selected value? (no placeholder text)
   - Every text input filled with real data?
   - Sub Header tab count matches wireframe exactly?
   - Sidebar items match wireframe navigation?

   PART D — Design Quality (actively improve, not just check):
   - Does it look like a PRODUCTION app or a wireframe with components?
   - Compare against "Me-" reference — same quality, same polish?
   - Stat cards: use judgment on icon BGs — only when a meaningful icon
     exists for the metric. Not every card needs an icon
   - Cards/sections earning their place? (no empty wrappers, no loose content)
   - Typography hierarchy clear? (headings, body, labels distinct)
   - Spacing rhythm right? (24px sections, 16px within, 12px heading-to-content)
   - Layout balanced? (action bars have left + right elements)
   - Density appropriate? (dashboard=balanced, table=dense, empty=spacious)
   - Side menu well-organized? (icons, grouping, active state)
   - Container content well-spaced? (not cramped, not empty)

6. FIX & ENHANCE → Two types of changes in the same pass:

   Bug fixes: bind unbound colors, fix HUG heights, add missing elements,
   correct component variants, fix overflow issues, set active states,
   fix button sizes, bind link colors, add missing three-dot menus.

   Enhancements (COMPOSITION-ONLY — never break components):
   - Reorder sections for better hierarchy
   - Change column structure (1-col → 2-col)
   - Adjust spacing/gaps between sections
   - Swap Card BG vs flat vs bordered grouping
   - Add icon BGs to stat cards WHERE MEANINGFUL (not forced)
   - Balance action bars (add Search/heading on empty side)
   - Improve typography hierarchy
   - Fill empty dropdowns/inputs with realistic data
   - NEVER detach, rebuild, or unbind components during polish

7. RE-SCREENSHOT → Screenshot again after fixes/enhancements

8. RE-VERIFY → Confirm ALL four parts pass. Specifically check:
   - Auto-layout still intact after changes?
   - Colors still variable-bound? Components not broken?
   - No new overflow or scroll issues?
   - Enhancement improved design without breaking anything?
   Repeat 6-8 for max 2 rounds. After 2, tell user what's unresolved.

--- END SCREEN POLISH & VERIFY ---

9. SHOW FINAL → Show verified screenshot to user with brief summary:
   - "Built [Page Name] matching [Me-reference] pattern"
   - "[N] components, [N] sections, design decisions applied"
   - Any compromises or unresolved issues

10. NEXT → After user confirms, read NEXT page's spec file and repeat
```

### Step 3.3 — Consistency Gate (Double Verify)

Specs are written together from the same design uniforms, so consistency SHOULD be built in — but verify anyway. After building page 2+, screenshot and compare against page 1 BEFORE showing user:
- Same card style? Same action bar? Same table style?
- Same section grouping? Same spacing? Same typography?
- Same icon style? Same color usage?
- Correct sidebar active state for this page?
- If anything differs, re-read the design uniforms file and fix.

---

## Phase 4: Final Review

After ALL pages are built:

### Step 4.1 — Navigation Completeness

Check page relationship map:
- [ ] Every button/link has a destination page built
- [ ] Every tab shows appropriate content
- [ ] Back navigation returns to correct page
- [ ] Sidebar active state is correct per page

### Step 4.2 — Final Presentation

Show user ALL pages together:
1. Screenshot of each page
2. Summary of design decisions made
3. Missing pages (buttons leading nowhere)
4. Any unresolved issues

---

## Common Failure Modes

### 1. "Looks Good" Without Checking (THE #1 FAILURE)
**Fix:** Autonomous verification has Part B (Visual Quality) — agent must be BRUTAL and compare against "Me-" reference. "Looks good to me" is never acceptable. If it doesn't match the reference quality, it's not done.

### 2. Building Forward Without Fixing
**Fix:** Verification loop catches issues per page. Never move to next page with failures.

### 3. Wireframe Copy
**Fix:** Spec file cites "Me-" reference and lists specific creative improvements. DESIGN MATCH check catches copies.

### 4. Inconsistent Patterns Across Pages
**Fix:** ALL specs written together from same design uniforms + consistency gate after each page as double verify.

### 5. Forgetting zcat Rules (Sonnet drift)
**Fix:** Spec file contains EVERY component key, property value, color variable, and placement instruction. Agent doesn't need to remember rules — just reads the spec.

### 6. Irrelevant Buttons / Duplicate Info
**Fix:** Cleaned up in Phase 1 (Steps 1.5, 1.6) and noted in each spec's "Wireframe Improvements Applied" section.

### 7. Silently Dropping Features
**Fix:** Feature inventory (Phase 1) is the contract. Spec file's validation checklist checks every element.

### 8. Not Using Reference Screens
**Fix:** Each spec file's FIRST field is "Reference: Match [Me- screen]". Agent screenshots the reference before building.

### 9. Inventing New Patterns Mid-Build
**Fix:** Design uniforms are locked in Phase 2. Spec files reference uniforms. Agent follows spec, doesn't improvise.

### 10. Context Drift in Long Sessions
**Fix:** Each page build starts by RE-READING its spec file. Fresh context every time. No reliance on conversation memory.

### 11. Multiple Fill (Primary) Buttons in Same Action Group
**Problem:** Agent makes every button Fill — "Save Query" (Fill) + "History" (Fill) + "Run" (Fill) + "Export CSV" (Fill). Four primaries fighting for attention.
**Fix:** Spec file MUST name which ONE button is primary (Fill). All others are Outline or Ghost. Check: count Fill buttons per action bar — if > 1, demote.

### 12. Sub Header Tabs Dropped to Fit Component Limit
**Problem:** Wireframe shows 7 tabs, but agent only builds 5 because the Sub Header component has a limit.
**Fix:** COUNT tabs in wireframe during Phase 1. If wireframe has more tabs than the component supports, plan the detach in the spec file. NEVER silently drop tabs.

### 13. Code/SQL Content as Plain Text Frame
**Problem:** Agent draws a bordered rectangle with monospace text for a SQL console instead of using Code Block / Code Editor component.
**Fix:** Spec file MUST specify Code Block component for any code/SQL/query/JSON content. Agent searches for it before building.

### 14. Empty State Duplicate Button Labels
**Problem:** Both Outline and Fill buttons say "Create Backup" — same label, same action. Confusing and redundant.
**Fix:** Spec file MUST list the TWO distinct actions (primary: "Create Backup", secondary: "Enable Auto-Backup"). If only one action exists, set `Show Outline Button = false`.

### 15. Popup Section Width Mismatch
**Problem:** Header, stepper, body, and footer have different widths — stepper cramped in center, body content narrow, footer buttons centered instead of edge-aligned.
**Fix:** Spec file MUST specify `layoutSizingHorizontal = "FILL"` for EVERY section (header, stepper, body, footer). Agent screenshots popup after building and checks alignment.

### 16. Table Data Cross-Contamination
**Problem:** Data from one column leaks into another — ID column shows "$1,240.00", customer column shows "1040" as a badge, status column shows "Umbrella". Total data chaos.
**Fix:** Agent MUST verify after building: screenshot the table, read each row left-to-right, confirm each cell's data matches its column header. If data is scrambled, the text updates were applied to wrong nodes.

### 17. Wireframe Copy Disguised as "Creative Design"
**Problem:** Agent copies the wireframe layout exactly, swaps text for components, and presents it as a "creative design." The result is a wireframe with component styling — not a polished UI.
**Fix:** The spec file lists specific improvements over the wireframe (Phase 1.6). Verification Part B checks against "Me-" reference quality. If the build looks like the wireframe with components dropped in, it fails.

### 18. Fixed Pixel Heights and Widths on Cards/Containers
**Problem:** Agent sets `resize(width, 100)` or `height = 200` on cards, section wrappers, and content containers. Cards end up at H:100 (too small) or H:500 (too large with wasted space). All cards same fixed height regardless of content.
**Fix:** ALL cards/frames/containers use auto-layout with HUG height. `counterAxisSizingMode = "AUTO"`, `layoutSizingVertical = "HUG"`. Content determines size. Cards in a row match via parent `counterAxisAlignItems = "STRETCH"`. If something looks wrong, fix the CONTENT, not the container size.

### 19. Hardcoded Hex Colors Instead of Variable Bindings
**Problem:** Agent writes `node.fills = [{type: 'SOLID', color: {r:0, g:0, b:0}}]` for text or backgrounds — raw hex that breaks dark mode. Selection Colors panel shows "000000" or "FFFFFF" instead of variable names. Even text that "looks correct" in light mode is wrong if not variable-bound.
**Fix:** EVERY fill, stroke, and text color MUST use `figma.variables.setBoundVariableForPaint`. Black text = `BODY/Text/Static/Primary`, white bg = `CARDS/Bg Default/Primary`, grey border = `CARDS/Borders/Default`. Agent MUST screenshot and check the Selection Colors panel — any raw hex value is a bug.
