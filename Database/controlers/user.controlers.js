import User from "../models/User.model.js";

export const home=(req, res) => {
  res.send("This is our home page");
}

export const create = async (req, res) => {
  try {
    let { name, age, email, username } = req.body;
    let newUser = await User.create({
      name,
      age,
      email,
      username,
    });

    res.status(201).json({ message: "user Created Succesfully" });
    console.log(newUser);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export const read =  async (req,res)=>{
    try {
    const user = await User.find({$and:[{age : {$gt:25}}, {name: {$ne: "Naman"}}]})
    return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({message:"User not Found"})
    }
}

export const readall = async (req, res) => {
  try {
    const usernames = await User.find();
    res.status(200).json({ usernames });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
}

export const search = async (req, res) => {
  try {
    let user = await User.findOne({ name: req.params.name });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: "User not Found" });
  }
}

export const createmany = async (req, res) => {
  try {
    const users = req.body;
    let multiuser = await User.insertMany(users);

    res.status(201).json({
      message: "Users Created Successfully",
      data: multiuser,
    });

    console.log(multiuser);
  } catch (error) {
    res.status(400).json({
      message: "Users not Created",
      error: error.message,
    });
  }
}

export const updateone =  async (req, res) => {
  try {
    const name = req.params.name;
    const updateData = req.body;

    const user = await User.updateOne({ name: name }, { $set: updateData });

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}