import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { AccountCircleRounded } from '@mui/icons-material';
import { useAppDispatch } from '.';
import { useSelector } from 'react-redux';
import { RootState } from './';
import AppMenu from './globalComponents/AppMenu';
import { logoutUser } from './reducers/userReducer';
import { Action } from './reducers/farmReducer';

type MainAppBarProps = { openFarmForm: () => void };

const MainAppBar = ({ openFarmForm }: MainAppBarProps) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const setUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeUserMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = (item: string) => {
    if (item === 'Log out') dispatch(logoutUser() as unknown as Action);
    closeUserMenu();
  };

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
            <Button color="inherit" onClick={openFarmForm}>
              create Farm
            </Button>
          </Box>
          {user.token && (
            <Button
              color="inherit"
              startIcon={<AccountCircleRounded />}
              id="user"
              aria-controls={anchorEl ? 'app-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? 'true' : undefined}
              onClick={setUserMenu}
            >
              {user.username}
            </Button>
          )}
          {!user.token && (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <AppMenu
        anchorEl={anchorEl}
        onClose={closeUserMenu}
        handleSelection={handleLogout}
        anchorId={'user'}
        menuItems={['Log out', 'Profile']}
      />
    </Box>
  );
};

export default MainAppBar;
