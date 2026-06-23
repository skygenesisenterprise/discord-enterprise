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
const FAILED_RECONNECT_COOLDOWN_MS = 60_000;

const connectionAttempts = new Map();
const reconnectCooldowns = new Map();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function destroyVoiceConnection(connection) {
  if (!connection || connection.state.status === VoiceConnectionStatus.Destroyed) {
    return;
  }

  try {
    connection.destroy();
  } catch (error) {
    if (!String(error?.message ?? error).includes("already been destroyed")) {
      throw error;
    }
  }
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
      destroyVoiceConnection(connection);

      setTimeout(() => {
        void ensureConfiguredVoicePresence(client).catch((error) => {
          console.error("[VOICE] Reconnexion vocale impossible:", error);
        });
      }, RETRY_DELAY_MS);
    }
  });
}

async function performVoiceConnection(client, channel) {
  const guildId = channel.guild.id;
  const existingConnection = getVoiceConnection(guildId);

  if (
    existingConnection?.joinConfig.channelId === channel.id &&
    existingConnection.state.status !== VoiceConnectionStatus.Destroyed
  ) {
    ensureVoiceConnectionListeners(existingConnection, client);

    if (existingConnection.state.status === VoiceConnectionStatus.Ready) {
      return existingConnection;
    }

    try {
      await entersState(existingConnection, VoiceConnectionStatus.Ready, READY_TIMEOUT_MS);
      return existingConnection;
    } catch {
      destroyVoiceConnection(existingConnection);
    }
  } else if (existingConnection) {
    destroyVoiceConnection(existingConnection);
  }

  let lastError = null;

  for (let attempt = 1; attempt <= INITIAL_CONNECT_RETRIES; attempt += 1) {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: false,
    });

    ensureVoiceConnectionListeners(connection, client);

    try {
      await entersState(connection, VoiceConnectionStatus.Ready, READY_TIMEOUT_MS);
      reconnectCooldowns.delete(guildId);
      console.log(`[VOICE] Connecté au salon vocal ${channel.guild.name} / ${channel.name}`);
      return connection;
    } catch (error) {
      lastError = error;
      destroyVoiceConnection(connection);

      if (attempt < INITIAL_CONNECT_RETRIES) {
        console.warn(
          `[VOICE] Échec de connexion au salon vocal ${channel.guild.name} / ${channel.name} (tentative ${attempt}/${INITIAL_CONNECT_RETRIES}). Nouvelle tentative dans ${Math.round(RETRY_DELAY_MS / 1000)}s.`,
        );
        await sleep(RETRY_DELAY_MS);
      }
    }
  }

  reconnectCooldowns.set(guildId, Date.now() + FAILED_RECONNECT_COOLDOWN_MS);

  const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(
    `[VOICE] Impossible de connecter le bot au salon vocal ${channel.guild.name} / ${channel.name} après ${INITIAL_CONNECT_RETRIES} tentatives: ${errorMessage}`,
    { cause: lastError ?? undefined },
  );
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
    console.warn(
      `[VOICE] Connexion au salon ${channel.guild.name} / ${channel.name} impossible: ${joinFailureReason}`,
    );
    return null;
  }

  const guildId = channel.guild.id;
  const activeAttempt = connectionAttempts.get(guildId);
  if (activeAttempt) {
    return activeAttempt;
  }

  const cooldownUntil = reconnectCooldowns.get(guildId) ?? 0;
  if (cooldownUntil > Date.now()) {
    return null;
  }

  let attemptPromise;
  attemptPromise = performVoiceConnection(client, channel).finally(() => {
    if (connectionAttempts.get(guildId) === attemptPromise) {
      connectionAttempts.delete(guildId);
    }
  });

  connectionAttempts.set(guildId, attemptPromise);
  return attemptPromise;
}

export async function ensureConfiguredVoicePresence(client) {
  if (!env.voiceChannelId || !client.isReady()) {
    return null;
  }

  const channel = await getTargetVoiceChannel(client);
  if (!channel) {
    return null;
  }

  const me = channel.guild.members.me ?? (await channel.guild.members.fetchMe());
  if (me.voice.channelId === channel.id) {
    const connection = getVoiceConnection(channel.guild.id);
    if (connection?.state.status === VoiceConnectionStatus.Ready) {
      return connection;
    }
  }

  return connectToConfiguredVoiceChannel(client);
}
