import React, { Component } from 'react'
import Content from './Content'
import RegisterForm from './RegisterForm'
class RegisterPage extends Component {
  render() {
    return (
      <div className='PageContent'>
      <Content Header={"Register"} Text={<p>The MakerSpace implements a Check-in/Check-out to track the use of the MakerSpace in efforts demonstrate its necessity on campus. 
        Registering allows you to keep up to date with the latest in Moorpark College MakerSpace news and assists us in pioneering efforts to get a larger space, more tools and more materials,
        all for your use!<br /><br />
        {/*<span style={{fontWeight:"bold"}}> All incoming users must register!</span>*/}
        <span style={{fontStyle: "italic"}}>Fill out the form below to generate a QRCode that you can use to check into the MakerSpace. A copy will also be sent to your email in case you lose it! </span><br />
      </p>}/>
      <RegisterForm />
      
      </div>
    )
  }
}

export default RegisterPage