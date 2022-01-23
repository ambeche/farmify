import React from 'react';
import { Line } from 'react-chartjs-2';
import '../FarmCharts/FarmCharts';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/farmReducer';
import { MONTHS, CHART_COLORS } from '../utils';
import { Box } from '@mui/material';

const MultiLineChartForAllFarms = () => {
  const { farmStats } = useSelector((state: RootState) => state);

  // sort and extract stats from different farms
  const statsSortedByFarmNames = farmStats.combinedFarms.sort((a, b) =>
    a.farmname.toLowerCase().localeCompare(b.farmname.toLowerCase())
  );
  const extractSingleFarmStat = (start: number, end: number, color: string) => {
    const subSet = statsSortedByFarmNames.slice(start, end);
    console.log('subset', subSet);
    return {
      label: subSet[0]?.farmname,
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
  console.log('dataset', datasets);
  const data = {
    labels: MONTHS,
    datasets,
    options: {
      plugins: {
        title: {
          display: true,
          text: `${farmStats.singleFarm[0]?.farmname} Farm`,
          align: 'center',
          padding: 10
      }

      }
    }
  };

  return (
    <Box sx={{paddingLeft: 4, paddingRight: 4}}>
      <Line data={data} />
    </Box>
  );
};

export default MultiLineChartForAllFarms;
