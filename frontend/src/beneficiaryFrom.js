import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './beneficiary.css';

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
    const apiurl = 'https://forex-remittance-backend.onrender.com';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the percentage to ensure it's a number
        if (isNaN(formData.percentage)) {
            alert('Please enter a valid number for the percentage.');
            return;
        }

        // Handle the form data as needed (e.g., display it)
        console.log('Beneficiary Form Data:', formData);

        // Optionally, you can reset the form after submission
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
    };

    useEffect(() => {
        if (formData) {
            console.log("user's id token");
            axios
                .post(`${apiurl}/api/beneficiaries`, formData)
                .then((res) => {
                    // Handle the response if needed
                    console.log('Response:', res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [formData]);

    return (
        <form onSubmit={handleSubmit} className="beneficiary-form">
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

            <button type="submit">Add Beneficiary</button>
        </form>
    );
};

export default BeneficiaryForm;
