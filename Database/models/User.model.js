import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    user:{
        type:String,
        required: true,
    },
    age:{
        type:Number,
        require:true,
    },
    rollno:{
        type:Number,
        required:true,
        unique:true,
    },
    course:{
        type:String,
        required:true,
    }
},{})

const Student = mongoose.model("User",StudentSchema)
export default Student;




// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     age:{
//         type:Number,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     username:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     password:{
//         type:String,
//         required:true,
//     }
// },{timestamps:true})


// const User = mongoose.model("User",userSchema)
// export default User;




