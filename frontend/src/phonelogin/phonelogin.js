import React, { useEffect, useState } from 'react';
import {
  Modal, Button, Form, Alert,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase/firebase';

function PhoneLogin() {

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const apiurl ='http://localhost:5001';

  const navigate = useNavigate();

 
  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        recaptcha,
      );
      setConfirmation(confirmationResult);
      setSuccessMessage('OTP sent successfully!');
      
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const code = otp;
      await confirmation.confirm(code).then((response) => {
        setData(response._tokenResponse.idToken);
      });

      setSuccessMessage('OTP verified successfully! Redirecting to home...');

    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      const phoneNumber = { phone };
      console.log("user's id token", data);
     
      axios
        .post(`${apiurl}/v1/auth/firebase`, phoneNumber)
        .then((res) => {
          console.log('Response data:', res.data);
          navigate('/home');
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    }
  }, [data, phone]);

  return (
    <Modal show={true} onHide={() => {}}>
    <Modal.Header closeButton>
      <Modal.Title>Phone Login</Modal.Title>
    </Modal.Header>
      <Modal.Body>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {error && <Alert variant="danger">{error.message}</Alert>}
        <Form>
          <Form.Group controlId="formPhone">
            <Form.Label className="otp-label">Enter your Number</Form.Label>
            <PhoneInput
              country="us"
              value={phone}
              onChange={(phoneNumber) => setPhone(`+${phoneNumber}`)}
            />
          </Form.Group>
          <br />
          <Button onClick={sendOtp} className="sen-otp-btn">
            Send OTP
          </Button>
          <br />
          <div id="recaptcha" className="recaptcha-style" />
          <br />
          <Form.Group controlId="formOtp">
            <Form.Label className="otp-label">Enter OTP</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setOtp(e.target.value)}
              className="input-field"
            />
          </Form.Group>
          <Button className="verify-otp-btn" onClick={verifyOtp}>
            Verify OTP
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PhoneLogin;
