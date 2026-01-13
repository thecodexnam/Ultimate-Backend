import http, { request } from "http"

const server = http.createServer((request,Response)=>{
    Response.end("Hello this is my first server")
})

server.listen(3000,()=>{
    
})

