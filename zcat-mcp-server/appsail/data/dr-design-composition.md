# Design Composition — From Wireframe to Polished UI

Components alone don't make a design good; how you compose them does.

## Wireframe Interpretation

**Wireframes define WHAT appears on a screen, not HOW it should look.**

**Extract from wireframes:**
- What data is shown (fields, columns, values)
- What actions are available (buttons, menus, links)
- What navigation exists (tabs, sidebar items, breadcrumbs)
- What states matter (empty, loading, error, success)
- What sections the content is grouped into

**Do NOT copy from wireframes:**
- Exact spacing — wireframes use rough spacing, not final values
- Visual hierarchy — wireframes are intentionally flat
- Section styling — wireframes don't show cards, shadows, borders
- Typography scale — wireframes often use uniform text sizing
- Column icons/avatars — wireframes put random icons next to columns; match column type to DATA, not wireframe icons

### When to Follow vs Improve Wireframe Layout

**Follow when:** it matches a standard Catalyst pattern, was designed with the final product in mind, or the user says "match exactly."

**Improve when:** everything is stacked vertically when side-by-side would be better, sections lack visual grouping, no visual hierarchy, or purely functional wireframe.

**When unsure:** Follow content and features exactly, but apply visual polish (hierarchy, grouping, spacing rhythm).

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

**Action hierarchy:** Primary → Fill button. Secondary → Outline button. Tertiary → Ghost button or text link.

## Section Grouping

**Use Card BG for:** stat tiles, info sections, dashboard widgets. Detach to insert content; keep padding, radius, color binding.

**Use bordered frames** (1px `color/border/default`, 6px radius, `color/bg/surface`) **for:** form field groups, configuration sections, content blocks needing separation without elevation.

**Use section headers** (heading text + 8-12px gap) **for:** dividing content within a card or bordered frame.

## ANTI-PATTERN: Wireframe Copy (THE #1 DESIGN QUALITY FAILURE)

**How to identify a wireframe copy (if ANY are true, the design is bad):**
- Stat cards are flat text-only blocks with no icon, no icon background
- Stat cards have fixed height instead of auto-layout HUG
- Connection details are plain text instead of General Details or Key Value Pair
- Activity is an unstyled text list instead of items with status dots + Card BG
- All sections float loose without Card BG wrappers or bordered frames
- Sections stacked vertically when they should be side-by-side
- Table shows avatar on every column (ID, amount, date) instead of only person columns
- All badges in a table are the same color regardless of status meaning
- Tab active state is wrong or not set

**Every detail/overview page MUST have:**
1. Stat cards with icon backgrounds — NOT flat text
2. Connection/details in General Details component — NOT manual text
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

## Card Height — NEVER Fixed

**Stat cards and info cards MUST use auto-layout with HUG height.** NEVER set a fixed pixel height on cards.

- `counterAxisSizingMode = "AUTO"` on the card frame
- `layoutSizingVertical = "HUG"` when the card is inside an auto-layout parent
- Let content determine the height — label + value + subtitle naturally size the card
- All cards in a row should have equal height via the parent's `counterAxisAlignItems = "STRETCH"` — this makes them match the tallest card without fixing any height

**Why this matters:** Fixed-height cards break when content changes, create awkward empty space, and look unprofessional. Auto-layout ensures the card fits its content exactly.

---

## Stat Card Design — Creative, Not Flat

**BAD (wireframe copy):** flat card with just label + value text, no icon.

**GOOD:**
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

- ALWAYS include icon BG with zcat stroke icon
- Each card uses DIFFERENT subtle color (brand-subtle, success-subtle, info-subtle, warning-subtle)
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
| List page | Search + Filters | Create button |
| Detail section | Section heading | Action button |
| Settings section | Heading + description | Save/Apply |
| Card header | Title | Action icon or link |

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
16. **Card height is HUG** — never fixed pixel height on stat/info cards
