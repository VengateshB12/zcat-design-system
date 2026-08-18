# Design Composition — From Wireframe to Polished UI

Components alone don't make a design good; how you compose them does.

## Wireframe Interpretation — NEVER Copy-Paste

**Wireframes define WHAT appears on a screen, not HOW it should look. NEVER replicate the wireframe layout.**

The final design must look NOTHING like the wireframe visually. Same features, completely different presentation. If someone can place the wireframe and final design side by side and say "that's the same layout" — the agent FAILED.

**Extract from wireframes:**
- What data is shown (fields, columns, values)
- What actions are available (buttons, menus, links)
- What navigation exists (tabs, sidebar items, breadcrumbs) — COUNT them
- What states matter (empty, loading, error, success, before/after action)
- What sections the content is grouped into

**Do NOT copy from wireframes:**
- Exact layout or positioning — redesign from scratch with proper patterns
- Exact spacing — wireframes use rough spacing, not final values
- Visual hierarchy — wireframes are intentionally flat
- Section styling — wireframes don't show cards, shadows, borders
- Typography scale — wireframes often use uniform text sizing
- Column icons/avatars — wireframes put random icons next to columns; match column type to DATA, not wireframe icons
- Exact button styles — wireframes may show all buttons the same; apply CTA hierarchy (ONE primary per group)

**Creatively compose BEYOND the wireframe:**
- Use Card BG with shadows and elevation where it improves grouping
- Apply multi-column layouts when content benefits from side-by-side
- Use bordered frames, subtle backgrounds, spacing rhythm to create visual depth
- Choose card recipes from the Card Composition Recipes section that best fit the CONTENT
- Add visual elements the wireframe didn't have: icon backgrounds on stat cards, status dots on activity items, semantic badge colors, balanced action bars
- If the wireframe is flat and basic, the design should be rich and polished — that's the whole point

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
| Section heading | Body/SemiBold/16 | `BODY/Text/Static/Primary` |
| Sub-section heading | Body/SemiBold/14 | `BODY/Text/Static/Primary` |
| Body / data text | Body/Regular/14 | `BODY/Text/Static/Primary` |
| Label / caption | Body/Regular/12 | `BODY/Text/Static/Secondary` |
| Help text | Body/Regular/12 | `BODY/Text/Static/Disable` |
| Card title | Body/SemiBold/16 | `BODY/Text/Static/Primary` |
| Card subtitle | Body/Regular/14 | `BODY/Text/Static/Secondary` |
| Card timestamp | Body/Regular/12 | `BODY/Text/Static/Disable` |

**Stat card values:**

| Element | Text Style | Color Variable |
|---------|-----------|---------------|
| Metric value | Headlines/SemiBold/24 | `BODY/Text/Static/Primary` |
| Metric label | Body/Regular/12 | `BODY/Text/Static/Secondary` |
| Metric unit/suffix | Body/Regular/14 | `BODY/Text/Static/Secondary` |

**Action hierarchy:** Primary → Fill button. Secondary → Outline button. Tertiary → Ghost button or text link. **ONE primary (Fill) per action group — see rules-navigation-actions.md.**

## Section Grouping

**Use Card BG for:** stat tiles, info sections, dashboard widgets. Detach to insert content; keep padding, radius, color binding.

