import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { env } from "../config/env.js";

const WELCOME_VERIFY_BUTTON_ID = "welcome:verify";
const PRIMARY_EMBED_COLOR = 0x5865f2;
const SECONDARY_EMBED_COLOR = 0x57f287;

const SERVER_RULES = [
  "Respectez tous les membres et l'equipe de moderation.",
  "Aucun spam, flood, raid ou publicite non autorisee.",
  "Utilisez chaque salon pour le sujet qui lui correspond.",
  "Les contenus haineux, violents ou malveillants sont interdits.",
  "Ne partagez jamais d'informations sensibles ou privees.",
  "Les pseudos, avatars et statuts doivent rester appropries.",
  "Les decisions de moderation doivent etre respectees.",
  "Aucune tentative de fraude, phishing ou contournement de securite.",
  "Les bots, scripts et automatisations non autorises sont interdits.",
  "En restant sur le serveur, vous acceptez l'ensemble de ces regles.",
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

  await sendWelcomePanel(targetChannel);

  await interaction.reply({
    content: `Le panneau d'accueil a ete publie dans ${targetChannel}.`,
    ephemeral: true,
  });
}

export async function handleWelcomeButtonInteraction(interaction) {
  if (!interaction.isButton() || interaction.customId !== WELCOME_VERIFY_BUTTON_ID) {
    return false;
  }

  if (!interaction.inCachedGuild()) {
    await interaction.reply({
      content: "Cette action doit etre utilisee depuis un serveur.",
      flags: MessageFlags.Ephemeral,
    });
    return true;
  }

  if (!env.verifiedRoleId) {
    await interaction.reply({
      content: "Le role de verification n'est pas configure.",
      flags: MessageFlags.Ephemeral,
    });
    return true;
  }

  const role =
    interaction.guild.roles.cache.get(env.verifiedRoleId) ??
    (await interaction.guild.roles.fetch(env.verifiedRoleId).catch(() => null));

  if (!role) {
    await interaction.reply({
      content: "Le role de verification est introuvable sur ce serveur.",
      flags: MessageFlags.Ephemeral,
    });
    return true;
  }

  if (role.id === interaction.guild.id) {
    await interaction.reply({
      content: "Le role configure pour la verification est invalide.",
      flags: MessageFlags.Ephemeral,
    });
    return true;
  }

  const member = interaction.member;

  if (member.roles.cache.has(role.id)) {
    await interaction.reply({
      content: `Vous possedez deja le role ${role}.`,
      flags: MessageFlags.Ephemeral,
    });
    return true;
  }

  const botMember = interaction.guild.members.me;

  if (!botMember) {
    await interaction.reply({
      content: "Impossible de verifier les permissions du bot sur ce serveur.",
      flags: MessageFlags.Ephemeral,
    });
    return true;
  }

  if (role.managed) {
    await interaction.reply({
      content: "Le role de verification est gere par une integration et ne peut pas etre attribue ici.",
      flags: MessageFlags.Ephemeral,
    });
    return true;
  }

  if (role.position >= botMember.roles.highest.position) {
    await interaction.reply({
      content: "Le bot ne peut pas attribuer ce role car il est au-dessus ou au meme niveau que son role le plus eleve.",
      flags: MessageFlags.Ephemeral,
    });
    return true;
  }

  await member.roles.add(role);

  await interaction.reply({
    content: `Verification terminee. Le role ${role} vous a ete attribue.`,
    flags: MessageFlags.Ephemeral,
  });
  return true;
}

function buildRulesDescription() {
  return SERVER_RULES.map((rule, index) => `**${index + 1}.** ${rule}`).join("\n");
}

