import React from 'react';
import { Chart } from 'react-chartjs-2';
import '../FarmCharts/FarmCharts';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/farmReducer';
import { MONTHS, getColorByMetric } from '../utils';
import { Box, Typography } from '@mui/material';

export type ChartProps = { selectedYear: number };

const BarAndLineCharts = ({ selectedYear }: ChartProps) => {
  const { farmStats } = useSelector((state: RootState) => state);

  const colors = getColorByMetric(farmStats.combinedFarms[0]?.metrictype);

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
    <Box sx={{ padding: 2 }}>
      <Box component={Typography} sx={{ marginBottom: 2, textAlign: 'center' }}>
        {farmStats.singleFarm[0]
          ? `Farm: ${farmStats.singleFarm[0]?.farmname} - '${farmStats.singleFarm[0]?.metrictype}' Statistics in ${selectedYear}`
          : 'No Data availabel for the set Year or Metric, change filters!'}
      </Box>
      <Chart type="bar" data={data} />
    </Box>
  );
};
export default BarAndLineCharts;
