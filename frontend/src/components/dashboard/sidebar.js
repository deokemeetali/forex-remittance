// Sidebar.js
import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import Dashboard from "./dashboard";
import DisplayBeneficiary from "../../benificiaryform/displayform";
import ForexRemittanceForm from "../../forex-remittance/ForexRemittance";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (<>
    <div className="sidebar-container">
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink to="/" className="text-decoration-none sidebar-header-link">
            Forex Remittance
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/mainpage/dashboard" activeClassName="activeClicked" onClick={() => handleTabClick('dashboard')}
              className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}>
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/mainpage/displayform" activeClassName="activeClicked" onClick={() => handleTabClick('displayform')}
              className={`nav-link ${activeTab === 'displayform' ? 'active' : ''}`}>
              <CDBSidebarMenuItem icon="table">
                Add Overseas Recipient
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/mainpage/forexremittance" activeClassName="activeClicked" onClick={() => handleTabClick('forexremittance')}
              className={`nav-link ${activeTab === 'forexremittance' ? 'active' : ''}`}>
              <CDBSidebarMenuItem icon="user">Overseas Transfer</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className="sidebar-footer">
          <div className="sidebar-footer-content">
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>

    </div>
    <div >
      <div
        className={`tab-pane ${activeTab === 'dashboard' ? 'active' : ''}`}
      >
        <Dashboard />
      </div>
      <div
        className={`tab-pane ${activeTab === 'displayform' ? 'active' : ''}`}
      >
        <DisplayBeneficiary />
      </div>
      <div
        className={`tab-pane ${activeTab === 'forexremmitance' ? 'active' : ''}`}
      >
        <ForexRemittanceForm />
      </div>
    </div>
  </>);
};

export default Sidebar;
