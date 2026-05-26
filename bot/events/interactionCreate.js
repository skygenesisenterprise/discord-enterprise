export const name = "interactionCreate";

export async function execute(interaction) {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    await interaction.reply({
      content: "Commande inconnue.",
      ephemeral: true,
    });
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Erreur sur /${interaction.commandName}:`, error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "Une erreur est survenue pendant l'exécution de la commande.",
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: "Une erreur est survenue pendant l'exécution de la commande.",
      ephemeral: true,
    });
  }
}
