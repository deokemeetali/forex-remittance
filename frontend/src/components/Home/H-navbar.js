// Navbar.js
import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Currency from "../RateConverter/currency";
import { Link } from 'react-router-dom';

function Homenav() {
  return (
    <Container fluid>
      <div className="row">
        {/* Sidebar on the left */}
        <nav className="col-md-2 d-md-block bg-light sidebar">
          {/* Your Logo */}
          <div className="sidebar-sticky">
            <Navbar.Brand href="#">
              <img
                src="path-to-your-logo.png" // Replace with your logo image URL
                alt="Logo"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Your Logo
            </Navbar.Brand>

            {/* Add any additional sidebar content here */}
          </div>
        </nav>

        {/* Main content area */}
        <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-md-4">
          {/* Your existing top navbar */}
          <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav" className="justify-content-end">
              <Nav>
                <Currency />
                <Nav>
                  <Link to="/phonelogin" className="nav-link">
                    <Button variant="outline-light" className="me-2">
                      PhoneLogin
                    </Button>
                  </Link>
                </Nav>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {/* Add your page content here */}
          {/* ... */}
        </main>
      </div>
    </Container>
  );
}

export default Homenav;
