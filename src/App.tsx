import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainAppBar from './MainAppBar';
import { Box } from '@mui/material';
import { useAppDispatch } from '.';
import { Action, setFarmOptions } from './reducers/farmReducer';
import Home from './Pages/Home';
import Authentication from './Pages/Authentication';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setFarmOptions() as unknown as Action);
  });

  return (
    <Box>
      <MainAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="login"
          element={<Authentication submissionType="login" />}
        />
        <Route
          path="register"
          element={<Authentication submissionType="register" />}
        />
      </Routes>
    </Box>
  );
};

export default App;
