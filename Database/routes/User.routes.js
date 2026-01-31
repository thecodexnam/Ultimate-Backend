import express, { Router } from 'express'
import User from '../models/User.model.js';
import { create, createmany, home, read, readall, search, updateone } from '../controlers/user.controlers.js';
let userRouter = express(Router())


//home Route
userRouter.get("/",home);
//Create (One Document) - User.create({})
userRouter.post("/build",create);
//Search (One Document) - User.findOne({})
userRouter.get("/search/:name",search);
//Read All Data - User.find({})
userRouter.get("/getall",readall);
//Create(insert Many) - User.insertMany([{},{}])
userRouter.post("/createmany",createmany);
//Update(One Document)-UserOne()
userRouter.put("/update/:name",updateone);
//Comparison operator
userRouter.get("/read",read);


//Update User Name and age using User.findOneAndUpdate({ },{ },{ })
userRouter.put("/updateuser/:id", async(req,res)=>{
    try {
    let {name,age} = req.body
    let id = req.params.id
    let user = await User.findByIdAndUpdate(id,{name,age},{new:true})
    return res.status(200).json({message:"User Updated successfully",user})

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})


//Update (one document)-User.updateOne({},{})
userRouter.put("/updateuser", async(req,res)=>{
    try {
    let {name,age,email} = req.body
    let user = await User.updateOne({email},{name,age},{new:true})
    return res.status(200).json({message:"User Updated successfully"},user)

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

//Delete Method
userRouter.delete("/delete/:id", async (req,res)=>{
  try {
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    return res.status(300).json(user)
  } catch (error) {
    return res.json({message:error.msg})
  }
})

//Delete one user
userRouter.delete("/deleteone",async (req,res)=>{
  try {
  const{username} = req.body;
  const user = await User.deleteOne({username})
  return res.json({message:"User Deleted Successfully"})

  } catch (error) {
    return res.json({message:error.message})
  }
})

export default userRouter;