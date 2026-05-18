import { Router } from "express";
import { issueJWT } from "../controllers/authController";

const router = Router();

// POST /api/auth/jwt — issue a JWT for a verified user
router.post("/jwt", issueJWT);

export default router;
