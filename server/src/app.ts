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

// CORS: allow client (e.g. localhost:5173) to call this API
app.use(
  cors({
    origin: true,
  })
);

// API routes
app.use("/api", apiRoutes);

// Health check (Task 6.4)
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
