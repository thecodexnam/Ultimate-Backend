import { json } from "express"
import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt, { hash } from 'bcrypt'
import { use } from "react"

export const homepage = async(req,res) =>{
    return res.json({message:"This is our Home Page that running on port no 8000"})
}

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, passWord, userName } = req.body;

        // 1️⃣ Validation
        if (!firstName || !lastName || !email || !passWord || !userName) {
            return res.status(400).json({ message: "Please enter all details" });
        }

        // 2️⃣ Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // 3️⃣ Hash password
        const hashedPassword = await bcrypt.hash(passWord, 8);

        // 4️⃣ Create user
        const user = await User.create({
            firstName,
            lastName,
            userName,
            passWord: hashedPassword,
            email
        });

        // 5️⃣ Generate token (FIXED)
        const token = await generateToken(user._id);

        // 6️⃣ Set cookie (FIXED)
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENVIRONMENT === "production",
            maxAge: 10 * 24 * 60 * 60 * 1000
        });

        // 7️⃣ Response
        return res.status(201).json({
            message: "User created successfully",
            firstName,
            lastName,
            userName,
            email
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async(req,res)=>{
    try {
        const{email,passWord} = req.body;
        let existUser = await User.findOne({email})
        if(!existUser){
            return res.status(400).json({message:"User Does not exist"})
        }

        let match = await bcrypt.compare(passWord,existUser.passWord)
        if(!match){
            return res.status(400).json({message:"incorrect Password"})
        }
        
        let token;
        try {
            token = generateToken(existUser._id)
        } catch (error) {
            console.log(error)
        } 


        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT == "production",
            sameSite:"strict",
            maxAge:7*24*60*1000
        })

        return res.status(200).json({user:{
            message:"User Login ",
            firstName:existUser.firstName,
            lastName:existUser.lastName,
            userName:existUser.userName,
            email:existUser.email,
        }})
        

    } catch (error) {
        return res.status(500).json(error) 
    }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Logout Successfully"})
    } catch (error) {
        return res.status(500).json(error)
    }
}
