# Spacing & Layout Reference

## Master Spacing Rules

**Only these values are valid:**
0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 128

No other values. No odd numbers. No 18, 22, 36, 44.

## Container Spacing

| Context | Padding | Gap |
|---------|---------|-----|
| Standard page | 16px all sides | 16-24px vertical |
| Stretch table page | 0 (action bar has own 16px top/left/right) | 0 |
| Boxy table page | 16px all sides | 16-24px vertical |
| Dashboard card grid | 16-24px all sides | 16px between cards |
| Settings popup | 0 or 16px | 0 (panels manage own padding) |

## Component Internal Spacing

| Component | Padding | Gap |
|-----------|---------|-----|
| Action bar / Container Header | 16px H, 12px V | 8-12px |
| Card BG (stat tile) | 16-20px | 8-12px label↔value |
| Accordion (open) | 16px | 12-16px |
| Sidebar List Panel | 0 top, 12-16px H | 0-4px items |
| Table header row | 12-16px cell | — |
| Table body row | 12-16px cell | — |
| Form field group | — | 16-20px fields |
| Modal / Popup body | 20-24px | 16-20px sections |
| Tab bar | 0 left | 0 (tabs manage own) |

## Section Spacing

| Between | Gap |
|---------|-----|
| Container Header → first content | 16px |
| Section heading → content | 8-12px |
| Section → next section | 20-24px |
| Card row → next card row | 16px |
| Table → pagination | 12-16px |
| Stat cards → next section | 20-24px |
| Attention Box → next content | 16px |
| Breadcrumbs → page content | 12-16px |

## Text Spacing

| Context | Gap |
|---------|-----|
| Heading → body text | 4-8px |
| Paragraphs | 8-12px |
| Label → input field | 4-6px |
| Helper text below input | 4px |
| Badge next to text | 6-8px horizontal |
| Icon next to text | 4-6px |

## Same-Size-In-Group Rule

Buttons, dropdowns, and text boxes in the same visual group (action bar, form row, filter bar, modal footer) MUST all use the **same Size variant**. Never mix Default + Small in one group.

## Common Mistakes

1. **Arbitrary gaps** — 15, 18, 22 are not on the scale
2. **Inconsistent section gaps** — 24px A→B but 16px B→C on same page
3. **Missing padding on manual frames** — dividers need 16px to align
4. **Too-tight card grids** — less than 12px. Default 16px
5. **Uneven form fields** — always 16-20px between fields
6. **Table cell padding inconsistency** — all cells same horizontal padding

---

## Container Content Patterns

### Standard White Container vs Dashboard Card Grid

**Standard White:** List page, detail page, form, single cohesive block.

**Dashboard Card Grid:** Dashboard/analytics/overview. Independent sections. Each section as card on gray background.

**Dashboard build:**
1. Container fill → `color/bg/sunken` (gray)
2. Padding 16-24px all sides
3. Layout → vertical auto-layout, gap 16px
4. Each section → **Card BG** (White variant), detach for content
5. Side-by-side → horizontal frame, gap 16px, FILL width children

```
Container (fill: color/bg/sunken, padding: 16-24px, gap: 16px, VERTICAL)
├── Card BG — "Event Chart" (full width)
├── Card BG — "Event Statistics" (full width)
└── Row frame (HORIZONTAL, gap: 16px)
    ├── Card BG — "Top Publishers" (FILL)
    └── Card BG — "Most Failures" (FILL)
```

Card headings: 14px SemiBold or 16px SemiBold, `color/text/primary`.

---

## Layout & Composite Components

### Layout: Default vs No Left Menu

**Default** (1259px container): Page has multiple sub-features to navigate. Most Catalyst pages.

**No Left Menu** (1489px container): Single-purpose, no sub-navigation. Overview/dashboard/settings without sidebar.

Import: component_set key `c321d468b0231e052b921026407ff896bdf2c55e`.

### Container Header vs Manual Action Bar

**Container Header (PREFERRED):** Has boolean toggles for title, search, tabs, filters (1-3), buttons, link box, badge, info icon, description. Types: Feature Name, Search, Tab.

**Detach when:** Need element not available as toggle, 4+ filters, custom widgets.

**Manual (last resort):** Completely non-standard layout. ALL fills use variables, ALL spacing from scale.

Import: component_set key `c1e72c452cc937aa5dfc80c6308008c5038bc10f`.

### Sidebar List Panel vs Manual Side Menu

**Sidebar List Panel (PREFERRED):** Standard title + search + grouped menu items. 300px, 3 pre-built sections.

**Detach:** More/fewer than 3 sections. Keep shell styling.

**Manual (Recipe 4):** Non-standard content (cards, tree view, custom widgets).

Import: component key `c042e030f9a1755279cd389302cf6f3f693f6707`.

---

## Feedback Components

### Toast vs Alert Banner vs Inline Message

**Toast:** Transient success, auto-dismiss 3-5 seconds, completed action feedback.

**Alert Banner:** Page-level persistent message, may require action (upgrade, verify), severity matters.

**Inline Message:** Field/section-specific, validation, position-dependent.

### Skeleton vs Shimmer vs Spinner

**Shimmer:** First-load, known layout, 1-3 seconds.

**Skeleton:** Subsequent loads of cached layouts.

**Spinner:** Brief/unpredictable loading, small sections.

### Empty State: Illustration vs Simple Text

**Illustration + CTA:** Primary page, first-time, key onboarding moment.

**Simple Text:** Nested/secondary section, temporary (no search results).

### Progress Bar vs Progress Circle

**Progress Bar:** Section-level, full width, multiple stacked indicators.

**Progress Circle:** Compact, inline, alongside other content.
