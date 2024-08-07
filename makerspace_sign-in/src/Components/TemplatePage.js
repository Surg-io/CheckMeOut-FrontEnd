import React, { Component } from 'react'
import MakerSpaceHeader from './MakerSpaceHeader'
import { Outlet } from 'react-router-dom'

class TemplatePage extends Component { //Renders the Contents for Every Page. As the SideBar Menu and the MakerSpace Header will be on every page, it feels appropriate. 
  render() {
    return (
      <div>
        <MakerSpaceHeader /> 
        <Outlet />
      </div>
    )
  }
}

export default TemplatePage