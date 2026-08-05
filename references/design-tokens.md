# Design Tokens — Quick Reference

Quick-reference for Figma variable binding in the OM Design System 2.0.
All tokens live in the **Themes** collection (4 modes). Components NEVER reference Primitives directly.

---

## 1. Background Colors (`color/bg/*`)

17 tokens for surface and container backgrounds.

| Token | Purpose | When to Use | Common Mistakes |
|---|---|---|---|
| `color/bg/surface` | Base page background | Page backgrounds, card bodies, main content areas, component display frames | Hard-coding `#FFFFFF` or `#F5F5F5` instead |
| `color/bg/raised` | Elevated surface | Cards, popovers, modals, dropdowns, floating panels | Using for flat/inline elements that sit flush |
| `color/bg/sunken` | Recessed area | Sidebar backgrounds, code blocks, table headers, inset panels | Using for primary content areas |
| `color/bg/medium` | Subtle differentiation | Hover backgrounds, secondary surfaces, kbd key backgrounds | Using for primary surfaces |
| `color/bg/overlay` | Scrim / backdrop | Semi-transparent layer behind modals and drawers | Using for opaque surfaces |
| `color/bg/inverse` | Inverted surface | Tooltips, snackbars (dark bg in light mode, light bg in dark mode) | Using for primary UI elements |
| `color/bg/brand-primary` | Primary brand fill | Primary brand buttons, selected tabs, active navigation items | Using for text-heavy areas or large surfaces |
| `color/bg/brand-secondary` | Secondary brand fill | Hover states on brand elements, secondary brand emphasis | Using standalone without brand-primary context |
| `color/bg/brand-subtle` | Light brand tint | Selected rows, active filters, brand badges, soft brand highlights | Using for strong emphasis where brand-primary is needed |
| `color/bg/success` | Strong success fill | Success badges (solid variant), strong success banners | Using as a subtle background — use `success-subtle` instead |
| `color/bg/success-subtle` | Soft success fill | Success alert backgrounds, success inline messages | Applying to text elements |
| `color/bg/warning` | Strong warning fill | Warning badges (solid variant) | Using as a subtle background — use `warning-subtle` instead |
| `color/bg/warning-subtle` | Soft warning fill | Warning alert backgrounds, warning inline messages | Applying to text elements |
| `color/bg/error` | Strong error fill | Error badges (solid variant), destructive button fills | Using as a subtle background — use `error-subtle` instead |
| `color/bg/error-subtle` | Soft error fill | Error alert backgrounds, error field backgrounds | Applying to text elements |
| `color/bg/info` | Strong info fill | Info badges (solid variant) | Using as a subtle background — use `info-subtle` instead |
| `color/bg/info-subtle` | Soft info fill | Info alert backgrounds, informational banners | Applying to text elements |

---

## 2. Text Colors (`color/text/*`)

13 tokens for all text content.

| Token | Purpose | When to Use | Common Mistakes |
|---|---|---|---|
| `color/text/primary` | Highest emphasis text | Headings, body text, primary labels, important content | Using for de-emphasized or secondary text |
| `color/text/secondary` | Medium emphasis text | Descriptions, helper text (default state), metadata, timestamps | Using for headings or CTAs |
| `color/text/tertiary` | Lowest emphasis text | Footnotes, minor labels, least-important annotations | Using for anything that must be clearly readable |
| `color/text/placeholder` | Input placeholder only | Placeholder text inside text inputs and textareas | Using for visible content or labels |
| `color/text/disabled` | Disabled state text | Disabled buttons, disabled inputs, disabled labels | Using for active/enabled elements |
| `color/text/inverse` | Text on dark/brand bg | Text on primary buttons, tooltip text, snackbar text | Using on light backgrounds |
| `color/text/on-brand` | Text on brand bg | Text sitting directly on `bg/brand-primary` or `bg/brand-secondary` | Using anywhere except on brand-colored backgrounds |
| `color/text/link` | Hyperlink text | Clickable text links, inline links | Using for buttons — buttons have their own color logic |
| `color/text/link-hover` | Link hover state | Link text on hover | Using outside hover state |
| `color/text/success` | Success message text | Success messages, positive values, "active" status labels | Using as a background color |
| `color/text/warning` | Warning message text | Warning messages, caution labels | Using as a background color |
| `color/text/error` | Error message text | Error messages, validation errors, required indicators | Using as a background color |
| `color/text/info` | Info message text | Informational messages, neutral status text | Using as a background color |

