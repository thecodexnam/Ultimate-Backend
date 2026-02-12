import { Router } from "express"
import { getUserData, homepage, login, logout, signup } from "../controllers/auth.controllers.js";
import { upload } from "../middleWares/multer.js";
import { checkAuth } from "../middleWares/checkAuth.js";

const authRouter = Router()


authRouter.post("/signup", upload.single("profileImage"), signup)
authRouter.get("/homepage", homepage)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/getuserdata", checkAuth, getUserData)

export default authRouter;