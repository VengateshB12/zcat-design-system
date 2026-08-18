# Library Audit — Regenerating Canonical Component Data

**Purpose:** keep `component-manifest.json` and the key table in `.claude/skills/zcat.md` in agreement with the LIVE zcat Figma library. Run this after any library change, and whenever a build hits an unexpected key, missing property, or invalid variant.

---

## The rule that matters most

**`componentPropertyDefinitions` from the live library is the ONLY canonical source for:**

- component keys
- component type (`component` vs `component_set`)
- component-set membership
- variant property NAMES
- allowed variant VALUES (enums)
- boolean property names (including `#nodeId` suffixes)
- instance-swap property names

**NEVER derive any of these from a component's `description` field.**

This is not a stylistic preference — it is the specific defect that corrupted this system. Library descriptions are hand-written prose that drifts from reality. Verified examples of descriptions contradicting live definitions:

| Component | Description claims | Live definition |
|---|---|---|
| Buttons | `Variant (…, Text)`, `State (…, Click, Focused)` | `Variant (…, Ghost Grey)`, `State (…, Pressed)` — no Text, no Focused |
| Badges | `Style (Solid, Subtle)`, `Content (Text, Dot, Count)` | `Type (Primary, Secondary)` — no Style, no Content property at all |
| Text Box | `Has Label`, `State (…, Read Only)` | `Label#12730:2`, `State (…, Filled)` |
| File Upload | `Type (Drag & Drop, Button, Compact)` | `Type (Single Upload, Multiple File)` |
| Card | `Color (White, Grey, Bordered, Elevated)` | `State (Default, Hover, Selected, Disabled)` — no Color property |
| Check Box | `State (…, Focused)` | `State (Default, Hover, Disabled)` |
| Divider | `State (Completed, Active, Upcoming, Error)` | `State (Default, Active, Completed, Disabled)` — no Upcoming, no Error |

Transcribing descriptions is how `Amber`, `Pill`, `Count`, `Layout`, and `Has Label` entered our docs as if they were real values. If a future sync reads descriptions again, the same corruption returns.

**Also canonical-by-key, never by name:** color variables and text styles. `figma.variables.getLocalVariablesAsync()` and `figma.getLocalTextStylesAsync()` return **empty** in a consuming file — library assets are not local. Name-based lookup against them silently yields nothing.

---

## Step 1 — Dump live truth

Run via `use_figma` against a file that subscribes to the zcat library. Feed it the key list from `componentKeyMap`.

```js
// AUDIT: dump live componentPropertyDefinitions for every known key.
// Paste the key list as [name, key, declaredType] triples.
const KEYS = [ /* ["Button","5819eb82…","component_set"], … */ ];

const results = [];
for (const [name, key, declaredType] of KEYS) {
  let node = null, actualType = null, err = null;
  try { node = await figma.importComponentSetByKeyAsync(key); actualType = "component_set"; }
  catch (e1) {
    try { node = await figma.importComponentByKeyAsync(key); actualType = "component"; }
    catch (e2) { err = String(e2.message).slice(0, 80); }
  }
  if (!node) { results.push({ name, key, found: false, err }); continue; }

  // Narrow the property owner: never read definitions off a variant child.
  const owner = (actualType === "component" && node.parent && node.parent.type === "COMPONENT_SET")
    ? node.parent : node;
  const defs = owner.componentPropertyDefinitions || {};

  const variants = {}, bools = [], swaps = [];
  for (const k of Object.keys(defs)) {
    const d = defs[k];
    if (d.type === "VARIANT") variants[k] = d.variantOptions;
    else if (d.type === "BOOLEAN") bools.push(k);
    else if (d.type === "INSTANCE_SWAP") swaps.push(k);
  }
  results.push({
    name, key, found: true, realName: node.name,
    declaredType, actualType, typeMatch: actualType === declaredType,
    variants, bools, swaps
  });
}
return results;
```

**Also confirm which generation is published.** A superseded generation stays importable by key but is absent from the library search index. For each ambiguous component, run `search_design_system` for its name: the key the index returns is the current one. Keys that never appear in the index are legacy.

## Step 1b — Verify LIBRARY ORIGIN (do not skip — this is the check that was missing)

A key resolving proves nothing about which library it came from. Legacy-library components import cleanly and look correct. **The plugin API cannot tell you the library** — `component.remote` is only `true`/`false`.

Two libraries exist:

| Library | Library key | Use |
|---|---|---|
| ZCat-AI Understandable (primary) | `lk-6b302ab2…` | ALL new designs |
| ZCatalyst Design System (legacy) | `lk-ae83192f…` | pre-existing instances only |

