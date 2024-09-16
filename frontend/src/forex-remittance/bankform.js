import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function BankAccountForm({ formData, setFormData }) {
  const handleAccountHolderNameChange = (e) => {
    const value = e.target.value;
    const hasNumeric = /\d/.test(value);
    const hasInvalidChars = /[+\-=/.]/.test(value);
    const isTooLong = value.length > 15;
  
    setFormData({
      ...formData,
      accountHolderName: value,
      accountHolderNameError: hasNumeric || hasInvalidChars
        ? 'Account holder name should not contain numeric values or special characters '
        : isTooLong
          ? 'Account holder name should be less than or equal to 15 characters'
          : '',
    });
  };
  

  const handleAccountNumberChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      accountNumber: value,
      accountNumberError: !/^\d{11}$/.test(value) ? 'Account number should be an 11-digit number' : '',
    });
  };

  const handleIfscCodeChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      ifscCode: value,
      ifscCodeError: !/^\w{11}$/.test(value) ? 'IFSC code should be an 11-character alphanumeric string' : '',
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
          <FormLabel>Account holder name</FormLabel>
          <TextField
            fullWidth
            variant="standard"
            value={formData.accountHolderName}
            onChange={handleAccountHolderNameChange}
            error={!!formData.accountHolderNameError}
            helperText={formData.accountHolderNameError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formData.accountHolderNameError ? (
                    <Typography variant="caption" sx={{ color: 'red' }}>*</Typography>
                  ) : (
                    <Typography variant="caption" sx={{ color: 'blue' }}>*</Typography>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Account number</FormLabel>
          <TextField
            fullWidth
            variant="standard"
            value={formData.accountNumber}
            onChange={handleAccountNumberChange}
            error={!!formData.accountNumberError}
            helperText={formData.accountNumberError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formData.accountNumberError ? (
                    <Typography variant="caption" sx={{ color: 'red' }}>*</Typography>
                  ) : (
                    <Typography variant="caption" sx={{ color: 'blue' }}>*</Typography>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>IFSC code</FormLabel>
          <TextField
            fullWidth
            variant="standard"
            value={formData.ifscCode}
            onChange={handleIfscCodeChange}
            error={!!formData.ifscCodeError}
            helperText={formData.ifscCodeError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formData.ifscCodeError ? (
                    <Typography variant="caption" sx={{ color: 'red' }}>*</Typography>
                  ) : (
                    <Typography variant="caption" sx={{ color: 'blue' }}>*</Typography>
                  )}
                </InputAdornment>
              ),
            }}
          />
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
    accountHolderNameError: PropTypes.string,
    accountNumberError: PropTypes.string,
    ifscCodeError: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};