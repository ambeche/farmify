import React, { useState } from 'react';
import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { RootState, useAppDispatch } from '..';
import { useSelector } from 'react-redux';
import UserFarmCard from '../User/UserFarmCard';
import { useNavigate } from 'react-router-dom';
import { CHART_COLORS } from '../utils';
import AppDialog from '../globalComponents/AppDialog';
import FileUploadForm from '../FarmData/FileUploadForm';
import { Action, addDataToExistingFarm } from '../reducers/farmReducer';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { username, token, farms } = useSelector(
    (state: RootState) => state.user.user
  );
  const navigate = useNavigate();
  const [isDialogOpened, setDialog] = useState<boolean>(false);

  const closeDialog = () => {
    setDialog(false);
  };

  const openDialog = () => {
    if (token) setDialog(true);
  };
  const handleFileUpload = (file: File) => {
    dispatch(addDataToExistingFarm(file) as unknown as Action);
  };

  const showFarmDetails = () => {
    navigate('/');
  };

  const FarmCards = () => {
    if (!farms.length)
      return (
        <Typography
          sx={{ fontSize: 14, textAlign: 'center' }}
          color="text.secondary"
        >
          Your added farms will appear here!
        </Typography>
      );
    return (
      <>
        {farms?.map((farm) => (
          <UserFarmCard
            key={farm?.farmname}
            farmname={farm?.farmname}
            fetchFarm={showFarmDetails}
            updateFarm={openDialog}
          />
        ))}
      </>
    );
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          mb: '2%',
          color: `${CHART_COLORS.temperature.max}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            border: `1px solid ${CHART_COLORS.temperature.min}`,
            borderBottomLeftRadius: '20%',
            borderTopRightRadius: '15%',
            maxWidth: '25%',
            padding: 1,
            fontWeight: 'bold',
          }}
        >
          Welcome {username}!
        </Typography>
      </Box>
      <Divider />
      <Typography
        variant="h6"
        sx={{ textAlign: 'center', mb: '1%', mt: '1%' }}
        gutterBottom
      >
        Manage Your Farms
      </Typography>
      <FarmCards />
      <AppDialog
        open={isDialogOpened}
        onClose={closeDialog}
        title="Add More Data to Your Farm"
      >
        <FileUploadForm
          handleFileUpload={handleFileUpload}
          label="update farm"
        />
      </AppDialog>
    </Box>
  );
};

export default Profile;
