// Import necessary components from React and Bootstrap
import React, { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import { BsExclamationCircle } from 'react-icons/bs'; // Make sure to have react-icons installed

// Import necessary components from Font Awesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css';
import axios from 'axios';
//import '../styles/signup.css';



const SignUpForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!userData.username.trim()) {
      validationErrors.username = 'Username is required';
    } else if (userData.username.length > 20) {
      validationErrors.username = 'Username should be maximum 20 characters';
    }

    if (!userData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      validationErrors.email = 'Enter a valid email address';
    }

    if (!userData.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (userData.password.length < 8) {
      validationErrors.password = 'Password should be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/.test(userData.password)) {
      validationErrors.password = 'Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character';
    }

    if (userData.password !== userData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post('http://localhost:5001/signup', userData);

        if (response.status === 201) {
          setMessage('User signed up successfully');
        } else {
          setMessage('Error signing up user');
        }
      } catch (error) {
        setMessage('Error signing up user');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className={`mb-3 ${errors.username ? 'has-error' : ''}`}>
                  <Form.Label>Username</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      required
                    />
                    {errors.username && (
                      <InputGroup.Text id="inputGroupPrepend" className="text-danger">
                        <BsExclamationCircle />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}
                </Form.Group>

                <Form.Group className={`mb-3 ${errors.email ? 'has-error' : ''}`}>
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && (
                      <InputGroup.Text id="inputGroupPrepend" className="text-danger">
                        <BsExclamationCircle />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                </Form.Group>

                <Form.Group className={`mb-3 ${errors.password ? 'has-error' : ''}`}>
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      required
                    />
                    <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                      {/* Use the FontAwesomeIcon component for the eye icon */}
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </Button>
                    {errors.password && (
                      <InputGroup.Text id="inputGroupPrepend" className="text-danger">
                        <BsExclamationCircle />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                </Form.Group>

                <Form.Group className={`mb-3 ${errors.confirmPassword ? 'has-error' : ''}`}>
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={userData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    {errors.confirmPassword && (
                      <InputGroup.Text id="inputGroupPrepend" className="text-danger">
                        <BsExclamationCircle />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>}
                </Form.Group>

                <Button variant="primary" type="submit" block>
                  Sign Up
                </Button>
              </Form>
              {message && <div className="mt-3 text-center">{message}</div>}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
