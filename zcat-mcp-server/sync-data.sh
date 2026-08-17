#!/usr/bin/env bash
#
# Copy the zcat reference corpus into appsail/data/ so the hosted MCP server
# serves the same content as the local reference system.
#
# The reference folder is the source of truth and is never written to — this
# script only ever reads from it.
#
# Usage: ./sync-data.sh [path-to-AI-Automation]

set -euo pipefail

REF="${1:-$(cd "$(dirname "$0")/.." && pwd)}"
DEST="$(cd "$(dirname "$0")" && pwd)/appsail/data"

if [ ! -d "$REF/references" ]; then
  echo "error: no references/ under '$REF'" >&2
  echo "usage: $0 [path-to-AI-Automation]" >&2
  exit 1
fi

# source-relative-path -> destination filename
FILES=(
  "references/component-manifest.json|component-manifest.json"
  "references/decision-rules/_index.md|dr-index.md"
  "references/decision-rules/rules-which-component.md|dr-which-component.md"
  "references/decision-rules/rules-design-composition.md|dr-design-composition.md"
  "references/decision-rules/rules-design-uniforms.md|dr-design-uniforms.md"
  "references/decision-rules/rules-data-display.md|dr-data-display.md"
  "references/decision-rules/rules-table-columns.md|dr-table-columns.md"
  "references/decision-rules/rules-detail-page.md|dr-detail-page.md"
  "references/decision-rules/rules-input-selection.md|dr-input-selection.md"
  "references/decision-rules/rules-popup-footer.md|dr-popup-footer.md"
  "references/decision-rules/rules-navigation-actions.md|dr-navigation-actions.md"
  "references/decision-rules/rules-spacing-layout.md|dr-spacing-layout.md"
  "references/decision-rules/rules-build-reference.md|dr-build-reference.md"
  "references/design-tokens.md|design-tokens.md"
  "references/sample-data.md|sample-data.md"
  "references/wireframe-styles.css|wireframe-styles.css"
  "references/products/catalyst/layout-info.md|catalyst-layout.md"
  "references/products/generic/layout-templates.json|generic-layouts.json"
  ".claude/skills/zcat.md|workflow.md"
  "references/design-analysis-workflow.md|design-analysis-workflow.md"
  "references/screenshot-design-patterns.md|screenshot-design-patterns.md"
)

mkdir -p "$DEST"
changed=0
missing=0

for entry in "${FILES[@]}"; do
  src="$REF/${entry%%|*}"
  dst="$DEST/${entry##*|}"

  if [ ! -f "$src" ]; then
    echo "  MISSING  ${entry%%|*}"
    missing=$((missing + 1))
    continue
  fi

  if [ -f "$dst" ] && diff -q "$src" "$dst" >/dev/null 2>&1; then
    echo "  same     ${entry##*|}"
  else
    cp "$src" "$dst"
    echo "  UPDATED  ${entry##*|}"
    changed=$((changed + 1))
  fi
done

echo
if [ "$missing" -gt 0 ]; then
  echo "$missing source file(s) missing — the server would serve stale copies." >&2
  exit 1
fi

# Fail loudly rather than shipping a manifest the server cannot parse.
node -e "JSON.parse(require('fs').readFileSync('$DEST/component-manifest.json','utf8'))" \
  || { echo "component-manifest.json is not valid JSON" >&2; exit 1; }

echo "$changed file(s) updated, data in sync."
