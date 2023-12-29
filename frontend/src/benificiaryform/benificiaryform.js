import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./benificiaryform.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";


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
    currency: "",
  });
  const [ifscCode, setIfscCode] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [countries, setCountries] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [confirmedAccountNumber, setConfirmedAccountNumber] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const apiurl = "http://localhost:5001";

  useEffect(() => {
    const allFieldsFilled =
      formData.branch.trim() &&
      formData.address.trim() &&
      formData.bankName.trim() &&
      formData.selectedCountry &&
      formData.currency &&
      formData.email.trim() &&
      formData.phoneNumber.trim() &&
      isPhoneNumberValid &&
      formData.accountNumber.trim() &&
      /^\d+$/.test(formData.accountNumber) &&
      confirmedAccountNumber.trim() &&
      formData.accountNumber.trim() === confirmedAccountNumber.trim();

    // Enable or disable the button accordingly
    setIsButtonDisabled(!allFieldsFilled);
  }, [formData, isPhoneNumberValid, confirmedAccountNumber]);

  useEffect(() => {
    setIsButtonDisabled(!ifscCode.trim());
  }, [ifscCode]);

  const handleChange = (e) => {
    setFormErrors({});

    if (e.target.name === "accountNumber" && !/^\d+$/.test(e.target.value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        accountNumber: "Only numbers are allowed",
      }));
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneValidation = (value) => {
    console.log("Phone Validation:", value);
    setIsPhoneNumberValid(PhoneInput.isValidPhoneNumber(value));
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
      } }else {
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

    const errors = {};
    if (!formData.branch.trim()) {
      errors.branch = "Branch is required";
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }
    if (!formData.bankName.trim()) {
      errors.bankName = "Bank Name is required";
    }
    if (!formData.selectedCountry) {
      errors.selectedCountry = "Country is required";
    }
    if (!formData.currency) {
      errors.currency = "Currency is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!isPhoneNumberValid) {
      errors.phoneNumber = "Invalid phone number";
    }
    if (!formData.accountNumber.trim()) {
      errors.accountNumber = "Account Number is required";
    } else if (!/^\d+$/.test(formData.accountNumber)) {
      errors.accountNumber = "Only numbers are allowed";
    }
    if (!confirmedAccountNumber.trim()) {
      errors.confirmedAccountNumber = "Confirmed Account Number is required";
    } else if (
      formData.accountNumber.trim() !== confirmedAccountNumber.trim()
    ) {
      errors.confirmedAccountNumber = "Account numbers do not match";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
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
        setConfirmedAccountNumber("");

        await fetchBankDetails();
      } catch (error) {
        console.error("Error making backend call:", error);
      }
    }
  };

  const fetchBankDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/bankDetails/${ifscCode}`
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
        setBankDetails("Bank details not found for the entered IFSC code");
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
      setBankDetails("Error fetching bank details. Please try again later.");

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
          Enter IFSC Code: <span style={{ color: "red" }}>*</span>
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

        <label htmlFor="branch" style={{ display: "block" }}>
          Branch: <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          id="branch"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          readOnly
        />
        {formErrors.branch && (
          <span style={{ color: "red" }}>{formErrors.branch}</span>
        )}

        <label htmlFor="address" style={{ display: "block" }}>
          Address: <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          readOnly
        />
        {formErrors.address && (
          <span style={{ color: "red" }}>{formErrors.address}</span>
        )}

        <label htmlFor="bankName" style={{ display: "block" }}>
          Bank Name: <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          id="bankName"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          readOnly
        />
        {formErrors.bankName && (
          <span style={{ color: "red" }}>{formErrors.bankName}</span>
        )}

        <div className="mb-3">
          <label htmlFor="bankDetailsInput" className="form-label">
            Bank Details: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="bankDetailsInput"
            value={bankDetails}
            className="form-control"
            placeholder="Bank Details"
            readOnly
          />

          <label htmlFor="country">
            Country: <span style={{ color: "red" }}>*</span>
          </label>
          <Select
            id="country"
            name="country"
            value={formData.selectedCountry}
            onChange={handleCountryChange}
            options={countries}
            placeholder="Select a country"
            isSearchable={true}
            isClearable={true}
          />
          {formErrors.selectedCountry && (
            <span style={{ color: "red" }}>{formErrors.selectedCountry}</span>
          )}

          <label htmlFor="currency" style={{ display: "block" }}>
            Currency: <span style={{ color: "red" }}>*</span>
          </label>
          <Select
            id="currency"
            name="currency"
            value={
              selectedCurrency
                ? { value: selectedCurrency, label: selectedCurrency }
                : null
            }
            options={currencyOptions}
            placeholder="Select a currency"
            isSearchable={true}
            isClearable={true}
            onChange={(selectedOption) =>
              setSelectedCurrency(selectedOption?.value)
            }
            isDisabled
          />
          {formErrors.currency && (
            <span style={{ color: "red" }}>{formErrors.currency}</span>
          )}

          <label htmlFor="email" style={{ display: "block" }}>
            Email: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && (
            <span style={{ color: "red" }}>{formErrors.email}</span>
          )}

          <label htmlFor="phoneNumber" style={{ display: "block" }}>
          Phone Number: <span style={{ color: "red" }}>*</span>
        </label>
        <PhoneInput
        id="phoneNumber"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={(value, country) => {
        setFormData((prevData) => ({
        ...prevData,
        phoneNumber: value,
        countryCode: country ? country.dialCode : "", // Check if country is defined
        }));
        setCountryCode(country ? country.country : ""); // Check if country is defined
        handlePhoneValidation(value);
         }}
          country={countryCode} // Set the default country code
          inputStyle={{ width: "100%" }} // Adjust the input width
        />
        {!isPhoneNumberValid && (
          <span style={{ color: "red" }}>Invalid phone number</span>
        )}
        {formErrors.phoneNumber && (
          <span style={{ color: "red" }}>{formErrors.phoneNumber}</span>
        )}


          <label htmlFor="accountNumber" style={{ display: "block" }}>
            Account Number: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
          />
          {formErrors.accountNumber && (
            <span style={{ color: "red" }}>{formErrors.accountNumber}</span>
          )}

          <label htmlFor="confirmedAccountNumber" style={{ display: "block" }}>
            Confirm Account Number: <span style={{ color: "red" }}>*</span>
          </label>

          <input
            type="text"
            id="confirmedAccountNumber"
            name="confirmedAccountNumber"
            value={confirmedAccountNumber}
            onChange={(e) => setConfirmedAccountNumber(e.target.value)}
          />
          {formErrors.confirmedAccountNumber && (
            <span style={{ color: "red" }}>
              {formErrors.confirmedAccountNumber}
            </span>
          )}
        </div>
        <button
          type="submit"
          className={`btn btn-primary ${
            Object.keys(formErrors).length !== 0 || isButtonDisabled
              ? "disabled"
              : ""
          }`}
        >
          Add Beneficiary
        </button>

        {/* Success Message */}
        {Object.keys(formErrors).length === 0 && (
          <div style={{ color: "green" }}>Beneficiary added successfully!</div>
        )}
      </form>
    </>
  );
};

export default BeneficiaryForm;
