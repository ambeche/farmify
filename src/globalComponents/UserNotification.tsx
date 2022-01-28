import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { RootState } from '..';

const UserNotification = () => {
  const { message, code, open } = useSelector(
    (state: RootState) => state.notice
  );
  return (
    <Snackbar
      open={open}
      autoHideDuration={null}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={code}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default UserNotification;
