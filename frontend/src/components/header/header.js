import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Import ScrollLink from react-scroll
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/header.css';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
      <div className="container-fluid">
        <Navbar.Brand href="#">FINTECH</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <ScrollLink
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <Nav.Link href="#">About us</Nav.Link>
            </ScrollLink>
            <ScrollLink
              activeClass="active"
              to="services"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <Nav.Link href="#">Our Sevices</Nav.Link>
            </ScrollLink>
            <Link to="/login" className="nav-link">
              <Button variant="outline-light" className="me-2">
                Login
              </Button>
            </Link>
            <Link to="/signup" className="nav-link">
              <Button variant="outline-light" className="me-2">
                Sign Up
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
