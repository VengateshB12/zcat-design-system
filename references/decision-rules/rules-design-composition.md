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
- Connection details are plain text instead of General Details or Key Value Pair
- Activity is an unstyled text list instead of items with status dots + Card BG
- All sections float loose without Card BG wrappers or bordered frames
- Sections stacked vertically when they should be side-by-side

**Every detail/overview page MUST have:**
1. Stat cards with icon backgrounds — NOT flat text
2. Connection/details in General Details component — NOT manual text
3. Activity feeds in Card BG with status dots — NOT plain text lists
4. Two-column layout for info sections — NOT everything vertical
5. Every section wrapped in Card BG or bordered frame — NO floating content

## Stat Card Design — Creative, Not Flat

**BAD (wireframe copy):** flat card with just label + value text, no icon.

**GOOD:**
```
Card BG (detached, 16px padding, FILL width)
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
6. Semantic status colors — green=success, amber=warning, red=error, blue=info
7. Help text under controls — 12px in `color/text/placeholder`
8. Danger zone separation — Attention Box (Error) or red-bordered frame
9. Consistent component sizing — same Size variant in groups
10. Components on EVERY screen — no context drift to manual frames
11. Stroke icons everywhere — clone+swap, never emoji/Unicode
12. Action bars balanced — right button needs left-side element
13. Stat cards have icon backgrounds — 40×40 icon BG with stroke icon
