// chartline.test.js

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import LineChart from '../chartline';
import { Chart } from 'chart.js/auto'; // Import Chart directly
import axios from 'axios';

// Mock the Chart constructor directly
jest.mock('chart.js/auto', () => ({
  Chart: jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
  })),
}));

// Mock axios
jest.mock('axios');

describe('LineChart Component', () => {
  beforeEach(() => {
    // Mock the axios.get call before each test
    axios.get.mockResolvedValue({ data: { labels: [], datasets: [] } });
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it('renders LineChart component without errors', async () => {
    const { findByTestId } = render(<LineChart />);
    await findByTestId('canvas'); // Assuming you add data-testid="canvas" to your canvas element
    // Your assertions go here
  });

  it('destroys the chart instance on unmount', async () => {
    const chartMock = {
      destroy: jest.fn() // Create a mock function for the destroy method
    };
    jest.spyOn(Chart, 'Chart').mockReturnValue(chartMock); // Mock the Chart class
  
    const { unmount, findByTestId } = render(<LineChart />);
    await findByTestId('canvas'); // Wait for the canvas to be rendered
    unmount();
  
    // Check if the destroy method was called on the Chart instance
    expect(chartMock.destroy).toHaveBeenCalled();
  });
});