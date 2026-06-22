import {
  VoiceConnectionStatus,
  entersState,
  getVoiceConnection,
  joinVoiceChannel,
} from "@discordjs/voice";
import { ChannelType, PermissionFlagsBits } from "discord.js";
import { env } from "../config/env.js";

const RECONNECT_TIMEOUT_MS = 5_000;
const READY_TIMEOUT_MS = 20_000;
const INITIAL_CONNECT_RETRIES = 3;
const RETRY_DELAY_MS = 3_000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getVoiceChannelJoinFailureReason(channel) {
  const me = channel.guild.members.me;

  if (!me) {
    return "Le membre du bot n'est pas encore disponible dans la guilde.";
  }

  const permissions = channel.permissionsFor(me);
  if (!permissions?.has(PermissionFlagsBits.ViewChannel)) {
    return "Le bot ne peut pas voir ce salon vocal.";
  }

  if (!permissions.has(PermissionFlagsBits.Connect)) {
    return "Le bot n'a pas la permission de se connecter à ce salon vocal.";
  }

  if ("full" in channel && channel.full && !permissions.has(PermissionFlagsBits.MoveMembers)) {
    return "Le salon vocal a atteint sa limite d'utilisateurs.";
  }

  if ("joinable" in channel && !channel.joinable) {
    return "Discord signale que ce salon vocal n'est pas joignable par le bot.";
  }

  return null;
}

async function getTargetVoiceChannel(client) {
  if (!env.voiceChannelId) {
    return null;
  }

  const cachedChannel = client.channels.cache.get(env.voiceChannelId);
  if (cachedChannel) {
    return cachedChannel;
  }

  return client.channels.fetch(env.voiceChannelId).catch(() => null);
}

function ensureVoiceConnectionListeners(connection, client) {
  if (connection.__discordEnterpriseVoiceListenersAttached) {
    return;
  }

  connection.__discordEnterpriseVoiceListenersAttached = true;

  connection.on(VoiceConnectionStatus.Disconnected, async () => {
    try {
      await Promise.race([
        entersState(connection, VoiceConnectionStatus.Signalling, RECONNECT_TIMEOUT_MS),
        entersState(connection, VoiceConnectionStatus.Connecting, RECONNECT_TIMEOUT_MS),
      ]);
    } catch {
      connection.destroy();
      await connectToConfiguredVoiceChannel(client);
    }
  });

  connection.on(VoiceConnectionStatus.Destroyed, async () => {
    if (client.isReady()) {
      await connectToConfiguredVoiceChannel(client);
    }
  });
}

export async function connectToConfiguredVoiceChannel(client) {
  if (!env.voiceChannelId) {
    return null;
  }

  const channel = await getTargetVoiceChannel(client);

  if (!channel) {
    console.warn(
      `[VOICE] DISCORD_VOICE_CHANNEL_ID (${env.voiceChannelId}) ne référence pas un salon accessible.`,
    );
    return null;
  }

  if (channel.type !== ChannelType.GuildVoice && channel.type !== ChannelType.GuildStageVoice) {
    console.warn(`[VOICE] Le salon ${channel.id} n'est pas un salon vocal.`);
    return null;
  }

  const joinFailureReason = getVoiceChannelJoinFailureReason(channel);
  if (joinFailureReason) {
    console.warn(`[VOICE] Connexion au salon ${channel.guild.name} / ${channel.name} impossible: ${joinFailureReason}`);
    return null;
  }

  const existingConnection = getVoiceConnection(channel.guild.id);
  if (
    existingConnection?.joinConfig.channelId === channel.id &&
    existingConnection.state.status !== VoiceConnectionStatus.Destroyed
  ) {
    ensureVoiceConnectionListeners(existingConnection, client);

    if (existingConnection.state.status === VoiceConnectionStatus.Ready) {
      return existingConnection;
    }
  }

  let lastError = null;

  for (let attempt = 1; attempt <= INITIAL_CONNECT_RETRIES; attempt += 1) {
    const activeConnection = getVoiceConnection(channel.guild.id);
    if (activeConnection && activeConnection !== existingConnection) {
      activeConnection.destroy();
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: false,
    });

    ensureVoiceConnectionListeners(connection, client);

    try {
      await entersState(connection, VoiceConnectionStatus.Ready, READY_TIMEOUT_MS);
      console.log(`[VOICE] Connecté au salon vocal ${channel.guild.name} / ${channel.name}`);
      return connection;
    } catch (error) {
      lastError = error;
      connection.destroy();

      if (attempt < INITIAL_CONNECT_RETRIES) {
        console.warn(
          `[VOICE] Échec de connexion au salon vocal ${channel.guild.name} / ${channel.name} (tentative ${attempt}/${INITIAL_CONNECT_RETRIES}). Nouvelle tentative dans ${Math.round(RETRY_DELAY_MS / 1000)}s.`,
        );
        await sleep(RETRY_DELAY_MS);
      }
    }
  }

  const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(
    `[VOICE] Impossible de connecter le bot au salon vocal ${channel.guild.name} / ${channel.name} après ${INITIAL_CONNECT_RETRIES} tentatives: ${errorMessage}`,
    { cause: lastError ?? undefined },
  );
}

export async function ensureConfiguredVoicePresence(client) {
  if (!env.voiceChannelId) {
    return;
  }

  const channel = await getTargetVoiceChannel(client);
  if (!channel) {
    return;
  }

  const me = channel.guild.members.me ?? (await channel.guild.members.fetchMe());
  if (me.voice.channelId === channel.id) {
    return;
  }

  await connectToConfiguredVoiceChannel(client);
}
