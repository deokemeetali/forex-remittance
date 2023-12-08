const sendData = (req, res) => {
  const {
    senderName,
    recipientName,
    amount,
    baseCurrency,
    targetCurrency,
    purpose,
    bankAccount,
    convertedAmount
  } = req.body
  // Process the received form data here (you can perform database operations, send emails, etc.)
  console.log('Received form data:')
  console.log('Sender Name:', senderName)
  console.log('Recipient Name:', recipientName)
  console.log('Amount:', amount)
  console.log('Base Currency:', baseCurrency)
  console.log('Target Currency:', targetCurrency)
  console.log('Purpose:', purpose)
  console.log('Bank Account:', bankAccount)
  console.log('Converted Amount:', convertedAmount)

  res.status(200).json({ message: 'Form data received successfully!' })
}

module.exports = { sendData }
