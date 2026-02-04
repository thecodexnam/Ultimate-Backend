import React, { useState } from 'react'
import College from './College'
import { SubjectContext } from './Contextdata'
import Student from './Student'

const App = () => {
  const[subject,setSubject] = useState('')
  return (
    <div style={{backgroundColor:"red",padding:"10px"}}>
      <SubjectContext.Provider value={subject}>
        <select Value = {subject} onChange={(e)=>setSubject(e.target.value)}>
          <option value="">Select subject</option>
          <option value="Data Structure">Data Structure</option>
          <option value="Networking">Networking</option>
          <option value="JavaScript">JavaScript</option>
        </select>
      <h1>Context API</h1>
      <button onClick={()=>setSubject('')}>Clear Subject</button>
      <College/>
      </SubjectContext.Provider>
    </div>
  )
}

export default App



// import React, { useState } from "react";
// import axios from "axios"

// import "./App.css";

// const App = () => {
//   const [username, setUsername] = useState("");
//   const [city, setCity] = useState("");
//   const [age, setAge] = useState("");
//   const [password, setPassword] = useState("");

//   const handleInputs = async () => {
//     try{
//       const response = await axios.post("http://localhost:4444/",{
//         username: username,
//         city:city,
//         age:age,
//         pass: password,
//       });

//       console.log("Response:", response.data);
//       alert("Data Send Successfully")
//     }
//     catch (err) {
//       alert(err.response?.data?.message || err.message);
//   }
// }

// const GetData = async () => {
//   const response = await axios.get("http://localhost:4444/user");
//   console.log(response.data);
// };

    
//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="UserName"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="City"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter Your age"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleInputs}>Send Data</button>
//       <button onClick={GetData}>Get Data from Server</button>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// const App = () => {
//   const [username, setUsername] = useState("");
//   const [city, setCity] = useState("");
//   const [age, setAge] = useState("");
//   const [password, setPassword] = useState("");

//   const getRes = async () => {
//     try {
//       const response = await axios.post("http://localhost:4444/", {
//         username,
//         city,
//         age,
//         pass: password, // ✅ dynamic password
//       });

//       console.log(response.data);
//       alert("Data sent successfully");
//     } catch (err) {
//       alert(err.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="City"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />

//       <input
//         type="number"
//         placeholder="Age"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={getRes}>Send Data</button>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from 'react'
// import axios from "axios"

// const App = () => {
//   let[username,setUsername] = useState('')
//   let[city,setCity] = useState('')
//   let[age,setAge] = useState('')

//   async function getRes() {
//     // try {
//     //   const res = await fetch("http://localhost:5000/")
//     //   const data = await res.json()
//     //   console.log(data)
//     // } catch (error) {
//     //   console.log(error)
//     // }

//   axios.post("http://localhost:4444/",
//     {username,
//      city,
//      age
//     })
//   .then((e)=>{
//     console.log(e.data.name);
//   })

//   .catch((error)=>{
//     console.log(error);
//   })
//   }

//   return (
//     <div>
//       {/* <button onClick={getRes}>Send</button> */}
//       <input type="text" placeholder='UserName' value={username} onChange={(e) =>setUsername(e.target.value)} />
//       <input type="text" value={city} placeholder='City' onChange={(e) =>setCity(e.target.value)}  />
//       <input type="text" value={age} placeholder='Enter Your age' onChange={(e) =>setAge(e.target.value)} />
//       <button onClick={()=>getRes()}>Send Data</button>
//     </div>
//   )
// }

// export default App
