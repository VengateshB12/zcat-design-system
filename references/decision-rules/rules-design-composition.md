# Design Composition — From Wireframe to Polished UI

Components alone don't make a design good; how you compose them does.

## Wireframe Interpretation

**Wireframes define WHAT appears on a screen, not HOW it should look.**

**Extract from wireframes:**
- What data is shown (fields, columns, values)
- What actions are available (buttons, menus, links)
- What navigation exists (tabs, sidebar items, breadcrumbs) — COUNT them
- What states matter (empty, loading, error, success, before/after action)
- What sections the content is grouped into

**Do NOT copy from wireframes:**
- Exact spacing — wireframes use rough spacing, not final values
- Visual hierarchy — wireframes are intentionally flat
- Section styling — wireframes don't show cards, shadows, borders
- Typography scale — wireframes often use uniform text sizing
- Column icons/avatars — wireframes put random icons next to columns; match column type to DATA, not wireframe icons
- Exact button styles — wireframes may show all buttons the same; apply CTA hierarchy (ONE primary per group)

### When to Follow vs Improve Wireframe Layout

**Follow when:** it matches a standard Catalyst pattern, was designed with the final product in mind, or the user says "match exactly."

**Improve when:** everything is stacked vertically when side-by-side would be better, sections lack visual grouping, no visual hierarchy, or purely functional wireframe.

**When unsure:** Follow content and features exactly, but apply visual polish (hierarchy, grouping, spacing rhythm).

### "Creative" Does NOT Mean Copying the Wireframe with Components Swapped In

**The #1 quality failure:** agent takes the wireframe layout literally, replaces text with components, and calls it "designed." This produces a wireframe with component styling — NOT a polished design.

**What creative design means:**
- Apply visual hierarchy (stat cards with icon BGs, not flat text)
- Group related content in Card BG or bordered frames
- Use multi-column layouts when appropriate
- Add semantic colors (badge colors, icon BG colors, status dots)
- Balance action bars (left search/filters + right buttons)
- Choose appropriate text styles for each role

**What creative design does NOT mean:**
- Changing features (dropping tabs, removing buttons, merging sections)
- Adding decorative elements not in the wireframe
- Ignoring the wireframe's information architecture

---

## Multi-State Pages — Design ALL States

**Many pages have multiple states.** A single wireframe may show 2-3 states that need separate designs OR the same page frame with different content.

### Common Multi-State Patterns

| Page type | States to design |
|-----------|-----------------|
| Query/console editor | Empty (placeholder text), With query (code entered), Results showing (after execution) |
| List page | Empty state, Populated list, Filtered/searched |
| Form page | Empty form, Filled form, Validation errors |
| Detail page | Loading, Loaded with data |
| Upload/import | No file selected, File selected, Processing, Complete |

### The Rule

When a wireframe shows a "before" and "after" state (e.g., query editor before run vs after run with results), these are **TWO separate design frames** on the same Figma page. Build both.

- **State 1:** Initial state (empty results area, placeholder message like "Press Run to execute")
- **State 2:** Active state (results table, status badge, export button)

Do NOT combine all states into one frame — it confuses the developer about what appears when.

---

## Visual Hierarchy

**CRITICAL: NEVER hardcode font sizes, weights, or hex colors.** Use zcat text styles and color variables.

| Role | Text Style | Color Variable |
|------|-----------|---------------|
| Section heading | Body/SemiBold/16 | `color/text/primary` |
| Sub-section heading | Body/SemiBold/14 | `color/text/primary` |
| Body / data text | Body/Regular/14 | `color/text/primary` |
| Label / caption | Body/Regular/12 | `color/text/secondary` |
| Help text | Body/Regular/12 | `color/text/placeholder` |
| Card title | Body/SemiBold/16 | `color/text/primary` |
| Card subtitle | Body/Regular/14 | `color/text/secondary` |
| Card timestamp | Body/Regular/12 | `color/text/placeholder` |

**Stat card values:**

| Element | Text Style | Color Variable |
|---------|-----------|---------------|
| Metric value | Headlines/SemiBold/24 | `color/text/primary` |
| Metric label | Body/Regular/12 | `color/text/secondary` |
| Metric unit/suffix | Body/Regular/14 | `color/text/secondary` |

