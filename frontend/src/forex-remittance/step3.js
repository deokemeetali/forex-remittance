import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CreditCardForm from './creditcardform';
import BankAccountForm from './bankform';
import './step3.css';

function Step3({ formData, setFormData }) {
  const [selectedOption, setSelectedOption] = useState('account');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <h2>Step 3: Payment Details</h2>
      <div className="radioButtonGroup">
        <input
          type="radio"
          value="account"
          checked={selectedOption === 'account'}
          onChange={handleOptionChange}
        />
        <label htmlFor="account">Account Details</label>
        <input
          type="radio"
          value="card"
          checked={selectedOption === 'card'}
          onChange={handleOptionChange}
        />
        <label htmlFor="card">Card Details</label>
      </div>
      {selectedOption === 'account' && (
        <div>
          <BankAccountForm formData={formData} setFormData={setFormData} />
        </div>
      )}
      {selectedOption === 'card' && (
        <div>
          <CreditCardForm formData={formData} setFormData={setFormData} />
        </div>
      )}
    </div>
  );
}
Step3.propTypes = {
  formData: PropTypes.shape({
    cardNumber: PropTypes.string,
    expiryDate: PropTypes.string,
    cvc: PropTypes.string,
    cardHolderName: PropTypes.string,
    saveCard: PropTypes.bool,
    accountHolderName:PropTypes.string,
    accountNumber:PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};
export default Step3;