import express from "express"
const app = express()

const port = 4000;

// app.get("/",(req,res)=>{
//     res.send("Hello this is home page of server")
// })

app.post("/about",(req,res)=>{
    res.send("Hello this is About page and we used Post in this server")
})

app.post("/",(req,res)=>{
    let body = req.body
    console.log(body)
    res.send()
})

// app.get("/json",(req,res)=>{
//     res.json({
//         name:"Naman",
//         course:"Computer Application"
//     })
// })

app.listen(port,()=>{
    console.log("Server is Started at port no ",port)
})















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


