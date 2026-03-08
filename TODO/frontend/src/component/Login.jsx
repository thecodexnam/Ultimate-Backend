import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/addtask.css"; // same theme

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // clear any stray data from other domains/projects
    localStorage.clear();

    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      console.log("No token found, please login.");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Login Successful ✅", result);

        // store logged-in user info
        localStorage.setItem('user', loginData.email);
        localStorage.setItem('token', result.token);

        // Force navbar update
        window.dispatchEvent(new Event('storage'));

        navigate("/"); // redirect to home
      } else {
        console.log("Error:", result.message);
      }
    } catch (error) {
      console.log("Server Error:", error.message);
    }
  };

  return (
    <div className="add-task-container">
      <h1>Login to Your Account</h1>

      <form className="add-task-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            required
          />
        </div>
        <Link to="/signup" className="signup-link">Don't have an account? Sign Up</Link>
        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;