import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/header.css';

function Header() {
  const handleLogin = () => {
    // Implement your login logic here
    console.log('Login button clicked');
  };

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log('Sign Up button clicked');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
      <div className="container-fluid">
        <Navbar.Brand href="#">FINTECH</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About Us</Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <Link to="/home">
                {/* Use Link to navigate to the Home component */}
                <NavDropdown.Item>Forex Remit</NavDropdown.Item>
              </Link>
              {/* Add more services in the dropdown as needed */}
            </NavDropdown>
            <Button variant="outline-light" className="me-2" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="outline-light" onClick={handleSignUp}>
              Sign Up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
