import mongoose from "mongoose";

// Define the structure of a user document stored in MongoDB.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;