import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from 'react-router-dom';

const MainPages = () => {
 return (
    <div className=" bg-white vh-100 sticky">
      <div className="row">
        <div className="col-2  vh-100 m-0">
          <Sidebar />
        </div>
        <div className="col-10 vh-100 m-0 p-0">
          <Outlet />
        </div>
      </div>
    </div>
 );
};

export default MainPages;