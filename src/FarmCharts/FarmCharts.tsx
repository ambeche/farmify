import React, { useEffect } from 'react';
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
import BarAndLineCharts from './BarAndLineCharts';
import MultiLineChartForAllFarms from './MultiLineChartForAllFarms';

export {
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

export const Charts = ChartJS.register(
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
    <div>
      <BarAndLineCharts />
      <MultiLineChartForAllFarms />
    </div>
  );
};

export default FarmCharts;