**Action hierarchy:** Primary → Fill button. Secondary → Outline button. Tertiary → Ghost button or text link. **ONE primary (Fill) per action group — see rules-navigation-actions.md.**

## Section Grouping

**Use Card BG for:** stat tiles, info sections, dashboard widgets. Detach to insert content; keep padding, radius, color binding.

**Use bordered frames** (1px `color/border/default`, 6px radius, `color/bg/surface`) **for:** form field groups, configuration sections, content blocks needing separation without elevation.

**Use section headers** (heading text + 8-12px gap) **for:** dividing content within a card or bordered frame.

## ANTI-PATTERN: Wireframe Copy (THE #1 DESIGN QUALITY FAILURE)

**How to identify a wireframe copy (if ANY are true, the design is bad):**
- Stat cards are flat text-only blocks with no icon, no icon background
- Stat cards have fixed height instead of auto-layout HUG
- Read-only data displayed as Text Box inputs instead of General Details
- Activity is an unstyled text list instead of items with status dots + Card BG
- All sections float loose without Card BG wrappers or bordered frames
- Sections stacked vertically when they should be side-by-side
- Table shows avatar on every column (ID, amount, date) instead of only person columns
- All badges in a table are the same color regardless of status meaning
- Tab active state is wrong or not set
- Multiple Fill (primary) buttons in the same action group
- Code/SQL content in a plain text frame instead of Code Block component
- Tabs dropped because component had a limit — not detached to add more
- Empty state has two buttons with the SAME label
- Popup header/body/footer widths don't match

**Every detail/overview page MUST have:**
1. Stat cards with icon backgrounds — NOT flat text
2. Read-only info in General Details component — NOT manual text or editable inputs
3. Activity feeds in Card BG with status dots — NOT plain text lists
4. Two-column layout for info sections — NOT everything vertical
5. Every section wrapped in Card BG or bordered frame — NO floating content

---

## Tab Active State — MANDATORY

When a page has tabs (in Sub Header or Container), EXACTLY ONE tab must show the active/selected state. The active tab is the one whose content is currently visible.

**How to set active tab:**
- Find the Tab component instance for the active tab
- Set its State property to "Active" or "Selected" (verify via `zcat_get_component`)
- All other tabs remain in "Default" state
- The active tab typically shows: brand-color text + bottom border indicator

