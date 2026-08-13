/**
 * End-to-end MCP client check against a zcat-mcp endpoint.
 * Usage: node mcp-test.mjs <base-url>
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const base = process.argv[2] || "http://localhost:9000";
const url = new URL("/mcp", base);

const client = new Client({ name: "zcat-test", version: "1.0.0" });
await client.connect(new StreamableHTTPClientTransport(url));

console.log(`connected -> ${url}\n`);

const { tools } = await client.listTools();
console.log(`TOOLS (${tools.length}):`);
for (const t of tools) console.log(`  - ${t.name}`);

const preview = (r, n = 200) => {
  const text = r.content.map((c) => c.text).join("").replace(/\s+/g, " ");
  return text.slice(0, n) + (text.length > n ? "…" : "");
};

const checks = [
  ["zcat_get_component_key", { name: "Button" }],
  ["zcat_get_component_key", { name: "drop down" }],
  ["zcat_search_components", { query: "table", limit: 3 }],
  ["zcat_get_component", { name: "Badges" }],
  ["zcat_get_hard_rules", {}],
  ["zcat_get_workflow", {}],
  ["zcat_get_design_tokens", { section: "radius" }],
  ["zcat_get_decision_rules", {}],
  ["zcat_get_sample_data", {}],
  ["zcat_get_layout", { product: "catalyst" }],
  ["zcat_get_layout", { product: "generic" }],
  ["zcat_get_wireframe_styles", {}],
];

console.log("\nCALLS:");
let failed = 0;
for (const [name, args] of checks) {
  try {
    const r = await client.callTool({ name, arguments: args });
    const label = `${name}(${JSON.stringify(args)})`;
    if (r.isError) {
      failed++;
      console.log(`  FAIL ${label}\n       ${preview(r)}`);
    } else {
      console.log(`  ok   ${label}\n       ${preview(r, 150)}`);
    }
  } catch (err) {
    failed++;
    console.log(`  FAIL ${name} -> ${err.message}`);
  }
}

await client.close();
console.log(`\n${failed === 0 ? "ALL PASS" : `${failed} FAILED`}`);
process.exit(failed === 0 ? 0 : 1);
