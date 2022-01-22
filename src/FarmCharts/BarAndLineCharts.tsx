import React, { useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
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
import { MONTHS, getColorByMetric } from '../utils';

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Title,
  Tooltip
);

const BarAndLineCharts = () => {
  const dispatch = useAppDispatch();
  const { farmStats } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(setFarmStatistics() as unknown as Action);
  }, []);

  const colors = getColorByMetric(farmStats[0]?.metrictype);

  const data = {
    labels: MONTHS,
    datasets: [
      {
        type: 'line' as const,
        label: 'average',
        fill: false,
        data: farmStats.map((stats) => stats.average),
        borderColor: colors.avg,
      },
      {
        type: 'bar' as const,
        label: 'Min',
        data: farmStats.map((stats) => stats.min),
        backgroundColor: colors.min,
        borderColor: colors.min,
      },
      {
        type: 'bar' as const,
        label: 'Max',
        data: farmStats.map((stats) => stats.max),
        backgroundColor: colors.max,
        borderColor: colors.max,
      },
    ],
  };

  return (
    <div style={{ height: 400, maxWidth: '50%', margin: 40 }}>
      <Chart type="bar" data={data} />
    </div>
  );
};

export default BarAndLineCharts;
