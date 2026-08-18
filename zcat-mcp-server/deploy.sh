#!/usr/bin/env bash
#
# Sync the reference corpus, deploy to Catalyst AppSail, then confirm the
# DEPLOYED BUILD is actually the one we just pushed.
#
# Usage: ./deploy.sh [path-to-AI-Automation]

set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"

# `catalyst deploy` only ever targets Development — there is no CLI flag for
# Production. So verify against Development here, and remind the operator that
# users are still on the old build until they promote in the console.
DEV_URL="https://zcat.development.catalystappsail.in"
PROD_URL="https://zcat.catalystappsail.in"
URL="$DEV_URL"

echo "==> Syncing reference data"
"$ROOT/sync-data.sh" "$@"

# The CLI does NOT read project_id out of catalyst.json — without -p it fails
# with "Unable to get the Project ID". Read it here so the flag is never missed.
PROJECT_ID="$(node -e "process.stdout.write(String(require('$ROOT/catalyst.json').project_id||''))")"
if [ -z "$PROJECT_ID" ]; then
  echo "error: no project_id in catalyst.json" >&2
  exit 1
fi

# How many tools SHOULD the deployed server expose? Derived from source, so
# this check keeps working as tools are added.
EXPECTED_TOOLS="$(grep -c 'server\.registerTool(' "$ROOT/appsail/server.js")"
echo "    expecting $EXPECTED_TOOLS tools after deploy"

echo
echo "==> Deploying to AppSail (project $PROJECT_ID)"
# The CLI exits 0 even when it deploys nothing ("No components deployed!"),
# so the exit status alone cannot be trusted — inspect the output.
DEPLOY_LOG="$(mktemp)"
(cd "$ROOT" && catalyst deploy --only appsail -p "$PROJECT_ID") 2>&1 | tee "$DEPLOY_LOG"

if grep -qi 'No components deployed\|deploy skipped\|Unable to get the Project ID' "$DEPLOY_LOG"; then
  echo >&2
  echo "DEPLOY FAILED — the CLI reported it deployed nothing." >&2
  echo "The old build is still running, so /health would lie. Not verifying." >&2
  rm -f "$DEPLOY_LOG"
  exit 1
fi
if ! grep -qi 'DEPLOYMENT SUCCESSFUL' "$DEPLOY_LOG"; then
  echo >&2
  echo "DEPLOY FAILED — no 'DEPLOYMENT SUCCESSFUL' in the CLI output." >&2
  rm -f "$DEPLOY_LOG"
  exit 1
fi
rm -f "$DEPLOY_LOG"

# AppSail scales to zero, so the first request after a deploy is a cold start.
# A 503 here means "still starting", not "broken" — retry before believing it.
#
# /health only proves SOMETHING is running. It answers 200 from the previous
# build too, which is exactly how a failed deploy once looked like a success.
# So assert the tool COUNT matches this source tree.
echo
echo "==> Verifying the deployed build (cold start can take a few tries)"
for i in $(seq 1 8); do
  count="$(curl -s -X POST "$URL/mcp" \
      -H 'Content-Type: application/json' \
      -H 'Accept: application/json, text/event-stream' \
      --max-time 45 \
      -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' 2>/dev/null \
    | sed 's/^data: //' \
    | grep -o '"name":"zcat_[a-z_]*"' | sort -u | grep -c 'zcat_' || echo 0)"

  if [ "$count" = "$EXPECTED_TOOLS" ]; then
    echo "  verified: $count tools live, matching this source tree"
    echo
    echo "Development is updated: $DEV_URL"
    echo
    echo "NOT YET LIVE FOR USERS. Promote it:"
    echo "  Catalyst console -> zcat-mcp -> Deploy to Production"
    echo
    echo "Users connect to: $PROD_URL/mcp"
    exit 0
  fi
  echo "  attempt $i: $count/$EXPECTED_TOOLS tools"
  sleep 10
done

echo >&2
echo "Deployed build exposes the wrong tool count — it may be a stale build." >&2
echo "Check logs in the Catalyst console." >&2
exit 1
