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
import { ArrowDropDown, ArrowRightAlt, Thermostat } from '@mui/icons-material';
import { MetricType, YearOptions } from '../types';
import farmService from '../services/farmData';
import AppMenu from '../globalComponents/AppMenu';
import { YEAR_OPTIONS } from '../utils';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [yearOptions, setOptions] = useState<YearOptions[]>(YEAR_OPTIONS);
  const [selectedYear, setSelectedYear] = useState<number>(2019);

  useEffect(() => {
    dispatch(setFarmStatistics(false) as unknown as Action);
  }, [farmData, metric, yearOptions]);

  useEffect(() => {
    dispatch(setFarmStatistics(true) as unknown as Action);
  }, [metric, yearOptions]);

  const setYearFiltering = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeYearMenu = () => {
    setAnchorEl(null);
  };
  const handleYearSelection = (selectedItem?: YearOptions) => {
    if (selectedItem?.selected === false) {
      farmService.setQueryParams({ year: selectedItem.year });
      const updatedOptions = yearOptions.map((item) =>
        item.year === selectedItem.year
          ? { ...item, selected: true }
          : { ...item, selected: false }
      );
      setOptions(updatedOptions);
      setSelectedYear(selectedItem.year);
    }
    closeYearMenu();
  };

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
        <Button
          endIcon={<ArrowDropDown />}
          id="farm-picker"
          aria-controls={anchorEl ? 'app-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
          onClick={setYearFiltering}
        >
          year
        </Button>
        <AppMenu
          anchorEl={anchorEl}
          onClose={closeYearMenu}
          handleSelection={handleYearSelection}
          anchorId={'farm-picker'}
          menuItems={yearOptions}
        />
      </Box>
      <Box sx={{ overflow: 'auto', maxHeight: 500 }}>
        <BarAndLineCharts selectedYear={selectedYear} />
        <MultiLineChartForAllFarms selectedYear={selectedYear} />
      </Box>
    </Box>
  );
};

export default FarmCharts;
