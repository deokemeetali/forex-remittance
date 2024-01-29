// MainPages.js

import React from "react";
import Sidebar from "./sidebar";
import { Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from "./dashboard";
import BeneficiaryForm from "../../benificiaryform/benificiaryform";
import DisplayBeneficiary from "../../benificiaryform/displayform";
import ForexRemittanceForm from "../../forex-remittance/ForexRemittance";
import AdminDashboard from "../admin-dasboard/admindashboard";
import { useSelector } from "react-redux";

const MainPages = () => {
  const user = useSelector((state) => state.user);
  console.log("User:", user); 
  return (
    <div className="bg-grey vh-100 sticky">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10 vh-100 m-0 p-0">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="benificiaryform" element={<BeneficiaryForm />} />
            <Route path="displayform" element={<DisplayBeneficiary />} />
            <Route path="ForexRemittance" element={<ForexRemittanceForm />} />
            {user && user.role === 'admin' && (
              <Route path="admin-dashboard" element={<AdminDashboard />} />
            )}
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainPages;
