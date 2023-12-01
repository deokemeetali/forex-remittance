import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About Us</Nav.Link>
            <Button as={Link} to="/login" variant="outline-light"   className="me-2">
              Login
            </Button>
            <Link to="/signup" className="nav-link"> {/* Use Link for navigation */}
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
