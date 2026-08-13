# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

This is a **design automation reference system** — not a code project. It contains structured reference files (component catalogs, design tokens, layout specs, decision rules, sample data) that AI tools read to generate production-quality Figma screens using the **zcat Design System** (ZCatalyst). The output is Figma designs created via the Figma MCP server, not source code.

The workflow: user describes a screen (via wireframes, PRDs, screenshots, or text) → AI reads reference files → generates wireframes for approval → builds the screen in Figma using zcat components and variables.

## Architecture

```
.claude/skills/zcat.md          — The main build workflow (6 steps). READ THIS FIRST for any design task.
references/
  component-manifest.json       — Structured catalog of all zcat components (names, keys, types, variants)
  decision-rules.md             — Component selection logic for ambiguous UI patterns
  design-tokens.md              — Figma variable IDs for color/spacing/radius binding
  sample-data.md                — Realistic data for populating screens (never use lorem ipsum)
  wireframe-styles.css          — CSS for rendering low-fi wireframes via show_widget
  products/catalyst/layout-info.md  — Catalyst page layout structure, node IDs, container rules
  products/generic/layout-templates.json — Generic layout templates for non-Catalyst products
```

## Trigger

When the user asks to create, design, or build any UI screen, page, or flow — OR types "/zcat" or "zcat" — you MUST read and follow the complete workflow in `.claude/skills/zcat.md` before doing anything else.

This applies to prompts like:
- "create a function page for..."
- "design a settings screen..."
- "build screens for this feature..."
- "zcat" or "/zcat"
- Any request involving creating UI designs using the zcat design system

## Workflow

1. Read `.claude/skills/zcat.md` — follow every step in order
2. Read reference files as needed (listed in the skill file)
3. Never skip the wireframe approval step

## Design System Sources

**Primary (default):**
- **ZCat-AI Understandable file:** `ugOZk4O0g6XpviEBSN24mF`
- **Library key:** `lk-6b302ab265d1e80fb5a2a876b2f9ecef1c2795c5fa5e168b3dadaaf3ab1aab4fbf0dab1bd19e7010bf498e184a6bd6ebb5c8b1e1bf780bb4d8db2a6267a82b5f`

**Legacy (user-selectable fallback):**
- **ZCatalyst Design System file:** `dwQLnT4eJ3zCaOwhk7JXIn`
- **Library key:** `lk-ae83192f7b7305d9600785756ca9770312ad96826287c5b416a5e9f38c0b8c858632b716ed0e326c887e942ac3951557de60da44a53fc44693483ad0dd1dcd5f`

**Catalyst layout:** Layout component_set in the primary file (Default and No Left Menu variants)

## Hard Rules

