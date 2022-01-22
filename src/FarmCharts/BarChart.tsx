import React, { useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
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
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Title,
  Tooltip
);

const BarChart = () => {
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
        label: 'Min',
        data: farmStats.map((stats) => stats.min),
        backgroundColor: colors.min,
        borderColor: colors.min,
      },
      {
        label: 'Max',
        data: farmStats.map((stats) => stats.max),
        backgroundColor: colors.max,
        borderColor: colors.max,
      },
    ],
  };

  return (
    <div style={{ height: 400, maxWidth: '50%', margin: 40 }}>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
