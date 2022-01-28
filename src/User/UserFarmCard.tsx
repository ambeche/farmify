import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import {UploadFile, PageviewRounded} from '@mui/icons-material';

type FarmCardProps = { farmname: string; updateFarm: () => void, fetchFarm: () => void };

const UserFarmCard = ({ farmname, updateFarm, fetchFarm }: FarmCardProps) => {
  return (
    <Card sx={{ minWidth: 275 }} >
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <CardContent onClick={fetchFarm}>
        <Typography variant='h6' sx={{flexGrow: 1 }} color="text.secondary" gutterBottom>
             {farmname} 
        </Typography>
      </CardContent>
      <CardActions sx={{ }}>
        <Button onClick={updateFarm} size="small" startIcon={<UploadFile />} sx={{pr: 4 }}>add data</Button>
        <Button onClick={fetchFarm} size="small" startIcon={<PageviewRounded />}>View</Button>
      </CardActions>
      </Box>
    </Card>
  );
};

export default UserFarmCard;
