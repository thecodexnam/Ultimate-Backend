import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/auth.css";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", userData);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Signup Successful ✅", result);
        navigate("/login"); // redirect after signup

        setUserData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        console.log("Error:", result.message);
      }
    } catch (error) {
      console.log("Server Error:", error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className='form-heading'>Join Zenith AI</h1>
        <p className='form-subtext'>Your neural journey to peak productivity starts here.</p>

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;