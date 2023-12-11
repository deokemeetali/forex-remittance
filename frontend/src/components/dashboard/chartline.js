import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new line chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'Sample Data',
            data: [10, 20, 30],
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1, // Adjust the width of the line
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointRadius: 3, // Adjust the size of the points
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} width="500" height="500" />; // Adjust width and height as needed
};

export default LineChart;
