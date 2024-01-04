import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import React from "react";
import LandingPage from './components/Landingpage/landingpage'; 
import Home from "./components/Home/home";
import SignUpForm from "./userManagement/signup";
import PhoneLogin from "./phonelogin/phonelogin";
import LoginForm from "./loginPage/login"; 
import BeneficiaryForm from './benificiaryform/benificiaryform';
import ForexRemittanceForm from './forex-remittance/ForexRemittance';
import DisplayBeneficiary from './benificiaryform/displayform';


function App() {
  return (
     <> 
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/benificiaryform" element={<BeneficiaryForm/>}/>
      <Route path="/displayform" element={<DisplayBeneficiary/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<SignUpForm/>}/>
      <Route path="/login" element={<LoginForm />}/>
      <Route path="/phonelogin" element={<PhoneLogin />} />
      <Route path='/ForexRemittance' element={<ForexRemittanceForm/>}/>
    </Routes>
  </Router>
    </>
  );
}

export default App;
