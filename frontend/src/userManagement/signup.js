import React, { useState } from 'react';
import { Form, Button, Card, InputGroup, Modal } from 'react-bootstrap';
import { BsExclamationCircle } from 'react-icons/bs';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../components/styles/signup.css';
const SignUpForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setUserData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!userData.username.trim()) {
      validationErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(userData.username)) {
      validationErrors.username =
        'Username must start with an alphabet and can only contain alphanumeric characters';
    } else if (userData.username.length > 20) {
      validationErrors.username = 'Username should be maximum 20 characters';
    }

    if (!userData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z][^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      validationErrors.email = 'Enter a valid email address';
    }

    if (!userData.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (userData.password.length < 8 || userData.password.length > 20) {
      validationErrors.password = 'Password should be between 8 and 20 characters';
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/.test(
        userData.password
      )
    ) {
      validationErrors.password =
        'Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character';
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
         // setMessage('User signed up successfully');
          setShowSuccessModal(true);
        } else {
          setMessage('Error signing up user');
        }
      } catch (error) {
            console.log(error.response);
        if (error.response && error.response.status === 400) {
          setErrors({
            username:
              error.response.data.message === 'Username already exists'
                ? error.response.data.message
                : '',
            email:
              error.response.data.message === 'Email already exists'
                ? error.response.data.message
                : '',
            password: '',
            confirmPassword: '',
          });
        } else {
          setMessage('Error signing up user');
        }
      
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
                      <InputGroup.Text className="text-danger">
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
                      <InputGroup.Text className="text-danger">
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
                    <Button
                      variant="outline-secondary"
                      onClick={() => togglePasswordVisibility('password')}
                    >

                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </Button>
                    {errors.password && (
                      <InputGroup.Text className="text-danger">
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
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={userData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                    </Button>
                    {errors.confirmPassword && (
                      <InputGroup.Text className="text-danger">
                        <BsExclamationCircle />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  {errors.confirmPassword && (
                    <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>
                  )}
                </Form.Group>

                <Button variant="primary" type="submit" block className="mx-auto d-block">
                  Sign Up
                </Button>
                <p className="login-p">
                    Don&apos;t have an account?
                    {' '}
                    <span
                      type="submit"
                      className="login-span"
                      onClick={() => {
                        navigate('/login');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate('/login');
                        }
                      }}
                      tabIndex={0}
                      style={{ cursor: 'pointer' }}
                    >
                      Login
                    </span>
                  </p>
              </Form>
              {message && <div className="mt-3 text-center">{message}</div>}
            </Card.Body>
          </Card>
        </div>
      </div>

       {/* Success Modal */}
       <Modal
        show={showSuccessModal}
        onHide={handleSuccessModalClose}
      >
        <Modal.Body>
          <p>User signed up successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUpForm;
