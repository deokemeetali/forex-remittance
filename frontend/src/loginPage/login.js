import React, { useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import { BsExclamationCircle } from "react-icons/bs";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    // Validation rules for identifier (username/email) and password...
    // (Similar to signup form validation)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5001/login",
          loginData
        );

        if (response.status === 200) {
          setMessage("Login successful");
          navigate('/home');
          // Handle successful login (redirect, state change, etc.)
        } else {
          setMessage("Invalid credentials");
        }
      } catch (error) {
        setMessage("Error logging in");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div
            style={{
              margin: "0 auto",
              maxWidth: "400px",
              padding: "20px",
              border: "1px solid #ccc",
            }}
          >
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleLogin}>
                  <Form.Group className={`mb-3 ${errors.identifier ? "has-error" : ""}`}>
                    <Form.Label>Username or Email</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        name="identifier"
                        value={loginData.identifier}
                        onChange={handleChange}
                        required
                      />
                      {errors.identifier && (
                        <InputGroup.Text
                          id="inputGroupPrepend"
                          className="text-danger"
                        >
                          <BsExclamationCircle />
                        </InputGroup.Text>
                      )}
                    </InputGroup>
                    {errors.identifier && (
                      <Form.Text className="text-danger">
                        {errors.identifier}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className={`mb-3 ${errors.password ? "has-error" : ""}`}>
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                        />
                      </Button>
                      {errors.password && (
                        <InputGroup.Text
                          id="inputGroupPrepend"
                          className="text-danger"
                        >
                          <BsExclamationCircle />
                        </InputGroup.Text>
                      )}
                    </InputGroup>
                    {errors.password && (
                      <Form.Text className="text-danger">
                        {errors.password}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Button variant="primary" type="submit" block className="mx-auto d-block" bg="primary">
                    Login
                  </Button>
                  <div className="login-p">
                    Don&apos;t have an account?{' '}
                    <span
                      className="login-span"
                      onClick={() => {
                        navigate('/signup');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate('/signup');
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      style={{ cursor: 'pointer' }}
                    >
                      Sign Up
                    </span>
                  </div>
                </Form>
                {message && <div className="mt-3 text-center">{message}</div>}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
