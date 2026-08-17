# Table AI Configuration

## Table AI Variant: Stretch vs Boxy

**ALWAYS use Table AI** (key `f3a77aaa2d8b332d2c86a9cb77ed6a4f92305c07`), NEVER legacy Table. Zero-detach — configure via `setProperties()`.

**Stretch:** Container's content is a list page (action bar + table, nothing else). One context, table is the whole point.

**Boxy:** Page has multiple sections besides the table — detail view with info card, stats, and table of related records.

**Default:** Stretch for single-context list pages. Boxy for detail/multi-section pages.

**CRITICAL: Table AI MUST be responsive** — `layoutSizingHorizontal = "FILL"`. A non-stretching table is a broken layout.

---

## THE #1 TABLE MISTAKE: AvatarName on Every Column

**This is the single most common table build failure.** Agents set AvatarName as the column type for EVERY column — IDs, amounts, dates, status — putting a person avatar icon next to data that has nothing to do with people. This looks absurd and unprofessional.

### AvatarName Rules (ZERO EXCEPTIONS)

**AvatarName is ONLY for columns that represent a PERSON:**
- Customer name, user name, owner, assignee, created by, modified by
- Email address (when shown as a primary identifier)
- Team member, contact person

**AvatarName is NEVER for:**
- IDs, invoice numbers, order numbers, ticket numbers
- Amounts, prices, quantities, percentages
- Dates, timestamps
- Status values (paid, active, pending)
- Database names, service names, project names, file names
- Regions, locations, IP addresses
- Any non-person entity

**BEFORE setting ANY column type, ask: "Is this column about a PERSON?"**
- YES → AvatarName
- NO → use the correct type from the table below

### Column Type Decision Table

**Match by DATA TYPE, not by wireframe appearance. Ignore wireframe icons.**

| Data in this column | Column Type | Why | WRONG type (agent mistake) |
|---------------------|-------------|-----|---------------------------|
| Person name / email / owner | **AvatarName** | Avatar + name + subtitle — ONLY for people | Text (loses avatar) |
| Company / customer / org name | **Text** | Plain text — companies are NOT people | AvatarName (person icon on company), Badge (pill around name) |
| ID / code / invoice number | **Text** | Plain text, no icon | AvatarName (avatar on ID), Badge (pill on ID) |
| Amount / price / currency | **Text** | "$1,240.00" is a value | AvatarName, Badge |
| Status (paid, active, error) | **Badge** | Color-coded label — see Badge Color Rules | Text (loses color signal) |
| Date / timestamp | **Date** | Formatted date display | Text, Badge (pill on date) |
| Description / notes | **Text** | Multi-line text content | — |
| Region / location / type | **Text** | Plain categorical text | AvatarName |
| Count / quantity / metric | **Text** | Numeric values | AvatarName |
| Entity name + icon (database, function) | **IconText** | Icon + text for non-person entities | AvatarName |
| Row actions (edit, delete) | **Threedot** | Three-dot overflow menu | Button |
| Row selection | **Checkbox** | Multi-select for bulk actions | — |
| Execution state (running, stopped) | **ExecutionStatus** | Dot indicator + text | Badge, Text |

### Badge is ONLY for Status — NEVER for Names, IDs, Amounts, or Dates

**Badge renders every value as a colored pill.** This is correct for status values ("Paid" in a green pill, "Failed" in a red pill) but WRONG for:
- Customer names — "Initech" in a blue pill looks like a status tag, not a name
- IDs — "1040" in a pill looks like a filter chip, not a record identifier
- Amounts — "$2,410.00" in a pill looks absurd
- Dates — "2026-08-09" in a pill makes no sense

**Rule: Before setting any column to Badge, ask "Is this column a STATUS or CATEGORY?"**
- YES (paid/pending, active/inactive, high/medium/low) → Badge with semantic colors
- NO (it's a name, ID, amount, date, description) → Text or the appropriate type above

### Why This Matters Visually

AvatarName renders as: **avatar circle + primary text + subtitle text (2 lines)**. When you set EVERY column to AvatarName, EVERY column shows an avatar icon and 2 rows of text — the ID column shows an avatar next to "1042" with "Acme Corp" below it, the amount column shows an avatar next to "$1,240.00" with "paid" below it. This looks broken because:
- Non-person data has a person avatar icon next to it
- Every cell has 2 text lines when most columns need only 1
- The table wastes vertical space with unnecessary subtitle rows
- Data from different columns leaks into wrong rows (the wireframe may show 2 lines per cell as a LAYOUT choice, but the agent copies it literally by using AvatarName for every column)

**The correct result:** Only the person column (customer, owner, assignee) has an avatar and 2 lines. All other columns (ID, amount, status, date) are single-line with no avatar.

### Self-Check After Setting Column Types

After configuring Table AI columns, verify EACH column:
1. Is AvatarName used? → Is that column genuinely about a person? If NO → change to Text/Badge/Date
2. Does any non-person column show an avatar icon or 2 text lines? → WRONG — change column type
3. Is Badge used? → Does it have the correct semantic color per status value? (see Badge Color Rules)
4. Are all badges the same color? → WRONG — each status meaning gets its own color
5. Is Text used for a status column? → Change to Badge (you're losing the color signal)

---

## Badge Color Rules — MANDATORY Semantic Mapping

**Badges MUST use different colors based on meaning. All badges the same color = broken design.**

| Status meaning | Badge Color | Examples |
|---------------|-------------|----------|
| Success / active / paid / available / enabled / completed / live | **Green** | "Paid", "Active", "Available", "Completed", "Live", "Enabled" |
| Error / failed / overdue / critical / deleted / expired | **Red** | "Failed", "Overdue", "Critical", "Expired", "Deleted", "Error" |
| Warning / pending / modifying / expiring / degraded | **Amber/Yellow** | "Pending", "Warning", "Modifying", "Expiring Soon", "Degraded" |
| Info / processing / in progress / provisioning / draft | **Blue** | "Processing", "In Progress", "Provisioning", "Draft", "Queued" |
| Neutral / unknown / N/A / archived / inactive | **Grey** | "Archived", "Inactive", "N/A", "Unknown", "Paused" |

**NEVER use the same badge color for different status meanings.** If a table has "Paid" (green), "Pending" (amber), and "Overdue" (red) in the same column, each row's badge MUST reflect the correct color for its status value.

**The page build spec MUST list the badge color for EVERY unique status value** that appears in sample data. Example:
```
Status column (Badge type):
  - "Paid" → Green
  - "Pending" → Amber  
  - "Overdue" → Red
  - "Draft" → Blue
```

---

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
