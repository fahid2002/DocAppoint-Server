import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser"; // ✅ added
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";
import appointmentRoutes from "./routes/appointments";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS config (reused for preflight too)
const corsOptions = {
  origin: [
    process.env.CLIENT_URL || "http://localhost:3000",
    "http://localhost:3000",
    "https://doc-appoint-client.vercel.app", // ✅ added your Vercel URL
  ],
  credentials: true, // ✅ required for cross-domain cookies
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Security
app.use(helmet());
app.use(cors(corsOptions));

// ✅ Handle preflight with same corsOptions (not plain cors())
app.options("*", cors(corsOptions));

// ✅ Cookie parser — must be before routes
app.use(cookieParser());

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: "Too many requests, please try again later." },
}));

app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "DocAppoint API running 🚀" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});