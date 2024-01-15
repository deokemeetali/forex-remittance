import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import Dashboard from "./dashboard";
import Sidebar from "./sidebar";

const MainPages = () => {
  return (
    <div className="bg-grey vh-100 sticky">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col mx-0">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default MainPages;
