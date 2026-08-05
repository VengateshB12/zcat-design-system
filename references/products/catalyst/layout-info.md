# Catalyst Page Layout

## Source
- **Figma file:** `81LbutNhl2k7H18bJEs9Us` (ZCatalyst Design System)
- **Layout component:** `1554:19926` (name: "Layout")
- **Total size:** 1582 × 860px

## Node Structure

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

1. **Clone** — Create instance of Layout component (`1554:19926`)
2. **Detach** — Detach the instance so internal frames become editable
3. **Name** — Rename the top frame to the screen name (e.g., "Functions - List View")
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

## Tab Placement Rules

There are TWO levels of tabs — placement depends on the tab's role:

- **Primary tabs** (top-level page navigation, e.g., "Tables | ZCQL Console"):
  → Go in the **Sub Header** area, below the feature name
  → These switch the entire page content

- **Secondary tabs** (content-level tabs within a section, e.g., "General | Advanced | Permissions" inside a settings panel):
  → Go **inside the Container**
  → These switch content within a specific section of the page

**How to decide:** If the tabs control what the whole page shows → Sub Header. If they control a section within the page → Container.

## Content Area Specs

- **Available width:** 1259px — **WIDTH IS FIXED, NEVER EXCEED IT**
- **Available height:** 736px (can expand vertically if content is longer — height is flexible)
- **Background:** The Container MUST keep its background fill bound to `color/bg/surface` variable — NEVER clear or remove Container fills
- **Border radius:** 6px (Container has rounded corners)
- **Padding:** 14px from Body frame edges
- **Recommended content padding:** 16-24px inside Container

**WIDTH RULE:** Container width is 1259px. ALL content (tables, action bars, forms, cards) MUST fit within this width. Use `layoutSizingHorizontal = "FILL"` on all direct children so they stretch to fill — never exceed — the Container width. The Container's `counterAxisSizingMode` must be `"FIXED"` to lock the width.

**HEIGHT RULE:** Container height CAN grow beyond 736px if the content requires it. Use `primaryAxisSizingMode = "AUTO"` so the Container expands vertically with its content.

**TITLE RULE:** The Sub Header already displays the page/feature name. NEVER add a duplicate title heading inside the Container.

**RULE:** NEVER remove or clear the Container's background fill. The Container's `color/bg/surface` fill is what gives it the white card appearance on the sunken/gray Body background. If you clear it, the content area loses its visual boundary.
