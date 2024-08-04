import React from 'react'
import {Outlet,Link} from "react-router-dom"

function SidebarMenu(props) {
  return (
    <div>
        <img id='SidebarLogo' src={require('../Images/MSLogo.png')} alt="MakerSpace Logo"/>
        <nav>
          <ul id="SidebarLinks">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Equipment">Equipment</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="/Meet_the_Team">Meet_the_Team</Link>
            </li>
            <li>
              <Link to="/CoursesPage">CoursesPage</Link>
            </li>
            <li>
              <Link to="/FAQ">FAQ</Link>
            </li>
        </ul>
        
        </nav>
        <Outlet/>
    </div>
  )
}

export default SidebarMenu
