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
