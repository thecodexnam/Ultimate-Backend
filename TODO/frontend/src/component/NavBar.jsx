import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/NavBar.css'

const NavBar = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = () => {
      const loggedUser = localStorage.getItem('user')
      setUser(loggedUser || null)
    }

    // Check on mount
    checkUser()

    // Listen for cross-tab login/logout events or custom dispatch
    window.addEventListener('storage', checkUser)

    return () => {
      window.removeEventListener('storage', checkUser)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
    localStorage.clear()
    setUser(null)
    window.dispatchEvent(new Event('storage'))
    navigate('/login')
  }

  return (
    <nav className='navbar'>
      <div className='logo'>TO DO APP</div>
      <ul className='nav-links'>
        <li><Link to="/">List</Link></li>
        {user && <li><Link to="/add">Add Task</Link></li>}
        {user && <li><Link to="/planner">Daily Planner</Link></li>}
        {user && <li><Link to="/insights">Insights</Link></li>}
        <li>
          {user ? (
            <>
              <span className='user-info'>Welcome, {user}</span>
              <button onClick={handleLogout} className='logout-btn'>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default NavBar