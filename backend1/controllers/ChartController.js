const { pool } = require('../database/db');
// PIE CHART DATA
const getChartData = async (req, res) => {
  try {
    let query;

    if (req.user.role === 'Admin') {
      // Admin can see all transactions
      query = `
        SELECT purpose, COUNT(*) AS count
        FROM Transaction_history
        GROUP BY purpose
      `;
    } else {
      // Normal user can only see their own transactions
      query = `
        SELECT purpose, COUNT(*) AS count
        FROM Transaction_history
        WHERE user_id = $1
        GROUP BY purpose
      `;
    }

    const result = await pool.query(query, [req.user.id]);

    const purposeColors = {
      'family support': '#54bebe',
      'medical expenses': '#e4bcad',
      'education': '#98d1d1',
      'others': '#df979e',
    };

    const chartData = {
      labels: [],
      data: [],
      backgroundColor: [],
      borderColor: [],
    };

    result.rows.forEach(row => {
      chartData.labels.push(row.purpose);
      chartData.data.push(row.count);

      const color = purposeColors[row.purpose];
      chartData.backgroundColor.push(color || '#FFFFFF');
      chartData.borderColor.push(color || '#FFFFFF');
    });

    console.log(chartData);
    res.status(200).json(chartData);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// LINE CHART DATA 
const getLineChartData = async (req, res) => {
  try {
    let query;

    if (req.user.role === 'Admin') {
      // Admin can see all transactions
      query = `
        SELECT amount, converted_amount
        FROM Transaction_history
      `;
    } else {
      // Normal user can only see their own transactions
      query = `
        SELECT amount, converted_amount
        FROM Transaction_history
        WHERE user_id = $1
      `;
    }

    const result = await pool.query(query, [req.user.id]);

    const lineChartData = {
      labels: result.rows.map(row => ''), // Replace with actual labels if applicable
      datasets: [
        {
          label: 'Amount',
          data: result.rows.map(row => row.amount),
          fill: false,
          borderColor: '#FFD700',
          borderWidth: 1,
          pointBackgroundColor: '#FFD700',
          pointRadius: 3,
        },
        {
          label: 'Converted Amount',
          data: result.rows.map(row => row.converted_amount),
          fill: false,
          borderColor: '#87CEEB',
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

// BAR CHART DATA - No changes needed, already handles user role


// BAR CHART DATA
const getBarChartData = async (req, res) => {
  try {
    let query;

    if (req.user.role === 'Admin') {
      // Admin can see all transactions
      query = `
        SELECT base_currency, target_currency, COUNT(*) AS count
        FROM Transaction_history
        GROUP BY base_currency, target_currency
      `;
    } else {
      // Normal user can only see their own transactions
      query = `
        SELECT base_currency, target_currency, COUNT(*) AS count
        FROM Transaction_history
        WHERE user_id = $1
        GROUP BY base_currency, target_currency
      `;
    }

    const result = await pool.query(query, [req.user.id]);

    // Prepare data for the bar chart
    const barChartData = {
      labels: result.rows.map(row => `${row.base_currency} to ${row.target_currency}`),
      datasets: [
        {
          label: 'Transaction Count',
          data: result.rows.map(row => row.count),
          backgroundColor: ['#FFD700', '#87CEEB', '#98FB98', '#FFB6C1', '#FFDAB9', '#C0C0C0'],
          borderColor: ['#FFD700', '#87CEEB', '#98FB98', '#FFB6C1', '#FFDAB9', '#C0C0C0'],
          borderWidth: 1,
        },
      ],
    };

    res.status(200).json(barChartData);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { getChartData, getLineChartData , getBarChartData};
