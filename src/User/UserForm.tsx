import React from 'react';
import { Box, Button, TextField } from '@mui/material';

interface UserFormProps {
  username: string;
  password: string;
  btnLabel: string;
  handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UserForm = ({
  username,
  password,
  btnLabel,
  onSubmit,
  handlePasswordChange,
  handleUsernameChange,
}: UserFormProps) => {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
      <TextField
        id="username"
        label="username"
        margin="dense"
        required
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
      <TextField
        id="user-password"
        label="password"
        margin="dense"
        required
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button type="submit">{btnLabel} </Button>
    </Box>
  );
};

export default UserForm;
