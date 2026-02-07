import { v4 as uuidv4 } from "uuid";

/**
 * Generate a random UUID for response fields (attempt, id, request_id).
 */
export function randomUuid(): string {
  return uuidv4();
}

/**
 * Format like "xXXXX-XXXXX-XXXXXX" for attempt field (mock style).
 */
export function mockAttemptId(): string {
  const u = uuidv4().replace(/-/g, "").slice(0, 17);
  return `x${u.slice(0, 5)}-${u.slice(5, 10)}-${u.slice(10)}`;
}
