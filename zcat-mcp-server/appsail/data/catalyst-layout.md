# Catalyst Page Layout

## Source
- **Primary Figma file:** `ugOZk4O0g6XpviEBSN24mF` (ZCat-AI Understandable)
- **Legacy file:** `81LbutNhl2k7H18bJEs9Us` (ZCatalyst Design System — original)
- **Layout component:** component_set (key `c321d468b0231e052b921026407ff896bdf2c55e`), variants: Default and No Left Menu
- **Default variant size:** 1582 × 860px

## Layout Properties

| Property | Type | Values | Default | Notes |
|----------|------|--------|---------|-------|
| type | variant | Default, No Left Menu | Default | Default has sidebar, No Left Menu does not |
| Show Header | boolean | true/false | true | Toggle Header visibility |
| Show Service Menu | boolean | true/false | true | Toggle ServiceMenu (left nav rail) visibility |
| Show Sidemenu | boolean | true/false | true | Toggle Sidemenu (left sidebar) visibility |
| Show Sub Header | boolean | true/false | true | Toggle Sub Header visibility |
| Container left Menu | boolean | true/false | false | Show left menu inside Container (unpublished) |
| Empty Sates | boolean | true/false | false | Show empty state in Container (unpublished) |

Set boolean properties BEFORE detaching the Layout instance. After detach, the boolean toggles no longer work.

## Node Structure (Default Layout — type=Default)

```
Layout (1554:19926) — COMPONENT
└── Layout with Side menu (1319:37193) — root frame
    │
    ├── Union (1319:37194) — active menu indicator shape (boolean operation)
    │   DO NOT MODIFY
    │
    ├── ServiceMenu (1319:37204) — INSTANCE
    │   Position: left nav rail (64px wide)
    │   Contains: Service icons (Services, CloudScale, Serverless, SmartBrowz, QuickML, Job Scheduler, etc.)
    │   RULE: Don't restructure. CAN update icon instances and label text.
    │
    └── Header, Side menu & Body (1319:37205) — frame
        │
        ├── Header (1319:37206) — INSTANCE
        │   Size: 1516 × 48px
        │   Contains: Project Names dropdown, Search Here input, Avatar
        │   RULE: DO NOT TOUCH
        │
        └── Side menu & Body (1319:37207) — frame (812px tall)
            │
            ├── Sidemenu (1319:37208) — INSTANCE
            │   Size: 230 × 812px
            │   Contains: Service Name header, HEADING groups, List items 1-5 per group
            │   RULE: Don't restructure. CAN update menu item text, icons, heading text.
            │
            └── Body & Sub Header (1319:37209) — frame (1287px wide)
                │
                ├── Sub Header (1319:37210) — INSTANCE
                │   Size: 1287 × 48px
                │   Contains: "Feature Names" text (left) + "Help" link (right)
                │   RULE: RARELY EDIT. CAN update feature name text.
                │
                └── Body (1319:37211) — frame
                    │
                    └── Container (1319:37212) — FRAME
                        Size: 1259 × 736px
                        Padding from Body: 14px
                        ═══════════════════════════════════
                        ║  THIS IS THE MAIN WORK AREA     ║
                        ║  ALL DESIGN CONTENT GOES HERE    ║
                        ═══════════════════════════════════
```

## Zones

| Zone | Node ID | Type | Editable |
|------|---------|------|----------|
| Nav Rail | `1319:37204` | Instance | Icons + labels only |
| Header | `1319:37206` | Instance | No |
| Sidebar | `1319:37208` | Instance | Menu text + icons only |
| Sub Header | `1319:37210` | Instance | Feature name text only |
| **Content Area** | **`1319:37212`** | Frame | **Full control** |

## Build Workflow

For each new Catalyst screen:

1. **Import** — `const layoutSet = await figma.importComponentSetByKeyAsync('c321d468b0231e052b921026407ff896bdf2c55e')` then `const instance = layoutSet.defaultVariant.createInstance()` (or select No Left Menu variant first)
2. **Configure** — Set boolean properties BEFORE detaching. Property keys may have hash suffixes — inspect `Object.keys(instance.componentProperties)` to get actual keys if `setProperties()` throws. Example: `instance.setProperties({'Show Sidemenu#13106:9': false})`
3. **Detach** — `const frame = instance.detachInstance()` — returns a NEW node with a new ID. **All child node IDs change after detach.** Reassign to use the new reference.
4. **Re-find nodes** — After detach, ALL pre-detach node IDs are invalid. Re-find by name:
   ```js
   const body = frame.findOne(n => n.name === 'Body & Sub Header' || n.name === 'Body');
   const subHeader = frame.findOne(n => n.name === 'Sub Header');
   const sidebar = frame.findOne(n => n.name === 'Sidemenu');
   const container = body.findOne(n => n.name === 'Container');
   ```
5. **Name** — Rename the top frame to the screen name (e.g., "Functions - List View")
6. **Sub Header** — Update "Feature Names" → actual name (e.g., "Functions")
7. **Sidebar** — Update sidebar menu (see Sidebar Structure below)
8. **Content** — Build inside Container:
   - Clear any placeholder content
   - Build the screen's UI inside this frame
   - Use auto-layout for all content structure
   - Import and place zcat components
   - Bind all colors to zcat variables
9. **Clone for additional screens** — `frame.clone()` lands on the SAME page. Always `targetPage.appendChild(clonedFrame)` to move it. Without this, clones silently appear on wrong pages
10. **Don't modify** — Header, layout spacing, borders, backgrounds, Union shape

## Sidebar (Sidemenu) Internal Structure

The sidebar instance has this nested structure:

```
Sidemenu (INSTANCE, 230×812)
├── Service Name (TEXT) — the product/service header
├── NAVIGATION (FRAME) — group 1
│   ├── HEADING (FRAME)
│   │   └── heading text (TEXT)
│   ├── _Sidemenu Source (INSTANCE) — menu item template (hidden)
│   ├── List item 2 (INSTANCE) — menu item 1
│   ├── List item 2 (INSTANCE) — menu item 2
│   ├── List item 2 (INSTANCE) — menu item 3
│   └── ... more List items
├── NAVIGATION (FRAME) — group 2 (duplicate, same structure)
├── NAVIGATION (FRAME) — group 3 (duplicate, same structure)
└── ... more groups
```

**Default:** The sidebar ships with 3 duplicate NAVIGATION groups, each containing a heading + 3-5 list items.

### How to Configure

1. **Hide unused groups** — If you need only 1-2 groups, set `.visible = false` on the extra NAVIGATION frames
2. **Update headings** — Find TEXT nodes inside HEADING frames, load font, set characters
3. **Update menu items** — Find "List item 2" instances inside each NAVIGATION group:
   - Update text: find TEXT child, load font, set characters
   - Set active state: `listItem.setProperties({"State": "Active"})` for the current page's item
   - Set default state: `listItem.setProperties({"State": "Default"})` for all others
   - Hide extras: set `.visible = false` on unneeded items
4. **"_Sidemenu Source"** — This is a hidden template instance. Leave it hidden. Do not modify.
5. **EXACTLY ONE item must be Active** — matching the page being shown

## Sub Header — NEVER DETACH

**The Sub Header is ALWAYS an instance — NEVER detach it.** This is an absolute
rule with NO exceptions. Detaching the Sub Header breaks its styling, spacing,
and variant behavior. All configurations below work within the instance.

**CRITICAL:** Even for back navigation, breadcrumbs, tabs, or buttons — modify
the instance's internal children (update text, add Tab instances, add Button
instances inside the existing auto-layout). NEVER detach to "make room" for
custom content.

The Sub Header (`1319:37210`) supports different configurations:

- **Default:** Feature name (left) + Help link (right)
- **With Primary Tabs:** Feature name (left) + Help (right) on the first row, then a primary Tab bar below
  - Build tabs as a row inside the Sub Header instance, below the feature name row
  - Use the zcat Tab component from `search_design_system`
  - The tab bar sits at the bottom of the Sub Header with a bottom border