**Common mistakes:**
- All tabs showing "Default" state — one MUST be active
- Setting the wrong tab as active (doesn't match the content shown)
- Not setting any tab state at all — the active indicator is missing

---

## Auto-Layout Everywhere — No Fixed Heights, No Fixed Widths

**EVERY frame, card, section, wrapper, row, and container MUST use auto-layout.** Content determines size. NEVER hardcode pixel heights or widths on containers.

### The Rules

1. **ALL cards use HUG height** — `counterAxisSizingMode = "AUTO"`, `layoutSizingVertical = "HUG"`. This applies to EVERY card: stat cards, info cards, chart cards, form cards, ALL cards. No exceptions.
2. **ALL grouping frames use auto-layout** — `figma.createAutoLayout()`, not `figma.createFrame()` with absolute `x`/`y`. Grouped content must flow, not be manually positioned.
3. **Width = FILL, Height = HUG** — containers stretch to fill parent width (`layoutSizingHorizontal = "FILL"`) and wrap their content vertically (`layoutSizingVertical = "HUG"`). The ONLY fixed-width elements are the Layout shell itself and specific component instances.
4. **Cards in a row match height** via the parent's `counterAxisAlignItems = "STRETCH"` — never by setting the same fixed pixel height on each card.
5. **If something looks too short or too tall, fix the CONTENT inside — not the container.** The container is a wrapper. It HUGs. Always.

### Common Fixed-Size Mistakes

| Mistake | Fix |
|---------|-----|
| Card height set to 100px, 200px, etc. | Remove fixed height, set HUG |
| Section wrapper with hardcoded W:500 H:300 | Set FILL width, HUG height |
| Row of cards with each card set to H:150 | Parent row uses STRETCH alignment, cards HUG |
| Chart card at H:100 | Chart CONTENT inside is too small — fix the chart, not the card |
| Divider with fixed width | Set `layoutSizingHorizontal = "FILL"` |

### NEVER

- `node.resize(width, height)` on a card, section, or content wrapper
- Fixed pixel values on `height` for any content container
- `figma.createFrame()` for grouped content — use `figma.createAutoLayout()`
- Absolute `x`/`y` positioning for elements inside a group

## ZERO Hardcoded Colors — EVERY Color Must Be Variable-Bound

**EVERY fill, stroke, and text color MUST be bound to a zcat color variable.** No exceptions.

### The Problem

Agents write `node.fills = [{type: 'SOLID', color: {r:0, g:0, b:0}}]` — this creates raw hex that breaks dark mode. Even common colors like black (#000000) and white (#FFFFFF) must be variable-bound.

### The Rule

**NEVER set fills/strokes directly.** Always use `figma.variables.setBoundVariableForPaint`:

| What you're coloring | Variable to bind |
|---------------------|-----------------|
| Text (black/dark) | `color/text/primary` |
| Text (grey/secondary) | `color/text/secondary` |
| Text (light/placeholder) | `color/text/placeholder` |
| Background (white/surface) | `color/bg/surface` |
| Background (page/grey) | `color/bg/default` |
| Border/divider | `color/border/default` |
| Icon fill/stroke | Same as parent text variable |
| Card background | Use Card BG component (already bound) |
| Brand/accent color | `color/bg/brand` or `color/bg/brand-subtle` |

### Self-Check After Building

Screenshot the screen → select ANY element → check the Fill/Stroke panel on the right. If you see raw hex values (000000, FFFFFF, 0F1F3D, EBEDF5, etc.) instead of variable names, those are bugs. Fix them before showing the design.

---

## Card Composition Recipes — Different Cards for Different Purposes

Cards are NOT one-size-fits-all. The card's internal composition depends on what the card represents. Use the right recipe for the right context.

### Recipe A: Stat/Metric Card (dashboard, overview)
```
Card BG (detached, 16px padding, FILL width, HUG height)
├── HORIZONTAL auto-layout, gap: 12, center-aligned
│   ├── Icon BG frame (40x40, cornerRadius: 10) — ONLY if a meaningful icon exists
│   │   └── zcat stroke icon (18x18)
│   │   └── Fill: color/bg/brand-subtle (vary per card)
│   └── VERTICAL auto-layout, gap: 4
│       ├── Label (12px Regular, color/text/secondary)
│       ├── Value (24px SemiBold, color/text/primary)
│       └── Subtitle (12px Regular, color/text/placeholder) — optional
```
Use when: KPI values, counts, percentages, summary metrics.
Icon BG: only when a meaningful icon exists (Users → person, Revenue → currency). Skip for abstract stats.

### Recipe B: Feature/Recipe Card (grid of clickable items)
```
Card BG (detached, 16px padding, FILL width, HUG height)
├── VERTICAL auto-layout, gap: 12
│   ├── Icon circle (48x48, cornerRadius: 24, colored fill)
│   │   └── zcat stroke icon (24x24, white or on-brand)
│   ├── Title (16px SemiBold, color/text/primary)
│   └── Description (14px Regular, color/text/secondary, 2-3 lines max)
```
Use when: feature tiles, code recipes, integration cards, template selectors.
These are clickable cards that navigate to a detail page. Icon represents the feature category.
Arrange in 2-4 column grid with equal-width cards.

### Recipe C: Settings/Config Card (inside accordion or settings section)
```
Card BG (detached, 16px padding, FILL width, HUG height)
├── VERTICAL auto-layout, gap: 8
│   ├── HORIZONTAL auto-layout (FILL width, SPACE_BETWEEN)
│   │   ├── Title (16px SemiBold, color/text/primary)
│   │   └── Three-dot Icon Button — OR — nothing (if no actions)
│   ├── Description (14px Regular, color/text/secondary)
│   └── HORIZONTAL auto-layout, gap: 12 — footer area
│       ├── Link/action ("App Settings" with icon, color/interactive/default)
│       └── Badge/status ("Enabled" green) — optional
```
Use when: settings panels, config options, feature toggles inside accordion sections.
Three-dot menu: include when the card has actions (Edit, Delete, Reset). Skip when the card only navigates.
Status badge: include when the card has an on/off or status state. Skip when status is irrelevant.

### Recipe D: Info/Description Card (bordered, no elevation)
```
Bordered frame (1px color/border/default, 6px radius, 16-24px padding, FILL width, HUG height)
├── HORIZONTAL auto-layout, gap: 24
│   ├── Left content (FILL width)
│   │   ├── Title (16px SemiBold, color/text/primary)
│   │   ├── Description (14px Regular, color/text/secondary, multi-line)
│   │   └── HORIZONTAL auto-layout, gap: 16, paddingTop: 12
│   │       ├── Button (Outline, "Connect Cookbook")
│   │       └── Link text ("Learn More", color/interactive/default)
│   └── Right content (HUG width) — optional
│       ├── Label + value pairs (Key Value Pair or manual text)
│       └── Copy icon buttons for copyable values
```
Use when: connection info, getting started, feature descriptions with actions.
No Card BG component needed — manual bordered frame with variable-bound colors.

### Recipe E: Simple Card (no icon, no actions)
```
Card BG (detached, 16px padding, FILL width, HUG height)
├── VERTICAL auto-layout, gap: 4
│   ├── Title (16px SemiBold, color/text/primary)
│   └── Value or description (14px Regular, color/text/secondary)
```
Use when: the card contains a single piece of information that doesn't need icon or action decoration.
NOT every card needs an icon, a three-dot menu, or a badge. Simple cards are fine when the content speaks for itself.

### Recipe F: Stat Card with Info Tooltip (dashboard metrics)
```
Card BG (detached, 16px padding, FILL width, HUG height)
├── HORIZONTAL auto-layout, gap: 12, center-aligned, SPACE_BETWEEN
│   ├── HORIZONTAL auto-layout, gap: 12, center-aligned
│   │   ├── Icon BG circle (48x48, cornerRadius: 24, colored fill)
│   │   │   └── zcat stroke icon (24x24)
│   │   │   └── Fill: varies per card (brand-subtle, danger-subtle, info-subtle, warning-subtle)
│   │   └── VERTICAL auto-layout, gap: 2
│   │       ├── Value (24px SemiBold, color/text/primary) — "0", "NA", "1,247"
│   │       └── Label (12px Regular, color/text/secondary) — "Total Invocations"
│   └── Info icon (ⓘ tooltip trigger, color/text/placeholder) — optional
```
Use when: KPI metrics on detail/overview pages with different colored icon BGs per metric.
Each card in a row gets a DIFFERENT icon BG color. Info tooltip for metric explanation.

### Recipe G: Key-Value Settings Card with Edit Action
```
Card BG (detached, 16px padding, FILL width, HUG height)
├── VERTICAL auto-layout, gap: 16
│   ├── HORIZONTAL auto-layout (FILL width, SPACE_BETWEEN)
│   │   ├── Title (16px SemiBold, color/text/primary) — "App Execution Settings"
│   │   └── Edit link (icon + "Edit", color/interactive/default)
│   └── VERTICAL auto-layout, gap: 12 — key-value pairs
│       ├── HORIZONTAL: Label (14px Regular, color/text/secondary, fixed-width) + Value (14px Regular, color/text/primary)
│       ├── HORIZONTAL: Label + Value
│       └── HORIZONTAL: Label + Value
```
Use when: read-only config/settings display with an edit action. Labels left-aligned in a column, values right.
Use General Details component when available. Edit link top-right, NOT a button.

### Recipe H: Entity Card (card grid with ID + status)
```
Card BG (detached, 16px padding, FIXED width per grid column, HUG height)
├── VERTICAL auto-layout, gap: 12
│   ├── Name (16px SemiBold, color/text/primary) — "hjm"
│   ├── ID line (12px Regular, color/text/secondary) — "ID : 3069000000039886"
│   ├── Dotted divider (1px dashed, color/border/subtle)
│   └── HORIZONTAL auto-layout, gap: 8, SPACE_BETWEEN
│       ├── HORIZONTAL: Integration icon + name (14px, color/text/secondary) — "Zoho CRM"
│       └── HORIZONTAL: Status dot (8x8 circle, green) + text (14px) — "Enabled"
```
Use when: entity listing in card grid (publishers, integrations, connections). Shows identity + metadata + status.
Cards in a grid use fixed width per column, wrap to next row. Status dot = ExecutionStatus pattern.

### Recipe I: Plan/Summary Cards with Icon BG + Sub-Content
```
Card BG (detached, 16-24px padding, FILL width, HUG height)
├── VERTICAL auto-layout, gap: 16
│   ├── HORIZONTAL auto-layout, gap: 12, center-aligned
│   │   ├── Icon BG circle (48x48, cornerRadius: 24, colored fill)
│   │   │   └── zcat stroke icon (24x24)
│   │   └── VERTICAL auto-layout, gap: 2
│   │       ├── Title (16px SemiBold, color/text/primary) — "Current Plan"
│   │       └── Subtitle (12px Regular, color/text/secondary) — "20 Jul 2026 - 20 Aug 2026"
│   └── Sub-content area — varies by card:
│       ├── Nested badge cards (plan tier + price) — OR
│       ├── Label + value + info icon — OR
│       ├── Title + description text
```
Use when: overview/billing cards where each card represents a different concept (Current Plan, Forecast, Previous Plan).
Sub-content varies per card — NOT all cards in the row need identical internal structure.

### Recipe J: Selection Card (selectable option in a grid)
```
Card BG (detached, 16px padding, HUG or FIXED width, HUG height)
├── VERTICAL auto-layout, gap: 8, center-aligned
│   ├── Icon circle (48x48, cornerRadius: 24, colored fill)
│   │   └── zcat stroke icon or product logo (24x24)
│   └── Label (14px SemiBold, color/text/primary) — "Java", "Nodejs", "Python"
State: Default (grey border) / Selected (brand border + brand-subtle bg)
```
Use when: option selection grids (runtime picker, template chooser, integration selector).
Use Card BG component State property: Default for unselected, Selected for chosen.
Arrange in horizontal row, equal-width cards. One card shows Selected state.

### Choosing the Right Card Recipe

| Context | Recipe | Icon? | Three-dot? | Badge/Status? |
|---------|--------|-------|------------|---------------|
| Dashboard KPI with natural icon | A or F | YES | NO | NO |
| Dashboard KPI without natural icon | E | NO | NO | NO |
| Feature tiles in a grid | B | YES | NO | NO |
| Settings option with actions | C | NO | YES | MAYBE |
| Settings option without actions | C (no three-dot) | NO | NO | MAYBE |
| Connection info / instructions | D | NO | NO | NO |
| Read-only config with edit action | G | NO | NO | NO |
| Entity card grid (with ID/status) | H | NO | NO | YES (status dot) |
| Plan/billing summary cards | I | YES | NO | MAYBE (badges) |
| Selection/option picker grid | J | YES | NO | NO (Selected state) |
| Simple display value | E | NO | NO | NO |

**Key principles:**
- Card composition follows the CONTENT, not a template. Ask "what does this card NEED?" not "what can I add to this card?"
- These 10 recipes are a REFERENCE, not a limit. If the content calls for a card composition not listed here, creatively compose one using zcat components and variable-bound colors. The recipes show proven patterns — the agent should match OR exceed them
- Cards in the same row do NOT need identical internal structure if they represent different concepts (see Recipe I — plan cards each have different sub-content)
- NEVER force an icon, three-dot, or badge onto a card just because other recipes have them. Every element must earn its place

---

## Stat Card Design — Use Judgment, Not a Template

Stat cards are Recipe A, E, or F from the Card Composition Recipes above. Choose based on the content.

**BAD (wireframe copy):** flat card with just label + value text, no visual hierarchy.

**GOOD — with icon BG (Recipe A/F):** when a meaningful icon exists for the metric.
```
Card BG (detached, 16px padding, FILL width, HUG height)
├── HORIZONTAL auto-layout, gap: 12, center-aligned
│   ├── Icon BG frame (40×40, cornerRadius: 10, padding: 11)
│   │   └── zcat stroke icon (18×18, color: color/text/on-brand)
│   │   └── Fill: color/bg/brand-subtle
│   └── VERTICAL auto-layout, gap: 4
│       ├── Label (12px Regular, color/text/secondary)
│       ├── Value (24px SemiBold, color/text/primary)
│       └── Subtitle (12px Regular, color/text/placeholder) — optional
```

**GOOD — without icon (Recipe E):** when no natural icon exists, or when the card is simple enough that typography alone provides hierarchy.
```
Card BG (detached, 16px padding, FILL width, HUG height)
├── VERTICAL auto-layout, gap: 4
│   ├── Label (12px Regular, color/text/secondary)
│   └── Value (24px SemiBold, color/text/primary)
```

- Icon BG: only when a meaningful icon exists (Users → person, Errors → alert). Do NOT force icons
- Each card with icon BG uses DIFFERENT subtle color (brand-subtle, success-subtle, info-subtle, warning-subtle)
- Value is the HERO — 24px SemiBold minimum
- All cards in a row use FILL width
- **HUG height — NEVER fixed pixel height**

---

## Semantic Colors — Badge, Status, Icon BG

**Every color choice MUST carry meaning. Same color everywhere = no information.**

### Badge Colors (in tables, cards, anywhere)

| Meaning | Color | Examples |
|---------|-------|----------|
| Success / positive / done | **Green** | Paid, Active, Available, Completed, Live |
| Error / negative / critical | **Red** | Failed, Overdue, Critical, Expired, Deleted |
| Warning / caution / pending | **Amber** | Pending, Warning, Modifying, Expiring |
| Info / neutral-active / processing | **Blue** | Processing, In Progress, Draft, Queued |
| Neutral / inactive / unknown | **Grey** | Archived, Inactive, N/A, Paused |

### Icon BG Colors (in stat cards)

Each stat card in a row uses a DIFFERENT color to create visual variety:
- Card 1: `color/bg/brand-subtle` (blue)
- Card 2: `color/bg/success-subtle` (green)
- Card 3: `color/bg/warning-subtle` (amber)
- Card 4: `color/bg/danger-subtle` (red)

If there are only 2-3 cards, pick from the above. NEVER use the same color for all cards.

### ExecutionStatus Colors (in tables)

| State | Dot Color |
|-------|-----------|
| Running / Success / Enabled | Green dot |
| Stopped / Failed / Disabled | Red dot |
| Starting / Provisioning | Blue dot |
| Warning / Degraded | Amber dot |

---

## Action Bar Design — Balance Left and Right

**NEVER place a button alone on the right with empty left.**

| Screen type | Left side | Right side |
|-------------|-----------|------------|
| List page | Search + Filters | Create button (ONE primary) |
| Detail section | Section heading | Action button |
| Query editor | Schema/DB dropdown | Secondary buttons (Outline/Ghost) + Run (ONE primary) |
| Settings section | Heading + description | Save/Apply |
| Card header | Title | Action icon or link |

---

## CTA Hierarchy in Action Bars — MANDATORY

**AT MOST ONE Fill (primary) button per action group.** All other buttons are Outline or Ghost.

See `rules-navigation-actions.md` for the full CTA hierarchy rules and common mistake examples.

**Quick self-check:** Count the Fill buttons in each action bar / button group / footer on screen. If the count is > 1 → demote the less important ones.

---

## Screen Polish Patterns — Common Improvements by Area

After building each screen, audit every area and actively improve anything that looks weak, flat, or generic. These patterns apply to ALL screen types. **Composition-only changes — NEVER break, detach, or rebuild components during polish.**

### Stat Cards
| Problem | Improvement |
|---------|-------------|
| Value text same size as label | Value = Headlines/SemiBold/24, label = Body/Regular/12 secondary |
| Fixed pixel height on cards | Change to HUG — content determines height |
| Cards different heights in a row | Parent row: `counterAxisAlignItems = "STRETCH"` |
| All cards visually identical | Vary icon BG colors IF icons are present: brand-subtle, success-subtle, warning-subtle, danger-subtle |

**Icon BG on stat cards — use judgment, not always:**
- **YES icon BG:** when the stat represents a distinct category and an icon helps recognition (Total Users → person icon, Revenue → currency icon, Errors → alert icon)
- **NO icon BG:** when the stat is a simple number without a natural icon, when there are many small stats in a compact row, or when the card already has enough visual weight from typography alone
- **NEVER force icons** — if you can't find a meaningful icon for the stat, leave the card as value + label with proper typography hierarchy. A meaningless icon is worse than no icon

### Container Content
| Problem | Improvement |
|---------|-------------|
| Everything stacked vertically | Use two-column layout for related info sections (detail pages) |
| Sections floating without grouping | Wrap in Card BG or bordered frame (1px `color/border/default`, 6px radius) |
| Too much empty space | Check if sections can be reorganized or content density increased |
| Content too cramped | Increase section gap (24px between sections, 16px within) |
| No visual focal point | Make the most important section larger, more prominent, or positioned first |
| Action bar has lonely right button | Add Search, heading text, or filter on the left |

### Side Menu (Sidebar)
| Problem | Improvement |
|---------|-------------|
| Menu items are plain text without icons | Ensure each nav item has an icon via clone+swap |
| No active state on current page item | Set the active/selected state on the correct sidebar item |
| Items not grouped logically | Use section group headers to separate navigation categories |
| Too many items ungrouped | Group by function: main features, settings, administration |
| Sidebar looks disconnected from content | Verify Divider between sidebar and content panel exists |

### Tables
| Problem | Improvement |
|---------|-------------|
| All columns use default types (AvatarName col 1, Badge col 2) | Swap every column to match its DATA — person=AvatarName, status=Badge, text=Text, dates=Date |
| All badge colors identical | Map each status value to a semantic color (green/red/amber/blue/grey) |
| Header text still shows defaults | Update every header to match the actual data column name |
| Cell data still shows placeholder | Fill every cell with realistic data from sample-data.md |
| Table not stretching to container width | Set `layoutSizingHorizontal = "FILL"` |

### Sub Header
| Problem | Improvement |
|---------|-------------|
| No active tab set | Set exactly ONE tab to Active state matching the visible content |
| Tabs in container body instead of Sub Header | Move primary (whole-page) tabs to Sub Header |
| Missing Help icon | Add Help button instance in Sub Header actions area |
| Tab count doesn't match wireframe | COUNT wireframe tabs — if more than component supports, detach and add |

### Popup/Dialog
| Problem | Improvement |
|---------|-------------|
| Form fields not stretching | Set ALL form elements to `layoutSizingHorizontal = "FILL"` |
| Header/body/footer different widths | ALL three sections: `layoutSizingHorizontal = "FILL"` |
| Cancel button styled as primary (Fill) | Cancel is ALWAYS Outline/grey, never Fill/primary |
| Stepper in body instead of header | Move Stepper to header area, below title, FILL width |

### Buttons & CTAs
| Problem | Improvement |
|---------|-------------|
| Multiple Fill (primary) buttons in same group | Demote all but the ONE most important to Outline or Ghost |
| Buttons in a row use different Size variants | ALL buttons, dropdowns, text boxes in the same row MUST use the same Size |
| Button label still says "Button Text" | Override nested TEXT node with the actual action label |
| Cancel/secondary button styled as Fill | Cancel = Outline/grey or Ghost. Only the primary action is Fill |
| Danger action (Delete, Remove) uses primary blue | Use Color: "Danger" (red) for destructive actions |
| Button too small or too large for context | Match surrounding controls — form fields + buttons same Size, compact toolbars use Small |

### Links & Interactive Text
| Problem | Improvement |
|---------|-------------|
| Link text using hardcoded blue hex | Bind to `color/interactive/default` variable |
| Link not visually distinct from body text | Use Link component or text with `color/interactive/default` color binding |
| "View All", "See More" links with no destination | Remove if there's no target page, or replace with meaningful action |
| Clear All / Reset link missing when filters active | Add as text link at the end of active filter chip row |

### Three-Dot (Overflow) Menu
| Problem | Improvement |
|---------|-------------|
| Three-dot button exists but no Dropdown Menu built | Build the Dropdown Menu component alongside it — detach to set real items |
| Menu items have no icons | Swap each item's icon to match its action (edit, delete, copy, etc.) |
| Menu positioned inside auto-layout parent | Position menu absolutely so parent can't resize or squash it |
| Three-dot trigger not showing pressed state | Set trigger to Pressed state when menu is shown open |
| Table rows missing three-dot actions | Set `Show Threedot = true` on Table AI if row actions exist |

### Hover & Interaction States
| Problem | Improvement |
|---------|-------------|
| Card has no hover state designed | If the card is clickable (navigates somewhere), use Card BG State: "Hover" variant for the hover frame |
| Table row hover not visible | Table AI handles this internally — verify via screenshot |
| Button states not set | Default state for idle, verify Color/State properties are correct |
| Sidebar item missing active highlight | Set the current page's sidebar item to active/selected state |

### General Layout
| Problem | Improvement |
|---------|-------------|
| Any frame without auto-layout | Add auto-layout — `createAutoLayout()` not `createFrame()` |
| Any card/container with fixed height | Change to HUG — `layoutSizingVertical = "HUG"` |
| Any child wider than parent container | Set `layoutSizingHorizontal = "FILL"` |
| Hardcoded hex color visible | Bind to zcat variable via `setBoundVariableForPaint` |
| Default layer names (Frame 1, Rectangle 2) | Rename to semantic names (Stat Cards Row, Action Bar, etc.) |
| Dropdown showing "Select List" placeholder | Fill with realistic selected value from sample-data.md |
| Scroll or overflow on any section | Content exceeds container — check child widths, switch to FILL |
| Layers overlapping each other | Auto-layout missing on parent frame — add it |

### Polish Rules
1. **Composition-only** — reorder sections, change column structure, adjust spacing/gaps, swap Card BG vs flat. NEVER detach, rebuild, or unbind components
2. **Max 2 improvement rounds** per screen — if still failing after 2, build what you have and tell the user what's unresolved
3. **Re-verify after EVERY improvement** — screenshot and confirm auto-layout intact, colors still bound, components not broken, no new overflow
4. **Fix AND enhance** — don't just catch bugs, actively improve anything that looks generic or flat

---

## Visual Polish Checklist

Apply to EVERY screen before showing:
1. Typography hierarchy — headings, body, labels visually distinct
2. Section grouping — wrapped in Card BG or bordered frames
3. Consistent spacing — same gaps for same-level elements
4. Multi-column where appropriate — detail pages use side-by-side
5. Prominent stat values — 24-28px bold number, 12px label
6. **Semantic status colors — badges use DIFFERENT colors per status meaning** (green/red/amber/blue/grey)
7. Help text under controls — 12px in `color/text/placeholder`
8. Danger zone separation — Attention Box (Error) or red-bordered frame
9. Consistent component sizing — same Size variant in groups
10. Components on EVERY screen — no context drift to manual frames
11. Stroke icons everywhere — clone+swap, never emoji/Unicode
12. Action bars balanced — right button needs left-side element
13. Stat cards have icon backgrounds — DIFFERENT colors, HUG height
14. **Tab active state set correctly** — exactly one tab shows active/selected
15. **Table AvatarName ONLY on person columns** — ID, amount, date, status columns use Text/Badge/Date
16. **ALL frames/cards/containers use auto-layout** — no fixed pixel heights or widths, HUG height, FILL width
17. **ZERO hardcoded hex colors** — every fill, stroke, text color is variable-bound (check Selection Colors panel)
18. **ONE Fill (primary) button per action group** — demote others to Outline/Ghost
19. **Code/SQL content uses Code Block component** — never plain text frames
20. **ALL wireframe tabs present** — detach Sub Header if component limit is hit
21. **Empty state buttons have DIFFERENT labels** — never duplicate button text
22. **Popup header/body/footer all FILL width** — no width mismatch
23. **Stepper in popup HEADER area** — never in body, FILL width
24. **Table data in correct columns** — each row's data aligns to its column header, no cross-contamination
