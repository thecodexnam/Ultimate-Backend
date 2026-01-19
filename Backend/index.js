import express from "express"

const server = express()
const port = 4000;

server.get("/",(req,res)=>{
    res.json({name:"Naman",age:20,course:"BCA"})
})

server.listen(port)

