import React, { useState } from 'react';
import { Box } from '@mui/system';
import UserForm from './UserForm';
import { CHART_COLORS } from '../utils';
import { Button } from '@mui/material';

interface RegisterOrLoginProps {
  redirectBtnLabel: string;
  submissionBtnLabel: string;
  handleSubmission: () => void;
}
const RegisterOrLogin = ({ submissionBtnLabel, redirectBtnLabel, handleSubmission }: RegisterOrLoginProps) => {
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
    handleSubmission();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          border: `solid ${CHART_COLORS.rainfall.max}`,
          borderRadius: 2,
          padding: '2% 2%',
          maxWidth: '20%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <UserForm
          username={username}
          password={password}
          btnLabel={submissionBtnLabel}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
          onSubmit={onSubmit}
        />
        <Button color="secondary"> {redirectBtnLabel} </Button>
      </Box>
    </Box>
  );
};

export default RegisterOrLogin;
