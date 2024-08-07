import React from 'react'
import {Link} from "react-router-dom"




function SidebarMenu() {
  return (
    <div id="SidebarMenu">
        <nav>
          <ul style={{listStyle:"None", marginTop:"190px"}}>
            <li className='SidebarLinks'>
              <Link className='NoUnderlineLink' to="/">Home</Link>
            </li>
            <li className='SidebarLinks'>
              <Link className='NoUnderlineLink' to="/Equipment">Equipment</Link>
            </li>
            <li className='SidebarLinks'>
              <Link className='NoUnderlineLink' to="/Register">Register</Link>
            </li >
            <li className='SidebarLinks'>
              <Link className='NoUnderlineLink' to="/Meet_the_Team">Meet The Team</Link>
            </li>
            <li className='SidebarLinks'>
              <Link className='NoUnderlineLink' to="/CoursesPage">Courses</Link>
            </li>
            <li className='SidebarLinks'>
              <Link className='NoUnderlineLink' to="/FAQ">FAQ</Link>
            </li>
        </ul>
        </nav>
        <img id='SidebarPhoto' src={require('../Images/logo1.png')} alt="College Logo"/>
    </div>
  )
}

export default SidebarMenu
