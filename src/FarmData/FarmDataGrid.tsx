import React, { useEffect } from 'react';
import { GridRowsProp, DataGrid, GridColDef } from '@mui/x-data-grid';
import farmData from '../services/farmData';

const FarmDataGrid = () => {
  //const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  //const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const farmRecords = await farmData.getFarmData();
      setRows(farmRecords);
    };
    void fetchData();
  },[]);
  console.log(rows)

  const columns: GridColDef[] = [
    { field: 'farmname', headerName: 'Farm Name' },
    { field: 'datetime', headerName: 'Date' },
    { field: 'metrictype', headerName: 'Metric' },
    { field: 'value', headerName: 'Value' },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
       
        
        rowCount={100}
      />
    </div>
  );
};

export default FarmDataGrid;
