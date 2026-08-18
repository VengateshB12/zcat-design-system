# Design Tokens — GENERATED from the live zcat Figma variable collections

> ## GENERATED FILE — DO NOT HAND-EDIT
>
> Dumped directly from the live library. Names are reproduced **exactly** as they exist
> in Figma — no aliases, no invented semantic names, no mapping layer.
>
> **To update: regenerate, do not edit.** See `references/library-audit.md` Step 2,
> against library file `ugOZk4O0g6XpviEBSN24mF`, then replace this file wholesale.
>
> `zcat_get_all_variables` remains the authoritative **runtime** check. This file is the
> agent's fast local search reference.

**Source:** ZCat-AI Understandable · file `ugOZk4O0g6XpviEBSN24mF`  
**Generated / verified:** 2026-08-18  
**Contents:** 493 colour variables (`Mode`) · 41 value variables (`_Global_Values`) · 26 text styles

---

## ⚠️ READ THIS FIRST — only 70 of the 493 colour variables are consumer-bindable

Verified empirically from a consuming file on 2026-08-18: **most of these variables
cannot be imported by a consuming file at all.** `importVariableByKeyAsync` throws
`Variable with key "…" not found` for them, because the library publishes only a
subset for direct binding. The rest are internal — the components carry their own
bindings, so instancing a component gets them automatically.

| Namespace | Variables | Bind directly from a consuming file? |
|---|---|---|
| `ACCORDION` | 14 | ⛔ no — internal, reference only |
| `ATTENTION` | 25 | ⛔ no — internal, reference only |
| `AVATAR` | 5 | ⛔ no — internal, reference only |
| `BADGE` | 22 | ⛔ no — internal, reference only |
| `BODY` | 16 | **✅ YES** |
| `BRANDING ICON` | 2 | **✅ YES** |
| `BREADCRUMBS` | 5 | ⛔ no — internal, reference only |
| `BUTTONS` | 87 | ⛔ no — internal, reference only |
| `CARDS` | 22 | **✅ YES** |
| `CAROUSEL` | 3 | ⛔ no — internal, reference only |
| `CHECK, RADIO, TOGGLE` | 19 | ⛔ no — internal, reference only |
| `CHIPS` | 12 | ⛔ no — internal, reference only |
| `CODE BLOCK` | 3 | ⛔ no — internal, reference only |
| `DATE PICKER` | 12 | ⛔ no — internal, reference only |
| `FULL PAGE POPUP HEADER` | 4 | ⛔ no — internal, reference only |
| `GRAPH` | 5 | ⛔ no — internal, reference only |
| `INPUT FIELDS` | 26 | ⛔ no — internal, reference only |
| `LINK BOX` | 12 | ⛔ no — internal, reference only |
| `LOADER` | 7 | ⛔ no — internal, reference only |
| `MAIN HEADER` | 5 | ⛔ no — internal, reference only |
| `MENU LIST` | 14 | ⛔ no — internal, reference only |
| `OTHER SHADES` | 28 | **✅ YES** |
| `PAGINATION` | 6 | ⛔ no — internal, reference only |
| `POPUP` | 4 | ⛔ no — internal, reference only |
| `PROFILE NAV` | 19 | ⛔ no — internal, reference only |
| `SERVICE MENU` | 9 | ⛔ no — internal, reference only |
| `SHADOWS` | 2 | **✅ YES** |
| `SIDE MENU` | 10 | ⛔ no — internal, reference only |
| `STEPPER` | 17 | ⛔ no — internal, reference only |
| `SUB HEADERS` | 3 | ⛔ no — internal, reference only |
| `TABLE` | 18 | ⛔ no — internal, reference only |
| `TABS` | 28 | ⛔ no — internal, reference only |
| `TIMELINE` | 11 | ⛔ no — internal, reference only |
| `TOAST` | 8 | ⛔ no — internal, reference only |
| `TOOLTIP` | 4 | ⛔ no — internal, reference only |
| `TOUR` | 6 | ⛔ no — internal, reference only |

**Bindable: 70 variables across 5 namespaces** (`BODY`, `CARDS`, `SHADOWS`,
`BRANDING ICON`, `OTHER SHADES`). Tested all 70: **69 imported, 1 failed** —
`CARDS/Bg Default/Dark Bg` (`ebc952158732732071d9351f482e0de41462616e`) does **not**
resolve despite existing in the library. Treat it as unavailable.

**Not bindable: 423 variables across 31 namespaces.** Listed here so you can read the
design system's real intent and match a component's own colours — **never** as binding
targets. If you need one of these colours on an element you authored yourself, pick the
nearest bindable equivalent from `BODY` / `CARDS` / `OTHER SHADES`.

**`_Global_Values` (Spacing / Radius / Border) is NOT bindable either** — verified
failing. Use literal numbers from the spacing scale instead
(0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 128).

**Text styles ARE bindable** — sample-verified via `importStyleByKeyAsync`.

---

## How to use these

Library assets are **not local**. `figma.variables.getLocalVariablesAsync()` and
`figma.getLocalTextStylesAsync()` return **empty** in a consuming file, so name-based
lookup silently yields nothing and leaves raw hex and unstyled text behind.
**Always import by key and throw on failure.**

```javascript
const v = await figma.variables.importVariableByKeyAsync("78d226f67f70b301e15211138d50f31c6e0b73f1");
if (!v) throw new Error("ZCAT MISSING variable BODY/Text/Static/Primary");
node.fills = [figma.variables.setBoundVariableForPaint(
  { type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", v)];

const s = await figma.importStyleByKeyAsync("2c3007c5a4169e14a11ac9b2957b2f91b4f8c47b");
await figma.loadFontAsync(s.fontName);
await textNode.setTextStyleIdAsync(s.id);
```

Light / Dark columns are **resolved output values, reference only** — never hardcode
them. Bind the variable and both modes follow. 8 hex digits carry alpha (`FFFFFF33`).

### Naming reality

The taxonomy is **component-scoped** (`BUTTONS/…`, `TABLE/…`, `INPUT FIELDS/…`), not a
flat role tree. Any name of the form `color/bg/*`, `color/text/*`, `color/border/*`,
`color/icon/*`, `color/interactive/*` or `color/btn/*` is **fabricated** — it has never
existed in this library. Never invent a name; resolve unknowns with
`search_design_system` or `zcat_get_all_variables`.

---

## Collection map

| Collection | Modes | Variables | Bindable? |
|---|---|---|---|
| `Mode` | Light, Dark | 493 | Only the 5 namespaces marked ✅ above (70 vars) |
| `_Global_Values` | Mode 1 | 41 | ⛔ no — use literal spacing/radius numbers |
| `_Global_Colors` | Hex Code | 111 | ⛔ no — raw ramp behind `Mode` |
| `Typography` | Primary (Inter), Secondary (Zoho Puvi) | 55 | ⛔ no — use text styles |
| `Theme` | Default - Royal Blue, Purple | 10 | ⛔ no — brand switching |

Font family is **Inter** (Primary), **Zoho Puvi** (Secondary mode), **Roboto Mono** (code).

---

## ✅ Quick reference — bindable, most-used

| Variable | Key | Light | Dark |
|---|---|---|---|
| `BODY/Text/Static/Primary` | `78d226f67f70b301e15211138d50f31c6e0b73f1` | `#101F3E` | `#EEEEEE` |
| `BODY/Text/Static/Secondary` | `6ce27486a25197ca55bd13199d0b270ae669e507` | `#4D618A` | `#AAAAAA` |
| `BODY/Text/Static/Light` | `823f00fbf358a6bd4371563c1d522228b3e890c5` | `#7988A8` | `#888888` |
| `BODY/Text/Static/Disable` | `94023c2b1c06cb38be91c89825cf52bf5eff7cf7` | `#A6B1C9` | `#666666` |
| `BODY/Text/Static/White` | `3d35e063ee0e6e70c3adeb2868c22cb1a498b2fc` | `#FFFFFF` | `#FFFFFF` |
| `BODY/Text/Static/Theme` | `7aaffeef6da36b257256cd248fb525b260f12aeb` | `#2A65F0` | `#458BFF` |
| `BODY/Background/Static/Body Bg` | `154a19caf1070577dbc2981738c6f2ef4096e55b` | `#EFF2FA` | `#151516` |
| `BODY/Background/Static/Container Bg` | `e0751f2e26c51c0a95522f86f12d84d8d994e9dc` | `#FFFFFF` | `#1A1B1D` |
| `BODY/Border/Static/Border` | `0dd61c592dea6f8a4a7ed8d71ed3c3bb51308ea0` | `#EBEEF6` | `#2F3136` |
| `BODY/Icons/Static/Primary` | `9a6e973050f37a6629a57920cca8ef3bbc40c021` | `#101F3E` | `#EEEEEE` |
| `BODY/Icons/Static/Secondary` | `c9e929a15eb73c96ef31c2960fe99e26e930bcbd` | `#4D618A` | `#AAAAAA` |
| `CARDS/Bg Default/Primary` | `497de4a3445dd02172eeb981d292a9764f6aeaa8` | `#FFFFFF` | `#1A1B1D` |
| `CARDS/Bg Default/Body Bg` | `07b804765f3b327cc43681a59f5ca690685f4f63` | `#F7FAFF` | `#1F2022` |
| `CARDS/Bg Default/Secondary` | `5632c840e39db802e828b93eb0753b54c167c4fd` | `#FBFBFB` | `#1E1F21` |
| `CARDS/Borders/Default` | `3a79616196240745e0e84ced706f2563d6c609ac` | `#EBEEF6` | `#2F3136` |
| `CARDS/Borders/Hover` | `2dbb51fbe56bbfd41d33ff8c6352188257789cb9` | `#DDE4F6` | `#33373F` |
| `CARDS/Borders/Selected` | `2b6696588ce6abb97a8ea63543b7f7b7e65f99c9` | `#2A65F0` | `#458BFF` |
| `SHADOWS/Elevation/Default` | `eea9e7cd44a527cbcc91b4fb9fdefaa8d712a2c3` | `#EFF2FA` | `#292A2F` |
| `BRANDING ICON/Icon Color/Blue` | `f9b5ad26a7c1a38c9182a5a83cee7c3d1ca20399` | `#226DB4` | `#226DB4` |

---

## `Mode` collection — all 493 colour variables

Alphabetical within each namespace. Names verbatim from Figma.

### ACCORDION  (14) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `ACCORDION/Background/Active` | `5f75e36d20b3e5330a3d9e1f2d1890c6b9a906c2` | `#F4F7FE` | `#242527` |
| `ACCORDION/Background/Default` | `1c14470a0bf170064aab1a0c65555dfcb499fbb7` | `#FFFFFF` | `#1A1B1D` |
| `ACCORDION/Background/Disable` | `1cb9e3e440ceb0a15d0089cbb2b9b565518d0c83` | `#F7F8FB` | `#242424` |
| `ACCORDION/Background/Hover` | `44cf7f26f26460498889d137a6424d429574f930` | `#FBFBFB` | `#1E1F21` |
| `ACCORDION/Background/Hover 2` | `0ec4037281663195f8afbf2d818f4be8382b6ea1` | `#E7EEFE` | `#1A273D` |
| `ACCORDION/Background/Icon Bg` | `e0036858b9bea15be31ec319903c0f91114b9a55` | `#EBEEF6` | `#2F3136` |
| `ACCORDION/Background/Open Bg` | `74014b638918ae59e2af80eb6d35f61a8403bf34` | `#FFFFFF` | `#1A1B1D` |
| `ACCORDION/Border/Default` | `1b6e8707231d6d0afcd6d0f2884a646e17d36c52` | `#EBEEF6` | `#2F3136` |
| `ACCORDION/Border/Disable` | `d84cbfcc56daf3e8f47a5041ba2444610d9e1446` | `#EFF2FA` | `#292A2F` |
| `ACCORDION/Text & Icon/Default` | `dd540e0e60ec2550a110986390b530a0504a0494` | `#101F3E` | `#EEEEEE` |
| `ACCORDION/Text & Icon/Disable` | `ebfa76eee0c195f61e143ca9178941bd26d3b138` | `#A6B1C9` | `#666666` |
| `ACCORDION/Text & Icon/Secondary` | `8a3c4b0910ae796650c910847b62c8dd61d91c3c` | `#4D618A` | `#AAAAAA` |
| `ACCORDION/Text & Icon/Secondary Dropdown` | `d69527e0ba3c163b65e9f41ab8c605e63ae4c60c` | `#2A65F0` | `#458BFF` |
| `ACCORDION/Text & Icon/Secondary Dropdown Hover` | `e65c8a5202169692a9be0a31d4397cbee9e5a932` | `#0755F2` | `#5A97FB` |

