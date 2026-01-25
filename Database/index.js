import express from 'express';
import mongoose from 'mongoose';

const server = express()
const port = 7777;
let MongoURL = "mongodb+srv://naman70205_db_user:Naman1234@cluster0.g7mlgvs.mongodb.net/codexnam"

const connectDB = async ()=>{
    try {
     await mongoose.connect(MongoURL)
     console.log("DB connected");
     
        
    } catch (error) {
        console.log("DataBase Error");
        
    }
}

server.get("/",(req,res)=>{
    res.send("<h1>In this serever we Learn MonogDB (DataBase)</h1>")
})


server.listen(port,()=>{
    connectDB()
    console.log(`Server is Running on port ${port} `)
})