import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

import ConnectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(cookieParser());

// Route setup
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "This is the Home Page",
    success: true,
  });
});

// Start Server
app.listen(port, async () => {
  try {
    await ConnectDB();
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
});