### ATTENTION  (25) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `ATTENTION/Danger/Background` | `5c68cc0d0dcc2b932951db7da6a916bebe13ead0` | `#FFEFEF` | `#2C2123` |
| `ATTENTION/Danger/Border` | `0ca0de1a8204bba3666755054c83330f9a365cf0` | `#EE7979` | `#682B2D` |
| `ATTENTION/Danger/Icon` | `2ff1cad75f4126dedc3d820083155253d59edb96` | `#101F3E` | `#EEEEEE` |
| `ATTENTION/Danger/Text Primary` | `31f1de3d20dc55e117c6fd37408d177873b940f5` | `#101F3E` | `#EEEEEE` |
| `ATTENTION/Danger/Text Secondary` | `3a2ff23f00f4fba40c8bdbeb3a46157a76e9a667` | `#4D618A` | `#AAAAAA` |
| `ATTENTION/Default/Background` | `5bfe6c09525f29ec49760c441f5c8fac6668eb0d` | `#F4F7FE` | `#242527` |
| `ATTENTION/Default/Border` | `9d6fe9c8b4f8765ece639ba3243628def8c88681` | `#EBEEF6` | `#2F3136` |
| `ATTENTION/Default/Icon` | `bec238d1edd309a8994f04117a45ab11bac019d7` | `#101F3E` | `#EEEEEE` |
| `ATTENTION/Default/Text Primary` | `1a046c99e9a931f9e8b6f53f26c7ba884bced660` | `#101F3E` | `#EEEEEE` |
| `ATTENTION/Default/Text Secondary` | `c35c312ec5cecb091464617526eb27fd0ac0ae51` | `#4D618A` | `#AAAAAA` |
| `ATTENTION/Info/Background` | `0c44cd201af9cdf93fa21e2efa48d90ebb1a6805` | `#E8F5FF` | `#1B2730` |
| `ATTENTION/Info/Border` | `382118ba845f4f6ef4d8269d115c0e2d710aec2b` | `#A6CBEA` | `#2B4254` |
| `ATTENTION/Info/Icon` | `74bc49cff3be66cebf8a0041e4df0af375722886` | `#101F3E` | `#EEEEEE` |
| `ATTENTION/Info/Text Primary` | `5e9856c74d382258f1df064a880db98f2644d78f` | `#101F3E` | `#EEEEEE` |
| `ATTENTION/Info/Text Secondary` | `23e05c30b99901fbf676df5ffc0b7037d8a47255` | `#4D618A` | `#AAAAAA` |
| `ATTENTION/Success/Background` | `c4e54e3080b26b8997f2bc3b3df9043ed6464ff2` | `#EAF7EF` | `#1C2622` |
| `ATTENTION/Success/Border` | `e252d8677f9bd9d3cdb2ddb125763722518dbee5` | `#7FD1A0` | `#2F4326` |
| `ATTENTION/Success/Icon` | `371159fafae6b4960702bfec9e8618da5e0d330e` | `#101F3E` | `#EEEEEE` |
| `ATTENTION/Success/Text Primary` | `1610e11dfeb75d14733866b1bcc831edcc5744cf` | `#101F3E` | `#EEEEEE` |
| `ATTENTION/Success/Text Secondary` | `06d45c7f3c43e994072dc5871da41f4cb6d1d596` | `#4D618A` | `#AAAAAA` |
| `ATTENTION/Warning/Background` | `fc44f8453c82050ce5c96a78781a2ad1e19ae13d` | `#FFF3D7` | `#27231C` |
| `ATTENTION/Warning/Border` | `d3c02e48a887bb845fd1153f8064d9c353cbbff2` | `#DAB45F` | `#493F07` |
| `ATTENTION/Warning/Icon` | `89bef7384c228c2b1b92b4b2bc0b5477c49a7222` | `#101F3E` | `#EEEEEE` |
| `ATTENTION/Warning/Text Primary` | `a2f35ea360195586041d30a63edab71d0959e182` | `#101F3E` | `#EEEEEE` |
| `ATTENTION/Warning/Text Secondary` | `7a83ddaf71f92e66476ad6eb4454127dce2e15f0` | `#4D618A` | `#AAAAAA` |

### AVATAR  (5) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `AVATAR/Bg colors/Default` | `3f9e91c63f4c9b1c7d9be4aae417af9dd16a9518` | `#F4F7FE` | `#242527` |
| `AVATAR/Bg colors/Default 2` | `ed6d97088b071c1f83d685a780d15eaa0590ea24` | `#EBEEF6` | `#2F3136` |
| `AVATAR/Borders/Default` | `96cd524343e93103c037864b41f994df1d5e9053` | `#EBEEF6` | `#2F3136` |
| `AVATAR/Borders/White` | `ef2d0db400a40a528adbaf3cbcf13483ff577fdc` | `#FFFFFF` | `#1A1B1D` |
| `AVATAR/Icon/Avatar` | `2197c2278fe8c14f206f3fc31e667a6c47677661` | `#4D618A` | `#AAAAAA` |

### BADGE  (22) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `BADGE/Background/Disable` | `87d330646969359c7c3b46241b2066589831c21a` | `#F7F8FB` | `#242424` |
| `BADGE/Background/Green` | `d7f258da0fc07a90a0db12e9cb3daf6a0d26caca` | `#29B260` | `#3E9F64` |
| `BADGE/Background/Grey` | `4a47c409b8c769f12b0dd12370c72fd795b3dbb4` | `#F4F7FE` | `#242527` |
| `BADGE/Background/Orange` | `504a558ddf4f2169cfd3c248a78f3085d58a1f88` | `#C98E06` | `#AE821C` |
| `BADGE/Background/Pink` | `37ddfd5b3055f4d77d37ae528d051fe7efb5d061` | `#E417B1` | `#DA57B9` |
| `BADGE/Background/Primary` | `e85bd2ed16cf08371436c6c97eb88d2d97720398` | `#2A65F0` | `#458BFF` |
| `BADGE/Background/Red` | `49dbf841279137df05124ea89eedd4616c7573b6` | `#E22020` | `#DE5E60` |
| `BADGE/Background/Sec- Green` | `ed3ed25bf87736ab4d49feba1c717d622b6e0953` | `#EAF7EF` | `#1C2622` |
| `BADGE/Background/Sec- Orange` | `6d325028c385689a61c3d14f1b6b8391351a49cf` | `#FFF3D7` | `#27231C` |
| `BADGE/Background/Sec- Pink` | `2265323214d5d8ffb8389926a55c534b55864b82` | `#FFEFFB` | `#2D202A` |
| `BADGE/Background/Sec- Primary` | `6a81d3503aa433e9615284e44a564ccbf4e10696` | `#E7EEFE` | `#1A273D` |
| `BADGE/Background/Sec- Red` | `32d89d902de9e673cd59e875a6af512f82e99ae8` | `#FFEFEF` | `#2C2123` |
| `BADGE/Border - Removed in UI/Disabled` | `2c59916bd19358415a58e704bc8dece87e5a1b2c` | `#EFF2FA` | `#292A2F` |
| `BADGE/Border - Removed in UI/White` | `5d606d3ee6b436cecf29e367d41bb3355573f210` | `#FFFFFF` | `#1A1B1D` |
| `BADGE/Text/Disable` | `aaf8cbb809f2c1f420f20fa938dbd65de55eceea` | `#A6B1C9` | `#666666` |
| `BADGE/Text/Grey` | `e0930f651571d2cf1e958958a8f42e7ec483643c` | `#101F3E` | `#EEEEEE` |
| `BADGE/Text/Primary 1` | `c175a15d06c70b8d4f1bd62967d32ae5258361de` | `#FFFFFF` | `#FFFFFF` |
| `BADGE/Text/Sec- Green` | `2a7dbbb0726fc6c4d38f2a41246e63c9f2a16961` | `#29B260` | `#3E9F64` |
| `BADGE/Text/Sec- Orange` | `311e43ba40eca1e4416be52bb753988df7cf616e` | `#C98E06` | `#AE821C` |
| `BADGE/Text/Sec- Pink` | `6b3afc1eb0cd5a49adf483ae9ace5a44725eb782` | `#E417B1` | `#DA57B9` |
| `BADGE/Text/Sec- Primary` | `4f8f865eb9c0fb5226d4ec2a21989be008b06fab` | `#2A65F0` | `#458BFF` |
| `BADGE/Text/Sec- Red` | `8843b3cb4c614c24f1ff70bcb176e4ad65ecdc36` | `#E22020` | `#DE5E60` |

### BODY  (16) — ✅ BINDABLE

| Variable | Key | Light | Dark |
|---|---|---|---|
| `BODY/Background/Static/Body Bg` | `154a19caf1070577dbc2981738c6f2ef4096e55b` | `#EFF2FA` | `#151516` |
| `BODY/Background/Static/Container Bg` | `e0751f2e26c51c0a95522f86f12d84d8d994e9dc` | `#FFFFFF` | `#1A1B1D` |
| `BODY/Border/Static/Border` | `0dd61c592dea6f8a4a7ed8d71ed3c3bb51308ea0` | `#EBEEF6` | `#2F3136` |
| `BODY/Border/Static/OuterDivider` | `204ae859a5329207bc2a1a0a1d08bdf3de497b6a` | `#DDE4F6` | `#33373F` |
| `BODY/Icons/Static/Disable` | `323d4c6f19afb28587e6cfbf4f7cf8ada6b05351` | `#A6B1C9` | `#666666` |
| `BODY/Icons/Static/Light` | `b18154ab7c49655ab2bfc0962c6bba3228a14cc8` | `#7988A8` | `#888888` |
| `BODY/Icons/Static/Primary` | `9a6e973050f37a6629a57920cca8ef3bbc40c021` | `#101F3E` | `#EEEEEE` |
| `BODY/Icons/Static/Secondary` | `c9e929a15eb73c96ef31c2960fe99e26e930bcbd` | `#4D618A` | `#AAAAAA` |
| `BODY/Icons/Static/Theme` | `c945665161e9e2922f0e9dda177b8c9f0f66453f` | `#2A65F0` | `#458BFF` |
| `BODY/Icons/Static/White & Black` | `bb2876871992142a4bc63e96ca2ee69978ddd1cf` | `#FFFFFF` | `#1A1B1D` |
| `BODY/Text/Static/Disable` | `94023c2b1c06cb38be91c89825cf52bf5eff7cf7` | `#A6B1C9` | `#666666` |
| `BODY/Text/Static/Light` | `823f00fbf358a6bd4371563c1d522228b3e890c5` | `#7988A8` | `#888888` |
| `BODY/Text/Static/Primary` | `78d226f67f70b301e15211138d50f31c6e0b73f1` | `#101F3E` | `#EEEEEE` |
| `BODY/Text/Static/Secondary` | `6ce27486a25197ca55bd13199d0b270ae669e507` | `#4D618A` | `#AAAAAA` |
| `BODY/Text/Static/Theme` | `7aaffeef6da36b257256cd248fb525b260f12aeb` | `#2A65F0` | `#458BFF` |
| `BODY/Text/Static/White` | `3d35e063ee0e6e70c3adeb2868c22cb1a498b2fc` | `#FFFFFF` | `#FFFFFF` |

### BRANDING ICON  (2) — ✅ BINDABLE

| Variable | Key | Light | Dark |
|---|---|---|---|
| `BRANDING ICON/Icon Color/Blue` | `f9b5ad26a7c1a38c9182a5a83cee7c3d1ca20399` | `#226DB4` | `#226DB4` |
| `BRANDING ICON/Icon Color/Red` | `cc601775e120b62acec90f4736825c2aef0e053c` | `#E42527` | `#E42527` |

### BREADCRUMBS  (5) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `BREADCRUMBS/Background/Hover` | `a410f0ae01a86200e1e1111839d56d887d750588` | `#E7EEFE` | `#1A273D` |
| `BREADCRUMBS/Text & Icon/Active` | `5cd3a993750e5b4e6ad8cb3aeba97fd13235967f` | `#101F3E` | `#EEEEEE` |
| `BREADCRUMBS/Text & Icon/Default` | `f7562de57ca37a1374e74c58ba1acf824a8d2e69` | `#4D618A` | `#AAAAAA` |
| `BREADCRUMBS/Text & Icon/Disable` | `67b6696e75ad0687f33c7fbe27300fc7cae073c4` | `#A6B1C9` | `#666666` |
| `BREADCRUMBS/Text & Icon/Hover` | `d4f0821580ed30be836622263e7a9427840bb20d` | `#2A65F0` | `#458BFF` |

