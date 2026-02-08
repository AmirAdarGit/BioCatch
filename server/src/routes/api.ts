import { Router, Request, Response } from "express";
import { markInitialized, logRequest, getRequestLog } from "../store";
import { validateInit, getCsid as getInitCsid } from "../middleware/validateInit";
import { validateGetScore } from "../middleware/validateGetScore";
import { randomUuid, mockAttemptId } from "../utils/uuid";
import { InitRequestBody, GetScoreRequestBody } from "../types";

const router = Router();

/**
 * POST /api/init
 * Receives: CSID, activityType, uuid, and optionally brand, solution, iam.
 * Returns mock: attempt, id, request_id, status.
 */
router.post("/init", validateInit, (req: Request<object, object, InitRequestBody>, res: Response) => {
  const body = req.body;
  const csid = getInitCsid(body);

  logRequest("/api/init", body);

  if (csid) {
    markInitialized(csid);
  }

  const attempt = mockAttemptId();
  const id = randomUuid();
  const request_id = randomUuid();

  console.log("[init] CSID:", csid, "activityType:", body.activityType, "uuid:", body.uuid);

  res.status(200).json({
    attempt,
    id,
    request_id,
    status: "success",
  });
});

/**
 * POST /api/getScore
 * Allowed only after init for the same CSID.
 * Returns mock scoring response (no real scoring).
 */
router.post("/getScore", validateGetScore, (req: Request<object, object, GetScoreRequestBody>, res: Response) => {
  const body = req.body;

  logRequest("/api/getScore", body);

  const request_id = randomUuid();

  console.log("[getScore] customerSessionId:", body.customerSessionId ?? body.customersessionId);

  res.status(200).json({
    score: 0.85,
    request_id,
    status: "success",
  });
});

/**
 * GET /api/requestLog
 * Returns recent request log (for debugging). Last 50 entries.
 */
router.get("/requestLog", (_req: Request, res: Response) => {
  res.status(200).json({ log: getRequestLog() });
});

export default router;
