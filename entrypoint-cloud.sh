#!/bin/sh
set -e

if [ -n "${WAIT_FOR_POSTGRES:-}" ]; then
  until pg_isready -h "${POSTGRES_HOST:-postgres}" -p "${POSTGRES_PORT:-5432}" -U "${POSTGRES_USER:-sge}" -d "${POSTGRES_DB:-discord_enterprise}"; do
    echo "Waiting for postgres..."
    sleep 2
  done
fi

if [ -n "${WAIT_FOR_API:-}" ]; then
  until wget -qO- "${API_INTERNAL_URL:-http://api:8080}/api/v1/health" >/dev/null 2>&1; do
    echo "Waiting for api..."
    sleep 2
  done
fi

exec "$@"