### BUTTONS  (87) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `BUTTONS/Fill/Background/Danger` | `e9682b535fbfb6c639dd014936247980b22fbfbe` | `#E22020` | `#DE5E60` |
| `BUTTONS/Fill/Background/DangerClick` | `8d8c7ff1fcb95582f45bc8a09b63fabb377ac3e9` | `#E22020` | `#DE5E60` |
| `BUTTONS/Fill/Background/DangerDisable` | `65c174ef334879d7de040b44c6030bac1ce132ef` | `#EE7979` | `#682B2D` |
| `BUTTONS/Fill/Background/DangerHover` | `337ef3cb504974c6b1b46b97d88dbea74a6d30b2` | `#B51A1A` | `#E86E6B` |
| `BUTTONS/Fill/Background/Primary` | `4f201d9f046e4bcf2b751797d568be29f5511a7f` | `#2A65F0` | `#458BFF` |
| `BUTTONS/Fill/Background/PrimaryClick` | `61572db2fe1ad8d4cb1ae92541c24fba83a9c1d3` | `#2A65F0` | `#458BFF` |
| `BUTTONS/Fill/Background/PrimaryDisable` | `c969f65a197efcfb7dfdfe3237e2693553eca2fc` | `#7DA2FB` | `#355A8D` |
| `BUTTONS/Fill/Background/PrimaryHover` | `fec5b1bcbf4b53259f867d266c6d1f817066d64f` | `#0755F2` | `#5A97FB` |
| `BUTTONS/Fill/Background/Success` | `2a09b97be259f0da3fcff56c3276aa79384fd886` | `#29B260` | `#3E9F64` |
| `BUTTONS/Fill/Background/SuccessClick` | `cb801f3402ef652e6a249cd5eec13a49727ce57a` | `#29B260` | `#3E9F64` |
| `BUTTONS/Fill/Background/SuccessDisable` | `5d361e2c0d71e08ed34fe18dfdb0b2f509a77f34` | `#7FD1A0` | `#2F4326` |
| `BUTTONS/Fill/Background/SuccessHover` | `dee580287cb8a774928088b0ae83e31ca6b413ad` | `#218E4D` | `#3AA564` |
| `BUTTONS/Fill/Split/Split_Line` | `016ba14f040bc45509eec2add120e6dfc520784b` | `#FFFFFF33` | `#FFFFFF33` |
| `BUTTONS/Fill/Text & Icon/Click` | `893d961e2bda58a3d3a7a2b3b17d0da4f4fd1b3a` | `#FFFFFF` | `#FFFFFF` |
| `BUTTONS/Fill/Text & Icon/Default` | `535ad2cdb3090581a7e86d0eb10c1f90878fdfa4` | `#FFFFFF` | `#FFFFFF` |
| `BUTTONS/Fill/Text & Icon/Disable` | `341d82b03d000530e7207778a63e86703407e308` | `#E7EEFE` | `#FFFFFF33` |
| `BUTTONS/Fill/Text & Icon/Hover` | `e000f4148a4232fb9699257e15e86cb89212f157` | `#FFFFFF` | `#FFFFFF` |
| `BUTTONS/Ghost/Backgrounds/Danger` | `1399dc0c95aca6765ae7aebe7f5a76cafaa7c05d` | `#FFEFEF` | `#2C2123` |
| `BUTTONS/Ghost/Backgrounds/Primary` | `a66d42f0d60d481384dc59793d2eb2cbffb821c0` | `#E7EEFE` | `#1A273D` |
| `BUTTONS/Ghost/Backgrounds/Success` | `b4a3b4f5ca6945e962da17ebf9aecd31b278e17d` | `#EAF7EF` | `#1C2622` |
| `BUTTONS/Ghost/Text & Icons/DangerClick` | `69b2e0ecc45ab02b3a5abd1904d73194a8a433ba` | `#E22020` | `#DE5E60` |
| `BUTTONS/Ghost/Text & Icons/DangerDefault` | `b80393defe2c5a77c1e0cde1b516182db77511a1` | `#E22020` | `#DE5E60` |
| `BUTTONS/Ghost/Text & Icons/DangerDisable` | `ce3b925d8a8e76bd4df55017a0d9ffd506ab5ceb` | `#EE7979` | `#682B2D` |
| `BUTTONS/Ghost/Text & Icons/DangerHover` | `e295990466b21704eed1cd058ea0470865b906ea` | `#B51A1A` | `#E86E6B` |
| `BUTTONS/Ghost/Text & Icons/PrimaryClick` | `888fb5da191dbe6b9685ec702db6a1b27eeca4e5` | `#2A65F0` | `#458BFF` |
| `BUTTONS/Ghost/Text & Icons/PrimaryDefault` | `9554bf1d8ab3daf3be9c1a7434e4b7035bd977d7` | `#2A65F0` | `#458BFF` |
| `BUTTONS/Ghost/Text & Icons/PrimaryDisable` | `d16941511ac97071b3108daf8a34c8ce051a3b95` | `#7DA2FB` | `#355A8D` |
| `BUTTONS/Ghost/Text & Icons/PrimaryHover` | `96e2ab79b98f82f8121b7ac4d8e87384f7d87d90` | `#0755F2` | `#5A97FB` |
| `BUTTONS/Ghost/Text & Icons/SuccessClick` | `7d30b711d89e5de9cd957a6489dda10ff6304f61` | `#29B260` | `#3E9F64` |
| `BUTTONS/Ghost/Text & Icons/SuccessDefault` | `5437620823f0a50f003069907adfe2ab61633b43` | `#29B260` | `#3E9F64` |
| `BUTTONS/Ghost/Text & Icons/SuccessDisable` | `4bf26cab36245a62fcea1cfe4a132162073d7fb0` | `#7FD1A0` | `#2F4326` |
| `BUTTONS/Ghost/Text & Icons/SuccessHover` | `4f76775f388abe626677f230781f545641f64b17` | `#218E4D` | `#3AA564` |
| `BUTTONS/Gradient/Bg/Gradient bottom` | `56494f917c3e892e44d6a4e1f3b4e8d9470171b0` | `#6478E6` | `#08293E` |
| `BUTTONS/Gradient/Bg/Gradient bottom Click` | `868f066a080df50b65d92ee27109aca90d99a298` | `#6478E6` | `#08293E` |
| `BUTTONS/Gradient/Bg/Gradient bottom Disable` | `e3c4e85adc07c64d9a5c9ae4e36d77dbccc2bb1b` | `#96A0DC` | `#29333A` |
| `BUTTONS/Gradient/Bg/Gradient bottom hover` | `11a6dd10e346b560d19e974a932a2bba59b96b36` | `#5064DC` | `#2B4B5E` |
| `BUTTONS/Gradient/Bg/Gradient top` | `3ffade27053c162883d26905d8f61cc8862633d7` | `#EC64A0` | `#46224A` |
| `BUTTONS/Gradient/Bg/Gradient top Click` | `62d23ab02b1e7b8bb91218e34489c38699900fe3` | `#EC64A0` | `#46224A` |
| `BUTTONS/Gradient/Bg/Gradient top Disable` | `3b46c6a1954b3e4c90177d2dd49505c44ed633d1` | `#EC96BE` | `#493546` |
| `BUTTONS/Gradient/Bg/Gradient top hover` | `8c70d08c7f229119310e1a1e6d74fed79cc98e29` | `#E15091` | `#520D49` |
| `BUTTONS/Gradient/Text & Icon/Click` | `31cdf480609f2fa8e138783ccba1606ffd76840e` | `#FFFFFF` | `#FFFFFF` |
| `BUTTONS/Gradient/Text & Icon/Default` | `54489bd1cadd728cc17428dcc337c481c0f8f168` | `#FFFFFF` | `#FFFFFF` |
| `BUTTONS/Gradient/Text & Icon/Disable` | `aa9e7f1207fbfe27858a5a5f170c4fbcb80d4e45` | `#E7EEFE` | `#FFFFFF33` |
| `BUTTONS/Gradient/Text & Icon/Hover` | `54f02d10389395f91c458e9e1954f2112acf077d` | `#FFFFFF` | `#FFFFFF` |
| `BUTTONS/Grey/Backgrounds/Click` | `c366051030e5e04a83c4f3d1f6a52f99d421b6ca` | `#EBEEF6` | `#2F3136` |
| `BUTTONS/Grey/Backgrounds/Default` | `535c6fd378513b4c8abacdf01cbe9c342dd850f6` | `#EBEEF6` | `#2F3136` |
| `BUTTONS/Grey/Backgrounds/Disable` | `16e0b9cfe335dde46b580e22029fcc1f940765f6` | `#F7F8FB` | `#242424` |
| `BUTTONS/Grey/Backgrounds/Hover` | `5feb75831dbce16e2db4c21f73c2a33f2602d7e8` | `#E7EEFE` | `#292A2F` |
| `BUTTONS/Grey/Borders/Click` | `ad48d58b284f7d51199d9da08cfde9eb6bfa6a25` | `#D6DDEF` | `#484D58` |
| `BUTTONS/Grey/Borders/Default` | `b8c7479d2cbcbc00ca7ebe3b6e8af6f6e92bb43d` | `#D6DDEF` | `#484D58` |
| `BUTTONS/Grey/Borders/Disabled` | `3d273caa9fa4df09779c5fccf6ac2cf32b56052e` | `#EFF2FA` | `#292A2F` |
| `BUTTONS/Grey/Borders/Hover` | `28e3ec3f4eb55d65294a05add3cfc2084918e3b6` | `#D6DDEF` | `#484D58` |
| `BUTTONS/Grey/Text & Icons/Click` | `507e19c8ca164dd7cd1ceb214be38bac12ea4076` | `#101F3E` | `#EEEEEE` |
| `BUTTONS/Grey/Text & Icons/Default` | `27ebf339bb1103aa7a80d7d0cdf8234e54c14e22` | `#101F3E` | `#EEEEEE` |
| `BUTTONS/Grey/Text & Icons/Disable` | `3f1623302f4819520b71dfaf4932cabc984ab89e` | `#A6B1C9` | `#666666` |
| `BUTTONS/Grey/Text & Icons/Hover` | `ea00ff3b95e616b2dc8ead012b72913d679ac7de` | `#101F3E` | `#EEEEEE` |
| `BUTTONS/Link/Text & Icon/Click` | `bdddd657ad6a3aad98cd334562407b29bfbb9510` | `#2A65F0` | `#458BFF` |
| `BUTTONS/Link/Text & Icon/Default` | `2258d5f9b10fef9a3f3b1fc5c86c39fa5f5190f6` | `#2A65F0` | `#458BFF` |
| `BUTTONS/Link/Text & Icon/Disable` | `9dba86ab1b862bd9b7259e411cbffc87df22efd6` | `#7DA2FB` | `#355A8D` |
| `BUTTONS/Link/Text & Icon/Hover` | `6421c53fca3b3cfa40937e79e6d3612885c599eb` | `#0755F2` | `#5A97FB` |
| `BUTTONS/Outline/Bg/DangerHover` | `c3efa4c3db4eb9b395dee571cc8b9a279eaad82d` | `#FFEFEF` | `#2C2123` |
| `BUTTONS/Outline/Bg/PrimaryHover` | `d1e2f903eff7638a14e3e5a22ee275cba70f4870` | `#E7EEFE` | `#1A273D` |
| `BUTTONS/Outline/Bg/SuccessHover` | `4e806cd58b5548514ad32013c46b7668d0f8bb15` | `#EAF7EF` | `#1C2622` |
| `BUTTONS/Outline/Borders/Danger` | `4668bbeea40c2dfc48ae0823c11438c1c12b81d2` | `#E22020` | `#DE5E60` |
| `BUTTONS/Outline/Borders/DangerClick` | `423d52f309d88f3f01e08a0e3cb2730702f157d3` | `#E22020` | `#DE5E60` |
| `BUTTONS/Outline/Borders/DangerDisable` | `85772be62a5caa82117cfd4d0237555280edec93` | `#EE7979` | `#682B2D` |
| `BUTTONS/Outline/Borders/DangerHover` | `06fb012f6e4a56c03ee9696f6b75798946ee89d7` | `#B51A1A` | `#E86E6B` |
| `BUTTONS/Outline/Borders/Primary` | `91358b2863b6c046ce2d96fef9954f49cc1940a5` | `#2A65F0` | `#458BFF` |
| `BUTTONS/Outline/Borders/PrimaryClick` | `c75d41761591ab0e3657c2ba8d10b86caabb0a13` | `#2A65F0` | `#458BFF` |
| `BUTTONS/Outline/Borders/PrimaryDisable` | `c59cbbaf076c34b401107ba48c9717c93cef1769` | `#7DA2FB` | `#355A8D` |
| `BUTTONS/Outline/Borders/PrimaryHover` | `581cb25edfb06c983edbf0c6980386c8f3926511` | `#0755F2` | `#5A97FB` |
| `BUTTONS/Outline/Borders/Success` | `e8c6539f4d586832e74b8873b24093c490dc474d` | `#29B260` | `#3E9F64` |
| `BUTTONS/Outline/Borders/SuccessClick` | `370fd75f819dfe1ff2bf744808e876b8458f5fc5` | `#29B260` | `#3E9F64` |
| `BUTTONS/Outline/Borders/SuccessDisable` | `82af443dae1b93657ac1d37b9f134e0b148b52e8` | `#7FD1A0` | `#2F4326` |
| `BUTTONS/Outline/Borders/SuccessHover` | `664646afa464ebb83ab042ebf96878ec94a571c5` | `#218E4D` | `#3AA564` |
| `BUTTONS/Outline/Text & Icons/Danger` | `5ec75bc852708185a7c6b34bc16fc2ceae878e75` | `#E22020` | `#DE5E60` |
| `BUTTONS/Outline/Text & Icons/DangerClick` | `24b8ae1baf3ee216d57e8e076b63dfa4fd53f184` | `#E22020` | `#DE5E60` |
| `BUTTONS/Outline/Text & Icons/DangerDisable` | `2e574d95807da7ab23b35b872dc775f95e861263` | `#EE7979` | `#682B2D` |
| `BUTTONS/Outline/Text & Icons/DangerHover` | `3a8ea9ed8fe954593fda569ab58c620c9b757b37` | `#B51A1A` | `#E86E6B` |
| `BUTTONS/Outline/Text & Icons/Primary` | `45670135a5eee4af89b76a8d1d8fde8f84af0302` | `#2A65F0` | `#458BFF` |
| `BUTTONS/Outline/Text & Icons/PrimaryClick` | `59930090459dba1cfd045d485dcb8701939faa64` | `#2A65F0` | `#458BFF` |
| `BUTTONS/Outline/Text & Icons/PrimaryDisable` | `20c7da4fed4969d648c962d5201fed3500ba6fee` | `#7DA2FB` | `#355A8D` |
| `BUTTONS/Outline/Text & Icons/PrimaryHover` | `7cac6218e262adb5019d7e3ac82d05f46327b20e` | `#0755F2` | `#5A97FB` |
| `BUTTONS/Outline/Text & Icons/Success` | `b7097a1ec8757b2796ae2c4e9ce7e5779357c6f2` | `#29B260` | `#3E9F64` |
| `BUTTONS/Outline/Text & Icons/SuccessClick` | `5dc9ec8626570215726f6556dec4c5a1fe1565d4` | `#29B260` | `#3E9F64` |
| `BUTTONS/Outline/Text & Icons/SuccessDisable` | `5525677db447b02eaca51fc020ad3a5ad78ce145` | `#7FD1A0` | `#2F4326` |
| `BUTTONS/Outline/Text & Icons/SuccessHover` | `9c91bd087b1b3fd409d94cec9b5188c7b2f39428` | `#218E4D` | `#3AA564` |

