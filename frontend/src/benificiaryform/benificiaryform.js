// BeneficiaryForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './benificiaryform.css';

const BeneficiaryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phoneNumber: '',
        bankName: '',
        accountNumber: '',
        branch: '',
        ifscCode: '',
    });
    const apiurl = 'http://localhost:5001';


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiurl}/api/beneficiaries`, formData);

            // Handle the response from the backend as needed
            console.log('Backend Response:', response.data);
            setFormData({
                name: '',
                address: '',
                email: '',
                phoneNumber: '',
                bankName: '',
                accountNumber: '',
                branch: '',
                ifscCode: '',
            });
        } catch (error) {
            console.error('Error making backend call:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <label htmlFor="address">Address:</label>
            <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
            />

            <label htmlFor="bankName">Bank Name:</label>
            <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
            />

            <label htmlFor="accountNumber">Account Number:</label>
            <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
            />

            <label htmlFor="branch">Branch:</label>
            <input
                type="text"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
            />

            <label htmlFor="ifscCode">IFSC Code:</label>
            <input
                type="text"
                id="ifscCode"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
            />

            <button onClick={handleSubmit} type="submit">Add Beneficiary</button>
        </form>
    );
};

export default BeneficiaryForm;
