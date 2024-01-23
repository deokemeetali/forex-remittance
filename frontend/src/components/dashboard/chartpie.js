// Import necessary dependencies
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios'; 

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState(null);
  const apiurl = process.env.REACT_APP_API_BACKEND_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch aggregated data from your backend API using Axios
        const response = await axios.get(`${apiurl}/api/getChartData`) 
        const data = response.data;

        // Update chart data state only if the response has valid structure
        if (data && data.labels && data.data && data.backgroundColor && data.borderColor) {
          setChartData(data);
        } else {
          console.error('Invalid chart data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d'); // Use optional chaining to avoid potential null/undefined

    // Destroy the existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartData) {
      // Create a new pie chart with dynamic data
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Purpose of Remittance',
              data: chartData.data,
              backgroundColor: chartData.backgroundColor,
              borderColor: chartData.borderColor,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Pie Chart',
            fontSize: 16,
          },
          legend: {
            display: true,
            position: 'top',
          },
          tooltips: {
            enabled: true,
            callbacks: {
              label: (tooltipItem, data) => {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const value = dataset.data[tooltipItem.index];
                return `${data.labels[tooltipItem.index]}: ${value}`;
              },
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

  return <canvas ref={chartRef} width="400" height="300" />;
};

export default PieChart;
