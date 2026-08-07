import mongoose from "mongoose";

// Connect the app to MongoDB using the environment variable.
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected");
    } catch (error) {
        console.log("DataBase Error");
    }
};

export default connectDB;