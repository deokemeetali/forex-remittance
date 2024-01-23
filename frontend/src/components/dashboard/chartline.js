import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto'; // Import Chart directly
import axios from 'axios'; 

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const apiurl = process.env.REACT_APP_API_BACKEND_URL
  useEffect(() => {
    // Fetch data from the backend using Axios
      axios.get(`${apiurl}/api/getLineChartData`) // Assuming your backend is running on the same host
      .then(response => setChartData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new line chart with the fetched data
    chartInstance.current = new Chart(ctx, {
      type: 'line',
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

  // LineChart component snippet
return <canvas data-testid="canvas" ref={chartRef} width="500" height="500" />;
};

export default LineChart;
