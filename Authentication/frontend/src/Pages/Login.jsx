import React, { useContext, useState } from "react";
import dp from "../assets/dp.jpg";
import { dataContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { motion } from "framer-motion";

const Login = () => {
  let navigate = useNavigate()
  // 1️⃣ Access Global State
  let { serverUrl, userData, setUserData, getUserData } = useContext(dataContext);

  // 2️⃣ Local State for Inputs
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");

  // ============================================
  // HANDLE LOGIN
  // ============================================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 3️⃣ Send Login Credentials to Backend
      const response = await axios.post(
        `${serverUrl}/api/login`,
        {
          email,
          passWord,
        },
        { withCredentials: true }); // Important: Allows us to receive the 'token' cookie

      // ✅ Set user immediately from login response (works even if cookie fetch is delayed/blocked)
      if (response.data?.user) {
        setUserData(response.data.user);
      }

      // 4️⃣ Fetch User Data immediately after successful login
      await getUserData()

      // 5️⃣ Success Message & Redirect
      toast.success(response.data.message || "Login Successful!");
      navigate('/home')

      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to continue
        </p>

        <form className="flex flex-col items-center">

          {/* Email Input */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full h-11 px-4 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
          />

          {/* Password Input */}
          <input
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full h-11 px-4 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
          />

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full h-11 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-semibold tracking-wide hover:scale-[1.02] hover:shadow-xl transition active:scale-95"
          >
            Login
          </button>

          {/* Sign Up Link */}
          <p className="text-xs text-gray-500 mt-4">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")} className="text-black font-semibold cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
