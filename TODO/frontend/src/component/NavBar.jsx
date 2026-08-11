import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../style/NavBar.css';

// Small voice map keeps page-specific prompts easy to read and update.
const voiceMessages = {
  '/': 'Processing task headquarters. Your objectives are ready.',
  '/focus': 'Entering deep work zone. Neural focus initiated.',
  '/insights': 'Analyzing performance architecture. Let us look at the data.',
  '/planner': 'Reviewing your strategic roadmap for today.',
  '/profile': 'Retrieving your neural rank and progression stats.',
};

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const speak = (text) => {
    if (!isVoiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  // Keep the assistant voice in sync with the current screen.
  useEffect(() => {
    const message = voiceMessages[location.pathname];
    if (isVoiceEnabled && message) {
      speak(message);
    }
  }, [location.pathname, isVoiceEnabled]);

  const refreshUser = async () => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      setUser(null);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user);
      } else {
        setUser({ email: storedUser });
      }
    } catch (error) {
      console.error('Unable to refresh account state', error);
      setUser({ email: storedUser });
    }
  };

  useEffect(() => {
    refreshUser();
    window.addEventListener('storage', refreshUser);

    return () => window.removeEventListener('storage', refreshUser);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed', error);
    }

    localStorage.clear();
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const toggleVoice = () => {
    const nextValue = !isVoiceEnabled;
    setIsVoiceEnabled(nextValue);

    if (nextValue) {
      speak('Coach voice enabled. I am ready to help!');
    }
  };

  const isLoggedIn = Boolean(user);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo">ZENITH AI</div>
        {user?.level && <span className="level-badge">Lvl {user.level}</span>}
      </div>

      <ul className="nav-links">
        <li><Link to="/">Tasks</Link></li>
        {isLoggedIn && <li><Link to="/planner">Planner</Link></li>}
        {isLoggedIn && <li><Link to="/insights">Insights</Link></li>}
        {isLoggedIn && <li><Link to="/focus">Focus</Link></li>}
        {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}

        <li>
          {isLoggedIn ? (
            <div className="user-section">
              <button
                onClick={toggleVoice}
                className="icon-btn voice-toggle"
                title={isVoiceEnabled ? 'Mute Coach' : 'Unmute Coach'}
              >
                {isVoiceEnabled ? '🔊' : '🔇'}
              </button>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="auth-link">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;