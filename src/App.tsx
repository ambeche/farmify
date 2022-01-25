import React, { useEffect } from 'react';
import FarmCharts from './FarmCharts/FarmCharts';
import FarmDataGrid from './FarmData/FarmDataGrid';
import MainAppBar from './MainAppBar';
import { Box, Grid } from '@mui/material';
import { useAppDispatch } from '.';
import { Action, setFarmOptions } from './reducers/farmReducer';
import AddUser from './User/AddUser';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setFarmOptions() as unknown as Action);
  });
  return (
    <Box>
      <MainAppBar />
      <Box>
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item sm={12} md={6}>
            <FarmDataGrid />
          </Grid>
          <Grid item sm={12} md={6}>
            <FarmCharts />
          </Grid>
        </Grid>
      </Box>
      <AddUser />
    </Box>
  );
};

export default App;
