import React from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LandingPage from './components/Landingpage/landingpage'; 
import Home from "./components/Home/home";
import SignUpForm from "./components/userManagement/signup";
function App() {

  return (
     <> 
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<SignUpForm/>}/>
    </Routes>
  </Router>
    </>
       
      
    
  );
}
export default App;
