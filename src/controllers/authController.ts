import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { auth } from "../libs/auth"; // your Better Auth server instance

export async function issueJWT(req: Request, res: Response): Promise<void> {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email required" });
    return;
  }

  // Verify the Better Auth session is actually valid before issuing JWT
  const session = await auth.api.getSession({ headers: req.headers as any });
  if (!session || session.user.email !== email) {
    res.status(401).json({ error: "No valid session" });
    return;
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",       // required for Vercel → Render cross-origin
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Authenticated successfully" });
}