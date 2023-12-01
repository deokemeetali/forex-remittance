import React,{useState,useEffect} from 'react';
// import {
//   Button, Form, Alert,
// } from 'react-bootstrap';
import { auth } from '../firebase/firebase';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './phonelogin.css';

function PhoneLogin() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [data, setData] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
//  const apiurl = process.env.REACT_APP_BACKEND_URL;
  const navigate  = useNavigate();

  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
      console.log(recaptcha);
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
      var result;
      await confirmation.confirm(code).then((response) => {
       result = response._tokenResponse.idToken
      });
      setData(result);
      setSuccessMessage('OTP verified successfully! Redirecting to home...');
      
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('inside useeffect');
    if (data) {
      const phoneNumber = { phone };
      console.log('phone',phoneNumber);
      axios
        .post('http://localhost:5001/v1/auth/firebase', phoneNumber)
        .then((res) => {
          console.log('Response data:', res.data);
          navigate('/home');
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    }
  }, [data,phone]);

  return (
    <div className='parent-class'>
    {successMessage && <div className="success-message">{successMessage}</div>}
    {error && <div className="error-message">{error.message}</div>}
    <div>
      <label className="otp-label">Enter your Number</label>
      <PhoneInput
        country="us"
        value={phone}
        onChange={(phoneNumber) => setPhone(`+${phoneNumber}`)}
      />
    </div>
    <br />
    <button className="sen-otp-btn" onClick={sendOtp}>
      Send OTP
    </button>
    <br />
    <div id="recaptcha" className="recaptcha-style" />
    <br />
    <div>
      <label className="otp-label">Enter OTP</label>
      <input
        type="text"
        onChange={(e) => setOtp(e.target.value)}
        className="input-field"
      />
    </div>
    <button className="verify-otp-btn" onClick={verifyOtp}>
      Verify OTP
    </button>
  </div>
    
  );
}

export default PhoneLogin;
