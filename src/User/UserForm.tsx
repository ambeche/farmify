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
    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      component="form"
      onSubmit={onSubmit}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id={`username-${btnLabel}`}
          label="username"
          margin="dense"
          required
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <TextField
          id={`user-password-${btnLabel}`}
          label="password"
          margin="dense"
          required
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <Button type="submit" variant="outlined">
        {btnLabel}{' '}
      </Button>
    </Box>
  );
};

export default UserForm;
