import React from 'react';
import FarmCharts from './FarmCharts/FarmCharts';
import FarmDataGrid from './FarmData/FarmDataGrid';
import MainAppBar from './MainAppBar';
import { Box, Grid } from '@mui/material';

const App = () => {
  return (
    <Box>
      <MainAppBar />
      <Box >
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item sm={12} md={6}>
            <FarmDataGrid />
          </Grid>
          <Grid item sm={12} md={6}>
            <FarmCharts />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default App;
