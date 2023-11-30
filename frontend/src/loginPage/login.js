import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        identifier,
        password,
      });

      if (response.status === 200) {
        setLoggedIn(true);
        alert(response.data.message); // Show success message
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Failed to log in'); // Show error message
    }
  };

  const isFormValid = identifier.trim() !== "" && password.trim() !== "";

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="p-4 shadow">
            <Card.Body>
              <div className="text-center mb-4">Welcome to fintech!</div>
              <Form onSubmit={handleLogin}>
                {error && <p className="text-danger">{error}</p>}
                <Form.Group controlId="formIdentifier">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" block disabled={!isFormValid}>
                  Login
                </Button>
              </Form>
              {loggedIn && (
                <p className="text-success text-center mt-3">You are logged in!</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
