import React, { useEffect } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { RootState, useAppDispatch } from '..';
import {
  setFarmData,
  setPage,
  Action,
  updateFarmOptions,
  resetFarmData,
} from '../reducers/farmReducer';
import farmService from '../services/farm';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';
import AppMenu from '../globalComponents/AppMenu';
import { FarmOptions } from '../types';
//currentPage, nextPage, pages, farmData, farmOptions,
const FarmDataGrid = () => {
  const dispatch = useAppDispatch();
  const { currentPage, nextPage, pages, farmData, farmOptions } = useSelector(
    (state: RootState) => state.farm
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    if (!pages.find((page) => page.index === currentPage)) {
      dispatch(setFarmData(nextPage) as unknown as Action);
    }
  }, [nextPage, currentPage, farmOptions]);

  const setFarmFiltering = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeFarmMenu = () => {
    setAnchorEl(null);
  };
  // sets server pagination for the records of the selected farm
  const handleFarmSelection = (selectedItem?: FarmOptions) => {
    if (selectedItem?.selected === false) {
      selectedItem.farmname !== 'All Farms'
        ? farmService.setQueryParams({ farmname: selectedItem.farmname })
        : farmService.setQueryParams({});
      dispatch(resetFarmData() as Action);
      dispatch(
        updateFarmOptions({ ...selectedItem, selected: true }) as Action
      );
    }
    closeFarmMenu();
  };

  const columns: GridColDef[] = [
    { field: 'farmname', headerName: 'Farm Name' },
    { field: 'datetime', headerName: 'Date' },
    { field: 'metrictype', headerName: 'Metric' },
    { field: 'value', headerName: 'Value' },
  ];

  const DataGridToolbar = () => {
    return (
      <GridToolbarContainer>
        <Box sx={{ paddingLeft: 1 }}>
          <Button
            startIcon={<FilterAlt />}
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
          onClose={closeFarmMenu}
          handleSelection={handleFarmSelection}
          anchorId={'farm-picker'}
          menuItems={farmOptions}
        />
      </GridToolbarContainer>
    );
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
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