- **With Actions:** Feature name (left) + Help (right) on the first row, then a row below with page-level actions: Primary button, Secondary button, and/or the overflow (three-dot / "Icon Button") menu
- **With Primary Tabs + Actions:** Primary tabs on the left of the second row, action buttons (Primary / Secondary / three-dot) on the right of that same row
- **With Back Navigation:** A back arrow + the item's own name replace the
  feature name (e.g. "‹ Tech Stack Finder"), used when this screen is a
  drill-down into one item selected from a list elsewhere (a Code Recipe, a
  row in a Side Menu list). An inline status chip can sit next to the title
  (e.g. "500 Trial runs left"). Help stays on the right as usual.

**Common agent mistake:** Agent detaches Sub Header to add breadcrumbs + tabs
manually. This is WRONG — breadcrumb navigation is handled by the back
navigation variant (update the feature name text to show "‹ item-name"), and
tabs are added as Tab component instances inside the Sub Header's auto-layout.

## Header Action & Tab Placement — Decision Order

Page-level actions and primary tabs follow different rules depending on whether
the page has tabs.

### Buttons (Create, Export, etc.)

**The placement depends on whether the Sub Header has primary tabs:**

1. **NO tabs in Sub Header → buttons go in Container Header.** The Sub Header
   stays simple (page title + Help only). The Container Header component
   becomes the action bar: Search (left) + filter dropdowns + Export/secondary
   button + Create/primary button (right). This is the standard list page pattern.

2. **Tabs in Sub Header + COMMON action for all tabs → button in Sub Header.**
   When the button applies regardless of which tab is active (e.g., "Create
   Function" works for All Functions, Event Functions, Cron Functions alike),
   place it in the Sub Header's title row (right side, same row as the page
   title, ABOVE the tabs). The Container Header has only Search + filters.

3. **Tabs in Sub Header + TAB-SPECIFIC actions → buttons in Container Header.**
   When each tab has its own distinct action that changes per tab, buttons go
   in the Container Header (because the button changes when the user switches
   tabs). The Sub Header only has tabs, no buttons.

4. **Section-scoped actions → Container.** If a button acts on a specific
   section, card, or table (e.g., "Add Replica" next to a replicas table),
   place it in that section's header, not in Sub Header.

**CRITICAL: NEVER put buttons in Sub Header when there are no tabs.** The Sub
Header without tabs is just the page title + Help link. Putting buttons there
detaches or modifies the Sub Header component unnecessarily.

**Sub Header button position:** Buttons go in the TITLE ROW (same row as the
page title + Help), NOT in the tab row. The Sub Header has two rows when tabs
are present: row 1 = title + buttons + Help, row 2 = Primary Tabs. Buttons
are always in row 1.

### Tabs

