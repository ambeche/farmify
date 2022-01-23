import React from 'react';
import { Chart } from 'react-chartjs-2';
import '../FarmCharts/FarmCharts';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/farmReducer';
import { MONTHS, getColorByMetric } from '../utils';
import {Box} from '@mui/material';

const BarAndLineCharts = () => {
  const { farmStats } = useSelector((state: RootState) => state);

  const colors = getColorByMetric(farmStats.singleFarm[0]?.metrictype);

  const data = {
    labels: MONTHS,
    datasets: [
      {
        type: 'line' as const,
        label: 'average',
        fill: false,
        data: farmStats.singleFarm.map((stats) => stats.average),
        borderColor: colors.avg,
      },
      {
        type: 'bar' as const,
        label: 'Min',
        data: farmStats.singleFarm.map((stats) => stats.min),
        backgroundColor: colors.min,
        borderColor: colors.min,
      },
      {
        type: 'bar' as const,
        label: 'Max',
        data: farmStats.singleFarm.map((stats) => stats.max),
        backgroundColor: colors.max,
        borderColor: colors.max,
      },
    ],
  };

  return (
    <Box sx={{padding: 4}}>
      <Chart type="bar" data={data} />
    </Box>
  );
};

export default BarAndLineCharts;
