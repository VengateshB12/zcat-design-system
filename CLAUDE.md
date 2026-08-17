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
- Icons are stroke-only — bind stroke color to match parent text. Icons CANNOT be imported directly (internal component set). Clone from an existing component instance (e.g., Button Help variant → Icon Left child) and swapComponent() to the desired icon. NEVER use emoji (🚀, ⚡, 📁) or Unicode (▶, ✕, ▾, ●, ←) as icons
- No odd numbers in spacing, font sizes, radius, padding
- Minimum font size: 10px
- Default radius: 6px
- Same Size within a group — when buttons, dropdowns, and text boxes appear together in the same visual group (an action bar, a form row, a filter bar), they MUST all use the same Size variant (e.g. all "Default" or all "Small"). Never mix sizes within a group
- Detach whitelist — ONLY detach Layout, Accordion, Accordion Bordered, Dropdown Menu (Menu List), Card BG, Container Header, Sidebar List Panel. For any other component, ask the user before detaching. Detaching is for inserting content, never for restyling the shell. Table AI is ZERO-DETACH — NEVER detach it. Sub Header is ZERO-DETACH — NEVER detach it (add tabs, buttons, back nav inside the instance)
- ALWAYS use Popup Blur component for popup/dialog overlays — NEVER create manual frames with hardcoded black/opacity fills. Popup Blur is a bare backdrop rectangle, NOT a dialog
- Popup close is in the FOOTER, not the header — the zcat Popup has NO X close button in the header. NEVER add a manual X close icon in the popup header
- Popup footer layout — simple form: Cancel (Ghost, LEFT) + Create (Fill, RIGHT). Wizard with stepper: Back (Outline, LEFT) + Cancel (Ghost, RIGHT) + Continue (Fill, RIGHT). First wizard step has no Back. See decision-rules.md "Popup Component" for full specs
- Stepper/Tabs in Popup go in the HEADER area — directly below the title, responsive FILL width. NEVER place Stepper in the content body. Use the Stepper component, NEVER draw circles + lines manually
- Popup components MUST be responsive — all form elements inside a Popup (Text Box, Dropdown, Radio Button) must use layoutSizingHorizontal = FILL to stretch to the popup body width. NEVER leave narrow fixed-width controls in a wide popup
- Divider component is INTERNAL to Stepper — for general-purpose dividers, build manual 1px frames with fill bound to color/border/default variable
- Screenshots and existing designs the user provides are REFERENCE ONLY — use them to understand patterns and layout intent, never to copy exact designs or as justification for detaching/manually recreating components that exist in zcat
- Manual elements MUST use variables — when building manual frames, dividers, section separators, or any non-component element: ALL fills/strokes must be bound to zcat color variables (color/bg/*, color/border/*, color/text/*), ALL spacing (padding, gap) must use values from the spacing scale (0-128px, even numbers), ALL text must use one of the 19 defined text styles. No raw hex colors, no arbitrary spacing, no custom fonts on manual elements
- NEVER hardcode text colors or font sizes — ALL text must use zcat text styles (Body/SemiBold/16, Body/Regular/14, Body/Regular/12, Headlines/SemiBold/24, etc.) and color variables (color/text/primary, color/text/secondary, color/text/placeholder). NEVER write raw hex like #000000 or #333333 for text. NEVER specify font sizes without binding to a text style
- 100% wireframe feature coverage — EVERY tab, menu item, button, field, column, and section from the wireframe MUST appear in the final design. Design creativity applies to HOW elements look, never to WHAT appears. NEVER silently drop features
- Component limits are NOT feature limits — if a component supports max 5 items but the wireframe shows 7, DETACH and add the remaining items manually with matching styling. NEVER remove wireframe content to fit a component's constraints. Tell the user when you detach to extend
- Wireframes define features, not visual design — extract WHAT (data, actions, navigation, states) from wireframes, then apply design composition (visual hierarchy, section grouping, creative layouts, proper spacing rhythm). Don't copy wireframe layouts literally unless they match established patterns. See decision-rules.md "Design Composition" for full guidance
- Design uniforms — cards, spacing, typography, alignment, and section grouping must be consistent across ALL screens in a product. Use the exact specs in decision-rules.md "Design Uniforms". Stat values 24px SemiBold, labels 12px secondary, cards 16px padding with 16px gap, sections grouped in Card BG or bordered frames, multi-column layouts for detail pages
- Label:Value displays MUST be horizontal — for read-only info (connection details, metadata, config summaries), use General Details component (key `6dd180e6490c68971c8c9b5cc963349b711a5e5d`) or Key Value Pair component (key `2d82f5c0a6c24ab0370c320d0044cc8346666077`, Layout=Horizontal). Label on LEFT, value on RIGHT. NEVER stack label on top with value below
- ALWAYS use Table AI (`f3a77aaa2d8b332d2c86a9cb77ed6a4f92305c07`) for ALL tables — NEVER use legacy Table (`954cd82ff912bd312206e7f2776a75d80049ede0`). Table AI is zero-detach: configure via setProperties(), swap column types via instance swap, update text in-place. NEVER detach Table AI
- Table AI MUST be responsive — set `layoutSizingHorizontal = "FILL"` so it stretches to fill the Container width. A non-stretching table is a broken layout
- AvatarName column is ONLY for person data — user names, owners, assignees. NEVER use AvatarName for database names, regions, storage sizes, dates, or any non-person data. Match column types to DATA type, not to wireframe icons. See decision-rules.md "Table AI column type selection" table
- Button labels: override the nested TEXT node — Button has NO text component property. Find text node via `btn.findAll(n => n.type === 'TEXT')`, load font, set characters. There is no shortcut
- Build before destroy — NEVER remove existing content before confirming replacement builds successfully. Build new content first, then swap. A failed script that already removed old content leaves a broken screen
- NEVER create manual UI controls — no rectangles/circles/frames as buttons, inputs, badges, toggles. If you catch yourself doing this, STOP and search for the component. Only manual frames are structural layout containers
- Container navigation — NEVER use `findOne(n => n.name === "Container")` from root — it matches inside nested instances. Find via Body frame's direct children loop
- Shadow effects require `blendMode: "NORMAL"` in the effect object — omitting it throws
- Components on EVERY screen — do NOT use components for screen 1 then hand-build later screens. EVERY screen uses the same component workflow. If you're writing `figma.createFrame()` for a button/input/badge on any screen, STOP and re-check the component checklist
- Use stroke icons EVERYWHERE — wherever an icon is needed, use zcat stroke icons via clone+swap. Even if the exact icon doesn't exist, use the closest one and tell the user to swap manually. NEVER skip icons or use emoji/Unicode
- Wireframe icons are NOT design icons — wireframes use placeholder icons that don't exist in the zcat library. NEVER replicate wireframe icons literally. Find the closest zcat stroke icon instead. If no close match exists, use any relevant icon and tell the user
- Action bar balance — when a button is on the right, ALWAYS add a supporting element on the left (Search, heading, filter). NEVER leave a lonely right-aligned button. Think MORE than the wireframe
- Design beyond wireframes — wireframes are MINIMUM requirements. Improve them: flat cards → Card BG with icon backgrounds + visual hierarchy, wireframe tabs in content → move primary tabs to Sub Header, plain lists → proper components with badges/icons, empty action bars → add Search/filters/headings. Final design must look polished, not a wireframe with components swapped in
- Eliminate duplicate information — if the wireframe shows the same data in two places (e.g., Storage stat card AND a storage graph card), MERGE or REMOVE the redundant one. Tell the user what you decided
- Use Code Block / Code Editor component — for SQL consoles, query editors, code views, JSON displays, monospace text. NEVER use a plain text frame for code content
- Master-detail = Side Menu pattern — when a wireframe shows list-on-left + detail-on-right (e.g., schema table list → column view), ALWAYS use Side Menu / master-detail layout (Recipe 4 in zcat.md). NEVER copy the wireframe's flat two-panel layout
- Fill ALL dropdown/input content — EVERY dropdown must show a realistic selected value from sample-data.md. NEVER leave default placeholder text like "Select List" or "Enter Label Text"
- ZERO hardcoded hex colors — after building, verify EVERY fill and stroke is bound to a zcat variable. If Selection Colors panel shows ANY raw hex (0F1F3D, EBEDF5, FFFFFF, etc.), those are bugs that break dark mode. Fix before showing
- Self-critique before showing — NEVER assume your design looks good. Screenshot and verify: (a) every element uses a zcat component, (b) all colors variable-bound, (c) stat cards have icon BGs, (d) no wireframe-copy flat layouts, (e) all dropdowns filled, (f) no duplicate info. Fix failures before showing
- Think and decide, then inform — for ambiguous design choices, make the decision yourself and tell the user in your summary. Do NOT ask about every small choice
- NEVER skip components — the library has 79 components covering virtually every UI pattern. Common skips: General Details (for key-value info), Code Block (for code/SQL), Key Value Pair (for metadata), Attention Box (for warnings), Timeline (for decorative timelines), Container Header (for section headings), Avatar (for user icons), Tooltip (for hover info), Breadcrumbs (for navigation), Progress Bar (for progress), Chip (for tags/filters). If a wireframe shows ANY of these patterns, search and use the component
- Empty state pages — ALWAYS use the Empty State component (`03321dc06395aa6b94783d0289637de8ddc82de0`, type `component`). NEVER manually build empty state UI. It has boolean properties: Show Illustration, Show Heading, Show Description, Show Primary Button, Show Outline Button. NO Container Header, NO search/filters, NO duplicate CTAs. Sub Header stays simple (title + Help instance). Container padding = 0 all sides, itemSpacing = 0

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
- Container auto-layout: VERTICAL, `counterAxisSizingMode = "FIXED"`, `itemSpacing = 10`
- Container children: Table AI and Pagination use `layoutSizingHorizontal = "FILL"`, Container Header uses FIXED width
- NO page title inside Container — the Sub Header already shows it
- Primary tabs ALWAYS go in Sub Header FIRST — NEVER place primary (whole-page) tabs in Container. Container tabs are ONLY for secondary/section-scoped tabs. This is the #1 tab placement mistake
- Buttons placement depends on tabs — NO tabs in Sub Header: buttons go in Container Header (as part of the action bar with Search + filters). Tabs + common action for all tabs: button in Sub Header title row (right side, above tabs). Tabs + tab-specific actions: buttons in Container Header (they change per tab). NEVER put buttons in Sub Header when there are no tabs — the Sub Header stays simple (title + Help only). See layout-info.md for full decision order
- Container Header IS the action bar — NEVER build a manual frame for the action bar. Use the Container Header component (detach for content), put Search + filters on left, buttons on right
- Table AI column types — Table AI has 10 swappable column types (AvatarName, Badge, Date, Text, ExecutionStatus, IconText, Button, Checkbox, Threedot, Icon). Map wireframe columns to these types via instance swap. NEVER detach Table AI — configure entirely via setProperties(). If a column type doesn't exist, ask the user
- Table AI content updates — update header and cell text by finding TEXT nodes inside the instance and setting characters in-place. DO NOT DETACH to edit text. Navigate: table.children → rows → cells → TEXT nodes
- Stretch table Container padding = 16 top, 0 right/bottom/left. Cards view Container padding = 16 top/bottom, 0 left/right. Empty state Container padding = 0 all sides. Boxy Container padding = 16px all sides. Body frame padding = 14px all sides, itemSpacing = 10. Container Header has internal padding (6/14/6/14). Table AI Show Pagination = false for stretch tables (use separate Pagination component)
- NEVER detach Sub Header — it is ALWAYS an instance. For tabs, add Tab component instances inside the Sub Header's auto-layout. For back navigation, update the feature name text to "‹ item-name". For breadcrumbs, use back navigation variant, NOT manual breadcrumb frames. Detaching Sub Header breaks styling and is NEVER needed
- NEVER modify the layout shell (Header, spacing, borders, backgrounds)
- PAUSE AND ASK on build problems — if a component doesn't import, properties throw, layout breaks, or the Table component doesn't match the schema, STOP and ask the user. NEVER continue burning tokens on a failing approach. One question costs nothing; rebuilding a broken screen wastes thousands of tokens

## Protected Folder (ENTIRE PROJECT IS READ-ONLY)

The ENTIRE `AI Automation/` folder is a source-of-truth reference system. AI tools MUST:

- **NEVER modify, rewrite, or delete ANY file** in this folder
- **NEVER create new files** in this folder
- **ONLY READ** files in this folder to inform Figma design builds

These files should only be updated deliberately by the user or during explicit maintenance sessions — never as a side effect of a design build task. If an AI tool needs to write temporary files, use `/tmp` or the system scratchpad — NEVER this folder.
