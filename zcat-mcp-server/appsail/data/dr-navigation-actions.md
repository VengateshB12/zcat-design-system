# Navigation, Actions & Structure

## Tabs vs Sidebar Nav vs Accordion

**Tabs:** 2-7 peer sections, frequent switching, one viewed at a time, short labels.

**Sidebar Nav:** 8+ sections, grouped into categories, dedicated settings/config area.

**Accordion:** Sections expanded independently (FAQ, grouped details), multiple visible simultaneously, varying content length.

**Default:** Tabs for 2-7. Sidebar Nav for 8+. Accordion for independently expandable.

### Accordion with Custom Detail Content

Detach to add real content inside open panels. Keep the shell styling (padding, gaps, colors, radius).

**Three content shapes** (from Catalyst AppSail Configuration):
1. **Table with mini action bar** — Search + "Add Variable" link, then Table below (Stretch pattern scoped to accordion)
2. **Single editable value** — description + "Edit" link + bordered/monospace box
3. **Key Value Pair rows** — sub-heading + "Edit" link + stacked label:value rows

---

## Inline Edit vs Detail Page vs Modal Edit

**Inline Edit:** 1-2 fields, quick, stays in context. Field visible in table row/card.

**Detail Page:** Full record with many fields, sub-sections, tabs. URL-based navigation useful.

**Modal Edit:** 3-6 fields as logical group. User sees list behind for context. Secondary action.

**Default:** Inline for 1-2. Modal for 3-6. Detail Page for complex records.

---

## Breadcrumbs: When to Show vs Hide

**Show:** 3+ navigation levels, hierarchical (folders, categories), reached via drill-down.

**Hide:** Top-level views, 1-2 levels (back button suffices), linear flows (wizards), overlays.

---

## Single Column vs Two Column vs Three Column

**Single Column:** Form or linear reading flow, wizard, focused task. Max ~720px content width.

**Two Column:** Primary + sidebar (detail + properties, list + preview), master-detail, settings with sidebar nav. Split: 2/3 + 1/3 or 3/4 + 1/4.

**Three Column:** Communication tools (sidebar + list + detail), high density desktop-only.

**Default:** Single for forms. Two for content + sidebar. Three only for communication/productivity apps.

---

## Cards Grid vs Table for Listings

**Cards Grid:** Items have visual element, 2-4 attributes, browsable, reflows across breakpoints.

**Table:** 5+ attributes, sorting/filtering by columns, data dense and uniform.

---

## Sidebar Layout vs Tab Layout for Settings

**Sidebar:** 6+ categories, grouped into sections, frequently navigated.

**Tab:** 2-5 flat categories, occasionally accessed.

---

## Inline Action vs Toolbar vs Context Menu

**Inline:** 1-3 primary actions per item, frequently used, one-click access.

**Toolbar:** Actions apply to selected items (bulk). 3-5 uniform actions. Contextual toolbar.

**Context Menu:** 4+ actions per item, secondary/infrequent, varies by item type.

**Default:** Inline for 1-3 frequent. Context menu (three-dot) for 4+. Toolbar for bulk/multi-select.

### Building Overflow (Three-Dot) Menu

1. Import **Icon Button**, swap icon to three-dot/overflow via "Change Icon" property
2. Import **Dropdown Menu** (key `ba5cf29d43170458cbdf49ea186e6ff6e50579e0`)
3. Detach Dropdown Menu to set real items — keep shell styling
4. Every menu item gets correct semantic icon (edit→pencil, delete→trash)
5. Position menu absolutely when inside auto-layout (`layoutPositioning = "ABSOLUTE"`)
6. Trigger state = **Pressed** while menu is open

---

## Confirmation Dialog vs Inline Confirm vs Toast

**Confirmation Dialog:** Destructive/irreversible (delete permanently). Significant consequences. Name the specific item.

**Inline Confirm:** Mildly risky but reversible (archive). Quick "Are you sure?" replaces button.

**Toast:** Action succeeded, needs acknowledgement. Easily reversible (with Undo link). No blocking.

**Default:** Dialog for destructive. Toast with Undo for reversible. Inline for moderate-risk.

---

## Single CTA vs Split Button vs Button Group

**Single CTA:** One clear primary action (Save, Submit, Create). Secondary actions use plain buttons.

**Split Button:** One primary with variations (Save & Close, Save & New). Primary most used, alternatives via dropdown.

**Button Group:** 2-4 distinct peer actions of similar importance (Approve, Reject, Defer).

**Default:** Single CTA for forms. Split for action variants. Button Group for peer-level actions.
