import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// 1️⃣ Create the Context (The global storage box)
export const dataContext = createContext();

const UserContext = ({ children }) => {
  // 2️⃣ Global State: Holds the logged-in user's data
  const [userData, setUserData] = useState(null);
  const [configError, setConfigError] = useState("");
  const [loading, setLoading] = useState(true);

  // Use existing VITE_SERVER_URL if available (Production), otherwise localhost (Development)
  const envServerUrl = import.meta.env.VITE_SERVER_URL;
  const serverUrl = envServerUrl || (import.meta.env.DEV ? "http://localhost:8000" : "");

  // ============================================
  // FETCH USER DATA (Check if logged in)
  // ============================================
  const getUserData = async () => {
    try {
      if (!serverUrl) {
        setConfigError(
          "Missing VITE_SERVER_URL. Add it in Vercel Environment Variables (example: https://<your-render-service>.onrender.com)."
        );
        return;
      }

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
    } finally {
      setLoading(false);
    }
  };

  // 5️⃣ Run once when the app starts
  useEffect(() => {
    getUserData();
  }, []);

  if (configError) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 720, fontFamily: "system-ui, sans-serif" }}>
          <h2 style={{ fontSize: 20, marginBottom: 12 }}>Deployment configuration needed</h2>
          <p style={{ lineHeight: 1.5, marginBottom: 12 }}>{configError}</p>
          <p style={{ lineHeight: 1.5, marginBottom: 0 }}>
            Also ensure your backend has <code>FRONTEND_URL</code> set to your Vercel domain and <code>NODE_ENV=production</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    // 6️⃣ Provide the state and functions to the rest of the app
    <dataContext.Provider
      value={{ serverUrl, userData, setUserData, getUserData, loading }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default UserContext;
