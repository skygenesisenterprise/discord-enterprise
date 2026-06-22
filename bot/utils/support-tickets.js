import { ChannelType, PermissionFlagsBits } from "discord.js";
import { env } from "../config/env.js";
import { addAudit, tickets } from "./store.js";

function normalizeChannelName(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function buildTicketChannelName(username) {
  return normalizeChannelName(`ticket-${username}`) || "ticket-support";
}

export function isSupportTicket(channelId) {
  return tickets.has(channelId);
}

export function getSupportTicket(channelId) {
  return tickets.get(channelId);
}

export function findOpenTicketByOwner(guildId, userId) {
  for (const [channelId, ticket] of tickets.entries()) {
    if (ticket.guildId === guildId && ticket.owner === userId) {
      return { channelId, ticket };
    }
  }

  return null;
}

export function closeSupportTicket(channelId) {
  tickets.delete(channelId);
}

export function isSupportStaff(interaction) {
  return interaction.memberPermissions?.has(PermissionFlagsBits.ManageChannels)
    || interaction.memberPermissions?.has(PermissionFlagsBits.ModerateMembers);
}

export async function createSupportTicket(interaction, subject) {
  const parent = resolveSupportCategory(interaction.guild);
  const channel = await interaction.guild.channels.create({
    name: buildTicketChannelName(interaction.user.username),
    type: ChannelType.GuildText,
    parent: parent?.id,
    topic: `Support ticket for ${interaction.user.tag} | ${subject}`,
    permissionOverwrites: [
      {
        id: interaction.guild.roles.everyone.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
      {
        id: interaction.user.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.AttachFiles,
          PermissionFlagsBits.EmbedLinks,
        ],
      },
    ],
  });

  tickets.set(channel.id, {
    guildId: interaction.guildId,
    owner: interaction.user.id,
    subject,
    createdAt: new Date(),
  });

  addAudit({
    guildId: interaction.guildId,
    action: "ticket_create",
    actor: interaction.user.tag,
    target: channel.name,
    reason: subject,
  });

  return channel;
}

function resolveSupportCategory(guild) {
  if (!env.supportCategoryId) {
    throw new Error("DISCORD_SUPPORT_CATEGORY_ID n'est pas configuré.");
  }

  const channel = guild.channels.cache.get(env.supportCategoryId);

  if (!channel || channel.type !== ChannelType.GuildCategory) {
    throw new Error("DISCORD_SUPPORT_CATEGORY_ID ne correspond pas à une catégorie valide.");
  }

  return channel;
}
