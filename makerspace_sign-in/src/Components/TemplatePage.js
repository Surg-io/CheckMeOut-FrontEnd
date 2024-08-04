import React, { Component } from 'react'
import MCMakerspace from './MCMakerspace'
import SidebarMenu from './SidebarMenu'

class TemplatePage extends Component { //Renders the Contents for Every Page. As the SideBar Menu and the MakerSpace Header will be on every page, it feels appropriate. 
  render() {
    return (
      <>
        <MCMakerspace/> 
        <SidebarMenu/>
      </>
    )
  }
}

export default TemplatePage