import React from 'react';
import BarChart from './FarmCharts/BarChart';
import FarmDataGrid from './FarmData/FarmDataGrid';
import MainAppBar from './MainAppBar';

const App = () => {
  return (
    <div>
      <MainAppBar />
      <FarmDataGrid />
      <BarChart />
    </div>
  );
};

export default App;
