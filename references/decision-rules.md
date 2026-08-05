# Decision Rules

Structured decision trees for choosing the right component when the designer's input is ambiguous. Use these to resolve uncertainty before building a screen.

---

## Data Display

### Table vs Cards vs List

**When this comes up:** The user wants to display a collection of items and hasn't specified the layout.

**Ask the user:** "Are you displaying structured data with multiple comparable attributes, or more visual/summarized content?"

**Use Table when:**
- Data has 4+ comparable columns (e.g., name, status, date, owner)
- Users need to scan, sort, or filter across rows
- The data is uniform in structure (every item has the same fields)
- Users need to compare values across items quickly
- Bulk actions (select all, batch delete) are required

**Use Cards when:**
- Each item is visually distinct or has a hero image/preview
- Data has 3 or fewer key attributes per item
- Items need prominent action buttons or status indicators
- The layout needs to work well on mobile (cards stack naturally)
- Items are browsed, not compared side-by-side

**Use List when:**
- Items are simple: one primary line + optional secondary text
- Space is constrained (sidebar, dropdown panel, search results)
- Items are scanned sequentially, not compared
- You need compact density without sacrificing readability

**Use both when:**
- The user needs a toggle between "table view" and "card/grid view" (common in file managers, project dashboards)

**Default:** Table for 4+ columns of uniform data. Cards for 3 or fewer attributes with visual emphasis. List for simple, single-line items.

---

### Description List vs Key-Value Pairs

**When this comes up:** The user wants to show detail/summary information about a single entity (e.g., user profile, project details).

**Ask the user:** "Is this a read-only detail view, or will users need to edit these values?"

**Use Description List when:**
- Displaying read-only metadata for a single item
- The labels and values have varying lengths
- There are 4-12 fields that don't need grouping
- Layout is vertical or two-column label:value pairs

**Use Key-Value Pairs (inline) when:**
- Showing 2-3 quick facts alongside other content (e.g., in a card header)
- The data is supplementary, not the primary content
- Space is tight and values are short (dates, counts, statuses)

**Default:** Description List for dedicated detail views. Inline key-value for supplementary metadata.

---

### KPI/Stats Cards vs Inline Metrics

**When this comes up:** The user wants to display numeric summaries or performance indicators.

**Ask the user:** "Should these metrics be the primary focus of the page, or supporting context for other content?"

**Use KPI/Stats Cards when:**
- Metrics are the hero content of a dashboard or overview page
- Each metric needs a label, value, trend indicator, and optional sparkline
- There are 3-6 key metrics to highlight
- Users glance at these first before diving into details below

**Use Inline Metrics when:**
- Metrics provide context within a section (e.g., "12 tasks due today" in a task list header)
- There are 1-2 metrics that support adjacent content
- Metrics are secondary to the main content on the page

**Default:** KPI/Stats Cards for dashboard headers and overview pages. Inline metrics for contextual data within sections.

---

## Input Selection

### Dropdown vs Radio Group vs Segmented Control

**When this comes up:** The user needs a single-select input and hasn't specified the control type.

**Ask the user:** "How many options are there, and do users need to see all options at once?"

**Use Dropdown (Select) when:**
- There are 6+ options
- Screen space is limited
- The list of options may change dynamically
- The selected value is rarely changed after initial selection

**Use Radio Group when:**
- There are 2-5 options
- All options need to be visible without interaction
- Users benefit from reading every option before deciding
- Options have descriptions or sub-labels that help the decision

**Use Segmented Control when:**
- There are 2-4 options that represent view modes or filters
- Switching between options changes the visible content immediately
- Options are short labels (1-2 words each)
- The control acts more like a toggle than a form field

**Default:** Dropdown for 6+ options. Radio Group for 2-5 options in forms. Segmented Control for view/filter toggles.

---

### Text Input vs Textarea vs Rich Editor

**When this comes up:** The user needs a text entry field.

**Ask the user:** "Is this a short value (name, title), a longer block of plain text, or formatted content?"

