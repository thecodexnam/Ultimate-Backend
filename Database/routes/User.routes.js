import express, { Router } from 'express'
import User from '../models/User.model.js';
import { create, createmany, home, read, readall, search, updateone } from '../controlers/user.controlers.js';
let userRouter = express(Router())

// Home route for basic API testing.
userRouter.get("/", home);

// Create a single user document.
userRouter.post("/build", create);

// Search for one user by name.
userRouter.get("/search/:name", search);

// Read all users.
userRouter.get("/getall", readall);

// Create multiple users at once.
userRouter.post("/createmany", createmany);

// Update one user document.
userRouter.put("/update/:name", updateone);

// Example route showing comparison query usage.
userRouter.get("/read", read);

// Update a user's name and age using findOneAndUpdate.
userRouter.put("/updateuser/:id", async (req, res) => {
    try {
    let {name,age} = req.body
    let id = req.params.id
    let user = await User.findByIdAndUpdate(id,{name,age},{new:true})
    return res.status(200).json({message:"User Updated successfully",user})

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})


// Update one document using updateOne.
userRouter.put("/updateuser", async (req, res) => {
    try {
        let { name, age, email } = req.body;
        let user = await User.updateOne({ email }, { name, age }, { new: true });
        return res.status(200).json({ message: "User Updated successfully", user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Delete one user by ID.
userRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    return res.status(300).json(user)
  } catch (error) {
    return res.json({message:error.msg})
  }
})

// Delete one user using a username match.
userRouter.delete("/deleteone", async (req, res) => {
  try {
  const{username} = req.body;
  const user = await User.deleteOne({username})
  return res.json({message:"User Deleted Successfully"})

  } catch (error) {
    return res.json({message:error.message})
  }
})

export default userRouter;