import React, { useState, useEffect } from "react";
import axios from "axios";

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
    </div>
  );
}

export default App;
