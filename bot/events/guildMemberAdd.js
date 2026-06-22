import { ChannelType } from "discord.js";
import { env } from "../config/env.js";

async function sendWelcomeDm(member) {
  if (!env.welcomeDmEnabled) {
    return;
  }

  try {
    await member.send(
      `Bienvenue sur ${member.guild.name}, ${member.user.username}.\n\nNous sommes ravis de t'accueillir. Consulte les salons d'information et le reglement pour bien demarrer.`,
    );
  } catch (error) {
    console.warn(`[WELCOME] DM impossible pour ${member.user.tag}:`, error.message);
  }
}

async function sendWelcomeChannelMessage(member) {
  if (!env.welcomeChannelId) {
    return;
  }

  const channel =
    member.guild.channels.cache.get(env.welcomeChannelId) ??
    (await member.guild.channels.fetch(env.welcomeChannelId).catch(() => null));

  if (!channel) {
    console.warn(
      `[WELCOME] DISCORD_WELCOME_CHANNEL_ID (${env.welcomeChannelId}) ne référence pas un salon accessible.`,
    );
    return;
  }

  if (channel.type !== ChannelType.GuildText) {
    console.warn(`[WELCOME] Le salon ${channel.id} n'est pas un salon textuel.`);
    return;
  }

  await channel.send(
    `Bienvenue ${member} sur **${member.guild.name}**. Pense a lire les informations du serveur pour bien commencer.`,
  );
}

export const name = "guildMemberAdd";

export async function execute(member) {
  await sendWelcomeDm(member);
  await sendWelcomeChannelMessage(member);
}
