/**
 * Simple in-memory store: which CSIDs have called init.
 * getScore is only allowed after init for the same session.
 */

const initializedSessions = new Set<string>();

export function markInitialized(csid: string): void {
  initializedSessions.add(csid);
}

export function hasInitialized(csid: string): boolean {
  return initializedSessions.has(csid);
}

/** Optional: log recent requests for debugging */
const requestLog: Array<{ path: string; body: unknown; at: string }> = [];
const MAX_LOG = 50;

export function logRequest(path: string, body: unknown): void {
  requestLog.push({
    path,
    body,
    at: new Date().toISOString(),
  });
  if (requestLog.length > MAX_LOG) requestLog.shift();
}

export function getRequestLog(): typeof requestLog {
  return [...requestLog];
}
