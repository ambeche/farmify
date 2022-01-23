import React, { useEffect } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { useAppDispatch } from '..';
import {
  RootState,
  setFarmData,
  setPage,
  Action,
} from '../reducers/farmReducer';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { Filter } from '@mui/icons-material';
import AppMenu from '../globalComponents/AppMenu';

const FarmDataGrid = () => {
  const dispatch = useAppDispatch();
  const { currentPage, nextPage, pages, farmData } = useSelector(
    (state: RootState) => state
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const setFarmFiltering = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFarmMenuClose = (selectedItem?: string) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!pages.find((page) => page.index === currentPage)) {
      dispatch(setFarmData(nextPage) as unknown as Action);
    }
  }, [nextPage, currentPage]);

  console.log(
    'itExist',
    Boolean(pages.find((page) => page.index === currentPage))
  );

  const columns: GridColDef[] = [
    { field: 'farmname', headerName: 'Farm Name' },
    { field: 'datetime', headerName: 'Date' },
    { field: 'metrictype', headerName: 'Metric' },
    { field: 'value', headerName: 'Value' },
  ];

  const DataGridToolbar = () => {
    return (
      <GridToolbarContainer>
        <Box sx={{ padding: 1 }}>
          <Button
            startIcon={<Filter />}
            id="farm-picker"
            aria-controls={anchorEl ? 'app-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? 'true' : undefined}
            onClick={setFarmFiltering}
          >
            Select Farm
          </Button>
        </Box>
        <GridToolbarDensitySelector />
        <AppMenu
          anchorEl={anchorEl}
          onClose={handleFarmMenuClose}
          anchorId={'farm-picker'}
          menuItems={["noora's farm", 'hellow there ', 'how are you']}
        />
      </GridToolbarContainer>
    );
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1, marginTop: '10%' }}>
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
            components={{ Toolbar: DataGridToolbar }}
            density="compact"
          />
        </div>
      </div>
    </div>
  );
};

export default FarmDataGrid;
