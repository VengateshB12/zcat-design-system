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

## 2. Component defects — RESOLVED / CLOSED 2026-08-19

| Component | Status |
|---|---|
| **Double field** | **FIXED by the design team.** The label + FIXED-36px workaround is still documented in `zcat.md` because files that have not taken the library update still hit it |
| **Text Box** `Password` type | **Closed — not needed.** Use `Text Field` with masked characters |
| **Table AI** row count | **Closed — not a requirement.** Row count is not driven by the UI; use the rows the component ships with |

## 3. Descriptions contradict live definitions — FIXED 2026-08-19

**Done.** All 32 components in the key table had their descriptions regenerated
from live `componentPropertyDefinitions`. Each now keeps its human purpose line and
appends generated, authoritative property values with a "do not hand-edit;
regenerate" marker.

Examples of what was corrected:

| Component | Description used to claim | Now |
|---|---|---|
| Badges | `Style (Solid, Subtle)`, `Content (Text, Dot…)` | `Type = Primary \| Secondary`, `Color = …Danger \| Info \| Success \| Warning` |
| Card | `Color (White, Grey, Bordered, Elevated)` | `State = Default \| Disabled \| Hover \| Selected` |
| Divider | `State (…Upcoming, Error)` | `State = Default \| Active \| Completed \| Disabled` |
| Toggle | `State (…Focused)`, `Size`, `Show Label` | `Toggled = Off \| On`, `State = Default \| Hover \| Disabled`, booleans `Sub text, Title text` |

Zero stale phrases remain across the audited set.

**Mechanics worth recording:** `importComponentSetByKeyAsync` returns a REMOTE,
read-only reference — writing `.description` on it throws *"Cannot write to internal
and read-only node."* Descriptions must be written on the LOCAL nodes inside the
library file, matched by published `key`. `page.loadAsync()` loads pages without
switching `currentPage`, so all 32 pages can be reached in one script.

**Remaining manual step:** publish the library so consumers see the new
descriptions.

**To keep it fixed:** regenerate after any component change rather than editing
prose. Hand-editing a property list is how this drifted in the first place.

## 4. Naming hygiene — PARTLY FIXED 2026-08-19

Renamed (safe: variable bindings resolve by id/key, not by name):

- `PROFILE NAV/Icons/Whilte` → `PROFILE NAV/Icons/White`
- `PROFILE NAV/Background/Whilte` → `PROFILE NAV/Background/White`
- `MENU LIST/Icons/Check deafult` → `MENU LIST/Icons/Check default`

**Left alone deliberately:** `BADGE/Border - Removed in UI/White` and
`/Disabled`. Renaming them does not help and **deleting them would break anything
still bound to them** — that needs a usage check first, which is a design-team
call, not an agent's.

Still misleading, no action taken: `BADGE/Background/Sec- Primary` is subtle
**blue**, not a "primary" colour. Renaming it is a breaking-ish change for anyone
reading names, so flagging rather than doing.