To confirm origin, search each library explicitly and see which one returns the key:

```
search_design_system(query: "<Component Name>", includeLibraryKeys: ["lk-6b302ab2…"])   → primary?
search_design_system(query: "<Component Name>", includeLibraryKeys: ["lk-ae83192f…"])   → legacy?
```

The Figma UI also shows the owning library on a selected instance in the right panel — that is authoritative and the fastest manual check.

**Audit nested children too.** A primary-library component can nest a legacy-library child, which changes the valid enum for that child. Known case: `Table AI` (primary) nests `Badges` from the **legacy** library, so table badges take literal colours (`Green/Orange/Red`) while standalone badges take semantic ones (`Success/Danger/Warning`). Enumerate distinct nested main components and check each:

```js
const seen = new Map();
for (const inst of root.findAll(n => n.type === "INSTANCE")) {
  const mc = await inst.getMainComponentAsync();
  if (!mc) continue;
  const owner = (mc.parent && mc.parent.type === "COMPONENT_SET") ? mc.parent : mc;
  if (!seen.has(owner.key)) seen.set(owner.key, { name: owner.name, key: owner.key, usedAs: inst.name });
}
return [...seen.values()];   // then confirm each key's library via search_design_system
```

Report any key that is not in the primary library. If it is reachable only through a primary component's internals, it is a **library-side defect** to raise with the design team — it cannot be fixed agent-side when the parent is zero-detach.

## Step 2 — Dump variables and text styles

```js
// Verify each variable/style key resolves, and capture its real name + spec.
const VARS = [ /* ["BODY/Text/Static/Primary","78d226f6…"], … */ ];
const STYLES = [ /* ["✅ Body/Subtitle 1","acb8f120…"], … */ ];

const out = { vars: [], styles: [] };
for (const [name, key] of VARS) {
  try {
    const v = await figma.variables.importVariableByKeyAsync(key);
    out.vars.push({ name, key, ok: !!v, realName: v && v.name, type: v && v.resolvedType });
  } catch (e) { out.vars.push({ name, key, ok: false, err: String(e.message).slice(0, 60) }); }
}
for (const [name, key] of STYLES) {
  try {
    const s = await figma.importStyleByKeyAsync(key);
    out.styles.push({ name, key, ok: !!s, realName: s && s.name,
      font: s && s.fontName, size: s && s.fontSize });
  } catch (e) { out.styles.push({ name, key, ok: false, err: String(e.message).slice(0, 60) }); }
}
return out;
```

Discover new variable/style keys with `search_design_system` (`includeVariables: true` / `includeStyles: true`) — the result carries the `key` needed for import.

## Step 3 — Diff and report

Classify every record:

```
Total records checked:
  Correct     — key resolves, type matches, variants match manifest
  Incorrect   — resolves but type or variant values disagree
  Missing     — key does not resolve at all (dead)
  Stale       — resolves but is legacy generation (absent from search index)
  Unverified  — placeholder such as "NEEDS_VERIFICATION"
```

Report counts plus a per-record list of the disagreements. Do not silently overwrite — show the diff first.

## Step 4 — Update BOTH sources, then re-verify

1. `references/component-manifest.json` → `componentKeyMap` + each component's `properties`
2. `.claude/skills/zcat.md` → COMPONENT KEY TABLE and the variables/text-styles tables

**They must stay identical. `componentKeyMap` is authoritative on disagreement** — a divergence is a bug, not a preference.

Then re-run Step 1 against the updated data and confirm zero Incorrect / Missing / Stale. An audit that does not end in a clean verification pass has not finished.

## Step 5 — Drift check

Cheap guard to run any time:

```js
// Assert every key in the table resolves AND is the current generation.
// Any throw = drift; go back to Step 1.
for (const [name, key, kind] of KEYS) {
  const node = kind === "component_set"
    ? await figma.importComponentSetByKeyAsync(key)   // throws if dead
    : await figma.importComponentByKeyAsync(key);
  if (!node) throw new Error(`drift: ${name} ${key}`);
}
return "no drift";
```

---

## Known-good baseline (verified 2026-08-18)

- 56 real keys in `componentKeyMap` — all resolve
- Current generation confirmed via search index for Badge, Button, Check Box, Text Box, Avatar, Empty State
- Legacy generation identified: 9 superseded keys + 6 dead keys, all previously in the zcat.md table
- Font family is **Inter** (Roboto Mono for code) — earlier "Zoho Puvi" claims were wrong
- Live variable namespaces: `BODY/*`, `CARDS/*`, `SHADOWS/*`, `BRANDING ICON/*`; collections `Mode` and `Typography`
- Live text styles are prefixed `✅` — e.g. `✅ Body/Subtitle 1`, `✅ Headlines/H5`

