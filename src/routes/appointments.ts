import { Router } from "express";
import { verifyJWT } from "../middleware/auth";
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from "../controllers/appointmentController";

const router = Router();

router.use(verifyJWT);

router.get("/", getAppointments);
router.post("/", createAppointment);
router.patch("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
