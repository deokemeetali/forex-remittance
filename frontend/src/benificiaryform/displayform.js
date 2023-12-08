import React, { useState, useEffect } from "react";
import axios from "axios";
import './displayform.css';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import './displayform.css';

function DisplayBeneficiary() {
    const [beneficiaries, setBeneficiaries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/displaybeneficiaries`);
                setBeneficiaries(response.data);
            } catch (error) {
                console.error("Error fetching beneficiary data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="display-container">
            <h2 className="beneficiary-heading">Beneficiary List</h2>
            <Link to="/benificiaryform" className="nav-link">
                <Button className="dash">
                    Add beneficiary
                </Button>
            </Link>
            <ul className="beneficiary-list">
                {beneficiaries.map((beneficiary) => (
                    <li key={beneficiary.id} className="beneficiary-item">
                        <p className="beneficiary-info">Name: {beneficiary.name}</p>
                        <p className="beneficiary-info">Email: {beneficiary.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DisplayBeneficiary;
