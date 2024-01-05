import React from "react";
import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

function Sidebar() {
 
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <div
          style={{
            display: "flex",
            height: "100vh",
            overflow: "scroll initial",
          }}
        >
          <CDBSidebar textColor="#fff" backgroundColor="#333">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a
                href="/"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                Sidebar
              </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink exact to ="/dashboard" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="columns">
                    Dashboard
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/overSeasReceipient" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table">
                    Add Overseas Recepient
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/overSeasTransfer" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="user">
                    Overseas Transfer
                  </CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter style={{ textAlign: "center" }}>
              <div
                style={{
                  padding: "20px 5px",
                }}
              >
                Sidebar Footer
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>

       
      </Row>
    </Container>
  );
}

export default Sidebar;