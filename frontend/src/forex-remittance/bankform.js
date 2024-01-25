import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';

export default function BankAccountForm({ formData, setFormData }) {
  const handleAccountHolderNameChange = (e) => {
    setFormData({ ...formData, accountHolderName: e.target.value });
  };

  const handleAccountNumberChange = (e) => {
    setFormData({ ...formData, accountNumber: e.target.value });
  };

  const handleIfscCodeChange = (e) => {
    setFormData({ ...formData, ifscCode: e.target.value });
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
          <FormLabel>Account holder name</FormLabel>
          <Input value={formData.accountHolderName} onChange={handleAccountHolderNameChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Account number</FormLabel>
          <Input value={formData.accountNumber} onChange={handleAccountNumberChange} />
        </FormControl>
        <FormControl>
          <FormLabel>IFSC code</FormLabel>
          <Input value={formData.ifscCode} onChange={handleIfscCodeChange} />
        </FormControl>
      </CardContent>
    </Card>
  );
}

BankAccountForm.propTypes = {
  formData: PropTypes.shape({
    accountHolderName: PropTypes.string,
    accountNumber: PropTypes.string,
    ifscCode: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};