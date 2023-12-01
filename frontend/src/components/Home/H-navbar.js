// Navbar.js
import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import your custom CSS for styling

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
          />{' '}
          Your Logo
        </Navbar.Brand>

        {/* Options on the right */}
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#">Quick Rate</Nav.Link>
            <Button variant="outline-light" className="mx-2">
              Login
            </Button>
            <Button variant="outline-light">Signup</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Homenav;
