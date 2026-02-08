import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api";

const app = express();

// Parse JSON body (replaces body-parser)
app.use(express.json());

// Always respond with JSON content type for API
app.use("/api", (_req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// CORS: only allow requests from the frontend
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));

// API routes
app.use("/api", apiRoutes);

// Health check (Task 6.4)
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
