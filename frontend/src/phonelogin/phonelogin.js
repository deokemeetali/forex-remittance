import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// import './phonelogin.css';

function PhoneLogin() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [data, setData] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

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
      console.log('phone', phoneNumber);
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
  }, [data, phone]);

  return (
    <div>
    {successMessage && <div >{successMessage}</div>}
    {error && <div>{error.message}</div>}
    <div>
      <label>Enter your Number</label>
      <PhoneInput
        country="us"
        value={phone}
        onChange={(phoneNumber) => setPhone(`+${phoneNumber}`)}
      />
    </div>
    <br />
    <button onClick={sendOtp}>
      Send OTP
    </button>
    <br />
    <div/>
    <br />
    <div>
      <label>Enter OTP</label>
      <input
        type="text"
        onChange={(e) => setOtp(e.target.value)}
      />
    </div>
    <button onClick={verifyOtp}>
      Verify OTP
    </button>
  </div>  

  );
}

export default PhoneLogin;