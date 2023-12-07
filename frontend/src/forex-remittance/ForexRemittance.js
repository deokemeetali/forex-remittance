import React, { useState } from 'react';

const ForexRemittanceForm = () => {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [purpose, setPurpose] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can perform actions like sending data to an API or processing the form
    console.log('Sender Name:', senderName);
    console.log('Recipient Name:', recipientName);
    console.log('Amount:', amount);
    console.log('Currency:', currency);
    console.log('Purpose:', purpose);
    console.log('Bank Account:', bankAccount);

    // Reset form fields after submission
    setSenderName('');
    setRecipientName('');
    setAmount('');
    setPurpose('');
    setBankAccount('');
  };

  return (
    <div>
      <h1>Forex Remittance Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="senderName">Sender&apos;s Name:</label>
          <input
            type="text"
            id="senderName"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="recipientName">Recipient&apos;s Name:</label>
          <input
            type="text"
            id="recipientName"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
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
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForexRemittanceForm;