**Use Text Input when:**
- Expected input is a single line (name, email, URL, search query)
- Maximum length is under 100 characters
- No line breaks are needed

**Use Textarea when:**
- Expected input is multi-line plain text (description, notes, comments)
- Content is 1-5 paragraphs
- No formatting (bold, lists, links) is needed
- Character count feedback is useful

**Use Rich Editor when:**
- Users need formatting (bold, italic, lists, headings, links)
- Content will be rendered as HTML/rich text elsewhere
- Input is long-form (documentation, articles, detailed descriptions)

**Default:** Text Input for labels and single values. Textarea for descriptions and notes. Rich Editor only when formatting is explicitly needed.

---

### Checkboxes vs Multi-Select Dropdown vs Token Input

**When this comes up:** The user needs a multi-select input.

**Ask the user:** "How many options exist, and do users need to see their selections at a glance?"

**Use Checkboxes when:**
- There are 2-7 options
- All options should be visible without interaction
- Users benefit from scanning every option
- Selections are independent of each other

**Use Multi-Select Dropdown when:**
- There are 8+ predefined options
- Space is constrained
- Selected values can be shown as tags/chips in the closed state
- The option list is fixed and known

**Use Token Input when:**
- The option set is very large or dynamic (users, tags, categories)
- Users need to search/filter to find options
- Selections are shown as removable chips/tokens
- Options may be created on the fly (e.g., "Add new tag")

**Default:** Checkboxes for 2-7 visible options. Multi-Select Dropdown for 8+ fixed options. Token Input for searchable or dynamic option sets.

---

### Toggle vs Checkbox for Boolean

**When this comes up:** The user needs a true/false or on/off input.

**Ask the user:** "Does this setting take effect immediately, or is it saved with a form submission?"

**Use Toggle when:**
- The setting takes effect immediately (no "Save" button)
- It represents an on/off state (notifications, dark mode, feature flags)
- It appears in a settings page or configuration panel
- The label reads naturally as "[Feature] is on/off"

**Use Checkbox when:**
- The value is submitted as part of a form with a Save/Submit button
- It represents agreement or selection ("I agree to terms", "Remember me")
- It appears alongside other form fields
- Multiple related boolean options are grouped together

**Default:** Toggle for instant-apply settings. Checkbox for form-submitted values.

---

### Number Input vs Text Input with Validation

**When this comes up:** The user needs to capture a numeric value.

**Ask the user:** "Do users need increment/decrement controls, or will they type the number directly?"

**Use Number Input (Stepper) when:**
- Values are within a small range (1-100, quantities)
- Users commonly adjust by +1/-1
- Precision to whole numbers or fixed increments
- The field benefits from up/down arrows or +/- buttons

**Use Text Input with Validation when:**
- Values can be very large (phone numbers, IDs, prices with decimals)
- Users will paste or type the full value
- The format needs a mask (e.g., currency formatting, phone number)
- Increment/decrement would be impractical

**Default:** Number Input for small-range whole numbers. Text Input with validation for large numbers, decimals, or formatted numerics.

---

## Navigation & Structure

### Popup Modal vs Full-Page Modal vs Drawer

**When this comes up:** The user needs an overlay or secondary surface for content.

**Ask the user:** "How much content does this overlay contain, and does the user need to reference the page behind it?"

**Use Popup Modal when:**
- Content is a short form, confirmation, or message (fits in 400-600px width)
- The action is quick and focused (delete confirmation, rename, quick add)
- User does not need to see the page behind the modal
- There are 1-5 form fields or a single decision

**Use Full-Page Modal when:**
- Content is a multi-step flow or long form (creation wizard, detailed editor)
- The content needs full viewport width
- The user is entering a focused sub-task that replaces the current context
- There are 6+ form fields or multiple sections

**Use Drawer when:**
- Content is supplementary detail (preview panel, properties sidebar, activity log)
- The user needs to reference the page behind it while viewing the drawer
- Content is a list or detail view that doesn't need centering
- Opening/closing is frequent during a workflow

