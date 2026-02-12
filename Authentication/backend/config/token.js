import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

// ============================================
// TOKEN GENERATOR
// This function creates a digital "badge" (JWT) for the user.
// ============================================
const generateToken = async (id) => {
    // jwt.sign params:
    // 1. Payload: Data we want to hide inside the token ({ userId: id })
    // 2. Secret: A private key only the server knows (process.env.JWT_SECRET)
    // 3. Options: When the token expires ({ expiresIn: "7d" })
    let token = jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    return token
}

export default generateToken;


//👉 This code creates a JWT token for a user after login or signup.