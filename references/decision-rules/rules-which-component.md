# Which Component to Use

## MANDATORY: Search Before Build

**This rule overrides everything else. Before building ANY UI element:**

1. Run `search_design_system` with the component name and `includeLibraryKeys` filter
2. If found → import it using the correct method (component vs component_set)
3. If found but properties don't match → check `zcat_get_component` for real properties
4. If genuinely not found → ONLY THEN build manually, and tell the user why

**The #1 root cause of broken builds is skipping the search step.** The library has 79 components. Whatever you're about to build manually, search first. The search takes 1 second; a manual build takes minutes, wastes tokens, and produces wrong results.

### Components Agents Commonly Skip

**Before building ANYTHING, scan this list. If your screen has any of these patterns, use the component — do NOT hand-build.**

| UI Pattern | CORRECT Component | Agent Mistake |
|-----------|-------------------|---------------|
| Popup/Modal/Dialog | Popup + Popup Blur | Hand-draws a frame with X close button |
| Toggle switch | Toggle Button | Draws circles + rectangles manually |
| Dropdown/Select | Dropdown | Draws a frame with text + chevron |
| Text input | Text Box | Draws a bordered rectangle |
| Checkbox | Check Box | Draws a square + checkmark |
| Radio selection | Radio Button | Draws circles manually |
| Step indicator | Stepper | Draws numbered circles + lines |
| Tags/filters | Chip | Draws small bordered rectangles with text |
| Warnings/alerts | Attention Box | Draws a colored box with icon |
| Loading indicator | Loader | Draws spinning circles |
| User icon | Avatar | Draws a colored circle with initials |
| Key-value info | General Details or Key Value Pair | Stacks label+value as plain text |
| Code/SQL editor | Code Block | Draws a plain text frame |
| Section heading | Container Header | Writes bold text manually |
| Progress indicator | Progress Bar | Draws rectangles for progress |
| Breadcrumb trail | Breadcrumbs | Writes "Home > Page > Sub" as text |
| Pagination | Pagination | Draws page number buttons manually |
| Tooltip | Tooltip | Draws a small floating frame |
| Search input | Search | Draws a text field with magnifying glass |
| Date input | Date Picker | Draws a text field with calendar icon |
| Selection cards | Radio Button or Card BG (selected state) | Draws bordered rectangles |
| Accordion/expandable | Accordion | Draws a section with chevron |
| Tab navigation | Tabs (in Sub Header or as component) | Draws underlined text buttons |
| Empty/first-time page | Empty State | Manually builds illustration + text + buttons |

**For Tables: ALWAYS use Table AI** (key `f3a77aaa2d8b332d2c86a9cb77ed6a4f92305c07`). Table AI is zero-detach — configure via setProperties(). NEVER use legacy Table (`954cd82ff912bd312206e7f2776a75d80049ede0`).

---

## MANDATORY: 100% Wireframe Feature Coverage

**Every feature, tab, menu item, button, field, column, and data element shown in the wireframe MUST appear in the final design.** Design creativity applies to HOW elements look, never to WHAT appears.

### Never Drop Features Due to Component Limits

- If Tab supports max 5 but wireframe shows 7 → **detach and add remaining tabs** with same styling
- If Table has 11 column types but you need 13 → add manual columns matching Table's cell styling
- If Dropdown Menu has max 5 items but you need 8 → detach and add more items
- **The component is a starting point, not a ceiling.** Detach and extend when limits are hit
- **Surface the decision:** Tell the user when you detach to extend

### Wireframe Audit Before Building

Before the first `use_figma` call, enumerate every feature from the wireframe:
- All sidebar menu items (name each one)
- All tabs (name each one)
- All table columns (name each one)
- All action buttons and menus (name each one)
- All form fields (name each one)
- All sections, cards, and panels

Cross-check this list against your build plan. If anything is missing, add it before building.

### After Building — Completeness Check

Compare the built screen against the wireframe feature list. Every item must be present. If something was omitted, add it before showing the screen to the user.
