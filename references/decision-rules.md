# Decision Rules

Structured decision trees for choosing the right component when the designer's input is ambiguous. Use these to resolve uncertainty before building a screen.

---

## MANDATORY: Search Before Build

**This rule overrides everything else. Before building ANY UI element:**

1. Run `search_design_system` with the component name and `includeLibraryKeys` filter
2. If found → import it using the correct method (component vs component_set)
3. If found but properties don't match → check `zcat_get_component` for real properties
4. If genuinely not found → ONLY THEN build manually, and tell the user why

**The #1 root cause of broken builds is skipping the search step.** Real-world failure pattern observed across multiple model builds:

- "I assumed zcat didn't have a Stepper" → It does. Never searched.
- "I hand-drew all the buttons" → Buttons component exists. Never searched.
- "I built the table manually because columns were too wide" → Table has `minWidth = null` fix. Never explored column variants.
- "I created a manual frame for the popup backdrop" → Popup Blur component exists. Never searched.

**The library has 79 components.** Whatever you're about to build manually, search first. The search takes 1 second; a manual build takes minutes, wastes tokens, and produces wrong results (hardcoded colors, wrong spacing, no variable bindings).

### Components Agents Commonly Skip (CHECK THIS LIST)

**Before building ANYTHING, scan this list. If your screen has any of these patterns, use the component — do NOT hand-build.**

| UI Pattern | CORRECT Component | Agent Mistake |
|-----------|-------------------|---------------|
| Popup/Modal/Dialog | Popup + Popup Blur | Hand-draws a frame with X close button |
| Toggle switch | Toggle Button | Draws circles + rectangles manually |
| Dropdown/Select | Dropdown | Draws a frame with text + chevron |
| Text input | Text Box | Draws a bordered rectangle |
| Checkbox | Check Box | Draws a square + checkmark |
| Radio selection | Radio Button | Draws circles manually |
| Step indicator | Stepper | Draws numbered circles + lines |
| Tags/filters | Chip | Draws small bordered rectangles with text |
| Warnings/alerts | Attention Box | Draws a colored box with icon |
| Loading indicator | Loader | Draws spinning circles |
| User icon | Avatar | Draws a colored circle with initials |
| Key-value info | General Details or Key Value Pair | Stacks label+value as plain text |
| Code/SQL editor | Code Block | Draws a plain text frame |
| Section heading | Container Header | Writes bold text manually |
| Progress indicator | Progress Bar | Draws rectangles for progress |
| Breadcrumb trail | Breadcrumbs | Writes "Home > Page > Sub" as text |
| Pagination | Pagination | Draws page number buttons manually |
| Tooltip | Tooltip | Draws a small floating frame |
| Search input | Search | Draws a text field with magnifying glass |
| Date input | Date Picker | Draws a text field with calendar icon |
| Selection cards | Radio Button or Card BG (selected state) | Draws bordered rectangles |
| Accordion/expandable | Accordion | Draws a section with chevron |
| Tab navigation | Tabs (in Sub Header or as component) | Draws underlined text buttons |
| Empty/first-time page | Empty State | Manually builds illustration + text + buttons |

**The rule is simple: if the UI pattern exists in the above list, search for it and use the component. ZERO exceptions. The agent that built the "Create Database" wizard hand-drew the stepper, toggle, dropdown, selection cards, and close button — all of which are zcat components.**

**For Tables: ALWAYS use Table AI** (key `f3a77aaa2d8b332d2c86a9cb77ed6a4f92305c07`). Table AI is zero-detach — configure entirely via setProperties(). It has 10 swappable column types (AvatarName, Badge, Date, Text, ExecutionStatus, IconText, Button, Checkbox, Threedot, Icon). Set Style (Stretch/Boxy), Columns count (3-8), toggle Show Checkbox/Threedot/Pagination booleans, and swap column types via instance swap properties (Col 1 through Col 8). Update text content in-place by finding TEXT nodes — NEVER detach. NEVER use legacy Table (`954cd82ff912bd312206e7f2776a75d80049ede0`).

---

## MANDATORY: 100% Wireframe Feature Coverage

**Every feature, tab, menu item, button, field, column, and data element shown in the wireframe MUST appear in the final design.** No exceptions. Design creativity applies to HOW elements look and are arranged, never to WHAT appears on the screen.

### Never Drop Features Due to Component Limits

- If the Tab component supports max 5 tabs but the wireframe shows 7 → **detach the Tab bar and manually add the remaining tabs** using the same styling (same font, same padding, same active/inactive states, same border)
- If the Table has 11 column types but you need 13 columns → add manual columns matching the Table's cell styling
- If a Dropdown Menu has max 5 items but you need 8 → detach and add more items
- **The component is a starting point, not a ceiling.** Detach and extend when limits are hit — NEVER silently remove content to fit a component's constraints
- **Surface the decision:** Tell the user: "The Tab component supports 5 tabs; I'm detaching to add all 7 from the wireframe."

### Wireframe Audit Before Building

Before the first `use_figma` call, enumerate every feature from the wireframe:
- All sidebar menu items (name each one)
- All tabs (name each one)
- All table columns (name each one)
- All action buttons and menus (name each one)
- All form fields (name each one)
- All sections, cards, and panels

Cross-check this list against your build plan. If anything is missing from the plan, add it before building.

### After Building — Completeness Check

Compare the built screen against the wireframe feature list. Every item must be present. If something was omitted, add it before showing the screen to the user.

---

## Design Composition — From Wireframe to Polished UI

**The difference between a wireframe-with-components and a polished UI is design composition** — visual hierarchy, section grouping, creative layout, and intentional use of color, spacing, and typography. Components alone don't make a design good; how you compose them does.

### Wireframe Interpretation

**Wireframes define WHAT appears on a screen, not HOW it should look.**

**Extract from wireframes:**
- What data is shown (fields, columns, values)
- What actions are available (buttons, menus, links)
- What navigation exists (tabs, sidebar items, breadcrumbs)
- What states matter (empty, loading, error, success)
- What sections the content is grouped into

**Do NOT copy from wireframes:**
- Exact spacing — wireframes use rough spacing for clarity, not final values
- Visual hierarchy — wireframes are intentionally flat to focus on features
- Section styling — wireframes don't show cards, shadows, borders, backgrounds
- Typography scale — wireframes often use uniform text sizing

### When to Follow vs. Improve Wireframe Layout

**Follow the wireframe layout when:**
- It matches a standard Catalyst pattern (list page = stretch table, detail page = stat cards + sections)
- The wireframe was clearly designed with the final product in mind (proper spacing, real data, correct component placement)
- The user specifically says "match this layout exactly"

**Improve the wireframe layout when:**
- Everything is stacked vertically when side-by-side grouping would be better (e.g., Connection info + Recent activity can sit side by side)
- Sections lack visual grouping — no cards, no borders, no background differentiation
- No visual hierarchy — all text same size, no headings, no emphasis on key values
- The wireframe is purely functional — showing what fields exist without design intent

**When unsure:** Follow the wireframe's content and features exactly, but apply visual polish (hierarchy, grouping, spacing rhythm). This is always safe — you keep every feature and the design looks better.

### Visual Hierarchy

**CRITICAL: NEVER hardcode font sizes, weights, or hex colors in text.** Use zcat text styles and color variables. The design system defines 19 text styles — use them instead of specifying raw "16px SemiBold #000000".

**Text hierarchy (use zcat text styles and color variables):**

| Role | Text Style | Color Variable |
|------|-----------|---------------|
| Section heading | Body/SemiBold/16 | `color/text/primary` |
| Sub-section heading | Body/SemiBold/14 | `color/text/primary` |
| Body / data text | Body/Regular/14 | `color/text/primary` |
| Label / caption | Body/Regular/12 | `color/text/secondary` |
| Help text / description | Body/Regular/12 | `color/text/placeholder` |
| Card title | Body/SemiBold/16 | `color/text/primary` |
| Card subtitle | Body/Regular/14 | `color/text/secondary` |
| Card timestamp | Body/Regular/12 | `color/text/placeholder` |

**ALL text colors MUST be bound to variables** — NEVER use raw hex like `#000000`, `#333333`, `#666666`. Use `color/text/primary`, `color/text/secondary`, `color/text/placeholder`, `color/text/on-brand`, etc.

**Stat card values (make numbers prominent, not flat):**

| Element | Text Style | Color Variable |
|---------|-----------|---------------|
| Metric value (the number) | Headlines/SemiBold/24 | `color/text/primary` |
| Metric label (what it measures) | Body/Regular/12 | `color/text/secondary` |
| Metric unit/suffix (GB, active, etc.) | Body/Regular/14 | `color/text/secondary` |

**Action hierarchy:**
- Primary action → Fill button (`color/interactive`), most prominent
- Secondary action → Outline button, medium prominence
- Tertiary action → Ghost button or text link, least prominent

### Section Grouping

**Group related information into visual blocks.** Don't leave content as a flat list — wrap logical groups in Card BG or bordered frames.

**Use Card BG for:**
- Stat / metric tiles (a row of 3-4 key numbers at the top of a detail page)
- Info sections (Connection details, Configuration settings)
- Dashboard widgets (charts, activity feeds, metric panels)
- Detach to insert real content inside; keep the card's padding, radius, and color binding

**Use bordered frames (1px border, `color/border/default`, 6px radius, `color/bg/surface` fill) for:**
- Form field groups inside a larger form
- Configuration sections within a settings page
- Content blocks that need visual separation but not card elevation

**Use section headers (heading text + 8-12px gap, no border) for:**
- Dividing content within a card or bordered frame (e.g., "Connection" heading above HOST/PORT fields)
- Labeling major areas that already have a visual container

### Layout Creativity — Standard Page Compositions

These are the canonical layouts for each screen type. Use them as the foundation, then add visual polish.

**List Page (stretch table):**
```
Container (padding: 0)
└── Action bar frame (padding: 16px top/left/right, 0 bottom)
    ├── Search (left)
    ├── Filter icon + Refresh icon (center)
    └── Primary button "+ Create X" (right)
└── Table (full width, edge-to-edge)
└── Pagination bar (bottom)
```

**Detail Page with Tabs (boxy, multi-section):**

When a detail page has primary tabs in the Sub Header (e.g., Overview |
Monitoring | Backups | Settings), each tab's content area uses this structure:

```
Sub Header (INSTANCE — title row: page name + Export/common action, tab row: tabs)
Body (padding 14px all sides)
└── Container (padding ~10/16/16/0, gap 10)
    ├── Container Header (section title matching active tab + description + filter controls)
    └── Content Frame (padding 0/16/16/16, gap 16)
        ├── Stat cards row (HORIZONTAL auto-layout, gap: 16px)
        │   ├── Card BG — large bold value + small label (FILL width)
        │   └── ...
        ├── Two-column row (HORIZONTAL auto-layout, gap: 16px)
        │   ├── Left section (FILL width) — Card BG or bordered frame
        │   └── Right section (FILL width) — Card BG or bordered frame
        └── Full-width section — Card BG or bordered frame
            ├── Section heading
            └── Content (table, chart, progress)
```

**Container Header on detail pages** shows the active tab's section context:
the section heading (e.g., "Monitoring"), an optional description line, and
filter controls (e.g., "Last 24 Hours" dropdown) — NOT the page-level actions
which go in Sub Header.

