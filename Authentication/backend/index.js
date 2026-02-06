import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './config/DB.js'
import authRouter from './routes/auth.routes.js'
import cookieparser from 'cookie-parser'
import cors from 'cors'
dotenv.config()

let app = express()
let port = process.env.PORT || 4000

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/api",authRouter)
app.use(cookieparser())

app.listen(port,()=>{
    console.log(`server is started at port ${port}`);
    ConnectDB();
})
