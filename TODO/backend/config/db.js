import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const MongoURL = process.env.MONGO_URL || "mongodb+srv://naman70205_db_user:Naman9818@cluster0.7dlhhow.mongodb.net/";
        await mongoose.connect(MongoURL);
        console.log("DataBase Connected Successfully");
    } catch (error) {
        console.error("Internal Error DataBase is not Connected Successfully", error.message);
        process.exit(1);
    }
};

export default ConnectDB;
