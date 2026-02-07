import { Request, Response, NextFunction } from "express";
import { InitRequestBody } from "../types";

type InitBody = Partial<InitRequestBody>;

/**
 * Normalize CSID from either customerSessionId or customersessionId.
 */
export function getCsid(body: InitBody): string | undefined {
  return body.customerSessionId ?? body.customersessionId;
}

/**
 * Validate init request body. Send 400 if required fields are missing.
 */
export function validateInit(
  req: Request<object, object, InitBody>,
  res: Response,
  next: NextFunction
): void {
  const body = req.body as InitBody;
  const csid = getCsid(body);

  if (!csid?.trim()) {
    res.status(400).json({
      status: "error",
      message: "customerSessionId (or customersessionId) is required",
    });
    return;
  }
  if (!body.activityType?.trim()) {
    res.status(400).json({
      status: "error",
      message: "activityType is required",
    });
    return;
  }
  if (!body.uuid?.trim()) {
    res.status(400).json({
      status: "error",
      message: "uuid is required",
    });
    return;
  }

  next();
}
