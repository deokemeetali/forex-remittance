console.log('Test file is running!');
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BeneficiaryForm from '../benificiaryform.js';

describe('BeneficiaryForm', () => {
  it('renders BeneficiaryForm component', () => {
    render(<BeneficiaryForm />);
  });

  it('renders form fields in BeneficiaryForm component', () => {
    render(<BeneficiaryForm />);
    expect(screen.getByLabelText('Enter IFSC Code:')).toBeInTheDocument();
    expect(screen.getByText('Get Bank Details')).toBeInTheDocument();
    expect(screen.getByLabelText('Branch:')).toBeInTheDocument();
    expect(screen.getByLabelText('Address:')).toBeInTheDocument();
    expect(screen.getByLabelText('Bank Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Bank Details:')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Country:' })).toBeInTheDocument();
    expect(screen.getByLabelText('Currency:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number:')).toBeInTheDocument();
    expect(screen.getByLabelText('Account Number:')).toBeInTheDocument();
  });

  it('enables the Get Bank Details button when IFSC code is entered', () => {
    render(<BeneficiaryForm />);
    const ifscCodeInput = screen.getByLabelText('Enter IFSC Code:');
    const getBankDetailsButton = screen.getByText('Get Bank Details');
    fireEvent.change(ifscCodeInput, { target: { value: 'IFSC1234' } });
    expect(getBankDetailsButton).toBeEnabled();
  });

  it('disables the Get Bank Details button when IFSC code is empty', () => {
    render(<BeneficiaryForm />);
    const ifscCodeInput = screen.getByLabelText('Enter IFSC Code:');
    const getBankDetailsButton = screen.getByText('Get Bank Details');
    fireEvent.change(ifscCodeInput, { target: { value: '' } });
    expect(getBankDetailsButton).toBeDisabled();
  });
});
