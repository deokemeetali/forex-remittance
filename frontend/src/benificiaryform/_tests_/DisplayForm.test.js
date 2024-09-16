// frontend/src/benificiaryform/_tests_/DisplayForm.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import DisplayBeneficiary from '../displayform';

// Create a mock instance of axios
const mockAxios = new MockAdapter(axios);

// Mock the environment variable
process.env.REACT_APP_API_BACKEND_URL = 'http://localhost';

describe('DisplayBeneficiary', () => {
  beforeEach(() => {
    // Reset the mockAxios instance before each test
    mockAxios.reset();
  });

  it('renders DisplayBeneficiary component', async () => {
    render(
      <BrowserRouter>
        <DisplayBeneficiary />
      </BrowserRouter>
    );
    expect(screen.getByText('Beneficiary List')).toBeInTheDocument();
  });

  it('fetches and displays a list of beneficiaries', async () => {
    const mockData = [
      { id: 1, bank_name: 'Bank 1', email: 'bank1@example.com' },
      { id: 2, bank_name: 'Bank 2', email: 'bank2@example.com' },
    ];
    mockAxios.onGet(`${process.env.REACT_APP_API_BACKEND_URL}/api/displaybeneficiaries`).reply(200, mockData);

    render(
      <BrowserRouter>
        <DisplayBeneficiary />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Bank name : Bank 1')).toBeInTheDocument();
      expect(screen.getByText('Email: bank1@example.com')).toBeInTheDocument();
      expect(screen.getByText('Bank name : Bank 2')).toBeInTheDocument();
      expect(screen.getByText('Email: bank2@example.com')).toBeInTheDocument();
    });
  });

  // Uncomment and update this test case once you have implemented error handling in the UI
  // it('handles error during data fetching', async () => {
  //   mockAxios.onGet(`${process.env.REACT_APP_API_BACKEND_URL}/api/displaybeneficiaries`).networkError();
  //
  //   render(
  //     <BrowserRouter>
  //       <DisplayBeneficiary />
  //     </BrowserRouter>
  //   );
  //
  //   await waitFor(() => {
  //     expect(screen.getByText('Error fetching beneficiary data')).toBeInTheDocument();
  //   });
  // });
});