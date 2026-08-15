import express from "express";
import { signup, login, logout, getProfile } from "../controllers/authController.js";
import { verifyJWTToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public auth endpoints for creating accounts and signing in.
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected endpoint to fetch the logged-in user's profile.
router.get("/profile", verifyJWTToken, getProfile);

export default router;
