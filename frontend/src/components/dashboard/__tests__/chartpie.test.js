console.log('chart Test file is running!');
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PieChart from '../chartpie';

const mockData = {
  labels: ['Label1', 'Label2'],
  data: [30, 70],
  backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(75, 192, 192, 0.7)'],
  borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
};

const mockAxios = new MockAdapter(axios);

describe('PieChart Component', () => {
  beforeEach(() => {
    // Reset axios mock before each test
    mockAxios.reset();
  });

  it('renders PieChart component with valid data', async () => {
    // Mock Axios response
    mockAxios.onGet('/api/getChartData').reply(200, mockData);

    // Wait for the pie chart to be rendered
    await waitFor(() => {
      // Render the component
      render(<PieChart />);

      // Check if the chart canvas is rendered
      const chartCanvas = screen.getByTestId('pie-chart');
      expect(chartCanvas).toBeInTheDocument();

      // Optionally, you can check other attributes or styles of the chart canvas

      // Check if the API was called
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0].url).toBe('/api/getChartData');

      // You may add more specific assertions based on your chart structure
    });
  });

  it('handles API error gracefully', async () => {
    // Mock Axios response with an error
    mockAxios.onGet('/api/getChartData').reply(500, { error: 'Internal Server Error' });

    // Wait for the error message to be rendered
    await waitFor(() => {
      // Render the component
      render(<PieChart />);

      const errorMessage = screen.getByText('Error fetching chart data:');
      expect(errorMessage).toBeInTheDocument();

      // You may add more specific error handling assertions if needed
    });
  });

  it('does not create chart without valid data structure', async () => {
    // Mock Axios response with invalid data structure
    mockAxios.onGet('/api/getChartData').reply(200, { invalidStructure: true });

    // Wait for the error message to be rendered
    await waitFor(() => {
      // Render the component
      render(<PieChart />);

      const errorMessage = screen.getByText('Invalid chart data structure:');
      expect(errorMessage).toBeInTheDocument();

      // You may add more specific assertions for invalid data structure
    });
  });

  // Add more test cases for other scenarios as needed
});