---

## 3. Border Colors (`color/border/*`)

9 tokens for strokes and dividers.

| Token | Purpose | When to Use | Common Mistakes |
|---|---|---|---|
| `color/border/default` | Standard border | Default input borders, card borders, dividers, table borders | Using for emphasis where `strong` is needed |
| `color/border/subtle` | Very light border | Table row separators, section dividers, faint lines | Using for interactive element borders |
| `color/border/strong` | High-contrast border | Active/focused inputs (black border), selected items | Using for passive/subtle separators |
| `color/border/focus` | Focus ring | Keyboard navigation focus rings, accessibility outlines | Using outside `:focus` state |
| `color/border/brand` | Brand-colored border | Selected tabs, active items with brand accent | Using for neutral/non-brand elements |
| `color/border/error` | Error state border | Invalid inputs, error cards | Using outside error states |
| `color/border/success` | Success state border | Validated inputs, success cards | Using outside success states |
| `color/border/warning` | Warning state border | Warning-state containers | Using outside warning states |
| `color/border/disabled` | Disabled border | Disabled input borders, disabled card outlines | Using for active/enabled elements |

---

## 4. Interactive Colors (`color/interactive/*`)

5 tokens for stateful interactive elements.

| Token | Purpose | When to Use | Common Mistakes |
|---|---|---|---|
| `color/interactive/default` | Primary action color | Primary action buttons fill, brand links, active indicators | Using for static text content |
| `color/interactive/hover` | Hover state | Hover state of buttons, links, interactive elements | Using outside hover state |
| `color/interactive/pressed` | Pressed/active state | Active/pressed state of buttons and controls | Using outside press/active state |
| `color/interactive/selected` | Selected state | Active tabs, selected rows, toggle on-state, selected filters | Using outside selection context |
| `color/interactive/disabled` | Disabled interactive | Disabled buttons, disabled controls | Using for enabled elements |

**Note:** In Orange themes, `interactive/default` maps to orange palette. In Blue themes, it maps to blue palette.

---

## 5. Icon Colors (`color/icon/*`)

9 tokens for icon stroke/fill binding. Icons are stroke-only — never use filled icons.

| Token | Purpose | When to Use | Common Mistakes |
|---|---|---|---|
| `color/icon/primary` | Default icon color | Most UI icons, navigation icons, action icons | Hard-coding icon hex colors |
| `color/icon/secondary` | De-emphasized icon | Supporting/secondary icons, less important indicators | Using for primary action icons |
| `color/icon/disabled` | Disabled icon | Icons in disabled buttons, disabled controls | Using for active icons |
| `color/icon/inverse` | Icon on dark/brand bg | Icons on primary buttons, tooltip icons, snackbar icons | Using on light backgrounds |
| `color/icon/brand` | Brand-colored icon | Action emphasis, brand-highlighted icons | Using for all icons indiscriminately |
| `color/icon/error` | Error indicator icon | Error/danger status icons in alerts, validation | Using outside error context |
| `color/icon/success` | Success indicator icon | Success/confirmation icons in alerts, validation | Using outside success context |
| `color/icon/warning` | Warning indicator icon | Warning/caution icons in alerts | Using outside warning context |
| `color/icon/info` | Info indicator icon | Informational icons in alerts | Using outside info context |

**Rule:** Icon color must match the parent component's text color token. If the parent uses `color/text/error`, the icon uses `color/icon/error`.

---

## 6. Component-Specific Tokens

### Button Colors

Buttons derive colors from the token system based on type and variant:

| Button Type | Background | Text | Border |
|---|---|---|---|
| Primary | `color/interactive/default` | `color/text/inverse` | none |
| Secondary | `color/bg/surface` | `color/text/primary` | `color/border/default` |
| Tertiary | transparent | `color/interactive/default` | none |
| CTA (on brand) | brand fill | `color/text/on-brand` | none |

### Badge Colors (Solid / Subtle)

| Color | Solid BG | Solid Text | Subtle BG | Subtle Text |
|---|---|---|---|---|
| Default | `color/bg/medium` | `color/text/primary` | `color/bg/sunken` | `color/text/primary` |
| Brand | `color/bg/brand-primary` | `color/text/inverse` | `color/bg/brand-subtle` | `color/interactive/default` |
| Error | `color/bg/error` | `color/text/inverse` | `color/bg/error-subtle` | `color/text/error` |
| Success | `color/bg/success` | `color/text/inverse` | `color/bg/success-subtle` | `color/text/success` |
| Warning | `color/bg/warning` | `color/text/inverse` | `color/bg/warning-subtle` | `color/text/warning` |
| Info | `color/bg/info` | `color/text/inverse` | `color/bg/info-subtle` | `color/text/info` |

