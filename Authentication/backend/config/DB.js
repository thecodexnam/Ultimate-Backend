import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const MongoDBURL = process.env.MONGODB_URL


const ConnectDB = async ()=>{
    try {
        await mongoose.connect(MongoDBURL)
        console.log("DataBase connected Successfully")
    } catch (error) {
        console.error('Databse Error:',error);
    }
}

export default ConnectDB;