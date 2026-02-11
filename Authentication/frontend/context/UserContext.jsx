import React, { createContext, useState } from 'react'
import App from '../src/App';
import axios from 'axios';


export const dataContext = createContext();
const UserContext = ({children}) => {
    let [userData,setUserData] = useState(null)
    const serverUrl = "http://localhost:8000"
    const getUserData = async ()=>{
        try {
            let data = await axios.get(`${serverUrl}/api/getuserdata`)
            
        } catch (error) {
            
        }
    }


    const value = {
        serverUrl
    }


  return (
    <div>
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
    </div>
  )
}

export default UserContext