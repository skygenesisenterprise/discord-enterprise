export const warnings = new Map();
export const incidents = new Map();
export const tickets = new Map();
export const auditLog = [];

export function addAudit(entry) {
  auditLog.unshift({ id: crypto.randomUUID(), at: new Date(), ...entry });
  if (auditLog.length > 500) auditLog.length = 500;
}
