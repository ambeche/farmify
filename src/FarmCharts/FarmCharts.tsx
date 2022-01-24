import React, { useEffect, useState } from 'react';
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
import { Box, Button, IconButton } from '@mui/material';
import { ArrowRightAlt, Thermostat } from '@mui/icons-material';
import { MetricType } from '../types';
import farmService from '../services/farmData';

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
  const { farmData } = useSelector((state: RootState) => state);
  const [metric, setMetric] = useState<MetricType>(MetricType.Temperature);

  useEffect(() => {
    dispatch(setFarmStatistics(false) as unknown as Action);
  }, [farmData, metric]);

  useEffect(() => {
    dispatch(setFarmStatistics(true) as unknown as Action);
  }, [metric]);

  const handleMetricTypeChange = (type: MetricType) => {
    farmService.setQueryParams({ metrictype: type });
    setMetric(type);
  };

  return (
    <Box sx={{ border: '0.5px solid #DCDCDC', borderRadius: 1 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: 0.5,
        }}
      >
        <Box component={Button} endIcon={<ArrowRightAlt />}>
          select
        </Box>
        <Button
          endIcon={<Thermostat />}
          onClick={() => handleMetricTypeChange(MetricType.Temperature)}
        >
          temperature
        </Button>
        <IconButton
          onClick={() => handleMetricTypeChange(MetricType.Rainfall)}
          color="primary"
          size="small"
        >
          rainFall
        </IconButton>
        <IconButton
          onClick={() => handleMetricTypeChange(MetricType.PH)}
          color="primary"
          size="small"
        >
          pH
        </IconButton>
      </Box>
      <Box sx={{ overflow: 'auto', maxHeight: 500 }}>
        <BarAndLineCharts />
        <MultiLineChartForAllFarms />
      </Box>
    </Box>
  );
};

export default FarmCharts;
