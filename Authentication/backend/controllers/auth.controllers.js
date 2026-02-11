import { json } from "express"
import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt, { hash } from 'bcrypt'
import { use } from "react"
import uploadOnCloudinary from "../config/CLOUDINARY.js"

export const homepage = async(req,res) =>{
    return res.json({message:"This is our Home Page that running on port no 8000"})
}

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, passWord, userName } = req.body;
        console.log(req.body);
        

        // 1️⃣ Validation
        if (!firstName || !lastName || !email || !passWord || !userName) {
            return res.status(400).json({ message: "Please enter all details" });
        }

        let profileImage;
        if(req.file){
          profileImage = await uploadOnCloudinary(req.file.path)
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
            email,
            profileImage
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
            email,
            profileImage
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
  try {
    const { email, passWord } = req.body;

    // Check user
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check password
    const matchpw = await bcrypt.compare(passWord, existUser.passWord);
    if (!matchpw) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate token
    const token = await generateToken(existUser._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        userName: existUser.userName,
        email: existUser.email,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Logout Successfully"})
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getUserData = async (req,res)=>{
  try {
    let userId = req.userId
    if(userId){
      return res.status(400).json({message:"User Id is not Found"})
    }
    let user = await User.findById({userId})
    if(!user){
      return res.status(400).json({message:"User not Found"})
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({message:error})
  }
}