- NEVER create a Figma file in Drafts — a Drafts file cannot subscribe to the team library, so every component import fails or detaches. `create_new_file` defaults to Drafts: `planKey` alone is not enough, `projectId` is REQUIRED
- ALWAYS resolve the team via `whoami` first — if the user has more than one plan, ASK which team; never default to the first
- ALWAYS call `get_libraries` before building. A new file has no libraries attached. If the design system is not subscribed, ASK the user which library to add and have them add it via Assets → Add more libraries — the MCP cannot subscribe a file to a library
- TWO libraries are accepted. **Primary (default):** ZCat-AI Understandable (`ugOZk4O0g6XpviEBSN24mF`, key `lk-6b302ab2…`). **Legacy (user-selectable):** ZCatalyst Design System (`dwQLnT4eJ3zCaOwhk7JXIn`, key `lk-ae83192f…`). User selects at build start; default to primary. Match on KEY, never on name
- NEVER substitute any OTHER library — not as a fallback, not as "the closest match". If neither accepted library is subscribed, STOP and ask for a different team/project
- NEVER use "2.0 Components" — the old superseded library. It is often already attached and has a larger component count (156 vs 52), so it reads as the better choice. If it is subscribed and neither of our accepted libraries is, treat the file as having NO design system
- Every color MUST be bound to a zcat variable — no hardcoded hex
- Every UI element MUST use a zcat component if one exists
- ALWAYS run `search_design_system` BEFORE building ANY UI element — no exceptions. This is the #1 root cause of broken builds: agents assume a component doesn't exist and hand-draw it manually. The search takes 1 second; a manual build takes minutes and produces wrong results. Search for: Buttons, Text Box, Drop down, Check Box, Toggle button, Radio button, Badges, Chip, Tabs, Accordion, Table, Stepper, Search, Popup, Alerts, Loader, Avatar, Tooltip, etc.
- NEVER assume a component doesn't exist — ALWAYS search first. If you think "zcat probably doesn't have this" — you're wrong, search anyway. The library has 79 components covering virtually every UI pattern
- NEVER create buttons, inputs, badges, tags, selects, steppers, or any UI element manually when a zcat component exists
- ALWAYS bind colors to variables using `figma.variables.setBoundVariableForPaint` — NEVER set raw hex fills
- For `component_set` types: use `importComponentSetByKeyAsync` → `.defaultVariant.createInstance()`
- For `component` types: use `importComponentByKeyAsync` → `.createInstance()`
- NEVER use `importComponentByKeyAsync` with a component_set key — it will fail
- Use realistic sample data, never lorem ipsum
- ALWAYS import the Layout component_set as STEP 1 for every Catalyst screen — NEVER manually assemble the layout from individual components (Header + Sidemenu + manual frames). This is the #1 source of broken builds
- Build inside Catalyst layout Container without modifying the layout shell
- Icons are stroke-only — bind stroke color to match parent text
- No odd numbers in spacing, font sizes, radius, padding
- Minimum font size: 10px
- Default radius: 6px
- Same Size within a group — when buttons, dropdowns, and text boxes appear together in the same visual group (an action bar, a form row, a filter bar), they MUST all use the same Size variant (e.g. all "Default" or all "Small"). Never mix sizes within a group
- Detach whitelist — ONLY detach Layout, Accordion, Accordion Bordered, Dropdown Menu (Menu List), Card BG, Container Header, Sidebar List Panel, and Table. For any other component, ask the user before detaching. Detaching is for inserting content, never for restyling the shell
- ALWAYS use Popup Blur component for popup/dialog overlays — NEVER create manual frames with hardcoded black/opacity fills. Popup Blur is a bare backdrop rectangle, NOT a dialog
- Divider component is INTERNAL to Stepper — for general-purpose dividers, build manual 1px frames with fill bound to color/border/default variable
- Screenshots and existing designs the user provides are REFERENCE ONLY — use them to understand patterns and layout intent, never to copy exact designs or as justification for detaching/manually recreating components that exist in zcat
- Manual elements MUST use variables — when building manual frames, dividers, section separators, or any non-component element: ALL fills/strokes must be bound to zcat color variables (color/bg/*, color/border/*, color/text/*), ALL spacing (padding, gap) must use values from the spacing scale (0-128px, even numbers), ALL text must use one of the 19 defined text styles. No raw hex colors, no arbitrary spacing, no custom fonts on manual elements
- 100% wireframe feature coverage — EVERY tab, menu item, button, field, column, and section from the wireframe MUST appear in the final design. Design creativity applies to HOW elements look, never to WHAT appears. NEVER silently drop features
- Component limits are NOT feature limits — if a component supports max 5 items but the wireframe shows 7, DETACH and add the remaining items manually with matching styling. NEVER remove wireframe content to fit a component's constraints. Tell the user when you detach to extend
- Wireframes define features, not visual design — extract WHAT (data, actions, navigation, states) from wireframes, then apply design composition (visual hierarchy, section grouping, creative layouts, proper spacing rhythm). Don't copy wireframe layouts literally unless they match established patterns. See decision-rules.md "Design Composition" for full guidance
- Design uniforms — cards, spacing, typography, alignment, and section grouping must be consistent across ALL screens in a product. Use the exact specs in decision-rules.md "Design Uniforms". Stat values 24px SemiBold, labels 12px secondary, cards 16px padding with 16px gap, sections grouped in Card BG or bordered frames, multi-column layouts for detail pages
- Label:Value displays MUST be horizontal — for read-only info (connection details, metadata, config summaries), use General Details component (key `6dd180e6490c68971c8c9b5cc963349b711a5e5d`) or Key Value Pair component (key `2d82f5c0a6c24ab0370c320d0044cc8346666077`, Layout=Horizontal). Label on LEFT, value on RIGHT. NEVER stack label on top with value below

## Figma API Pitfalls

- NEVER set `figma.currentPage = page` — use `await figma.setCurrentPageAsync(page)` (reading `figma.currentPage` is fine)
- ALWAYS call `setCurrentPageAsync()` at the START of every use_figma script — page context does not persist across calls. Without it, nodes silently land on the wrong page
- ALWAYS load fonts before setting text: `await figma.loadFontAsync(node.fontName)` before `node.characters = "text"`
- NEVER hardcode height on components — use auto-layout with `counterAxisSizingMode = "AUTO"`
- `setProperties()` throws on ANY invalid property combo and prevents ALL properties from applying — not just the invalid one. Always verify valid combos by checking `componentSet.children` variant names, or set properties one at a time
- `detachInstance()` returns a NEW node with a new ID — the pre-detach ID is invalid. Always reassign: `const detached = instance.detachInstance()`
- Setting `.visible = false` on instance children can invalidate sibling node IDs in the same script — read all needed IDs before toggling visibility
- If a script throws anywhere (even in a trailing return), earlier mutations in that script may not persist — keep scripts focused and handle errors
- NEVER set `layoutSizingHorizontal = 'FILL'` before appending the node to an auto-layout parent — it will throw. Always `parent.appendChild(node)` FIRST, then set FILL sizing
- ALWAYS load fonts before ANY text mutation — `await figma.loadFontAsync(node.fontName)` before `node.characters = "text"`. Forgetting this on even one text node crashes the entire script (all-or-nothing)
- Button Type vs Variant: Type selects the button KIND (Default Button, Split Button, Navigation Buttons). Variant selects the STYLE (Fill, Outline, Ghost). `setProperties({Type: 'Ghost'})` will throw — Ghost is a Variant value
- Card BG variant is State (Default/Hover/Selected/Disabled), NOT Color (White/Grey/Bordered/Elevated) — `setProperties({Color: 'White'})` will throw
- Badge variant properties are Type/Color/Size — NOT Style/Color/Size

## Token Optimization (MANDATORY)

Building a single screen should use ~8-12k tokens, not 20k+. Follow these rules:

- **Use componentKeyMap from component-manifest.json** — it has every component key and type. Skip `search_design_system` for known components (Button, TextBox, Dropdown, Badge, Table, etc.). ONLY use `search_design_system` for icons and components not in the manifest
- **Batch use_figma scripts** — build entire sections in one script, not one element per script. Target 2-3 scripts per screen: (1) Layout + shell updates, (2) Container content (action bar + table + pagination), (3) Validation. NEVER write one script per component
- **Read only needed sections** — don't read the entire component-manifest.json. Read only `componentKeyMap` to get keys, then the specific component entry if properties are needed
- **Pre-plan all components** — before ANY Figma call, list every component needed for the screen with its key and type from the manifest. Then build them all in batched scripts
- **No redundant searches** — if you already have the key from the manifest or a previous search, don't search again

## Catalyst Container Rules

- Container width is FIXED (1259px for Default layout, 1489px for No Left Menu layout) — all content must fit within it
- Container height grows — `primaryAxisSizingMode = "AUTO"`, `counterAxisSizingMode = "FIXED"`
- All children must use `layoutSizingHorizontal = "FILL"`
- NO page title inside Container — the Sub Header already shows it
- Primary tabs ALWAYS go in Sub Header FIRST — NEVER place primary (whole-page) tabs in Container. Container tabs are ONLY for secondary/section-scoped tabs. This is the #1 tab placement mistake. See layout-info.md "Header Action & Tab Placement" for the full decision order
- Page-level actions (Primary/Secondary button, three-dot overflow) go in the Sub Header FIRST — fall back to a Container action bar only when that placement isn't meaningful for the screen (see layout-info.md)
- Table column variants — the Table component has multiple column types (Avatar & Name, Status/Badge, Plain Text, Checkbox, Threedot, etc.). ALWAYS map wireframe columns to existing Table column types before building manual columns. Detach the Table to customize, hide unused columns, and relabel — see decision-rules.md "Table Component vs Manual Table Build"
- Table frames/rows must use `layoutSizingHorizontal = "FILL"`; flexible columns use FILL, fixed columns use small explicit widths
- Stretch table Container padding = 0, action bar frame gets 16px top + left + right padding (no bottom — table sits directly below). Boxy Container padding = 16px all sides
- NEVER modify the layout shell (Header, spacing, borders, backgrounds)
- PAUSE AND ASK on build problems — if a component doesn't import, properties throw, layout breaks, or the Table component doesn't match the schema, STOP and ask the user. NEVER continue burning tokens on a failing approach. One question costs nothing; rebuilding a broken screen wastes thousands of tokens

## Protected Folder (ENTIRE PROJECT IS READ-ONLY)

The ENTIRE `AI Automation/` folder is a source-of-truth reference system. AI tools MUST:

- **NEVER modify, rewrite, or delete ANY file** in this folder
- **NEVER create new files** in this folder
- **ONLY READ** files in this folder to inform Figma design builds

These files should only be updated deliberately by the user or during explicit maintenance sessions — never as a side effect of a design build task. If an AI tool needs to write temporary files, use `/tmp` or the system scratchpad — NEVER this folder.
