/**
 * Request/response types for init and getScore endpoints.
 */

export interface InitRequestBody {
  customerId?: string;
  action?: string;
  customerSessionId?: string;
  customersessionId?: string; // alternate key from spec
  activityType: string;
  uuid: string;
  brand?: string;
  solution?: string;
  iam?: string;
}

export interface InitResponse {
  attempt: string;
  id: string;
  request_id: string;
  status: string;
}

export interface GetScoreRequestBody {
  customerSessionId?: string;
  customersessionId?: string;
  [key: string]: unknown;
}

export interface GetScoreResponse {
  score?: number;
  request_id: string;
  status: string;
}
