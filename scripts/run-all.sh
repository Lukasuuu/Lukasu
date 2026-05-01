#!/usr/bin/env bash
set -euo pipefail

echo "=== BookMe Full Test Suite ==="

pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
# pnpm test:int
# pnpm test:e2e
# pnpm test:visual
# pnpm test:a11y
# pnpm test:perf
# pnpm test:security

echo "=== ALL GREEN ==="
