import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import React from "react";
import LandingPage from './components/Landingpage/landingpage'; 
import Home from "./components/Home/home";
import SignUpForm from "./userManagement/signup";
import PhoneLogin from "./phonelogin/phonelogin";
import LoginForm from "./loginPage/login"; // Correct casing for login.js

function App() {
  return (
     <> 
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<SignUpForm/>}/>
      <Route path="/login" element={<LoginForm />}/>
      <Route path="/phonelogin" element={<PhoneLogin />} />
    </Routes>
  </Router>
    </>
  );
}

export default App;
