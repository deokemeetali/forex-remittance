import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";

import { Navigate } from 'react-router-dom';
import LandingPage from './components/Landingpage/landingpage';
import SignUpForm from "./userManagement/signup";
import PhoneLogin from "./phonelogin/phonelogin";
import LoginForm from "./loginPage/login";
import BeneficiaryForm from './benificiaryform/benificiaryform';
import ForexRemittanceForm from './forex-remittance/ForexRemittance';
import DisplayBeneficiary from './benificiaryform/displayform';
import MainPages from './components/dashboard/mainpage';
import Dashboard from './components/dashboard/dashboard';

function App() {

  return (
    <>
    
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/mainpage" element={<Navigate to="/mainpage/dashboard" />} />
            <Route path="/mainpage" element={<MainPages />} >
              <Route path="benificiaryform" element={<BeneficiaryForm />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="displayform" element={<DisplayBeneficiary />} />
              <Route path='ForexRemittance' element={<ForexRemittanceForm />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/phonelogin" element={<PhoneLogin />} />
          </Routes>
        </Router>

    </>
  );
}

export default App;
