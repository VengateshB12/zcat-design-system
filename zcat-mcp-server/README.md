# zcat MCP server

Serves the zcat (ZCatalyst) design-system reference corpus over MCP, so any
MCP-capable IDE can build Figma screens from one hosted source of truth.

**Live:** `https://zcat.catalystappsail.in`

## Connect

**One command, any editor:**

```bash
curl -fsSL https://zcat.catalystappsail.in/install | bash
```

Detects Claude Code, VS Code, Cursor and Windsurf, and registers the server in
each one's **user** profile so it works in every project. Restart the editor
afterwards. This is the only thing to send a teammate.

The script verifies every step rather than trusting exit codes — `cursor
--add-mcp` in particular exits 0 while writing nothing to the user config, so
Cursor is configured by merging `~/.cursor/mcp.json` directly (existing servers
are preserved, and a `.bak` is written first).

Claude's desktop app is the one exception: remote servers are added through
Settings → Connectors → Add custom connector, which has no config file to
automate.

<details>
<summary>Manual setup, if you prefer</summary>

### Claude Code

```bash
claude mcp add --transport http --scope user zcat https://zcat.catalystappsail.in/mcp
```

Use `--scope user`. A `local`-scope entry is per-directory and will shadow it,
producing a "defined in multiple scopes" warning.

### VS Code (GitHub Copilot)

Requires VS Code 1.102+ and Copilot Chat in **agent mode**. Either:

- **This workspace only** — `.vscode/mcp.json` is already committed here, so
  opening the folder is enough. VS Code shows a Start/Trust prompt on first use.
- **Every workspace** — Command Palette → `MCP: Open User Configuration`, then
  add the same `servers` block.

```json
{
  "servers": {
    "zcat": {
      "type": "http",
      "url": "https://zcat.catalystappsail.in/mcp"
    }
  }
}
```

Confirm with Command Palette → `MCP: List Servers` (should read Running), then
open the tools picker in the Chat view — the 10 `zcat_*` tools appear there.
Tools only fire in agent mode; Ask and Edit modes ignore them.

### Cursor / Windsurf / Claude Desktop

Same URL, same shape. Cursor uses `~/.cursor/mcp.json` with a `mcpServers` key
and a bare `"url"` (no `type`); Claude Desktop configures HTTP servers through
Settings → Connectors.

</details>

## Using it

**Plain language is the way in.** It works in every client:

> Using the zcat MCP tools, design a Catalyst user management page with a table,
> search, filters, and an add-user button. Call `zcat_get_workflow` first and
> follow it.

Say "using zcat" and name `zcat_get_workflow` on the first message. The server
also sends an `instructions` field telling clients to call it first, so most
will do so unprompted.

### The `zcat` prompt (some clients only)

The server registers an MCP prompt carrying the whole workflow and hard rules.
It takes an optional `screen` argument — given one it starts building, given
nothing it asks first.

| Client | Slash command |
|---|---|
| Claude Code **terminal** | `/mcp__zcat__zcat` |
| VS Code | type `/`, pick `zcat` from the picker |
| Claude **desktop app** | not supported — *"Some commands only work in the Claude Code terminal"* |

**MCP prompts are not universally surfaced as slash commands.** Do not tell
users the prompt is the entry point — point them at plain language, and treat
the slash command as a convenience where it happens to exist.

## Tools

| Tool | Purpose |
|---|---|
| `zcat_get_workflow` | The build workflow. Call first for any screen task. |
| `zcat_get_hard_rules` | Non-negotiables: no raw hex, even-number spacing, min font size, default radius. |
| `zcat_search_components` | Find components by name, category, or intent. |
| `zcat_get_component` | Full spec: properties, variants, tokens, when to use. |
| `zcat_get_component_key` | Figma key + correct import call. Use before every import. |
| `zcat_get_design_tokens` | Figma variable IDs for color, spacing, radius, type. |
| `zcat_get_decision_rules` | Which component to pick when several could work. |
| `zcat_get_sample_data` | Realistic content — never lorem ipsum. |
| `zcat_get_layout` | `catalyst` console layout, or `generic` templates. |
| `zcat_get_wireframe_styles` | CSS for the low-fi approval step. |

`zcat_get_component_key` matters most: `component_set` needs
`importComponentSetByKeyAsync(...).defaultVariant.createInstance()` while
`component` needs `importComponentByKeyAsync(...).createInstance()`. Using the
wrong one fails.

## Deploy

Two environments, and the CLI only reaches one of them.

```bash
./deploy.sh
```

Syncs the reference corpus, deploys to **Development**, waits for health. Pass a
path if the reference folder isn't at `~/Desktop/AI Automation`.

| Environment | URL | Deployed by |
|---|---|---|
| Development | `https://zcat.development.catalystappsail.in` | `./deploy.sh` |
| Production | `https://zcat.catalystappsail.in` | Console → **Deploy to Production** |

`catalyst deploy` targets Development only — there is no CLI flag for
Production. So shipping a change to users is always two steps: run
`./deploy.sh`, then promote in the Catalyst console. **Until you promote, users
are still on the old build** even though the CLI said success.

Production is the URL to hand out. Development is for verifying a change before
everyone sees it.

`sync-data.sh` copies 8 files from the reference system into `appsail/data/`. It
only ever reads from the reference folder, which is source of truth and
read-only. **The hosted server serves this snapshot** — edits to the reference
system do nothing until a sync + deploy.

## Test

```bash
cd appsail && node test-mcp.mjs https://zcat.catalystappsail.in
```

Connects as a real MCP client and exercises all 10 tools. Omit the URL to test a
local server on port 9000.

## Notes for whoever debugs this next

**AppSail scales to zero.** "0 live instances" in the console is normal when
idle, not a crash. The first request after a quiet period is a cold start.

**Startup command lives in `appsail/app-config.json`.** A stray `app-config.json`
at the repo root once shadowed it, carrying the `catalyst init` placeholder:

```
"command": "echo Please specify the start-up command in the app-config.json file..."
```

AppSail dutifully ran the `echo`, the process exited, no port was bound, every
request 503'd — and the log line looked like a complaint about missing config
rather than the command itself. There is now no root `app-config.json`, and there
should not be one.

**The port must bind within 10 seconds.** `server.js` calls `app.listen()` before
loading any data; caches warm afterwards in `setImmediate`.

**The SDK is not ESM-only.** It ships `dist/cjs`, so `require()` works fine on
Node 20. Transport is stateless streamable HTTP — a fresh server per request, no
session affinity, which is what makes scale-to-zero and multiple instances safe.
SSE would need affinity and is the legacy transport.
