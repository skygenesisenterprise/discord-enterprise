import { env } from "../config/env.js";
import { ensureConfiguredVoicePresence } from "../services/voice-service.js";

const RESTORE_DELAY_MS = 3_000;

export const name = "voiceStateUpdate";

export async function execute(oldState, newState) {
  if (!env.voiceChannelId) {
    return;
  }

  if (newState.id !== newState.client.user?.id) {
    return;
  }

  if (oldState.channelId === newState.channelId) {
    return;
  }

  if (newState.channelId === env.voiceChannelId) {
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, RESTORE_DELAY_MS));

  await ensureConfiguredVoicePresence(newState.client).catch((error) => {
    console.error("[VOICE] Impossible de restaurer la connexion vocale:", error);
  });
}
