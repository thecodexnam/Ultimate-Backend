import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// 1️⃣ Create the Context (The global storage box)
export const dataContext = createContext();

const UserContext = ({ children }) => {
  // 2️⃣ Global State: Holds the logged-in user's data
  const [userData, setUserData] = useState(null);

  // Use existing VITE_SERVER_URL if available (Production), otherwise localhost (Development)
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

  // ============================================
  // FETCH USER DATA (Check if logged in)
  // ============================================
  const getUserData = async () => {
    try {
      // 3️⃣ Send request to backend to check if we have a valid cookie
      const { data } = await axios.get(
        `${serverUrl}/api/getuserdata`,
        { withCredentials: true } // Must be true to send the cookie
      );

      // 4️⃣ If successful, update state (App knows we are logged in)
      setUserData(data);
    } catch (error) {
      if (error.response?.status === 401) {
        setUserData(null); // No valid token = User not logged in
      } else {
        console.log("Error fetching user:", error);
      }
    }
  };

  // 5️⃣ Run once when the app starts
  useEffect(() => {
    getUserData();
  }, []);

  return (
    // 6️⃣ Provide the state and functions to the rest of the app
    <dataContext.Provider
      value={{ serverUrl, userData, setUserData, getUserData }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default UserContext;
