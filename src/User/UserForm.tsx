import React from 'react';
import { Box, Button, FormHelperText, TextField } from '@mui/material';

interface UserFormProps {
  username: string;
  password: string;
  btnLabel: string;
  errorMessage?: string;
  helperText?: string;
  handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UserForm = ({
  username,
  password,
  btnLabel,
  errorMessage,
  helperText,
  onSubmit,
  handlePasswordChange,
  handleUsernameChange,
}: UserFormProps) => {
  const ErrorMessage = () => {
    if (errorMessage)
      return (
        <FormHelperText
          error={Boolean(errorMessage)}
          sx={{ textAlign: 'center' }}
        >
          {errorMessage}
        </FormHelperText>
      );
    return null;
  };

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      component="form"
      onSubmit={onSubmit}
      noValidate
      autoComplete="off"
    >
      <ErrorMessage />
      <div>
        <TextField
          id={`username-${btnLabel}`}
          label="username"
          margin="dense"
          required
          error={Boolean(helperText)}
          type="text"
          value={username}
          onChange={handleUsernameChange}
          helperText={helperText || 'username is Case sensitive!'}
        />
      </div>
      <div>
        <TextField
          id={`user-password-${btnLabel}`}
          label="password"
          margin="dense"
          required
          error={Boolean(helperText)}
          type="password"
          value={password}
          onChange={handlePasswordChange}
          helperText={helperText}
        />
      </div>
      <Button type="submit" variant="outlined">
        {btnLabel}
      </Button>
    </Box>
  );
};

export default UserForm;
