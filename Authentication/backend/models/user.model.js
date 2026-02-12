import mongoose from "mongoose";

// ============================================
// USER DATABASE SCHEMA
// This defines what a "User" looks like in our database.
// ============================================
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true // No two users can have the same username
    },
    email: {
        type: String,
        required: true,
        unique: true // No two users can have the same email
    },
    passWord: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: false // Optional field
    }

}, { timestamps: true }) // Automatically adds createdAt and updatedAt times

const User = mongoose.model("User", UserSchema)

export default User;