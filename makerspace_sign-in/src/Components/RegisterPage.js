import React, { Component } from 'react'
import Content from './Content'
import RegisterForm from './RegisterForm'
class RegisterPage extends Component {
  render() {
    return (
      <div className='PageContent'>
      <Content Header={"Register"} Text={<p>The MakerSpace implaments a Check-in/Check-out to track the use of the MakerSpace in efforts demonstrate its necessity on campus. 
        Registering allows you to keep up to date with the latest in Moorpark College MakerSpace news and assists us in pioneering efforts to get a larger space, more tools and more materials,
        all for your use!
        {/*<span style={{fontWeight:"bold"}}> All incoming users must register!</span>*/}
      </p>}/>
      <RegisterForm />
      </div>
    )
  }
}

export default RegisterPage