# Table AI Configuration

## Table AI Variant: Stretch vs Boxy

**ALWAYS use Table AI** (key `f3a77aaa2d8b332d2c86a9cb77ed6a4f92305c07`), NEVER legacy Table. Zero-detach — configure via `setProperties()`.

**Stretch:** Container's content is a list page (action bar + table, nothing else). One context, table is the whole point.

**Boxy:** Page has multiple sections besides the table — detail view with info card, stats, and table of related records.

**Default:** Stretch for single-context list pages. Boxy for detail/multi-section pages.

**CRITICAL: Table AI MUST be responsive** — `layoutSizingHorizontal = "FILL"`. A non-stretching table is a broken layout.

## Table AI Column Type Selection

**Match data type, not wireframe icons:**

| Column Data | CORRECT Type | WRONG (agent mistake) |
|-------------|-------------|-----------------------|
| Person name, user, owner | AvatarName | Text |
| Database name, service name | Text or IconText | AvatarName (person icon on DB is wrong) |
| Status (Available, Stopped) | Badge | Text (loses color) |
| Date/time | Date | Text |
| Region, compute, storage size | Text | AvatarName |
| Connections "45/200" | Text | AvatarName |
| Row actions | Threedot | Button |

**NEVER use AvatarName for non-person data.** AvatarName shows a person icon — ONLY for user names, owners, assignees. Using it for database names or regions is WRONG.

## Table AI Properties

| Property | Values |
|----------|--------|
| `Style` | "Stretch" or "Boxy" |
| `Columns` | "3", "4", "5", "6", "7", "8" |
| `Show Checkbox` | boolean (default false) |
| `Show Threedot` | boolean (default true) |
| `Show Pagination` | boolean (default true) |
| `Col 1` through `Col 8` | instance swap (component node ID, NOT key) |

## Structural Differences by Style

**Stretch:**
```
Container (VERTICAL, padding 16/0/0/0, itemSpacing 10)
├── Container Header (FIXED width, HUG height, padding 6/14/6/14)
├── Table AI (Stretch, FILL horizontal, FILL vertical, Show Pagination = false)
└── Pagination (FILL horizontal, FIXED vertical, padding 6/16/6/16)
```
Body frame: padding 14px all sides, itemSpacing 10.

**Boxy:** Container padding 16px all sides, itemSpacing 10.

**Cards view:** Container padding 16/0/16/0, itemSpacing 10.

**Empty state:** Container padding 0 all sides, itemSpacing 0.

---

## Filter Overflow: Inline vs Filter Icon

**Inline dropdowns:** 1-3 filters, each shown as dropdown next to Search.

**Filter icon + menu:** 4+ filters — collapse behind a single Filter icon button.

**Applied filters:** Show as removable **Chip** (key `521cb36aff97e00dc59f5c37b5f04a684b475930`) below action bar. Text "Label: Value", `Removable = true`. Add "Clear All" link when any filter is active.

**Alternate style — always-active chip bar:** For always-set query parameters (Log Type, Resources, Time Period). Same Chip component but `Removable = false`. Each chip clickable to change value, not remove.

**Pick by:** Optional filters → dropdown bar (Removable: true). Always-active query state → chip bar (Removable: false).
