import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import {UploadFile} from '@mui/icons-material';

type FarmCardProps = { farmname: string; updateFarm: () => void, fetchFarm: () => void };

const UserFarmCard = ({ farmname, updateFarm, fetchFarm }: FarmCardProps) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent onClick={fetchFarm}>
        <Typography variant='h6' sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
             {farmname} Word of the Day
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={updateFarm} size="small" startIcon={<UploadFile />}>add data</Button>
      </CardActions>
    </Card>
  );
};

export default UserFarmCard;
