import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const TransactionList = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make API call using Axios
    axios.get('http://localhost:5001/remittance-data')
      .then(response => {
        setRowData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array to run the effect only once

  // Column definitions
  const columnDefs = [
    { headerName: 'Source Account', field: 'source_account' },
    { headerName: 'Destination Account', field: 'destination_account' },
    { headerName: 'Purpose of Remittance', field: 'purpose_of_remittance' },
    { headerName: 'Created At', field: 'created_at' },
    { headerName: 'Source Currency', field: 'source_currency' },
    { headerName: 'Destination Currency', field: 'destination_currency' },
    { headerName: 'Transfer Amount', field: 'transfer_amount_in_beneficiary_account' },
  ];

  // Ag-Grid configuration
  const gridOptions = {
    pagination: true,
    domLayout: 'autoHeight',
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        gridOptions={gridOptions}
        columnDefs={columnDefs}
        rowData={rowData}
      />
    </div>
  );
};

export default TransactionList;
