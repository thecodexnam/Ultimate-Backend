import http, { request } from "http"

const port = 3000;

const server = http.createServer((req,res)=>{
    if(req.url =="/"){
        res.end("Welcome to home Route")
    }
    else if(req.url == "/about"){
        res.end("Welcome to About Route")
    }
    else if(req.url == "/contact"){
        res.end("Welcome to Contact Page ")
    }
    else{
        res.end("404 Not Found")
    }
})

server.listen(port,()=>{
    console.log("Server is Started")
})


