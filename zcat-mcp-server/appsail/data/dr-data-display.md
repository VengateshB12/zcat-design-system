# Data Display Rules

## Table vs Cards vs List vs Side Menu

**Use Table when:** Data has 4+ comparable columns, users need to scan/sort/filter, data is uniform, bulk actions needed.

**Use Cards when:** Items have a visual element (thumbnail, icon), 3 or fewer key attributes, items are browsed not compared.

**Use List when:** Items are simple (one primary line + optional secondary), space is constrained, items scanned sequentially.

**Use Side Menu (inside Container) when:** Selecting an item updates a detail view elsewhere — master-detail pattern. 8+ items with short labels. Example: Data Store → Tables list driving schema view.

**Default:** Table for 4+ columns. Cards for ≤3 attributes with visual emphasis. List for simple items. Side Menu when selection drives a detail view.

---

## Building a Card (Card BG)

**Component:** key `f94642162a404b4dd9b0c2c9e8c7e3d1a8ba330e`, component_set. Bind every fill/stroke to zcat variables. Detach to add content; keep padding, radius, color binding.

**Three roles — pick by purpose:**

1. **Stat tile / info card** — **neutral** Card BG. When the value already carries semantic color (green success rate, red error count), a colored background competes with that signal. Let the card be neutral; let the value's color do the signaling.

2. **Catalog / directory card** (e.g., Connections grid — Google, MailChimp, DropBox) — **themed** Card BG, one color per item. These are browsable identities; distinct tint per item helps differentiate.

3. **Selectable option tile** (e.g., Import wizard data-source picker) — **neutral** tile. The icon carries brand color, not the card. Add selection state (border highlight) when chosen.

---

## Card Grid Layout (Applications / Catalog)

**Container structure:**
```
Container (VERTICAL, padding 16/0/16/0, itemSpacing 10)
├── Container Header (Search + filters + Create button)
└── Cards Container (FILL horizontal, VERTICAL, 16px padding left+right)
    ├── Cards Row 1 (horizontal, 16px gap, 3 cards FILL width)
    └── Cards Row 2 (same)
```

**Individual card:**
```
Card frame (FILL width, Card BG fills, 16px padding, 6px radius)
├── Icon BG (40x40, cornerRadius 10, subtle color fill)
│   └── Stroke icon (18x18, centered)
├── Badge (top-RIGHT, positioned absolutely)
├── Title (Body/SemiBold/16, color/text/primary)
├── Subtitle (Body/Regular/14, color/text/secondary) — "Production · Java"
└── Timestamp (Body/Regular/12, color/text/placeholder)
```

**Rules:** Badge at TOP-RIGHT. 3 cards per row, all FILL width. All text uses zcat styles.

---

## List Item Selection: Highlight vs Checkbox

**Highlight-only (NO checkboxes) when:** Single-select — clicking shows detail. No batch operations. This is the standard for almost all Catalyst sidebar lists.

**Checkboxes when (rare):** Batch operations on multiple items. Position at leading edge. Add "Select All" at top.

**Default:** Highlight-only. Do NOT add checkboxes unless wireframe/PRD explicitly shows batch operations.

---

## Description List vs Key-Value Pairs

**MANDATORY: Use components, not manual text.**

| Component | Key | Type | Use when |
|-----------|-----|------|----------|
| **General Details** | `6dd180e6490c68971c8c9b5cc963349b711a5e5d` | component | Pre-built section block with heading + multiple KV rows. Import, detach, customize |
| **Key Value Pair** | `2d82f5c0a6c24ab0370c320d0044cc8346666077` | component_set | Individual KV rows to arrange yourself. Layout=Horizontal |

**CRITICAL: Label:Value alignment is ALWAYS horizontal.** Label LEFT, value RIGHT, same row. NEVER stack vertically.

**General Details (preferred):** For sections of 3-8 related read-only fields (Connection: HOST, PORT, DATABASE).

**Key Value Pair individually:** For 1-3 quick facts alongside other content (in a stat card, card header).

---

## KPI/Stats Cards vs Inline Metrics

**KPI/Stats Cards when:** Metrics are the hero content of dashboard/overview. 3-6 key metrics to highlight. Users glance at these first.

**Inline Metrics when:** Metrics provide context within a section ("12 tasks due today"). 1-2 secondary metrics.

**Default:** KPI Cards for dashboard headers. Inline for contextual data within sections.
