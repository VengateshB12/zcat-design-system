# Library Requests — gaps found by agents building real screens

Tracked asks for the design team. Every entry was hit by an agent during a real
build and blocked or degraded the output. None can be fixed agent-side.

**Verified live 2026-08-19** against ZCat-AI Understandable (`ugOZk4O0g6XpviEBSN24mF`).

---

## 1. Missing icons (6) — blocking for assistant/chat UIs

All 87 icons were searched by name and alias. These return **no match at all** —
this is a library gap, not an alias gap.

| Icon | Needed for | Severity |
|---|---|---|
| **send** (paper plane) | The submit action of any chat/prompt input | **Blocking** — an assistant UI cannot ship without it |
| **attach** (paperclip) | File attachment in a prompt bar | **Blocking** — same |
| **chart / graph** | Analytics cards, monitoring, report links | High — dashboards are a core Catalyst screen type |
| **menu / hamburger** | Collapsed nav, mobile/compact layouts | High |
| **message / chat bubble** | Conversation entry points, comment threads | High |
| **bulb / idea** | Tips, suggestions, "did you know" affordances | Medium |

Interim behaviour: agents use the closest existing icon and disclose the
substitution (see the FALLBACK LADDER in `zcat.md`). That is damage control, not
a fix — a paperclip substituted by `File` reads as "open file", not "attach".

---

## 2. Missing component: side drawer / panel shell

**The entire AI-assistant screen type is unsupported.** The only overlay
primitives are `Popup` and `Popup Blur`, and neither models a persistent side
panel where the user still sees the page behind it.

An agent building the Catalyst AI assistant had to hand-build the whole
pinned-header / scrollable-body / pinned-footer structure from raw
`createAutoLayout` calls.

**This needs a new component, not a Popup variant** — the two have conflicting
interaction rules:

| | Popup | Drawer |
|---|---|---|
| Close affordance | footer only, **no X in header** (hard rule) | X in the header |
| Page behind | blocked by Popup Blur | visible and still usable |
| Dismissal | explicit Cancel/Create | click-away, Esc, or X |

Forcing `Popup` into a drawer role would put a component in direct conflict with
the "popup close is in the FOOTER, never an X in the header" rule.

**Also missing alongside it:** message bubble (user vs assistant variants), and a
file-chip / attachment row.

---

## 3. Component defects worth fixing at source

| Component | Defect | Impact |
|---|---|---|
| **Double field** | No `Label` property on the wrapper, and both children are pinned `FIXED 36px`. Enabling a nested label overflows the frame while it still reports `h=36` | Every consumer hits this. Workaround needs three non-obvious steps |
| **Text Box** | No `Password` type — only `Text Field` / `Textarea` | A password field shipped as a multi-line textarea |
| **Table AI** | No row-count property, and it is zero-detach | Cannot show more rows than the component ships. Fine for "Top 5", blocking for real lists |

---

## 4. Variable publishing

**423 of 493 `Mode` variables cannot be imported by a consuming file.** Only
`BODY`, `CARDS`, `SHADOWS`, `BRANDING ICON` and `OTHER SHADES` are bindable
(70 variables, 69 of which resolve).

Consequence: an agent styling a hand-built element cannot bind
`INPUT FIELDS/Borders/Default` and must approximate with `CARDS/Borders/Default`,
which drifts from the real components. This directly weakens the fallback ladder
in section 2 — we tell agents to bind everything, then withhold the variables
that would make hand-built elements match.

Also:
- **`CARDS/Bg Default/Dark Bg`** (`ebc952158732732071d9351f482e0de41462616e`) exists in the library but does **not** resolve for consumers — broken publish state
- **`_Global_Values`** (`Spacing/S*`, `Radius/R*`, `Border/*`) is entirely unbindable, so spacing and radius are hardcoded numbers

---

## 5. Descriptions contradict live definitions

This is the root cause of the corruption this whole reference system was rebuilt
to remove. Descriptions are hand-written prose that drifts; agents read them and
inherit false enums.

Re-confirmed on `Divider`: description says `State (Completed, Active, Upcoming,
Error)`; live is `Default / Active / Completed / Disabled`.

**Ask:** either generate descriptions from `componentPropertyDefinitions`, or stop
listing property values in prose so there is nothing to drift. In a library named
*AI Understandable*, the description IS the AI-facing surface.

---

## 6. Naming hygiene (low urgency)

Live typos: `PROFILE NAV/Icons/Whilte`, `PROFILE NAV/Background/Whilte`,
`MENU LIST/Icons/Check deafult`. Dead variables still published:
`BADGE/Border - Removed in UI/*`. Misleading: `BADGE/Background/Sec- Primary` is
subtle **blue**, not a "primary" colour.
