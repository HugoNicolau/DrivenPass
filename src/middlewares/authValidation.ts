import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function auth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    const BearerToken = authorization.split(" ");

    const [bearer, token] = BearerToken;

    if (bearer !== "Bearer") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (!token) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    const { userId } = (await verifyToken(token)) as JWTPayload;

    req.userId = userId;

    return next();
  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

async function verifyToken(token: string) {
  const secretKey = process.env.JWT_SECRET;

  const data = await jwt.verify(token, secretKey);

  return data;
}

type JWTPayload = {
  userId: number;
};

export type AuthenticatedRequest = Request & JWTPayload;

const authFunctions = { auth };

export default authFunctions;
