#!/usr/bin/env bash
#
# zcat MCP — one-command install.
#
#   curl -fsSL https://zcat.catalystappsail.in/install | bash
#
# Detects every supported editor on this machine and registers the zcat MCP
# server in each one's *user* profile, so it works in every project. Editors
# that are not installed are skipped silently.
#
# Every step is verified after the fact — some editor CLIs exit 0 without
# writing anything, and a silent no-op is worse than a visible failure.

set -uo pipefail

URL="https://zcat.catalystappsail.in/mcp"
NAME="zcat"
MCP_JSON="{\"name\":\"$NAME\",\"type\":\"http\",\"url\":\"$URL\"}"

bold=$(tput bold 2>/dev/null || echo "")
dim=$(tput dim 2>/dev/null || echo "")
green=$(tput setaf 2 2>/dev/null || echo "")
yellow=$(tput setaf 3 2>/dev/null || echo "")
reset=$(tput sgr0 2>/dev/null || echo "")

ok()   { echo "  ${green}✓${reset} $1"; }
skip() { echo "  ${dim}—${reset} ${dim}$1${reset}"; }
warn() { echo "  ${yellow}!${reset} $1"; }

installed=0
manual=0

# Resolve a command, falling back to the CLI bundled inside a macOS .app —
# `code` and friends are frequently absent from PATH even when installed.
resolve() {
  if command -v "$1" >/dev/null 2>&1; then command -v "$1"; return 0; fi
  [ -x "$2" ] && { echo "$2"; return 0; }
  return 1
}

# Merge {"<key>": {"<NAME>": <entry>}} into a JSON file, creating it if absent
# and preserving everything already there. Backs up before writing.
#
#   merge_json <file> <top-level-key> <entry-json>
#
# Editors disagree on the entry shape: Cursor infers HTTP from a bare "url",
# Claude Code wants an explicit "type".
merge_json() {
  local file="$1" key="$2" entry="$3" runner=""
  command -v node    >/dev/null 2>&1 && runner="node"
  [ -z "$runner" ] && command -v python3 >/dev/null 2>&1 && runner="python3"
  [ -z "$runner" ] && return 2

  mkdir -p "$(dirname "$file")"
  [ -f "$file" ] && cp "$file" "$file.bak" 2>/dev/null

  if [ "$runner" = "node" ]; then
    node -e '
      const fs = require("fs");
      const [file, key, name, entry] = process.argv.slice(1);
      let cfg = {};
      try { cfg = JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) {}
      cfg[key] = cfg[key] || {};
      cfg[key][name] = JSON.parse(entry);
      fs.writeFileSync(file, JSON.stringify(cfg, null, 2) + "\n");
    ' "$file" "$key" "$NAME" "$entry" 2>/dev/null
  else
    python3 -c '
import json, sys
file, key, name, entry = sys.argv[1:5]
try:
    with open(file) as f: cfg = json.load(f)
except Exception:
    cfg = {}
cfg.setdefault(key, {})[name] = json.loads(entry)
with open(file, "w") as f:
    json.dump(cfg, f, indent=2)
    f.write("\n")
' "$file" "$key" "$NAME" "$entry" 2>/dev/null
  fi
}

# Did NAME actually land in the file?
verify_file() {
  grep -q "\"$NAME\"" "$1" 2>/dev/null
}

echo
echo "${bold}zcat MCP${reset} — the ZCatalyst design system, in your editor"
echo "${dim}$URL${reset}"
echo

# --- Claude Code -----------------------------------------------------------
# Two ways to be installed: the CLI, or the VS Code / JetBrains extension. The
# extension ships no `claude` binary, so PATH alone under-detects it — fall back
# to editing ~/.claude.json, which both read for user-scope servers.
CLAUDE_CFG="$HOME/.claude.json"

if command -v claude >/dev/null 2>&1; then
  # Clear every scope first: a stale entry in another scope shadows the new one
  # and Claude warns about conflicting endpoints.
  for scope in local project user; do
    claude mcp remove "$NAME" --scope "$scope" >/dev/null 2>&1
  done

  claude mcp add --transport http --scope user "$NAME" "$URL" >/dev/null 2>&1
  if claude mcp list 2>/dev/null | grep -q "$NAME"; then
    ok "Claude Code"
    installed=$((installed + 1))
  else
    warn "Claude Code — run manually: claude mcp add --transport http $NAME $URL"
    manual=$((manual + 1))
  fi
