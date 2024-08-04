import React from 'react'
import {Outlet,Link} from "react-router-dom"

function SidebarMenu() {
  return (
    <div id="SidebarMenu">
        <img id='SidebarPhoto' src={require('../Images/MSLogo.png')} alt="MakerSpace Logo"/>
        <nav>
          <ul >
            <li className='SidebarLinks'>
              <Link to="/">Home</Link>
            </li>
            <li className='SidebarLinks'>
              <Link to="/Equipment">Equipment</Link>
            </li>
            <li className='SidebarLinks'>
              <Link to="/Register">Register</Link>
            </li >
            <li className='SidebarLinks'>
              <Link to="/Meet_the_Team">Meet_the_Team</Link>
            </li>
            <li className='SidebarLinks'>
              <Link to="/CoursesPage">CoursesPage</Link>
            </li>
            <li className='SidebarLinks'>
              <Link to="/FAQ">FAQ</Link>
            </li>
        </ul>
        
        </nav>
        <Outlet/>
    </div>
  )
}

export default SidebarMenu
