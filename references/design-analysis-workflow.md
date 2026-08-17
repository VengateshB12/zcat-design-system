# Design Analysis Workflow

Pre-build analysis phase that MUST complete before any Figma build starts. This ensures creative, consistent, and complete designs by forcing upfront decisions instead of improvising during the build.

**When to use:** Every time the user provides wireframes, screenshots, PRDs, or any multi-screen design task. Skip ONLY for single-component tweaks or quick fixes to existing screens.

---

## Design Reference Sources (MUST consult before designing)

Two reference sources exist. The agent MUST look at relevant references BEFORE making any design decisions:

### Source 1: "Me-" Reference Screens in Figma

The design system file (`ugOZk4O0g6XpviEBSN24mF`) has a **"Referance Templates"** page containing manually-built production-quality reference screens prefixed with "Me-". These are the GOLD STANDARD — built by the designer, not by an agent.

**Available "Me-" reference screens:**
| Screen | Page Type | What to Learn From It |
|--------|-----------|----------------------|
| Me- Functions - List View | List page | Action bar layout, stretch table, column types, sidebar grouping |
| ME- Databases - List View | List page | Same pattern, different data — confirms list page consistency |
| Me- Applications - Cards | Card grid page | Card layout, badge placement, grid spacing |
| Me -Monitoring - orders | Detail/dashboard | Stat cards, chart layout, monitoring patterns |
| ME - Databases - Empty State | Empty state | Empty State component usage, simple Sub Header |
| Me-Create Function Modal | Popup/form | Popup structure, form fields, footer buttons |
| Me - Create Database Wizard | Wizard popup | Multi-step wizard, Stepper, selection cards, footer layout |
| Three dot menu | Overflow menu | Dropdown Menu structure, icon placement |

**How to use:** Before writing ANY page spec, `get_screenshot` the relevant "Me-" reference screen. Match its exact patterns.

### Source 2: Production Screenshots (Local Folder)

`Screenshots referance/` folder has 24 production Catalyst screenshots. See `references/screenshot-design-patterns.md` for the full catalog with extracted patterns.

### Priority Order

1. **"Me-" screens FIRST** — if a matching "Me-" reference exists, follow it exactly
2. **Production screenshots SECOND** — for page types without a "Me-" reference
3. **decision-rules.md THIRD** — for patterns not covered by either visual reference

---

## How Wireframes Should Be Interpreted

**Wireframes are FUNCTIONAL REFERENCES, not design blueprints.**

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

**CRITICAL: Every single functional element in this inventory MUST appear in the final design. This is the contract. Design creativity = HOW it looks, not WHAT appears.**

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

For each duplicate: decide MERGE or REMOVE. Note the decision.

### Step 1.6 — Design Improvement Decisions

For EACH page, note what the wireframe does WRONG or could be BETTER:

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
- Status columns: ExecutionStatus (dot + text) for operational status
- Person columns only: AvatarName
- All others: Text, Date, Badge as appropriate

## Sub Header
- Detail pages: back nav "< [item name]" + tabs + Help + three-dot
- List pages: feature name + Help (no tabs unless multiple top-level views)
- NEVER detach Sub Header

## Typography
- Section heading: Body/SemiBold/16, color/text/primary
- Stat value: Headlines/SemiBold/24, color/text/primary
- Stat label: Body/Regular/12, color/text/secondary
- Body text: Body/Regular/14, color/text/primary
- Caption: Body/Regular/12, color/text/placeholder
- ALL text uses zcat text styles — ZERO manual font settings

## Colors
- ALL fills/strokes bound to zcat variables — ZERO hardcoded hex
- Backgrounds: color/bg/surface, color/bg/raised, color/bg/sunken
- Text: color/text/primary, color/text/secondary, color/text/placeholder
- Borders: color/border/default, color/border/subtle

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
- Section heading: "[heading text]" Body/SemiBold/16 color/text/primary
  - Right side: Button "[label]" (key: 1e04478db0..., Type: Primary, Size: Default)
- Table: Table AI (key: f3a77a..., set)
  - Import: importComponentSetByKeyAsync
  - Properties: { Style: "Boxy", Columns: "5", Show Pagination: false, Show Threedot: true }
  - layoutSizingHorizontal: FILL
  - Column setup:
    Col 1: Text — header "Replica Name" — data: replica-east-1, replica-west-2, ...
    Col 2: Text — header "Region" — data: us-east-1, us-west-2, ...
    Col 3: Text — header "Replication Lag" — data: 12ms, 8ms, ...
    Col 4: Text — header "Instance Class" — data: db.r6g.large, db.r6g.xlarge, ...
    Col 5: Badge — header "Status" — data: Available (Success), Syncing (Warning)
      Swap to: importComponentByKeyAsync("f54ff134...")
  - Text update approach: find TEXT nodes, load font, set characters. DO NOT DETACH

