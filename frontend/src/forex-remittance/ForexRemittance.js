// MainForm.js
import React, { useState } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import MuiProgressBar from './progressbar';
import './forexremittance.css';
import axios from 'axios';

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
  const [confirmationMsg, setConfirmationMsg] = useState('');
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleConfirmPay = () => {
    const dataToSend = { 
      Amount_Send: formData.Amount_Send,
      Recipeint_get: formData.Recipeint_get,
      selectedCountry1: formData.selectedCountry1,
      selectedCountry2: formData.selectedCountry2,
      cardHolderName: formData.cardHolderName,
      Recipeint_BankName: formData.Recipeint_BankName,
      Recipeint_Email: formData.Recipeint_Email
    };
    axios.post(`${apiurl}/sendData`, dataToSend)
      .then(response => {
        console.log(response.data);
        setConfirmationMsg("thanks for choosing forex remittance");
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="form-container">
        <div className="progress-bar-container">
          <MuiProgressBar currentStep={currentStep} />
        </div>
        <form className="steps-container mt-3">
          {currentStep === 1 && <Step1 formData={formData} setFormData={setFormData} />}
          {currentStep === 2 && <Step2 formData={formData} setFormData={setFormData} />}
          {currentStep === 3 && <Step3 formData={formData} setFormData={setFormData} />}
          {currentStep === 4 && (
            <div>
              <Step4 formData={formData} setFormData={setFormData} />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirmPay}
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
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default MainForm;
