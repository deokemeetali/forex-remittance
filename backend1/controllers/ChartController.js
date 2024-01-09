const { pool } = require('../database/db')
const getChartData = async (req, res) => {
  try {
    // Fetch aggregated data from the PostgreSQL table
    const query = `
      SELECT purpose, COUNT(*) AS count
      FROM form_data
      GROUP BY purpose
    `

    const result = await pool.query(query)

    const purposeColors = {
      'Family support': '#FFD700', // Gold
      Education: '#87CEEB', // Sky Blue
      'Medical expenses': '#98FB98', // Pale Green
      Business: '#FFB6C1', // Light Pink
      'Personal expense': '#FFDAB9', // Peachpuff
      Other: '#C0C0C0'// Silver
    }

    // Prepare data for the chart
    const chartData = {
      labels: [],
      data: [],
      backgroundColor: [],
      borderColor: []
    }

    // Map values from the result and handle undefined colors
    result.rows.forEach(row => {
      chartData.labels.push(row.purpose)
      chartData.data.push(row.count)

      const color = purposeColors[row.purpose]
      chartData.backgroundColor.push(color || '#FFFFFF')// Default to white if color is undefined
      chartData.borderColor.push(color || '#FFFFFF')// Default to white if color is undefined
    })

    console.log(chartData)
    res.status(200).json(chartData)
  } catch (error) {
    console.error('Error fetching chart data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// LINE CHART DATA
const getLineChartData = async (req, res) => {
  try {
    // Fetch data from the PostgreSQL table
    const query = `
      SELECT amount, converted_amount
      FROM form_data
    `

    const result = await pool.query(query)

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
          pointRadius: 3
        },
        {
          label: 'Converted Amount',
          data: result.rows.map(row => row.converted_amount),
          fill: false,
          borderColor: '#87CEEB', // Sky Blue
          borderWidth: 1,
          pointBackgroundColor: '#87CEEB',
          pointRadius: 3
        }
      ]
    }

    res.status(200).json(lineChartData)
  } catch (error) {
    console.error('Error fetching line chart data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// BAR CHART DATA
const getBarChartData = async (req, res) => {
  try {
    // Fetch data from the PostgreSQL table
    const query = `
      SELECT base_currency, target_currency, COUNT(*) AS count
      FROM form_data
      GROUP BY base_currency, target_currency
    `

    const result = await pool.query(query)

    // Prepare data for the bar chart
    const barChartData = {
      labels: result.rows.map(row => `${row.base_currency} to ${row.target_currency}`),
      datasets: [
        {
          label: 'Transaction Count',
          data: result.rows.map(row => row.count),
          backgroundColor: ['#FFD700', '#87CEEB', '#98FB98', '#FFB6C1', '#FFDAB9', '#C0C0C0'],
          borderColor: ['#FFD700', '#87CEEB', '#98FB98', '#FFB6C1', '#FFDAB9', '#C0C0C0'],
          borderWidth: 1
        }
      ]
    }

    console.log(barChartData)
    res.status(200).json(barChartData)
  } catch (error) {
    console.error('Error fetching bar chart data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = { getChartData, getLineChartData, getBarChartData }
