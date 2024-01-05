const { pool } = require('../database/db');

const getChartData = async (req, res) => {
  try {
    // Fetch aggregated data from the PostgreSQL table
    const query = `
      SELECT purpose, COUNT(*) AS count
      FROM form_data
      GROUP BY purpose
    `;

    const result = await pool.query(query);

    const purposeColors = {
      'Family support': '#FFD700',    // Gold
      'Education': '#87CEEB',         // Sky Blue
      'Medical Expense': '#98FB98',   // Pale Green
      'Business': '#FFB6C1',          // Light Pink
      'Personal expense': '#FFDAB9',  // Peachpuff
      'Other': '#C0C0C0',             // Silver
    };

    // Prepare data for the chart
    const chartData = {
      labels: [],
      data: [],
      backgroundColor: [],
      borderColor: [],
    };

    // Map values from the result and handle undefined colors
    result.rows.forEach(row => {
      chartData.labels.push(row.purpose);
      chartData.data.push(row.count);

      const color = purposeColors[row.purpose];
      chartData.backgroundColor.push(color || '#FFFFFF');  // Default to white if color is undefined
      chartData.borderColor.push(color || '#FFFFFF');      // Default to white if color is undefined
    });

    console.log(chartData);
    res.status(200).json(chartData);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getLineChartData = async (req, res) => {
  try {
    // Fetch data from the PostgreSQL table
    const query = `
      SELECT amount, converted_amount
      FROM form_data
    `;

    const result = await pool.query(query);

    // Prepare data for the line chart
    const lineChartData = {
      labels: result.rows.map(row => ''), // Replace with actual labels if applicable
      datasets: [
        {
          label: 'Amount',
          data: result.rows.map(row => row.amount),
          fill: false,
          borderColor: '#FFD700', // Gold
          borderWidth: 1,
          pointBackgroundColor: '#FFD700',
          pointRadius: 3,
        },
        {
          label: 'Converted Amount',
          data: result.rows.map(row => row.converted_amount),
          fill: false,
          borderColor: '#87CEEB', // Sky Blue
          borderWidth: 1,
          pointBackgroundColor: '#87CEEB',
          pointRadius: 3,
        },
      ],
    };

    res.status(200).json(lineChartData);
  } catch (error) {
    console.error('Error fetching line chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getBarChartData = async (req, res) => {
  try {
    // Fetch data from the PostgreSQL table
    const query = `
      SELECT base_currency, target_currency, COUNT(*) AS count
      FROM form_data
      GROUP BY base_currency, target_currency
    `;

    const result = await pool.query(query);

    // Prepare data for the bar chart
    const chartData = {
      labels: [],
      datasets: [],
    };

    // Create a mapping for colors if needed
    const currencyColors = {
      'USD': '#FFD700',    // Gold
      'EUR': '#87CEEB',    // Sky Blue
      'GBP': '#98FB98',    // Pale Green
      // Add more currencies as needed
    };

    // Group data by base currency
    const groupedData = {};
    result.rows.forEach(row => {
      if (!groupedData[row.base_currency]) {
        groupedData[row.base_currency] = {
          label: row.base_currency,
          data: [],
          backgroundColor: currencyColors[row.base_currency] || '#FFFFFF',
          borderColor: currencyColors[row.base_currency] || '#FFFFFF',
        };
      }

      groupedData[row.base_currency].data.push(row.count);

      // Add target currency to labels if not already present
      if (!chartData.labels.includes(row.target_currency)) {
        chartData.labels.push(row.target_currency);
      }
    });

    // Convert groupedData object to an array for datasets
    chartData.datasets = Object.values(groupedData);

    console.log(chartData);
    res.status(200).json(chartData);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { getChartData, getLineChartData , getBarChartData};
