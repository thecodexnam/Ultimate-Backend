import {v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import dotenv from 'dotenv'
import { log } from 'console';
dotenv.config()

    cloudinary.config({
        cloud_name: process.env.CLOUINARY_CLOUD_NAME,
        api_key: process.env.CLOUINARY_API_KEY,
        api_secret:process.env.CLOUINARY_API_SECRET
    });

const uploadOnCloudinary = async (filepath)=>{
    try {
        if(!filepath){
            return null
        }
        let result = await cloudinary.uploader.upload(filepath)
        console.log(result);
        return result.secure_url
        
    } catch (error) {
        fs.unlinkSync(filepath)
        console.log(error);            
    }
}

export default uploadOnCloudinary