import mongoose from "mongoose";

// User document shape used for authentication and gamified progress.
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    rank: {
        type: String,
        default: "Novice Strategist"
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;
