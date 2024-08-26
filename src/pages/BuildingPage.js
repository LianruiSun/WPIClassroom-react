import React from 'react';
import { useParams } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { buildingData } from '../data';
import { Typography, Grid, Box } from '@mui/material';

const BuildingPage = () => {
  const { buildingName } = useParams();
  const data = buildingData[buildingName] || [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {buildingName}
      </Typography>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <RoomCard room={item.room} buildingName={buildingName} deviceId={item.deviceId} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BuildingPage;
