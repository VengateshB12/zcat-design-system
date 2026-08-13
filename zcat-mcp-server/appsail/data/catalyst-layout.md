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
2. **Configure** — Set boolean properties BEFORE detaching: `instance.setProperties({'Show Sidemenu': false})` etc.
3. **Detach** — `const frame = instance.detachInstance()` — returns a NEW node with a new ID. Reassign to use the new reference.
4. **Name** — Rename the top frame to the screen name (e.g., "Functions - List View")
4. **Sub Header** — Find node `1319:37210`, update "Feature Names" → actual name (e.g., "Functions")
5. **Sidebar** — Find node `1319:37208`, update:
   - Menu heading text → feature section names
   - List item text → feature sub-pages
   - Highlight the active item (List item 2 style = selected)
6. **Content** — Find Container (`1319:37212`):
   - Clear any placeholder content
   - Build the screen's UI inside this frame
   - Use auto-layout for all content structure
   - Import and place zcat components
   - Bind all colors to zcat variables
7. **Don't modify** — Header, layout spacing, borders, backgrounds, Union shape

## Sub Header Variants

The Sub Header (`1319:37210`) supports different configurations:

- **Default:** Feature name (left) + Help link (right)
- **With Primary Tabs:** Feature name (left) + Help (right) on the first row, then a primary Tab bar below
  - Build tabs as a row inside the Sub Header frame, below the feature name row
  - Use the zcat Tab component from `search_design_system`
  - The tab bar sits at the bottom of the Sub Header with a bottom border
- **With Actions:** Feature name (left) + Help (right) on the first row, then a row below with page-level actions: Primary button, Secondary button, and/or the overflow (three-dot / "Icon Button") menu
- **With Primary Tabs + Actions:** Primary tabs on the left of the second row, action buttons (Primary / Secondary / three-dot) on the right of that same row
- **With Back Navigation:** A back arrow + the item's own name replace the
  feature name (e.g. "‹ Tech Stack Finder"), used when this screen is a
  drill-down into one item selected from a list elsewhere (a Code Recipe, a
  row in a Side Menu list). An inline status chip can sit next to the title
  (e.g. "500 Trial runs left"). Help stays on the right as usual.

## Header Action & Tab Placement — Decision Order

Page-level actions (Primary button, Secondary button, three-dot overflow menu)
and Primary tabs follow the same rule: **try the Sub Header first.**

1. **First preference — Sub Header.** If the screen has page-level actions
   (an action that applies to the whole page, e.g. "Create Function", "Import",
   an overflow menu of page-level operations) and/or primary tabs (top-level
   navigation switching the entire page content, e.g. "Tables | ZCQL Console"),
   place them in the Sub Header, in the row below the feature name — actions on
   the right, tabs on the left, same row when both are present.

2. **Fallback — Container.** Only when placing them in the Sub Header would
   not be meaningful — the action or tabs are scoped to a specific section of
   the page rather than the page as a whole — build them as an action bar at
   the top of the Container instead.

3. **Primary tabs specifically are always first-preference Sub Header.** Do
   not place primary (whole-page) tabs in the Container unless the Sub Header
   genuinely cannot express them for that screen. This holds even when action
   buttons end up in the Container by rule 2 — each is decided independently.

**Two levels of tabs** — placement still depends on the tab's role:

- **Primary tabs** (top-level page navigation, e.g., "Tables | ZCQL Console") →
  **Sub Header**, first preference. These switch the entire page content.
- **Secondary tabs** (content-level tabs within a section, e.g., "General |
  Advanced | Permissions" inside a settings panel) → **Container**. These
  switch content within a specific section of the page.

**How to decide (tabs):** If the tabs control what the whole page shows → Sub
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

**How to decide (actions):** If the button/menu acts on the whole page or its
primary object (e.g., "Create Function" on a functions list page) → Sub
Header, first preference. If it acts on a specific section, card, or table row
→ Container, next to what it acts on.

## Content Area Specs

- **Available width:** 1259px — **WIDTH IS FIXED, NEVER EXCEED IT**
- **Available height:** 736px (can expand vertically if content is longer — height is flexible)
- **Background:** The Container MUST keep its background fill bound to `color/bg/surface` variable — NEVER clear or remove Container fills
- **Border radius:** 6px (Container has rounded corners)
- **Padding:** 14px from Body frame edges
- **Recommended content padding:**
  - **Stretch table page:** Container padding = **0**. The action bar frame gets **16px top + left + right padding, 0 bottom** — the table sits directly below with no gap, running edge-to-edge inside the Container's rounded corners.
  - **Boxy table page / standard page:** Container padding = **16px all sides**.
  - See "Table Variant: Stretch vs Boxy" in `decision-rules.md` for the full decision and structure.

**WIDTH RULE:** Container width is 1259px. ALL content (tables, action bars, forms, cards) MUST fit within this width. Use `layoutSizingHorizontal = "FILL"` on all direct children so they stretch to fill — never exceed — the Container width. The Container's `counterAxisSizingMode` must be `"FIXED"` to lock the width.

**HEIGHT RULE:** Container height CAN grow beyond 736px if the content requires it. Use `primaryAxisSizingMode = "AUTO"` so the Container expands vertically with its content.

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
