import React,{Component} from 'react'
import { useState } from 'react'
import SidebarMenu from './SidebarMenu'
function MCMakerspace(){

  const [open,setOpen] = useState(false)
  const ToggleMenu = () => {setOpen(!open)}

  return (
    <div>
       
      <div id='MakerSpaceHeader'>
        <div id="MoorparkCollegetxt">MOORPARK <br/>     COLLEGE</div>
        <img id="HeaderPhoto" src={require('../Images/MSLogo.png')} alt="Moorpark College Logo"/> 
        <div id="Makerspacetxt">MakerSpace</div>
      </div>
      <div>
        {open && <SidebarMenu/>}
      </div>
      <img id="MenuToggle" src={require('../Images/MenuToggle.png')} onClick={ToggleMenu} atl="ToggleBar"/> 
    </div>
   
  )

    
}

export default MCMakerspace