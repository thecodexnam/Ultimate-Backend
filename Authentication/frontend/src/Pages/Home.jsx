import React, { useContext, useEffect } from 'react';
import { dataContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Home = () => {
  // 1️⃣ Access Global State
  const { userData, setUserData, serverUrl, loading } = useContext(dataContext);
  const navigate = useNavigate();

  // If not logged in, go back to login (prevents infinite Loading on deploy)
  useEffect(() => {
    if (!loading && !userData) {
      navigate('/login');
    }
  }, [loading, userData, navigate]);

  // ============================================
  // HANDLE LOGOUT
  // ============================================
  const handleLogout = async () => {
    try {
      // 2️⃣ Call Logout API
      await axios.post(`${serverUrl}/api/logout`, {}, { withCredentials: true });

      // 3️⃣ Clear User Data in Frontend
      setUserData(null);

      // 4️⃣ Redirect to Login
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // 5️⃣ Loading State (Wait for user data to load)
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-800 backdrop-blur-md sticky top-0 bg-black/50">
        <h1 className="text-2xl font-bold tracking-wider">AuthApp</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition transform hover:scale-105"
        >
          Logout
        </button>
      </nav>

      {/* Content */}
      <div className="flex flex-col items-center justify-center pt-20 px-4">
        {/* Animated Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-gray-900/50 border border-gray-800 p-10 rounded-3xl shadow-2xl backdrop-blur-xl w-full max-w-lg text-center"
        >
          {/* Profile Image Section */}
          <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-4xl font-bold mb-6 overflow-hidden border-4 border-gray-800 shadow-lg">
            {/* Conditional Rendering: Show Image if exists, else Show Initial */}
            {userData.profileImage ? (
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              // Optional chaining (?.) prevents crash if firstName is undefined
              userData.firstName?.[0]?.toUpperCase()
            )}
          </div>

          <h2 className="text-3xl font-extrabold mb-2">
            Hello, {userData.firstName} {userData.lastName}!
          </h2>
          <p className="text-gray-400 mb-8">{userData.email}</p>

          <div className="space-y-4 text-left bg-black/30 p-6 rounded-2xl">
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-500">Username</span>
              <span className="font-semibold">{userData.userName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-500">User ID</span>
              <span className="font-mono text-xs text-gray-400">{userData._id}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;