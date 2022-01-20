import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '..';
import {
  RootState,
  setFarmData,
  setPage,
  Action,
} from '../reducers/farmReducer';
import { useSelector } from 'react-redux';

const FarmDataGrid = () => {
  const dispatch = useAppDispatch();
  const { currentPage, nextPage, pages, farmData } = useSelector(
    (state: RootState) => state
  );

  useEffect(() => {
    if (!pages.find((page) => page.index === currentPage)) {
      dispatch(setFarmData(nextPage) as unknown as Action);
    }
  }, [nextPage, currentPage]);

  console.log(
    'itExist',
    Boolean(pages.find((page) => page.index === currentPage))
  );
  console.log(nextPage);
  console.log(currentPage);
  console.log('data', pages);

  const columns: GridColDef[] = [
    { field: 'farmname', headerName: 'Farm Name' },
    { field: 'datetime', headerName: 'Date' },
    { field: 'metrictype', headerName: 'Metric' },
    { field: 'value', headerName: 'Value' },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={pages[currentPage]?.farmData || farmData}
        columns={columns}
        rowCount={farmData?.length}
        pageSize={100}
        rowsPerPageOptions={[100]}
        pagination
        paginationMode="server"
        onPageChange={(newPage) =>
          dispatch(setPage(newPage) as unknown as Action)
        }
      />
    </div>
  );
};

export default FarmDataGrid;
