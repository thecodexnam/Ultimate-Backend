import React, { useState } from 'react'
import axios from "axios"

const App = () => {
  let[username,setUsername] = useState('')
  let[city,setCity] = useState('')
  let[age,setAge] = useState('')

  async function getRes() {
    // try {
    //   const res = await fetch("http://localhost:5000/")
    //   const data = await res.json()
    //   console.log(data)
    // } catch (error) {
    //   console.log(error)
    // }

  axios.post("http://localhost:5000/",
    {username,
     city,
     age
    })
  .then((e)=>{
    console.log(e.data.name);
  })

  .catch((error)=>{
    console.log(error);
  })
  }



  return (
    <div>
      {/* <button onClick={getRes}>Send</button> */}
      <input type="text" placeholder='UserName' value={username} onChange={(e) =>setUsername(e.target.value)} />
      <input type="text" value={city} placeholder='City' onChange={(e) =>setCity(e.target.value)}  />
      <input type="text" value={age} placeholder='Enter Your age' onChange={(e) =>setAge(e.target.value)} />
      <button onClick={()=>getRes()}>Send Data</button>
    </div>
  )
}

export default App