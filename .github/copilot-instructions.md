# zcat Design Automation — Copilot Rules

## ENTIRE FOLDER IS READ-ONLY
The `AI Automation/` folder is a source-of-truth reference system.

**DO NOT modify, rewrite, delete, or overwrite ANY file in this folder.**
**DO NOT create new files in this folder.**
**ONLY READ files to inform Figma design builds.**

This applies to ALL files including:
- `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`
- `.claude/skills/zcat.md`, `.claude/settings.json`, `.claude/settings.local.json`
- `references/component-manifest.json`, `references/decision-rules/` (11 split files), `references/design-tokens.md` (GENERATED live token dump — regenerate, never hand-edit), `references/icon-catalog.json`
- `references/sample-data.md`, `references/wireframe-styles.css`
- `references/products/**/*` (all product layout files)

Only the user may update these files during explicit maintenance sessions.
If you need to write temporary files, use `/tmp` — NEVER this folder.

## Component Import Rules
- `component_set` types → `importComponentSetByKeyAsync` → `.defaultVariant.createInstance()`
- `component` types → `importComponentByKeyAsync` → `.createInstance()`
- NEVER use `importComponentByKeyAsync` with a component_set key

## Figma API Rules
- NEVER set `figma.currentPage = page` → use `await figma.setCurrentPageAsync(page)`
- ALWAYS load fonts before setting text: `await figma.loadFontAsync(node.fontName)` then `node.characters = "text"`
- ALWAYS bind colors to variables using `figma.variables.setBoundVariableForPaint` — no raw hex fills
- NEVER hardcode height — use auto-layout with `counterAxisSizingMode = "AUTO"`
- ALWAYS use zcat components from the design system — never create manual buttons, inputs, badges, tags, selects, or dropdowns
- ALWAYS filter `search_design_system` with `includeLibraryKeys` to the ZCatalyst library key

## Catalyst Container Rules
- Container width is FIXED at 1259px — NEVER exceed it. All content must fit within this width.
- Container height CAN grow — use `primaryAxisSizingMode = "AUTO"`.
- All children of Container must use `layoutSizingHorizontal = "FILL"` to stretch to Container width, never exceed it.
- NO page title inside Container — the Sub Header already shows it. Container starts with action bar (search + filters + buttons).
- Tables: column headers must be labels (Function Name, Runtime, Status) — NEVER use data values (emails, IDs, timestamps) as column names.
- Tables: every row must have the SAME columns as the header, in the SAME order, with data that matches each column's purpose.
- Tables: table frame and rows must use `layoutSizingHorizontal = "FILL"`. Flexible columns use FILL, fixed columns use small explicit widths.
- Tables: use the zcat Table component. Status columns use Badge components (green=Active, red=Error, gray=Disabled).
