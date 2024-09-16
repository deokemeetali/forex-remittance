console.log(' Dashboard Test file is running!');
import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

// Mock the 'AllChart' component to avoid unintended side effects
jest.mock('./allchart', () => () => <div data-testid="mock-all-chart">Mocked AllChart</div>);

describe('Dashboard Component', () => {
  it('renders without crashing', () => {
    render(<Dashboard />);
  });

  it('renders the AllChart component', () => {
    const { getByTestId } = render(<Dashboard />);
    const allChartElement = getByTestId('mock-all-chart');
    expect(allChartElement).toBeInTheDocument();
  });

  // Add more test cases as needed

  // For example, test interactions or state changes in the Dashboard component
  // it('handles some interaction', () => {
  //   const { getByText, click } = render(<Dashboard />);
  //   const button = getByText('Click me');
  //   click(button);
  //   expect(something).toBe(someValue);
  // });
});
