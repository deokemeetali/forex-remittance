import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import './displayform.css';
import PropTypes from 'prop-types';

function DisplayBeneficiary({formData,setFormData}) {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null); // State to store the selected beneficiary
    const [selectedBeneficiaryDetails, setSelectedBeneficiaryDetails] = useState({ bank_name: '', email: '' }); // State to store the selected beneficiary details
    const apiurl = process.env.REACT_APP_API_BACKEND_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiurl}/api/displaybeneficiaries`);
                setBeneficiaries(response.data);
                console.log('Beneficiaries:', response.data);
            } catch (error) {
                console.error("Error fetching beneficiary data:", error);
            }
        };

        fetchData();
    }, []);

    const handleBeneficiarySelection = (beneficiaryId) => {
        console.log('Selected Beneficiary ID:', beneficiaryId);
        setSelectedBeneficiary(beneficiaryId);
    
        // Convert beneficiaryId to a number if needed
        const selectedId = parseInt(beneficiaryId, 10); // Assuming user_id is a number
    
        // Find the selected beneficiary details
        const selectedDetails = beneficiaries.find(beneficiary => beneficiary.user_id === selectedId);
        console.log('Selected Beneficiary Details:', selectedDetails); 
        setFormData({
            ...formData,
           Recipeint_BankName:selectedDetails.bank_name,
           Recipeint_Email:selectedDetails.email,
          });
        // Add this line to log the selected details
        setSelectedBeneficiaryDetails(selectedDetails);
    };
    return (
        <div className="display-container">
            <h2 className="beneficiary-heading">Beneficiary List</h2>

            {/* Dropdown for Beneficiaries */}
            <Form.Group controlId="beneficiaryDropdown">
                <Form.Label>Select Beneficiary:</Form.Label>
                <Form.Control as="select" value={selectedBeneficiary} onChange={(e) => handleBeneficiarySelection(e.target.value)}>
                    <option value={null}>Select a beneficiary</option>
                    {beneficiaries.map((beneficiary) => (
                        <option key={beneficiary.user_id} value={beneficiary.user_id}>
                            {beneficiary.bank_name} - {beneficiary.email}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            {/* Display selected beneficiary details */}
            {selectedBeneficiaryDetails && (
                <div>
                    <p>Bank Name: {selectedBeneficiaryDetails.bank_name}</p>
                    <p>Email: {selectedBeneficiaryDetails.email}</p>
                </div>
            )}

            {/* Add Beneficiary Button */}
            <Link to="/mainpage/benificiaryform" className="nav-link">
                <Button className="dash">
                    Add Beneficiary
                </Button>
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
  };
export default DisplayBeneficiary;