// Navbar.js
import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import Currency from "../RateConverter/currency";
import { Link } from 'react-router-dom';

function Homenav() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
      <Container>
        {/* Logo on the left */}
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

        {/* Options on the right */}
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="justify-content-end">
          <Nav>
           {/* <Currency /> */}
            <Nav>
            <Link to="/phonelogin" className="nav-link">
              <Button variant="outline-light" className="me-2">
                PhoneLogin
              </Button>
            </Link>
            <Link to="/benificiaryform" className="nav-link">
              <Button variant="outline-light" className="me-2">
                Beneficiary form
              </Button>
            </Link>
            <Link to="/ForexRemittance" className="nav-link">
              <Button variant="outline-light" className="me-2">
               Forex Remittance Form
              </Button>
            </Link>
          </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Homenav;
