import React from 'react';
import { Line } from 'react-chartjs-2';
import '../FarmCharts/FarmCharts';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/farmReducer';
import { MONTHS, CHART_COLORS } from '../utils';
import { Box, Typography } from '@mui/material';
import { ChartProps } from './BarAndLineCharts';

const MultiLineChartForAllFarms = ({ selectedYear }: ChartProps) => {
  const { farmStats } = useSelector((state: RootState) => state);

  // sort and extract stats from different farms
  const statsSortedByFarmNames = farmStats.combinedFarms.sort((a, b) =>
    a.farmname.toLowerCase().localeCompare(b.farmname.toLowerCase())
  );
  const extractSingleFarmStat = (start: number, end: number, color: string) => {
    const subSet = statsSortedByFarmNames.slice(start, end);
    return {
      label: subSet[0] ? subSet[0]?.farmname : '',
      data: subSet.map((stats) => stats.average),
      borderColor: color,
    };
  };

  const datasets = [
    extractSingleFarmStat(0, 12, CHART_COLORS.temperature.avg),
    extractSingleFarmStat(12, 24, CHART_COLORS.ph.max),
    extractSingleFarmStat(24, 36, CHART_COLORS.temperature.min),
    extractSingleFarmStat(36, 49, CHART_COLORS.temperature.max),
  ];
  const data = {
    labels: MONTHS,
    datasets,
  };

  return (
    <Box
      sx={{
        paddingLeft: 2,
        paddingRight: 2,
        marginTop: 8,
        textAlign: 'center',
      }}
    >
      <Box component={Typography} sx={{ marginBottom: 2 }}>
        {farmStats.combinedFarms[0]
          ? `Monthly '${farmStats.combinedFarms[0]?.metrictype}' Averages Across Farms in ${selectedYear}`
          : 'No Data available for the set Year or Metric, change filters!'}
      </Box>
      <Line data={data} />
    </Box>
  );
};

export default MultiLineChartForAllFarms;
