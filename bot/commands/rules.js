import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("rules")
  .setDescription("Affiche les règles principales du serveur.");

export async function execute(interaction) {
  await interaction.reply({
    content:
      "Règles principales:\n1. Respect mutuel et langage approprié.\n2. Pas de spam, publicité non autorisée ou contenu malveillant.\n3. Utiliser les bons salons pour chaque sujet.\n4. Respecter les décisions de la modération.\n5. Protéger vos données et ne jamais partager d'informations sensibles.",
    ephemeral: false,
  });
}
