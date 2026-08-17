# Popup & Dialog Rules

## Popup Modal vs Full-Page Modal vs Drawer

**Popup Modal:** Short form/confirmation (400-600px). Quick, focused action. 1-5 fields.

**Full-Page Modal:** Multi-step flow or long form. Full viewport. 6+ fields or multiple sections.

**Drawer:** Supplementary detail (preview, properties). User needs to see page behind it. Frequent open/close.

**Default:** Popup for confirmations/quick forms. Drawer for detail panels. Full-Page for complex creation flows.

---

## Popup Component — MANDATORY Structure

**Close is in FOOTER, NEVER in header.** The zcat Popup has NO X close button in header.

### Simple Form (no stepper)
```
Footer: Cancel (Ghost, LEFT) ———————— Create (Fill, RIGHT)
```

### Wizard with Stepper
```
Footer: Back (Outline, LEFT) ———————— Cancel (Ghost, RIGHT) + Continue (Fill, RIGHT)
```
- First step: no Back, just Cancel (left) + Continue (right)
- Last step: Back (left) + Cancel + Create (right)

### Correct Structure
```
Popup
├── Header: Title only, NO close button
├── Description text (optional)
├── [Stepper if wizard — FILL width, in HEADER area below title]
├── Content (form fields, selections)
└── Footer: buttons per pattern above
```

### Stepper/Tabs in Popup Header
- ALWAYS in header area, directly below title — NEVER in content body
- Stepper must be responsive (`layoutSizingHorizontal = FILL`)
- Use Stepper component — NEVER draw circles + lines manually

### Popup Sizing & Responsiveness
- Default 548px wide, 500-700px for wizard flows
- ALL components inside Popup (Text Box, Dropdown, Radio Button) MUST use `layoutSizingHorizontal = FILL`
- NEVER leave narrow fixed-width controls in a wide popup
- Form labels go ABOVE fields (inside popups)

### Required Layers
1. **Popup Blur** (key `825e3c4aa551ccd56ec61d6f5059dda1e92abbc5`) — backdrop, sized to full page (1582×860)
2. **Popup** component — the actual dialog

NEVER create manual frames with hardcoded black/opacity for overlay.

---

## Grouping Fields Inside Modal/Form

**Bordered sub-panel (neutral Card BG) + sub-heading when:** 3+ fields configure one conceptual thing (alert trigger logic: conditions, criteria, frequency).

**Plain sub-heading, no border, when:** Single field or repeatable list (e.g., "Notify Emails" + "+" Icon Button to add more).

**Default:** Ungrouped for primary identity fields (name, type). Bordered sub-panel for configuration clusters. Plain sub-heading for single/repeatable fields.

**Optional/rarely-needed fields:** Collapse behind "Show Advanced Settings" / "Hide Advanced Settings" link with chevron, collapsed by default. Not the full Accordion component — just a text link toggle.

**Secondary tabs inside grouped panel:** When tabs switch sub-views of one group (e.g., "Params | Headers" for a webhook), they sit inside that group's bordered panel, scoped to it.

---

## Popup & Dialog Overlay Pattern

**Required layers (bottom to top):**
1. **Popup Blur** — bare backdrop rectangle with blur/dim. NOT a dialog. Size to full page.
2. **Popup** — actual dialog with header, body, actions.

**NEVER:** Create manual overlay frames. Skip Popup Blur. Set overlay to white.

**Popup sizing:** Default 548px. For wider content, detach and resize (Popup is on detach whitelist).
