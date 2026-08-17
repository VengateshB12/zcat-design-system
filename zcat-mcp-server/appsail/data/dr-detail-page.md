# Detail Page & Master-Detail Rules

## Building a Side Menu inside Container (Master-Detail)

Container padding: **16 top, 0 right/bottom/left**. Two panels side by side, separated by a **Divider** (key `ae8ace032eb5e3ff8b86424a97be7a3728bde3bd`, Direction: "Vertical", `layoutSizingVertical = "FILL"`).

**List panel** (~260px fixed): mini action bar (search + primary button) on top, then item list built from **Nav Button**, selected item highlighted. **No checkboxes** for single-select.

**Detail panel** (FILL width, ~16px padding): shows selected item's content.

**Divider is REQUIRED** — creates visible split line. Without it, panels merge visually.

**Extends to three panels** when there's a separate output area (e.g., API tester: endpoints → config → Code Editor response).

**Primary tabs are scope-relative.** Page-level tabs go in Sub Header. But detail view tabs (e.g., "Schema View | Scopes | Data View") are also primary tabs — built with primary tab treatment even though they're in Container next to the side menu.

**Stretch vs Boxy still applies** — scoped to the detail panel's content.

---

## Empty State Pages

**ALWAYS use the Empty State component** (key `03321dc06395aa6b94783d0289637de8ddc82de0`, type `component`). NEVER manually build empty state UI.

**Properties:**
| Property | Default | Purpose |
|----------|---------|---------|
| Show Illustration | true | Illustration at top |
| Show Heading | true | Title (e.g. "No Database Yet") |
| Show Description | true | Subtitle text |
| Show Primary Button | true | Fill CTA button |
| Show Outline Button | true | Secondary button |

**Rules:**
1. **NO Container Header** — nothing to search/filter
2. **NO duplicate CTAs** — if empty state has "Create X", don't also put it in Sub Header
3. **Sub Header stays simple** — title + Help only (instance, not detached)
4. **Container padding = 0**, `itemSpacing = 0`

**Structure:**
```
Sub Header (INSTANCE — title + Help only, NO buttons)
Body (padding 14px)
└── Container (padding 0/0/0/0, itemSpacing 0)
    └── Empty State Area (FRAME, FILL both, center both axes)
        └── Empty State (INSTANCE — component key 03321dc0...)
```

---

## Inline Empty State (section-level)

When a section within a page has no data (but the page itself is NOT empty):
- Small illustration centered in the section
- Simple text: "No Event in progress"
- NO buttons, NO CTA
- Section still has its heading with action (e.g., "Refresh")

Use full Empty State component only for WHOLE-PAGE empty states. For individual sections, use simple centered illustration + text.
