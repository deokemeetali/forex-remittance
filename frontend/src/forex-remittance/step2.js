import React from "react";
import '../benificiaryform/displayform.css';
import DisplayBeneficiary from "../benificiaryform/displayform";
import PropTypes from 'prop-types';

function Step2({ formData, setFormData, selectedBeneficiary, setSelectedBeneficiary }) {
 

  return (
    <div>
      <h2>Who&apos;s your next Recipient ? </h2>
      <DisplayBeneficiary formData={formData} setFormData={setFormData} selectedBeneficiary={selectedBeneficiary} setSelectedBeneficiary={setSelectedBeneficiary} />
   </div>
  );
 }
 Step2.propTypes = {
  formData: PropTypes.shape({
      Recipeint_BankName: PropTypes.string,
      Recipeint_Email: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  selectedBeneficiary: PropTypes.string,
  setSelectedBeneficiary: PropTypes.func,
};
export default Step2;