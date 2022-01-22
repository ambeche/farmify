import React from 'react';
import FarmCharts from './FarmCharts/FarmCharts';
import FarmDataGrid from './FarmData/FarmDataGrid';
import MainAppBar from './MainAppBar';

const App = () => {
  return (
    <div>
      <MainAppBar />
      <FarmCharts />
      <FarmDataGrid />
      
    </div>
  );
};

export default App;
