import React from 'react'
import { Link } from 'react-router-dom'
import '../style/NavBar.css'

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>TO DO APP</div>
        <ul className='nav-links'>
          <li><Link to={"/"}>List</Link></li>
          <li><Link to={"/add"}>Add Task</Link></li>
        </ul>
    </div>
  )
}

export default NavBar