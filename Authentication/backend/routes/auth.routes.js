import { Router } from "express"
import { getUserData, homepage, login, logout, signup } from "../controllers/auth.controllers.js";
import { upload } from "../middleWares/multer.js";
import { checkAuth } from "../middleWares/checkAuth.js";

const authRouter = Router()

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// 1. Signup Route: Handles user registration. 
// Uses 'upload.single' middleware to handle the profile image upload FIRST, then calls 'signup' controller.
authRouter.post("/signup", upload.single("profileImage"), signup)

// 2. Homepage Route: A simple test route.
authRouter.get("/homepage", homepage)

// 3. Login Route: Handles user login.
authRouter.post("/login", login)

// 4. Logout Route: logs the user out.
authRouter.post("/logout", logout)

// 5. Get User Data Route: Fetches the current logged-in user's info.
// Uses 'checkAuth' middleware to verify the user is actually logged in FIRST.
authRouter.get("/getuserdata", checkAuth, getUserData)

export default authRouter;