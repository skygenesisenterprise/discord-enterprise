import { SlashCommandBuilder } from "discord.js";

import {
  defineCommand,
  formatDuration,
} from "@discord-enterprise/discord-framework";
import { infoEmbed } from "@discord-enterprise/discord-framework/ui";
import { LINKS } from "../config/bot.js";

export default defineCommand({
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("About Discord Enterprise and the Discord Enterprise.")
    .setDescriptionLocalizations({ fr: "À propos d'Discord Enterprise et de la collection Discord Enterprise." })
    .setDMPermission(false),
  category: "support",
  execute: async (interaction, { services }) => {
    const stats = services.info.stats();

    await interaction.reply({
      embeds: [
        infoEmbed("Discord Enterprise", "The generalist bot and entry point of the Discord Enterprise.", {
          fields: [
            { name: "Version", value: stats.version, inline: true },
            { name: "Environment", value: stats.environment, inline: true },
            { name: "Uptime", value: formatDuration(interaction.client.uptime ?? 0), inline: true },
            { name: "Guilds", value: String(interaction.client.guilds.cache.size), inline: true },
            { name: "Commands", value: String(services.help.count()), inline: true },
            { name: "Runtime", value: process.version, inline: true },
            { name: "Documentation", value: stats.repository, inline: false },
            { name: "Support", value: stats.support ?? LINKS.issues, inline: false },
          ],
          footer: "Discord Enterprise — six independent bots, one foundation.",
        }),
      ],
    });
  },
});
