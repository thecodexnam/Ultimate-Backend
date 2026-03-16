import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const MongoURL = process.env.MONGO_URL;
        if (!MongoURL) {
            throw new Error("MONGO_URL environment variable is missing");
        }
        await mongoose.connect(MongoURL);
        console.log("DataBase Connected Successfully");
    } catch (error) {
        console.error("Internal Error DataBase is not Connected Successfully", error.message);
        process.exit(1);
    }
};

export default ConnectDB;
