import { env } from "../config/env.js";
import { ensureConfiguredVoicePresence } from "../services/voice-service.js";

export const name = "voiceStateUpdate";

export async function execute(oldState, newState) {
  if (!env.voiceChannelId) {
    return;
  }

  if (newState.id !== newState.client.user?.id) {
    return;
  }

  if (newState.channelId === env.voiceChannelId) {
    return;
  }

  await ensureConfiguredVoicePresence(newState.client).catch((error) => {
    console.error("[VOICE] Impossible de restaurer la connexion vocale:", error);
  });
}
