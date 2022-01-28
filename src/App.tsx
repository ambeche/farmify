import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainAppBar from './MainAppBar';
import { Box } from '@mui/material';
import { RootState, useAppDispatch } from '.';
import { Action, addFarm, setFarmOptions } from './reducers/farmReducer';
import Home from './Pages/Home';
import Authentication from './Pages/Authentication';
import { setCurrentUserOwnFarms, setCurrentUserCredentials } from './reducers/userReducer';
import { UserCredentials } from './types';
import farmService from './services/farm';
import FileUploadForm from './FarmData/FileUploadForm';
import AppDialog from './globalComponents/AppDialog';
import { useSelector } from 'react-redux';
import Profile from './Pages/Profile';
import UserNotification from './globalComponents/UserNotification';
import { notifyUser } from './reducers/notificationReducer';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const [isFarmCreationDialogOpened, setFarmCreationDialog] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(setFarmOptions() as unknown as Action);
    const isLoggedIn = window.localStorage.getItem('currentUser');
    if (isLoggedIn) {
      // sets credentials from storage if it exits.
      const user = JSON.parse(isLoggedIn) as UserCredentials;
      dispatch(setCurrentUserCredentials(user) as unknown as Action);
      dispatch(setCurrentUserOwnFarms(user.token) as unknown as Action);
      farmService.setToken(user);
    }
  }, []);

  const closeFarmCreationDialog = () => {
    setFarmCreationDialog(false);
  };

  const openFarmCreationDialog = () => {
    // allows farm creation only for authenticated user
    if (currentUser?.token) return setFarmCreationDialog(true);
    dispatch(
      notifyUser({
        message: 'Login or Register to add your own farm',
        code: 'info',
        open: true,
      }) as unknown as Action
    );
    navigate('/login');
  };

  const handleFileUpload = (file: File) => {
    dispatch(addFarm(file, currentUser.username) as unknown as Action);
  };

  return (
    <Box>
      <MainAppBar openFarmForm={openFarmCreationDialog} />
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
        <Route path="profile" element={<Profile />} />
      </Routes>
      <AppDialog
        open={isFarmCreationDialogOpened}
        onClose={closeFarmCreationDialog}
        title="CSV File Upload for Farm Creation"
      >
        <FileUploadForm
          handleFileUpload={handleFileUpload}
          label="create farm"
          closeDialog={closeFarmCreationDialog}
        />
      </AppDialog>
      <UserNotification />
    </Box>
  );
};

export default App;
