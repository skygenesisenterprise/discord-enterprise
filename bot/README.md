# Discord Enterprise — generalist bot

The general-purpose entry point of the Discord Enterprise: server and user
information, utilities, help, documentation and general server configuration.

- **Image:** `ghcr.io/skygenesisenterprise/discord-enterprise`
- **Intents:** `Guilds`, `GuildMembers` — no message content, no moderation, no voice.
- **Database:** its own SQLite file (`data/discord-enterprise.sqlite3`), never shared.
- **Shared foundation:** `packages/discord-framework` only.

## Commands

| Command | Category | Purpose |
| --- | --- | --- |
| `/about` | support | Bot, version, uptime and links |
| `/help [command]` | support | Catalogue with autocomplete, ecosystem overview |
| `/status` | utility | Health, gateway latency, database, memory (refresh button) |
| `/ping` | utility | Gateway and round-trip latency |
| `/serverinfo` | information | Guild metadata |
| `/userinfo [user]` | information | User/member metadata |
| `/avatar [user]` | information | Avatar |
| `/membercount` | information | Members, humans, bots |
| `/roleinfo <role>` | information | Role metadata and permissions |
| `/channelinfo [channel]` | information | Channel metadata |
| `/docs`, `/support`, `/invite` | support | Documentation, issues, invite link |
| `/language <locale>` | configuration | Per-guild locale (Manage Server) |
| `/config view\|set\|reset` | configuration | Timezone, staff role, announcement channel, locale (Manage Server) |
| User context menu | context | "User information" |

Ownership rule: Discord Enterprise never implements moderation, logging, community,
automation or audio commands. Those belong to Protect, Logger, Guild,
Automations and Player.

## Configuration

Copy `.env.example` to `.env`, then set:

```bash
DISCORD_ENTERPRISE_DISCORD_ENTERPRISE_DISCORD_TOKEN=...      # this bot's own application
DISCORD_ENTERPRISE_DISCORD_ENTERPRISE_DISCORD_CLIENT_ID=...
```

Command deployment is idempotent and guarded by application id:

```bash
pnpm --filter=@discord-enterprise/discord-enterprise run deploy:commands
# --dry-run / --force
```

`DISCORD_ENTERPRISE_COMMAND_SCOPE=global|guild|none`, `DISCORD_ENTERPRISE_COMMAND_GUILD_ID` for guild
scope, `DISCORD_ENTERPRISE_HEALTH_PORT` (default 8080), `DISCORD_ENTERPRISE_DATA_DIR`,
`DISCORD_ENTERPRISE_DATABASE_PATH`, `DISCORD_ENTERPRISE_LOG_LEVEL`.

## Run

```bash
cd bot/discord-enterprise && pnpm start        # or pnpm dev (--watch)
docker compose -f bot/discord-enterprise/docker-compose.yml up --build
```

Health: `GET /healthz` (readiness), `GET /livez`, `GET /metrics` (Prometheus).

## Data

- `bot_settings` — guild-scoped configuration (declared keys only, validated).
- `guild_events` — join/leave history used by diagnostics.
- `schema_migrations` — applied migration checksums.

Deleting the volume removes this bot's data only.
