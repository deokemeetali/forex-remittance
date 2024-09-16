import React from "react";
import BarChart from "./chartbar";
 import PieChart from "./chartpie";
import LineChart from "./chartline";
import TransactionList from "./transactionlist";
import '../styles/chart.css';
function AllChart() {
  return (
    <div className="mainbox">
      <div className="barchart bg-white">
        <BarChart/>
      </div>
      <div className="piechart bg-white">
        <PieChart/>
      </div>
      <div className="linechart bg-white">
        <LineChart/>
      </div>
      <div className="transaction bg-white">
        <TransactionList/>
      </div>
    </div>
  );
}

export default AllChart;