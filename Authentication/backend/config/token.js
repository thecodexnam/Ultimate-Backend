import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

const generateToken = async (id) =>{
    let token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"})
    return token
}

export default generateToken;


//👉 This code creates a JWT token for a user after login or signup.