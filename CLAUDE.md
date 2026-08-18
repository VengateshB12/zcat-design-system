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
  decision-rules/               — Split decision rules by topic (11 files, ~4-6k each)
  design-tokens.md              — Figma variable IDs for color/spacing/radius binding
  sample-data.md                — Realistic data for populating screens (never use lorem ipsum)
  wireframe-styles.css          — CSS for rendering low-fi wireframes via show_widget
  products/catalyst/layout-info.md  — Catalyst page layout structure, node IDs, container rules
  products/generic/layout-templates.json — Generic layout templates for non-Catalyst products
```

## Design Philosophy

**Components are building material, not the design.** The agent must think: "How should this screen be designed?" THEN "Which zcat components implement that design?" — never the reverse. The existence of a component must never dictate the composition. Card BG exists ≠ every section must become a card. Badge exists ≠ every label must become a badge. Use components when they serve the content, not because they are available.

**Consistency does not mean every screen looks the same.** Consistency comes from using the same design language (tokens, components, typography, spacing). Creativity comes from composing that language differently according to the content, user task, and information hierarchy. The final output must feel like a designer intentionally designed it, not like an AI assembled components according to a checklist.

**Templates and layout references are candidates, not defaults.** Layout templates (function-page, dashboard, settings-page, etc.) show common patterns. They are starting points for composition thinking, not blueprints to instantiate literally. Every screen's layout should be driven by its content and user task, not by matching a template name.

**Screen Polish & Verify is mandatory.** After building each screen and before showing it to the user, run the comprehensive audit + improvement loop: check structural integrity, component correctness, wireframe completeness (inch by inch), and design quality. Fix bugs AND actively improve anything that looks weak, flat, or generic. Max 2 rounds. See `rules-design-composition.md` "Screen Polish Patterns" and "Card Composition Recipes" for the full reference.

### Priority Hierarchy (when rules conflict)

1. User's explicit requirement
2. Current zcat component/library source of truth
3. Product information architecture (what content exists)
4. Catalyst layout constraints
5. Accessibility/usability
6. Design-system visual rules (tokens, variables, text styles)
7. Creative composition rules
8. Template/reference conventions

When a lower rule conflicts with a higher one, follow the higher rule. Do not blindly follow a template if it makes the current screen worse.

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
- Detach whitelist — ONLY detach Layout, Accordion, Accordion Bordered, Dropdown Menu (Menu List), Card BG, Container Header, Sidebar List Panel, Sub Header (ONLY when adding more tabs than the component supports). For any other component, ask the user before detaching. Detaching is for inserting content, never for restyling the shell. Table AI is ZERO-DETACH — NEVER detach it
- ALWAYS use Popup Blur component for popup/dialog overlays — NEVER create manual frames with hardcoded black/opacity fills. Popup Blur is a bare backdrop rectangle, NOT a dialog
- Popup close is in the FOOTER, not the header — the zcat Popup has NO X close button in the header. NEVER add a manual X close icon in the popup header
- Popup footer layout — the zcat Popup component has a BUILT-IN footer with correct button placement. Use it as-is — do NOT manually build footer buttons. Simple form: Cancel (Outline/grey, LEFT) + Create (Fill/primary, RIGHT). Wizard: Back (Outline, LEFT) + Cancel (Outline/grey, RIGHT) + Continue (Fill/primary, RIGHT). Cancel is ALWAYS Outline (grey secondary), NEVER Fill (primary blue). First wizard step has no Back. See decision-rules/rules-popup-footer.md
- Stepper/Tabs in Popup go in the HEADER area — directly below the title, responsive FILL width. NEVER place Stepper in the content body. Use the Stepper component, NEVER draw circles + lines manually
- Popup components MUST be responsive — all form elements inside a Popup (Text Box, Dropdown, Radio Button) must use layoutSizingHorizontal = FILL to stretch to the popup body width. NEVER leave narrow fixed-width controls in a wide popup
- Popup header/body/footer width — ALL three sections MUST stretch to FULL popup width (`layoutSizingHorizontal = "FILL"`). If the stepper, body content, or footer buttons don't reach the same left/right edges as the header, the sizing is WRONG. Screenshot and verify alignment after building any popup
- Divider component is INTERNAL to Stepper — for general-purpose dividers, build manual 1px frames with fill bound to color/border/default variable
- Screenshots and existing designs the user provides are REFERENCE ONLY — use them to understand patterns and layout intent, never to copy exact designs or as justification for detaching/manually recreating components that exist in zcat
- Manual elements MUST use variables — when building manual frames, dividers, section separators, or any non-component element: ALL fills/strokes must be bound to zcat color variables (color/bg/*, color/border/*, color/text/*), ALL spacing (padding, gap) must use values from the spacing scale (0-128px, even numbers), ALL text must use one of the 19 defined text styles. No raw hex colors, no arbitrary spacing, no custom fonts on manual elements
- NEVER hardcode text colors or font sizes — ALL text must use zcat text styles (Body/SemiBold/16, Body/Regular/14, Body/Regular/12, Headlines/SemiBold/24, etc.) and color variables (color/text/primary, color/text/secondary, color/text/placeholder). NEVER write raw hex like #000000 or #333333 for text. NEVER specify font sizes without binding to a text style
- 100% wireframe feature coverage — EVERY tab, menu item, button, field, column, and section from the wireframe MUST appear in the final design. Functional fidelity = 100% (every feature present), spatial fidelity = 0% (layout, grouping, hierarchy, emphasis are all creative decisions). Design creativity includes composition, grouping, visual hierarchy, information density, and emphasis — not just visual styling. NEVER silently drop features
- Component limits are NOT feature limits — if a component supports max 5 items but the wireframe shows 7, DETACH and add the remaining items manually with matching styling. NEVER remove wireframe content to fit a component's constraints. Tell the user when you detach to extend
- NEVER copy-paste wireframe layout — wireframes define WHAT features appear, not HOW they look. The final design must look NOTHING like the wireframe visually — same features, completely different presentation. If someone can place the wireframe and final design side by side and say "that's the same layout" — the agent failed. Extract features from the wireframe, then creatively compose the screen using zcat components, Card BG with shadows where appropriate, proper visual hierarchy, multi-column layouts, spacing rhythm. The agent is a DESIGNER, not a wireframe-to-Figma converter. See decision-rules/rules-design-composition.md "Card Composition Recipes" for 10 real production card patterns to reference or exceed
- Design uniforms — cards, spacing, typography, alignment, and section grouping must be consistent across ALL screens in a product. Use the exact specs in decision-rules.md "Design Uniforms". Stat values 24px SemiBold, labels 12px secondary, cards 16px padding with 16px gap, sections grouped in Card BG or bordered frames, multi-column layouts for detail pages
- Label:Value displays MUST be horizontal — for read-only info (connection details, metadata, config summaries), use General Details component (key `6dd180e6490c68971c8c9b5cc963349b711a5e5d`). Label on LEFT, value on RIGHT. NEVER stack label on top with value below. WARNING: Key Value Pair component renders with editable text inputs + dropdown — do NOT use it for read-only displays
- CTA hierarchy — AT MOST ONE Fill (primary) button per action group. All other buttons are Outline or Ghost. Having 2+ Fill buttons in the same action bar, footer, or toolbar is WRONG. Decide which single action is the most important, make it Fill, demote the rest
- Sub Header tab limit — the component supports a limited number of tabs. If the wireframe has MORE tabs, DETACH the Sub Header and duplicate tab instances to add the remaining ones. NEVER drop tabs to fit the component limit. COUNT tabs in the wireframe before building
- Empty state buttons — when using two buttons (primary + secondary), they MUST have DIFFERENT labels and different actions. NEVER use the same label on both. If only one action exists, set `Show Outline Button = false`
- Multi-state pages — when a page has multiple states (before/after action, empty/populated, editing/viewing), build EACH state as a separate design frame on the same Figma page. Do NOT combine all states into one frame
- ALWAYS use Table AI (`f3a77aaa2d8b332d2c86a9cb77ed6a4f92305c07`) for ALL tables — NEVER use legacy Table (`954cd82ff912bd312206e7f2776a75d80049ede0`). Table AI is zero-detach: configure via setProperties(), swap column types via instance swap, update text in-place. NEVER detach Table AI
- Table AI MUST be responsive — set `layoutSizingHorizontal = "FILL"` so it stretches to fill the Container width. A non-stretching table is a broken layout
- Table AI column ORDER is FLEXIBLE — Col 1 through Col 8 can hold ANY column type via instance swap. Badge can be Col 3, name can be Col 5 — match the wireframe. NEVER detach Table AI to reorder columns
- Entity columns (databases, functions, services, APIs, files) MUST use IconText column type — NEVER AvatarName (faces are for people only) and NEVER Badge (badges are for status only)
- Table cell line limit — MAX 2 lines per cell. Descriptions get 2-line truncation + "View More" link. NEVER allow 3+ lines in any table cell
- Table AI DEFAULT column types are WRONG — Table AI ships with AvatarName on col 1 and Badge on col 2. If you import Table AI and DON'T swap column types, EVERY table looks identical (avatars + blue pills). You MUST swap column types for EVERY column to match the DATA. See decision-rules/rules-table-columns.md for the decision questions
- AvatarName column is ONLY for person data — user names, owners, assignees, emails. Ask: "Would a person's FACE make sense next to this data?" YES → AvatarName, NO → Text/IconText. Rule names, database names, publisher IDs, API keys, config names are NOT people. NEVER use AvatarName for them
- Badge column is ONLY for status/category — a FINITE SET of values (< 10) where each value has a DIFFERENT semantic meaning and values VARY across rows. Ask: "Does this column have varying categorical values with meaning?" YES → Badge with semantic colors, NO → Text. Event identifiers, publisher names, amounts, dates are NOT statuses. When ALL values in a column are the SAME (every row says "Custom Module"), Badge adds zero information — use Text instead
- Badge colors MUST be semantic — green=success/paid/active, red=error/failed/overdue, amber=warning/pending, blue=info/processing/draft, grey=inactive/archived. NEVER use the same badge color for all status values in a table. Each status meaning gets its own color. The page build spec MUST list every status value with its badge color
- Badge Type in tables = Secondary — ALWAYS use Type="Secondary" (subtle/muted) for badges inside table cells. Type="Primary" creates bold filled pills that are too heavy for table rows. Primary badges are ONLY for standalone emphasis outside tables (hero stats, alerts, callouts). In tables, Secondary badges blend with the row while still showing semantic status color
- Tab active state — EXACTLY ONE tab must show active/selected state matching the content shown. All other tabs stay Default. Verify via component State property. Missing active state = broken design
- Card height MUST be HUG (auto-layout) — NEVER set fixed pixel height on ANY card, frame, or container. This applies to stat cards, info cards, chart cards, ALL cards. Use `counterAxisSizingMode = "AUTO"` and let content determine height. If a card looks too short, fix the CONTENT inside — not the card height. Cards in a row match via parent `counterAxisAlignItems = "STRETCH"`
- Auto-layout EVERYWHERE — every grouping frame, section wrapper, card, row, and container MUST use auto-layout. NEVER use absolute positioning for grouped content. No fixed heights, no fixed widths on containers that hold dynamic content. Use `layoutSizingHorizontal = "FILL"` and `layoutSizingVertical = "HUG"` — the content determines size, not hardcoded pixels
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
- ZERO hardcoded hex colors — EVERY fill, stroke, and text color MUST be bound to a zcat variable using `figma.variables.setBoundVariableForPaint`. NEVER use `[{type: 'SOLID', color: {r:0, g:0, b:0}}]` directly — that creates raw hex. NEVER set `node.fills = [solidPaint]` without binding. Even black text (#000000) must be bound to `color/text/primary`. Even white backgrounds (#FFFFFF) must be bound to `color/bg/surface`. If the Selection Colors panel shows ANY raw hex value, those are bugs. This is the #1 cause of dark mode breakage — every unbound color fails in dark mode
- Screen Polish & Verify before showing — NEVER assume your design looks good. Run the full audit + improvement loop (step 4g in zcat.md) before showing any screen: (a) structural integrity (auto-layout, HUG heights, FILL widths, no overflow), (b) component correctness (colors bound, button sizes consistent, badge colors semantic, active states set, three-dot menus built, link colors bound), (c) wireframe completeness inch by inch (COUNT every element), (d) design quality (card recipe matches content — not every card needs icons, spacing rhythm correct, layout balanced). Fix bugs AND enhance composition (max 2 rounds). See rules-design-composition.md "Screen Polish Patterns" and "Card Composition Recipes"
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
- Property keys may have hash suffixes — `setProperties()` uses the FULL property key including any `#nodeId` suffix (e.g., `"Show Sidemenu#13106:9"`). If `setProperties({"Show Sidemenu": true})` throws, inspect `Object.keys(instance.componentProperties)` to get the actual keys with suffixes. Set properties BEFORE detaching — after detach, component property toggles no longer work
- `node.clone()` lands on the SAME page as the original — NOT your target page. After cloning, always `targetPage.appendChild(clonedNode)` to move it to the correct page. Without this, clones silently appear on wrong pages
- Scripts are ATOMIC — if ANY line throws, ALL mutations in that script are rolled back. Never mix creation code with risky inspection code. Wrap uncertain operations in try/catch, or split into separate use_figma calls
- After detaching Layout, child node IDs change — re-find all nodes (Container, Sub Header, Sidebar, Body) using names or structure traversal AFTER detach, not before. IDs saved before detach are invalid
- Table AI is COLUMN-based, not row-based — structure is `Table > Col 1 (header + data cells vertically) > Col 2 > ...`. To update text: traverse columns first, then cells within each column. Header is the first child in each column, data cells follow

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
- Sub Header is normally kept as an instance. For tabs, add Tab component instances inside the Sub Header's auto-layout. For back navigation, update the feature name text to "‹ item-name". For breadcrumbs, use back navigation variant, NOT manual breadcrumb frames. ONLY detach Sub Header when the wireframe requires MORE tabs than the component supports — duplicate existing tab instances to add them, then keep styling intact. Never detach for restyling
- NEVER modify the layout shell (Header, spacing, borders, backgrounds)
- PAUSE AND ASK on build problems — if a component doesn't import, properties throw, layout breaks, or the Table component doesn't match the schema, STOP and ask the user. NEVER continue burning tokens on a failing approach. One question costs nothing; rebuilding a broken screen wastes thousands of tokens

## Protected Folder (ENTIRE PROJECT IS READ-ONLY)

The ENTIRE `AI Automation/` folder is a source-of-truth reference system. AI tools MUST:

- **NEVER modify, rewrite, or delete ANY file** in this folder
- **NEVER create new files** in this folder
- **ONLY READ** files in this folder to inform Figma design builds

These files should only be updated deliberately by the user or during explicit maintenance sessions — never as a side effect of a design build task. If an AI tool needs to write temporary files, use `/tmp` or the system scratchpad — NEVER this folder.
