import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.model.js';

const server = express()
const port = 7777;
let MongoURL = "mongodb+srv://naman70205_db_user:Naman1234@cluster0.g7mlgvs.mongodb.net/codexnam"
server.use(express.json())

// How to connect DB
const connectDB = async ()=>{
    try {
     await mongoose.connect(MongoURL)
     console.log("DB connected");
        
    } catch (error) {
        console.log("DataBase Error");
    }
}


//Server Home Page
server.get("/",(req,res)=>{
    res.send("<h1>In this serever we Learn MonogDB (DataBase)</h1>")
})


//Send Data to server
server.post("/create", async(req,res)=>{
    try {
        // let{name,age,email,username,password} = req.body
        let name = req.body.name;
        let age = req.body.age;
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;

        const newUser = await User.create({
            name,
            age,
            email,
            username,
            password
        })

        res.status(201).json({message:"User Created"})
        
    } catch (error) {
        return res.status(400).json({message:error})
    }
})

server.get("/readroute", async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        return res.statusCode(400).json({message:error})
    }
})


server.listen(port,()=>{
    connectDB()
    console.log(`Server is Running on port ${port} `)
})