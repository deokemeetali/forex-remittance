import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  return (
    
    <Navbar variant="white" bg="white" className="sticky-top">
      <Navbar.Brand className="fs-4"><i className="bi bi-justify-right"></i></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNavDarkDropdown" /> 
    
      <Nav className="ms-auto mt-1 mt-lg-0">
        <NavDropdown 
          title="Sort by" 
          id="navbarDarkDropdownMenuLink" 
          menuVariant="dark"
          menuAlign="right" // Aligns the dropdown to the right
        >
          <NavDropdown.Item href="#">Weekly</NavDropdown.Item>
          <NavDropdown.Item href="#">Monthly</NavDropdown.Item>
          <NavDropdown.Item href="#">Yearly</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default Header;