import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';


export default function CreditCardForm({ formData, setFormData }) {
  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    const isValid = /^\d{16}$/.test(value);

    setFormData({
      ...formData,
      cardNumber: value,
      cardNumberError: isValid ? '' : 'Card number should be 16 numeric characters',
      cardNumberMarkColor: isValid ? 'blue' : 'red',
    });
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value;
    const currentDate = new Date();
    const inputDate = new Date(value);
    const isValid = inputDate > currentDate && inputDate.getFullYear() - currentDate.getFullYear() <= 5;

    setFormData({
      ...formData,
      expiryDate: value,
      expiryDateError: isValid ? '' : 'Expiry date should be greater than the current date and valid for 5 years',
      expiryDateMarkColor: isValid ? 'blue' : 'red',
    });
  };

  const handleCvcChange = (e) => {
    const value = e.target.value;
    const isValid = /^\d{3}$/.test(value);

    setFormData({
      ...formData,
      cvc: value,
      cvcError: isValid ? '' : 'CVC number should be 3 numeric characters',
      cvcMarkColor: isValid ? 'blue' : 'red',
    });
  };

  const handleCardHolderNameChange = (e) => {
    const value = e.target.value;
    const isValid = /^[a-zA-Z ]{1,15}$/.test(value);

    setFormData({
      ...formData,
      cardHolderName: value,
      cardHolderNameError: isValid ? '' : 'Card holder name should be 15 alphabetic characters, not numeric or special characters',
      cardHolderNameMarkColor: isValid ? 'blue' : 'red',
    });
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card number</FormLabel>
          <Input
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            endDecorator={<CreditCardIcon sx={{ color: formData.cardNumberMarkColor }} />}
            error={!!formData.cardNumberError}
            helperText={formData.cardNumberError}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Expiry date</FormLabel>
          <Input
            value={formData.expiryDate}
            onChange={handleExpiryDateChange}
            endDecorator={<CreditCardIcon sx={{ color: formData.expiryDateMarkColor }} />}
            error={!!formData.expiryDateError}
            helperText={formData.expiryDateError}
          />
        </FormControl>
        <FormControl>
          <FormLabel>CVC/CVV</FormLabel>
          <Input
            value={formData.cvc}
            onChange={handleCvcChange}
            endDecorator={<InfoOutlined sx={{ color: formData.cvcMarkColor }} />}
            error={!!formData.cvcError}
            helperText={formData.cvcError}
          />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card holder name</FormLabel>
          <Input
            value={formData.cardHolderName}
            onChange={handleCardHolderNameChange}
            placeholder="Enter cardholder's full name"
            error={!!formData.cardHolderNameError}
            helperText={formData.cardHolderNameError}
          />
        </FormControl>
        <CardActions sx={{ gridColumn: '1/-1' }}>
        </CardActions>
      </CardContent>
    </Card>
  );
}

CreditCardForm.propTypes = {
  formData: PropTypes.shape({
    cardNumber: PropTypes.string,
    expiryDate: PropTypes.string,
    cvc: PropTypes.string,
    cardHolderName: PropTypes.string,
    cardNumberError: PropTypes.string,
    expiryDateError: PropTypes.string,
    cvcError: PropTypes.string,
    cardHolderNameError: PropTypes.string,
    cardNumberMarkColor: PropTypes.string,
    expiryDateMarkColor: PropTypes.string,
    cvcMarkColor: PropTypes.string,
    cardHolderNameMarkColor: PropTypes.string,
    saveCard: PropTypes.bool,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};
