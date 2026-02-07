import { Router } from "express"
import express from 'express'
import {createAccount, homepage, login, logout, signup} from "../controllers/auth.controllers.js";

const authRouter = express(Router())

authRouter.post("/createAccount",createAccount)
authRouter.post("/signup",signup)
authRouter.get("/homepage",homepage)
authRouter.post("/login",login)
authRouter.post("/logout",logout)

export default authRouter;