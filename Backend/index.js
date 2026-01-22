import express from "express"

const server = express()
const port = 4444;

server.use(express.json())

let password = "naman123"

server.get("/",(req,res)=>{
    res.send("This is our Home Page")
})

server.use((req, res, next) => {
    if (req.body && req.body.pass !== password) {
        return res.send("Password does not match");
    }
    next();
});

server.listen(port,()=>{
    console.log(`Our server is Running on Port no ${port}`)
})

// server.get("/user",(req,res)=>{
//     const {name,age} = req.query
//     res.send(`Fetching the user with name ${name} and ${age}`)
// })


// server.listen(port,()=>{
//     console.log(`This server is running on port ${port}`)
// })

// app api == rest aPI
// rest Api != Api



// const users = [
//   { id: 1, name: "Naman", role: "Developer" },
//   { id: 2, name: "Amit", role: "Designer" },
//   { id: 3, name: "Rohit", role: "Tester" }
// ];


// server.get("/",(req,res)=>{
//     res.send("This is our express Js Server")
// })

// server.get("/user/:id",(req,res)=>{
//     let id = Number(req.params.id)
//     const user = users.find(user => user.id === id)

//     if(!user){
//         return res.status(404).send("User not Found")
//     }
//     else{
//         res.json(user)
//     }
    
// })





// import http from "http";

// const port = 5000;

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.end("Hello I am the Home Page");
//   }
//   else if(req.url="user"){
//     res.end("Hello I am user")
//   }

//   else if(req.url="codeX"){
//     res.end("This is Your First")
//   }
// });

// server.listen(port, () => {
//   console.log(`Server is started on port no ${port}`);
// });






// import express from "express"
// import cors from "cors" // cross origin resourse 

// const server = express()
// const port = 4000;

// const users = [
//   { id: 1, name: "Naman", role: "Developer" },
//   { id: 2, name: "Amit", role: "Designer" },
//   { id: 3, name: "Rohit", role: "Tester" }
// ];


// server.get('/',(req,res)=>{
//     res.send("Hello I'm Home page")
// })

// server.get("/user/:idx",(req,res)=>{
//     let idx = req.params.idx;
//     res.send(`The user id is ${idx}`)
// })

// server.get("/users",(req,res)=>{
//     const id = Number(req.query.id);
//     const user = users.find(user => user.id === id)

//     if(!user){
//         return res.status(404).send("User not Found")
//     }
//     res.json(user)
// })

// server.listen(port,()=>{
//     console.log(`Server Started on port no ${port}`);
    
// })

// import http from 'http'

// const port = 4000;

// const server = http.createServer((req,res)=>{
//     if(req.url==="/"){
//         res.end("Hello I am the server");
//     }
//     else if(req.url === "/user"){
//         res.end("This is the User Page ")
//     }
//     else{
//         res.end("404 Error")
//     }
// })


// server.listen(port,()=>{
//     console.log('server is started on port no 4000')
// })



// const port = 5000;

// server.get("/", (req, res) => {
// /* Request Header */
//     const userAgent = req.get("user-agent");
//     console.log(userAgent);

/* Response Header */
//     res.set("x-username","Naman")

//     /* Remove Header */
//     res.removeHeader("x-powered-by")
    
    
//     res.status(200).json({
//     name: "Naman",
//     age: 20,
//     course: "BCA"
//   });
// });


// server.post("/",(req,res)=>{
//     console.log(req.body);    
//     res.status(200).send({success:true})
// })

// server.listen(port,()=>{
//     console.log(`Server is running on port ${port}`);
// })

