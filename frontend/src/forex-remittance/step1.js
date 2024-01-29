import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function Step1({ formData, setFormData }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        const countryOptions = Object.keys(response.data.rates).map((currencyCode) => ({
          value: currencyCode,
          label: currencyCode,
        }));
        setCountries(countryOptions);
      })
      .catch(error => {
        console.error("Error fetching exchange rates:", error);
      });
  }, []);

  const handleAmountChange = async (e) => {
    const amount = e.target.value;

    // Validate if amount is a positive number
    if (/^\d+$/.test(amount)) {
      const baseCurrency = formData.selectedCountry1;

      // Check if baseCurrency is defined before making the API call
      if (baseCurrency) {
        try {
          const response = await axios.get(`https://v6.exchangerate-api.com/v6/a8e4883dcba403b998aa7ea0/latest/${baseCurrency}`);
          const conversionRates = response.data.conversion_rates;
          const exchangeRate = conversionRates[formData.selectedCountry2];
          setFormData({ ...formData, Amount_Send: amount, Recipeint_get: (amount * exchangeRate).toFixed(2) });
        } catch (error) {
          console.error("Error fetching exchange rates:", error);
        }
      } else {
        console.warn("Base currency is undefined. Unable to fetch exchange rates.");
      }
    } else {
      console.warn("Invalid amount. Please enter a positive number.");
    }
  };

  const handleCountryChange = async (selectedCountry, countryType) => {
    // Update the form data
    setFormData((prevData) => ({
      ...prevData,
      [countryType]: selectedCountry,
    }));

    // Fetch exchange rate when changing the country code in "Recipient's gets"
    if (countryType === 'selectedCountry2' && formData.Amount_Send) {
      try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/a8e4883dcba403b998aa7ea0/latest/${selectedCountry}`);
        const conversionRates = response.data.conversion_rates;
        const exchangeRate = conversionRates[formData.selectedCountry1];
        const recipientGets = (formData.Amount_Send * exchangeRate).toFixed(2);

        setFormData((prevData) => ({
          ...prevData,
          Recipeint_get: recipientGets,
        }));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    }
  };

  return (
    <div>
      <h2>International Money Transfer</h2>
      <div className="mb-3">
        <label htmlFor="Amount_Send" className="form-label">
          You send exactly
        </label>
        <input
          type="number"
          className="form-control"
          id="Amount_Send"
          placeholder='Enter amount'
          value={formData.Amount_Send || ''}
          onChange={handleAmountChange}
          min="1000"
          max="100000"
        />
        <select
          className="form-select"
          value={formData.selectedCountry1}
          onChange={(e) => setFormData((prevData) => ({
            ...prevData,
            selectedCountry1: e.target.value,
          }))}
        >
          {countries.map((country, index) => (
            <option key={index} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="Recipeint_get" className="form-label">
          Recipient&apos;s gets
        </label>
        <input
          type="number"
          className="form-control"
          id="Recipeint_get"
          value={formData.Recipeint_get || ''}
          readOnly
        />
        <select
          className="form-select"
          value={formData.selectedCountry2}
          onChange={(e) => handleCountryChange(e.target.value, 'selectedCountry2')}
        >
          {countries.map((country, index) => (
            <option key={index} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

Step1.propTypes = {
  formData: PropTypes.shape({
    Amount_Send: PropTypes.string,
    Recipeint_get: PropTypes.string,
    selectedCountry1: PropTypes.string,
    selectedCountry2: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Step1;
