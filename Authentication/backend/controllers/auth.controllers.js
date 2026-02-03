import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from 'bcrypt'

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
         
        // console.log(user);
        // let token = generateToken(user._id)
        

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

export const homepage = async(req,res) =>{
    return res.json({message:"This is our Home Page"})
}