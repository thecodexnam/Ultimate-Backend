import express from "express";
import mongoose from "mongoose";
import ConnectDB from "./db.config.js";
import cors from "cors";
import Task, { User } from "./schema.js";
import jwt from "jsonwebtoken";
import { use } from "react";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

/*------------------ SIGNUP ROUTE ------------------ */

app.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    //Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter all the Details",
      });
    }

    // create User
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Create payload (Don't send full user!)
    const payload = {
      id: newUser._id,
      name: newUser.name,
    };

    // Sign the token
    const token = jwt.sign(payload, "your_jwt_secret_key", { expiresIn: "1h" });

    // Send Response properly
    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      User: newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ------------------ LOGIN ROUTE ------------------ */
app.post("/login", async (req,res)=>{
  try {
    let{email,password} = req.body;

    if(!email || !password){
      return res.status(400).json({
        success: false,
        message: "Enter all the Details",
      });
    }
    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if(user.password !== password){
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }else{

    const payload = {
      id: user._id,
      password: user.password,
      username: user.name,
    }

    const token = jwt.sign(payload, "your_jwt_secret_key", { expiresIn: "1h" });

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
    });
    }

  } catch (error) {
    
  }

});





/* ------------------ HOME ROUTE ------------------ */
app.get("/", (req, res) => {
  res.json({
    message: "This is the Home Page",
    success: true,
  });
});

/* ------------------ CREATE TASK ------------------ */
app.post("/add-task", async (req, res) => {
  try {
    const { title, description, deadline } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and Description are required",
        success: false,
      });
    }

    const newTask = await Task.create({
      title,
      description,
      deadline,
    });

    return res.status(201).json({
      message: "Task Created Successfully",
      task: newTask,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

/* ------------------ GET ALL TASKS ------------------ */
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    return res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

/* ------------------ GET SINGLE TASK ------------------ */
app.get("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task); // ✅ IMPORTANT
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ------------------ DELETE TASK ------------------ */
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({
    //     message: "Invalid Task ID",
    //     success: false,
    //   });
    // }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Task Deleted Successfully",
      task: deletedTask,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

/* ------------------ UPDATE TASKS ------------------ */
app.put("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body, //update data from frontend
      { new: true },
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ------------------ DELETE MULTIPLE TASKS ------------------ */
app.delete("/delete-multiple", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || !Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID array",
      });
    }

    const result = await Task.deleteMany({
      _id: { $in: id },
    });

    res.status(200).json({
      success: true,
      message: "Tasks deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ------------------ START SERVER ------------------ */
app.listen(port, async () => {
  try {
    await ConnectDB();
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
});
