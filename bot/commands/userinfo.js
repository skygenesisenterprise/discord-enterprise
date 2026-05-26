import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("userinfo")
  .setDescription("Affiche les informations d'un utilisateur.")
  .addUserOption((option) =>
    option.setName("user").setDescription("Utilisateur cible").setRequired(false),
  );

export async function execute(interaction) {
  const targetUser = interaction.options.getUser("user") ?? interaction.user;
  const targetMember = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

  const joinedAt = targetMember?.joinedAt
    ? `<t:${Math.floor(targetMember.joinedAt.getTime() / 1000)}:F>`
    : "Inconnu";

  await interaction.reply({
    content:
      `Utilisateur: ${targetUser.tag}\n` +
      `ID: ${targetUser.id}\n` +
      `Compte créé: <t:${Math.floor(targetUser.createdTimestamp / 1000)}:F>\n` +
      `A rejoint le serveur: ${joinedAt}`,
    ephemeral: true,
  });
}
