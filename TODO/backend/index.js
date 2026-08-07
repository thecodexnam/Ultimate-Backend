import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';

// Resolve the local environment file for this backend project.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

import ConnectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Parse incoming JSON payloads and cookies for authentication.
app.use(express.json());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(cookieParser());

// Register route groups for authentication and task management.
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

// Simple health check endpoint for the backend.
app.get("/", (req, res) => {
  res.json({
    message: "This is the Home Page",
    success: true,
  });
});

// Start the server and connect to MongoDB once the app boots.
app.listen(port, async () => {
  try {
    await ConnectDB();
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
});
