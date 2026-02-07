import { Request, Response, NextFunction } from "express";
import { GetScoreRequestBody } from "../types";
import { hasInitialized } from "../store";

type GetScoreBody = Partial<GetScoreRequestBody>;

function getCsid(body: GetScoreBody): string | undefined {
  return body.customerSessionId ?? body.customersessionId;
}

/**
 * Validate getScore: require CSID and that init was already called for this session.
 */
export function validateGetScore(
  req: Request<object, object, GetScoreBody>,
  res: Response,
  next: NextFunction
): void {
  const body = req.body as GetScoreBody;
  const csid = getCsid(body);

  if (!csid?.trim()) {
    res.status(400).json({
      status: "error",
      message: "customerSessionId (or customersessionId) is required",
    });
    return;
  }

  if (!hasInitialized(csid)) {
    res.status(400).json({
      status: "error",
      message: "getScore can only be called after init for this session",
    });
    return;
  }

  next();
}
