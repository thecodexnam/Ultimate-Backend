import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../style/NavBar.css'

const NavBar = () => {
  const [user, setUser] = useState(null)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const speak = (text) => {
    if (!isVoiceEnabled || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.1
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (!isVoiceEnabled) return;
    
    const path = location.pathname;
    if (path === '/') speak("Processing task headquarters. Your objectives are ready.");
    if (path === '/focus') speak("Entering deep work zone. Neural focus initiated.");
    if (path === '/insights') speak("Analyzing performance architecture. Let's look at the data.");
    if (path === '/planner') speak("Reviewing your strategic roadmap for today.");
    if (path === '/profile') speak("Retrieving your neural rank and progression stats.");
  }, [location.pathname, isVoiceEnabled]);

  const checkUser = async () => {
    const loggedUser = localStorage.getItem('user')
    if (loggedUser) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        } else {
          setUser({ email: loggedUser }); // Fallback
        }
      } catch (err) {
        setUser({ email: loggedUser });
      }
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    checkUser()
    window.addEventListener('storage', checkUser)
    return () => window.removeEventListener('storage', checkUser)
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
      <div className='logo-container'>
        <div className='logo'>ZENITH AI</div>
        {user?.level && <span className='level-badge'>Lvl {user.level}</span>}
      </div>
      <ul className='nav-links'>
        <li><Link to="/">Tasks</Link></li>
        {user && <li><Link to="/planner">Planner</Link></li>}
        {user && <li><Link to="/insights">Insights</Link></li>}
        {user && <li><Link to="/focus">Focus</Link></li>}
        {user && <li><Link to="/profile">Profile</Link></li>}
        {user && (
          <li>
            <button 
              onClick={() => {
                const newState = !isVoiceEnabled;
                setIsVoiceEnabled(newState);
                if (newState) speak("Coach Voice enabled. I'm here to help!");
              }} 
              className='icon-btn'
              title={isVoiceEnabled ? "Mute Coach" : "Unmute Coach"}
            >
              {isVoiceEnabled ? "🔊" : "🔇"}
            </button>
          </li>
        )}
        <li>
          {user ? (
            <div className='user-section'>
              <button onClick={handleLogout} className='logout-btn'>Logout</button>
            </div>
          ) : (
            <Link to="/login" className='auth-link'>Login</Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default NavBar