### CARDS  (22) — ✅ BINDABLE

| Variable | Key | Light | Dark |
|---|---|---|---|
| `CARDS/Bg Default/Body Bg` | `07b804765f3b327cc43681a59f5ca690685f4f63` | `#F7FAFF` | `#1F2022` |
| `CARDS/Bg Default/Dark Bg` | `ebc952158732732071d9351f482e0de41462616e` | `#0F2A64` | `#1F2022` **← does NOT resolve** |
| `CARDS/Bg Default/Primary` | `497de4a3445dd02172eeb981d292a9764f6aeaa8` | `#FFFFFF` | `#1A1B1D` |
| `CARDS/Bg Default/Quaternary` | `771f3916fe19479732b8dc8dade394365b0486e9` | `#EFF2FA` | `#292A2F` |
| `CARDS/Bg Default/Secondary` | `5632c840e39db802e828b93eb0753b54c167c4fd` | `#FBFBFB` | `#1E1F21` |
| `CARDS/Bg Default/Tertiary` | `560d73eb5583097eb038f1ee37e6febf72fcde95` | `#F4F7FE` | `#242527` |
| `CARDS/Bg Disabled/Disable` | `d4bcf902e2c6bf8aa67fc5aa4cb1eefcc3726a80` | `#F7F8FB` | `#242424` |
| `CARDS/Bg Hovers/Body Bg - Hover` | `b0bbbf7ab589a8915af64a384282a0013301881e` | `#F4F7FE` | `#242527` |
| `CARDS/Bg Hovers/Primary - Hover` | `0387234e88ac3df496fd91a9c197a0d427a32af5` | `#FBFBFB` | `#1E1F21` |
| `CARDS/Bg Hovers/Quaternary - Hover` | `c006ef064fe7653a32d04d8d806ba090a8433d27` | `#F4F7FE` | `#242527` |
| `CARDS/Bg Hovers/Secondary - Hover` | `14511567f36b15bef303a019ff1de1f183501001` | `#F4F7FE` | `#242527` |
| `CARDS/Bg Hovers/Tertiary - Hover` | `00c8e9ab14ac34b72dfaf7b238af79b9a89d2720` | `#F7FAFF` | `#1F2022` |
| `CARDS/Bg Selected/Body Bg - Selected` | `8866616e2ef7fd39c01cc94c2a41ecc5bcb25863` | `#E7EEFE` | `#1A273D` |
| `CARDS/Bg Selected/Primary - Selected` | `c215e82a90f0be56174bf64ab8456bbf8b38ed62` | `#E7EEFE` | `#1A273D` |
| `CARDS/Bg Selected/Quaternary - Selected` | `14ce64881067ee5f6b9f9b9848ae146b485f4c56` | `#E7EEFE` | `#1A273D` |
| `CARDS/Bg Selected/Secondary - Selected` | `11c51ddbe51485443a19b6e522412578bda0c009` | `#E7EEFE` | `#1A273D` |
| `CARDS/Bg Selected/Tertiary - Selected` | `7f33dcddc6e9573896f0f982780fc3782cb381b3` | `#E7EEFE` | `#1A273D` |
| `CARDS/Borders/Default` | `3a79616196240745e0e84ced706f2563d6c609ac` | `#EBEEF6` | `#2F3136` |
| `CARDS/Borders/Disable` | `ec907a2ada13b48848508eb280a1b5fdddd612b0` | `#EFF2FA` | `#292A2F` |
| `CARDS/Borders/Hover` | `2dbb51fbe56bbfd41d33ff8c6352188257789cb9` | `#DDE4F6` | `#33373F` |
| `CARDS/Borders/Selected` | `2b6696588ce6abb97a8ea63543b7f7b7e65f99c9` | `#2A65F0` | `#458BFF` |
| `CARDS/Borders/White` | `dd45fee89babc6959602b6439d616fa1a44b7289` | `#FFFFFF` | `#1A1B1D` |

### CAROUSEL  (3) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `CAROUSEL/Background/Active` | `d44f3de07c64f0dd72229edff5d77955b12fa1d7` | `#101F3E` | `#EEEEEE` |
| `CAROUSEL/Background/Default` | `c000c24d1e9e019c47c2582690ca0bf0470b2391` | `#A6B1C9` | `#666666` |
| `CAROUSEL/Background/Hover` | `d7f6b21e462e9effba6bee41818380da3a5e4411` | `#4D618A` | `#AAAAAA` |

### CHECK, RADIO, TOGGLE  (19) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `CHECK, RADIO, TOGGLE/Backgrounds/Click` | `c37856b269d8ec5df5cb4b1c000026fcbd3f66ca` | `#2A65F0` | `#458BFF` |
| `CHECK, RADIO, TOGGLE/Backgrounds/Click Disable` | `d9aae0a2840f74a74be625a7e943bacc1990521f` | `#7DA2FB` | `#355A8D` |
| `CHECK, RADIO, TOGGLE/Backgrounds/Click Hover` | `90b3bbb3613288a4a45dc65dff4a186aba6ee240` | `#0755F2` | `#5A97FB` |
| `CHECK, RADIO, TOGGLE/Backgrounds/Default` | `a7625acf381e4df3003d80057293119bc88f6a13` | `#FFFFFF` | `#1A1B1D` |
| `CHECK, RADIO, TOGGLE/Backgrounds/Disable` | `4baee9b218c525f5d407947a84de21dff3838a1d` | `#F7F8FB` | `#242424` |
| `CHECK, RADIO, TOGGLE/Backgrounds/Hover` | `588944b219a8944220041cab40959e8f5b569219` | `#E7EEFE` | `#292A2F` |
| `CHECK, RADIO, TOGGLE/Borders/Default` | `e61cc9dbf0a92390dd0f8dc7bf73200061ac335f` | `#D6DDEF` | `#484D58` |
| `CHECK, RADIO, TOGGLE/Borders/Disabled` | `0ad5e08b3c161733500c2f98ff6f7f50603302c6` | `#EFF2FA` | `#292A2F` |
| `CHECK, RADIO, TOGGLE/Borders/Hover` | `5f69e5f1a61495fcb41821cfb65179bef5092cbe` | `#7DA2FB` | `#355A8D` |
| `CHECK, RADIO, TOGGLE/Borders/Outer Border radio` | `7b7a77f95b90ff10a53e1eefe67d3d7dc75aa9de` | `#EBEEF6` | `#2F3136` |
| `CHECK, RADIO, TOGGLE/Inner For Check/Disable` | `87c85c1ee7ac6b1771da98540cae6eaebd6b8379` | `#E7EEFE` | `#FFFFFF33` |
| `CHECK, RADIO, TOGGLE/Inner For Check/White` | `1207fa363ba4dc44a76c19afd3e53cdee29dccbf` | `#FFFFFF` | `#EEEEEE` |
| `CHECK, RADIO, TOGGLE/Inner For Radio/Disable` | `1f03cb079d4584cb283f602bf736235832fcba89` | `#E7EEFE` | `#FFFFFF33` |
| `CHECK, RADIO, TOGGLE/Inner For Radio/White` | `e74dfc39fb9e927fd44ace5e0097632b5dd701fa` | `#FFFFFF` | `#EEEEEE` |
| `CHECK, RADIO, TOGGLE/Inner For Toggle/Active` | `607a9c22cf7ecce0bf0f1e5efe56b8b735ee6d28` | `#FFFFFF` | `#EEEEEE` |
| `CHECK, RADIO, TOGGLE/Inner For Toggle/Active Disable` | `cb4c621ebd41c6994a1f96735d45f88e9a8b62bd` | `#E7EEFE` | `#FFFFFF33` |
| `CHECK, RADIO, TOGGLE/Inner For Toggle/Default` | `5dcc8fafca41d54a729c1a0649a1c6ba1a2fb4d7` | `#D6DDEF` | `#484D58` |
| `CHECK, RADIO, TOGGLE/Inner For Toggle/Disabled` | `d5e2f82ce85e42123ea1299c56dc0160aefc4507` | `#EBEEF6` | `#2F3136` |
| `CHECK, RADIO, TOGGLE/Inner For Toggle/Hover` | `06e3438590ea21e5473dd6a7f6b87c03ba2a6c57` | `#7DA2FB` | `#355A8D` |

### CHIPS  (12) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `CHIPS/Background/Default` | `b549aaa8ded61207a136b0c045d2331984b6aefd` | `#F4F7FE` | `#242527` |
| `CHIPS/Background/Disable` | `bbcd4aa5b564029238ee9bf4d92332b646c6f1a4` | `#F7F8FB` | `#242424` |
| `CHIPS/Background/Hover` | `5323879152114a6353124c721f216994732a8070` | `#F7FAFF` | `#2F3136` |
| `CHIPS/Borders/Default` | `4c67f17259ff1a2209a5724aa5e515b388888573` | `#EBEEF6` | `#2F3136` |
| `CHIPS/Borders/Disable` | `bb33ecea15f2f506e0b6b4ec671ec2f13537cbd7` | `#EFF2FA` | `#292A2F` |
| `CHIPS/Borders/Hover` | `c03c15025d5da2d5814923b0019e94cb9108f33b` | `#D6DDEF` | `#484D58` |
| `CHIPS/Icons/Active` | `1a619ca00709f0f3b0b9a466e0c8df956ca5dad0` | `#101F3E` | `#EEEEEE` |
| `CHIPS/Icons/Disable` | `995a1af520ff07130022ad1b5a5d0a7934a6f858` | `#A6B1C9` | `#666666` |
| `CHIPS/Icons/Hover` | `3e31f04e2d229edab983c2c15911808f587d9be3` | `#101F3E` | `#EEEEEE` |
| `CHIPS/Text/Default` | `9ac74fb452ccff700feaaa1db62288e40d2d7d58` | `#101F3E` | `#EEEEEE` |
| `CHIPS/Text/Disable` | `0721fa56e908c46ce916adc4f7a356df2dc1bf24` | `#A6B1C9` | `#666666` |
| `CHIPS/Text/Hover` | `6db1f31f3822c07f9403cbbe34dddabcdbe8438e` | `#101F3E` | `#EEEEEE` |

### CODE BLOCK  (3) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `CODE BLOCK/Bg colors/Reader` | `268c657ed9c2d00b5160b198fb88d916654cf751` | `#F7F8FB` | `#242527` |
| `CODE BLOCK/Bg colors/Writer` | `40a02f51e7753db7217a258baa3ebab832f8db3f` | `#FFFFFF` | `#1A1B1D` |
| `CODE BLOCK/Borders/Default` | `eca00218dd42128fdeb5482753b30df14f455780` | `#EBEEF6` | `#2F3136` |

