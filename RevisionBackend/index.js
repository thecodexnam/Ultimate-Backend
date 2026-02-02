import express, { json } from "express";
import mongoose from "mongoose";
import Student from "./Schema/User.schema.js";
const server = express();
const port  = 4444;
server.use(express.json())
const MONGOURL = "mongodb+srv://naman70205_db_user:Naman1234@cluster0.g7mlgvs.mongodb.net/codexnam"


//Connect to DataBase
const MongoDB = async () => {
    try {
        await mongoose.connect(MONGOURL)
        console.log("✅ Database Connected Successfully")
    } catch (error) {
        console.error("❌ Database Connection Failed")
        console.error(error.message)
    }
}

//How to Create Student
server.post("/Create", async (req,res)=>{
    try {
        let{name,age,rollNumber,course} = req.body;
        const student = Student.create({
            name,
            age,
            rollNumber,
            course
        })
        res.status(201).json({"message":"Student Created Successfully",student})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({"message":"Error Creating Student"})
    }
})

//How to Get All Students
server.get("/Students", async (req,res)=>{
    try {
       const students = await Student.find();
       return res.status(200).json({students})
    } catch (error) {
      return res.status(500).json({"message":"Error Fetching Students"})   
    }
})

//How to insert Many User 
server.post("/CreateMany", async (req,res)=>{
    try {
        const students = await Student.insertMany(req.body);
        res.status(201).json({"message":"Students Created Successfully",students})
    } catch (error) {
        res.status(500).json({"message":error.message})
    }
})

//How to read one Student
server.get("/Student/:id", async(req,res)=>{
    try {
        const student = await Student.findById(req.params.id);
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({"message":error.message})
    }
})

//How to Update Student
server.put("/Update/:id", async(req,res)=>{
    try {
        const student = await Student.updateOne({_id:req.params.id},{$set:req.body},{new:true});
        res.status(200).json({"message":"Student Updated Successfully",student})
    }
    catch (error) {
        res.status(500).json({"message":error.message})
    }
})

//How to Delete Student
server.delete("/Delete/:rollno", async (req, res) => {
  try {
    const student = await Student.deleteOne({ rollNumber: req.params.rollno });

    res.status(200).json({
      message: "Student Deleted Successfully",
      student
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Server Home Page
server.get("/",(req,res)=>{
    res.json({"message":"This is a Home page of our Server"})
})

//Logical Operations
server.get("/LogicalOps", async (req, res) => {
  try {
    const students = await Student.find({
      $and: [
        { age: { $gt: 12 } },
        { age: { $lt: 14 } }
      ]
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Start the Server and Connect to DataBase

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    MongoDB()
})