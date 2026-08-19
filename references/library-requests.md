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

## 1. Variable publishing — CLOSED, working as designed

**Not a gap. Do not reopen.** The design team's position, and it is the right one:
component-scoped variables (`INPUT FIELDS/*`, `BUTTONS/*`, `TABLE/*`, `BADGE/*`,
`ATTENTION/*`) belong to their components. An input's border colour is the input's
business; a consumer building its own frame has no claim on it.

Consumers bind from the published semantic set — `BODY`, `CARDS`, `SHADOWS`,
`BRANDING ICON`, `OTHER SHADES` — which is exactly what that set exists for. The
mapping table for hand-built elements lives in `zcat.md` under FALLBACK LADDER.

I had this listed as the top ask on the argument that hand-built work would drift
from component work. That argument was wrong: a hand-built panel should read as a
*panel* (`CARDS/*`), not impersonate an input. Retracted.

**One genuine bug remains in this area:** `CARDS/Bg Default/Dark Bg`
(`ebc952158732732071d9351f482e0de41462616e`) sits in a PUBLISHED namespace but does
not resolve for consumers. That is a broken publish on a single variable, not a
policy question — worth an unpublish/republish.

`_Global_Values` (`Spacing/S*`, `Radius/R*`, `Border/*`) is also unpublished, but
this needs no action: the rules already require spacing and radius to come from a
fixed even-number scale, and literal numbers satisfy that.

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
