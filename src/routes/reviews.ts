import { Router } from "express";
import { verifyJWT } from "../middleware/auth";
import { getReviews, createReview } from "../controllers/reviewController";

const router = Router();

// Public — anyone can read reviews
router.get("/:doctorId", getReviews);

// Protected — must be logged in to submit
router.post("/", verifyJWT, createReview);

export default router;