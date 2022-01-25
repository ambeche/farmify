import React, { useState } from 'react';
import { Box } from '@mui/system';
import UserForm from './UserForm';
import { CHART_COLORS } from '../utils';

const AddUser = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(username, password);
  };

  return (
    <Box sx={{ border: `solid ${CHART_COLORS.temperature.min}` }}>
      <UserForm
        username={username}
        password={password}
        btnLabel="register"
        handlePasswordChange={handlePasswordChange}
        handleUsernameChange={handleUsernameChange}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default AddUser;
