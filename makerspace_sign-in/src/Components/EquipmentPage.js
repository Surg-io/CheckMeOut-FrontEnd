import React, { Component } from 'react'
import Content from './Content'
class EquipmentPage extends Component {
  render() {
    return (
      <div className='PageContent'>
      <Content Header={"Equipment"} Text={<p>Our MakerSpace has a wide range of equipment for students, faculty, and staff to use.<br />Equipment is used on a first-come, first-serve basis.
      </p>}/>
    </div>
    )
  }
}

export default EquipmentPage