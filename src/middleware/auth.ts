import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { email: string };
}

export function verifyJWT(req: AuthRequest, res: Response, next: NextFunction): void {

  const token =
    req.cookies?.token ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    req.user = { email: decoded.email };
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}