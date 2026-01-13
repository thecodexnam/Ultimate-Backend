import http, { request } from "http"

const server = http.createServer((request,Response)=>{
    Response.end("Welcome to my server")
})

server.listen(4000,()=>{
    console.log("Server is Started")
})

