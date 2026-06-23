import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";

const ACCESS_VERIFICATION_URL = "https://sso.skygenesisenterprise.com";
const EMBED_COLOR = 0x2b6cb0;

const SERVER_RULES = [
  "Respectez tous les membres et l'équipe de modération.",
  "Aucun spam, flood, raid ou publicité non autorisée.",
  "Utilisez chaque salon pour le sujet qui lui correspond.",
  "Les contenus haineux, violents ou malveillants sont interdits.",
  "Ne partagez jamais d'informations sensibles ou privées.",
  "Les pseudos, avatars et statuts doivent rester appropriés.",
  "Les décisions de modération doivent être respectées.",
  "Aucune tentative de fraude, phishing ou contournement de sécurité.",
  "Les bots, scripts et automatisations non autorisés sont interdits.",
  "En restant sur le serveur, vous acceptez l'ensemble de ces règles.",
];

export const data = new SlashCommandBuilder()
  .setName("welcome")
  .setDescription("Publie le panneau d'accueil et de verification sur le serveur.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("Salon cible. Par defaut: le salon courant.")
      .setRequired(false),
  );

export async function execute(interaction) {
  const targetChannel = interaction.options.getChannel("channel") ?? interaction.channel;

  if (!targetChannel || !targetChannel.isTextBased() || targetChannel.isDMBased()) {
    await interaction.reply({
      content: "Le salon cible doit etre un salon textuel du serveur.",
      ephemeral: true,
    });
    return;
  }

  await sendWelcomePanel(targetChannel, interaction.guild.name);

  await interaction.reply({
    content: `Le panneau d'accueil a ete publie dans ${targetChannel}.`,
    ephemeral: true,
  });
}

function buildRulesDescription() {
  return SERVER_RULES.map((rule, index) => `**${index + 1}.** ${rule}`).join("\n");
}

function buildWelcomeEmbed(guildName) {
  return new EmbedBuilder()
    .setTitle(`Bienvenue sur ${guildName}`)
    .setDescription(
      [
        "Merci de lire l'integralite du reglement avant de demander l'acces au serveur.",
        "",
        buildRulesDescription(),
      ].join("\n"),
    )
    .addFields({
      name: "Verification",
      value: "Quand vous avez lu et accepte les regles, utilisez le bouton ci-dessous pour verifier votre acces.",
    })
    .setColor(EMBED_COLOR)
    .setFooter({
      text: "Sky Genesis Enterprise • Reglement officiel",
    })
    .setTimestamp();
}

function buildWelcomeComponents() {
  return [
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Verifier l'acces")
        .setStyle(ButtonStyle.Link)
        .setURL(ACCESS_VERIFICATION_URL),
    ),
  ];
}

export async function sendWelcomePanel(channel, guildName = "le serveur") {
  await channel.send({
    embeds: [buildWelcomeEmbed(guildName)],
    components: buildWelcomeComponents(),
  });
}
