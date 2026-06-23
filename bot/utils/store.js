import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "..", "data");
const storePath = path.join(dataDir, "store.json");

function ensureStoreFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(
      storePath,
      JSON.stringify(
        {
          warnings: {},
          incidents: {},
          tickets: {},
          auditLog: [],
          xp: {},
        },
        null,
        2,
      ),
      "utf8",
    );
  }
}

function loadStore() {
  ensureStoreFile();

  try {
    const raw = fs.readFileSync(storePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Impossible de charger le store du bot, reinitialisation:", error);
    return {
      warnings: {},
      incidents: {},
      tickets: {},
      auditLog: [],
      xp: {},
    };
  }
}

function persistStore() {
  ensureStoreFile();

  const payload = {
    warnings: Object.fromEntries(warnings),
    incidents: Object.fromEntries(incidents),
    tickets: Object.fromEntries(tickets),
    auditLog,
    xp: Object.fromEntries(xp),
  };

  const tmpPath = `${storePath}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(payload, null, 2), "utf8");
  fs.renameSync(tmpPath, storePath);
}

const initialStore = loadStore();

function reviveDateEntries(entries) {
  return entries.map((entry) => ({
    ...entry,
    at: entry.at ? new Date(entry.at) : new Date(),
  }));
}

export const warnings = new Map(
  Object.entries(initialStore.warnings ?? {}).map(([key, value]) => [key, reviveDateEntries(value)]),
);
export const incidents = new Map(Object.entries(initialStore.incidents ?? {}));
export const tickets = new Map(Object.entries(initialStore.tickets ?? {}));
export const auditLog = reviveDateEntries(initialStore.auditLog ?? []);
export const xp = new Map(Object.entries(initialStore.xp ?? {}));

export function saveStore() {
  persistStore();
}

export function addAudit(entry) {
  auditLog.unshift({ id: crypto.randomUUID(), at: new Date(), ...entry });
  if (auditLog.length > 500) auditLog.length = 500;
  persistStore();
}
