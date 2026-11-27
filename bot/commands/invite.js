import { SlashCommandBuilder } from "discord.js";

import { defineCommand } from "@discord-enterprise/discord-framework";
import { infoEmbed } from "@discord-enterprise/discord-framework/ui";

export default defineCommand({
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Get the invite link for this bot.")
    .setDescriptionLocalizations({ fr: "Obtenir le lien d'invitation de ce bot." })
    .setDMPermission(true),
  category: "support",
  execute: async (interaction, { services }) => {
    const permissions = String(services.config.invitePermissions).replace(/\D/g, "") || "2048";
    const url =
      "https://discord.com/oauth2/authorize" +
      `?client_id=${encodeURIComponent(services.config.clientId)}` +
      "&scope=bot%20applications.commands" +
      `&permissions=${permissions}`;

    await interaction.reply({
      embeds: [
        infoEmbed("Invite Discord Enterprise", "The link requests only the permissions Discord Enterprise needs.", {
          fields: [
            { name: "Permissions bitmask", value: permissions, inline: true },
            { name: "Invite link", value: url, inline: false },
          ],
        }),
      ],
    });
  },
});
