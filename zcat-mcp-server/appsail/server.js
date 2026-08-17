/**
 * zcat MCP server
 *
 * Serves the zcat design-system reference corpus (component catalog, design
 * tokens, decision rules, layouts, sample data, build workflow) over MCP so any
 * MCP-capable IDE can drive Figma builds from the same source of truth.
 *
 * Transport: streamable HTTP, stateless — a fresh server+transport per request,
 * so requests can land on any AppSail instance without session affinity.
 */

const path = require("path");
const fs = require("fs");
const express = require("express");

const PORT = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000;
const IS_LOCAL = !process.env.X_ZOHO_CATALYST_LISTEN_PORT;
const DATA_DIR = path.join(__dirname, "data");

const app = express();
app.use(express.json({ limit: "4mb" }));

const LANDING_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>zcat MCP server</title>
<style>
  :root { color-scheme: light dark; --fg:#1a1a1a; --muted:#666; --bg:#fff;
          --card:#f6f6f7; --border:#e4e4e7; --accent:#2f6feb; }
  @media (prefers-color-scheme: dark) {
    :root { --fg:#e8e8ea; --muted:#9a9aa2; --bg:#151517;
            --card:#1e1e21; --border:#2e2e33; --accent:#6f9bf5; }
  }
  * { box-sizing: border-box; }
  body { margin:0; padding:48px 24px; background:var(--bg); color:var(--fg);
         font:16px/1.6 ui-sans-serif,-apple-system,"Segoe UI",sans-serif; }
  main { max-width:680px; margin:0 auto; }
  h1 { font-size:24px; margin:0 0 4px; }
  h2 { font-size:15px; text-transform:uppercase; letter-spacing:.06em;
       color:var(--muted); margin:36px 0 12px; }
  p { margin:0 0 16px; }
  .sub { color:var(--muted); margin-bottom:32px; }
  .ok { display:inline-block; padding:2px 10px; border-radius:99px; font-size:13px;
        background:color-mix(in srgb, green 18%, transparent); color:inherit; }
  pre { background:var(--card); border:1px solid var(--border); border-radius:6px;
        padding:12px 14px; overflow-x:auto; margin:0 0 12px; }
  code { font:14px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace; }
  ul { padding-left:20px; margin:0 0 16px; }
  li { margin-bottom:6px; }
  a { color:var(--accent); }
  .note { border-left:3px solid var(--border); padding-left:14px; color:var(--muted);
          font-size:15px; }
</style>
</head>
<body>
<main>
  <h1>zcat MCP server <span class="ok">running</span></h1>
  <p class="sub">The ZCatalyst design system, served to your IDE. Nothing to install.</p>

  <p>This URL is a Model Context Protocol endpoint, not a website &mdash; it answers
  <code>POST</code>, so a browser cannot use it. Add it to your editor instead.</p>

  <h2>Install &mdash; one command</h2>
  <pre><code>curl -fsSL https://zcat.catalystappsail.in/install | bash</code></pre>
  <p>Configures every editor found on your machine &mdash; Claude Code, VS Code,
  Cursor, Windsurf &mdash; in the user profile, so it works in every project.
  Restart your editor afterwards.</p>
  <p class="note">In VS Code and Copilot, MCP tools only fire in
  <strong>agent mode</strong>. Ask and Edit modes ignore them.</p>

  <h2>Or add it by hand</h2>
  <pre><code>{
  "servers": {
    "zcat": {
      "type": "http",
      "url": "https://zcat.catalystappsail.in/mcp"
    }
  }
}</code></pre>

  <h2>Start designing</h2>
  <p>Just ask, in plain language. This works in every client:</p>
  <pre><code>Using the zcat MCP tools, design a Catalyst user management
page with a table, search, filters and an add-user button.
Call zcat_get_workflow first and follow it.</code></pre>
  <p class="note">There is also a <code>zcat</code> prompt, but slash commands
  for MCP prompts only appear in some clients &mdash; the Claude Code terminal
  (<code>/mcp__zcat__zcat</code>) and the VS Code <code>/</code> picker. The
  Claude desktop app does not support them. Plain language always works.</p>

  <h2>What you get</h2>
  <ul>
    <li><code>zcat</code> <em>(prompt)</em> &mdash; start a screen build</li>
    <li><code>zcat_get_workflow</code> &mdash; the screen-build workflow</li>
    <li><code>zcat_get_sources</code> &mdash; available component sources (primary + legacy)</li>
    <li><code>zcat_get_hard_rules</code> &mdash; non-negotiables</li>
    <li><code>zcat_search_components</code> &mdash; find a component</li>
    <li><code>zcat_get_component</code> &mdash; full spec</li>
    <li><code>zcat_get_component_key</code> &mdash; Figma key + import method</li>
    <li><code>zcat_get_design_tokens</code> &mdash; variable IDs</li>
    <li><code>zcat_get_decision_rules</code> &mdash; which component to pick</li>
    <li><code>zcat_get_sample_data</code> &mdash; realistic content</li>
    <li><code>zcat_get_layout</code> &mdash; page layouts</li>
    <li><code>zcat_get_design_workflow</code> &mdash; pre-build analysis &amp; spec workflow</li>
    <li><code>zcat_get_screenshot_patterns</code> &mdash; production UI patterns</li>
    <li><code>zcat_get_wireframe_styles</code> &mdash; wireframe CSS</li>
  </ul>

  <h2>Check it</h2>
  <p>Once connected, ask your assistant for the zcat component key for Button.
  It should call a tool and answer <code>5819eb82&hellip;</code> &mdash; if it answers
  without calling anything, it is guessing and the server is not wired in.</p>
  <p>Server status: <a href="/health">/health</a></p>
</main>
</body>
</html>`;

/* ------------------------------------------------------------------ *
 * Bind the port first.
 *
 * AppSail kills an app that has not bound its port within 10 seconds, so
 * nothing above this line may do real work. The MCP wiring below attaches to
 * an already-listening server.
 * ------------------------------------------------------------------ */
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "zcat-mcp", mcp: mcpReady ? "ready" : "loading" });
});

// Anyone handed this URL will paste it into a browser first. `/mcp` correctly
// rejects GET, which reads as "the server is down" — so `/` explains what this
// is and how to connect, rather than serving Express's "Cannot GET /".
app.get("/", (req, res) => {
  res.type("html").send(LANDING_PAGE);
});

// One-command install: `curl -fsSL <host>/install | bash`. Nobody hand-edits
// JSON, so this registers the server in every editor found on the machine.
app.get("/install", (req, res) => {
  res.type("text/plain").sendFile(path.join(__dirname, "install.sh"));
});

let mcpReady = false;

app.listen(PORT, () => {
  console.log(`zcat-mcp listening on ${PORT} (${IS_LOCAL ? "local" : "production"})`);
});

/* ------------------------------------------------------------------ *
 * Data access — read once, cache in memory.
 * ------------------------------------------------------------------ */
const cache = new Map();

function readText(file) {
  if (!cache.has(file)) {
    cache.set(file, fs.readFileSync(path.join(DATA_DIR, file), "utf8"));
  }
  return cache.get(file);
}

function readJson(file) {
  const key = `json:${file}`;
  if (!cache.has(key)) cache.set(key, JSON.parse(readText(file)));
  return cache.get(key);
}

const manifest = () => readJson("component-manifest.json");

function importMethod(type) {
  if (type === "component_set") {
    return "importComponentSetByKeyAsync(key) then .defaultVariant.createInstance()";
  }
  if (type === "component") {
    return "importComponentByKeyAsync(key) then .createInstance()";
  }
  return "status=manual — build with frames, no import available";
}

/** Resolve a loose UI name ("button", "dropdown") to its keyMap entry.
 *  source: "primary" (default) or "legacy" — swaps the componentKey. */
function lookupKey(name, source) {
  const map = manifest().componentKeyMap;
  const wanted = name.trim().toLowerCase();

  let hit = null;
  for (const [k, v] of Object.entries(map)) {
    if (k.startsWith("_") || typeof v !== "object") continue;
    if (k.toLowerCase() === wanted || String(v.figmaName || "").toLowerCase() === wanted) {
      hit = { key: k, ...v };
      break;
    }
  }
  if (!hit) {
    for (const [k, v] of Object.entries(map)) {
      if (k.startsWith("_") || typeof v !== "object") continue;
      const hay = `${k} ${v.figmaName || ""}`.toLowerCase();
      if (hay.includes(wanted) || wanted.includes(k.toLowerCase())) {
        hit = { key: k, ...v };
        break;
      }
    }
  }
  if (!hit) return null;

  if (source === "legacy") {
    const legacy = manifest().legacySource;
    if (legacy && legacy.componentKeyMap && legacy.componentKeyMap[hit.key]) {
      hit = { ...hit, componentKey: legacy.componentKeyMap[hit.key], _source: "legacy" };
    }
  }
  return hit;
}

const asText = (payload) => ({
  content: [
    {
      type: "text",
      text: typeof payload === "string" ? payload : JSON.stringify(payload, null, 2),
    },
  ],
});

/* ------------------------------------------------------------------ *
 * MCP wiring
 * ------------------------------------------------------------------ */
const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const {
  StreamableHTTPServerTransport,
} = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const { z } = require("zod");

function buildServer() {
  const server = new McpServer(
    { name: "zcat", version: "1.0.0" },
    {
      instructions:
        "Reference system for the zcat design system (ZCatalyst). Call " +
        "zcat_get_workflow first for any screen-building task, then " +
        "zcat_get_component_key before creating any UI element in Figma.",
    }
  );

  server.registerTool(
    "zcat_get_workflow",
    {
      title: "Get the zcat build workflow",
      description:
        "The complete step-by-step workflow for turning a wireframe, PRD, or " +
        "description into a Figma screen. Read this before any design task.",
      inputSchema: {},
    },
    async () => asText(readText("workflow.md"))
  );

  server.registerTool(
    "zcat_get_hard_rules",
    {
      title: "Get hard rules and foundations",
      description:
        "Non-negotiable build rules (no hardcoded hex, even-number spacing, " +
        "minimum font size, default radius) plus the foundation token groups.",
      inputSchema: {},
    },
    async () => {
      const m = manifest();
      return asText({
        systemName: m.systemName,
        figmaFileKey: m.figmaFileKey,
        libraryKey: m.libraryKey,
        themeModes: m.themeModes,
        hardRules: m.hardRules,
        foundations: m.foundations,
      });
    }
  );

  server.registerTool(
    "zcat_get_sources",
    {
      title: "Get available component sources",
      description:
        "Lists the available component file sources (primary and legacy) with " +
        "their library keys and unique features. Call this to help the user " +
        "choose which source to use.",
      inputSchema: {},
    },
    async () => {
      const m = manifest();
      return asText({
        primary: {
          name: m.systemName,
          figmaFileKey: m.figmaFileKey,
          libraryKey: m.libraryKey,
          uniqueFeatures: [
            "AI-friendly component descriptions",
            "Container Header (composite action bar)",
            "Sidebar List Panel (composite sidebar)",
            "No Left Menu layout variant (1489px container)",
            "Loader component (replaces manual spinner)",
            "Search, Input Group, File Upload, Link Box, Alerts, Date Picker, Code Block",
            "All variables bound to colors/spacing",
          ],
        },
        legacy: m.legacySource,
      });
    }
  );

  server.registerTool(
    "zcat_search_components",
    {
      title: "Search zcat components",
      description:
        "Search the component catalog by name, category, or intent. Returns " +
        "matches with their Figma component key and the correct import method. " +
        "Use this before building any UI element.",
      inputSchema: {
        query: z.string().describe("Search term, e.g. 'button', 'table', 'input'"),
        limit: z.number().int().min(1).max(50).optional().describe("Max results (default 10)"),
      },
    },
    async ({ query, limit = 10 }) => {
      const q = query.trim().toLowerCase();
      const words = q.split(/\s+/).filter(Boolean);
      const scored = manifest()
        .components.map((c) => {
          const name = String(c.name || "").toLowerCase();
          const aliases = (c.searchAliases || []).join(" ").toLowerCase();
          const haystack = [c.name, c.category, c.subcategory, c.description, ...(c.whenToUse || []), aliases]
            .join(" ")
            .toLowerCase();

          let score = 0;
          if (name === q) score = 100;
          else if (name.startsWith(q)) score = 80;
          else if (name.includes(q)) score = 60;
          else if (haystack.includes(q)) score = 30;
          else {
            const matched = words.filter(w => haystack.includes(w));
            if (matched.length > 0) score = 10 + (matched.length / words.length) * 20;
          }
          if (c.deprecated) score = Math.max(0, score - 30);
          return { c, score };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

      if (!scored.length) {
        return asText(`No zcat component matches "${query}". Try a broader term.`);
      }

      return asText(
        scored.map(({ c }) => {
          const km = lookupKey(c.name);
          return {
            name: c.name,
            category: c.category,
            subcategory: c.subcategory,
            description: c.description,
            componentKey: km ? km.componentKey : null,
            type: km ? km.type : (c.figma && c.figma.status) || "manual",
            importMethod: importMethod(km ? km.type : null),
            ...(c.deprecated ? { deprecated: true, deprecatedBy: c.deprecatedBy } : {}),
          };
        })
      );
    }
  );

  server.registerTool(
    "zcat_get_component",
    {
      title: "Get full component detail",
      description:
        "Full spec for one component: properties, variants, tokens, when to " +
        "use / not use, related components, and its Figma import key.",
      inputSchema: {
        name: z.string().describe("Component name, e.g. 'Buttons', 'Table', 'Drop down'"),
      },
    },
    async ({ name }) => {
      const wanted = name.trim().toLowerCase();
      const comps = manifest().components;
      const hit =
        comps.find((c) => String(c.name).toLowerCase() === wanted) ||
        comps.find((c) => String(c.name).toLowerCase().includes(wanted));

      const km = lookupKey(name);

      if (!hit && !km) {
        return asText(`No zcat component named "${name}". Use zcat_search_components to find it.`);
      }

      return asText({
        ...(hit || { name }),
        componentKey: km ? km.componentKey : null,
        importType: km ? km.type : null,
        importMethod: importMethod(km ? km.type : null),
      });
    }
  );

  server.registerTool(
    "zcat_get_component_key",
    {
      title: "Get a component's Figma key and import method",
      description:
        "Resolve a UI element name to its Figma componentKey plus the correct " +
        "import call. component_set and component require different APIs — " +
        "using the wrong one fails. Call this before every component import. " +
        "Defaults to the primary (AI-Understandable) source; pass source='legacy' " +
        "to get the original ZCatalyst key instead.",
      inputSchema: {
        name: z.string().describe("UI element name, e.g. 'Button', 'Check Box', 'Tabs'"),
        source: z.enum(["primary", "legacy"]).optional().describe("Component source: 'primary' (default) or 'legacy'"),
      },
    },
    async ({ name, source }) => {
      const km = lookupKey(name, source);
      if (!km) {
        const available = Object.keys(manifest().componentKeyMap)
          .filter((k) => !k.startsWith("_"))
          .join(", ");
        return asText(`No key for "${name}".\n\nAvailable: ${available}`);
      }
      return asText({
        name: km.key,
        figmaName: km.figmaName,
        componentKey: km.componentKey,
        type: km.type,
        importMethod: importMethod(km.type),
        variants: km.variants || null,
        source: km._source || "primary",
      });
    }
  );

  server.registerTool(
    "zcat_get_design_tokens",
    {
      title: "Get design tokens",
      description:
        "Figma variable IDs for colors, spacing, radius, and typography. Every " +
        "color must be bound to one of these — never a raw hex.",
      inputSchema: {
        section: z
          .string()
          .optional()
          .describe("Optional filter, e.g. 'color', 'spacing', 'radius'"),
      },
    },
    async ({ section }) => {
      const doc = readText("design-tokens.md");
      if (!section) return asText(doc);

      const wanted = section.trim().toLowerCase();
      const blocks = doc
        .split(/\n(?=#{2,3} )/)
        .filter((b) => b.toLowerCase().includes(wanted));

      return asText(blocks.length ? blocks.join("\n\n") : doc);
    }
  );

  server.registerTool(
    "zcat_get_decision_rules",
    {
      title: "Get component selection rules",
      description:
        "Decision logic for ambiguous UI patterns — which component to reach " +
        "for when several could work (dropdown vs autocomplete, modal vs drawer).",
      inputSchema: {
        topic: z.string().optional().describe("Optional topic filter, e.g. 'modal', 'table'"),
      },
    },
    async ({ topic }) => {
      const doc = readText("decision-rules.md");
      if (!topic) return asText(doc);

      const wanted = topic.trim().toLowerCase();
      const blocks = doc
        .split(/\n(?=#{2,3} )/)
        .filter((b) => b.toLowerCase().includes(wanted));

      return asText(blocks.length ? blocks.join("\n\n") : doc);
    }
  );

  server.registerTool(
    "zcat_get_sample_data",
    {
      title: "Get realistic sample data",
      description:
        "Realistic content for populating screens — names, emails, dates, " +
        "statuses, table rows. Never use lorem ipsum in a zcat screen.",
      inputSchema: {
        kind: z.string().optional().describe("Optional filter, e.g. 'users', 'table', 'dates'"),
      },
    },
    async ({ kind }) => {
      const doc = readText("sample-data.md");
      if (!kind) return asText(doc);

      const wanted = kind.trim().toLowerCase();
      const blocks = doc.split(/\n(?=#{2,3} )/).filter((b) => b.toLowerCase().includes(wanted));
      return asText(blocks.length ? blocks.join("\n\n") : doc);
    }
  );

  server.registerTool(
    "zcat_get_layout",
    {
      title: "Get page layout spec",
      description:
        "Layout structure for the target product. 'catalyst' returns the " +
        "Catalyst console layout with both variants: Default (1259px container, " +
        "with sidebar) and No Left Menu (1489px container, no sidebar). " +
        "'generic' returns reusable layout templates.",
      inputSchema: {
        product: z
          .enum(["catalyst", "generic"])
          .describe("'catalyst' for the Catalyst console, 'generic' for other products"),
      },
    },
    async ({ product }) =>
      product === "catalyst"
        ? asText(readText("catalyst-layout.md"))
        : asText(readJson("generic-layouts.json"))
  );

  server.registerTool(
    "zcat_get_design_workflow",
    {
      title: "Get design analysis workflow",
      description:
        "Pre-build analysis workflow: scan wireframes, write page specs, build " +
        "with autonomous verification. Covers wireframe interpretation rules, " +
        "spec file template, design uniforms, and the verify/fix loop.",
      inputSchema: {
        section: z
          .string()
          .optional()
          .describe("Optional filter, e.g. 'wireframe', 'spec', 'phase 2', 'verify'"),
      },
    },
    async ({ section }) => {
      const doc = readText("design-analysis-workflow.md");
      if (!section) return asText(doc);

      const wanted = section.trim().toLowerCase();
      const blocks = doc
        .split(/\n(?=#{2,3} )/)
        .filter((b) => b.toLowerCase().includes(wanted));

      return asText(blocks.length ? blocks.join("\n\n") : doc);
    }
  );

  server.registerTool(
    "zcat_get_screenshot_patterns",
    {
      title: "Get screenshot design patterns",
      description:
        "Production Catalyst UI patterns extracted from screenshots. Maps page " +
        "types to specific screenshots and describes exact layout patterns " +
        "(stat cards, action bars, tables, master-detail, etc.).",
      inputSchema: {
        pageType: z
          .string()
          .optional()
          .describe("Optional page type filter, e.g. 'list', 'detail', 'popup', 'dashboard'"),
      },
    },
    async ({ pageType }) => {
      const doc = readText("screenshot-design-patterns.md");
      if (!pageType) return asText(doc);

      const wanted = pageType.trim().toLowerCase();
      const blocks = doc
        .split(/\n(?=#{2,3} )/)
        .filter((b) => b.toLowerCase().includes(wanted));

      return asText(blocks.length ? blocks.join("\n\n") : doc);
    }
  );

  server.registerTool(
    "zcat_get_wireframe_styles",
    {
      title: "Get wireframe CSS",
      description:
        "CSS for rendering low-fidelity wireframes during the approval step, " +
        "before anything is built in Figma.",
      inputSchema: {},
    },
    async () => asText(readText("wireframe-styles.css"))
  );

  /* ---------------------------------------------------------------- *
   * Prompt
   *
   * Tools alone give a client capability but no entry point — a designer
   * has no way to *start* anything. This prompt is that entry point, and
   * because it lives on the server it reaches every client from the URL
   * alone, with nothing installed per machine.
   * ---------------------------------------------------------------- */
  server.registerPrompt(
    "zcat",
    {
      title: "Build a screen with zcat",
      description:
        "Start the zcat design workflow — turn a description, wireframe, PRD, " +
        "or screenshot into a Figma screen built from zcat components.",
      argsSchema: {
        screen: z
          .string()
          .optional()
          .describe("What to build, e.g. 'a user management page with a table and filters'"),
      },
    },
    ({ screen } = {}) => {
      const asked = screen && screen.trim();

      const text = [
        "You are building a Figma screen using the zcat design system (ZCatalyst).",
        "",
        asked
          ? `The screen to build: ${asked}`
          : "Ask the user what screen they want to build before doing anything else.",
        "",
        "Follow this workflow exactly:",
        "",
        readText("workflow.md"),
        "",
        "---",
        "",
        "Non-negotiable rules:",
        "",
        JSON.stringify(manifest().hardRules, null, 2),
        "",
        "---",
        "",
        "Use the zcat tools on this server rather than guessing:",
        "",
        "- `zcat_search_components` / `zcat_get_component` — find the right component",
        "- `zcat_get_component_key` — BEFORE importing anything into Figma. It returns",
        "  the componentKey and the correct import call. `component_set` and `component`",
        "  need different APIs and using the wrong one fails.",
        "- `zcat_get_design_tokens` — every colour binds to a variable, never a raw hex",
        "- `zcat_get_decision_rules` — when more than one component could work",
        "- `zcat_get_layout` — page structure for the target product",
        "- `zcat_get_sample_data` — realistic content, never lorem ipsum",
        "- `zcat_get_wireframe_styles` — for the low-fi approval step",
        "",
        "Never skip the wireframe approval step, and never build a UI element by hand",
        "when a zcat component exists for it.",
      ].join("\n");

      return {
        messages: [{ role: "user", content: { type: "text", text } }],
      };
    }
  );

  return server;
}

/* ------------------------------------------------------------------ *
 * Stateless streamable-HTTP endpoint
 * ------------------------------------------------------------------ */
app.post("/mcp", async (req, res) => {
  let server;
  let transport;
  try {
    server = buildServer();
    transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });

    // Tear down per-request objects once the response closes, so a long-lived
    // instance does not accumulate transports.
    res.on("close", () => {
      Promise.resolve(transport.close()).catch(() => {});
      Promise.resolve(server.close()).catch(() => {});
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error("MCP request failed:", err);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
});

// Stateless mode has no server-initiated stream and nothing to terminate.
const notAllowed = (req, res) =>
  res.status(405).json({
    jsonrpc: "2.0",
    error: { code: -32000, message: "Method not allowed — this server is stateless; use POST /mcp" },
    id: null,
  });

app.get("/mcp", notAllowed);
app.delete("/mcp", notAllowed);

/* Warm the caches so the first real request is not the one paying for I/O. */
setImmediate(() => {
  try {
    manifest();
    ["workflow.md", "design-tokens.md", "decision-rules.md", "sample-data.md", "design-analysis-workflow.md", "screenshot-design-patterns.md"].forEach(readText);
    mcpReady = true;
    console.log(`zcat-mcp ready — ${manifest().components.length} components loaded`);
  } catch (err) {
    console.error("Failed to warm data cache:", err);
  }
});
