# Discord Enterprise bot — standalone image.
#
# Build from the repository root: the bot lives in `bot/` and the shared
# `@discord-enterprise/discord-framework` in `packages/discord-framework/`.
#
#   docker build -f Dockerfile \
#     -t ghcr.io/skygenesisenterprise/discord-enterprise:local .
#
# One image, one process, one data volume.
FROM node:24-alpine

ARG DISCORD_ENTERPRISE_VERSION=2.0.0
ENV NODE_ENV=production \
    APP_VERSION=${DISCORD_ENTERPRISE_VERSION} \
    DISCORD_ENTERPRISE_DATA_DIR=/app/bot/data \
    DISCORD_ENTERPRISE_HEALTH_PORT=3010 \
    NPM_CONFIG_UPDATE_NOTIFIER=false

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app/bot

# Mirror the two real source directories into the image. The bot's package.json
# still declares the framework with the old `bot/<bot>/` relative path, so fix
# that spec before installing: from /app/bot the framework is ../packages/...
COPY bot/ /app/bot/
COPY packages/discord-framework/ /app/packages/discord-framework/

RUN node -e 'const fs = require("node:fs"); const p = JSON.parse(fs.readFileSync("package.json", "utf8")); p.dependencies["@discord-enterprise/discord-framework"] = "file:../packages/discord-framework"; fs.writeFileSync("package.json", JSON.stringify(p, null, 2) + "\n");' \
    && npm install --omit=dev --no-audit --no-fund \
    && mkdir -p /app/bot/data \
    && rm -rf /app/packages/node_modules \
    && ln -s /app/bot/node_modules /app/packages/node_modules

# The framework is symlinked by npm; Node resolves its peer dependencies from
# its real path (/app/packages/...), hence the node_modules link above.
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

VOLUME ["/app/bot/data"]
EXPOSE 3010
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.DISCORD_ENTERPRISE_HEALTH_PORT||3010)+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
