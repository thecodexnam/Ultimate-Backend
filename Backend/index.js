import express from "express"
import cors from "cors" // cross origin resourse 

const server = express()

server.use(cors({
    origin:"http://localhost:5173"
}))

server.use(express.json())

const port = 5000;

server.get("/",(req,res)=>{
    res.json({name:"Naman",age:20,course:"BCA"})
})

server.post("/",(req,res)=>{
    console.log(req.body);    
    res.send({success:true})
})


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

