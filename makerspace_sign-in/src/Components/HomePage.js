import React, { Component } from 'react'
import InfoBox from './InfoBox'
import Content from './Content'
class HomePage extends Component {
  render() {
    return (
      <div className='PageContent'>
        <div id='SideInfo'>
          <div><InfoBox Header="Hours" 
            Text={<ul style={{listStyle:"None", marginLeft:"-12%"}}>
            <li style={{}}>
              Monday: Hour-Hour
            </li>
            <li>
              Tuesday: Hour-Hour
            </li>
            <li>
              Wednesday: Hour-Hour
            </li>
            <li>
              Thursday: Hour-Hour
            </li>
            <li>
              Friday: Hour-Hour
            </li>
            </ul>}
            />
          </div> 
          <div id="Contact">
          <InfoBox className="Contact" Header="Contact" Text={<p>Some Text</p>}/>
        </div>
        </div>
        <Content  Header="What is a MakerSpace?" Text="The MakerSpace at Moorpark College is a place for students and faculty to explore new technologies, 
        work on personal and class projects, and gather with others who enjoy making. Like the library; any student can use the MakerSpace regardless of major or class enrollment. 
        Our MakerSpace is staffed with student specialists who can assist on projects and train students on equipment.  We have a variety of tools ranging from industry-level 
        software, CNC machines, and 3D printers to traditional woodworking tools, sewing machines, and crafting supplies.  All are welcome in the MakerSpace.
        MakerSpace is located in the Campus Center near the book store."/>
      </div>

    )
  }
}

export default HomePage