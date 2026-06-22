import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import {
  claimSupportTicket,
  closeSupportTicket,
  createSupportTicket,
  getSupportTicket,
  isSupportStaff,
} from "../utils/support-tickets.js";

const OPEN_TICKET_BUTTON_ID = "support:open-ticket";
const CLAIM_TICKET_BUTTON_ID = "support:claim-ticket";
const CLOSE_TICKET_BUTTON_ID = "support:close-ticket";

export const data = new SlashCommandBuilder()
  .setName("support")
  .setDescription("Publie le panneau de support ou ferme un ticket.")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("setup")
      .setDescription("Publie le message de support avec bouton d'ouverture."),
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("close")
      .setDescription("Ferme le ticket du salon actuel."),
  );

export async function execute(interaction) {
  const subcommand = interaction.options.getSubcommand();

  if (subcommand === "setup") {
    if (!isSupportStaff(interaction)) {
      await interaction.reply({
        content: "Vous devez avoir la permission de gérer les salons pour publier le panneau de support.",
        ephemeral: true,
      });
      return;
    }

    await sendSupportPanel(interaction.channel);

    await interaction.reply({
      content: "Le panneau de support a été publié dans ce salon.",
      ephemeral: true,
    });
    return;
  }

  const ticket = getSupportTicket(interaction.channelId);

  if (!ticket) {
    await interaction.reply({
      content: "Ce salon n’est pas un ticket géré par le bot.",
      ephemeral: true,
    });
    return;
  }

  if (ticket.owner !== interaction.user.id && !isSupportStaff(interaction)) {
    await interaction.reply({
      content: "Seul l'auteur du ticket ou un modérateur peut le fermer.",
      ephemeral: true,
    });
    return;
  }

  await interaction.reply({
    content: "Fermeture du ticket…",
    ephemeral: true,
  });

  closeSupportTicket(interaction.channelId);
  setTimeout(() => interaction.channel.delete().catch(() => {}), 1000);
}

export async function sendSupportPanel(channel) {
  const embed = new EmbedBuilder()
    .setTitle("Support")
    .setDescription(
      [
        "Cliquez sur le bouton ci-dessous pour ouvrir un ticket privé.",
        "Le salon sera créé immédiatement.",
      ].join("\n"),
    )
    .setColor(0x5865f2);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(OPEN_TICKET_BUTTON_ID)
      .setLabel("Ouvrir un ticket")
      .setStyle(ButtonStyle.Primary),
  );

  await channel.send({
    embeds: [embed],
    components: [row],
  });
}

export async function handleSupportButtonInteraction(interaction) {
  if (!interaction.isButton()) {
    return false;
  }

  if (interaction.customId === CLAIM_TICKET_BUTTON_ID) {
    const ticket = getSupportTicket(interaction.channelId);
    if (!ticket) {
      await interaction.reply({
        content: "Ce salon n’est pas un ticket géré par le bot.",
        flags: MessageFlags.Ephemeral,
      });
      return true;
    }

    if (!isSupportStaff(interaction)) {
      await interaction.reply({
        content: "Seul un membre du staff peut prendre ce ticket.",
        flags: MessageFlags.Ephemeral,
      });
      return true;
    }

    claimSupportTicket(interaction.channelId, interaction.user.id, interaction.user.tag);
    await interaction.reply({
      content: `${interaction.user} a pris en charge ce ticket.`,
    });
    return true;
  }

  if (interaction.customId === CLOSE_TICKET_BUTTON_ID) {
    const ticket = getSupportTicket(interaction.channelId);
    if (!ticket) {
      await interaction.reply({
        content: "Ce salon n’est pas un ticket géré par le bot.",
        flags: MessageFlags.Ephemeral,
      });
      return true;
    }

    if (ticket.owner !== interaction.user.id && !isSupportStaff(interaction)) {
      await interaction.reply({
        content: "Seul l'auteur du ticket ou un modérateur peut le fermer.",
        flags: MessageFlags.Ephemeral,
      });
      return true;
    }

    await interaction.reply({
      content: "Fermeture du ticket…",
      flags: MessageFlags.Ephemeral,
    });

    closeSupportTicket(interaction.channelId);
    setTimeout(() => interaction.channel.delete().catch(() => {}), 1000);
    return true;
  }

  if (interaction.customId !== OPEN_TICKET_BUTTON_ID) {
    return false;
  }

  const channel = await createSupportTicket(interaction);

  await channel.send({
    embeds: [
      new EmbedBuilder()
        .setTitle("Nouveau ticket")
        .addFields(
          { name: "Demandeur", value: `${interaction.user}`, inline: true },
          { name: "Statut", value: "Ouvert", inline: true },
        )
        .setColor(0x57f287),
    ],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(CLAIM_TICKET_BUTTON_ID)
          .setLabel("Prendre le ticket")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(CLOSE_TICKET_BUTTON_ID)
          .setLabel("Fermer ce ticket")
          .setStyle(ButtonStyle.Danger),
      ),
    ],
  });

  await interaction.reply({
    content: `Votre ticket a été créé: ${channel}`,
    ephemeral: true,
  });

  return true;
}

export async function handleSupportModalSubmit() {
  return false;
}
