import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { RootState, useAppDispatch } from '..';
import { useSelector } from 'react-redux';
import UserFarmCard from '../User/UserFarmCard';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { username, token, farms } = useSelector(
    (state: RootState) => state.user.user
  );
  const navigate = useNavigate();

  const showFarmDetails = () => {
    navigate('/');
  };
  const updateFarm = () => {
    navigate('/');
  };

  const FarmCards = () => {
    return (
      <>
        {farms?.map((farm) => (
          <UserFarmCard
            key={farm?.farmname}
            farmname={farm?.farmname}
            fetchFarm={showFarmDetails}
            updateFarm={updateFarm}
          />
        ))}
      </>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component={Typography}
        variant="h6"
        color="grey"
        sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}
      >
        Welcome {username}!
      </Box>
      <FarmCards />
    </Box>
  );
};

export default Profile;
