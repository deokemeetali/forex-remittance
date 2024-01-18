// Sidebar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="sidebar-container">
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink to="/mainpage" className="text-decoration-none sidebar-header-link">
            Forex Remittance
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              exact
              to="/mainpage/dashboard"
              activeClassName="activeClicked"
              onClick={() => handleTabClick("dashboard")}
              className={`nav-link ${
                activeTab === "dashboard" ? "active" : ""
              }`}
            >
              <CDBSidebarMenuItem icon="columns">
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/mainpage/displayform"
              activeClassName="activeClicked"
              onClick={() => handleTabClick("displayform")}
              className={`nav-link ${
                activeTab === "displayform" ? "active" : ""
              }`}
            >
              <CDBSidebarMenuItem icon="table">
                Add Overseas Recipient
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/mainpage/ForexRemittance"
              activeClassName="activeClicked"
              onClick={() => handleTabClick("ForexRemittance")}
              className={`nav-link ${
                activeTab === "ForexRemittance" ? "active" : ""
              }`}
            >
              <CDBSidebarMenuItem icon="user">
                Overseas Transfer
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className="sidebar-footer">
          <div className="sidebar-footer-content">Sidebar Footer</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;