import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ModalBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import {
  closeSupportTicket,
  createSupportTicket,
  findOpenTicketByOwner,
  getSupportTicket,
  isSupportStaff,
} from "../utils/support-tickets.js";

const OPEN_TICKET_BUTTON_ID = "support:open-ticket";
const OPEN_TICKET_MODAL_ID = "support:open-ticket-modal";
const OPEN_TICKET_REASON_FIELD_ID = "reason";

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
        "Une fenêtre vous demandera d'indiquer la raison avant la création du salon.",
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
  if (!interaction.isButton() || interaction.customId !== OPEN_TICKET_BUTTON_ID) {
    return false;
  }

  const modal = new ModalBuilder()
    .setCustomId(OPEN_TICKET_MODAL_ID)
    .setTitle("Ouvrir un ticket");

  const reasonInput = new TextInputBuilder()
    .setCustomId(OPEN_TICKET_REASON_FIELD_ID)
    .setLabel("Raison du ticket")
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(500)
    .setRequired(true)
    .setPlaceholder("Décrivez brièvement votre demande.");

  const row = new ActionRowBuilder().addComponents(reasonInput);
  modal.addComponents(row);

  await interaction.showModal(modal);
  return true;
}

export async function handleSupportModalSubmit(interaction) {
  if (!interaction.isModalSubmit() || interaction.customId !== OPEN_TICKET_MODAL_ID) {
    return false;
  }

  const existingTicket = findOpenTicketByOwner(interaction.guildId, interaction.user.id);

  if (existingTicket) {
    const existingChannel = interaction.guild.channels.cache.get(existingTicket.channelId);
    await interaction.reply({
      content: existingChannel
        ? `Vous avez déjà un ticket ouvert: ${existingChannel}.`
        : "Vous avez déjà un ticket ouvert.",
      ephemeral: true,
    });
    return true;
  }

  const subject = interaction.fields.getTextInputValue(OPEN_TICKET_REASON_FIELD_ID).trim();
  const channel = await createSupportTicket(interaction, subject);

  await channel.send({
    embeds: [
      new EmbedBuilder()
        .setTitle("Nouveau ticket")
        .setDescription(subject)
        .addFields(
          { name: "Demandeur", value: `${interaction.user}`, inline: true },
          { name: "Statut", value: "Ouvert", inline: true },
        )
        .setColor(0x57f287),
    ],
  });

  await interaction.reply({
    content: `Votre ticket a été créé: ${channel}`,
    ephemeral: true,
  });

  return true;
}
