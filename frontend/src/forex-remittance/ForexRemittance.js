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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="senderName">Senders Account Name:</label>
          <select
            id="senderName"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
          >
            <option value="">Select Sender Account</option>
            <option value="dummySender1">987654321</option>
            <option value="dummySender2">1234567890</option>
            {/* Add other sender account options */}
          </select>
        </div>
        <div>
          <label htmlFor="recipientName">Recipients Account Name:</label>
          <select
            id="recipientName"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          >
            <option value="">Select Recipient Account</option>
            <option value="dummyRecipient1">9087654213</option>
            <option value="dummyRecipient2">2109876543</option>
            {/* Add other recipient account options */}
          </select>
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="baseCurrency">Base Currency:</label>
          <select
            id="baseCurrency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            {/* Add other currency options */}
          </select>
        </div>
        <div>
          <label htmlFor="targetCurrency">Target Currency:</label>
          <select
            id="targetCurrency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            {/* Add other currency options */}
          </select>
        </div>
        <div>
          <label htmlFor="purpose">Purpose:</label>
          <textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="bankAccount">Bank Account:</label>
          <input
            type="text"
            id="bankAccount"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
          />
        </div>
        <div>
          <p>Converted Amount: {convertedAmount} {targetCurrency}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForexRemittanceForm;