### DATE PICKER  (12) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `DATE PICKER/Background/Datepicker Bg` | `0513d96930dd65babb0e535859afe22c30b0b70a` | `#FFFFFF` | `#1A1B1D` |
| `DATE PICKER/Background/Number Active` | `4b371ea68de81905972f767345094a0473fba6c3` | `#E7EEFE` | `#1A273D` |
| `DATE PICKER/Background/Number Hover` | `7516466e288db914b445f4daac435592e9fa3b17` | `#F4F7FE` | `#292A2F` |
| `DATE PICKER/Background/Number Selected` | `88d83001bd5a750252a800167b78e51668da1661` | `#2A65F0` | `#458BFF` |
| `DATE PICKER/Borders/Line` | `8428eadbad55cfff170a10c73121482ffdacddab` | `#EBEEF6` | `#2F3136` |
| `DATE PICKER/Borders/Outer` | `ac94782ef4fb3cf9346bf490598633c8d34f8bc8` | `#D6DDEF` | `#484D58` |
| `DATE PICKER/Text/Active` | `63b8dfcb47d922f149f9b239b91d0f6664922c02` | `#2A65F0` | `#458BFF` |
| `DATE PICKER/Text/Days` | `8743fa32f64810a47ef6f108e31909d3520a23d1` | `#7988A8` | `#888888` |
| `DATE PICKER/Text/Default` | `9bf12ff63ff9dfaaa07b74677909800c8339b97a` | `#101F3E` | `#EEEEEE` |
| `DATE PICKER/Text/Disabled` | `7286ff18e6f5bfcbeed4d9946649c389e63af936` | `#A6B1C9` | `#666666` |
| `DATE PICKER/Text/Headings` | `2c8055b4feec5e5b9ce51e6e0483eb0715ed0726` | `#101F3E` | `#EEEEEE` |
| `DATE PICKER/Text/Selected` | `3e58d98a803dd9ed32fa1b10a5b775d5e4f2127b` | `#FFFFFF` | `#FFFFFF` |

### FULL PAGE POPUP HEADER  (4) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `FULL PAGE POPUP HEADER/Bg/Bg` | `0f8c08c317877f23e61386326b339c072f3bd1af` | `#F4F7FE` | `#292A2F` |
| `FULL PAGE POPUP HEADER/Bg/Bg 2` | `25f9bd0b015aa99efab6c788c9bebb5c3a6ad641` | `#FFFFFF` | `#1A1B1D` |
| `FULL PAGE POPUP HEADER/Border/Border 1` | `dee4a428d35881fb2b9ba52853007d9da828e34b` | `#DDE4F6` | `#33373F` |
| `FULL PAGE POPUP HEADER/Text/Text` | `f1a650ac3772cc76534eb859334501067823681d` | `#101F3E` | `#EEEEEE` |

### GRAPH  (5) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `GRAPH/Lines/Line 2` | `3171338a548ba44992bf986173e1795da8584f70` | `#EBEEF6` | `#2F3136` |
| `GRAPH/Lines/X&Y Axis` | `15cee8ab29785521cd0a4ce8173fa50f81e8d115` | `#DDE4F6` | `#33373F` |
| `GRAPH/Text/Text 1` | `d3b9eb477a20a6589ce380489df234e2ae68c06f` | `#101F3E` | `#EEEEEE` |
| `GRAPH/Text/Text 2` | `688aff8548c7be43792d3427517a832d13c572b2` | `#4D618A` | `#AAAAAA` |
| `GRAPH/Text/Text 3` | `40202738d804162d155c97c6a9200326fccb9101` | `#7988A8` | `#888888` |

### INPUT FIELDS  (26) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `INPUT FIELDS/Background/Active` | `65e87b9af70a2d9712e671924d1887123667918d` | `#F7FAFF` | `#1F2022` |
| `INPUT FIELDS/Background/Default` | `539032fe4428ae6b4578ad13309d14e599e0bb98` | `#FFFFFF` | `#1A1B1D` |
| `INPUT FIELDS/Background/Disable` | `c9e3538ad9017d366f7aea400e4a7e59c1fec51e` | `#F7F8FB` | `#242424` |
| `INPUT FIELDS/Background/Error` | `f3c307f47ad66d35a4f05fbd61fa0ac8e0f1c588` | `#FFEFEF` | `#2C2123` |
| `INPUT FIELDS/Background/Hover` | `296942f58d2955b86d26598370dc534cb06fc4ca` | `#F7FAFF` | `#1F2022` |
| `INPUT FIELDS/Background/Key value hover` | `8b08b0aab3b97bcf0c15168b2ae60105f9026567` | `#F4F7FE` | `#242527` |
| `INPUT FIELDS/Background/Link field Hover` | `abc8b1f0eac5a5d9fb7e39e8a639f677c534082e` | `#F7FAFF` | `#1F2022` |
| `INPUT FIELDS/Borders/Active` | `488f492090e01e5c453fbaaa3ebfd2c2ec0c3f4f` | `#2A65F0` | `#458BFF` |
| `INPUT FIELDS/Borders/Default` | `9976c056c773c3544d9456de7eeb0432227b1910` | `#D6DDEF` | `#484D58` |
| `INPUT FIELDS/Borders/Disable` | `5ddee4e68eb7ff127b1c1fdca00e91091ea86379` | `#EFF2FA` | `#292A2F` |
| `INPUT FIELDS/Borders/Error` | `cda7b938001c3b6683b2d47c5b9564ba5170a345` | `#EE7979` | `#682B2D` |
| `INPUT FIELDS/Borders/Hover` | `4a1f282415a628fd433ffacd53d025a142c56def` | `#7DA2FB` | `#355A8D` |
| `INPUT FIELDS/Icons/Active` | `a302191124176209cc7f38bf1954ba7e8e0748b5` | `#101F3E` | `#EEEEEE` |
| `INPUT FIELDS/Icons/Disable` | `b9790d3da9f8f9a61284da6c881bd701132d0676` | `#A6B1C9` | `#666666` |
| `INPUT FIELDS/Icons/Label` | `ea40a8a0905d5958e512e3285643a3a6c1fa0a74` | `#4D618A` | `#AAAAAA` |
| `INPUT FIELDS/Icons/Place Holder` | `240de6b50740a3d6b95c807f5b470dd3eb833c0a` | `#7988A8` | `#888888` |
| `INPUT FIELDS/Text/Active` | `00c065d43571555de5dad0d91c38b2523508e4bb` | `#101F3E` | `#EEEEEE` |
| `INPUT FIELDS/Text/Disable` | `8bee0ed450f319320c563ac8bd0c4b8d897ceaf2` | `#A6B1C9` | `#666666` |
| `INPUT FIELDS/Text/Error Text` | `a041f29f893a5f5a36f51636219a74fdeaa24e6a` | `#E22020` | `#DE5E60` |
| `INPUT FIELDS/Text/Label` | `7aba1301a1b9b028aae154c172fa0cc893b97a5d` | `#4D618A` | `#AAAAAA` |
| `INPUT FIELDS/Text/Link Field Active` | `c593ef4773647fc7b3be58c8d0297e762ce16969` | `#2A65F0` | `#458BFF` |
| `INPUT FIELDS/Text/Link field` | `2ecf03b89a03e784c0965ee1a2c8eb7b1138d916` | `#2A65F0` | `#458BFF` |
| `INPUT FIELDS/Text/Link field Hover` | `6bce78d02d35c2faca1e548105c915bb791be065` | `#0755F2` | `#5A97FB` |
| `INPUT FIELDS/Text/Link field disabled` | `071c32b0413df95e8a6126fbbc44753ff58ed6f8` | `#7DA2FB` | `#355A8D` |
| `INPUT FIELDS/Text/Optional text` | `382c93d6de7ad9530fcd10b086428f6720be92ae` | `#7988A8` | `#888888` |
| `INPUT FIELDS/Text/Place Holder` | `88dba61745c13306571962b57771021f1f597938` | `#7988A8` | `#888888` |

### LINK BOX  (12) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `LINK BOX/Background/Default` | `ce6c81410f6f11f06d12ba73a335ae7ef9db06ed` | `#F4F7FE` | `#242527` |
| `LINK BOX/Background/Hover` | `9bdade6666d3c2ed882f18e3a7d0766b79145f42` | `#EFF2FA` | `#292A2F` |
| `LINK BOX/Borders/Default` | `057c5d8fbd3c73c1897668e9952a69b5393a9e96` | `#EBEEF6` | `#2F3136` |
| `LINK BOX/Borders/Divider` | `4edce0aad08354ed73314080ebfbd5e873bd99e2` | `#D6DDEF` | `#484D58` |
| `LINK BOX/Borders/Hover` | `8e4acf86a8c0f1cdacd07f3c63c641f01307494b` | `#7DA2FB` | `#355A8D` |
| `LINK BOX/Icons/Click` | `f1b48cfe8dc27c33c226c04f5920667ac854c354` | `#101F3E` | `#EEEEEE` |
| `LINK BOX/Icons/Default` | `1ab8357b287a3bc91a7ca8fc9da8e610d52aab4e` | `#101F3E` | `#EEEEEE` |
| `LINK BOX/Icons/Hover` | `63a3af7f5ad38076b23bcaac1321d8a003e0d99c` | `#2A65F0` | `#458BFF` |
| `LINK BOX/Icons/Label` | `8774004121a18896020468cfb011ea352ff47509` | `#4D618A` | `#AAAAAA` |
| `LINK BOX/Text/Label 1` | `071731c58c4e0105d1f154c7dd7703c9f44f62b9` | `#4D618A` | `#AAAAAA` |
| `LINK BOX/Text/Label 2` | `a71c2986ced9bafae9eb2836459a46d6a91c5c8b` | `#101F3E` | `#EEEEEE` |
| `LINK BOX/Text/Main Text` | `8ced5cd37fefc96e1b95cf2e6b8bd0b130a4ce6a` | `#101F3E` | `#EEEEEE` |

### LOADER  (7) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `LOADER/Content Loader/Primary` | `25a5455f935f0046dc2383a3fc64042bcf32ff3b` | `#D6DDEF` | `#2F3136` |
| `LOADER/Content Loader/Secondary` | `c3b6defb726f74f4fa56bb9a818cf017b85f23c9` | `#F7FAFF` | `#1F2022` |
| `LOADER/Progress Loader/Primary` | `e0ca06f270f5102e4982a9f1f147f6c9506d682c` | `#2A65F0` | `#458BFF` |
| `LOADER/Progress Loader/Primary 2` | `8322882b0121fae539a3d470495b8efa28ad3d81` | `#EBEEF6` | `#2F3136` |
| `LOADER/Round Loader/Primary` | `b031a0c7916e89a8eabc5b9a5df3a4f1960d1426` | `#2A65F0` | `#458BFF` |
| `LOADER/Round Loader/Secondary` | `950e9a9e790325f72ce2ccab3e72475680b82e8c` | `#101F3E` | `#EEEEEE` |
| `LOADER/Round Loader/Tertiary` | `f077154709af746a5f91140c159b863d55c97abf` | `#FFFFFF` | `#1A1B1D` |

### MAIN HEADER  (5) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `MAIN HEADER/Bg/Bg` | `1c7672d79e6227fc1cddbac4c92c42d23819d7c2` | `#FFFFFF` | `#1A1B1D` |
| `MAIN HEADER/Border/Border 1` | `ca7e339b015dd34089d96bb47db345d4ea406b04` | `#DDE4F6` | `#33373F` |
| `MAIN HEADER/Project Name Logo/Bg` | `61d86ee97bfbe1b6def6d2ec3f3a1e6aad6cbf43` | `#EAF7EF` | `#1C2622` |
| `MAIN HEADER/Project Name Logo/Text` | `6e7b638fe00507ba2eee7225aadaececcb696798` | `#29B260` | `#3E9F64` |
| `MAIN HEADER/Text/Project text` | `0562894bc513b11c6fa1f12edbdfed0ab2d4647d` | `#101F3E` | `#EEEEEE` |

### MENU LIST  (14) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `MENU LIST/Background/Default` | `ed7eaad8a71a7ca6e63cdc248e29713c14b4a8fb` | `#FFFFFF` | `#1A1B1D` |
| `MENU LIST/Background/Disable` | `f8df7cf6abd63950af62e462beb5086d73673689` | `#F7F8FB` | `#242424` |
| `MENU LIST/Background/List Hover` | `386559ebc3fc540540096e153c554464304b9a44` | `#F4F7FE` | `#292A2F` |
| `MENU LIST/Background/List Selected` | `d2dc98d821a569b1b7b00384050f24af54763226` | `#E7EEFE` | `#1A273D` |
| `MENU LIST/Borders/Border` | `a715cf6070e48dc80cac9888f0901aaae254ff4c` | `#EBEEF6` | `#2F3136` |
| `MENU LIST/Icons/Active` | `7e4245821b74786e80d1d75ecad12be3f1608a9e` | `#101F3E` | `#EEEEEE` |
| `MENU LIST/Icons/Check deafult` | `0155afa2f063de947622a2525146166ffb42b636` | `#2A65F0` | `#458BFF` |
| `MENU LIST/Icons/Disable` | `9588148eafe277641586b8fdbaac03c39d3254a3` | `#A6B1C9` | `#666666` |
| `MENU LIST/Icons/Hover` | `6c16aecbbb4f9549c1b70f9686a46b9423dce253` | `#101F3E` | `#EEEEEE` |
| `MENU LIST/Text/Default` | `0d788534e1ac574e0abc049bd2bbc153b84360ec` | `#101F3E` | `#EEEEEE` |
| `MENU LIST/Text/Disable` | `25690e2f3635aef9ff52725994086d8b000fabcf` | `#A6B1C9` | `#666666` |
| `MENU LIST/Text/Heading` | `83802b348eab330ee91d8037c73b48b90d72465d` | `#4D618A` | `#AAAAAA` |
| `MENU LIST/Text/Hover` | `29a6d3dc3ff7d14a6dd49d214769c7af8693711e` | `#101F3E` | `#EEEEEE` |
| `MENU LIST/Text/Light text` | `1e179a84025c75cfb00d5cf151246697451ec531` | `#7988A8` | `#888888` |

