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
    const calculateConvertedAmount = () => {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    };

    calculateConvertedAmount();
  }, [amount, conversionRate, baseCurrency, targetCurrency]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendDataResponse = await axios.post('http://localhost:5001/api/sendData', {
        senderName,
        recipientName,
        amount,
        baseCurrency,
        targetCurrency,
        purpose,
        bankAccount,
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
    convertedAmount;

  return (
    <div className="container mt-4">
       <div className="border p-4">
      <form onSubmit={handleSubmit}>
      <div className="row mb-3 border p-2">
          <div className="col-md-6">
            <label htmlFor="senderName">Source Account:</label>
            <select
              id="senderName"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="form-control"
            >
              <option value="">Select Sender Account</option>
              <option value="dummySender1">Dummy Sender 1</option>
              <option value="dummySender2">Dummy Sender 2</option>
              {/* Add other sender account options */}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="recipientName">Destination Account:</label>
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
        <div className="row mb-3">
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
          <div className="col-md-6">
            <label htmlFor="baseCurrency">Base Currency:</label>
            <select
              id="baseCurrency"
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="form-control"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              {/* Add other currency options */}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="targetCurrency">Target Currency:</label>
            <select
              id="targetCurrency"
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="form-control"
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              {/* Add other currency options */}
            </select>
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
        <div className="row mb-3">
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
    </div>
  );
};

export default ForexRemittanceForm;
