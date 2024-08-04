import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Components/HomePage';
import TemplatePage from './Components/TemplatePage';
import EquipmentPage from './Components/EquipmentPage';
import RegisterPage from './Components/RegisterPage';
import MeetTheTeamPage from './Components/MeetTheTeamPage';
import CoursesPage from './Components/CoursesPage';
import FAQPage from './Components/FAQPage';
import SidebarMenu from './Components/SidebarMenu';
import ErrorPage from './Components/ErrorPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
                <Routes> 
                    <Route  path='/' element={<TemplatePage/>}>
                      <Route index element={<HomePage/>}/>
                      <Route path="Equipment" element={<EquipmentPage/>}/>
                      <Route path="Register" element={<RegisterPage/>}/>
                      <Route path="Meet_the_Team" element={<MeetTheTeamPage/>}/>
                      <Route path="CoursesPage" element={<CoursesPage/>}/>
                      <Route path="FAQ" element={<FAQPage/>}/>
                      <Route path='*' element={<ErrorPage/>}/>
                      
                    </Route>
                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
