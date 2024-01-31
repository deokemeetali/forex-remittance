import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import './displayform.css';
import PropTypes from 'prop-types';

function DisplayBeneficiary({formData, setFormData, selectedBeneficiary, setSelectedBeneficiary}) {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiurl}/api/displaybeneficiaries`);
        setBeneficiaries(response.data);
      } catch (error) {
        console.error("Error fetching beneficiary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBeneficiarySelection = (beneficiaryId) => {
    setSelectedBeneficiary(beneficiaryId);

    const selectedId = parseInt(beneficiaryId, 10);
    const selectedDetails = beneficiaries.find(beneficiary => beneficiary.user_id === selectedId);
    setFormData({
      ...formData,
      Recipeint_BankName: selectedDetails.bank_name,
      Recipeint_Email: selectedDetails.email,
    });
  };

  return (
    <div className="display-container">
      <h2 className="beneficiary-heading">Beneficiary List</h2>

      {/* Dropdown for Beneficiaries */}
      <Form.Group controlId="beneficiaryDropdown">
        <Form.Label>Select Beneficiary:</Form.Label>
        <Form.Control as="select" value={selectedBeneficiary} onChange={(e) => handleBeneficiarySelection(e.target.value)}>
          {loading ? (
            <option value={null}>Loading...</option>
          ) : (
            <>
              <option value={null}>Select a beneficiary</option>
              {beneficiaries.map((beneficiary) => (
                <option key={beneficiary.user_id} value={beneficiary.user_id}>
                  {beneficiary.bank_name} - {beneficiary.email}
                </option>
              ))}
            </>
          )}
        </Form.Control>
      </Form.Group>

      {/* Display selected beneficiary details */}
      {selectedBeneficiary && (
        <div>
          <p>Bank Name: {formData.Recipeint_BankName}</p>
          <p>Email: {formData.Recipeint_Email}</p>
        </div>
      )}

      {/* Add Beneficiary Button */}
      <Link to="/mainpage/benificiaryform" className="nav-link">
        <Button className="dash">Add Beneficiary</Button>
      </Link>
    </div>
  );
}

DisplayBeneficiary.propTypes = {
  formData: PropTypes.shape({
    Recipeint_BankName: PropTypes.string,
    Recipeint_Email: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  selectedBeneficiary: PropTypes.string,
  setSelectedBeneficiary: PropTypes.func,
};

export default DisplayBeneficiary;
