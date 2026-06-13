import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/auth.css";

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
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
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Log in to check your tasks and advice.</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="name@example.com"
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
              placeholder="••••••••"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;