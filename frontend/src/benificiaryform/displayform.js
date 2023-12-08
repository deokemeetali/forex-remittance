import React, { useState, useEffect } from "react";
import axios from "axios";
import './displayform.css';

function DisplayBeneficiary() {
    const [beneficiaries, setBeneficiaries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/displaybeneficiaries");
                setBeneficiaries(response.data);
            } catch (error) {
                console.error("Error fetching beneficiary data:", error);
            }
        };
        fetchData();
    }, []); // The empty dependency array ensures that this effect runs only once on mount

    return (
        <div>
            <h2>Beneficiary List</h2>
            <ul>
                {beneficiaries.map((beneficiary) => (
                    <li key={beneficiary.id}>
                        <p> Name :{beneficiary.name}</p>
                        <p> Email :{beneficiary.email}</p>
                        {/* Add more fields as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DisplayBeneficiary;
