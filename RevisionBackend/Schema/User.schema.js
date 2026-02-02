import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    rollNumber:{
        type:String,
        required:true,
        unique:true
    },
    course:{
        type:String,
        required:true
    }
},{timestamps:true})
const Student = mongoose.model("Student",StudentSchema);

export default Student;