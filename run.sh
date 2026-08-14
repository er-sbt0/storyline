#!/usr/bin/env bash
#
# Build and run the Storyline website.
#
# Usage:
#   ./run.sh              Build, then serve the production build
#   ./run.sh dev          Run the dev server (Hot Module Reloading, no build)
#   ./run.sh build        Build only
#
# Environment:
#   PORT      Port to listen on (default: 5000)
#   HOSTNAME  Host to bind to (default: next's own default, 0.0.0.0)

set -euo pipefail

cd "$(dirname "$0")"

PORT="${PORT:-5000}"
export PORT

command -v node >/dev/null 2>&1 || { echo "run.sh: node is required but not installed" >&2; exit 1; }

# Install dependencies if they're missing or out of date with the lockfile.
if [ ! -d node_modules ] || [ package-lock.json -nt node_modules ]; then
  echo "==> Installing dependencies"
  npm ci
fi

case "${1:-serve}" in
  dev)
    echo "==> Starting dev server on http://localhost:$PORT"
    exec npm run dev
    ;;
  build)
    echo "==> Building production bundle"
    exec npm run build
    ;;
  serve)
    echo "==> Building production bundle"
    npm run build
    echo "==> Starting production server on http://localhost:$PORT"
    exec npm run start
    ;;
  *)
    echo "run.sh: unknown command '$1' (expected: dev, build, or serve)" >&2
    exit 1
    ;;
esac
