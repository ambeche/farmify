import React from 'react';
import BarAndLineCharts from './FarmCharts/BarAndLineCharts';
import FarmDataGrid from './FarmData/FarmDataGrid';
import MainAppBar from './MainAppBar';

const App = () => {
  return (
    <div>
      <MainAppBar />
      <FarmDataGrid />
      <BarAndLineCharts />
    </div>
  );
};

export default App;
