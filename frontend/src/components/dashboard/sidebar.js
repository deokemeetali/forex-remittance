// Sidebar.js
import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css"; // Import your CSS file

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink to="/" className="text-decoration-none sidebar-header-link">
            Forex Remittance
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/beneficiaryform" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">
                Add Overseas Recipient
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/forexremittance" activeClassName="activeClicked">
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
  );
};

export default Sidebar;
