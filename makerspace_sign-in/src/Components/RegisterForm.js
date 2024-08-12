import React from 'react'
import { useState } from 'react'
function RegisterForm() {
    const [FN, FNChange] = useState(""); {/*State Variables for the inputs*/}
    const [LN,LNChange] = useState("");
    const [Email,EmailChange] = useState("");
    const [ID,IDChange] = useState("");
    const [Major,MajorChange] = useState("None")

    function HandleSubmit(e)
    {
        e.preventDefault(); {/*Prevents the default behavior of the submit button, which is to refresh the page*/ }
        if(validate()) 
        {
            const form = e.target; {/*Put the User data into a variable*/ } 
            const formData = new FormData(form); {/*Create a "FormData" object using the user input*/ }
            const formJson = Object.fromEntries(formData.entries()); {/*Create a JS object, which is in key value pairs, from our FormData object. It just so happens to be in JSON format*/ }
            console.log(formJson); {/*Print to the log the JSON "file", aka the new JS Object u made */ }
           
        }
        else
        {
            alert(`Make sure to choose a Major!`);
        } 
    }

    const validate = () => 
    {
        if(Major === "None")
        {
            return false
        }
        return true;
    }

  return (
    <div className='Form' onSubmit={HandleSubmit}> {/*When the submit button at the bottom is clicked, run the HandleSubmit function or else you will lose user input*/ }
        <h1 className='Header'> Sign Up!</h1>
        <form >  {/*Consider moving the whole form into a new component as every adjustment to the "value" of each input triggers a rerender*/}
        
        <div className='RegisterForm' style={{fontFamily:"Zilla Slab"}}>
          
          <label>First Name</label><input name='FN' value={FN} onChange={e => FNChange(e.target.value)}  required placeholder="Ex: Peter" pattern='^[a-zA-Z]{1,25}$'  minLength="1" maxLength="25" type="text" /><br />
          <label>Last Name</label><input name='LN' value={LN} onChange={e => LNChange(e.target.value)} required placeholder="Ex: Anteater"  pattern='^[a-zA-Z]{1,40}$'  minLength="1" maxLength="40" type="text" /><br />
          <label>Email</label> <input name='Email' value={Email} onChange={e => EmailChange(e.target.value)} required placeholder="Ex: name@my.vcccd.edu" pattern='^[\w]+@([\w]+\.[\w]+){1,4}$' type="text" /><br />
          <label>Student ID</label> <input name='ID' value={ID} onChange={e => {IDChange(e.target.value); console.log(e.target.value)}} placeholder="Ex: 123456879" required pattern='[0-9]{9}' minLength="9" maxLength="9" type="text" /><br />
          <label>Major </label> 
          <select name='Major' value={Major} onChange={e=> MajorChange(e.target.value)} required>
            <option  value="None"> None </option>   {/*MC class registration website does it like this ¯\_(ツ)_/¯ */}
    <option value="AB">AB Automotive Body Repair & Paint</option>
    <option value="AC">AC AirConditioning&Refrigeration</option>
    <option value="ACCT">ACCT Accounting</option>
    <option value="ACE">ACE Automotive Career Education</option>
    <option value="ACT">ACT Assistive Computer Technology</option>
    <option value="ADS">ADS Addictive Disorders Studies</option>
    <option value="AG">AG Agriculture</option>
    <option value="ANAT">ANAT Anatomy</option>
    <option value="ANCT">ANCT Animal Care and Training</option>
    <option value="ANPH">ANPH Anatomy/Physiology</option>
    <option value="ANSC">ANSC Animal Science</option>
    <option value="ANTH">ANTH Anthropology</option>
    <option value="ARCH">ARCH Architecture</option>
    <option value="ART">ART Art</option>
    <option value="ARTH">ARTH Art History</option>
    <option value="ASL">ASL American Sign Language</option>
    <option value="AST">AST Astronomy</option>
    <option value="AT">AT Automotive Technology</option>
    <option value="AUTO">AUTO Automotive</option>
    <option value="BIOL">BIOL Biology</option>
    <option value="BIOT">BIOT Biotechnology</option>
    <option value="BIS">BIS Business Information Systems</option>
    <option value="BUS">BUS Business</option>
    <option value="CAOT">CAOT Computer Apps/Office Tech</option>
    <option value="CD">CD Child Development</option>
    <option value="CDL">CDL Cognitively Diverse Learner</option>
    <option value="CHEM">CHEM Chemistry</option>
    <option value="CHIN">CHIN Chinese</option>
    <option value="CHST">CHST Chicano Studies</option>
    <option value="CIS">CIS Computer Information Systems</option>
    <option value="CJ">CJ Criminal Justice</option>
    <option value="CNIT">CNIT Computer Networking/IT</option>
    <option value="CNSE">CNSE Computer Netwrk Sys. Engr. Prg</option>
    <option value="COL">COL College</option>
    <option value="COMM">COMM Communication Studies</option>
    <option value="COUN">COUN Counseling</option>
    <option value="CRM">CRM Culinary Arts & Restaurant Mgt</option>
    <option value="CS">CS Computer Science</option>
    <option value="CT">CT Construction Technology</option>
    <option value="DA">DA Dental Assistant</option>
    <option value="DANC">DANC Dance</option>
    <option value="DES">DES Design</option>
    <option value="DH">DH Dental Hygiene</option>
    <option value="DM">DM Diesel Mechanics</option>
    <option value="DRFT">DRFT Drafting</option>
    <option value="EAC">EAC Educational Assistance Center</option>
    <option value="ECE">ECE Early Childhood Education</option>
    <option value="ECON">ECON Economics</option>
    <option value="EDU">EDU Education</option>
    <option value="EMS">EMS Emergency Medical Services</option>
    <option value="EMT">EMT Emergency Medical Technology</option>
    <option value="ENGL">ENGL English</option>
    <option value="ENGM">ENGM English for Multilingual Stdts</option>
    <option value="ENGR">ENGR Engineering</option>
    <option value="ENGT">ENGT Engineering Technology</option>
    <option value="ENSC">ENSC Environmental Science</option>
    <option value="ESL">ESL Engl as a second language</option>
    <option value="ESRM">ESRM Environmtl Sci & Resource Mgt</option>
    <option value="ETHS">ETHS Ethnic Studies</option>
    <option value="FILI">FILI Filipino</option>
    <option value="FILM">FILM Film Studies</option>
    <option value="FREN">FREN French</option>
    <option value="FT">FT Fire Technology</option>
    <option value="FTMA">FTMA Film, Television, Media Arts</option>
    <option value="FTVE">FTVE Film, Television, & Elec Media</option>
    <option value="GAME">GAME Game Design</option>
    <option value="GEOG">GEOG Geography</option>
    <option value="GEOL">GEOL Geology</option>
    <option value="GERM">GERM German</option>
    <option value="GIS">GIS Geographic Information Systems</option>
    <option value="HED">HED Health Education</option>
    <option value="HIST">HIST History</option>
    <option value="HOSP">HOSP Hospitality</option>
    <option value="HS">HS Health Sciences</option>
    <option value="HUM">HUM Humanities</option>
    <option value="ICA">ICA Intercollegiate Athletics</option>
    <option value="IDS">IDS Interdisciplinary Studies</option>
    <option value="INTR">INTR Internship</option>
    <option value="ITAL">ITAL Italian</option>
    <option value="JAPN">JAPN Japanese</option>
    <option value="JOUR">JOUR Journalism</option>
    <option value="KIN">KIN Kinesiology</option>
    <option value="LAT">LAT Latin</option>
    <option value="LAW">LAW Paralegal Studies</option>
    <option value="LIB">LIB Library Instruction</option>
    <option value="LOGI">LOGI Logistics</option>
    <option value="LS">LS Learning Skills</option>
    <option value="MAKR">MAKR MakerSpace</option>
    <option value="MATH">MATH Mathematics</option>
    <option value="MICR">MICR Microbiology</option>
    <option value="MST">MST Marine Studies</option>
    <option value="MT">MT Manufacturing Technology</option>
    <option value="MUS">MUS Music</option>
    <option value="NS">NS Nursing Science</option>
    <option value="NTS">NTS Nutritional Science</option>
    <option value="PHIL">PHIL Philosophy</option>
    <option value="PHOT">PHOT Photography</option>
    <option value="PHSC">PHSC Physical Science</option>
    <option value="PHSO">PHSO Physiology</option>
    <option value="PHTC">PHTC Commercial Photography</option>
    <option value="PHYS">PHYS Physics</option>
    <option value="POLS">POLS Political Science</option>
    <option value="POSC">POSC Police Science</option>
    <option value="PSY">PSY Psychology</option>
    <option value="RADT">RADT Radiologic Technology</option>
    <option value="RBT">RBT Registered Behavior Technician</option>
    <option value="READ">READ Reading</option>
    <option value="SJS">SJS Social Justice Studies</option>
    <option value="SOC">SOC Sociology</option>
    <option value="SPAN">SPAN Spanish</option>
    <option value="SWHS">SWHS Social Work/Human Services</option>
    <option value="THA">THA Theatre Arts</option>
    <option value="THTR">THTR Theatre</option>
    <option value="TTHA">TTHA Technical Theatre</option>
    <option value="WEL">WEL Welding</option>
    <option value="WS">WS Water Science</option>
    <option value="ZOO">ZOO Zoology</option>
          </select><br />
          <input type="submit"/>
          
          
        </div>

      </form>
    </div>
  )
}

export default RegisterForm