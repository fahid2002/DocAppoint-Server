import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export function issueJWT(req: Request, res: Response): void {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email required" });
    return;
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // ✅ Set token as cookie instead of returning in body
  res.cookie("token", token, {
    httpOnly: true,                              // JS can't access it (XSS protection)
    secure: true,                                // HTTPS only — required for cross-domain
    sameSite: "none",                            // required for cross-domain (Vercel → Render)
    maxAge: 7 * 24 * 60 * 60 * 1000,            // 7 days in ms
  });

  res.status(200).json({ message: "Authenticated successfully" });
}