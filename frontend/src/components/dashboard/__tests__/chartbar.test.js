import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import BarChart from '../chartbar';

// Create an instance of axios-mock-adapter for the current axios instance
const mockAxios = new MockAdapter(axios);

// Mock for canvas methods
beforeEach(() => {
  mockAxios.reset();
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    // Mock whatever canvas methods you use
    fillRect: () => {},
    clearRect: () => {},
    getImageData: (x, y, w, h) => ({ data: new Array(w * h * 4) }),
    putImageData: () => {},
    createImageData: () => ([]),
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => ({ width: 0 }),
    transform: () => {},
    rect: () => {},
    clip: () => {},
  }));
});

describe('BarChart Component', () => {
  it('renders BarChart component with data', async () => {
    // Mock the GET request to return some fake data
    mockAxios.onGet('/api/barChartData').reply(200, {
      labels: ['January', 'February', 'March'],
      datasets: [{ data: [65, 59, 80] }],
    });

    render(<BarChart />);

    // Wait for the chart canvas to be in the document
    const chartCanvas = await screen.findByTestId('bar-chart');
    expect(chartCanvas).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    // Mock the GET request to simulate an error
    mockAxios.onGet('/api/barChartData').networkError();

    render(<BarChart />);

    // Wait for the error message to be in the document
    const errorMessage = await screen.findByText(/Error fetching data:/i);
    expect(errorMessage).toBeInTheDocument();
  });
});