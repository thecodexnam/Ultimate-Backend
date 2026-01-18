import express from "express"
const server = express()

const port = 4000;

const users = [
    { name: "Naman",
      AGE : 20,  
     },
    { name: "rohan" },
    { name: "Karan" },
]

server.get("/", (req, res) => {
    res.send("This is the home page of your 4000 server port")
})

server.get("/user", (req, res) => {
    const name = req.query.name

    if (!name) {
        return res.send("Please provide name in query")
    }

    const user = users.find(
        u => u.name.toLowerCase() === name.toLowerCase()
    )

    if (!user) {
        return res.send("User not found")
    }

    res.json(user)
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})





//server is created by express js

// import express from "express"
// const server = express()

// const port = 4000;

// server.get("/",(req,res)=>{
//     res.send("this is the home page")
// })


// server.listen(port)



// this server is created by node js
// import http from "http"

// const port = 4000;

// const server = http.createServer((req,res)=>{
//     console.log("your server is started")
//     if(req.url=="/"){
//         res.end("this is the home page of your server")
//     }
//     else if(req.url == "/about"){
//          res.end("welcome to the about page")
//     }
// })

// server.listen(port)




// import express from "express"
// const app = express()

// const port = 4000;

// let users = [
//   {
//     "employeeId": 101,
//     "name": "Amit Sharma",
//     "department": "Engineering",
//     "designation": "Software Developer",
//     "salary": 60000
//   },
//   {
//     "employeeId": 102,
//     "name": "Priya Verma",
//     "department": "HR",
//     "designation": "HR Executive",
//     "salary": 45000
//   },
//   {
//     "employeeId": 103,
//     "name": "Rahul Mehta",
//     "department": "Marketing",
//     "designation": "Marketing Manager",
//     "salary": 55000
//   },
//   {
//     "employeeId": 104,
//     "name": "Sneha Patel",
//     "department": "Finance",
//     "designation": "Accountant",
//     "salary": 50000
//   },
//   {
//     "employeeId": 105,
//     "name": "Karan Singh",
//     "department": "Operations",
//     "designation": "Operations Executive",
//     "salary": 48000
//   }
// ]

// app.get("/user/:id",(req,res)=>{
//     let id = req.params.id;

//     let Exuser = users.find(user => user.employeeId == id)
//     res.json(Exuser)
// })

// app.get("/search",(req,res)=>{
//   let a = req.query
//   console.log(a)
//   res.json(a)
// })



// app.listen(port,()=>{
//     console.log("Server is Started at port no ",port)
// })

// app.use(express.json())

// app.get("/",(req,res)=>{
//     res.send("Hello this is home page of server")
// })

// app.get("/about",(req,res)=>{
//     res.json("Hello this is About page and we used Post in this server")
// })

// app.post("/",(req,res)=>{
//     let body = req.body
//     console.log(body)
//     res.send("Data received successfully")
// })

// // app.post("/",(req,res)=>{
// //     let body = req.body
// //     console.log(body)
// //     res.send()
// // })

















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