elif [ -f "$CLAUDE_CFG" ]; then
  merge_json "$CLAUDE_CFG" "mcpServers" "{\"type\":\"http\",\"url\":\"$URL\"}"
  case $? in
    2) warn "Claude Code — needs node or python3 to edit config; add $URL manually"
       manual=$((manual + 1)) ;;
    *) if verify_file "$CLAUDE_CFG"; then
         ok "Claude Code ${dim}(extension)${reset}"
         installed=$((installed + 1))
       else
         warn "Claude Code — could not write $CLAUDE_CFG"
         manual=$((manual + 1))
       fi ;;
  esac
else
  skip "Claude Code not found"
fi

# --- VS Code ---------------------------------------------------------------
VSCODE_CFG="$HOME/Library/Application Support/Code/User/mcp.json"
[ "$(uname)" != "Darwin" ] && VSCODE_CFG="$HOME/.config/Code/User/mcp.json"

if VSCODE=$(resolve code "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"); then
  "$VSCODE" --add-mcp "$MCP_JSON" >/dev/null 2>&1
  if verify_file "$VSCODE_CFG"; then
    ok "VS Code"
    installed=$((installed + 1))
  else
    warn "VS Code — needs 1.102+ (found $("$VSCODE" --version 2>/dev/null | head -1))"
    manual=$((manual + 1))
  fi
else
  skip "VS Code not found"
fi

# --- Cursor ----------------------------------------------------------------
# `cursor --add-mcp` exits 0 but only writes workspace scope, so write the user
# config directly. Cursor uses "mcpServers" and infers HTTP from a bare "url".
CURSOR_CFG="$HOME/.cursor/mcp.json"
if resolve cursor "/Applications/Cursor.app/Contents/Resources/app/bin/cursor" >/dev/null \
   || [ -d "/Applications/Cursor.app" ]; then
  merge_json "$CURSOR_CFG" "mcpServers" "{\"url\":\"$URL\"}"
  case $? in
    2) warn "Cursor — needs node or python3 to edit config; add $URL manually"
       manual=$((manual + 1)) ;;
    *) if verify_file "$CURSOR_CFG"; then
         ok "Cursor"
         installed=$((installed + 1))
       else
         warn "Cursor — could not write $CURSOR_CFG"
         manual=$((manual + 1))
       fi ;;
  esac
else
  skip "Cursor not found"
fi

# --- Windsurf --------------------------------------------------------------
WINDSURF_CFG="$HOME/.codeium/windsurf/mcp_config.json"
if [ -d "/Applications/Windsurf.app" ] || command -v windsurf >/dev/null 2>&1; then
  merge_json "$WINDSURF_CFG" "mcpServers" "{\"url\":\"$URL\"}"
  if verify_file "$WINDSURF_CFG"; then
    ok "Windsurf"
    installed=$((installed + 1))
  else
    warn "Windsurf — add $URL manually"
    manual=$((manual + 1))
  fi
else
  skip "Windsurf not found"
fi

# --- Claude desktop app ----------------------------------------------------
# Remote servers go through the Connectors UI, not a config file, so there is
# nothing safe to automate.
if [ -d "/Applications/Claude.app" ]; then
  warn "Claude desktop app — add manually:"
  echo "      Settings → Connectors → Add custom connector → $URL"
  manual=$((manual + 1))
fi

echo
if [ "$installed" -eq 0 ]; then
  echo "${yellow}No editor was configured automatically.${reset}"
  echo "Add this URL in your editor's MCP settings:"
  echo "  $URL"
  echo
  exit 1
fi

echo "${bold}Done — $installed editor(s) configured.${reset} Restart your editor, then ask:"
echo
echo "  ${dim}Using the zcat MCP tools, design a Catalyst user management page${reset}"
echo "  ${dim}with a table, search and filters. Call zcat_get_workflow first.${reset}"
echo
[ "$manual" -gt 0 ] && echo "${dim}($manual item(s) above need a manual step.)${reset}" && echo
exit 0
