import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";
import appointmentRoutes from "./routes/appointments";
import reviewRoutes from "./routes/reviews";
import doctorRoutes from "./routes/doctors";

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    const allowed = [
      "http://localhost:3000",
      "https://doc-appoint-client.vercel.app",
      process.env.CLIENT_URL,
    ].filter(Boolean);

    if (!origin || allowed.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Security
app.use(helmet());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: "Too many requests, please try again later." },
}));

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "DocAppoint API running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/doctors", doctorRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});