import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const apiurl = process.env.REACT_APP_API_BACKEND_URL
  useEffect(() => {
    // Fetch data from the backend using Axios
    axios.get(`${apiurl}/api/barChartData`) // Update the URL based on your backend configuration
      .then(response => setChartData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
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

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return <canvas ref={chartRef} width="500" height="500" />; // Adjust width and height as needed
};

export default BarChart;
