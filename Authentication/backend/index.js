import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './config/DB.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

let app = express()
let port = process.env.PORT || 8000

app.use(express.json())

app.set("trust proxy", 1); // ✅ Required for Render/Vercel (Secure Cookies)

const allowedOrigins = [
    "http://localhost:5173",
    "https://authapp-murex.vercel.app", // Your Vercel URL
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // allow server-to-server / curl / postman (no origin)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(cookieParser()) // ✅ MUST BE BEFORE ROUTES

app.use("/api", authRouter)

app.listen(port, () => {
    console.log(`server is started at port ${port}`);
    ConnectDB();
})
