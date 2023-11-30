import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./loginPage/login"; // Correct casing for login.js

import SignupForm from "./userManagement/signup";
function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios.get("http://localhost:5001/message")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
      })
  }, []);
  return (
    <div className="App">
      <h1>{message}</h1>
      <LoginForm />
      <h1>Signup Form</h1>
      <SignupForm />
    </div>
    
  );
}
export default App;