**Default:** Popup Modal for confirmations and quick forms. Drawer for detail panels and supplementary content. Full-Page Modal for complex creation flows.

---

### Tabs vs Sidebar Nav vs Accordion

**When this comes up:** The user needs to organize content into sections within a page.

**Ask the user:** "Are the sections peers of equal importance, or is there a primary section with secondary details?"

**Use Tabs when:**
- There are 2-7 peer sections of roughly equal importance
- Users switch between sections frequently
- Only one section is viewed at a time
- Section labels are short (1-3 words)

**Use Sidebar Nav when:**
- There are 8+ sections (e.g., settings pages, documentation)
- Sections are grouped into categories
- The page is a dedicated settings or configuration area
- Users need to see all available sections at a glance

**Use Accordion when:**
- Sections can be expanded independently (FAQ, grouped details)
- Users may need to see multiple sections simultaneously
- Content in each section varies significantly in length
- Sections are viewed infrequently or only as needed

**Default:** Tabs for 2-7 peer sections. Sidebar Nav for 8+ sections or settings pages. Accordion for independently expandable sections.

---

### Inline Edit vs Detail Page vs Modal Edit

**When this comes up:** The user needs to let users modify an existing record.

**Ask the user:** "How many fields are being edited, and does the edit need the surrounding context?"

**Use Inline Edit when:**
- Editing 1-2 fields (rename, update status, change assignee)
- The change is quick and the user should stay in context
- The field is visible in a table row or card
- No validation beyond the field itself is needed

**Use Detail Page when:**
- Editing a full record with many fields (user profile, project settings)
- The record has sub-sections, related data, or tabs
- The edit is a primary workflow, not a side action
- URL-based navigation to the record is useful (deep linking)

**Use Modal Edit when:**
- Editing 3-6 fields that form a logical group
- The user needs to see the list/table behind for context
- The edit is a secondary action, not the primary page purpose
- Changes are saved/cancelled as a unit

**Default:** Inline Edit for 1-2 fields. Modal Edit for 3-6 fields. Detail Page for complex records with many fields.

---

### Breadcrumbs: When to Show vs Hide

**When this comes up:** The page hierarchy is more than one level deep.

**Ask the user:** "Is this a linear flow (wizard/checkout) or a hierarchical navigation (folder > subfolder > file)?"

**Use Breadcrumbs when:**
- Navigation depth is 3+ levels
- Users need to jump back to any ancestor level
- The hierarchy is meaningful (folders, categories, nested settings)
- The page is reached via drill-down navigation

