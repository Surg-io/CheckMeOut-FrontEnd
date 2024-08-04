import React, { Component } from 'react'
import MCMakerspace from './MCMakerspace'
import InfoBox from './InfoBox'
import Content from './Content'
class HomePage extends Component {
  render() {
    return (
      <>
        <InfoBox id="HomeIBHours" Header="Hours" Text="Put Hours in Here"/>
        <InfoBox id="HomeIBContact" Header="Contact" Text="Put Contact in Here"/>
        <Content id="HomeContent" Header="AboutUS" Text="Talk about Makerspace Here"/>


      </>

    )
  }
}

export default HomePage