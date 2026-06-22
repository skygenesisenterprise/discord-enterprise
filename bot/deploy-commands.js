import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { REST, Routes } from "discord.js";
import { assertDiscordEnv, env } from "./config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function collectCommands() {
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = (await readdir(commandsPath)).filter((file) => file.endsWith(".js"));
  const commands = [];

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(pathToFileURL(filePath).href);

    if (!command.data) {
      console.warn(`[WARNING] La commande ${file} ne définit pas data.`);
      continue;
    }

    commands.push(command.data.toJSON());
  }

  return commands;
}

async function deployGuildCommands() {
  try {
    assertDiscordEnv();
    const commands = await collectCommands();
    const rest = new REST({ version: "10" }).setToken(env.token);
    const scope = env.commandScope.toLowerCase();

    if (!["global", "guild", "both"].includes(scope)) {
      throw new Error(
        `DISCORD_COMMAND_SCOPE invalide: ${env.commandScope}. Valeurs attendues: global, guild, both.`,
      );
    }

    if (scope === "global" || scope === "both") {
      await rest.put(Routes.applicationCommands(env.clientId), {
        body: commands,
      });
      console.log(`${commands.length} commande(s) globale(s) déployée(s).`);
    }

    if (scope === "guild" || scope === "both") {
      await rest.put(Routes.applicationGuildCommands(env.clientId, env.guildId), {
        body: commands,
      });
      console.log(`${commands.length} commande(s) guilde déployée(s).`);
    }
  } catch (error) {
    console.error("Erreur pendant le déploiement des commandes:", error);
    process.exit(1);
  }
}

void deployGuildCommands();
