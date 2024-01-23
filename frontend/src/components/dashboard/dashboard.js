import React from 'react';
import SortDropdown from './nav';
import AllChart from './allchart';

function Dashboard() {
  return (
    <div className="container mt-2">
      <div className="row justify-content-end">
        <div className="col-md-2 text-end">
          <SortDropdown />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <AllChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;