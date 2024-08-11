import React, { Component } from 'react'
import Content from './Content'
import { Link } from 'react-router-dom'
class CoursesPage extends Component {
  render() {
    return (
      <div className='PageContent'>
      <Content Header={"Make Space for MakerSpace"} Text={<p>Our non-credit workshops/courses are for learners of all ages! Discover new skills in these short, hands-on, and 
        free MakerSpace courses. Take one, two, or all of them! <br />
        <a style={{}}className="NoUnderlineLink" href='https://ssb.vcccd.edu/prod/pw_pub_sched.P_Simple_SEARCH'>MakerSpace course are listed in the schedule of classes under MakerSpace(MAKR)</a><br />
        <a className="NoUnderlineLink" href='https://www.moorparkcollege.edu/apply-and-enroll'> View to Enroll as a Moorpark College Student in a non-credit class</a><br /><br />
        <span style={{fontFamily:"Zilla Slab", fontStyle:"italic"}}>* Required for some MakerSpace Equipment</span>
        </p>}/>
        <div>
       <h1 className='InfoBoxHeader'> Courses</h1>
       <ul className=' ContentText' style={{listStyle:"", marginLeft:""}}>
            <li style={{}}>
            Introduction to MakerSpace: MAKR M901
            </li>
            <li>
            Introduction to Design Thinking: MAKR M903
            </li>
            <li>
            Adobe Illustrator for MakerSpace: MAKR M910
            </li>
            <li>
            Vinyl Cutting and Printing: MAKR M920*
            </li>
            <li>
              Laser Cutting and Engraving: MAKR M925*
            </li>
            <li>
             Screen Printing for Textiles: MAKR M930*
            </li>
            </ul>
      </div>
      
    </div>
    )
  }
}

export default CoursesPage