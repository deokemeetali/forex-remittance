import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ForexRemittanceForm = () => {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [purpose, setPurpose] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [conversionRate, setConversionRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);
  const [bankAccountBalance, setBankAccountBalance] = useState(10000); // Dummy balance

  const accountBalances = {
    dummySender1: 5000,
    dummySender2: 8000,
    dummyRecipient1: 3000,
    dummyRecipient2: 6000,
    // Add other dummy accounts and their balances
  };

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await axios.get(
         `https://v6.exchangerate-api.com/v6/a8e4883dcba403b998aa7ea0/latest/${baseCurrency}`
        );
        const rate = response.data.conversion_rates[targetCurrency];
        setConversionRate(rate || 1); // Default to 1 if the rate is not available
      } catch (error) {
        console.error('Error fetching conversion rate:', error);
      }
    };

    fetchConversionRate();
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const { rates } = response.data;

        const currencies = Object.keys(rates);
        setCurrencyList(currencies);
      } catch (error) {
        console.error('Error fetching currency list:', error);
      }
    };

    fetchCurrencyList();
  }, []);

  useEffect(() => {
    const calculateConvertedAmount = () => {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    };

    calculateConvertedAmount();
  }, [amount, conversionRate, baseCurrency, targetCurrency]);

  const handleInsufficientBalance = () => {
    if (parseFloat(amount) > bankAccountBalance) {
      return true; // Insufficient balance
    }
    return false; // Sufficient balance
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (handleInsufficientBalance()) {
        alert('Insufficient balance.'); // Display an alert for insufficient balance
        return;
      }
  
      // Rest of your code for handling the form submission
      const updatedBalance = bankAccountBalance - parseFloat(amount);
      setBankAccountBalance(updatedBalance);
  
      // Simulated backend response logs to console
      console.log('Simulated remittance successful.');
      console.log('Updated Bank Account Balance:', updatedBalance);
  
      const sendDataResponse = await axios.post('http://localhost:5001/api/sendData', {
        senderName,
        recipientName,
        amount,
        baseCurrency,
        targetCurrency,
        purpose,
        bankAccount,
        convertedAmount,
      });

      console.log('Response from sendData:', sendDataResponse.data);
      // Simulated backend response logs to console

      // Reset form fields after successful submission
      setSenderName('');
      setRecipientName('');
      setAmount('');
      setPurpose('');
      setBankAccount('');
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Handle errors appropriately
    }
  };

  const reasons = [
    'Family support',
    'Education',
    'Medical expenses',
    'Business',
    'Personal expenses',
    'other',
    // Add other reason options
  ];

  const isFormFilled =
    senderName &&
    recipientName &&
    amount &&
    baseCurrency &&
    targetCurrency &&
    purpose &&
    bankAccount &&
    convertedAmount !== 0; // Ensure converted amount is not zero

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
      <div className="row">
          <div className="col-md-6">
            <label htmlFor="senderName">Senders Account Name:</label>
            <select
              id="senderName"
              value={senderName}
              onChange={(e) => {
                setSenderName(e.target.value);
                setBankAccountBalance(accountBalances[e.target.value]); // Update balance here
              }}
              className="form-control"
            >
              <option value="">Select Sender Account</option>
              <option value="dummySender1">Dummy Sender 1</option>
              <option value="dummySender2">Dummy Sender 2</option>
              {/* Add other sender account options */}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="recipientName">Recipients Account Name:</label>
            <select
              id="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="form-control"
            >
                <option value="">Select Recipient Account</option>
              <option value="dummyRecipient1">Dummy Recipient 1</option>
              <option value="dummyRecipient2">Dummy Recipient 2</option>
              {/* Add other recipient account options */}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="row">
          <div className="col-md-6">
  <label htmlFor="baseCurrency">Base Currency:</label>
  <select
    id="baseCurrency"
    value={baseCurrency}
    onChange={(e) => setBaseCurrency(e.target.value)}
    className="form-control"
  >
    <option value="">Select Base Currency</option>
    {currencyList.map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ))}
  </select>
</div>
<div className="col-md-6">
  <label htmlFor="targetCurrency">Target Currency:</label>
  <select
    id="targetCurrency"
    value={targetCurrency}
    onChange={(e) => setTargetCurrency(e.target.value)}
    className="form-control"
  >
    <option value="">Select Target Currency</option>
    {currencyList.map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ))}
  </select>
</div>
        </div>
          <div className="col-md-6">
          <label htmlFor="purpose">Purpose:</label>
            <select
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="form-control"
            >
              <option value="">Select Reason</option>
              {reasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
            </select>

          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="bankAccount">Bank Account:</label>
            <input
              type="text"
              id="bankAccount"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <p>Bank Account Balance: ${bankAccountBalance}</p>
          </div>
          <div className="col-md-6">
            <p>Converted Amount: {convertedAmount} {targetCurrency}</p>
          </div>
        </div>
      
        <div className="row">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary" disabled={!isFormFilled}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    
  );
};

export default ForexRemittanceForm;