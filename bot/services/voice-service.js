import {
  VoiceConnectionStatus,
  entersState,
  getVoiceConnection,
  joinVoiceChannel,
} from "@discordjs/voice";
import { ChannelType } from "discord.js";
import { env } from "../config/env.js";

const RECONNECT_TIMEOUT_MS = 5_000;

function getTargetVoiceChannel(client) {
  if (!env.voiceChannelId) {
    return null;
  }

  return client.channels.cache.get(env.voiceChannelId) ?? null;
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

  const channel = getTargetVoiceChannel(client);

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

  const existingConnection = getVoiceConnection(channel.guild.id);
  if (existingConnection?.joinConfig.channelId === channel.id) {
    ensureVoiceConnectionListeners(existingConnection, client);
    return existingConnection;
  }

  existingConnection?.destroy();

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: true,
    selfMute: false,
  });

  ensureVoiceConnectionListeners(connection, client);
  await entersState(connection, VoiceConnectionStatus.Ready, 20_000);
  console.log(`[VOICE] Connecté au salon vocal ${channel.guild.name} / ${channel.name}`);
  return connection;
}

export async function ensureConfiguredVoicePresence(client) {
  if (!env.voiceChannelId) {
    return;
  }

  const channel = getTargetVoiceChannel(client);
  if (!channel) {
    return;
  }

  const me = channel.guild.members.me ?? (await channel.guild.members.fetchMe());
  if (me.voice.channelId === channel.id) {
    return;
  }

  await connectToConfiguredVoiceChannel(client);
}
