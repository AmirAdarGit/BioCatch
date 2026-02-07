/**
 * API client for server endpoints. Uses fetch only.
 */

const API_BASE =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
    ? String(import.meta.env.VITE_API_URL).replace(/\/$/, "")
    : "http://localhost:3001";

export interface InitPayload {
  customerId: string;
  action: string;
  customerSessionId: string;
  activityType: string;
  uuid: string;
  brand: string;
  solution: string;
  iam: string;
}

export interface InitResponse {
  attempt: string;
  id: string;
  request_id: string;
  status: string;
}

export interface GetScorePayload {
  customerSessionId: string;
}

export interface GetScoreResponse {
  score?: number;
  request_id: string;
  status: string;
}

async function postJson<T>(path: string, body: object): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as T & { message?: string };
  if (!res.ok) {
    throw new Error(data.message ?? `Request failed: ${res.status}`);
  }
  return data;
}

export async function init(payload: InitPayload): Promise<InitResponse> {
  return postJson<InitResponse>("/api/init", payload);
}

export async function getScore(payload: GetScorePayload): Promise<GetScoreResponse> {
  return postJson<GetScoreResponse>("/api/getScore", payload);
}
