import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiurl}/api/getChartData`);
        const data = response.data;

        if (data && data.labels && data.data && data.backgroundColor && data.borderColor) {
          setChartData(data);
        } else {
          console.error('Invalid chart data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartData) {
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

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);
  
  return (
    <div className="chart-container">
    {loading && <p className="loading-message">Loading...</p>}
    <canvas ref={chartRef} width="300" height="300" />
  </div>
  );
};

export default PieChart;
