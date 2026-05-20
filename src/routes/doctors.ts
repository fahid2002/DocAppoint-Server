import { Router } from "express";
import { Doctor } from "../models/Doctor";

const router = Router();

// GET /api/doctors
router.get("/", async (_req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

// GET /api/doctors/:id
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ id: req.params.id });
    if (!doctor) { res.status(404).json({ error: "Doctor not found" }); return; }
    res.json(doctor);
  } catch {
    res.status(500).json({ error: "Failed to fetch doctor" });
  }
});

export default router;