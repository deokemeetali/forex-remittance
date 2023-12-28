import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [countries, setCountries] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countriesData = response.data.map(country => ({
          name: country.name.common,
          code: country.currencies && Object.keys(country.currencies)[0],
        }));
        setCountries(countriesData);
      } catch (error) {
        console.error('Error fetching country data:', error.message);
      }
    };

    fetchCountries();
  }, []);

  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency || amount <= 0) {
      console.error('Invalid input. Please select currencies and enter a valid amount.');
      return;
    }

    try {
      const apiKey = '637afbcb8bb3282d0bb1a57daa520ab5'; // Replace with your actual Currencycloud API key
      const apiUrl = 'https://devapi.currencycloud.com/v2';

      // Create a conversion request
      const conversionResponse = await axios.post(
        `${apiUrl}/conversions/create`,
        {
          buy_currency: fromCurrency,
          sell_currency: toCurrency,
          fixed_side: 'buy',
          amount: amount,
          term_agreement: true,
        },
        {
          headers: {
            'X-Auth-Token': apiKey,
          },
        }
      );

      console.log('Conversion Result:', conversionResponse.data);

      // You can handle the conversion result as needed
    } catch (error) {
      console.error('Error making conversion request:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <label>
        From Currency:
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="">Select Currency</option>
          {countries.map(country => (
            country.code && (
              <option key={country.code} value={country.code}>
                {country.code}
              </option>
            )
          ))}
        </select>
      </label>
      <label>
        To Currency:
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="">Select Currency</option>
          {countries.map(country => (
            country.code && (
              <option key={country.code} value={country.code}>
                {country.code}
              </option>
            )
          ))}
        </select>
      </label>
      <button onClick={handleConvert}>Convert</button>
    </div>
  );
};

export default CurrencyConverter;
