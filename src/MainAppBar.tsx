import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import {AccountCircleRounded} from '@mui/icons-material';

const MainAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: '4%' }}>
      <AppBar position="sticky">
        <Toolbar>
          <Box sx={{ flexGrow: 2, textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              Farmify
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={RouterLink} to="/login">
              create Farm
            </Button>
          </Box>
          <Button color="inherit" startIcon={<AccountCircleRounded/>}>
            username
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainAppBar;