## Validation Checklist (verify after build)
- [ ] Sub Header: [N] tabs present, correct text, correct active state
- [ ] Sidebar: all [N] items present, correct group, active item highlighted
- [ ] Stat cards: [N] cards, each with icon BG + value + label
- [ ] [Section name]: all [N] fields present with correct labels and values
- [ ] Table: [N] columns, correct headers, correct data in cells
- [ ] Colors: ZERO hardcoded hex — all bound to variables
- [ ] Icons: all zcat stroke icons — no emoji/unicode/shapes
- [ ] Layout: matches [Me- reference] pattern
- [ ] Spacing: matches design uniforms
- [ ] No duplicate information
- [ ] No irrelevant buttons
```

**EVERY page and popup gets a spec file this detailed. Write them ALL during Phase 2.**

### Step 2.4 — Present Analysis to User

Show the user:
1. The page list with types and reference matches
2. Key design decisions: improvements over wireframe, duplicates removed, actions removed
3. Design uniforms summary
4. Missing wireframes — pages referenced but not provided

Ask: "Does this match your expectations? Any changes before I build?"

**Wait for user confirmation. Then ALL spec files are locked — no changes during build unless user requests them.**

---

## Phase 3: Build (one page at a time, spec-driven, autonomous verify)

**Goal: Minimize user effort. The agent reads the page spec, builds exactly what it says, verifies internally, fixes, and shows ONLY the final verified result.**

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

3. BUILD → Execute in Figma following the spec EXACTLY
   - Import components using the keys from the spec
   - Set properties using the values from the spec
   - Place children in the order listed in the spec
   - Bind colors to the variables listed in the spec
   - Set text to the content listed in the spec
   - Use 2-3 use_figma scripts max

--- AUTONOMOUS VERIFICATION LOOP (user does NOT see this) ---

4. SCREENSHOT → Take screenshot of built page

5. VERIFY AGAINST SPEC → Check the spec file's validation checklist:
   - Every element listed in the spec present?
   - Every component used correctly (right key, right properties)?
   - Every color bound to a variable (ZERO hardcoded hex)?
   - Every icon is a zcat stroke icon?
   - Layout matches the "Me-" reference cited in the spec?
   - Spacing matches design uniforms?
   - No duplicate information?
   - No wireframe-copy look (creative improvements applied)?

6. FIX → Fix every failure by re-reading the spec for correct values.
   The spec has the RIGHT answer — don't improvise, read the spec.

7. RE-SCREENSHOT → Screenshot again

8. RE-VERIFY → Check again. Repeat 6-7 until ALL pass (max 3 cycles).
   If still failing after 3 cycles, STOP and tell user what's unresolved.

--- END AUTONOMOUS LOOP ---

9. SHOW FINAL → Show verified screenshot to user with brief summary:
   - "Built [Page Name] matching [Me-reference] pattern"
   - "[N] components, [N] sections, design decisions applied"
   - Any compromises or unresolved issues

10. NEXT → After user confirms, read NEXT page's spec file and repeat
```

### Step 3.3 — Consistency Gate Between Pages

After building page 2+, compare against page 1 BEFORE showing user:
- Same card style? Same action bar? Same table style?
- Same section grouping? Same spacing? Same icons?
- If anything differs, re-read the design uniforms file and fix.

---

## Phase 4: Cross-Page Review

After ALL pages are built:

### Step 4.1 — Side-by-Side Verification

Screenshot all pages. Verify internally:
- [ ] Same card designs across all pages
- [ ] Same typography hierarchy
- [ ] Same action bar patterns
- [ ] Same table configurations
- [ ] Same sidebar menu (correct active state per page)
- [ ] Same Sub Header treatment

Fix inconsistencies before showing the final gallery.

### Step 4.2 — Navigation Completeness

Check page relationship map:
- [ ] Every button/link has a destination page built
- [ ] Every tab shows appropriate content
- [ ] Back navigation returns to correct page

### Step 4.3 — Final Presentation

Show user ALL pages together:
1. Screenshot of each page
2. Summary of design decisions
3. Missing pages (buttons leading nowhere)
4. Any unresolved issues

---

## Common Failure Modes

### 1. "Looks Good" Without Checking
**Fix:** Autonomous verification loop FORCES screenshot + checklist. Never skip.

### 2. Building Forward Without Fixing
**Fix:** Verification loop catches issues per page. Never move to next page with failures.

### 3. Wireframe Copy
**Fix:** Spec file cites "Me-" reference and lists specific creative improvements. DESIGN MATCH check catches copies.

### 4. Inconsistent Patterns Across Pages
**Fix:** ALL specs written together from same design uniforms. Consistency gate after each page.

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
