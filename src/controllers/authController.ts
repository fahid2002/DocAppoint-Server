import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export function issueJWT(req: Request, res: Response): void {
  const { email } = req.body;
  if (!email) { res.status(400).json({ error: "Email required" }); return; }

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  res.json({ token });
}
