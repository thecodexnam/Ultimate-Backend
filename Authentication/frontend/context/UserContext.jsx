import React, { createContext } from 'react'
import App from '../src/App';


export const dataContext = createContext();
const UserContext = ({children}) => {
    const serverUrl = 'http://localhost:8000'
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