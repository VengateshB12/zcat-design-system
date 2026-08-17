# Input Selection Rules

## Dropdown vs Radio Group vs Segmented Control

**Dropdown:** 6+ options, space limited, dynamic list, rarely changed after selection.

**Radio Group:** 2-5 options, all visible without interaction, options have descriptions.

**Segmented Control:** 2-4 options as view modes/filters, immediate content switch, short labels.

**Default:** Dropdown for 6+. Radio for 2-5 in forms. Segmented for view/filter toggles.

---

## Text Input vs Textarea vs Rich Editor

**Text Input:** Single line, under 100 chars (name, email, URL, search).

**Textarea:** Multi-line plain text, 1-5 paragraphs (description, notes, comments). No formatting needed.

**Rich Editor:** Formatting needed (bold, lists, links). Long-form content rendered as HTML elsewhere.

**Default:** Text Input for labels. Textarea for descriptions. Rich Editor only when formatting explicitly needed.

---

## Checkboxes vs Multi-Select Dropdown vs Token Input

**Checkboxes:** 2-7 options, all visible, independent selections.

**Multi-Select Dropdown:** 8+ predefined options, space constrained, selections shown as tags.

**Token Input:** Very large/dynamic option set, searchable, options created on the fly.

**Default:** Checkboxes for 2-7. Multi-Select for 8+ fixed. Token for searchable/dynamic.

---

## Toggle vs Checkbox for Boolean

**Toggle:** Setting takes effect immediately (no Save button). On/off state (notifications, feature flags). Settings/config panel.

**Checkbox:** Value submitted as part of form with Save. Agreement/selection ("I agree", "Remember me"). Alongside other form fields.

**Default:** Toggle for instant-apply settings. Checkbox for form-submitted values.

---

## Number Input vs Text Input with Validation

**Number Input (Stepper):** Small range (1-100), users adjust ±1, whole numbers.

**Text Input with Validation:** Large values (phone, prices), paste/type full value, format mask needed.

**Default:** Number Input for small-range integers. Text Input for large numbers, decimals, formatted.
