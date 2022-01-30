import React, { useEffect, useState } from 'react';
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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [helperText, setHelperText] = useState<string>('');

  useEffect(() => {
    if (code === 'error') return setErrorMessage(message);
    if (code === 'success') {
      setPassword('');
      setUsername('');
    }
  }, [code, message]);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrorMessage('');
    setHelperText('');
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setErrorMessage('');
    setHelperText('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password || !username) return setHelperText('field required*!');
    handleSubmission({ username, password });
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
          errorMessage={errorMessage}
          helperText={helperText}
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
