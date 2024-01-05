import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your backend API
        const response = await fetch('/api/chartData'); // Update the endpoint
        const data = await response.json();

        // Update chart data state
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []); // Fetch data only on component mount

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

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
  }, [chartData]); // Update chart when chartData changes

  return <canvas ref={chartRef} width="400" height="300" />;
};

export default PieChart;
