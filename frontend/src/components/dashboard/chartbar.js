import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import PropTypes from 'prop-types'; // Import PropTypes
import axios from 'axios';
import '../styles/chart.css'

const BarChart = ({ userRole }) => {
  console.log(userRole);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  useEffect(() => {
    // Fetch data from the backend using Axios
    axios.get(`${apiurl}/api/barChartData`, {
      params: { userRole } // Pass userRole as a parameter to the backend
    })
      .then(response => {
        setChartData(response.data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false on error as well
      });
  }, [userRole]); // Include userRole as a dependency

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

  return (
    <>
      {loading && <p className="loading-message">Loading...</p>}
      <canvas ref={chartRef} width="500" height="500" /> {/* Adjust width and height as needed */}
    </>
  );
};
BarChart.propTypes = {
  userRole: PropTypes.oneOf(['Admin', 'Normal User']).isRequired,
};

export default BarChart;
