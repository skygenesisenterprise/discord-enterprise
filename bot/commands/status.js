import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("status")
  .setDescription("Affiche le statut des services Sky Genesis Enterprise.");

export async function execute(interaction) {
  const services = [
    { name: "Website", status: "Operational" },
    { name: "Aether Identity", status: "Operational" },
    { name: "Aether Cloud", status: "Degraded Performance" },
    { name: "Aether Developer", status: "Operational" },
    { name: "Giteria", status: "Operational" },
  ];

  const content = services.map((service) => `• ${service.name}: ${service.status}`).join("\n");

  await interaction.reply({
    content: `Statut SGE (fictif):\n\n${content}`,
    ephemeral: false,
  });
}
