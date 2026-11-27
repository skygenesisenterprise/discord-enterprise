#!/bin/sh
set -eu

# One process per container. The image mirrors the repository: the bot source
# is at /app/bot and the shared framework at /app/packages/discord-framework.
BOT_DIR="${BOT_DIR:-/app/bot}"
DATA_DIR="${DISCORD_ENTERPRISE_DATA_DIR:-$BOT_DIR/data}"
HEALTH_PORT="${DISCORD_ENTERPRISE_HEALTH_PORT:-3010}"
DATABASE_PATH="${DISCORD_ENTERPRISE_DATABASE_PATH:-$DATA_DIR/discord-enterprise.sqlite3}"

mkdir -p "$DATA_DIR"
export DISCORD_ENTERPRISE_DATA_DIR="$DATA_DIR"
export DISCORD_ENTERPRISE_DATABASE_PATH="$DATABASE_PATH"

for file in index.js deploy-commands.js; do
  if [ ! -f "$BOT_DIR/$file" ]; then
    echo "[discord-enterprise] missing $BOT_DIR/$file" >&2
    exit 1
  fi
done

cd "$BOT_DIR"

if [ "${DISCORD_ENTERPRISE_DEPLOY_COMMANDS:-false}" = "true" ]; then
  echo "[discord-enterprise] deploying slash commands"
  node --disable-warning=ExperimentalWarning deploy-commands.js
fi

if [ "${NODE_ENV:-production}" = "development" ]; then
  echo "[discord-enterprise] development mode (node --watch)"
  exec node --disable-warning=ExperimentalWarning --watch index.js "$@"
fi

echo "[discord-enterprise] starting (health port $HEALTH_PORT, data: $DATA_DIR)"
exec node --disable-warning=ExperimentalWarning index.js "$@"
