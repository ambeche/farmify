import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {useAppDispatch} from '..';
import {RootState, setFarmData, setPage, Action} from '../reducers/farmReducer';
import {useSelector} from 'react-redux';

const FarmDataGrid = () => {
  const dispatch = useAppDispatch();
  const {farmData, page} = useSelector((state:RootState)=> state);

  useEffect(() => {
    dispatch( setFarmData(page.index) as unknown as Action)
   
  },[page]);
  console.log(farmData)

  const columns: GridColDef[] = [
    { field: 'farmname', headerName: 'Farm Name' },
    { field: 'datetime', headerName: 'Date' },
    { field: 'metrictype', headerName: 'Metric' },
    { field: 'value', headerName: 'Value' },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={farmData}
        columns={columns}
        rowCount={farmData.length}
       
        pagination
        paginationMode='server'
        onPageChange={(newPage) => (dispatch(setPage(newPage) as unknown as Action))}
      />
    </div>
  );
};

export default FarmDataGrid;
