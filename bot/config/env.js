import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";

import {
  botCredentialVariables,
  defineConfigSchema,
  loadConfig,
  runtimeVariables,
} from "@discord-enterprise/discord-framework";
import { BOT, LINKS } from "./bot.js";

const botRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Sources live directly in `bot/`, so the repository root is one level up.
const repositoryRoot = path.resolve(botRoot, "..");

// One environment contract for the whole repository: `<root>/.env.example`.
// Copy it to `<root>/.env` and fill in the credentials. Real process values
// (Compose, secret store, shell) always win; `.env` fills the gaps. When `.env`
// is absent, the template supplies only its non-empty documented defaults —
// empty placeholders must not shadow a credential alias defined elsewhere.
const envFile = path.join(repositoryRoot, ".env");
if (fs.existsSync(envFile)) dotenv.config({ path: envFile, override: false });

const templateFile = path.join(repositoryRoot, ".env.example");
if (fs.existsSync(templateFile)) {
  for (const [key, value] of Object.entries(
    dotenv.parse(fs.readFileSync(templateFile, { encoding: "utf8" })),
  )) {
    if (value.trim() !== "" && process.env[key] === undefined) process.env[key] = value;
  }
}

const schema = defineConfigSchema({
  bot: BOT,
  variables: [
    ...botCredentialVariables(BOT),
    ...runtimeVariables(),
    {
      key: "databasePath",
      env: ["DISCORD_ENTERPRISE_DATABASE_PATH"],
      default: "",
      description: "SQLite file; defaults to <dataDir>/discord-enterprise.sqlite3.",
    },
    {
      key: "docsUrl",
      env: ["DISCORD_ENTERPRISE_DOCS_URL"],
      default: LINKS.docs,
    },
    {
      key: "supportUrl",
      env: ["DISCORD_ENTERPRISE_SUPPORT_URL"],
      default: LINKS.issues,
    },
    {
      key: "invitePermissions",
      env: ["DISCORD_ENTERPRISE_INVITE_PERMISSIONS"],
      default: "2048",
      description: "Permission bitmask embedded in /invite (Send Messages).",
    },
  ],
});

const result = loadConfig({ schema });

export const env = Object.freeze({
  ...result.values,
  bot: BOT,
  // Shape consumed by the framework runtime and deployment CLI.
  isConfigured: result.ok,
  missingRequiredVars: result.missing,
  warnings: result.warnings,
  configResult: result,
  botRoot,
});

export { schema };