**Use bordered frames** (1px `CARDS/Borders/Default`, 6px radius, `CARDS/Bg Default/Primary`) **for:** form field groups, configuration sections, content blocks needing separation without elevation.

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
| Text (black/dark) | `BODY/Text/Static/Primary` |
| Text (grey/secondary) | `BODY/Text/Static/Secondary` |
| Text (light/placeholder) | `BODY/Text/Static/Disable` |
| Background (white/surface) | `CARDS/Bg Default/Primary` |
| Background (page/grey) | `BODY/Background/Static/Body Bg` |
| Border/divider | `CARDS/Borders/Default` |
| Icon fill/stroke | Same as parent text variable |
| Card background | Use Card BG component (already bound) |
| Brand/accent color | `BADGE/Background/Sec- Primary` (subtle blue) |

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
│   │   └── Fill: BADGE/Background/Sec- Primary (vary per card)
│   └── VERTICAL auto-layout, gap: 4
│       ├── Label (12px Regular, BODY/Text/Static/Secondary)
│       ├── Value (24px SemiBold, BODY/Text/Static/Primary)
│       └── Subtitle (12px Regular, BODY/Text/Static/Disable) — optional
```
Use when: KPI values, counts, percentages, summary metrics.
Icon BG: only when a meaningful icon exists (Users → person, Revenue → currency). Skip for abstract stats.

### Recipe B: Feature/Recipe Card (grid of clickable items)
```
Card BG (detached, 16px padding, FILL width, HUG height)
├── VERTICAL auto-layout, gap: 12
│   ├── Icon circle (48x48, cornerRadius: 24, colored fill)
│   │   └── zcat stroke icon (24x24, white or on-brand)
│   ├── Title (16px SemiBold, BODY/Text/Static/Primary)
│   └── Description (14px Regular, BODY/Text/Static/Secondary, 2-3 lines max)
```
Use when: feature tiles, code recipes, integration cards, template selectors.
These are clickable cards that navigate to a detail page. Icon represents the feature category.
Arrange in 2-4 column grid with equal-width cards.

### Recipe C: Settings/Config Card (inside accordion or settings section)
```
Card BG (detached, 16px padding, FILL width, HUG height)
├── VERTICAL auto-layout, gap: 8
│   ├── HORIZONTAL auto-layout (FILL width, SPACE_BETWEEN)
│   │   ├── Title (16px SemiBold, BODY/Text/Static/Primary)
│   │   └── Three-dot Icon Button — OR — nothing (if no actions)
│   ├── Description (14px Regular, BODY/Text/Static/Secondary)
│   └── HORIZONTAL auto-layout, gap: 12 — footer area
│       ├── Link/action ("App Settings" with icon, BRANDING ICON/Icon Color/Blue)
│       └── Badge/status ("Enabled" green) — optional
```
Use when: settings panels, config options, feature toggles inside accordion sections.
Three-dot menu: include when the card has actions (Edit, Delete, Reset). Skip when the card only navigates.
Status badge: include when the card has an on/off or status state. Skip when status is irrelevant.

### Recipe D: Info/Description Card (bordered, no elevation)
```
Bordered frame (1px CARDS/Borders/Default, 6px radius, 16-24px padding, FILL width, HUG height)
├── HORIZONTAL auto-layout, gap: 24
│   ├── Left content (FILL width)
│   │   ├── Title (16px SemiBold, BODY/Text/Static/Primary)
│   │   ├── Description (14px Regular, BODY/Text/Static/Secondary, multi-line)
│   │   └── HORIZONTAL auto-layout, gap: 16, paddingTop: 12
│   │       ├── Button (Outline, "Connect Cookbook")
│   │       └── Link text ("Learn More", BRANDING ICON/Icon Color/Blue)
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
│   ├── Title (16px SemiBold, BODY/Text/Static/Primary)
│   └── Value or description (14px Regular, BODY/Text/Static/Secondary)
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
│   │       ├── Value (24px SemiBold, BODY/Text/Static/Primary) — "0", "NA", "1,247"
│   │       └── Label (12px Regular, BODY/Text/Static/Secondary) — "Total Invocations"
│   └── Info icon (ⓘ tooltip trigger, BODY/Text/Static/Disable) — optional
```
Use when: KPI metrics on detail/overview pages with different colored icon BGs per metric.
Each card in a row gets a DIFFERENT icon BG color. Info tooltip for metric explanation.

### Recipe G: Key-Value Settings Card with Edit Action
```
Card BG (detached, 16px padding, FILL width, HUG height)
├── VERTICAL auto-layout, gap: 16
│   ├── HORIZONTAL auto-layout (FILL width, SPACE_BETWEEN)
│   │   ├── Title (16px SemiBold, BODY/Text/Static/Primary) — "App Execution Settings"
│   │   └── Edit link (icon + "Edit", BRANDING ICON/Icon Color/Blue)
│   └── VERTICAL auto-layout, gap: 12 — key-value pairs
│       ├── HORIZONTAL: Label (14px Regular, BODY/Text/Static/Secondary, fixed-width) + Value (14px Regular, BODY/Text/Static/Primary)
│       ├── HORIZONTAL: Label + Value
│       └── HORIZONTAL: Label + Value
```
Use when: read-only config/settings display with an edit action. Labels left-aligned in a column, values right.
Use General Details component when available. Edit link top-right, NOT a button.

### Recipe H: Entity Card (card grid with ID + status)
```
Card BG (detached, 16px padding, FIXED width per grid column, HUG height)
├── VERTICAL auto-layout, gap: 12
│   ├── Name (16px SemiBold, BODY/Text/Static/Primary) — "hjm"
│   ├── ID line (12px Regular, BODY/Text/Static/Secondary) — "ID : 3069000000039886"
│   ├── Dotted divider (1px dashed, CARDS/Borders/Default)
│   └── HORIZONTAL auto-layout, gap: 8, SPACE_BETWEEN
│       ├── HORIZONTAL: Integration icon + name (14px, BODY/Text/Static/Secondary) — "Zoho CRM"
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
│   │       ├── Title (16px SemiBold, BODY/Text/Static/Primary) — "Current Plan"
│   │       └── Subtitle (12px Regular, BODY/Text/Static/Secondary) — "20 Jul 2026 - 20 Aug 2026"
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
│   └── Label (14px SemiBold, BODY/Text/Static/Primary) — "Java", "Nodejs", "Python"
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
│   │   └── zcat stroke icon (18×18, color: BODY/Text/Static/White)
│   │   └── Fill: BADGE/Background/Sec- Primary
│   └── VERTICAL auto-layout, gap: 4
│       ├── Label (12px Regular, BODY/Text/Static/Secondary)
│       ├── Value (24px SemiBold, BODY/Text/Static/Primary)
│       └── Subtitle (12px Regular, BODY/Text/Static/Disable) — optional
```

**GOOD — without icon (Recipe E):** when no natural icon exists, or when the card is simple enough that typography alone provides hierarchy.
```
Card BG (detached, 16px padding, FILL width, HUG height)
├── VERTICAL auto-layout, gap: 4
│   ├── Label (12px Regular, BODY/Text/Static/Secondary)
│   └── Value (24px SemiBold, BODY/Text/Static/Primary)
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
- Card 1: `BADGE/Background/Sec- Primary` (blue)
- Card 2: `BADGE/Background/Sec- Green` (green)
- Card 3: `BADGE/Background/Sec- Orange` (amber)
- Card 4: `BADGE/Background/Sec- Red` (red)

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
| Sections floating without grouping | Wrap in Card BG or bordered frame (1px `CARDS/Borders/Default`, 6px radius) |
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
| Link text using hardcoded blue hex | Bind to `BRANDING ICON/Icon Color/Blue` variable |
| Link not visually distinct from body text | Use Link component or text with `BRANDING ICON/Icon Color/Blue` color binding |
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

