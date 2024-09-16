console.log('all chart Test file is running!');
import React from 'react';
import { render } from '@testing-library/react';
import AllChart from '../allchart';

// Mock the sub-components to avoid rendering the actual charts and lists
jest.mock('../chartbar', () => () => <div data-testid="mockedBarChart"></div>);
jest.mock('../chartpie', () => () => <div data-testid="mockedPieChart"></div>);
jest.mock('../chartline', () => () => <div data-testid="mockedLineChart"></div>);
jest.mock('../transactionlist', () => () => <div data-testid="mockedTransactionList"></div>);

describe('AllChart Component', () => {
  it('renders AllChart component', () => {
    render(<AllChart />);
    // You can add more specific assertions based on your component structure
    expect(document.querySelector('.container')).toBeInTheDocument();
  });

  it('renders sub-components', () => {
    const { getByTestId } = render(<AllChart />);
    expect(getByTestId('mockedBarChart')).toBeInTheDocument();
    expect(getByTestId('mockedPieChart')).toBeInTheDocument();
    expect(getByTestId('mockedLineChart')).toBeInTheDocument();
    expect(getByTestId('mockedTransactionList')).toBeInTheDocument();
  });
});
