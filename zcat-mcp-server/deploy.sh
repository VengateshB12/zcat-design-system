#!/usr/bin/env bash
#
# Sync the reference corpus, deploy to Catalyst AppSail, then confirm the
# deployed server answers.
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

echo
echo "==> Deploying to AppSail"
(cd "$ROOT" && catalyst deploy --only appsail)

# AppSail scales to zero, so the first request after a deploy is a cold start.
# A 503 here means "still starting", not "broken" — retry before believing it.
echo
echo "==> Verifying (cold start can take a few tries)"
for i in $(seq 1 6); do
  code=$(curl -s -o /tmp/zcat-health.json -w "%{http_code}" --max-time 30 "$URL/health" || echo "000")
  if [ "$code" = "200" ]; then
    echo "healthy: $(cat /tmp/zcat-health.json)"
    echo
    echo "Development is updated: $DEV_URL"
    echo
    echo "NOT YET LIVE FOR USERS. Promote it:"
    echo "  Catalyst console -> zcat-mcp -> Deploy to Production"
    echo
    echo "Users connect to: $PROD_URL/mcp"
    exit 0
  fi
  echo "  attempt $i: HTTP $code"
  sleep 10
done

echo "Server did not become healthy — check logs in the Catalyst console." >&2
exit 1
