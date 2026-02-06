import React, { useState } from "react";
import dp from "../assets/dp.jpg"; // Assuming you have an avatar image in the assets folder;

const SignUp = () => {
    let[firstName, setFirstName] = useState(null);
    let[lastName, setLastName] = useState(null);
    let[username, setUsername] = useState(null);
    let[email, setEmail] = useState(null);
    let[password, setPassword] = useState(null);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center px-4">
      <div className="w-full max-w-[480px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join us and start your journey
        </p>

        <form className="flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-6 group">
            <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-4 border-gray-300 shadow-md">
              <img
                src={dp}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-sm cursor-pointer text-[10px]">Change</span>
            </div>
          </div>

          {/* Inputs */}
          <input
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            type="text"
            placeholder="First Name"
            className="w-full h-11 px-4 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
          />

          <input
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            type="text"
            placeholder="Last Name"
            className="w-full h-11 px-4 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
          />

          <input
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-full h-11 px-4 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
          />

          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full h-11 px-4 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
          />

          <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full h-11 px-4 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
          />

          {/* Button */}
          <button className="w-full h-11 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-semibold tracking-wide hover:scale-[1.02] hover:shadow-xl transition active:scale-95">
            Sign Up
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-4">
            Already have an account?{" "}
            <span className="text-black font-semibold cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
