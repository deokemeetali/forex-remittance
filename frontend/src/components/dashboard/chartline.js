import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import '../styles/chart.css'
const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  useEffect(() => {
    // Fetch data from the backend using Axios
    axios.get(`${apiurl}/api/getLineChartData`)
      .then(response => {
        setChartData(response.data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false on error as well
      });
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
 
 
  return (
    <div className="chart-container">
      {loading && <p className="loading-message">Loading...</p>}
      <canvas ref={chartRef} width="350" height="350" />
    </div>
  );
};

export default LineChart;
