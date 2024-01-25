import React from "react";
import BarChart from "./chartbar";
import PropTypes from 'prop-types'; 
 import PieChart from "./chartpie";
import LineChart from "./chartline";
import TransactionList from "./transactionlist";
import '../styles/chart.css';
const AllChart = ({ userRole }) =>  {
  return (
    <div className="mainbox">
      <div className="barchart bg-white">
        <BarChart userRole={userRole}/>
      </div>
      <div className="piechart bg-white">
        <PieChart userRole={userRole}/>
      </div>
      <div className="linechart bg-white">
        <LineChart userRole={userRole}/>
      </div>
      <div className="transaction bg-white">
        <TransactionList userRole={userRole}/>
      </div>
    </div>
  );
}
AllChart.propTypes = {
  userRole: PropTypes.string.isRequired,  // Validate userRole as a required string
};


export default AllChart;