**Hide Breadcrumbs when:**
- The page is a top-level view (dashboard, home)
- Navigation depth is 1-2 levels and a back button suffices
- The flow is linear/sequential (wizard steps)
- The surface is a modal or drawer (use the modal's own back/close)

**Default:** Show breadcrumbs at 3+ navigation levels. Hide on top-level pages and in overlays.

---

## Actions

### Inline Action vs Toolbar Action vs Context Menu

**When this comes up:** The user needs to provide actions on items in a list or table.

**Ask the user:** "Are these actions used frequently, or are they secondary operations users perform occasionally?"

**Use Inline Actions when:**
- There are 1-3 primary actions per item (Edit, Delete, View)
- Actions are used frequently and need one-click access
- The action applies to a single item only
- Space permits visible buttons or icon buttons in each row

**Use Toolbar Actions when:**
- Actions apply to one or more selected items (bulk actions)
- The toolbar appears on selection (contextual toolbar)
- There are 3-5 actions that apply uniformly across selected items
- Actions include operations like Export, Move, Archive

**Use Context Menu when:**
- There are 4+ actions per item and showing all inline would clutter the row
- Actions are secondary or infrequently used
- The action list varies based on item type or state
- Right-click or three-dot menu is the expected pattern

**Default:** Inline for 1-3 frequent actions. Context menu (three-dot) for 4+ or infrequent actions. Toolbar for bulk/multi-select operations.

---

### Confirmation Dialog vs Inline Confirm vs Toast

**When this comes up:** The user needs feedback or confirmation for an action.

**Ask the user:** "Is this action destructive or irreversible?"

**Use Confirmation Dialog when:**
- The action is destructive and irreversible (delete, remove permanently)
- The consequences are significant (billing changes, data loss)
- The user needs to understand what will happen before proceeding
- The dialog should name the specific item being affected

**Use Inline Confirm when:**
- The action is mildly risky but reversible (archive, remove from list)
- A quick "Are you sure?" with Confirm/Cancel replaces the button in place
- The confirmation should be lightweight and fast

**Use Toast when:**
- The action succeeded and just needs acknowledgement
- The action is easily reversible (with an "Undo" link in the toast)
- No confirmation is needed before the action, only feedback after
- The feedback should not block the user's workflow

**Default:** Confirmation Dialog for destructive/irreversible actions. Toast with Undo for reversible actions. Inline Confirm for moderate-risk actions.

---

### Single CTA vs Split Button vs Button Group

**When this comes up:** A form or page needs one or more action buttons.

**Ask the user:** "Is there one primary action with variations, or multiple distinct actions?"

**Use Single CTA when:**
- There is one clear primary action (Save, Submit, Create)
- Secondary actions (Cancel, Reset) use plain or text buttons
- The form has a single submission path

**Use Split Button when:**
- There is one primary action with alternative variations (Save & Close, Save & New, Save as Draft)
- The primary action is used most often, and alternatives are accessed via dropdown
- You want to reduce button clutter while preserving access to variants

**Use Button Group when:**
- There are 2-4 distinct peer actions of similar importance (Approve, Reject, Defer)
- No single action is clearly dominant
- Actions represent different outcomes, not variations of one action

**Default:** Single CTA for standard form submissions. Split Button when there are action variants. Button Group for peer-level distinct actions.

---

## Layout

### Single Column vs Two Column vs Three Column

**When this comes up:** The user needs a page layout and hasn't specified the structure.

**Ask the user:** "What's the primary content type -- a form, a dashboard, or a content page with a sidebar?"

**Use Single Column when:**
- Content is a form or linear reading flow
- The page is a wizard, checkout, or focused task
- Mobile-first design is the priority
- Content width should be constrained for readability (max ~720px)

**Use Two Column when:**
- There is primary content + supporting sidebar (detail + properties, list + preview)
- A master-detail pattern is needed (list on left, detail on right)
- Settings pages with sidebar navigation + content area
- Standard split: 2/3 + 1/3 or 3/4 + 1/4

**Use Three Column when:**
- The app is a communication tool (sidebar + list + detail, like email)
- There are navigation, content, and properties panels simultaneously
- Information density is high and screen real estate is large (desktop-only)

**Default:** Single Column for forms and focused tasks. Two Column for content + sidebar patterns. Three Column only for communication/productivity apps on desktop.

---

### Cards Grid vs Table for Listings

**When this comes up:** The user wants to display a collection and you need to decide the layout.

**Ask the user:** "Do users need to compare data across items, or browse items visually?"

**Use Cards Grid when:**
- Items have a visual element (thumbnail, avatar, icon, preview)
- Items have 2-4 key attributes
- The grid should feel browsable (products, projects, team members)
- The layout needs to work across breakpoints (cards reflow naturally)

**Use Table when:**
- Users need to compare specific values across rows
- Items have 5+ attributes that matter for decision-making
- Sorting and filtering by columns is expected
- Data is dense and uniform (logs, transactions, records)

**Default:** Cards Grid for visual/browsable content. Table for data-heavy, comparable records.

---

### Sidebar Layout vs Tab Layout for Settings

**When this comes up:** The user needs a settings or configuration page.

**Ask the user:** "How many settings categories are there?"

**Use Sidebar Layout when:**
- There are 6+ categories of settings
- Categories are grouped into sections (General, Security, Integrations, etc.)
- Users navigate between categories frequently
- The settings page is a persistent part of the app

**Use Tab Layout when:**
- There are 2-5 categories of settings
- Categories are flat (not grouped into sections)
- The settings area is accessed occasionally
- Horizontal space is available for tab labels

**Default:** Sidebar Layout for 6+ categories. Tab Layout for 2-5 categories.

---

## Feedback

### Toast vs Alert Banner vs Inline Message

**When this comes up:** The user needs to communicate status or feedback to the user.

**Ask the user:** "Should the message interrupt the user, persist on the page, or appear temporarily?"

**Use Toast when:**
- The message is transient (success confirmation, action completed)
- The user does not need to take action based on the message
- The message should auto-dismiss after 3-5 seconds
- The feedback is about a completed action, not a page state

**Use Alert Banner when:**
- The message applies to the entire page or section (maintenance notice, permission warning)
- The message should persist until dismissed or the condition resolves
- The user may need to take action (upgrade plan, verify email)
- Severity is important to communicate (info, warning, error)

**Use Inline Message when:**
- The message relates to a specific field or section, not the whole page
- Validation feedback on a form field (error, success, hint)
- The message should appear next to the relevant content
- The feedback is contextual and position-dependent

**Default:** Toast for transient success/info messages. Alert Banner for page-level persistent messages. Inline Message for field-level or section-level contextual feedback.

---

### Skeleton vs Shimmer vs Spinner for Loading

**When this comes up:** Content is loading and the user needs a placeholder.

**Ask the user:** "Is the layout of the content known before loading, or is it unpredictable?"

**Use Skeleton when:**
- The layout is known and can be represented with placeholder shapes
- The page has been loaded before and the structure is cached
- You want to reduce perceived loading time
- Static gray shapes represent where content will appear

**Use Shimmer when:**
- Same as Skeleton but with an animated gradient sweep
- The loading time is 1-3 seconds (animation adds perceived progress)
- The page is loading for the first time and you want to signal activity

**Use Spinner when:**
- The layout is unknown or highly dynamic
- The loading state is brief (under 1 second) or very long (show with a message)
- The loading applies to a small section, button, or inline element
- A full-page or section-level loading indicator is needed without layout placeholders

**Default:** Shimmer for first-load content with known layout. Skeleton for subsequent loads of cached layouts. Spinner for brief or unpredictable loading states.

---

### Empty State: Illustration vs Simple Text

**When this comes up:** A page or section has no data to display.

**Ask the user:** "Is this a primary page that the user will see often, or a secondary/nested section?"

**Use Illustration + CTA when:**
- The page is a primary view (first-time dashboard, empty project list)
- The user needs to be guided to take their first action
- The empty state is a key onboarding moment
- There is a clear CTA (Create Project, Import Data, Invite Team)

**Use Simple Text when:**
- The section is nested or secondary (empty tab, no search results)
- The empty state is temporary and common (filtered list with no matches)
- An illustration would feel heavy or disproportionate
- A short message like "No results found" suffices

**Default:** Illustration + CTA for primary pages and onboarding moments. Simple Text for secondary sections and filtered-empty states.

---

### Progress Bar vs Progress Circle

**When this comes up:** The user needs to show progress toward completion.

**Ask the user:** "Is the progress part of a larger content area, or a compact indicator?"

**Use Progress Bar when:**
- Progress is shown within a content section (file upload, step completion)
- The bar can span the full width of a card or section
- Multiple progress indicators are stacked (storage usage, plan limits)
- Progress is the primary information in the area

**Use Progress Circle when:**
- Space is compact (inside a card, next to a label, in a table cell)
- The progress represents a single metric (task completion: 72%)
- The indicator needs to sit alongside other content without taking full width
- A circular shape fits the visual rhythm of the surrounding UI

**Default:** Progress Bar for wide, section-level progress. Progress Circle for compact, inline progress indicators.