Full verified key lists live in the COMPONENT KEY TABLE and the ZCAT VARIABLES AND TEXT STYLES tables in `.claude/skills/zcat.md`.

---

## Second-pass findings (2026-08-18, session 2)

### A. Icons ARE importable by key — the old rule was wrong

`zcat.md` rule 23 previously asserted that the Icon component set is internal and that
both `importComponentByKeyAsync` and `importComponentSetByKeyAsync` FAIL for icons, so
icons had to be cloned from a Button and `swapComponent()`-ed.

Verified false. Enumerating page `✅ Icons` in the library file gives **87 standalone
`COMPONENT`s, zero `COMPONENT_SET`s**. Every one imports directly by key. Four were
instance-tested (Arrow Up, X, Edit Line, Delete): all `COMPONENT`, 16x16, not variants,
no parent set, one stroke-only `VECTOR:Icon`, zero filled nodes, stroke **already bound**
to `BODY/Icons/Static/Primary`.

Full catalog with keys, sizes and search aliases: **`references/icon-catalog.json`**
(74 UI icons at 16x16 + 13 product logos at 20x20).

The clone+swap mechanism is still correct for one narrow case: `INSTANCE_SWAP` icon
*slots* inside components (e.g. Link's `Change Icon Left`), which take a main-component
reference rather than a key.

### B. The fabricated `color/*` variable taxonomy is still widespread

The earlier cleanup covered `references/decision-rules/` only (verified 0 occurrences).
The fake flat taxonomy survives elsewhere. Counts at time of writing:

| File | Occurrences | Status |
|---|---|---|
| `references/design-tokens.md` | 111 | **NOT yet fixed** — this is the designated token reference |
| `references/component-manifest.json` | 99 (+21 "Zoho Puvi") | **NOT yet fixed** |
| `references/design-analysis-workflow.md` | 20 | **NOT yet fixed** |
| `.claude/skills/zcat.md` | 12 | fixed in session 2 |
| `references/decision-rules/` | 0 | clean |

**64 distinct fabricated names** (`color/bg/surface`, `color/text/primary`,
`color/interactive/pressed`, `color/icon/brand`, …). This is NOT a find-and-replace:
many have no real counterpart, so each site needs a decision.

Live truth (enumerated 2026-08-18): **710 variables in 5 collections**, **26 text styles**.

| Collection | Modes | Variables |
|---|---|---|
| `Mode` | Light, Dark | 493 — bind to this layer |
| `_Global_Colors` | Hex Code | 111 — raw ramp, never bind directly |
| `Typography` | Primary (Inter), Secondary (Zoho Puvi) | 55 |
| `_Global_Values` | Mode 1 | 41 — `Spacing/S*`, `Radius/R*`, `Border/*` |
| `Theme` | Default - Royal Blue, Purple | 10 |

The real colour taxonomy is **component-scoped** (`BUTTONS/*` 87, `TABS/*` 28,
`INPUT FIELDS/*` 26, `ATTENTION/*` 25, `BADGE/*` 22, `CARDS/*` 22, `TABLE/*` 18,
`BODY/*` 16, …), not a flat `color/*` tree.

Note: "Zoho Puvi" is **not** fake — it is the real *Secondary* typography mode. The
manifest has the roles inverted; Inter is **Primary**.

We also never documented that real `Spacing/S*`, `Radius/R*` and `Border/*` variables
exist — current docs specify raw numbers for spacing and radius.

**Recommended fix:** regenerate `design-tokens.md` from a live dump of the `Mode`
collection (name + key + resolved Light/Dark values, grouped by component namespace),
and delete the manifest's invented token section rather than editing it. This dump is
also exactly what the planned `zcat_get_all_variables` MCP tool must serve.

### C. New defect class — silent instance LAYOUT drift

`Double field` in the T3 test screen had `itemSpacing` overridden from the component's
`-1` to `2`, splitting a deliberately shared 1px border seam into a visible 2px gap.
Colours stayed bound, text kept its styles, variants were valid — so **every 4f check
passed while the render was wrong**. Same failure shape as the original corruption:
validation confirms a broken screen.

Two more from the same component: enabling `Label` on both nested children produced two
labels overflowing a frame that still reported `h=36`, because the variant pins both
children to FIXED 36px.

Mitigation added to 4f as **CHECK 10: INSTANCE LAYOUT DRIFT** — compares each instance's
`itemSpacing`, padding and axis alignment against its main component and warns on
differences. Treat every hit as "prove this override was intentional".

### D. Only 70 of 493 colour variables are consumer-bindable (verified 2026-08-18)

The regenerated `design-tokens.md` was validated by importing keys **from a consuming
file**, not from the library. Result: `importVariableByKeyAsync` throws
`Variable with key "…" not found` for **423 of 493** `Mode` variables.

Bindable namespaces (5): `BODY` (16), `CARDS` (22), `OTHER SHADES` (28), `SHADOWS` (2),
`BRANDING ICON` (2) — 70 keys, of which **69 import**. The one failure is
`CARDS/Bg Default/Dark Bg` (`ebc952158732732071d9351f482e0de41462616e`), which exists in
the library but does not resolve for consumers.

Not bindable (31 namespaces, 423 variables): every component-scoped namespace —
`BUTTONS`, `TABS`, `INPUT FIELDS`, `ATTENTION`, `BADGE`, `TABLE`, `STEPPER`, `TOOLTIP`,
`POPUP`, `LOADER`, and the rest. Also the entire **`_Global_Values`** collection
(`Spacing/S*`, `Radius/R*`, `Border/*`).

This is coherent, not a defect: component internals stay bound inside the components, so
instancing a component carries its colours automatically. Consumers only need bindable
variables for elements they author themselves.

**Consequence for audits:** verifying a key exists in the library is NOT sufficient. A key
must be import-tested **from a consuming file**. Any future regeneration of
`design-tokens.md` must repeat that test and re-mark the ✅/⛔ columns — otherwise the file
hands agents keys that throw, which is the same silent-failure class this whole effort
exists to remove.

Text styles are bindable (`importStyleByKeyAsync`), sample-verified.

### E. Table AI badge defect fixed at source, pending propagation (2026-08-18)

The design team repointed `_Table_Col_Badge` to the primary `Badges` set. Verified in the
library file: node `13223:1777` now nests `43e36112e3424d07337dd538025a7a53d1ec1c95`, enum
`Primary / Grey / Purple / Danger / Disabled / Info / Success / Warning`, and its five
sample rows use semantic values (Active=Primary, Inactive=Grey, Running=Success,
Error=Danger, Pending=Warning).

**The fix had not reached consumers at time of writing.** In the test file
`Bagecp6Z9Ih9kMRhbGF9Fj`, Table AI badge instances still resolved to the legacy set
`158e4b6d…`, and `setProperties({ Color: "Success" })` still threw
`Unable to find a variant with those property values`. `_Table_Col_Badge` cannot be
imported by key from a consuming file, so a fresh import cannot be used to probe
propagation and there is no agent-side way to force the update — the library must be
published and each consuming file must accept the update.

**Audit lesson:** a component fix verified in the library source is NOT evidence that
consuming files behave differently. Verify library state and consumer state separately —
they can disagree for as long as the update is unpublished or unaccepted. This is the same
shape as finding D: existence in the library does not imply availability to consumers.

Guidance was therefore changed from "pass the legacy enum" to "read
`Color.variantOptions` off the instance's owning set and branch", which is correct before,
during and after propagation, plus a semantic-to-legacy fallback map.

### E-2. Publish confirmed; the probe that distinguishes publish from acceptance

After the library was published, the consuming file still resolved the legacy badge set and
still threw on `Color: "Success"`. That alone does not say whether the publish failed or the
file simply had not accepted the update — two very different problems.

**The probe that separates them:** import the published PARENT fresh by key and inspect what
it nests.

```js
const set = await figma.importComponentSetByKeyAsync("f3a77aaa2d8b332d2c86a9cb77ed6a4f92305c07");
const inst = set.defaultVariant.createInstance();   // pulls the CURRENTLY PUBLISHED version
// ...resolve the nested Badges owner and read Color.variantOptions...
inst.remove();
```

Result: the fresh import nested `43e36112…` and accepted `Color: "Success"`. So the publish
worked, and only pre-existing instances lag. Fix per file: Assets → Updates available →
Update all.

**Why `_Table_Col_Badge` itself cannot be probed:** a leading `_` makes a component PRIVATE in
Figma. It is never published as its own library asset, which is why
`importComponentByKeyAsync("f54ff134…")` returns "not found" while the component plainly
exists. Private children travel only inside their published parent — so always probe the
published parent, never the private child.

**Caution when accepting the update:** `Green`/`Red`/`Orange` do not exist in the new enum, so
Figma may fall back to a default and silently restyle badges on existing screens. Screenshot
after updating.