### OTHER SHADES  (28) — ✅ BINDABLE

| Variable | Key | Light | Dark |
|---|---|---|---|
| `OTHER SHADES/Blue/Blue 1` | `6e8daa28555bd95a343567c24ea94becf4ef7bd6` | `#2092EF` | `#4A8EFF` |
| `OTHER SHADES/Blue/Blue 2` | `a335390802e6eec0eb17b2aa9bea1248298e4686` | `#257EC7` | `#2E88D1` |
| `OTHER SHADES/Blue/Blue 3` | `7c62623d9a51e919c1510d1835bc23db6d3673ef` | `#A6CBEA` | `#2B4254` |
| `OTHER SHADES/Blue/Blue 4` | `a8117d7691918d3b7ddae5ab96b5463fbcf7c871` | `#E8F5FF` | `#1B2730` |
| `OTHER SHADES/Green/Green 1` | `d8069165b6400190787c735bdbceb1597ee37c4a` | `#29B260` | `#3E9F64` |
| `OTHER SHADES/Green/Green 2` | `9aeddf492ee7ed3147d1126189108912df55e1ed` | `#218E4D` | `#3AA564` |
| `OTHER SHADES/Green/Green 3` | `e87e633525eacb4e4aba0024664b3089b789b683` | `#7FD1A0` | `#2F4326` |
| `OTHER SHADES/Green/Green 4` | `27bacf6b318e6ecf0b80a6f8cb876b0cae59abdf` | `#EAF7EF` | `#1C2622` |
| `OTHER SHADES/Orange/Orange 1` | `bef1c94fb359c3194a5ea646f51d1b206ff2b5b9` | `#C98E06` | `#AE821C` |
| `OTHER SHADES/Orange/Orange 2` | `50a8d7d7cd972c5cc27daceabe8fd8568c57f1ab` | `#A5760C` | `#A1874B` |
| `OTHER SHADES/Orange/Orange 3` | `78798fb1d3c2de31c2e1078300e19423f172fe77` | `#DAB45F` | `#493F07` |
| `OTHER SHADES/Orange/Orange 4` | `81caeffbf5f2b0d45a23e778d2967ef18bfe2744` | `#FFF3D7` | `#27231C` |
| `OTHER SHADES/Pink/Pink 1` | `f1c0b2879ea453259e8a9f6191bf41594d47e112` | `#E417B1` | `#DA57B9` |
| `OTHER SHADES/Pink/Pink 2` | `39107365aca8b790b547992d5f2546a34e8ae34b` | `#C51D9B` | `#CD75B8` |
| `OTHER SHADES/Pink/Pink 3` | `3224f461c2387e00a218a36cdbc18e2a2ba45e25` | `#F8B4E7` | `#542F4B` |
| `OTHER SHADES/Pink/Pink 4` | `c479fc1ad8e4f7012d0b58c0fe9c8f3a7e4fd2d2` | `#FFEFFB` | `#2D202A` |
| `OTHER SHADES/Purple/Purple 1` | `14008e3077d962a99762e7a32d3f912f95d490aa` | `#6E3D9E` | `#AD7FE4` |
| `OTHER SHADES/Purple/Purple 2` | `e5c885a536facacc1403b324fb27c78e178e5049` | `#7449A4` | `#B985F8` |
| `OTHER SHADES/Purple/Purple 3` | `c853c5cda68bf681fdf95fe05bb79edbad6f1862` | `#BDA3DF` | `#563973` |
| `OTHER SHADES/Purple/Purple 4` | `ba552ffe31bacc37728cf9691465741254af777d` | `#F1EAFF` | `#292130` |
| `OTHER SHADES/Red/Red 1` | `adfbb680604cf459b4481e24f181cc8b3b3d0e1a` | `#E22020` | `#DE5E60` |
| `OTHER SHADES/Red/Red 2` | `1ed9fb76cbca810ae2b1d14595537a35c1edfbae` | `#B51A1A` | `#E86E6B` |
| `OTHER SHADES/Red/Red 3` | `46e99b831b50870137a03e4afc490c7b3d2dd8ae` | `#EE7979` | `#682B2D` |
| `OTHER SHADES/Red/Red 4` | `6635e3b063b2e3563157f6c15f7bdd429c775dd4` | `#FFEFEF` | `#2C2123` |
| `OTHER SHADES/Theme/Theme 1` | `1f4ae805ed94c9da969608429e4b361ecbf8fc6c` | `#2A65F0` | `#458BFF` |
| `OTHER SHADES/Theme/Theme 2` | `725a2c27ab0ca813126c590178e29cb046b2813c` | `#0755F2` | `#5A97FB` |
| `OTHER SHADES/Theme/Theme 3` | `0d7a97a9941cdfd6a3497ea75e57f77d2d0cd63d` | `#7DA2FB` | `#355A8D` |
| `OTHER SHADES/Theme/Theme 4` | `77e1d9efffd698ac544bd381ceaa1c9ca5953013` | `#E7EEFE` | `#1A273D` |

### PAGINATION  (6) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `PAGINATION/Background/Default` | `03b54523484e5a00be4dc6ecda7489fc1cf52f11` | `#FFFFFF` | `#1A1B1D` |
| `PAGINATION/Background/Theme` | `441ac0567433c616e0654d7c94af4323e466109b` | `#2A65F0` | `#458BFF` |
| `PAGINATION/Border/Divider` | `69f5945c2ae55f52e6dfea7932af49f0e8536aaf` | `#EBEEF6` | `#2F3136` |
| `PAGINATION/Text/Primary` | `fed76ab56b0e8c61a6204c322102c57b387c855b` | `#101F3E` | `#EEEEEE` |
| `PAGINATION/Text/Secondary` | `fa82960deaa4a1999da475fadd16335fe9071212` | `#4D618A` | `#AAAAAA` |
| `PAGINATION/Text/Tertiary` | `1c1cac91fa67de5a750b5717563f5e91d0e92391` | `#7988A8` | `#888888` |

### POPUP  (4) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `POPUP/Bg/Bg` | `0843cad98208c8ec45fffc7981128a2f5a035c89` | `#FFFFFF` | `#1A1B1D` |
| `POPUP/Blur Layer/Bg` | `cb2b38966eb54783bb4332675dad13325e32ad1f` | `#101F3EB2` | `#000000B2` |
| `POPUP/Border/Border` | `7782ed6c7aeb326f5df5acea60d28f6005ce7ee6` | `#EBEEF6` | `#2F3136` |
| `POPUP/Border/OuterBorder` | `d144e2fdcf7b552219e50ee31d08c3f019529e5b` | `#EBEEF6` | `#2F3136` |

### PROFILE NAV  (19) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `PROFILE NAV/Background/Appearance Dark` | `696267e359667ba90da7a8d9f361f8d4b3501c7f` | `#242424` | `#242424` |
| `PROFILE NAV/Background/Appearance Light` | `58131d13cc4f32e2e2a212545996bee193611116` | `#F7F8FB` | `#F7F8FB` |
| `PROFILE NAV/Background/Bg Appearance Dark` | `b53af272753a99a784d0874ab2306c7840f17c39` | `#1A1B1D` | `#1A1B1D` |
| `PROFILE NAV/Background/Bg Appearance Dark 1` | `f45bc95c413a2cd01d5ddb41b2d4ea003d6c6b29` | `#292A2F` | `#292A2F` |
| `PROFILE NAV/Background/Bg Appearance Light` | `80b6517ca4909989772f5ecfd98835ce56401bb9` | `#FFFFFF` | `#FFFFFF` |
| `PROFILE NAV/Background/Bg Appearance Light 2` | `11badbf4dca0771dcbd83d92091f48c3e64c942c` | `#EFF2FA` | `#EFF2FA` |
| `PROFILE NAV/Background/Line Dark 1` | `92619bd8540667efa89a94eee5d8b0f05a750140` | `#484D58` | `#484D58` |
| `PROFILE NAV/Background/Line Light 1` | `b18ce682dce332912e7a1525bec1e166b37453f8` | `#D6DDEF` | `#D6DDEF` |
| `PROFILE NAV/Background/Profile Area` | `8cc96821b25a9baf75aa5bd18928190a52943198` | `#F4F7FE` | `#242527` |
| `PROFILE NAV/Background/Theme` | `2bb028df8c2fd9fd6fd5f6cfcdc8a8062b8950dd` | `#2A65F0` | `#458BFF` |
| `PROFILE NAV/Background/Theme 2` | `7dfb8f4cb6f1d2e98bad873011a4f34b74190288` | `#E417B1` | `#DA57B9` |
| `PROFILE NAV/Background/Whilte` | `c0bcf360479e026d9c3853a3b1bbae42fab30ca7` | `#FFFFFF` | `#FFFFFF` |
| `PROFILE NAV/Borders/Border` | `66479f752d8a3cda1985fb8e8e3bdc6095d6e5fd` | `#EBEEF6` | `#2F3136` |
| `PROFILE NAV/Borders/Outer border` | `62de7fef09f5a91460807f4a6568acd4e495be0a` | `#D6DDEF` | `#484D58` |
| `PROFILE NAV/Icons/Light` | `8dbb5faa5b4af029bac5c0f59e9c576a8bd10321` | `#7988A8` | `#888888` |
| `PROFILE NAV/Icons/Primary` | `113b8be2f49939140c2a3f2765aad0e33e817535` | `#101F3E` | `#EEEEEE` |
| `PROFILE NAV/Icons/Whilte` | `2ae17de6eb293e17f56c826ff2a1ccf336821af9` | `#FFFFFF` | `#FFFFFF` |
| `PROFILE NAV/Text/Heading` | `da906d98e31c55425a63ad3ccb4932463fbb6336` | `#101F3E` | `#EEEEEE` |
| `PROFILE NAV/Text/Sub Text` | `e59f39c6a497c404bebd161d8d82d220846b46e2` | `#4D618A` | `#AAAAAA` |

### SERVICE MENU  (9) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `SERVICE MENU/Background/Icon Bg Active` | `3c2db2b19455e1273ced1fec873e347a1f238844` | `#E7EEFE` | `#242527` |
| `SERVICE MENU/Background/Icon Bg Default` | `65d90100c224c94a4dc3f1ef2aa16d58f1e79781` | `#2A65F033` | `#242527` |
| `SERVICE MENU/Background/ServiceMenuBottom` | `286255a826e12e0ee96148c3d5b03e4d9709c2f2` | `#0A245D` | `#151516` |
| `SERVICE MENU/Background/ServiceMenuTop` | `f6dfc28cc2c95bb43d2e77b7047962ab2b06d252` | `#0F2A64` | `#151516` |
| `SERVICE MENU/Borders/Side Border` | `e3c304b2126c839ec3a8c97852aa1617164b0311` | `#4D618A` | `#33373F` |
| `SERVICE MENU/Icons/Service icon Default` | `a49672618989da2390bb16d3635aad95c32b26aa` | `#FFFFFF` | `#FFFFFF` |
| `SERVICE MENU/Text/Active` | `55b9735f3e94bcca5c23aec30e523181de6a8bac` | `#101F3E` | `#EEEEEE` |
| `SERVICE MENU/Text/Default` | `857edb27fe5b5820f596edd3b5052cc1fc3a063b` | `#FFFFFF` | `#FFFFFF` |
| `SERVICE MENU/Text/Sub Heading` | `3af53c7ff071ad05ae1e0d373dae0d16b6531549` | `#4D618A` | `#AAAAAA` |

### SHADOWS  (2) — ✅ BINDABLE

| Variable | Key | Light | Dark |
|---|---|---|---|
| `SHADOWS/Elevation/Default` | `eea9e7cd44a527cbcc91b4fb9fdefaa8d712a2c3` | `#EFF2FA` | `#292A2F` |
| `SHADOWS/Elevation/With Opacity` | `33603184fed6764602f36104e59d7124898269e8` | `#EFF2FA3D` | `#292A2F3D` |

### SIDE MENU  (10) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `SIDE MENU/Background/Menu Active` | `9ba4566e72168bc86d0b8eb8e836870549af26f0` | `#E7EEFE` | `#1A273D` |
| `SIDE MENU/Background/Menu Hover` | `6abe9bd740ee356762a4e0f919bca950cd915c64` | `#F4F7FE` | `#292A2F` |
| `SIDE MENU/Background/Sidemenu Bg` | `331ec3d70744e2db7562797eadd2e862c34a8865` | `#FFFFFF` | `#1A1B1D` |
| `SIDE MENU/Borders/Default` | `4b75fb47479a534ace9f11e4cb10ccc1cef0c182` | `#DDE4F6` | `#33373F` |
| `SIDE MENU/Text & Icon/Active` | `b7447c1cbd8010941ce2e183fadb101fdd5aae0b` | `#2A65F0` | `#458BFF` |
| `SIDE MENU/Text & Icon/Default` | `8880420586ceb8f18e816d084ee6b84284eae829` | `#101F3E` | `#AAAAAA` |
| `SIDE MENU/Text & Icon/Disable` | `a86c2520d4f2b98b140feb7693cedc73ce0b9ec4` | `#A6B1C9` | `#666666` |
| `SIDE MENU/Text & Icon/Hover` | `654350ee9ca9623c6cb7b44ff435ff3272bd705b` | `#2A65F0` | `#EEEEEE` |
| `SIDE MENU/Text & Icon/Service Name` | `f1a3ab3dda655b795d7dc7c56b97e2dd71e24f5a` | `#101F3E` | `#EEEEEE` |
| `SIDE MENU/Text & Icon/Sub Heading` | `c92b03d4ff42954df9d20c8d387481626cb0ba7e` | `#7988A8` | `#666666` |

