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

## Design System Source

- **zcat Figma file:** `dwQLnT4eJ3zCaOwhk7JXIn`
- **zcat library key:** `lk-ae83192f7b7305d9600785756ca9770312ad96826287c5b416a5e9f38c0b8c858632b716ed0e326c887e942ac3951557de60da44a53fc44693483ad0dd1dcd5f`
- **Catalyst layout file:** `81LbutNhl2k7H18bJEs9Us` (Layout component: `1554:19926`)

## Hard Rules

- Every color MUST be bound to a zcat variable — no hardcoded hex
- Every UI element MUST use a zcat component if one exists
- ALWAYS use `search_design_system` with `includeLibraryKeys` filter to find zcat components BEFORE building — use exact names: Buttons, Text Box, Drop down, Check Box, Toggle button, Radio button, Badges, Chip, Tabs, Accordion, Table, etc.
- NEVER create buttons, inputs, badges, tags, selects, or any UI element manually when a zcat component exists
- ALWAYS bind colors to variables using `figma.variables.setBoundVariableForPaint` — NEVER set raw hex fills
- For `component_set` types: use `importComponentSetByKeyAsync` → `.defaultVariant.createInstance()`
- For `component` types: use `importComponentByKeyAsync` → `.createInstance()`
- NEVER use `importComponentByKeyAsync` with a component_set key — it will fail
- Use realistic sample data, never lorem ipsum
- Build inside Catalyst layout Container without modifying the layout shell
- Icons are stroke-only — bind stroke color to match parent text
- No odd numbers in spacing, font sizes, radius, padding
- Minimum font size: 10px
- Default radius: 6px

## Figma API Pitfalls

- NEVER set `figma.currentPage = page` — use `await figma.setCurrentPageAsync(page)` (reading `figma.currentPage` is fine)
- ALWAYS load fonts before setting text: `await figma.loadFontAsync(node.fontName)` before `node.characters = "text"`
- NEVER hardcode height on components — use auto-layout with `counterAxisSizingMode = "AUTO"`

## Catalyst Container Rules

- Container width is FIXED (1259px) — all content must fit within it
- Container height grows — `primaryAxisSizingMode = "AUTO"`, `counterAxisSizingMode = "FIXED"`
- All children must use `layoutSizingHorizontal = "FILL"`
- NO page title inside Container — the Sub Header already shows it; start with the action bar
- Table frames/rows must use `layoutSizingHorizontal = "FILL"`; flexible columns use FILL, fixed columns use small explicit widths
- NEVER modify the layout shell (Header, spacing, borders, backgrounds)

## Protected Folder (ENTIRE PROJECT IS READ-ONLY)

The ENTIRE `AI Automation/` folder is a source-of-truth reference system. AI tools MUST:

- **NEVER modify, rewrite, or delete ANY file** in this folder
- **NEVER create new files** in this folder
- **ONLY READ** files in this folder to inform Figma design builds

These files should only be updated deliberately by the user or during explicit maintenance sessions — never as a side effect of a design build task. If an AI tool needs to write temporary files, use `/tmp` or the system scratchpad — NEVER this folder.
