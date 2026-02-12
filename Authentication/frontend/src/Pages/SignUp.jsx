import React, { useContext, useRef, useState } from "react";
import dp from "../assets/dp.jpg"; // Default avatar image
import { dataContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { motion } from "framer-motion";

const SignUp = () => {
  let navigate = useNavigate(); // Hook to navigate between pages
  // Access global state (user data and server URL)
  let { serverUrl, userData, setUserData, getUserData } = useContext(dataContext);

  // Local state for form fields
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [passWord, setPassWord] = useState("");

  // Ref to trigger file input click
  let file = useRef(null);

  // States for Image Preview
  let [frontendImage, setFrontendImage] = useState(dp); // Shows default or selected image
  let [backendImage, setBackendImage] = useState(null); // Stores the actual file to send to backend

  // Function to handle image selection
  function handleImage(e) {
    let file = e.target.files[0];
    setBackendImage(file);
    let image = URL.createObjectURL(file); // Create a temporary URL for preview
    setFrontendImage(image);
  }

  // ============================================
  // HANDLE SIGNUP
  // ============================================
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      // 1️⃣ Prepare Data: We use FormData because we are sending a FILE (image)
      let formData = new FormData()
      formData.append("firstName", firstName)
      formData.append("lastName", lastName)
      formData.append("userName", userName)
      formData.append("email", email)
      formData.append("passWord", passWord)
      if (backendImage) {
        formData.append("profileImage", backendImage)
      }

      // 2️⃣ Send Data to Backend
      let response = await axios.post(
        `${serverUrl}/api/signup`, formData,
        {
          withCredentials: true, // IMPORTANT: Allows cookies (token) to be received
          headers: { "Content-Type": "multipart/form-data" } // Tell server we aren't just sending text
        });

      // ✅ Set user immediately from signup response
      setUserData(response.data?.user || response.data);

      // 3️⃣ Update App State: Fetch the new user's data immediately
      await getUserData()

      // 4️⃣ Success Feedback
      toast.success("Account Created Successfully!");
      setTimeout(() => navigate('/home'), 1000); // Redirect to Home after 1s

      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center px-4">
      {/* Animation Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[480px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join us and start your journey
        </p>

        <form className="flex flex-col items-center">
          {/* Hidden File Input */}
          <input type="file" hidden ref={file} onChange={handleImage} />

          {/* Avatar Section */}
          <div className="relative mb-6 group">
            <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-4 border-gray-300 shadow-md">
              <img
                src={frontendImage}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hover Effect to Change Image */}
            <div
              className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              onClick={() => file.current.click()} // Triggers the hidden file input
            >
              <span className="text-white text-sm cursor-pointer text-[10px]">
                Change
              </span>
            </div>
          </div>

          {/* Form Inputs */}
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="First Name"
            className="w-full h-11 px-4 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
          />

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last Name"
            className="w-full h-11 px-4 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
          />

          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-full h-11 px-4 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full h-11 px-4 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
          />

          <input
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full h-11 px-4 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
          />

          {/* Signup Button */}
          <button
            onClick={handleSignUp}
            className="w-full h-11 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-semibold tracking-wide hover:scale-[1.02] hover:shadow-xl transition active:scale-95"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p
            className="text-xs text-gray-500 mt-4"
            onClick={() => navigate("/login")}
          >
            Already have an account?{" "}
            <span className="text-black font-semibold cursor-pointer hover:underline ">
              Login
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
