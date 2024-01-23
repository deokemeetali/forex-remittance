import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null); // State to track error
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  useEffect(() => {
    // Fetch data from the backend using Axios
    axios.get(`${apiurl}/api/barChartData`)
      .then(response => {
        setChartData(response.data);
        setError(null); // Reset error state on successful fetch
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err); // Set error state
      });
  }, [apiurl]);

  useEffect(() => {
    if (chartData && chartData.labels.length > 0 && !error) { // Ensure there is data and no error
      const ctx = chartRef.current.getContext('2d');

      // Destroy the existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new bar chart with dynamic data
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, error]);

  // Render the error message if there is an error
  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Render the canvas with a `data-testid` attribute for testing
  return <canvas ref={chartRef} data-testid="bar-chart" width="500" height="500" />;
};

export default BarChart;