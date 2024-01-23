import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios'; 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const TransactionList = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use Axios to fetch data from the local JSON file
        const response = await axios.get('/data/transaction_data.json');
        setRowData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from JSON file:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 
  // Column definitions
  const columnDefs = [
    { headerName: 'Amount_Send', field: 'amount_sent' },
    { headerName: 'Recipeint_get', field: 'recipient_get' },
    { headerName: 'Base Currency', field: 'sender_country' },
    { headerName: 'Target Currency', field: 'recipient_country' },
    { headerName: 'cardHolderName', field: 'card_holder_name' },
    { headerName: 'Recipeint_BankName', field: 'recipient_bank_name' },
    { headerName: 'Recipeint_Email', field: 'recipient_email' },
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
