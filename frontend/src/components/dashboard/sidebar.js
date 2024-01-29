// Sidebar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const user = useSelector(state => state?.login?.user?.user); 
  console.log(user);
  const handleTabClick = (tabName) => {
    if (user && user.role === 'admin' && tabName === 'dashboard') {
      console.log("Admin user cannot access regular dashboard");
      return;
    }

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
            {/* Conditionally render "Dashboard" menu item based on user role */}
            {user && user.role !== 'admin' && (
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
            )}
            {user && user.role === 'admin' && (
              <NavLink
                exact
                to="/mainpage/admin-dashboard"
                activeClassName="activeClicked"
                onClick={() => handleTabClick("admin-dashboard")}
                className={`nav-link ${
                  activeTab === "admin-dashboard" ? "active" : ""
                }`}
              >
                <CDBSidebarMenuItem icon="columns">
                  Admin Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
            )}
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