**Primary tabs** (top-level page navigation, e.g., "Overview | Monitoring |
Backups | Settings") → **Sub Header**, always. These switch the entire page
content.

**Secondary tabs** (content-level tabs within a section, e.g., "General |
Advanced | Permissions" inside a settings panel) → **Container**. These
switch content within a specific section of the page.

**How to decide:** If the tabs control what the whole page shows → Sub
Header. If they control a section within the page → Container.

**Sub Header tabs default to primary tab styling — don't copy an inconsistent
live example.** The actual Catalyst product isn't perfectly consistent: some
pages (e.g. a Function's Overview | Code | Configuration) render their Sub
Header tabs in what looks like a lighter/secondary style, apparently for
visual variety rather than because they're semantically secondary. Treat that
as a one-off inconsistency in the reference product, not a pattern to copy.
**The default stays: Sub Header tabs use primary tab styling.** Only build a
different tab style there when the specific wireframe/screenshot/PRD you were
given explicitly shows that treatment for the screen you're building — never
because you've seen it once elsewhere in the live product.

### Container Header as Action Bar

**The Container Header component is the standard action bar inside the Container.**
It is an existing zcat component — NEVER build a manual action bar frame.

**Standard list page Container Header layout (no tabs):**
```
Container Header (component instance, FILL width, detach for content)
├── Left side: Search component + filter Dropdowns
└── Right side: Export button (Outline/Ghost) + Create button (Fill)
```

**Container Header with tabs in Sub Header (filters only):**
```
Container Header (component instance, FILL width, detach for content)
├── Left side: Search component + filter Dropdowns
└── Right side: (no primary buttons — they're in Sub Header)
```

NEVER build a manual frame for the action bar. ALWAYS use Container Header.

## Content Area Specs

- **Available width:** 1259px — **WIDTH IS FIXED, NEVER EXCEED IT**
- **Available height:** 736px (can expand vertically if content is longer — height is flexible)
- **Background:** The Container MUST keep its background fill bound to `color/bg/surface` variable — NEVER clear or remove Container fills
- **Border radius:** 6px (Container has rounded corners)
- **Padding:** 14px from Body frame edges
- **Container auto-layout (all page types):**
  - `layoutMode = "VERTICAL"`
  - `counterAxisSizingMode = "FIXED"` (locks width)
  - `itemSpacing = 10`
- **Recommended Container padding by page type:**
  - **Stretch table page:** padding = **16 top, 0 right, 0 bottom, 0 left**. The 16px top gives breathing room above Container Header. Table AI and Pagination run edge-to-edge.
  - **Cards view page:** padding = **16 top, 0 right, 16 bottom, 0 left**. Top and bottom padding, sides edge-to-edge for cards grid.
  - **Empty state page:** padding = **0 all sides**, `itemSpacing = 0`. The empty state illustration centers itself.
  - **Boxy table page / standard page:** padding = **16px all sides**.
  - See "Table Variant: Stretch vs Boxy" in `decision-rules.md` for the full decision and structure.

- **Body frame (parent of Container):**
  - `layoutMode = "VERTICAL"`, padding = **14px all sides**, `itemSpacing = 10`
  - `layoutSizingHorizontal = "FILL"`, `layoutSizingVertical = "FILL"`

- **Stretch table Container structure (correct order):**
  ```
  Container (VERTICAL, padding 16/0/0/0, itemSpacing 10)
  ├── Container Header (FIXED width, HUG height, internal padding 6/14/6/14)
  │   ├── Search (left) + filter Dropdowns + buttons (right)
  ├── Table AI (FILL horizontal, FILL vertical, Show Pagination = false)
  └── Pagination (FILL horizontal, FIXED vertical, internal padding 6/16/6/16)
  ```
  Table AI's `Show Pagination` should be **false** — use the separate Pagination component instead, which sits at the Container bottom edge.

- **Cards view Container structure:**
  ```
  Container (VERTICAL, padding 16/0/16/0, itemSpacing 10)
  ├── Container Header (FIXED width, HUG height, internal padding 6/14/6/14)
  │   ├── Search (left) + filter Dropdowns + buttons (right)
  └── Cards Grid (auto-layout frame, FILL horizontal)
  ```

**WIDTH RULE:** Container width is 1259px (Default layout) or 1489px (No Left Menu). ALL content must fit within this width. Table AI and Pagination use `layoutSizingHorizontal = "FILL"` to stretch. Container Header uses FIXED width matching the container. The Container's `counterAxisSizingMode` must be `"FIXED"` to lock the width.

**HEIGHT RULE:** Container height CAN grow beyond 736px if the content requires it. Use `primaryAxisSizingMode = "AUTO"` (or `"FIXED"` + `layoutSizingVertical = "FILL"` for stretch tables where the table should fill remaining space).

**TITLE RULE:** The Sub Header already displays the page/feature name. NEVER add a duplicate title heading inside the Container.

**RULE:** NEVER remove or clear the Container's background fill. The Container's `color/bg/surface` fill is what gives it the white card appearance on the sunken/gray Body background. If you clear it, the content area loses its visual boundary.

---

## No Left Menu Layout Variant (type=No Left Menu)

Use when the page has no left sidebar navigation — single-purpose pages, overview pages, settings, or pages with no sub-navigation.

### Node Structure

```
Layout — No Left Menu variant (node 13063:1760) — from COMPONENT_SET
└── Layout with Side menu (13063:1761) — root frame
    │
    ├── Union (13063:1762) — active menu indicator shape (boolean operation)
    │   DO NOT MODIFY
    │
    ├── ServiceMenu (13063:1772) — INSTANCE
    │   Position: left nav rail (64px wide)
    │   Contains: Service icons
    │   RULE: Don't restructure. CAN update icon instances and label text.
    │
    └── Header, Side menu & Body (13063:1773) — frame
        │
        ├── Header (13063:1774) — INSTANCE
        │   Size: 1516 × 48px
        │   Contains: Project Names dropdown, Search Here input, Avatar
        │   RULE: DO NOT TOUCH
        │
        └── Side menu & Body (13063:1775) — frame
            │
            └── Body & Sub Header (13063:1777) — frame
                │
                ├── Sub Header (13063:1778) — INSTANCE
                │   Size: 1517 × 48px
                │   Contains: "Feature Names" text (left) + "Help" link (right)
                │   RULE: RARELY EDIT. CAN update feature name text, add tabs, add action buttons.
                │
                └── Body (13063:1779) — frame
                    │
                    └── Container (13063:1780) — FRAME
                        Size: 1489 × 736px
                        Padding from Body: 14px
                        ═══════════════════════════════════════
                        ║  THIS IS THE MAIN WORK AREA         ║
                        ║  ALL DESIGN CONTENT GOES HERE        ║
                        ║  WIDTH: 1489px (wider than Default)  ║
                        ═══════════════════════════════════════
```

**NOTE:** No Sidemenu node — this variant has no left sidebar navigation. The Container is wider (1489px vs 1259px in Default) because the sidebar space is reclaimed.

### Zones

| Zone | Node ID | Type | Editable |
|------|---------|------|----------|
| Nav Rail | `13063:1772` | Instance | Icons + labels only |
| Header | `13063:1774` | Instance | No |
| Sub Header | `13063:1778` | Instance | Feature name, buttons, tabs |
| **Content Area** | **`13063:1780`** | Frame | **Full control** |

### Build Workflow (No Left Menu)

For each new Catalyst screen without left navigation:

1. **Import** — Import Layout component_set: `await figma.importComponentSetByKeyAsync('c321d468b0231e052b921026407ff896bdf2c55e')`
2. **Select variant** — Get the No Left Menu variant and create instance
3. **Detach** — Detach the instance so internal frames become editable
4. **Name** — Rename the top frame to the screen name
5. **Sub Header** — Find node `13063:1778`, update feature name
6. **Content** — Find Container (`13063:1780`):
   - Clear any placeholder content
   - Build the screen's UI inside this frame
   - Use auto-layout for all content structure
   - Import and place zcat components
   - Bind all colors to zcat variables
7. **Don't modify** — Header, layout spacing, borders, backgrounds, Union shape

### Content Area Specs (No Left Menu)

- **Available width:** 1489px — **WIDTH IS FIXED, NEVER EXCEED IT**
- **Available height:** 736px (can expand vertically)
- **Background:** Container MUST keep its background fill bound to `color/bg/surface` variable
- **Border radius:** 6px
- **Padding:** 14px from Body frame edges
- **Recommended content padding:** Same rules as Default layout (Stretch: Container 0, action bar 16px top/left/right; Boxy: Container 16px all sides)

**WIDTH RULE:** Container width is 1489px for No Left Menu. ALL content must fit within this width. Use `layoutSizingHorizontal = "FILL"` on all direct children. The Container's `counterAxisSizingMode` must be `"FIXED"`.

**All other rules (HEIGHT, TITLE, BACKGROUND) are identical to the Default layout.**

---

## Choosing a Layout Variant

| Criterion | Default (with sidebar) | No Left Menu |
|-----------|----------------------|--------------|
| Container width | 1259px | 1489px |
| Has Sidemenu | Yes (230px) | No |
| Use when | Page has sub-features to navigate (Data Store, Functions, etc.) | Single-purpose pages, overview pages, settings |
| Sub Header | Same behavior | Same behavior |
| Container rules | Same | Same (except width) |
