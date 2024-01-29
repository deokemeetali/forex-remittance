// MainForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import MuiProgressBar from './progressbar';
import './forexremittance.css';
import axios from 'axios';
import ConfirmationWindow from './ConfirmationWindow';

function MainForm() {
  const [formData, setFormData] = useState({
    Amount_Send: '',
    Recipeint_get: '',
    selectedCountry1: 'USD',
    selectedCountry2: 'EUR',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardHolderName: '',
    saveCard: false,
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    Recipeint_BankName: '',
    Recipeint_Email: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const [confirmationMsg, setConfirmationMsg] = useState('');
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;
  const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);
  const totalSteps = 4;

  const nextStep = () => {
    validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleOKClick = () => {
    navigate('/mainpage/dashboard');
  };

  const handleConfirmPay = () => {
    const dataToSend = {
      Amount_Send: formData.Amount_Send,
      Recipeint_get: formData.Recipeint_get,
      selectedCountry1: formData.selectedCountry1,
      selectedCountry2: formData.selectedCountry2,
      cardHolderName: formData.cardHolderName,
      Recipeint_BankName: formData.Recipeint_BankName,
      Recipeint_Email: formData.Recipeint_Email,
    };
    axios
      .post(`${apiurl}/sendData`, dataToSend)
      .then((response) => {
        console.log(response.data);
        setConfirmationMsg('Thanks for choosing forex remittance');
        setShowConfirmationWindow(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const validateForm = () => {
    const errors = {};
    switch (currentStep) {
      case 1:
        if (!formData.Amount_Send || !/^\d+$/.test(formData.Amount_Send)) {
          errors.Amount_Send = 'Invalid amount. Please enter a positive number.';
        }
        if (!formData.selectedCountry1) {
          errors.selectedCountry1 = 'Please select a country.';
        }
        if (!formData.selectedCountry2) {
          errors.selectedCountry2 = 'Please select a country.';
        }
        break;
      case 4:
        if (!formData.accountHolderName) {
          errors.accountHolderName = 'Please enter the account holder name.';
        }
        if (!formData.accountNumber) {
          errors.accountNumber = 'Please enter the account number.';
        }
        if (!formData.ifscCode) {
          errors.ifscCode = 'Please enter the IFSC code.';
        }
        if (!formData.Recipeint_BankName) {
          errors.Recipeint_BankName = 'Please enter the recipient bank name.';
        }
        if (!formData.Recipeint_Email) {
          errors.Recipeint_Email = 'Please enter the recipient email.';
        }
        break;
      default:
        break;
    }
    setValidationErrors(errors);
  };

  useEffect(() => {
    validateForm();
  }, [formData, currentStep]);

  return (
    <div className="container mt-5">
      <div className="form-container">
        <div className="progress-bar-container">
          <MuiProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
        <form className="steps-container mt-3">
          {currentStep === 1 && (
            <Step1 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />
          )}
        {currentStep === 2 && (
            <Step2 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />
          )}
          {currentStep === 3 && (
            <Step3 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />
          )}
          {currentStep === 4 && (
            <div>
              <Step4 formData={formData} setFormData={setFormData} />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirmPay}
                disabled={Object.keys(validationErrors).length > 0}
              >
                Confirm Pay
              </button>
              <p>{confirmationMsg}</p>
            </div>
          )}
          <div className="d-flex justify-content-between">
            {currentStep > 1 && currentStep < 5 && (
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={prevStep}
              >
                Previous
              </button>
            )}
            {currentStep < 4 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={nextStep}
                disabled={Object.keys(validationErrors).length > 0}
              >
                Next
              </button>
            )}
          </div>
          {showConfirmationWindow && (
            <ConfirmationWindow
              confirmationMsg={confirmationMsg}
              onOKClick={handleOKClick}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default MainForm;
