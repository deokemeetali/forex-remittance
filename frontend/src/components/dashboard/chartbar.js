import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios'; // Assuming you have Axios installed

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend
        const response = await axios.get('/api/barChartData'); // Replace with your actual backend API endpoint
        const data = response.data;

        // Update chart data state
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart with updated data
    if (chartData) {
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.map((item) => item.baseCurrency + ' to ' + item.targetCurrency),
          datasets: [
            {
              label: 'Sample Data',
              data: chartData.map((item) => item.convertedAmount),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              barPercentage: 0.8,
              categoryPercentage: 0.6,
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
    }

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return <canvas ref={chartRef} width="500" height="500" />;
};

export default BarChart;
