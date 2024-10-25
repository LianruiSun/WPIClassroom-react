import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { buildingData } from '../data';
import { Typography, Grid, Box } from '@mui/material';

const BuildingPage = () => {
  const { buildingName } = useParams();
  const navigate = useNavigate();
  const data = buildingData[buildingName];
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Only navigate if data is missing and we haven't navigated already
    if (!data && !checked) {
      navigate('/NotFound', { replace: true });
      setChecked(true);
    }
  }, [data, checked, navigate]);

  // Return null immediately if data does not exist, to prevent rendering
  if (!data) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {buildingName}
      </Typography>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <RoomCard room={item.room} buildingName={buildingName} deviceId={item.deviceId} fullName={item.fullName} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BuildingPage;
