import React, { useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { Box } from '@mui/system';
import UserForm from './UserForm';
import { CHART_COLORS } from '../utils';
import { Button } from '@mui/material';
import { UserCredentialsInput } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '..';

export interface RegisterOrLoginProps {
  redirectBtnLabel: string;
  submissionType: string;
  handleSubmission: (credentials: UserCredentialsInput) => void;
}
const RegisterOrLogin = ({
  submissionType,
  redirectBtnLabel,
  handleSubmission,
}: RegisterOrLoginProps) => {
  const { message, code } = useSelector((state: RootState) => state.notice);
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
    handleSubmission({ username, password });
    setPassword('');
    setUsername('');
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <UserForm
          username={username}
          password={password}
          btnLabel={submissionType}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
          onSubmit={onSubmit}
        />
        {message === 'login' && code === 'success' && (
          <Navigate to="/" replace={true} />
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button component={RouterLink} to="/">
            cancel
          </Button>
          <Button
            component={RouterLink}
            to={`/${redirectBtnLabel}`}
            color="secondary"
          >
            {redirectBtnLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterOrLogin;
