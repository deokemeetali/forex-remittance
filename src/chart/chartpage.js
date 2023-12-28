import React from 'react';
import BarChart from './barchart';
import LineChart from './linechart';
import PieChart from './piechart';

const ChartPage = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <h2>Bar Chart</h2>
            <BarChart />
          </div>
          <div>
            <h2>Pie Chart</h2>
            <PieChart />
          </div>
          <div>
            <h2>Line Chart</h2>
            <LineChart />
          </div>
        </div>
      );
    };

export default ChartPage;
