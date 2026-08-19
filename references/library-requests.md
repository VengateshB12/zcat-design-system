# Library Requests — genuine defects only

**Scope, deliberately narrow.** Missing icons and missing shell components are
**NOT** tracked here and are **not** design-team work. The library will never
cover every icon or every screen type, and agents are expected to handle those
themselves — closest icon + disclosure, frames for missing shells. See the
**FALLBACK LADDER**, **MISSING ICONS** and **DRAWER / SIDE PANEL RECIPE** sections
in `.claude/skills/zcat.md`. Do not add an icon or a shell component to this file.

What belongs here: things that are **broken or unreachable**, which an agent
cannot work around no matter how well it builds.

**Verified live 2026-08-19** against ZCat-AI Understandable (`ugOZk4O0g6XpviEBSN24mF`).

---

## 1. Variable publishing — the one that matters most

**423 of 493 `Mode` variables cannot be imported by a consuming file.** Only
`BODY`, `CARDS`, `SHADOWS`, `BRANDING ICON` and `OTHER SHADES` are bindable
(70 variables, 69 of which resolve).

This is now the **highest-value ask**, and the reason is the fallback policy: we
tell agents to hand-build whatever the library lacks and bind every colour to a
zcat variable — then withhold the variables that would let a hand-built element
match the real components. An agent building a drawer cannot bind
`INPUT FIELDS/Borders/Default` to its prompt field and must approximate with
`CARDS/Borders/Default`, so hand-built work drifts from component work by
construction.

Publishing `INPUT FIELDS/*`, `TABLE/*`, `BUTTONS/*`, `BADGE/*` and `ATTENTION/*`
would close that gap and make hand-built elements visually indistinguishable from
component ones.

Also:
- **`CARDS/Bg Default/Dark Bg`** (`ebc952158732732071d9351f482e0de41462616e`) exists in the library but does **not** resolve for consumers — broken publish state on one variable
- **`_Global_Values`** (`Spacing/S*`, `Radius/R*`, `Border/*`) is entirely unbindable, so every spacing and radius value is a hardcoded number

## 2. Component defects

| Component | Defect | Impact |
|---|---|---|
| **Double field** | No `Label` property on the wrapper, and both children are pinned `FIXED 36px`. Enabling a nested label overflows the frame while it still reports `h=36` | Every consumer hits it; the workaround needs three non-obvious steps |
| **Text Box** | No `Password` type — only `Text Field` / `Textarea` | A password field shipped as a multi-line textarea |
| **Table AI** | No row-count property, and it is zero-detach | Cannot exceed the rows it ships with. Fine for "Top 5", blocking for real lists |

## 3. Descriptions contradict live definitions

The root cause of the corruption this reference system was rebuilt to remove.
Descriptions are hand-written prose that drifts; agents read them and inherit
false enums.

Re-confirmed on `Divider`: description says `State (Completed, Active, Upcoming,
Error)`; live is `Default / Active / Completed / Disabled`.

**Ask:** generate descriptions from `componentPropertyDefinitions`, or stop listing
property values in prose so there is nothing to drift. In a library named
*AI Understandable*, the description IS the AI-facing surface.

## 4. Naming hygiene (low urgency)

Live typos: `PROFILE NAV/Icons/Whilte`, `PROFILE NAV/Background/Whilte`,
`MENU LIST/Icons/Check deafult`. Dead variables still published:
`BADGE/Border - Removed in UI/*`. Misleading: `BADGE/Background/Sec- Primary` is
subtle **blue**, not a "primary" colour.