### Tag Colors

Tags follow the same 6-color pattern as badges (Default, Brand, Error, Success, Warning, Info) with close-icon stroke matching text color.

---

## 7. Spacing Scale

All spacing values used for padding, gaps, and margins. Bind to `spacing/*` variables.

| Token | Value | Common Use |
|---|---|---|
| `spacing/0` | 0px | No spacing |
| `spacing/2` | 2px | Micro spacing, icon-to-text tight |
| `spacing/4` | 4px | Tight padding, small gaps |
| `spacing/6` | 6px | Compact element spacing |
| `spacing/8` | 8px | Default small gap, button padding-y |
| `spacing/10` | 10px | Medium-small spacing |
| `spacing/12` | 12px | Default input padding-x, card internal gaps |
| `spacing/16` | 16px | Container padding, section gaps |
| `spacing/20` | 20px | Medium section spacing |
| `spacing/24` | 24px | Card padding, form group gaps |
| `spacing/32` | 32px | Large section spacing |
| `spacing/40` | 40px | Page section gaps |
| `spacing/48` | 48px | Hero section spacing |
| `spacing/64` | 64px | Major layout gaps |
| `spacing/80` | 80px | Large layout spacing |
| `spacing/96` | 96px | Extra-large layout spacing |
| `spacing/128` | 128px | Maximum spacing value |

---

## 8. Radius Scale

Border radius values. The design system default is 6px.

| Token | Value | When to Use |
|---|---|---|
| `radius/none` | 0px | Sharp corners — tables, full-bleed elements |
| `radius/sm` | 2px | Subtle rounding — badges, tags, small elements |
| `radius/md` | 4px | Moderate rounding — inner nested elements |
| `radius/default` | 6px | Standard — buttons, inputs, cards, containers, modals |
| `radius/lg` | 8px | Emphasized rounding — large cards, prominent containers |
| `radius/xl` | 12px | Strong rounding — feature cards, marketing elements |
| `radius/full` | 9999px | Pill shape — avatars, toggle tracks, fully rounded buttons |

**Rule:** The system default radius is 6px. Use `radius/default` for nearly everything. Never use odd-number radii (3px, 5px, 7px).

---

## 9. Typography Styles

19 text styles across 3 font families. All sizes are even numbers, minimum 10px.

### Display (3 styles) — Hero sections, landing pages

| Style | Font | Size | Line Height | Weight | When to Use |
|---|---|---|---|---|---|
| `Display/XL` | Zoho Puvi | 48px | 56px | Bold (700) | Marketing pages, hero banners, splash screens |
| `Display/LG` | Zoho Puvi | 40px | 48px | Bold (700) | Feature introductions, onboarding heroes |
| `Display/MD` | Zoho Puvi | 32px | 40px | Bold (700) | Secondary hero text, large feature callouts |

### Heading (5 styles) — Section titles, page headers

| Style | Font | Size | Line Height | Weight | When to Use |
|---|---|---|---|---|---|
| `Heading/XL` | Zoho Puvi | 28px | 36px | Semibold (600) | Page titles, main section headers |
| `Heading/LG` | Zoho Puvi | 24px | 32px | Semibold (600) | Major section headings, modal titles |
| `Heading/MD` | Zoho Puvi | 20px | 28px | Semibold (600) | Card titles, subsection headers |
| `Heading/SM` | Zoho Puvi | 16px | 24px | Semibold (600) | Widget titles, sidebar headers, accordion headers |
| `Heading/XS` | Zoho Puvi | 14px | 20px | Semibold (600) | Minor headings, form section labels, list group headers |

### Body (3 styles) — Readable content

| Style | Font | Size | Line Height | Weight | When to Use |
|---|---|---|---|---|---|
| `Body/LG` | Zoho Puvi | 16px | 24px | Regular (400) | Long-form content, descriptions, onboarding text |
| `Body/MD` | Zoho Puvi | 14px | 20px | Regular (400) | Default body — table cells, list items, form descriptions |
| `Body/SM` | Zoho Puvi | 12px | 16px | Regular (400) | Compact text — secondary descriptions, metadata, timestamps |

### Label (3 styles) — UI labels, control text

