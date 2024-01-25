import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const TransactionList = ({ userRole }) => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  useEffect(() => {
    // Make API call using Axios to fetch form data
    axios.get(`${apiurl}/api/transaction_history`, {
      params: { userRole } // Pass userRole as a parameter to the backend
    })
      .then(response => {
        // Ensure that the response data is an array
        if (Array.isArray(response.data)) {
          setRowData(response.data);
        } else {
          console.error('Invalid data format. Expected an array:', response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
        setLoading(false);
      });
  }, [userRole]); // Include userRole as a dependency

  // Column definitions
  const columnDefs = [
    { headerName: 'Sender Name', field: 'sender_name' },
    { headerName: 'Recipient Name', field: 'recipient_name' },
    { headerName: 'Amount', field: 'amount' },
    { headerName: 'Base Currency', field: 'base_currency' },
    { headerName: 'Target Currency', field: 'target_currency' },
    { headerName: 'Purpose', field: 'purpose' },
    { headerName: 'Bank Account', field: 'bank_account' },
    { headerName: 'Converted Amount', field: 'converted_amount' },
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
TransactionList.propTypes = {
  userRole: PropTypes.string.isRequired, // Validate userRole as a required string
};

export default TransactionList;
