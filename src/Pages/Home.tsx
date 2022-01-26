import React from 'react';
import FarmCharts from '../FarmCharts/FarmCharts';
import FarmDataGrid from '../FarmData/FarmDataGrid';
import { Box, Grid } from '@mui/material';

const Home = () => {
  return (
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
  );
};
export default Home;
