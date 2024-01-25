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
    setFormData({ ...formData, cardNumber: e.target.value });
  };

  const handleExpiryDateChange = (e) => {
    setFormData({ ...formData, expiryDate: e.target.value });
  };

  const handleCvcChange = (e) => {
    setFormData({ ...formData, cvc: e.target.value });
  };

  const handleCardHolderNameChange = (e) => {
    setFormData({ ...formData, cardHolderName: e.target.value });
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
          <Input value={formData.cardNumber} onChange={handleCardNumberChange} endDecorator={<CreditCardIcon />} />
        </FormControl>
        <FormControl>
          <FormLabel>Expiry date</FormLabel>
          <Input value={formData.expiryDate} onChange={handleExpiryDateChange} endDecorator={<CreditCardIcon />} />
        </FormControl>
        <FormControl>
          <FormLabel>CVC/CVV</FormLabel>
          <Input value={formData.cvc} onChange={handleCvcChange} endDecorator={<InfoOutlined />} />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card holder name</FormLabel>
          <Input value={formData.cardHolderName} onChange={handleCardHolderNameChange} placeholder="Enter cardholder's full name" />
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
    saveCard: PropTypes.bool,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};