function buildWelcomeEmbeds(channel) {
  const guildName = channel.guild?.name ?? "Sky Genesis Enterprise";
  const guildIconUrl = channel.guild?.iconURL?.() ?? null;
  const roleMention = env.verifiedRoleId ? `<@&${env.verifiedRoleId}>` : "le role verified";

  const overviewEmbed = new EmbedBuilder()
    .setTitle(`Accueil et verification • ${guildName}`)
    .setDescription(
      [
        "Bienvenue dans l'espace officiel de verification du serveur.",
        "",
        "Ce panneau centralise les informations essentielles pour rejoindre la communaute dans de bonnes conditions et recevoir l'acces membre.",
        "",
        "Prenez quelques instants pour lire les indications et le reglement avant de lancer la verification. Une fois votre verification effectuee, le bot vous attribuera automatiquement le role d'acces correspondant.",
      ].join("\n"),
    )
    .addFields(
      {
        name: "Ce que permet la verification",
        value: [
          `• Attribution du role ${roleMention}`,
          "• Acces aux salons reserves aux membres verifies",
          "• Confirmation que vous acceptez le reglement du serveur",
          "• Deblocage de l'experience communautaire complete",
        ].join("\n"),
        inline: false,
      },
      {
        name: "Avant de cliquer",
        value: [
          "• Assurez-vous d'avoir lu l'ensemble du reglement",
          "• Verifiez que votre pseudo et votre profil respectent les attentes du serveur",
          "• N'utilisez pas plusieurs comptes ou moyens de contournement",
          "• En cas de doute, contactez l'equipe avant de continuer",
        ].join("\n"),
        inline: false,
      },
      {
        name: "Parcours de verification",
        value: [
          "1. Prenez connaissance du reglement.",
          "2. Cliquez sur **Verifier mon acces**.",
          "3. Le bot vous attribue le role de verification.",
          "4. Vous pouvez ensuite acceder aux espaces membres.",
          "5. Respectez en continu les regles et consignes de moderation.",
        ].join("\n"),
        inline: false,
      },
    )
    .setColor(PRIMARY_EMBED_COLOR)
    .setThumbnail(guildIconUrl)
    .setFooter({
      text: "Sky Genesis Enterprise • Verification",
    })
    .setTimestamp();

  const rulesEmbed = new EmbedBuilder()
    .setTitle("Reglement a accepter")
    .setDescription(buildRulesDescription())
    .addFields(
      {
        name: "Engagement de verification",
        value: [
          "En cliquant sur le bouton, vous confirmez avoir lu, compris et accepte les regles du serveur.",
          "Cette verification n'est pas une formalite vide: elle marque votre engagement a respecter le cadre fixe par l'equipe.",
        ].join("\n"),
        inline: false,
      },
      {
        name: "Ce qui est attendu apres verification",
        value: [
          "• Adopter un comportement respectueux et constructif",
          "• Utiliser les bons salons selon les sujets",
          "• Eviter tout spam, troll malveillant ou perturbation volontaire",
          "• Signaler proprement un probleme plutot que l'alimenter",
        ].join("\n"),
        inline: true,
      },
      {
        name: "Rappels de moderation",
        value: [
          "• Toute infraction peut entrainer un avertissement, une limitation ou une exclusion",
          "• Les contournements de sanction sont interdits",
          "• Les decisions de moderation doivent etre respectees",
          "• Les cas sensibles peuvent etre traites directement par le staff",
        ].join("\n"),
        inline: true,
      },
    )
    .setColor(SECONDARY_EMBED_COLOR);

  const guidanceEmbed = new EmbedBuilder()
    .setTitle("Informations complementaires")
    .setDescription(
      [
        "Le systeme de verification permet de filtrer l'acces initial et de proteger l'espace communautaire contre les usages abusifs ou automatises.",
        "",
        "Si le bouton ne vous attribue pas le role attendu, cela signifie generalement qu'un element de configuration ou de permissions doit etre corrige par l'equipe.",
      ].join("\n"),
    )
    .addFields(
      {
        name: "En cas de probleme",
        value: [
          "• Verifiez que Discord a bien pris en compte votre action",
          "• Patientez quelques secondes puis reessayez si necessaire",
          "• Contactez le staff ou ouvrez un ticket si le probleme persiste",
        ].join("\n"),
        inline: false,
      },
      {
        name: "Pourquoi ce systeme existe",
        value: [
          "• Structurer l'arrivee des nouveaux membres",
          "• Rappeler clairement le cadre du serveur",
          "• Limiter les abus, raids et acces non souhaites",
          "• Garantir une meilleure qualite d'echange pour tous",
        ].join("\n"),
        inline: false,
      },
    )
    .setColor(PRIMARY_EMBED_COLOR);

  return [overviewEmbed, rulesEmbed, guidanceEmbed];
}

function buildWelcomeComponents() {
  return [
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(WELCOME_VERIFY_BUTTON_ID)
        .setLabel("Verifier mon acces")
        .setStyle(ButtonStyle.Primary),
    ),
  ];
}

export async function sendWelcomePanel(channel) {
  await channel.send({
    embeds: buildWelcomeEmbeds(channel),
    components: buildWelcomeComponents(),
  });
}
