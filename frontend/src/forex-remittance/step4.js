import React from 'react';
import PropTypes from 'prop-types';

function Step4({ formData }) {
  console.log(formData); // Add this line for debugging

  return (
    <div>
      <h2>Step 4: Preview</h2>
      <div>
        <strong>Amount Send:</strong> {formData.Amount_Send}
      </div>
      <div>
        <strong>Source Currency:</strong> {formData.selectedCountry1}
      </div>
      <div>
        <strong>Recipient Get:</strong> {formData.Recipeint_get}
      </div>
      <div>
        <strong>Destination Currency:</strong> {formData.selectedCountry2}
      </div>
      <div>
        <strong>Sender&apos;s Name:</strong> {formData.cardHolderName || formData.accountHolderName}
      </div>
      <div>
        <strong>Recipient Account:</strong> {formData.Recipeint_BankName}
      </div>
      <div>
        <strong>Recipient Email:</strong> {formData.Recipeint_Email}
      </div>
    </div>
  );
}

Step4.propTypes = {
  formData: PropTypes.shape({
    Amount_Send: PropTypes.string,
    Recipeint_get: PropTypes.string,
    cardHolderName: PropTypes.string,
    selectedCountry1: PropTypes.string,
    selectedCountry2: PropTypes.string,
    Recipeint_BankName: PropTypes.string,
    Recipeint_Email: PropTypes.string,
    accountHolderName: PropTypes.string,
  }).isRequired,
};

export default Step4;
