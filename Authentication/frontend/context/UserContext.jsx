import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const dataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const serverUrl = "http://localhost:8000";

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/getuserdata`,
        { withCredentials: true }
      );
      setUserData(data);
    } catch (error) {
      if (error.response?.status === 401) {
        setUserData(null); // user not logged in
      } else {
        console.log("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <dataContext.Provider
      value={{ serverUrl, userData, setUserData, getUserData }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default UserContext;