| Style | Font | Size | Line Height | Weight | When to Use |
|---|---|---|---|---|---|
| `Label/LG` | Zoho Puvi | 14px | 20px | Medium (500) | Button text (Default/Large), form labels, nav items, tab labels |
| `Label/MD` | Zoho Puvi | 12px | 16px | Medium (500) | Button text (Small/Medium), badge text, tag text, menu items |
| `Label/SM` | Zoho Puvi | 10px | 14px | Medium (500) | Button text (XS), small badges, status indicators |

### Caption (1 style) — Minor annotations

| Style | Font | Size | Line Height | Weight | When to Use |
|---|---|---|---|---|---|
| `Caption` | Zoho Puvi | 10px | 14px | Regular (400) | Timestamps, file sizes, image captions, footnotes |

### Overline (1 style) — Category labels

| Style | Font | Size | Line Height | Weight | When to Use |
|---|---|---|---|---|---|
| `Overline` | Zoho Puvi | 10px | 14px | Semibold (600), UPPERCASE | Section category labels, eyebrow text, column group headers |

### Code (3 styles) — Technical text

| Style | Font | Size | Line Height | Weight | When to Use |
|---|---|---|---|---|---|
| `Code/LG` | Roboto Mono | 14px | 20px | Regular (400) | Code editor content, API docs, large code blocks |
| `Code/MD` | Roboto Mono | 12px | 16px | Regular (400) | Inline code, keyboard shortcuts, terminal output |
| `Code/SM` | Roboto Mono | 10px | 14px | Regular (400) | Compact code references, technical annotations |

### Component-to-Style Mapping

| Component | Text Style | Color Token |
|---|---|---|
| Button (XS) | `Label/SM` | Depends on type |
| Button (Small/Medium) | `Label/MD` | Depends on type |
| Button (Default/Large) | `Label/LG` | Depends on type |
| Input label | `Label/MD` | `color/text/primary` |
| Input value | `Body/MD` | `color/text/primary` |
| Input placeholder | `Body/MD` | `color/text/placeholder` |
| Helper text | `Body/SM` | `color/text/secondary` or `color/text/error` |
| Badge | `Label/SM` or `Label/MD` | Depends on variant |
| Tooltip body | `Body/SM` | `color/text/inverse` |
| Tab label | `Label/MD` or `Label/LG` | `color/text/primary` |
| Menu item | `Body/MD` | `color/text/primary` |
| Modal title | `Heading/MD` | `color/text/primary` |
| Card title | `Heading/SM` | `color/text/primary` |

---

## 10. Theme Modes

The Themes collection supports 4 modes. Every component must render correctly in all 4.

| Mode | Brand Color | Surface | Use Case |
|---|---|---|---|
| **Orange-Light** | Orange palette | Light neutrals (white surface) | Default Zoho brand, light mode |
| **Orange-Dark** | Orange palette | Dark neutrals (dark surface) | Default Zoho brand, dark mode |
| **Blue-Light** | Blue palette | Light neutrals (white surface) | Alternate brand, light mode |
| **Blue-Dark** | Blue palette | Dark neutrals (dark surface) | Alternate brand, dark mode |

### Mode Switching Behavior

- `color/bg/surface`: white in Light modes, near-black in Dark modes
- `color/text/primary`: near-black in Light modes, near-white in Dark modes
- `color/interactive/default`: orange in Orange modes, blue in Blue modes
- `color/bg/brand-primary`: orange fill in Orange modes, blue fill in Blue modes
- All semantic tokens swap automatically when the mode changes

### Testing Requirement

Before any component is approved, it must be verified in all 4 modes. Common dark-mode failures:
- Hard-coded white fills that don't invert (use `color/bg/surface` instead)
- Default Figma fills left on frames (clear them, let the variable handle it)
- Icons with hard-coded colors that disappear on dark backgrounds

---

## Hard Rules Summary

1. **NEVER hard-code hex values** — every color binds to a Themes variable
2. **Components use Themes only** — never reference Primitives directly
3. **No odd font sizes** — all sizes are even (10, 12, 14, 16, 20, 24, 28, 32, 40, 48)
4. **Minimum font size is 10px** — nothing smaller
5. **Default radius is 6px** — no odd-number radii (3, 5, 7)
6. **Icons are stroke-only** — never fill icons; bind stroke to `color/icon/*`
7. **Test all 4 modes** — Orange-Light, Orange-Dark, Blue-Light, Blue-Dark
8. **WCAG AA contrast** — text 4.5:1, large text/UI 3:1 minimum
