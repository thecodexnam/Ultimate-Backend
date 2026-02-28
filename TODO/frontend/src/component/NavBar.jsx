import React from 'react'
import { Link } from 'react-router-dom'
import '../style/NavBar.css'

const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='logo'>TO DO APP</div>
      <ul className='nav-links'>
        <li><Link to="/">List</Link></li>
        <li><Link to="/add">Add Task</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar