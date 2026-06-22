import { ActivityType } from "discord.js";
import { announceDeployment } from "../services/deployment-service.js";
import { connectToConfiguredVoiceChannel } from "../services/voice-service.js";

export const name = "clientReady";
export const once = true;

export async function execute(client) {
  const primaryGuild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID) ?? null;
  let memberCount = 0;

  if (primaryGuild) {
    const guild = primaryGuild.available ? await primaryGuild.fetch() : primaryGuild;
    memberCount = guild.memberCount ?? 0;
  } else {
    memberCount = client.guilds.cache.reduce((total, guild) => total + (guild.memberCount ?? 0), 0);
  }

  client.user.setActivity(`See ${memberCount} Member${memberCount > 1 ? "s" : ""}`, {
    type: ActivityType.Watching,
  });

  console.log(`Bot connecté en tant que ${client.user.tag}`);
  await connectToConfiguredVoiceChannel(client).catch((error) => {
    console.error("[VOICE] Impossible de connecter le bot au salon vocal configuré:", error);
  });
  await announceDeployment(client).catch((error) => console.error(error));
}
