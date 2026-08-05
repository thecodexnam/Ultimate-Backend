import { Router } from "express"
import { getUserData, homepage, login, logout, signup } from "../controllers/auth.controllers.js";
import { upload } from "../middleWares/multer.js";
import { checkAuth } from "../middleWares/checkAuth.js";

const authRouter = Router()

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// 1. Signup route: handles user registration and uploads the profile image first.
authRouter.post("/signup", upload.single("profileImage"), signup)

// 2. Homepage route: simple health check endpoint.
authRouter.get("/homepage", homepage)

// 3. Login route: handles user authentication.
authRouter.post("/login", login)

// 4. Logout route: clears the session cookie.
authRouter.post("/logout", logout)

// 5. Get user data route: returns the authenticated user's profile.
// The checkAuth middleware must verify the token before the controller runs.
authRouter.get("/getuserdata", checkAuth, getUserData)

export default authRouter;