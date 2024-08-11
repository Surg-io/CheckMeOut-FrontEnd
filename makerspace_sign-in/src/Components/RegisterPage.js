import React, { Component } from 'react'
import Content from './Content'

class RegisterPage extends Component {
  render() {
    return (
      <div className='PageContent'>
      <Content Header={"Register"} Text={<p>The MakerSpace implaments a Check-in/Check-out to track the use of the MakerSpace in efforts demonstrate its necessity on campus. 
        Registering allows you to keep up to date with the latest in Moorpark College MakerSpace news and assists us in pioneering efforts to get a larger space, more tools and more materials,
        all for your use!
        {/*<span style={{fontWeight:"bold"}}> All incoming users must register!</span>*/}
      </p>}/>
      <div className='Form'>
        <h1 className='Header'> Sign Up!</h1>
        <form >
        
        <div className='RegisterForm' style={{fontFamily:"Zilla Slab"}}>
          
          <label>First Name</label><input type="text" /><br />
          <label>Last Name</label><input type="text" /><br />
          <label>Email</label> <input type="text" /><br />
          <label>Student ID</label> <input type="text" /><br />
          <label>Major </label> 
          <select name='Major'>
          <option value={"Accounting"}> Accounting </option>
          <option value={"Aerospace Engineering"}> Aerospace Engineering </option>
          <option value={"African American Studies"}> African American Studies </option>
          <option value={"Anthropology"}> Anthropology </option>
          <option value={"Art History"}> Art History </option>
          <option value={"Asian American Studies"}> Asian American Studies </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          <option value={"CS"}> Computer Science </option>
          </select><br />
          <input type="submit"/>
          
          
        </div>

      </form>
      </div>
      

    </div>
    )
  }
}

export default RegisterPage