## Composition Critique — A GATE, Not a Checklist

After fixing bugs and before showing the screen, run this critique. It is **blocking**: the screen cannot be shown until it passes or you record the no-change line below.

**Judge the RENDERED SCREENSHOT, not your plan.** Look at it as a product designer seeing it for the first time, with no knowledge of the composition you intended.

**This reasoning is FORBIDDEN:**
> "The Composition Direction was good, therefore the final UI is good."

A correct composition decision is not evidence of a resolved screen. The most common failure is a right plan that renders flat — because typography lost its weight, surfaces lack contrast, or an intended accent never got built. Evaluate the pixels.

**Two hard automatic failures:**
- **All-Regular typography.** If every authored text node is Regular weight, there is no hierarchy regardless of size differences. FAIL.
- **Cards that don't read as cards.** If card surface and page background are near-identical with no border/elevation contrast, the containment is doing nothing. FAIL.

**Ask yourself:**

1. **Focal point** — Does the user's eye land on the most important content first? Or does everything compete equally for attention?
2. **Visual hierarchy** — Can a new user scan this page and understand the structure in 3 seconds? Are primary actions obvious and secondary actions subdued?
3. **Visual monotony** — Does the page look like a stack of identical cards? Vary card sizes, use multi-column layouts, mix card types (stat card ≠ info card ≠ table card). Not every section needs a card — some content works better as direct elements with spacing
4. **Card overuse** — Did you wrap every section in Card BG just because the component exists? Cards should group related content that benefits from visual separation. A page where everything is a card is the same as a page where nothing is
5. **Whitespace intentionality** — Is the spacing creating rhythm and grouping, or is it just default gaps? Larger gaps between sections, smaller gaps within sections. The spacing should communicate structure
6. **Content density** — Does the density match the user's task? A monitoring dashboard needs density. A settings page needs breathing room. A detail page needs both — dense data in some sections, spacious forms in others
7. **Typography hierarchy** — Is there real WEIGHT contrast (Semi Bold headings/values vs Regular body), or only size differences? Size alone is not hierarchy
8. **Proportions** — Do section and column sizes reflect actual importance, or is everything equal-width by default?
9. **Viewport allocation** — Does content stop at ~50-60% of the height leaving accidental emptiness below? Fix with better proportions, larger primary surfaces, or more rows — never with invented filler content
10. **Designed or assembled** — Does this look like a designer made it, or like components were placed in a vertical column?
11. **Senior designer test** — Would a senior product designer look at this and say "ship it"? Or would they redesign the layout? If the answer is "they'd rearrange sections, change the grouping, adjust emphasis" — do that now

**Then do exactly one of two things:**

- **Problems found:** fix them (composition-only — reorder, regroup, adjust emphasis, rebind typography; never detach), re-screenshot, and re-run this critique. Max 2 rounds. After round 2, show what you have and state plainly what remains unresolved.
- **No problems found:** record this line verbatim in your summary:
  > "No meaningful design improvement identified; keeping the current composition."

**Never force changes just to make the UI look more creative.** A simple form that is already clear and easy to use needs nothing. The test is whether the composition is *intentional for this task* — not whether it is unusual.

---

## Visual Polish Checklist

Apply to EVERY screen before showing:
1. Typography hierarchy — headings, body, labels visually distinct
2. Section grouping — wrapped in Card BG or bordered frames
3. Consistent spacing — same gaps for same-level elements
4. Multi-column where appropriate — detail pages use side-by-side
5. Prominent stat values — 24-28px bold number, 12px label
6. **Semantic status colors — badges use DIFFERENT colors per status meaning** (green/red/amber/blue/grey)
7. Help text under controls — 12px in `BODY/Text/Static/Disable`
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
