import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
import User from "./models/User.model.js";
import { use } from "react";
import connectDB from "./Config/db.js";
import userRouter from "./routes/User.routes.js";
const server = express();
const port = 5555;
server.use(express.json());
server.use("/",userRouter)

server.listen(port, () => {
  console.log(`the server in run on port ${port}`);
  connectDB()
});



// import express, { response } from 'express';
// import mongoose from 'mongoose';
// import User from './models/User.model.js';

// const server = express()
// const port = 7777;
// let MongoURL = "mongodb+srv://naman70205_db_user:Naman1234@cluster0.g7mlgvs.mongodb.net/codexnam"
// server.use(express.json())

// // How to connect DB
// const connectDB = async ()=>{
//     try {
//      await mongoose.connect(MongoURL)
//      console.log("DB connected");

//     } catch (error) {
//         console.log("DataBase Error");
//     }
// }

// //Server Home Page
// server.get("/",(req,res)=>{
//     res.send("<h1>In this serever we Learn MonogDB (DataBase)</h1>")
// })

// //Send & Store Data to server
// server.post("/create", async(req,res)=>{
//     try {
//         // let{name,age,email,username,password} = req.body
//         let name = req.body.name;
//         let age = req.body.age;
//         let email = req.body.email;
//         let username = req.body.username;
//         let password = req.body.password;

//         const newUser = await User.create({
//             name,
//             age,
//             email,
//             username,
//             password
//         })

//         res.status(201).json({message:"User Created"})

//     } catch (error) {
//         return res.status(400).json({message:error})
//     }
// })

// //Retrive all Data from server
// server.get("/read", async(req,res)=>{
//     try {
//         const users = await User.find()
//         res.status(200).json(users)
//     } catch (error) {
//         return res.statusCode(400).json({message:error})
//     }
// })

// // find partical one user data
// server.get("/search/:username", async(req,res)=>{
//     try {
//         const users = await User.findOne({username:req.params.username})
//         res.json(users)
//     } catch (error) {
//         return res.status(400).json({message:error})
//     }
// })

// // How to use query operator
// server.get('/find', async(req,res)=>{
//     try {
//         const users = await User.find({age:{$lt:20}})
//         return res.status(200).json(users)
//     } catch (error) {
//        return res.status(400).json({message:"User not Found"})
//     }
// })

// // Logical Opearator
// server.get('/logical',async (req,res)=>{
//     try {
//         const user = await User.find({$or: [{status : "active"},{age:{$lt : 22}}]})
//         res.status(200).json({user})
//     } catch (error) {
//         res.status(400).json({message:"User not found"})
//     }
// })

// // Running server
// server.listen(port,()=>{
//     connectDB()
//     console.log(`Server is Running on port ${port} `)
// })
