import express from "express"
const server = express()

const port = 4000;

server.get("/code",(req,res)=>{
    res.send("here is our new server")
})

server.listen(4000,()=>{
    console.log("Our new Server is Started")
})


// const app = express()

// const port = 4000;

// app.get("/",(req,res)=>{
//     res.send("Hello this is home page")
// })
// app.get("/about",(req,res)=>{
//     res.send("Hello this is About")
// })
// app.get("/contact",(req,res)=>{
//     res.send("Hello Contact")
// })

// app.listen(port,()=>{
//     console.log("Server is Started at port no ",port)
// })















// import http, { request } from "http"

// const port = 3000;

// const server = http.createServer((req,res)=>{
//     if(req.url =="/"){
//         res.end("Welcome to home Route")
//     }
//     else if(req.url == "/about"){
//         res.end("Welcome to About Route")
//     }
//     else if(req.url == "/contact"){
//         res.end("Welcome to Contact Page ")
//     }
//     else{
//         res.end("404 Not Found")
//     }
// })

// server.listen(port,()=>{
//     console.log("Server is Started")
// })


