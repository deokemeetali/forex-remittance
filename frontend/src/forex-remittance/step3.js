import React from 'react';
import PropTypes from 'prop-types';
import CreditCardForm from './creditcardform';
import BankAccountForm from './bankform';
import './step3.css';

function Step3({ formData, setFormData,selectedOption,handleOptionChange }) {


  return (
    <div>
      <h2>Step 3: Payment Details</h2>
      <div className="radioButtonGroup">
        <label
          htmlFor="account"
          className='radioButtonGrouplabel'
        >
          <input
            type="radio"
            id="account"
            name="option"
            value="account"
            checked={selectedOption === 'account'}
            onChange={handleOptionChange}
          />
          Account Details
        </label>
        <label
          htmlFor="card"
         className='radioButtonGrouplabel'
        >
          <input
            type="radio"
            id="card"
            name="option"
            value="card"
            checked={selectedOption === 'card'}
            onChange={handleOptionChange}
          />
          Credit/Debit Card
        </label>
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
 // validationErrors: PropTypes.object.isRequired,
  selectedOption: PropTypes.string.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
};
export default Step3;