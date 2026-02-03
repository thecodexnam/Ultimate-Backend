import { Router } from "express"
import express from 'express'
import { homepage, signup } from "../controllers/auth.controllers.js";

const authRouter = express(Router())

authRouter.post("/signup",signup)
authRouter.get("/homepage",homepage)

export default authRouter;