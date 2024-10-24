import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RoomTable from '../components/RoomTable';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // You can keep using this with moment
import { Typography, TextField, Grid, Box } from '@mui/material';
import moment from 'moment-timezone';
import { buildingData } from '../data';

// Utility function to get today's date in the US Northeast timezone
const getTodayDateInUSEast = () => {
  return moment().tz('America/New_York').startOf('day').toDate();
};

const RoomDetailPage = () => {
  const { buildingName, room } = useParams();
  const data = buildingData[buildingName] || [];
  const selectedDevice = data.find((item) => item.room === room);
  const [date, setDate] = useState(getTodayDateInUSEast());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {room} - {buildingName}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      {selectedDevice && (
        <RoomTable
          buildingName={buildingName}
          deviceId={selectedDevice.deviceId}
          date={date}
          fullName={selectedDevice.fullName}
        />
      )}
    </Box>
  );
};

export default RoomDetailPage;
