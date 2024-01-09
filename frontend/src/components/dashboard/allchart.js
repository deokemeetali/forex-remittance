import React from "react";
import BarChart from "./chartbar";
 import PieChart from "./chartpie";
import LineChart from "./chartline";
import TransactionList from "./transactionlist";
import '../styles/chart.css';
function AllChart() {
  return (
    <div className="col p-2 overflow-auto h-100">
      <div className="row g-3 my-2">
        <div className="col-md-3 p-5 mx-5">
          <div className="chart-container">
            <BarChart /> 
          </div>
        </div>
         <div className="col-md-3 p-5 mx-5">
          <div className="chart-container">
            <PieChart/> 
          </div>
        </div> 
        <div className="col-md-3 p-5 mx-5">
          <div className="chart-container">
            <LineChart /> 
          </div>
        </div> 
      </div>
       <TransactionList/> 
    </div>
  );
}

export default AllChart;