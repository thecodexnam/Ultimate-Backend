import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from 'bcrypt'

export const homepage = async(req,res) =>{
    return res.json({message:"This is our Home Page"})
}

export const signup = async (req,res) => {
    try {
        const{firstName,lastName,email,passWord,userName} = req.body

        if(!firstName || !lastName || !email|| !passWord || !userName){
            return res.status(400).json({message:"send all details"})
        }

        let existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exist"})
        }

        const hassedPassword = await bcrypt.hash(passWord,10)
        const user = await User.create({
            firstName,
            lastName,
            passWord:hassedPassword,
            userName,
            email,
        })

        let token;
        try {
            token = generateToken(user._id)
        } catch (error) {
            console.log(error)
        } 

        console.log(user);

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT == "production",
            sameSite:"strict",
            maxAge:7*24*60*1000
        })


        return res.status(201).json({user:{
            firstName,
            lastName,
            userName,
            email,
        }})
        
    } catch (error) {
     return res.status(500).json({message:"Internal server error"})   
    }
}

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