**Detail Page without Tabs (boxy, multi-section):**
```
Container (padding: 16px all sides, gap: 16)
├── Stat cards row (HORIZONTAL auto-layout, gap: 16px)
│   ├── Card BG — large bold value + small label (FILL width)
│   ├── Card BG — large bold value + small label (FILL width)
│   ├── Card BG — large bold value + small label (FILL width)
│   └── Card BG — large bold value + small label (FILL width)
├── Two-column row (HORIZONTAL auto-layout, gap: 16px)
│   ├── Left section (FILL width) — Card BG or bordered frame
│   │   ├── Section heading
│   │   └── Content (KV pairs, connection info, form fields)
│   └── Right section (FILL width) — Card BG or bordered frame
│       ├── Section heading
│       └── Content (activity feed, timeline, related data)
└── Full-width section — Card BG or bordered frame
    ├── Section heading
    └── Content (progress bar, table, chart)
```

**Settings Page (two-column):**
```
Container (padding: 16px, gap: 20-24px)
├── Two-column row (HORIZONTAL, gap: 24px)
│   ├── Left column (~60% width)
│   │   ├── Section heading "Compute & storage"
│   │   ├── Form fields (dropdowns, inputs)
│   │   └── "Apply changes" button
│   └── Right column (~40% width)
│       ├── Section heading "Configuration"
│       ├── Toggle rows with descriptions
│       │   ├── Label + help text (left) + Toggle (right)
│       │   └── ... more toggle rows
│       ├── Section heading "Credentials"
│       └── "Rotate password" outline button
└── Danger zone (full width, Attention Box type=Error or red-bordered frame)
    └── "Delete this database" heading + warning description
```

**Wizard / Multi-step (popup):**
```
Popup Blur (full page backdrop)
└── Popup (centered dialog, ~500-700px wide)
    ├── Title "Create Database"
    ├── Stepper (step 1 → step 2 → step 3 → step 4)
    ├── Step content (varies per step)
    │   Step 1: Radio-style selection cards
    │   Step 2: Form fields (input, dropdown, selectable tiles)
    │   Step 3: Toggles + dropdowns + selectable tiles
    │   Step 4: Review summary (KV pairs in a bordered frame)
    └── Footer (Back button outline + Continue/Create button fill)
```

### ANTI-PATTERN: Wireframe Copy (THE #1 DESIGN QUALITY FAILURE)

**The agent's most common failure is copying the wireframe layout literally into Figma with components swapped in — producing a "wireframe with components" instead of a polished design.**

**How to identify a wireframe copy (if ANY of these are true, the design is bad):**
- Stat cards are flat text-only blocks: just "ENGINE" / "Aurora" / "v3.0" with no icon, no icon background, no visual weight
- Connection details are plain text blocks instead of using General Details or Key Value Pair components
- Recent activity is an unstyled text list instead of items with status dots, timestamps, and a Card BG wrapper
- Storage/progress indicators are basic flat bars instead of creative visualizations (donut chart, circular progress)
- All sections float loose in the Container without Card BG wrappers or bordered frames
- The design looks like a wireframe that happens to use the right font — no visual hierarchy, no depth, no polish
- Sections are stacked vertically when they should be side-by-side (Connection on left, Recent Activity on right)

**Every detail/overview page MUST have these creative elements:**

1. **Stat cards with icon backgrounds** — NOT flat text. See pattern below
2. **Connection/details in General Details component** — NOT manual text blocks
3. **Activity feeds in Card BG with status dots** — NOT plain text lists
4. **Two-column layout for info sections** — NOT everything stacked vertically
5. **Progress/usage as creative visualizations** — circular progress, donut charts, not just flat bars
6. **Every section wrapped in Card BG or bordered frame** — NO floating content

### Stat Card Design — Creative, Not Flat

**Wireframes show flat stat cards. Your designs must NOT.**

Stat cards are the most visible element on a detail page — they set the visual tone.

**BAD (wireframe copy):**
```
Card (flat, no icon)
├── "ENGINE" (12px, secondary)
├── "Aurora" (16px, primary)
└── "v3.0" (12px, secondary)
```
This is NOT a design. This is a wireframe with a border around it.

**GOOD (creative, polished):**
```
Card BG (detached, 16px padding, FILL width)
├── HORIZONTAL auto-layout, gap: 12, center-aligned
│   ├── Icon BG frame (40×40, cornerRadius: 10, padding: 11, centered)
│   │   └── zcat stroke icon (18×18, clone+swap, color: color/text/on-brand)
│   │   └── Fill: bind to a zcat color variable (color/bg/brand-subtle)
│   └── VERTICAL auto-layout, gap: 4
│       ├── Label (12px Regular, color/text/secondary) — "Engine"
│       ├── Value (24px SemiBold, color/text/primary) — "Aurora"
│       └── Subtitle (12px Regular, color/text/placeholder) — "v3.0" (optional)
```

**Rules:**
- ALWAYS include an icon BG with a zcat stroke icon — never omit the icon
- Each card in a row should use a DIFFERENT subtle color for the icon BG (brand-subtle, success-subtle, info-subtle, warning-subtle)
- Value text is the HERO — 24px SemiBold minimum
- Label text is secondary context — 12px, muted color
- All cards in a row use FILL width (equal sizing)
- If the exact icon doesn't exist, use the CLOSEST available zcat stroke icon and tell the user

### Action Bar Design — Balance Left and Right

**NEVER place a button alone on the right with empty space on the left.**

When an action bar has a right-aligned button (e.g., "Add Read Replica", "Create Database"), the left side MUST have supporting content:

| Screen type | Left side content | Right side content |
|-------------|------------------|-------------------|
| List page | Search + Filters | Create button |
| Detail section | Section heading text ("Replicas", "Backups") | Action button |
| Settings section | Section heading + description | Save/Apply button |
| Card header | Title text | Action icon or link |

If the wireframe shows a lonely right-aligned button, ADD a section heading or Search on the left. This is not optional — an empty left side looks broken.

### Visual Polish Checklist

Apply these to EVERY screen before showing it to the user:

1. **Typography hierarchy** — section headings, body text, labels, and help text must be visually distinct in size and weight
2. **Section grouping** — related content wrapped in Card BG or bordered frames, not floating loose in the Container
3. **Consistent spacing** — same gap between same-level elements (16px between cards in a row, 20-24px between major sections, 8-12px between a heading and its content)
4. **Multi-column where appropriate** — detail pages use side-by-side sections when content allows it. Don't stack everything vertically by default
5. **Prominent stat values** — use 24-28px bold for the number, 12px secondary for the label. Not "Label: Value" in flat body text
6. **Semantic status colors** — badges use green=available/success, yellow/amber=warning/modifying, red=error/danger, blue=info/provisioning
7. **Help text under controls** — toggles, complex form fields, and section headers benefit from 12px descriptive text in `color/text/placeholder`
8. **Danger zone separation** — destructive actions (Delete, Remove permanently) get visual separation from the rest of the page using Attention Box (type=Error) or a red-bordered frame
9. **Consistent component sizing** — all buttons in one group same Size variant, all inputs in one form same Size variant
10. **Components on EVERY screen** — verify that EVERY button, input, badge, toggle, checkbox, dropdown, and table is a zcat component instance, NOT a manual frame. This check applies to ALL screens, not just the first one. Context drift (using components on screen 1, then hand-building on screens 2-10) is the #2 failure pattern after skipping search
11. **Stroke icons everywhere** — every icon visible in the design must be a zcat stroke icon via clone+swap. Even if the exact icon doesn't match perfectly, use the closest available one and note it for the user. NEVER use emoji, Unicode, or text characters as icons
12. **Action bars are balanced** — every right-aligned button has a supporting left-side element (Search, heading, filters). No lonely buttons
13. **Stat cards have icon backgrounds** — every stat card has a 40×40 icon BG frame with a zcat stroke icon inside, using a subtle color variable fill. Flat text-only stat cards are not acceptable

### Consistency Across Screens

**Same pattern for same screen type.** When building multiple screens for one product:

- If one list page uses stretch table + search + filter + create button → ALL list pages use that layout
- If one detail page has stat cards at top → ALL detail pages show stat cards at top
- Sidebar menu structure, Sub Header format, table column styling, card dimensions, section heading typography, action bar layout, and pagination placement must be consistent
- Build the first screen, get approval, then replicate the same patterns for subsequent screens
- Only deviate when the screen type is genuinely different (list vs detail vs settings vs wizard)

**CRITICAL: Component usage does NOT decay across screens.** If screen 1 uses Button, Text Box, Badge, Table AI, and Card BG components, then screens 2-10 MUST also use these same components. Agents tend to "drift" after the first screen — using components for screen 1 then gradually falling back to manual frames for subsequent screens. This is the #2 failure pattern. Before building each screen, re-read the component checklist in zcat.md. The wireframe defines WHAT to build, the component checklist defines HOW to build it — and HOW never changes between screens

### Design Uniforms — Mandatory Specs for All Screens

These are the fixed visual specs that EVERY screen must use. They ensure uniform, polished output across all pages in a product.

**Card specs (stat tiles, info cards, dashboard widgets):**

