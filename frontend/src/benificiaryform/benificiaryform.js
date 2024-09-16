import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Select from "react-select";
import "./benificiaryform.css";

const BeneficiaryForm = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    email: "",
    phoneNumber: "",
    bankName: "",
    accountNumber: "",
    branch: "",
    ifscCode: "",
    selectedCountry: {},
  });
  const [ifscCode, setIfscCode] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [countries, setCountries] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const apiurl = process.env.REACT_APP_API_BACKEND_URL

  // Move the useEffect outside the handleChange function
  useEffect(() => {
    // Enable or disable the button based on whether IFSC code is filled
    setIsButtonDisabled(!ifscCode.trim());
  }, [ifscCode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      const countryOptions = response.data.map((country) => ({
        value: country.alpha2Code,
        label: country.name,
      }));
      setCountries(countryOptions);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleCountryChange = async (selectedOption) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3/alpha/${selectedOption.value}`
      );
      const data = response.data[0];
      if (data.name) {

        if (data.currencies && typeof data.currencies === "object") {
          const currencyCodes = Object.keys(data.currencies);
          const currencyOptions = currencyCodes.map((currencyCode) => ({
            value: currencyCode,
            label: data.currencies[currencyCode].name,
          }));

          setCurrencyOptions(currencyOptions);
          setSelectedCurrency(currencyCodes[0]);

          setFormData((prevData) => ({
            ...prevData,
            currency: currencyCodes[0],
            selectedCountry: selectedOption,
          }));
        }
      } else {
        console.error(
          "Currency data is not in the expected format for the selected country"
        );
      }
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiurl}/api/beneficiaries`,
        formData
      );

      console.log("Backend Response:", response.data);
      setFormData({
        address: "",
        email: "",
        phoneNumber: "",
        bankName: "",
        accountNumber: "",
        branch: "",
        ifscCode: "",
      });
      navigate("/mainpage/displayform");
    } catch (error) {
      console.error("Error making backend call:", error);
    }
  };

  const fetchBankDetails = async () => {
    try {

      const response = await axios.get(
        `${apiurl}/api/bankDetails/${ifscCode}`
      );
      const data = response.data;

      if (data.bankDetails) {
        const { bankName, branch, address } = data.bankDetails;
        const formattedDetails = `${bankName}, ${branch}, ${address}`;
        setBankDetails(formattedDetails);

        setFormData((prevData) => ({
          ...prevData,
          bankName,
          branch,
          address,
        }));
      } else {
        setBankDetails(
          "Bank details not found for the entered IFSC code"
        );
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
      setBankDetails(
        "Error fetching bank details. Please try again later."
      );

      setFormData((prevData) => ({
        ...prevData,
        branch: "",
        address: "",
      }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ifscCodeInput" className="form-label">
          Enter IFSC Code:
        </label>
        <input
          type="text"
          id="ifscCodeInput"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          className="form-control"
          placeholder="Enter IFSC Code"
        />
        <button
          type="button"
          onClick={() => ifscCode.trim() && fetchBankDetails()}
          className="btn btn-primary mb-3"
          disabled={isButtonDisabled}
        >
          Get Bank Details
        </button>

        <label htmlFor="branch">Branch:</label>
        <input
          type="text"
          id="branch"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
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
        <div className="mb-3">
          <label htmlFor="bankDetailsInput" className="form-label">
            Bank Details:
          </label>
          <input
            type="text"
            id="bankDetailsInput"
            value={bankDetails}
            className="form-control"
            placeholder="Bank Details"
            readOnly
          />

<label id="country-label" htmlFor="country">Country:</label>
        <Select
          inputId="country"
          name="country"
          value={formData.selectedCountry}
          onChange={handleCountryChange}
          options={countries}
          placeholder="Select a country"
          isSearchable={true}
          isClearable={true}
          aria-labelledby="country-label"
        />

        <label id="currency-label" htmlFor="currency">Currency:</label>
        <Select
          inputId="currency"
          name="currency"
          value={selectedCurrency ? { value: selectedCurrency, label: selectedCurrency } : null}
          options={currencyOptions}
          placeholder="Select a currency"
          isSearchable={true}
          isClearable={true}
          onChange={(selectedOption) => setSelectedCurrency(selectedOption?.value)}
          aria-labelledby="currency-label"
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

          <label htmlFor="accountNumber">Account Number:</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Beneficiary</button>
      </form>
    </>
  );
};

export default BeneficiaryForm;