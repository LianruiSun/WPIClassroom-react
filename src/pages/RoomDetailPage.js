import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BuildingTable from '../components/RoomTable';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Typography, TextField, Grid } from '@mui/material';
import { buildingData } from '../data';

// Utility function to get today's date in the US Northeast timezone
const getTodayDateInUSEast = () => {
  const now = new Date();
  const offset = -4 * 60; // UTC offset for US Eastern Daylight Time (EDT)
  const localTime = new Date(now.getTime() + offset * 60 * 1000);
  return new Date(localTime.toISOString().split('T')[0]); // Get just the date part
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
    <div>
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
        <BuildingTable buildingName={buildingName} deviceId={selectedDevice.deviceId} date={date} />
      )}
    </div>
  );
};

export default RoomDetailPage;
