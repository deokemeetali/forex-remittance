import {BrowserRouter ,Route, Routes} from 'react-router-dom';
import React from "react";
// import LandingPage from './components/Landingpage/landingpage'; 
// import Home from "./components/Home/home";
// import SignUpForm from "./userManagement/signup";
// import PhoneLogin from "./phonelogin/phonelogin";
// import LoginForm from "./loginPage/login"; // Correct casing for login.js
 import Dashboard from './components/dashboard/dashboard'; // Fix the typo in the path
// import AllChart from './components/dashboard/allchart';
import MainPages from './components/dashboard/mainpage';



function App() {
  return (
     <> 
  <BrowserRouter>
  <div>
  <Routes>
  <Route path="/dashboard" component={Dashboard} />
  </Routes> 
  </div>
  
  
     <MainPages/>
   </BrowserRouter>
    </>
  );
}

export default App;