### STEPPER  (17) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `STEPPER/Bg colors/Active` | `41ce1c7446b2e91719268e93b5076149c50100ad` | `#2A65F0` | `#458BFF` |
| `STEPPER/Bg colors/Completed` | `28e53307af5643da2ef0fe7f10fb3003db99b944` | `#29B260` | `#3E9F64` |
| `STEPPER/Bg colors/Default` | `2ca07f102b4ef7576d6bc81431999c5db669c868` | `#F4F7FE` | `#242527` |
| `STEPPER/Bg colors/Disable` | `32fae4dc5e513a09910ad0c562cda57bcd559dfe` | `#F7F8FB` | `#242424` |
| `STEPPER/Borders/Active` | `87c4b7c799dd20b1f5bd189fc1425b027493184f` | `#FFFFFF` | `#FFFFFF` |
| `STEPPER/Borders/Default` | `8630094d1f5fe23a7ce11012259893fc4977a759` | `#D6DDEF` | `#484D58` |
| `STEPPER/Borders/Disable` | `1162d2e13adbb2de063f53c6a892fa94f86ea8f5` | `#FFFFFF33` | `#FFFFFF33` |
| `STEPPER/Divider/Active` | `85679d1765fb8198a8d8b5e7483aa35268164b8c` | `#2A65F0` | `#458BFF` |
| `STEPPER/Divider/Completed` | `68e8e0967c598e5e4496a090d9aff8a89963c0b1` | `#3E9F64` | `#3E9F64` |
| `STEPPER/Divider/Default` | `aae10f48c0f674c05d9aa6c8aef3587229da3d8b` | `#D6DDEF` | `#484D58` |
| `STEPPER/Divider/Disable` | `c185e7851f214cc6e963f1bfc927c50c2fe7f213` | `#EFF2FA` | `#292A2F` |
| `STEPPER/Text/Active` | `912fcc41b9ff4ff04559453c83be56efe3b59665` | `#101F3E` | `#EEEEEE` |
| `STEPPER/Text/Completed` | `8f121a771e20c64d7c866f65634f14a102937735` | `#101F3E` | `#EEEEEE` |
| `STEPPER/Text/Default` | `f99d1208bb44fe858c72244c48d8f677db9a71d1` | `#4D618A` | `#AAAAAA` |
| `STEPPER/Text/Disable` | `e378ed03929a2d79032f0060212e50437559a649` | `#A6B1C9` | `#666666` |
| `STEPPER/Text/Numbers` | `95815a98fe4f5196ddd63119b578e2d5f150b97f` | `#FFFFFF` | `#FFFFFF` |
| `STEPPER/Text/Sub Text` | `385d27047b70bd6692995dd6f33fcdb4dc4ab9fb` | `#4D618A` | `#AAAAAA` |

### SUB HEADERS  (3) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `SUB HEADERS/Bg/Bg` | `61ee0006a3f885612faba94eb7b29fe95240a51a` | `#FFFFFF` | `#1A1B1D` |
| `SUB HEADERS/Border/Border 1` | `2fef52c1d895d7e572d69a301576090306cbf5bc` | `#DDE4F6` | `#33373F` |
| `SUB HEADERS/Border/Border 2` | `f4db57531431c9e23ab35ae19905a2683f2fbc76` | `#101F3E` | `#EEEEEE` |

### TABLE  (18) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `TABLE/Background/Header_Bg` | `ab837231fefdecd6873dea07aff0bf08dcf8b2cd` | `#F7F8FB` | `#1E1F21` |
| `TABLE/Background/Row_Bg` | `0e3257433b4041cb8f79e6b66483eec226b830d0` | `#FFFFFF` | `#1A1B1D` |
| `TABLE/Background/Row_Disabled_Bg` | `a08f25590457c8f2b8b1e57c58632fa575070526` | `#F7F8FB` | `#242424` |
| `TABLE/Background/Row_Hover_Bg` | `832980043abccb96a84d853a959d21b1ec3411d8` | `#F4F7FE` | `#242527` |
| `TABLE/Background/Row_Selected_Bg` | `79e582a3a5d68dc3c62881b8a3ceea7f6d44c9d1` | `#E7EEFE` | `#1A273D` |
| `TABLE/Borders/Default` | `a1226a937c7d76686e3b546c7ed029848fe18b0b` | `#EBEEF6` | `#2F3136` |
| `TABLE/Icons/Disable` | `7bd2c54c17b329e45b27bf2071db1e99a41623f4` | `#A6B1C9` | `#666666` |
| `TABLE/Icons/Light` | `c5e2ee01017d18c3ead3547d40d79ca279ed28b8` | `#7988A8` | `#888888` |
| `TABLE/Icons/Primary` | `1bb5ebb1df8a501443013f907f094e583b58fa6b` | `#101F3E` | `#EEEEEE` |
| `TABLE/Icons/Secondary` | `456d307810ea0f86c6a63c657d6b654bbe7b1581` | `#4D618A` | `#AAAAAA` |
| `TABLE/Text/Disable` | `342f20eb2057408b8ee5d312048defdd910cbf05` | `#A6B1C9` | `#666666` |
| `TABLE/Text/Light` | `dc6a6fde26cb7301edbf67225b7a1a7a4af1c927` | `#7988A8` | `#888888` |
| `TABLE/Text/Primary` | `b1cdad450a4a0d6cce4a00db65ab2f72e5451482` | `#101F3E` | `#EEEEEE` |
| `TABLE/Text/Secondary` | `0ca9c1dc5ce38ec168896d131a118fb8891d554e` | `#4D618A` | `#AAAAAA` |
| `TABLE/Three_Dot/Icon` | `7e1f169c1536954fc57f6ff535ac321d1b146eac` | `#101F3E` | `#EEEEEE` |
| `TABLE/Three_Dot/Icon_Bg` | `29009add70dfd4c9c190f596e5e9b05bff4f5b64` | `#F7F8FB` | `#242424` |
| `TABLE/Three_Dot/Icon_Bg_Active` | `97cf454a7807c62c95e03d7487e1cfeee304275a` | `#E7EEFE` | `#1A273D` |
| `TABLE/Three_Dot/Icon_Bg_Hover` | `25efbf40b770982ef02a5a28ae9d93735c0b4000` | `#EBEEF6` | `#2F3136` |

### TABS  (28) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `TABS/Code Tab/Background/Active` | `242b4e4e51b7e6e9244e2140b9a3712f7d68ad20` | `#FFFFFF` | `#1F2022` |
| `TABS/Code Tab/Background/BG Default` | `58220bd890749bd4e41a5b2ff16c3f9419808c06` | `#EFF2FA` | `#292A2F` |
| `TABS/Code Tab/Background/Disable` | `7140c7dfeb60e0abb7dfb5c571c6b4862083fda3` | `#F7F8FB` | `#242424` |
| `TABS/Code Tab/Background/Hover` | `84ec913d0165068db71510dee0a7e47315d43f7c` | `#FFFFFF` | `#292A2F` |
| `TABS/Code Tab/Border/Default` | `87960b3b01de085b503bc6e74855ba221b810a15` | `#DDE4F6` | `#33373F` |
| `TABS/Code Tab/Text & Icon/Active` | `34668e0e029da246ab55e478d70fb8badb5ca46a` | `#2A65F0` | `#EEEEEE` |
| `TABS/Code Tab/Text & Icon/Default` | `41578a298b1b2d61a8e8bb8601aea32ab5d905ba` | `#4D618A` | `#AAAAAA` |
| `TABS/Code Tab/Text & Icon/Disable` | `f8b63ecb13e146578e90fe56068ece31ddd9783a` | `#A6B1C9` | `#666666` |
| `TABS/Code Tab/Text & Icon/Hover` | `807dee5625e1ef8e2b25cff4b68633fa918db92a` | `#101F3E` | `#EEEEEE` |
| `TABS/Primary/Background/Disable` | `d8ea05891eb3609ee7c4f7dfa59a9f991156177c` | `#F7F8FB` | `#242424` |
| `TABS/Primary/Background/Hover` | `0937fa3d92e42298b5052914e5fbee9e5bb6a767` | `#E7EEFE` | `#1A273D` |
| `TABS/Primary/Borders/Active` | `3b58a5981a6f977a00acd9a27c521ebbf7818536` | `#2A65F0` | `#458BFF` |
| `TABS/Primary/Borders/Default` | `6f41592cebf9ce27024f3009a2ad277fc0e1a2d6` | `#DDE4F6` | `#33373F` |
| `TABS/Primary/Borders/Disable` | `5fd2749e7a1656b831ecd936039b27f1c9a5afa8` | `#EFF2FA` | `#292A2F` |
| `TABS/Primary/Borders/Hover` | `6ba0f59ddd952219dcbe524089e58f11656eb097` | `#7DA2FB` | `#355A8D` |
| `TABS/Primary/Text & Icon/Active` | `e76e83c3a5fe2982a44bbdb3d4067c9d0248b740` | `#2A65F0` | `#458BFF` |
| `TABS/Primary/Text & Icon/Default` | `049aebbc41d6ad4d92f89e1c778870ed693682ad` | `#4D618A` | `#AAAAAA` |
| `TABS/Primary/Text & Icon/Disable` | `bd9be8ef93428468fe67b887155774a1d33f3164` | `#A6B1C9` | `#666666` |
| `TABS/Primary/Text & Icon/Hover` | `6b2e502657c2fe3d26ad19338ac3fdd7eea3c842` | `#101F3E` | `#EEEEEE` |
| `TABS/Secondary/Background/Active` | `d963230b769e2aebbf962c4612cc5e7af7694990` | `#FFFFFF` | `#1F2022` |
| `TABS/Secondary/Background/BG Default` | `c8368228e11172abc5c32b5504c3402f6e637d8f` | `#EFF2FA` | `#33373F` |
| `TABS/Secondary/Background/Disable` | `29e55a77e9a6e6f0671eb4e06edb0935700d0858` | `#F7F8FB` | `#242424` |
| `TABS/Secondary/Background/Hover` | `0620e5103a60f7a8c9cb2ffa914c62f46886b037` | `#FFFFFF` | `#292A2F` |
| `TABS/Secondary/Border/Default` | `cf1d5f02e8c254f9d8dbc12772e24121cd0bf913` | `#DDE4F6` | `#33373F` |
| `TABS/Secondary/Text & Icon/Active` | `416186b05382636574a5fdcb10f2991b2c093464` | `#2A65F0` | `#EEEEEE` |
| `TABS/Secondary/Text & Icon/Default` | `ec5086b16dfb07e84612621955d60e0a1c3c5d26` | `#4D618A` | `#AAAAAA` |
| `TABS/Secondary/Text & Icon/Disable` | `cddcfdd2f808d7c54d56b96931ad53aeccf80646` | `#A6B1C9` | `#666666` |
| `TABS/Secondary/Text & Icon/Hover` | `c5eddf14f5d4679a71dd0eb5935562d0365138d5` | `#101F3E` | `#EEEEEE` |

### TIMELINE  (11) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `TIMELINE/Background/Blue` | `bb565811ebb2ada2ec7b0ff6868cc89a8cd07063` | `#E8F5FF` | `#1B2730` |
| `TIMELINE/Background/Blue Dot` | `7f2b65d3ed71977b6e9e36cf52ab40b05a6c3e61` | `#2092EF` | `#4A8EFF` |
| `TIMELINE/Background/Green` | `21df92f491fa04071f9ffc37fbda8db9245e141d` | `#EAF7EF` | `#1C2622` |
| `TIMELINE/Background/Green Dot` | `b4321eb202c24cf253121d0ee228692b63afa654` | `#29B260` | `#3E9F64` |
| `TIMELINE/Background/Grey` | `1ef42c0af45208c23f51a15710983d8d199f6074` | `#EBEEF6` | `#2F3136` |
| `TIMELINE/Background/Grey Dot` | `d6a9e2e647b1b39353b22b7cdf67f2cb83c1c0de` | `#4D618A` | `#AAAAAA` |
| `TIMELINE/Background/Orange` | `ea2f96c7dd82a18f08af742b8e7b6c42a45736e6` | `#FFF3D7` | `#27231C` |
| `TIMELINE/Background/Orange dot` | `f722e7de0982ae2f3adaadf2a11526bdd8932737` | `#C98E06` | `#AE821C` |
| `TIMELINE/Background/Red` | `a989bb34bca5cfd76812176559ff964986e8d956` | `#FFEFEF` | `#2C2123` |
| `TIMELINE/Background/Red Dot` | `3c8453a6c3f87888d3129f86e0c057128b6c6d5e` | `#E22020` | `#DE5E60` |
| `TIMELINE/Line/Default` | `ef45b9f15ee205053cbf81b46fedafef5f8e2978` | `#D6DDEF` | `#484D58` |