| Property | Value |
|----------|-------|
| Background | Card BG component (bind to `color/bg/surface`) |
| Border radius | 6px (the component default — don't change it) |
| Internal padding | 16px all sides |
| Gap between label and value | 8px |
| Stat value font | 24px SemiBold, `color/text/primary` |
| Stat label font | 12px Regular, `color/text/secondary` |
| Cards in a row — gap | 16px |
| Cards in a row — width | All FILL (equal width, stretch to container) |
| Min card height | Let auto-layout determine (no fixed height) |

**Section containers (bordered info blocks, config panels):**

| Property | Value |
|----------|-------|
| Background | `color/bg/surface` |
| Border | 1px solid, `color/border/default` |
| Border radius | 6px |
| Internal padding | 16px all sides |
| Section heading → content gap | 12px |
| Between items inside section | 12-16px |

**Shadows and elevation:**
- Card BG provides its own subtle shadow — don't add manual shadows
- Popup / dialog gets shadow from the Popup component
- No manual `effects` array shadows on frames — use Card BG or the component's built-in shadow

**Layout alignment:**

| Rule | Spec |
|------|------|
| All direct Container children | `layoutSizingHorizontal = "FILL"` |
| Multi-column rows | HORIZONTAL auto-layout, gap 16px, each column FILL width |
| Column width ratios | Use FILL on both for 50/50, or fixed px on the smaller + FILL on the larger for 40/60 |
| Vertical stacking | VERTICAL auto-layout, `counterAxisAlignItems = "MIN"` (left-align) |
| Center-aligned content | Only for empty states and popup content — everything else left-aligned |

**Spacing rhythm (use exactly these values — no exceptions):**

| Between... | Gap |
|------------|-----|
| Major sections (e.g., stat cards row → info section) | 24px |
| Sub-sections within a card/panel | 16px |
| Section heading → its content | 12px |
| Form fields (vertical stack) | 16px |
| Label → its input | 4px |
| Cards in a horizontal row | 16px |
| Container children (Container Header → Table → Pagination) | 10px (Container itemSpacing) |
| Toggle/checkbox rows | 12px |
| Help text below a control | 4px |

**Text styles (use these exact combinations everywhere):**

| Role | Font Size | Weight | Color Variable |
|------|-----------|--------|---------------|
| Section heading | 16px | SemiBold (600) | `color/text/primary` |
| Sub-section heading | 14px | SemiBold (600) | `color/text/primary` |
| Body text / table cell | 14px | Regular (400) | `color/text/primary` |
| Form label | 14px | Medium (500) | `color/text/primary` |
| Caption / metadata | 12px | Regular (400) | `color/text/secondary` |
| Help text / description | 12px | Regular (400) | `color/text/placeholder` |
| Stat card value | 24px | SemiBold (600) | `color/text/primary` |
| Stat card label | 12px | Regular (400) | `color/text/secondary` |
| Badge / tag text | Component default — don't override |

**Button placement:**

| Context | Alignment |
|---------|-----------|
| Action bar (search + button) | Search left, buttons right. Use `counterAxisAlignItems = "CENTER"` on the row, `mainAxisAlignItems = "SPACE_BETWEEN"` |
| Form footer (Save + Cancel) | Right-aligned. Cancel (outline) left of Save (fill) |
| Popup footer (Back + Continue) | Right-aligned. Back (outline) left of Continue (fill) |
| Danger zone (Delete button) | Left-aligned within its section |

**Danger zone spec:**

| Property | Value |
|----------|-------|
| Wrapper | Attention Box (type=Error) OR manual frame with 1px `color/border/strong` border, `color/bg/surface` fill |
| Internal padding | 16px |
| Heading | 14px SemiBold, `color/text/primary` |
| Description | 12px Regular, `color/text/placeholder` |
| Separation from content above | 24px gap minimum |

---

## Data Display

### Table vs Cards vs List vs Side Menu

**When this comes up:** The user wants to display a collection of items and hasn't specified the layout.

**Ask the user:** "Are you displaying structured data with multiple comparable attributes, or more visual/summarized content — or is this a list where picking one item shows its details elsewhere on the page?"

**Use Table when:**
- Data has 4+ comparable columns (e.g., name, status, date, owner)
- Users need to scan, sort, or filter across rows
- The data is uniform in structure (every item has the same fields)
- Users need to compare values across items quickly
- Bulk actions (select all, batch delete) are required

**Use Cards when:**
- Each item is visually distinct or has a hero image/preview
- Data has 3 or fewer key attributes per item
- Items need prominent action buttons or status indicators
- The layout needs to work well on mobile (cards stack naturally)
- Items are browsed, not compared side-by-side

**Use List when:**
- Items are simple: one primary line + optional secondary text
- Space is constrained (sidebar, dropdown panel, search results)
- Items are scanned sequentially, not compared
- You need compact density without sacrificing readability

**Use Side Menu (inside Container) when:**
- Selecting an item updates a detail view shown elsewhere in the Container —
  this is a master-detail / list-detail page, not a standalone list
- There are typically 8+ items (same threshold as Sidebar Nav — this is that
  same pattern, just nested inside the Container instead of being the page's
  global navigation)
- Item labels are short (names, IDs); the list itself carries no rich per-item
  detail — the detail view is where the real content lives
- Example: Catalyst's own Data Store → Tables list (left) driving the schema
  view (right)

**Use both when:**
- The user needs a toggle between "table view" and "card/grid view" (common in file managers, project dashboards)

**Default:** Table for 4+ columns of uniform data. Cards for 3 or fewer attributes with visual emphasis. List for simple, single-line items. Side Menu when selecting an item drives a detail view elsewhere on the page.

### Building a Card (Card BG)

**Component:** `search_design_system("Card")`, confirmed key
`f94642162a404b4dd9b0c2c9e8c7e3d1a8ba330e`, component_set.

- **Bind every fill/stroke to a zcat color variable — never hardcoded hex.**
  Card BG is a themed-surface component; using it manually-styled with raw hex
  defeats the point of it existing.
- **Detach to add real content inside it** — a number, label, icon, whatever
  the card needs — same principle as Accordion and Dropdown Menu: detaching
  is for inserting content, never for restyling the shell. Keep the card's own
  padding, radius, and color binding exactly as imported.

> **Unconfirmed:** Card BG's exact variant/property names are not documented
> in the manifest — but its own description ("themed surface colors") is now
> confirmed accurate by real examples below. Verify the specific property name
> via `zcat_get_component("Card BG")` before calling `setProperties()`.

**Card BG plays (at least) three distinct roles — pick by what the card is
for, not by copying whichever example is nearest:**

1. **Stat tile / info card** (e.g. a Function Overview's stat row) — **neutral**
   Card BG. When the value inside already carries semantic color (a green
   success rate, a red error count), a colored card background competes with
   that signal instead of supporting it — if every card is tinted alike, the
   one value that should draw the eye stands out less, not more. Let the card
   be a neutral container; let the value's color do the signaling.

2. **Catalog / directory card** (e.g. the Connections page's service grid —
   Google, MailChimp, DropBox, each its own pastel tile) — a **themed** Card
   BG, one color per item, is correct here. This is exactly the "themed
   surface colors" Card BG's own description names. These cards aren't
   measurements needing semantic restraint — they're browsable identities,
   and a distinct tint per item helps differentiate them at a glance.

3. **Selectable option tile** (e.g. the Import Dataset wizard's data-source
   picker — Zoho Analytics, Amazon S3, etc.) — **neutral** tile background;
   the icon itself carries the brand color, not the card. These are single-
   select choices in a flow, not a browsable directory, so the card stays
   quiet and the icon does the differentiating. Add a selection state (border
   highlight) when one is chosen — Card BG's `State` property, if it has one,
   is unconfirmed; verify before relying on it.

Reserve a colored/brand card outside these three for genuine one-off emphasis
— highlighting a single card among otherwise-neutral peers, or a deliberate
call-to-action — not as a default.

### Card Grid Layout (Applications / Catalog pages)

**When a page shows items as cards instead of a table, use this pattern:**

**Container structure:**
```
Container (VERTICAL, padding 16/0/16/0, itemSpacing 10)
├── Container Header (FIXED width, HUG height, internal padding 6/14/6/14)
│   ├── Search (left) + filter dropdowns + Create button (right)
└── Cards Container frame (FILL horizontal, auto-layout VERTICAL, 16px padding left+right)
    ├── Cards Row 1 (horizontal auto-layout, 16px gap, 3 cards FILL width)
    │   ├── Card 1, Card 2, Card 3
    └── Cards Row 2 (same)
        ├── Card 4, Card 5, Card 6
```

**Individual card layout:**
```
Card frame (FILL width, Card BG fills, 16px padding, border-radius 6px)
├── Icon BG (40x40, top-left, cornerRadius 10, subtle color fill)
│   └── Stroke icon (18x18, centered)
├── Badge (top-RIGHT corner, positioned absolutely or via spacer)
├── Title (Body/SemiBold/16, color/text/primary) — below Icon BG
├── Subtitle (Body/Regular/14, color/text/secondary) — "Production · Java"
└── Timestamp (Body/Regular/12, color/text/placeholder) — "Last deployed: 2 hours ago"
```

**Key rules:**
- Badge goes at **TOP-RIGHT** of the card, NOT below the title/subtitle
- Icon BG at top-left, then title + subtitle below it as a group
- Timestamp at the bottom
- 3 cards per row, all FILL width (equal sizing)
- Cards use Card BG component (detached for content), with border from `color/border/default`
- All text uses zcat text styles and color variables — NEVER hardcode

### List Item Selection: Highlight vs Checkbox

**When this comes up:** A sidebar list or master list selects items to show
detail in an adjacent panel, and you need to decide whether list items should
have checkboxes.

**Use highlight-only (NO checkboxes) when:**
- The list is single-select — clicking an item shows its detail (the standard
  case for Data Store tables, Functions, Cron jobs, File Store, Connections,
  API endpoints, and virtually all Catalyst sidebar lists)
- The detail panel shows one item at a time
- There are no batch operations on the list

**Use checkboxes when (rare):**
- The page supports batch operations on multiple items simultaneously
  (e.g., "Delete Selected", "Export Selected")
- Position each checkbox at the **leading edge** (left corner) of the list item
- Add a "Select All" checkbox at the top of the item list
- The selected item for detail view is still highlighted — checkbox and
  highlight serve different purposes (checkbox = batch select, highlight =
  active detail)

**Default:** Highlight-only. Do NOT add checkboxes unless the wireframe or PRD
explicitly shows batch operations. Adding checkboxes to a single-select
sidebar is a common mistake — it confuses the interaction model by implying
"select many" when the detail panel can only show one.

---

### Building a Side Menu inside Container (Master-Detail)

**Structure:** Container padding is **16 top, 0 right/bottom/left** — each panel manages its own
internal padding. Two panels sit side by side, separated by a **Divider**
(`search_design_system("Divider")`, confirmed key
`ae8ace032eb5e3ff8b86424a97be7a3728bde3bd`, Direction: "Vertical",
`layoutSizingVertical = "FILL"`):

- **List panel** (narrower, fixed width ~260px): a mini action bar (search left
  with search icon — SWAP the default icon, primary button right — e.g.
  "+ New X") on top, then the item list below — built from **Nav Button**,
  repeated, with the selected item highlighted. **No checkboxes** for
  single-select lists (see "List Item Selection" above).
- **Detail panel** (FILL width, own padding ~16px): shows the selected item's
  content.
- **Divider is REQUIRED** — it creates the visible split line between sidebar
  and content. Without it, the two panels visually merge and the layout looks
  broken.

**Extends to three panels when there's a separate live output/result area** —
e.g. an API endpoint tester: list (endpoints) → config (params, a request
value with copy action) → output (a read-only **Code Editor**, per its
buildNotes, showing the response). Same Divider between each panel; the same
principle just repeated once more.

**Primary tabs are scope-relative, not Sub-Header-exclusive.** A page's
overall primary tabs (the ones switching the whole page — e.g. "Tables | ZCQL
Console") still go in the Sub Header, first preference, as already documented.
But when a side menu + detail view exists, the detail view is its own scoped
unit — so tabs at the top of *that* detail view (e.g. "Schema View | Scopes &
Permissions | Data View") are **also primary tabs**, built with primary tab
treatment, even though they physically live in the Container next to the side
menu rather than in the actual Sub Header instance.

**Stretch vs Boxy still applies exactly as documented** — just scoped to the
detail panel's own content, not the whole Container. If the detail panel's
only content is an action bar + table (as in a Schema View tab), that's
Stretch. If it has other sections too, that's Boxy.

> **Unconfirmed:** Nav Button has no confirmed key in the manifest
> (`status: "manual"`). Tabs itself has no documented Primary/Secondary
> variant property either, so "primary tab treatment" here is a placement/
> styling intent, not yet a specific `setProperties()` call — confirm both via
> `search_design_system` / `zcat_get_component` before building.

---

### Empty State Pages

**When this comes up:** A page that shows when no data exists yet (no databases,
no functions, no applications).

**ALWAYS use the Empty State component** (key `03321dc06395aa6b94783d0289637de8ddc82de0`,
type `component`). NEVER manually build empty state UI with frames, text, and
buttons. The component has configurable boolean properties:

| Property | Default | Purpose |
|----------|---------|---------|
| Show Illustration | true | Illustration graphic at top |
| Show Heading | true | Title text (e.g. "No Database Yet") |
| Show Description | true | Subtitle text (e.g. "Create your first database...") |
| Show Primary Button | true | Fill CTA button (e.g. "Create Database") |
| Show Outline Button | true | Outline secondary button (e.g. "View Docs") |

Import: `await figma.importComponentByKeyAsync('03321dc06395aa6b94783d0289637de8ddc82de0')`
then `.createInstance()`. Update heading, description, and button text via
`findAll(n => n.type === 'TEXT')`.

**Rules:**

1. **NO Container Header** — there's nothing to search or filter. Never show
   Search, filter dropdowns, or action bars on an empty state page.
2. **NO duplicate CTAs** — if the empty state has a "Create X" button, do NOT
   also put a "Create X" button in the Sub Header. The CTA lives in ONE place
   only: the Empty State component.
3. **Sub Header stays simple** — title + Help only (instance, not detached).
4. **Container padding = 0 all sides**, `itemSpacing = 0`.
5. **Empty State component** centers itself inside an Empty State Area frame
   (FILL both axes, center both axes alignment).

**Structure:**
```
Sub Header (INSTANCE — title + Help only, NO buttons)
Body (padding 14px all sides)
└── Container (padding 0/0/0/0, itemSpacing 0)
    └── Empty State Area (FRAME, FILL both, center both axes)
        └── Empty State (INSTANCE — component, key 03321dc0...)
```

**Common mistakes:**
- Agents manually build empty state UI with frames + text + buttons instead of
  using the Empty State component — this is ALWAYS wrong
- Agents add Container Header with Search + filters — empty state = no action bar
- Agents duplicate the CTA in both Sub Header and empty state

---

### Table AI Variant: Stretch vs Boxy

**When this comes up:** You're placing a Table AI inside a Catalyst Container and
need to decide the Style property.

**ALWAYS use Table AI** (key `f3a77aaa2d8b332d2c86a9cb77ed6a4f92305c07`), NEVER legacy Table.
Table AI is zero-detach — configure via `setProperties({ "Style": "Stretch" })` or `"Boxy"`.

**Use Stretch when:**
- The Container's content is a list page: action bar (search + filters +
  primary/secondary buttons) plus the table, and nothing else
- There is one context on the page — the table is the whole point of the screen

**Use Boxy (bordered/boxed) when:**
- The page has multiple sections besides the table — e.g. a detail view with
  an info card, stats tiles, and a table of related records
- The table is one section among others, not the entire page's content

**Default:** Stretch for single-context list pages. Boxy for detail/multi-section pages.

**CRITICAL: Table AI MUST be responsive.** The table must fill the Container width — set `layoutSizingHorizontal = "FILL"` on the table instance after appending it to the Container. A table that doesn't stretch to the Container edges is a broken layout.

**Table AI column type selection — match data, not wireframe icons:**

| Column Data | CORRECT Column Type | WRONG (agent mistake) |
|-------------|--------------------|-----------------------|
| Person name, user, owner | AvatarName | Text (loses the avatar) |
| Database name, service name | Text or IconText | AvatarName (person icon on a database name is wrong) |
| Status (Available, Stopped, Error) | Badge | Text (loses color-coded status) |
| Date/time value | Date | Text (loses date formatting) |
| Region, compute class, storage size | Text | AvatarName (avatar icon on "us-east-1" is absurd) |
| Connections "45/200" | Text | AvatarName |
| Row actions | Threedot | Button (usually too heavy) |

**NEVER use AvatarName for non-person data.** AvatarName shows a person icon/avatar next to text — it is ONLY for user names, owner names, assignees, or entities that represent a person. Using AvatarName for database names, regions, storage sizes, or connection counts is WRONG and makes the table look unprofessional. If the wireframe shows random icons next to every column, IGNORE those icons and pick the correct column type based on the DATA.

**Table AI properties (confirmed):**
- `Style`: "Stretch" or "Boxy"
- `Columns`: "3", "4", "5", "6", "7", "8"
- `Show Checkbox`: boolean (default false)
- `Show Threedot`: boolean (default true)
- `Show Pagination`: boolean (default true)
- `Col 1` through `Col 8`: instance swap (value = component node ID, NOT key)

**How the two differ structurally, once chosen:**

- **Stretch:** Container padding = **16 top, 0 right, 0 bottom, 0 left**,
  `itemSpacing = 10`. The 16px top gives breathing room above the Container
  Header. Use the **Container Header component** (detached for content) as the
  action bar — it has its own internal padding (6/14/6/14). Table AI sits below
  running edge-to-edge. **Pagination is a SEPARATE component instance** at the
  bottom — set Table AI `Show Pagination = false`.
  ```
  Container (VERTICAL, padding 16/0/0/0, itemSpacing 10)
  ├── Container Header (FIXED width, HUG height, internal padding 6/14/6/14)
  ├── Table AI (Stretch, FILL horizontal, FILL vertical, Show Pagination = false)
  └── Pagination (FILL horizontal, FIXED vertical, internal padding 6/16/6/16)
  ```
  Body frame (Container's parent): padding 14px all sides, itemSpacing 10.
- **Boxy:** Container padding = **16px all sides**, `itemSpacing = 10`. The
  table sits within that padded space like any other section.
- **Cards view:** Container padding = **16 top, 0 right, 16 bottom, 0 left**,
  `itemSpacing = 10`. Top and bottom breathing room, cards grid edge-to-edge.
- **Empty state:** Container padding = **0 all sides**, `itemSpacing = 0`.

---

### Filter Overflow: Inline Dropdowns vs Filter Icon Menu

**When this comes up:** A list page's action bar needs filter controls and you
must decide whether to show them as separate dropdowns or collapse them.

**Use inline dropdowns when:**
- There are 1-3 filters (e.g. Runtime, Status, Type)
- Each shows as its own dropdown in the action bar, next to Search

**Use a Filter icon + menu when:**
- There are 4 or more filters — showing them all inline would clutter the
  action bar
- Collapse them behind a single Filter icon (Icon Button) placed in the action
  bar. Clicking it opens a menu/panel containing all the filter controls.

**Default:** Inline for 1-3 filters. Filter icon + menu for 4+. (Mirrors the
existing action-overflow rule: inline for 1-3, context menu for 4+ — same
logic applied to filters.)

**Showing applied filters:** Once a filter is applied (inline or via the menu),
show it as a removable chip below the action bar — the **Tag** component
(`search_design_system("Chip")`, confirmed key
`521cb36aff97e00dc59f5c37b5f04a684b475930`), text set to "Label: Value", with
its own `Removable` variant property set to `true`. The close (✕) is native to
the component via that property — do not compose it separately from Badge +
Icon Button. `whenToUse` for this component literally names "Filter chips" as
a primary case; it exists for exactly this. Add a "Clear All" link/button when
any filter is active.

**Do not treat a dropdown's focused/active border as an "applied" indicator.**
That styling is the control's normal focus state, not a deliberate signal that
a filter is set. The chip row is the only place that communicates which
filters are currently applied — the dropdown itself just shows its selected
value like any other form control.

**Alternate style — a "Label : Value" chip bar in place of dropdowns**
(observed on the Logs page: "Log Type : Access", "Resources : zcat-mcp", "Time
Period : Today"). Use this instead of separate dropdown controls when the
filters are always-set query parameters (a log/monitoring view that always has
*some* type, resource, and time range selected) rather than optional toggles a
user turns on and off. Same **Tag** component as above
(`search_design_system("Chip")`, key
`521cb36aff97e00dc59f5c37b5f04a684b475930`), text "Label : Value" — but here
`Removable` stays `false`. Each chip is clickable to change its value, not
remove it; there's no "apply" step and no "Clear All" — clearing isn't the
point, changing the query is. This is a different filter paradigm from the
dropdown-bar rule above (`Removable: true`, chips confirm/clear a toggled-on
filter), not a replacement for it — pick by whether the filters are optional
(dropdown bar) or always-active query state (chip bar), and set `Removable`
to match which one you're building.

---

### Description List vs Key-Value Pairs

**When this comes up:** The user wants to show detail/summary information about a single entity (e.g., connection details, database info, configuration summary).

**MANDATORY: Use components, not manual text.**

Two components exist for label:value displays — pick by scope:

| Component | Key | Type | Use when... |
|-----------|-----|------|-------------|
| **General Details** | `6dd180e6490c68971c8c9b5cc963349b711a5e5d` | component | You need a pre-built section block with a heading + multiple KV rows (e.g., "Connection" section with HOST, PORT, DATABASE). Import once, detach, customize the rows |
| **Key Value Pair** | `2d82f5c0a6c24ab0370c320d0044cc8346666077` | component_set | You need individual KV rows to arrange yourself (e.g., inline metadata in a card header). Layout=Horizontal (default), State=Default |

**CRITICAL: Label:Value alignment is ALWAYS horizontal.**
- Label on the LEFT, value on the RIGHT — same row
- NEVER stack label on top with value below
- Key Value Pair's `Layout` property MUST be `Horizontal` (the default) — never set to `Vertical`
- This applies to ALL read-only info displays: connection details, metadata, configuration summaries, review summaries, entity properties

**Use General Details (preferred) when:**
- Displaying a section of read-only info (Connection section: HOST, PORT, DATABASE, CONNECTION STRING)
- The section needs its own heading ("Connection", "General Details", "Configuration")
- There are 3-8 related fields in one block
- Import → detach → update the heading text and KV row labels/values

**Use Key Value Pair individually when:**
- Showing 1-3 quick facts alongside other content (in a stat card, in a card header)
- Building a custom arrangement (two-column grid of KV rows)
- The data is supplementary metadata, not a dedicated section

**Default:** General Details for dedicated info sections. Individual Key Value Pair for inline/supplementary metadata. **NEVER build label+value text manually** — the components handle alignment, spacing, and color binding correctly.

---

### KPI/Stats Cards vs Inline Metrics

**When this comes up:** The user wants to display numeric summaries or performance indicators.

**Ask the user:** "Should these metrics be the primary focus of the page, or supporting context for other content?"

**Use KPI/Stats Cards when:**
- Metrics are the hero content of a dashboard or overview page
- Each metric needs a label, value, trend indicator, and optional sparkline
- There are 3-6 key metrics to highlight
- Users glance at these first before diving into details below

**Use Inline Metrics when:**
- Metrics provide context within a section (e.g., "12 tasks due today" in a task list header)
- There are 1-2 metrics that support adjacent content
- Metrics are secondary to the main content on the page

**Default:** KPI/Stats Cards for dashboard headers and overview pages. Inline metrics for contextual data within sections.

---

## Input Selection

### Dropdown vs Radio Group vs Segmented Control

**When this comes up:** The user needs a single-select input and hasn't specified the control type.

**Ask the user:** "How many options are there, and do users need to see all options at once?"

**Use Dropdown (Select) when:**
- There are 6+ options
- Screen space is limited
- The list of options may change dynamically
- The selected value is rarely changed after initial selection

**Use Radio Group when:**
- There are 2-5 options
- All options need to be visible without interaction
- Users benefit from reading every option before deciding
- Options have descriptions or sub-labels that help the decision

**Use Segmented Control when:**
- There are 2-4 options that represent view modes or filters
- Switching between options changes the visible content immediately
- Options are short labels (1-2 words each)
- The control acts more like a toggle than a form field

**Default:** Dropdown for 6+ options. Radio Group for 2-5 options in forms. Segmented Control for view/filter toggles.

---

### Text Input vs Textarea vs Rich Editor

**When this comes up:** The user needs a text entry field.

**Ask the user:** "Is this a short value (name, title), a longer block of plain text, or formatted content?"

**Use Text Input when:**
- Expected input is a single line (name, email, URL, search query)
- Maximum length is under 100 characters
- No line breaks are needed

**Use Textarea when:**
- Expected input is multi-line plain text (description, notes, comments)
- Content is 1-5 paragraphs
- No formatting (bold, lists, links) is needed
- Character count feedback is useful

**Use Rich Editor when:**
- Users need formatting (bold, italic, lists, headings, links)
- Content will be rendered as HTML/rich text elsewhere
- Input is long-form (documentation, articles, detailed descriptions)

**Default:** Text Input for labels and single values. Textarea for descriptions and notes. Rich Editor only when formatting is explicitly needed.

---

### Checkboxes vs Multi-Select Dropdown vs Token Input

**When this comes up:** The user needs a multi-select input.

**Ask the user:** "How many options exist, and do users need to see their selections at a glance?"

**Use Checkboxes when:**
- There are 2-7 options
- All options should be visible without interaction
- Users benefit from scanning every option
- Selections are independent of each other

**Use Multi-Select Dropdown when:**
- There are 8+ predefined options
- Space is constrained
- Selected values can be shown as tags/chips in the closed state
- The option list is fixed and known

**Use Token Input when:**
- The option set is very large or dynamic (users, tags, categories)
- Users need to search/filter to find options
- Selections are shown as removable chips/tokens
- Options may be created on the fly (e.g., "Add new tag")

**Default:** Checkboxes for 2-7 visible options. Multi-Select Dropdown for 8+ fixed options. Token Input for searchable or dynamic option sets.

---

### Toggle vs Checkbox for Boolean

**When this comes up:** The user needs a true/false or on/off input.

**Ask the user:** "Does this setting take effect immediately, or is it saved with a form submission?"

**Use Toggle when:**
- The setting takes effect immediately (no "Save" button)
- It represents an on/off state (notifications, dark mode, feature flags)
- It appears in a settings page or configuration panel
- The label reads naturally as "[Feature] is on/off"

**Use Checkbox when:**
- The value is submitted as part of a form with a Save/Submit button
- It represents agreement or selection ("I agree to terms", "Remember me")
- It appears alongside other form fields
- Multiple related boolean options are grouped together

**Default:** Toggle for instant-apply settings. Checkbox for form-submitted values.

---

### Number Input vs Text Input with Validation

**When this comes up:** The user needs to capture a numeric value.

**Ask the user:** "Do users need increment/decrement controls, or will they type the number directly?"

**Use Number Input (Stepper) when:**
- Values are within a small range (1-100, quantities)
- Users commonly adjust by +1/-1
- Precision to whole numbers or fixed increments
- The field benefits from up/down arrows or +/- buttons

**Use Text Input with Validation when:**
- Values can be very large (phone numbers, IDs, prices with decimals)
- Users will paste or type the full value
- The format needs a mask (e.g., currency formatting, phone number)
- Increment/decrement would be impractical

**Default:** Number Input for small-range whole numbers. Text Input with validation for large numbers, decimals, or formatted numerics.

---

## Navigation & Structure

### Popup Modal vs Full-Page Modal vs Drawer

**When this comes up:** The user needs an overlay or secondary surface for content.

**Ask the user:** "How much content does this overlay contain, and does the user need to reference the page behind it?"

**Use Popup Modal when:**
- Content is a short form, confirmation, or message (fits in 400-600px width)
- The action is quick and focused (delete confirmation, rename, quick add)
- User does not need to see the page behind the modal
- There are 1-5 form fields or a single decision

**Use Full-Page Modal when:**
- Content is a multi-step flow or long form (creation wizard, detailed editor)
- The content needs full viewport width
- The user is entering a focused sub-task that replaces the current context
- There are 6+ form fields or multiple sections

**Use Drawer when:**
- Content is supplementary detail (preview panel, properties sidebar, activity log)
- The user needs to reference the page behind it while viewing the drawer
- Content is a list or detail view that doesn't need centering
- Opening/closing is frequent during a workflow

**Default:** Popup Modal for confirmations and quick forms. Drawer for detail panels and supplementary content. Full-Page Modal for complex creation flows.

### Popup Component — MANDATORY Structure Rules

**The zcat Popup component has a specific structure. NEVER deviate from it.**

**Popup close action is ALWAYS in the FOOTER, NEVER in the header:**
- The Popup component does NOT have an X close button in the header
- Close/Cancel is a Ghost button in the footer — NEVER add a manual X icon in the popup header
- NEVER add a manual X close icon in the popup header — this is not the zcat pattern

**Popup footer layout — depends on whether it has a Stepper:**

**Simple form (no stepper):**
```
Footer: Cancel (Ghost, LEFT) ———————— Create (Fill, RIGHT)
```

**Wizard with stepper:**
```
Footer: Back (Outline, LEFT) ———————— Cancel (Ghost, RIGHT) + Continue (Fill, RIGHT)
```
- Back goes LEFT because it navigates backward in the wizard
- Cancel + Continue/Create go RIGHT together
- On the first step: no Back button, just Cancel (left) + Continue (right)
- On the last step: Back (left) + Cancel + Create (right)

**BAD (agent keeps doing this):**
```
Popup
├── Header: "Create Database" + ✕ close button  ← WRONG: no X in header
├── Content...
└── Footer: Back + Continue  ← WRONG: missing Cancel, wrong position
```

**GOOD (zcat Popup pattern — simple form):**
```
Popup
├── Header: "Popup Heading" (title only, NO close button)
├── Description text (optional)
├── Content (form fields, selections, etc.)
└── Footer: Cancel (Ghost, left) ——————— Create (Fill, right)
```

**GOOD (zcat Popup pattern — wizard with stepper):**
```
Popup
├── Header area:
│   ├── Title "Create Database"
│   └── Stepper component (responsive, FILL width) ← Stepper is ALWAYS in the header
├── Content (step-specific form fields — changes per step)
└── Footer: Back (Outline, left) ——————— Cancel (Ghost, right) + Continue (Fill, right)
```

**Stepper/Tabs in Popup header rules:**
- Stepper or primary Tabs ALWAYS go in the Popup HEADER area, directly below the title — NEVER in the content body
- Stepper must be responsive (layoutSizingHorizontal = FILL) to span the full popup width
- Only the current step's content appears in the content area below
- The Stepper component must be used — NEVER draw circles + lines manually

**Popup body and component sizing:**
- Popup body width should be appropriate for the content (500-700px for wizard flows)
- ALL components inside the Popup (Text Box, Dropdown, Radio Button, etc.) MUST be responsive — use layoutSizingHorizontal = FILL so they stretch to fill the popup body width
- NEVER leave form components at fixed narrow widths inside a wider popup — they look broken and unprofessional
- Form field labels go ABOVE the field, not beside it (inside popups)

**Other Popup rules:**
- ALWAYS use the Popup component — NEVER build a manual modal frame
- ALWAYS use Popup Blur behind the Popup for the backdrop overlay
- ALL form elements inside the Popup must use zcat components (Text Box, Dropdown, Radio Button, Toggle Button, Checkbox)
- Selection cards (like compute instance sizes) should use Radio Button component or Card BG with proper selected/default states — NEVER hand-draw bordered rectangles

### Grouping fields inside a modal or form

**When this comes up:** A modal/form has more than 3-4 fields and some of them
are more related to each other than to the rest.

**Wrap in a bordered sub-panel (neutral Card BG) with its own sub-heading
when:**
- 3+ fields together configure one conceptual thing (e.g. an alert's trigger
  logic: conditions, criteria, frequency) — the border signals "these fields
  are one unit," separate from the rest of the form
- This is the same neutral Card BG as a stat tile (see "Building a Card" above)
  — organizational grouping, not a value needing semantic color, so neutral

**Use a plain sub-heading, no border, when:**
- The section is a single field or a repeatable list (e.g. "Notify Emails" →
  Email Notifier 1, with a "+" Icon Button to add more) — there's nothing to
  visually separate it FROM, so a border would just add noise
- The "+" affordance for adding another instance is an Icon Button, same
  component as the three-dot trigger elsewhere, different icon and role

**Default:** Ungrouped, top-level fields for the form's primary identity
(name, type, main selector). Bordered sub-panel + sub-heading for a cluster of
configuration fields. Plain sub-heading for a single field or repeatable list.

**Optional/rarely-needed fields collapse behind a disclosure toggle.** When a
form has a group most users won't touch (e.g. throttling limits on a webhook),
hide it behind a "Show Advanced Settings" / "Hide Advanced Settings" link with
a chevron, collapsed by default. This is a lightweight expand/collapse toggle,
not the full Accordion component — no header row with its own chrome, just a
text link that reveals or hides a section. Once expanded, the revealed content
still follows the same bordered-panel-if-multi-field rule as any other group.

**Secondary tabs can nest inside a grouped panel, not just the Container
directly.** When tabs switch between sub-views of one specific group (e.g.
"Params | Headers" configuring a webhook's Destination), they sit inside that
group's own bordered panel, scoped to it — not at the top of the whole
modal/Container. Same secondary-tab rule as always, just one level deeper.

---

### Tabs vs Sidebar Nav vs Accordion

**When this comes up:** The user needs to organize content into sections within a page.

**Ask the user:** "Are the sections peers of equal importance, or is there a primary section with secondary details?"

**Use Tabs when:**
- There are 2-7 peer sections of roughly equal importance
- Users switch between sections frequently
- Only one section is viewed at a time
- Section labels are short (1-3 words)

**Use Sidebar Nav when:**
- There are 8+ sections (e.g., settings pages, documentation)
- Sections are grouped into categories
- The page is a dedicated settings or configuration area
- Users need to see all available sections at a glance

**Use Accordion when:**
- Sections can be expanded independently (FAQ, grouped details)
- Users may need to see multiple sections simultaneously
- Content in each section varies significantly in length
- Sections are viewed infrequently or only as needed

**Default:** Tabs for 2-7 peer sections. Sidebar Nav for 8+ sections or settings pages. Accordion for independently expandable sections.

**Accordion shown open with custom detail content:**

When an Accordion panel needs to render open (expanded) with real detail
content inside — not just placeholder text — detach the instance to gain
access to its content frame, but never touch what the component shipped with:

- Keep the Accordion's own padding, gaps, colors, and radius exactly as
  imported — bound to the same zcat variables. Detaching is for inserting
  content, not for restyling the shell.
- Only the content inside the open panel changes — never the shell.

**Three confirmed content shapes** (observed directly on Catalyst's own AppSail
Configuration page — a real reference, not a guess):

1. **A table with its own mini action bar** — e.g. "Environment Variables":
   Search input (left) + a link/button (right, e.g. "Add Variable") as the
   action bar, then a Table below. This is the Stretch pattern from "Table
   Variant: Stretch vs Boxy" above, scoped to the accordion panel instead of
   the whole Container.
2. **A single editable value** — e.g. "Startup Command": a short description,
   an "Edit" link/button in the panel's top-right corner, and the current
   value shown below in a bordered/monospace box.
3. **Key Value Pair rows, single column** — e.g. "App Execution Settings": a
   sub-heading + "Edit" link, then stacked label:value rows (Memory: 512 MB,
   Disk: 256 MB, Port: 9000) — the inline arrangement from "Description List
   vs Key-Value Pairs" above, stacked vertically rather than in a row.

Pick whichever of these three matches the actual content — don't invent a
fourth shape when the content is metadata, a single setting, or a data table.

> **Unconfirmed:** the manifest does not yet document Accordion's open/expanded
> variant property name. Confirm it via `zcat_get_component("Accordion")` or
> `search_design_system` before calling `setProperties()` — an unrecognized
> property name is silently ignored rather than erroring.

---

### Inline Edit vs Detail Page vs Modal Edit

**When this comes up:** The user needs to let users modify an existing record.

**Ask the user:** "How many fields are being edited, and does the edit need the surrounding context?"

**Use Inline Edit when:**
- Editing 1-2 fields (rename, update status, change assignee)
- The change is quick and the user should stay in context
- The field is visible in a table row or card
- No validation beyond the field itself is needed

**Use Detail Page when:**
- Editing a full record with many fields (user profile, project settings)
- The record has sub-sections, related data, or tabs
- The edit is a primary workflow, not a side action
- URL-based navigation to the record is useful (deep linking)

**Use Modal Edit when:**
- Editing 3-6 fields that form a logical group
- The user needs to see the list/table behind for context
- The edit is a secondary action, not the primary page purpose
- Changes are saved/cancelled as a unit

**Default:** Inline Edit for 1-2 fields. Modal Edit for 3-6 fields. Detail Page for complex records with many fields.

---

### Breadcrumbs: When to Show vs Hide

**When this comes up:** The page hierarchy is more than one level deep.

**Ask the user:** "Is this a linear flow (wizard/checkout) or a hierarchical navigation (folder > subfolder > file)?"

**Use Breadcrumbs when:**
- Navigation depth is 3+ levels
- Users need to jump back to any ancestor level
- The hierarchy is meaningful (folders, categories, nested settings)
- The page is reached via drill-down navigation

**Hide Breadcrumbs when:**
- The page is a top-level view (dashboard, home)
- Navigation depth is 1-2 levels and a back button suffices
- The flow is linear/sequential (wizard steps)
- The surface is a modal or drawer (use the modal's own back/close)

**Default:** Show breadcrumbs at 3+ navigation levels. Hide on top-level pages and in overlays.

---

## Actions

### Inline Action vs Toolbar Action vs Context Menu

**When this comes up:** The user needs to provide actions on items in a list or table.

**Ask the user:** "Are these actions used frequently, or are they secondary operations users perform occasionally?"

**Use Inline Actions when:**
- There are 1-3 primary actions per item (Edit, Delete, View)
- Actions are used frequently and need one-click access
- The action applies to a single item only
- Space permits visible buttons or icon buttons in each row

**Use Toolbar Actions when:**
- Actions apply to one or more selected items (bulk actions)
- The toolbar appears on selection (contextual toolbar)
- There are 3-5 actions that apply uniformly across selected items
- Actions include operations like Export, Move, Archive

**Use Context Menu when:**
- There are 4+ actions per item and showing all inline would clutter the row
- Actions are secondary or infrequently used
- The action list varies based on item type or state
- Right-click or three-dot menu is the expected pattern

**Default:** Inline for 1-3 frequent actions. Context menu (three-dot) for 4+ or infrequent actions. Toolbar for bulk/multi-select operations.

### Building an Overflow (Three-Dot) Action Menu

**This applies everywhere a three-dot / overflow Icon Button appears** — Sub
Header page actions, the Filter Overflow icon, a table row's context menu, or
any other overflow trigger. Never place the three-dot Icon Button on its own;
it has no purpose without the menu it opens, so build both together.

1. **Import the trigger** — Icon Button, with its icon swapped (via the
   "Change Icon" instance-swap property) to a three-dot/overflow/kebab icon
   from the 425-icon set. Search for it — don't guess an icon name; none are
   listed in the manifest's icon summary.

2. **Import the menu** — Dropdown Menu (`search_design_system("Dropdown
   Menu")`, confirmed key `ba5cf29d43170458cbdf49ea186e6ff6e50579e0`).

3. **Detach the Dropdown Menu instance to set its real items** — the same
   principle as "Detaching a component for custom content": detach only to
   edit the menu's item list, never to restyle the menu shell (its padding,
   colors, radius, border stay exactly as imported). Add, remove, or edit menu
   item rows so the list matches what the screen actually needs (e.g., Edit /
   Download / Delete) — never leave placeholder items from the default import.

4. **Every menu item gets the correct semantic icon** — swap each item's icon
   instance to match its action (an edit action gets an edit/pencil icon, a
   delete action gets a trash icon, etc.), sourced via `search_design_system`,
   not invented or left mismatched.

5. **Position the menu absolutely when the trigger sits inside another
   auto-layout component** (a table row, a card, the Sub Header actions row).
   Placing the Dropdown Menu as a normal auto-layout child lets the parent's
   layout resize or squash it. Instead:
   - Set the Dropdown Menu frame's `layoutPositioning = "ABSOLUTE"`
   - Anchor it directly below (or beside, if there's no room below) the
     three-dot trigger, and constrain it so it renders at a fixed position
     regardless of how the parent frame resizes.

6. **Give the trigger an active appearance while its menu is open** — Icon
   Button already documents a `State` property (Default / Hover / Pressed /
   Disabled). Use **Pressed** as the "active, menu open" state — there is no
   separate "Active" value documented, so Pressed is the intended substitute,
   not a new state to invent.

> **Depends on an existing gap:** Icon Button's own resolution is unconfirmed
> in the manifest (`status: "manual"`, "may be a variant inside Buttons
> component set"). Confirm how it actually imports via `search_design_system`
> before relying on the steps above.

---

### Confirmation Dialog vs Inline Confirm vs Toast

**When this comes up:** The user needs feedback or confirmation for an action.

**Ask the user:** "Is this action destructive or irreversible?"

**Use Confirmation Dialog when:**
- The action is destructive and irreversible (delete, remove permanently)
- The consequences are significant (billing changes, data loss)
- The user needs to understand what will happen before proceeding
- The dialog should name the specific item being affected

**Use Inline Confirm when:**
- The action is mildly risky but reversible (archive, remove from list)
- A quick "Are you sure?" with Confirm/Cancel replaces the button in place
- The confirmation should be lightweight and fast

**Use Toast when:**
- The action succeeded and just needs acknowledgement
- The action is easily reversible (with an "Undo" link in the toast)
- No confirmation is needed before the action, only feedback after
- The feedback should not block the user's workflow

**Default:** Confirmation Dialog for destructive/irreversible actions. Toast with Undo for reversible actions. Inline Confirm for moderate-risk actions.

---

### Single CTA vs Split Button vs Button Group

**When this comes up:** A form or page needs one or more action buttons.

**Ask the user:** "Is there one primary action with variations, or multiple distinct actions?"

**Use Single CTA when:**
- There is one clear primary action (Save, Submit, Create)
- Secondary actions (Cancel, Reset) use plain or text buttons
- The form has a single submission path

**Use Split Button when:**
- There is one primary action with alternative variations (Save & Close, Save & New, Save as Draft)
- The primary action is used most often, and alternatives are accessed via dropdown
- You want to reduce button clutter while preserving access to variants

**Use Button Group when:**
- There are 2-4 distinct peer actions of similar importance (Approve, Reject, Defer)
- No single action is clearly dominant
- Actions represent different outcomes, not variations of one action

**Default:** Single CTA for standard form submissions. Split Button when there are action variants. Button Group for peer-level distinct actions.

---

## Layout

### Single Column vs Two Column vs Three Column

**When this comes up:** The user needs a page layout and hasn't specified the structure.

**Ask the user:** "What's the primary content type -- a form, a dashboard, or a content page with a sidebar?"

**Use Single Column when:**
- Content is a form or linear reading flow
- The page is a wizard, checkout, or focused task
- Mobile-first design is the priority
- Content width should be constrained for readability (max ~720px)

**Use Two Column when:**
- There is primary content + supporting sidebar (detail + properties, list + preview)
- A master-detail pattern is needed (list on left, detail on right)
- Settings pages with sidebar navigation + content area
- Standard split: 2/3 + 1/3 or 3/4 + 1/4

**Use Three Column when:**
- The app is a communication tool (sidebar + list + detail, like email)
- There are navigation, content, and properties panels simultaneously
- Information density is high and screen real estate is large (desktop-only)

**Default:** Single Column for forms and focused tasks. Two Column for content + sidebar patterns. Three Column only for communication/productivity apps on desktop.

---

### Cards Grid vs Table for Listings

**When this comes up:** The user wants to display a collection and you need to decide the layout.

**Ask the user:** "Do users need to compare data across items, or browse items visually?"

**Use Cards Grid when:**
- Items have a visual element (thumbnail, avatar, icon, preview)
- Items have 2-4 key attributes
- The grid should feel browsable (products, projects, team members)
- The layout needs to work across breakpoints (cards reflow naturally)

**Use Table when:**
- Users need to compare specific values across rows
- Items have 5+ attributes that matter for decision-making
- Sorting and filtering by columns is expected
- Data is dense and uniform (logs, transactions, records)

**Default:** Cards Grid for visual/browsable content. Table for data-heavy, comparable records.

---

### Sidebar Layout vs Tab Layout for Settings

**When this comes up:** The user needs a settings or configuration page.

**Ask the user:** "How many settings categories are there?"

**Use Sidebar Layout when:**
- There are 6+ categories of settings
- Categories are grouped into sections (General, Security, Integrations, etc.)
- Users navigate between categories frequently
- The settings page is a persistent part of the app

**Use Tab Layout when:**
- There are 2-5 categories of settings
- Categories are flat (not grouped into sections)
- The settings area is accessed occasionally
- Horizontal space is available for tab labels

**Default:** Sidebar Layout for 6+ categories. Tab Layout for 2-5 categories.

---

## Feedback

### Toast vs Alert Banner vs Inline Message

**When this comes up:** The user needs to communicate status or feedback to the user.

**Ask the user:** "Should the message interrupt the user, persist on the page, or appear temporarily?"

**Use Toast when:**
- The message is transient (success confirmation, action completed)
- The user does not need to take action based on the message
- The message should auto-dismiss after 3-5 seconds
- The feedback is about a completed action, not a page state

**Use Alert Banner when:**
- The message applies to the entire page or section (maintenance notice, permission warning)
- The message should persist until dismissed or the condition resolves
- The user may need to take action (upgrade plan, verify email)
- Severity is important to communicate (info, warning, error)

**Use Inline Message when:**
- The message relates to a specific field or section, not the whole page
- Validation feedback on a form field (error, success, hint)
- The message should appear next to the relevant content
- The feedback is contextual and position-dependent

**Default:** Toast for transient success/info messages. Alert Banner for page-level persistent messages. Inline Message for field-level or section-level contextual feedback.

---

### Skeleton vs Shimmer vs Spinner for Loading

**When this comes up:** Content is loading and the user needs a placeholder.

**Ask the user:** "Is the layout of the content known before loading, or is it unpredictable?"

**Use Skeleton when:**
- The layout is known and can be represented with placeholder shapes
- The page has been loaded before and the structure is cached
- You want to reduce perceived loading time
- Static gray shapes represent where content will appear

**Use Shimmer when:**
- Same as Skeleton but with an animated gradient sweep
- The loading time is 1-3 seconds (animation adds perceived progress)
- The page is loading for the first time and you want to signal activity

**Use Spinner when:**
- The layout is unknown or highly dynamic
- The loading state is brief (under 1 second) or very long (show with a message)
- The loading applies to a small section, button, or inline element
- A full-page or section-level loading indicator is needed without layout placeholders

**Default:** Shimmer for first-load content with known layout. Skeleton for subsequent loads of cached layouts. Spinner for brief or unpredictable loading states.

---

### Empty State: Illustration vs Simple Text

**When this comes up:** A page or section has no data to display.

**Ask the user:** "Is this a primary page that the user will see often, or a secondary/nested section?"

**Use Illustration + CTA when:**
- The page is a primary view (first-time dashboard, empty project list)
- The user needs to be guided to take their first action
- The empty state is a key onboarding moment
- There is a clear CTA (Create Project, Import Data, Invite Team)

**Use Simple Text when:**
- The section is nested or secondary (empty tab, no search results)
- The empty state is temporary and common (filtered list with no matches)
- An illustration would feel heavy or disproportionate
- A short message like "No results found" suffices

**Default:** Illustration + CTA for primary pages and onboarding moments. Simple Text for secondary sections and filtered-empty states.

---

### Progress Bar vs Progress Circle

**When this comes up:** The user needs to show progress toward completion.

**Ask the user:** "Is the progress part of a larger content area, or a compact indicator?"

**Use Progress Bar when:**
- Progress is shown within a content section (file upload, step completion)
- The bar can span the full width of a card or section
- Multiple progress indicators are stacked (storage usage, plan limits)
- Progress is the primary information in the area

**Use Progress Circle when:**
- Space is compact (inside a card, next to a label, in a table cell)
- The progress represents a single metric (task completion: 72%)
- The indicator needs to sit alongside other content without taking full width
- A circular shape fits the visual rhythm of the surrounding UI

**Default:** Progress Bar for wide, section-level progress. Progress Circle for compact, inline progress indicators.

---

## Spacing Reference

### Master Spacing Rules

**Spacing is critical — inconsistent spacing is the most common quality issue in generated designs.** Every value below is mandatory, not a suggestion.

**The spacing scale (only these values are valid):**
0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 128

No other values. No odd numbers. No 18, 22, 36, 44, etc.

### Container Spacing

| Context | Padding | Gap (between children) |
|---------|---------|----------------------|
| Container — standard page | 16px (all sides) | 16-24px vertical |
| Container — stretch table page | **0** (action bar has its own 16px top/left/right, 0 bottom) | 0 |
| Container — boxy table page | 16px (all sides) | 16-24px vertical |
| Container — dashboard card grid | 16-24px (all sides) | 16px between cards |
| Container — settings popup content | 0 or 16px | 0 (panels manage own padding) |

### Component Internal Spacing

| Component | Internal Padding | Gap |
|-----------|-----------------|-----|
| Action bar / Container Header | 16px horizontal, 12px vertical | 8-12px between items |
| Card BG (stat tile, info card) | 16-20px | 8-12px between label and value |
| Accordion (open panel content) | 16px | 12-16px |
| Sidebar List Panel / Side menu | 0 top, 12-16px horizontal | 0-4px between items |
| Table header row | 12-16px cell padding | — |
| Table body row | 12-16px cell padding | — |
| Form field group | — | 16-20px between fields |
| Modal / Popup body | 20-24px | 16-20px between sections |
| Tab bar | 0 left (first tab flush) | 0 (tabs manage own spacing) |

### Section Spacing (vertical gaps between major sections)

| Between | Gap |
|---------|-----|
| Container Header → first content section | 16px |
| Section heading → section content | 8-12px |
| Section → next section | 20-24px |
| Card row → next card row | 16px |
| Table → pagination | 12-16px |
| Stat cards row → next section | 20-24px |
| Attention Box → next content | 16px |
| Breadcrumbs → page content | 12-16px |

### Text Spacing

| Context | Margin/Gap |
|---------|-----------|
| Heading → body text below | 4-8px |
| Body text → body text (paragraphs) | 8-12px |
| Label → input field | 4-6px |
| Helper text below input | 4px |
| Badge/chip next to text | 6-8px horizontal |
| Icon next to text (inline) | 4-6px |

### Same-Size-In-Group Rule

When buttons, dropdowns, and text boxes appear together in the same visual group (action bar, form row, filter bar, modal footer), they MUST all use the **same Size variant**. Never mix Default + Small in one group.

### Common Spacing Mistakes to Avoid

1. **Arbitrary gaps** — using 15, 18, 22, or other non-scale values. Only use the spacing scale.
2. **Inconsistent section gaps** — 24px between section A→B but 16px between B→C on the same page. Pick one and use it consistently within a page.
3. **Missing padding on manual frames** — building a divider or separator frame with 0 padding when it needs 16px to align with adjacent content.
4. **Too-tight card grids** — less than 12px gap between cards makes them look cramped. Default to 16px.
5. **Uneven form fields** — different vertical gaps between form fields in the same form. Always 16-20px.
6. **Table cell padding inconsistency** — different padding on different columns. All cells in a table use the same horizontal padding.

---

## Container Content Patterns

### Standard Container (White) vs Dashboard Card Grid

**When this comes up:** You're building a page and need to decide whether the Container should be one white surface or a gray background with individual cards.

**Use Standard White Container when:**
- The page is a list page (action bar + table)
- The page is a detail page (KV pairs, form, settings)
- The page is a form or creation flow
- Content is a single cohesive block

**Use Dashboard Card Grid when:**
- The page is a dashboard, analytics, or overview page
- Content is divided into independent sections (chart, stats, tables)
- Each section should feel like its own "card" on a gray background
- Sections can be arranged in a grid (2 cards side by side)

**How to build the Dashboard Card Grid:**

1. **Container fill** → bind to `color/bg/sunken` (gray) instead of `color/bg/surface` (white)
2. **Container padding** → 16-24px all sides
3. **Container layout** → vertical auto-layout, gap 16px
4. **Each section** → wrap in a **Card BG** component (White variant), detach to add content
5. **Side-by-side cards** → wrap in a horizontal auto-layout frame, gap 16px, children use FILL width
6. **Full-width sections** → Card BG stretches to fill (`layoutSizingHorizontal = "FILL"`)

**Pattern from live Catalyst (screenshot 02):**
```
Container (fill: color/bg/sunken, padding: 16-24px, gap: 16px, VERTICAL)
├── Card BG [White] — "Event Chart" (chart + legend, full width)
├── Card BG [White] — "Event Statistics" (stat columns with dividers, full width)
└── Row frame (HORIZONTAL, gap: 16px)
    ├── Card BG [White] — "Top Publishers" (FILL width)
    └── Card BG [White] — "Most Failures" (FILL width)
```

**Card internal spacing:** 16-20px padding, 12-16px gap between heading and content.

**Section heading inside cards:** Use Heading/XS (14px SemiBold) or Heading/SM (16px SemiBold) for card titles. Bind to `color/text/primary`.

---

## Layout & Composite Components

### Layout: Default vs No Left Menu

**When this comes up:** You're building a Catalyst screen and need to choose which Layout variant to use.

**Ask the user:** "Does this page need left sidebar navigation with sub-features?"

**Use Default (type=Default, 1259px container) when:**
- The page has multiple sub-features to navigate (e.g., Data Store has Tables, Buckets, ZCQL Console)
- The left sidebar groups related pages under headings
- Most Catalyst feature pages use this variant

**Use No Left Menu (type=No Left Menu, 1489px container) when:**
- The page is single-purpose with no sub-navigation
- Overview/dashboard pages that show a summary of the whole service
- Settings pages that don't need a sidebar
- The wireframe/PRD shows no left sidebar

**Default:** Default with sidebar for most feature pages. No Left Menu only when the page genuinely has no sub-features.

**Import:** Layout is now a component_set (key `c321d468b0231e052b921026407ff896bdf2c55e`). Use `importComponentSetByKeyAsync` → select variant → `.createInstance()`.

---

### Container Header vs Manual Action Bar

**When this comes up:** You need an action bar at the top of the Container content area.

**Use Container Header component (PREFERRED) when:**
- The action bar needs any combination of: title, search, tabs, filters (1-3), buttons (primary/secondary/outline), link box, badge, info icon, description
- These are all available as boolean toggles on the Container Header component
- Type variants: Feature Name (title-focused), Search (search-focused), Tab (tab-focused)
- Toggle elements on/off without detaching — most real-world action bars are covered

**Detach Container Header when:**
- You need a specific element that doesn't exist as a boolean toggle
- You need more than 3 filters
- You need custom widgets inside the action bar
- Keep the shell styling (padding, colors, border) exactly as imported

**Build manually (frames + auto-layout) only when:**
- The action bar has a completely non-standard layout that no Container Header variant can express
- When building manually: ALL fills must use zcat color variables, ALL spacing must use the spacing scale, ALL text must use zcat text styles

**Default:** Always try Container Header first. Toggle booleans to match the wireframe. Detach only if a needed element is missing. Manual is last resort.

**Import:** Container Header is a component_set (key `c1e72c452cc937aa5dfc80c6308008c5038bc10f`). Use `importComponentSetByKeyAsync` → `.defaultVariant.createInstance()` → `setProperties({ 'Type': 'Search', 'Primary Button': true })`.

---

### Sidebar List Panel vs Manual Side Menu

**When this comes up:** You need a sidebar panel in a master-detail layout inside the Container.

**Use Sidebar List Panel component (PREFERRED) when:**
- The sidebar follows the standard pattern: title + search + grouped menu items
- 300px wide, with heading-based sections and clickable menu items
- Comes with 3 sections pre-built — detach to add/remove sections

**Detach Sidebar List Panel when:**
- You need more or fewer than 3 sections
- You need to customize headings or item layouts beyond what the component offers
- Keep the shell styling intact after detaching

**Build manually (Recipe 4 from zcat.md) when:**
- The sidebar has non-standard content (cards instead of list items, custom widgets, tree view)
- The sidebar needs a completely different structure than title + search + sections
- When building manually: container padding 0, list panel ~260px fixed width, use Nav Button for items, Divider between panels, ALL fills use zcat color variables

**Default:** Sidebar List Panel for standard list-detail patterns. Detach for minor tweaks. Manual only for non-standard sidebar content.

**Import:** Sidebar List Panel is a component (key `c042e030f9a1755279cd389302cf6f3f693f6707`). Use `importComponentByKeyAsync` → `.createInstance()`.

---

## Table Component vs Manual Table Build

**When this comes up:** You need to display tabular data and must decide whether to use the zcat Table component or build rows manually.

**FIRST PREFERENCE: ALWAYS use the Table component.** The Table has multiple column types built in — map the wireframe's columns to these types before considering a manual build.

**Table component structure (key `954cd82ff912bd312206e7f2776a75d80049ede0`):**
- Pre-composed with 11 `_Table_Col` instances, each a different column type
- Each `_Table_Col` spans header + all rows as one tall instance (not one cell per row)
- A `_Row Bg` layer handles hover/stripe styling
- Has Type: Default/Compact variant

**Table column types (11 built-in):**

| Column Type | Cell Content | Map to wireframe when... |
|-------------|-------------|--------------------------|
| Avatar & Name | Icon/avatar + primary text + subtitle | Name, service, entity with icon & description |
| Description | Text paragraph | Description, notes, summary fields |
| Id | Short text/code | ID, key, code, identifier columns |
| Status / Badge | Badge component (colored label) | Status, state, severity, availability |
| Region / Text | Plain text | Region, type, compute, any plain text |
| Storage / Metric | Text with fraction (e.g., "41 / 100 GB") | Storage, usage, quota, capacity |
| Number | Numeric value | Connections, count, quantity, size |
| Date | Date/timestamp text | Created, modified, last seen dates |
| Checkbox | Checkbox component | Row selection for bulk actions |
| Threedot | Three-dot overflow menu | Per-row actions (edit, delete, etc.) |
| Sort header | Header with sort arrow icon | Any sortable column header |

**How to use (PREFERRED workflow):**
1. Import Table component_set → detach
2. Identify which of the 11 column types match your wireframe columns
3. **Hide unused columns** — set `.visible = false` on columns you don't need
4. **Relabel columns** — update header text and cell text to match your schema
5. Set `col.minWidth = null` on each visible column to allow flexible widths
6. Hide avatars from non-Name columns

**Use the Table component (detach to customize) when:**
- The table is a standard list view — this covers MOST cases: database lists, function lists, deployment logs, user tables, etc.
- You can map wireframe columns to the built-in column types above
- Even if the column types don't match exactly, relabeling is faster than manual build

**Build manual table rows ONLY when:**
- The table schema is fundamentally different from any column type above (e.g., a permissions matrix with checkboxes in a grid, or Column Name / Data Type / Required / Default Value)
- You need boxy/bordered cells for structured data that the Table component can't express
- **ASK the user before choosing manual build** — explain that the Table component exists and why you believe manual is needed for this specific schema

**Manual table build rules:**
- Use auto-layout frames for rows, layoutSizingHorizontal = FILL
- Use zcat atoms INSIDE rows: Badges for status tags, Checkbox/Radio for selection, Buttons for actions
- Bind ALL fills/strokes to zcat variables (color/bg/surface for row bg, color/border/default for cell borders, color/text/* for text)
- Header row: font weight 500, color/text/secondary for column labels
- Data rows: font weight 400, color/text/primary for values
- Row height: 44-48px for Default, 36px for Compact
- If building manually, SURFACE this as a decision to the user — the hard rule says "every UI element MUST use a zcat component if one exists." Explain that the Table component doesn't fit the schema and you're building compliant manual rows instead.

---

## Popup & Dialog Overlay Pattern

**When this comes up:** You need to show a modal dialog, confirmation, or popup.

**Required layers (in order, bottom to top):**
1. **Popup Blur** — import the Popup Blur component (key `825e3c4aa551ccd56ec61d6f5059dda1e92abbc5`). This is a bare backdrop rectangle with blur/dim. It is NOT a dialog. Size it to the full page frame (1582×860).
2. **Popup** — import the Popup component_set (key varies by type: Deefault Popup, Popup - Success, Popup - Error, etc.). This is the actual dialog with header, body, and actions.

**NEVER do:**
- Create a manual frame with hardcoded `rgb(0,0,0)` at 40% opacity for the overlay — always use Popup Blur
- Skip the Popup Blur component — dialogs MUST have a backdrop
- Set the popup overlay to white or any color other than what Popup Blur provides

**Popup sizing:** The Popup component defaults to 548px wide. For forms with multiple fields, this is usually sufficient. For wider content, detach and resize (Popup is on the detach whitelist).

---

## Token Optimization — Build Efficiently

**Target: 2-3 use_figma scripts per screen, not 10+.** Every script call is a round-trip that costs tokens. Batch operations to minimize calls.

### Script Batching Pattern

**BAD (10+ scripts, ~20k tokens):**
```
Script 1: Import layout
Script 2: Detach layout
Script 3: Update sidebar text
Script 4: Update sub header text
Script 5: Build action bar
Script 6: Import button
Script 7: Import text box
Script 8: Build table header
Script 9: Build table rows
Script 10: Add pagination
Script 11: Validation
```

**GOOD (3 scripts, ~8-10k tokens):**
```
Script 1: Import layout → configure booleans → detach → update sidebar + sub header text
Script 2: Build entire Container content — action bar (search + filters + button) + table (import, detach, configure columns, populate rows) + pagination — ALL in one script
Script 3: Validation
```

### Skip search_design_system for Known Components

The `componentKeyMap` in component-manifest.json has every component key and import type. Use it directly:

```javascript
// INSTEAD OF: calling search_design_system("Buttons") → getting key → importing
// DO THIS: import directly from the known key
const btnSet = await figma.importComponentSetByKeyAsync("1e04478db049373eb096060a60ee7bbbc4da4e9a");
```

**ONLY use search_design_system for:**
- Icons (not in the manifest — must search by name)
- Components you're unsure about (verify they exist before importing)

### Pre-Plan Before Building

Before the first use_figma call, list everything needed:

```
Screen: DirectDB List View
Layout: Default (key: c321d468b0231e052b921026407ff896bdf2c55e)
Components needed:
  - Search (component_set): 8fe1faec85e92db3d43b66c5f30eaf28e6de9e91
  - Button (component_set): 1e04478db049373eb096060a60ee7bbbc4da4e9a
  - Table (component_set): 954cd82ff912bd312206e7f2776a75d80049ede0
  - Badge (component_set): 158e4b6d656a62d4244efc4e5583794044328d3a
  - Pagination (component_set): e38e2e4c72af7526c8f2c07d0621dbea85aba8b8
  - Dropdown (component_set): 021a6653c106f277f2481ee722ed93d4137dc3a6
Scripts: 3 total (layout, content, validation)
```

Then execute the plan in minimal scripts.

### Read Only What You Need

- **componentKeyMap only** — to get keys and types, read the `componentKeyMap` section (~100 lines), not the full `components` array (~5000 lines)
- **Specific component entries** — if you need properties for one component, read just that entry
- **decision-rules.md** — read only the relevant section (Table rules for a list page, Popup rules for a dialog page)
- **layout-info.md** — read once per session, not per screen (layout structure doesn't change between screens)

---

## Build Error Recovery — Pause and Ask

**CRITICAL: Never burn tokens on a failing approach.** When something goes wrong during a build, STOP and ask the user instead of retrying blindly or working around the problem.

**STOP and ASK the user when:**
- A component import fails or returns unexpected results
- `setProperties()` throws — don't guess alternative property names, ask the user to confirm the real properties
- The Table component doesn't match the wireframe schema — ask before switching to manual build
- Layout breaks or content overflows the Container — ask before restructuring
- Any script fails more than once for the same reason
- You're about to detach a component not on the detach whitelist
- You're unsure whether tabs belong in Sub Header or Container

**How to ask:** Tell the user what you tried, what failed, and propose 2 options. Example: "The Table component's column types don't match this schema (Column Name / Data Type / Required). I can: (1) detach and restructure the Table columns, or (2) build manual rows with zcat atoms. Which do you prefer?"

**One question saves thousands of tokens.** A wrong guess that leads to a broken screen wastes the user's entire token budget and produces a result they'll reject. A 10-second question produces a result they'll accept.

---

## Figma Runtime Quirks

Critical runtime behaviors that cause silent failures if not handled. These are NOT zcat-specific but hit hard during builds.

### 1. setProperties() is all-or-nothing
`setProperties()` throws on ANY invalid property combination and prevents ALL properties from applying — including valid ones in the same call. Before calling setProperties:
- Query the component_set's `.children` to find real valid variant combos
- Or set properties one at a time with try/catch
- Common mistake: `setProperties({Type: 'Ghost'})` on Buttons — Ghost is a Variant value, not a Type value

### 2. Page context doesn't persist
Every `use_figma` script starts with no guaranteed page context. Without an explicit `await figma.setCurrentPageAsync(targetPage)` at the start of every script, new nodes silently land on the wrong page. This caused screens being built on Page 1 instead of the target page.

### 3. detachInstance() returns a new node
`detachInstance()` returns a brand-new node with a new ID. The pre-detach variable/ID is invalid. Always reassign:
```js
const detached = instance.detachInstance(); // new node, new ID
// instance is now invalid — use detached
```

### 4. Instance visibility breaks sibling IDs
Setting `.visible = false` on an instance child (e.g., hiding an extra tab or list item) can invalidate sibling node IDs later in the same script. Read all needed IDs BEFORE toggling visibility.

### 5. Script atomicity
If a script throws anywhere — even in a trailing debug `return` — earlier mutations in that same script may not persist. Keep scripts focused, handle errors, and avoid debugging code that could throw.

### 6. Sub Header tabs inside Layout
The Primary Tabs child documented on the standalone Sub Header component may NOT exist on the instance embedded inside the Layout. Don't assume it's there — check first, and fall back to placing tabs inside the Container if it doesn't exist.

### 7. FILL sizing before appendChild
Setting `layoutSizingHorizontal = 'FILL'` on a node that is NOT yet a child of an auto-layout parent throws an error. The fix: always `parent.appendChild(node)` first, THEN set FILL sizing. This applies to all sizing modes that depend on the parent's layout.

### 8. Table column minWidth locked at 250px
The Table component has `minWidth: 250` on every column frame. `resize()`, FILL sizing, and detaching — nothing works until you set `col.minWidth = null` on each column. Do this immediately after detaching the Table.

### 9. Table cell avatars
The Table component's cell template includes an avatar by default in every cell. For non-Name columns, hide or remove the avatar instance — otherwise every cell shows an avatar icon.

### 10. Font loading is mandatory for ALL text mutations
Any text mutation (`node.characters = "..."`, even `appendChild` to a frame containing text) requires `await figma.loadFontAsync(node.fontName)` first. Forgetting this on even one text node crashes the entire script (see quirk #5 — all-or-nothing).

### 11. Sidebar node IDs change after detach
When updating sidebar menu text in a detached Layout, node IDs from the original component (like `I14:942;548:8097;548:8033`) no longer exist. Wrap each text operation in try/catch and iterate children safely using `findAll()` or `findOne()` instead of `getNodeById()`.

### 12. Text layers aren't semantically named
Inside Text Box / Dropdown instances, text nodes are named after their default sample copy (e.g., `"Text Field"`, `"This is active text color"`), not generic names like `"Label"` / `"Value"`. Navigate by the parent wrapper frame's name and grab its first TEXT child instead.
