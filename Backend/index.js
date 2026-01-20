import express from "express"
import cors from "cors"

const server = express()

server.use(cors())
const port = 5000;

server.get("/",(req,res)=>{
    res.json({name:"Naman",age:20,course:"BCA"})
})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