### TOAST  (8) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `TOAST/Default/Background` | `f42f05386e28072edc8846023e09f26a14b3aa85` | `#FFFFFF` | `#1A1B1D` |
| `TOAST/Default/Border` | `9b7314bd5de29ca44ff4f959f6ed00057dffe919` | `#EBEEF6` | `#2F3136` |
| `TOAST/Default/Icon, Line Danger` | `fbea387dd940f40310676b5f5a81b9d43ccfbb88` | `#E22020` | `#DE5E60` |
| `TOAST/Default/Icon, Line Info` | `2faef4ebebc486ac9805bf115b5d805f78f7f285` | `#2092EF` | `#4A8EFF` |
| `TOAST/Default/Icon, Line Success` | `13f67fc32d63b36e72a13dc24480ad35c308d569` | `#29B260` | `#3E9F64` |
| `TOAST/Default/Icon, Line Warning` | `96b93eb758cab44555508dade490e4212827cb7f` | `#C98E06` | `#AE821C` |
| `TOAST/Default/Text Primary` | `baa0da1ccebf4943dd6e6c98d3a7512d33befc86` | `#101F3E` | `#EEEEEE` |
| `TOAST/Default/Text Secondary` | `2f226d731291ee72b327dbc986d912d72026bc8a` | `#4D618A` | `#AAAAAA` |

### TOOLTIP  (4) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `TOOLTIP/Static/Background` | `a09c53232b92daf43045629d5534bf55e6792ae2` | `#101F3E` | `#2F3136` |
| `TOOLTIP/Static/Border` | `faa65465a95f3732ac820205cd51ddd8dca76e08` | `#EBEEF6` | `#484D58` |
| `TOOLTIP/Static/Text Primary` | `ecb1d6880192ba55ac01e73d6f448b4d7550f33e` | `#FFFFFF` | `#FFFFFF` |
| `TOOLTIP/Static/Text Secondary` | `6cc7a99b526baef676eb055f8dfa8d4b8ca9f4fb` | `#4D618A` | `#AAAAAA` |

### TOUR  (6) — ⛔ INTERNAL — reference only, cannot be imported

| Variable | Key | Light | Dark |
|---|---|---|---|
| `TOUR/Background/Blink bg` | `64563ea2de86aef5646dd16b90f9f3a33bc79140` | `#2A65F0` | `#458BFF` |
| `TOUR/Background/default` | `42ec66d015645f163046cf2957955d684511d511` | `#FFFFFF` | `#1A1B1D` |
| `TOUR/Borders/Blink Border` | `0d47bb5e936b9a270a7214c67116a5b122b4ea18` | `#2A65F0` | `#458BFF` |
| `TOUR/Borders/Outer` | `da6fc06ce88e27e72cec9fb7028c864cdac0559d` | `#EBEEF6` | `#2F3136` |
| `TOUR/Text/Heading` | `ded76a348ba953bd13563909fffeabb64f05d4d9` | `#101F3E` | `#EEEEEE` |
| `TOUR/Text/Sub Text` | `376f0ce50197598ac03ac4c39be76a944ef1cc51` | `#4D618A` | `#AAAAAA` |

---

## `_Global_Values` — ⛔ NOT bindable (41)

Verified failing from a consuming file. Recorded for reference; use literal numbers.

### Spacing  (27)

| Variable | Key | Value |
|---|---|---|
| `Spacing/S1` | `a152d13f93e2ce5d76b66d5f63e7d48c4036d278` | 1 |
| `Spacing/S2` | `16f8b89805e63238337052c253625dd10e6e1a8c` | 2 |
| `Spacing/S3` | `ab873e40d0521bc53479996e3ca4abe5b42b47fb` | 3 |
| `Spacing/S4` | `d37b6ab0911d0408fd2244154472102b0fc968b9` | 4 |
| `Spacing/S5` | `456c897e0cbbb788df48455a7a18a781c52c3de7` | 5 |
| `Spacing/S6` | `d7182056eb5944aedc28daf4db6da4ec8c7b7ee2` | 6 |
| `Spacing/S8` | `c7472097349e3fcc08de6751b29e0a3cd44f6602` | 8 |
| `Spacing/S10` | `387d3abe6df56bf49891754fdd7d8a6a4fe60259` | 10 |
| `Spacing/S12` | `14eee0ca9bf6afbf84eef32cc23a167278d30584` | 12 |
| `Spacing/S14` | `8d0605af717b5e67f4f96c7f638c94b1d7243410` | 14 |
| `Spacing/S16` | `70cc76d9f3a84fc3e809c5ee1649fde95f5a1e35` | 16 |
| `Spacing/S18` | `1f6ee190ac2ba811778ef667a741e32822173f0c` | 18 |
| `Spacing/S20` | `be53d236a6a84da274cb05c77a08d4b15dcd5ac6` | 20 |
| `Spacing/S22` | `16a1d9f9447c208bbcdeafa6bbd7e642dda1c917` | 22 |
| `Spacing/S24` | `ee6dc2c75c26700c134330991b3053fa55e3a60a` | 24 |
| `Spacing/S26` | `c936969106956aec51c34a5b94245493b9d45d71` | 26 |
| `Spacing/S28` | `4b08d30d5d24e2eec94ae1df9a4dce76fe5e578d` | 28 |
| `Spacing/S30` | `34ceecfe8f13b70c0f0c4c20a3d9dd98eea42641` | 30 |
| `Spacing/S32` | `1873ec6f6bbae6939e5eaa43e8c5c4431dac1697` | 32 |
| `Spacing/S36` | `c88c63d8d95459b7dc3499afc690b8a13152142c` | 36 |
| `Spacing/S40` | `ae5de8bb94a6ea97cd2c23aec1308841fb8320c4` | 40 |
| `Spacing/S44` | `9e68d5f8695802b888745edf076cd06546d49f63` | 44 |
| `Spacing/S48` | `76356126be3fd56226a7debb31d72756b4b031fb` | 48 |
| `Spacing/S50` | `a4e85ab4ef678a03a1b9ca748879d59ed6f5ab71` | 50 |
| `Spacing/S64` | `e63e2c92d3f7382183a2f00c15f54016f7c5d7aa` | 64 |
| `Spacing/S80` | `dba375952a2cc6e6161ef0155c10c3397766c090` | 80 |
| `Spacing/S120` | `70724140f9e56ec0636bc42e60df9ae186a84363` | 120 |

### Radius  (8)

| Variable | Key | Value |
|---|---|---|
| `Radius/R2` | `2ced5ec2dbef59d0b631cf8693bb4ef51867534d` | 2 |
| `Radius/R4` | `567bd3436984919663bc9f5e47e8b88a2fd8ef3f` | 4 |
| `Radius/R6` | `91c19e1797abe6049a6e8af87968729fdf9bbbf7` | 6 |
| `Radius/R10` | `c5ec9e48bbb31d0f9e70ae0b44e4fda1975b1de6` | 10 |
| `Radius/R14` | `63f7234f93f7c0ce539c91374801aa85fd1deac0` | 14 |
| `Radius/R18` | `b6db749da3fc80b755c279ac1f70976d07bd4a51` | 18 |
| `Radius/R20` | `bd56157b1c707d7dd06006869197a6b9582018fc` | 20 |
| `Radius/R-Full` | `ded042e5e763e2329bff1ab67ceea70771edccd2` | 1000 |

### Border width  (6)

| Variable | Key | Value |
|---|---|---|
| `Border/Hairline` | `56f6c961142db08c788ac8ccab131d075a17a319` | 0.5 |
| `Border/Default` | `8ef5261b7c82cf688e5a5dd5e3524b2eba81d18e` | 1 |
| `Border/Medium` | `070e038b26985bcb191d5fa9a212f2928ac299c1` | 1.3 |
| `Border/Focus` | `fe5609964c42dbff4ace84532f582a0a91e32574` | 1.5 |
| `Border/Heavy` | `7165ca1d437a643272a30fd4204fa16fbdc75fac` | 2 |
| `Border/Thick` | `9658945dc22ea4895a837db22ae32c558d2a61a3` | 4 |

`Border/Medium` resolves to `1.2999999523162842` — a float artefact, not a typo.

---

## ✅ Text styles (26) — bindable

`importStyleByKeyAsync` → `loadFontAsync(style.fontName)` → `setTextStyleIdAsync(style.id)`.
Never set `fontSize`/`fontName` directly. Headings and emphasised values MUST use a
Semi Bold style — a larger Regular size is not hierarchy.

| Style | Key | Font | Size | Line height |
|---|---|---|---|---|
| `✅ Headlines/H1` | `7da7c9cde2aad4a428b1cb10e83918bbbf08c23e` | Inter Semi Bold | 40 | auto |
| `✅ Headlines/H2` | `f82955c53b8dbc2e25c35bd23de87df579e01ca4` | Inter Semi Bold | 32 | auto |
| `✅ Headlines/H3` | `bfb92b2e623da8472c52b58c1629ee75a1e5f393` | Inter Semi Bold | 24 | 30 |
| `✅ Headlines/H4` | `66633b887dcd3659a412b02052b7f34dc148a764` | Inter Semi Bold | 20 | 24 |
| `✅ Headlines/H5` | `2c3007c5a4169e14a11ac9b2957b2f91b4f8c47b` | Inter Semi Bold | 18 | 22 |
| `✅ Headlines/H6` | `92db59d95a9cd91d714a2fb38bda0f174cc2a76b` | Inter Semi Bold | 16 | 20 |
| `✅ Body/Subtitle 1` | `acb8f120bb531138d05850eb7965cf305a7681e6` | Inter Semi Bold | 14 | 20 |
| `✅ Body/Subtitle 2` | `96bac9d6462a4aab339153f84cd5c9d58a5e0c2b` | Inter Semi Bold | 12 | 16 |
| `✅ Body/Subtitle 3` | `69e33c4c77d99d315c87ebfda823cae589437808` | Inter Semi Bold | 10 | 12 |
| `✅ Body/Body 1` | `ae9d89acf9bb02c56f54844d48ed0b7ff98adda2` | Inter Regular | 14 | 20 |
| `✅ Body/Body 2` | `074ccbdf65f4bf9b35442414c8b7805b75078866` | Inter Regular | 16 | 20 |
| `✅ Body/Body 3` | `4c43eefb0c536e876ceb4426bf0a85d8b519026f` | Inter Regular | 12 | 16 |
| `✅ Body/Body 4` | `15003632c724896c66fc7230e7bd775dda9ebcc7` | Inter Regular | 10 | 12 |
| `✅ Body/Body 5` | `8aa327a72dbb9d2f32e176e665ce5962e577868a` | Inter Regular | 18 | 22 |
| `✅ Button/Button Lg` | `1cfec64c6f0518425fed5dbdf7e3f69e558ea929` | Inter Medium | 16 | 22 |
| `✅ Button/Button Md` | `851b710f90fae0018d1fc684b5761fbb8dc13576` | Inter Medium | 14 | 20 |
| `✅ Button/Button Sm` | `108becf0059522b754d3b6469cac920a8940a24d` | Inter Medium | 14 | 20 |
| `✅ Button/Button XS` | `d404c2c737f52cfb7621371ba69dbf038e14758d` | Inter Medium | 12 | 16 |
| `✅ Input Fields/Label Text` | `52a7f75ddd01e7db23c89b7973b1e10a33c22b16` | Inter Semi Bold | 12 | 16 |
| `✅ Input Fields/Default Text` | `72fb182c0045fc1cda8ef6617cc14afa413b1016` | Inter Regular | 14 | 20 |
| `✅ Input Fields/Small Text` | `b302fa808c1ba67b48db8eec57a475e9b7501431` | Inter Regular | 14 | 20 |
| `✅ Input Fields/Extra Small Text` | `e6d1c3776eb24a78af1fb24b2158509577dd8be4` | Inter Regular | 12 | 16 |
| `✅ Code Text/Code Body` | `0950d4fb48c454573c3064da0c41f41216dfcb6a` | Roboto Mono Regular | 12 | 20 |
| `✅ Code Text/Code Subtitle` | `482373bf511056cb3a4c68e9488222d1b7bc89f4` | Roboto Mono SemiBold | 12 | 20 |
| `✅ Service Heading/Service Heading` | `291330b3c037723af307231d0d72aac63ef4fe13` | Inter Semi Bold | 10 | 12 |
| `Service Name` | `35c84086855b91dbd0b4fb17d014388e7acd7080` | Inter Semi Bold | 16 | 20 |

---

## Not in this file

- **`_Global_Colors` (111)** — raw hex ramp that `Mode` aliases. Not bindable.
- **`Typography` (55)** / **`Theme` (10)** — consumed by text styles and brand switching.
- **Component keys** — COMPONENT KEY TABLE in `.claude/skills/zcat.md`.
- **Icon keys** — `references/icon-catalog.json` (87 icons).

