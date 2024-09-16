import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders Header component', () => {
    // Arrange
    render(<Header />);
    
    // Act
    const headerElement = screen.getByTestId('header-component');

    // Assert
    expect(headerElement).toBeInTheDocument();
    // Add more specific assertions if needed
  });

  test('renders Sort by dropdown with options', () => {
    // Arrange
    render(<Header />);

    // Act
    const sortByDropdown = screen.getByText('Sort by');
    
    // Assert
    expect(sortByDropdown).toBeInTheDocument();

    // Open the dropdown
    userEvent.click(sortByDropdown);

    // Check if dropdown options are present
    expect(screen.getByText('Weekly')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Yearly')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
