import React from "react";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import PhoneLogin from "./phonelogin/phonelogin";
import Home from "./home/home";

function App() {
  return (
 
      <Router>
        <Routes>
          <Route path="/" element={<PhoneLogin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
  
  );
}

export default App;
