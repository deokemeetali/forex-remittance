console.log('MainPage test cases are running!');
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPages from './MainPages';

describe('MainPages Component', () => {
  test('renders without crashing', () => {
    // Arrange
    const { container } = render(
      <MemoryRouter>
        <MainPages />
      </MemoryRouter>
    );

    // Assert
    expect(container).toBeInTheDocument();
    // Add more assertions as needed
  });

  describe('Sidebar', () => {
    test('renders Sidebar component', () => {
      // Arrange
      const { getByTestId } = render(
        <MemoryRouter>
          <MainPages />
        </MemoryRouter>
      );

      // Act
      const sidebarElement = getByTestId('sidebar-component');

      // Assert
      expect(sidebarElement).toBeInTheDocument();
      // Add more specific assertions about the Sidebar component
    });
  });

  describe('Outlet', () => {
    test('renders Outlet component', () => {
      // Arrange
      const { getByTestId } = render(
        <MemoryRouter>
          <MainPages />
        </MemoryRouter>
      );

      // Act
      const outletElement = getByTestId('outlet-component');

      // Assert
      expect(outletElement).toBeInTheDocument();
      // Add more specific assertions about the Outlet component
    });
  });
});
