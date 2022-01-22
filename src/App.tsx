import React from 'react';
import BarAndLineCharts from './FarmCharts/BarAndLineCharts';
import FarmDataGrid from './FarmData/FarmDataGrid';
import MainAppBar from './MainAppBar';

const App = () => {
  return (
    <div>
      <MainAppBar />
      <BarAndLineCharts />
      <FarmDataGrid />
      
    </div>
  );
};

export default App;
