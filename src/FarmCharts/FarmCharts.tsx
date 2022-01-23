import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
import { useAppDispatch } from '..';
import { useSelector } from 'react-redux';
import { RootState, Action, setFarmStatistics } from '../reducers/farmReducer';
import BarAndLineCharts from './BarAndLineCharts';
import MultiLineChartForAllFarms from './MultiLineChartForAllFarms';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ArrowRightAlt, Thermostat } from '@mui/icons-material';

export {
  Chart as ChartJS,
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

export const Charts = ChartJS.register(
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Title,
  Tooltip
);

const FarmCharts = () => {
  const dispatch = useAppDispatch();
  const { farmStats } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(setFarmStatistics(false) as unknown as Action);
    dispatch(setFarmStatistics(true) as unknown as Action);
  }, []);

  return (
    <Box sx={{border: '0.5px solid #DCDCDC', borderRadius: 1} }>
      <Box sx={{  display:'flex', flexDirection: 'row', justifyContent: 'center'} }>
      <Box component={Button} endIcon={<ArrowRightAlt />}>select</Box>
        <Button endIcon={<Thermostat />}>temperature</Button>
        <IconButton color='primary'>rainFall</IconButton>
        <IconButton color='primary'>pH</IconButton>
      </Box>
      <Box sx={{ overflow: 'auto', maxHeight: 500 } }>
      <BarAndLineCharts />
      <MultiLineChartForAllFarms />
      </Box>
    </Box>
  );
};

export default FarmCharts;
