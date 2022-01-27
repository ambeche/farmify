import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useSelector} from 'react-redux';
import {RootState} from '..';

const UserNotification = () => {
  const {message, code, open} = useSelector((state: RootState) => state.notice);
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={null} >
        <Alert elevation={6} variant='filled' severity={code} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
export default UserNotification;