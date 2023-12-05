import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="mt-5 text-white">
      <Container fluid className="p-5">
        <Row>
          <Col md={4}>
            <h5>Contact Us</h5>
            <address>
              <div>123 Main Street</div>
              <div>City, State ZIP Code</div>
              <div>Email: info@example.com</div>
              <div>Helpline: +1 (800) 123-4567</div>
            </address>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Stay Connected</h5>
            <ul className="list-unstyled">
              <li><a href="#"><FaFacebook /></a></li>
              <li><a href="#"><FaTwitter /></a></li>
              <li><a href="#"><FaLinkedin /></a></li>
            </ul>
          </Col>
        </Row>
        <hr className="mt-4" />
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <p>&copy; 2023 Your Bank Ltd. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
