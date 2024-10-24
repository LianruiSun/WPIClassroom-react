import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchLatestData } from '../lambda/lambdaService';
import moment from 'moment-timezone';

const RoomCard = ({ room, buildingName, deviceId, fullName }) => {
  const [latestData, setLatestData] = useState(null);
  const navigate = useNavigate();

  const getEasternTimeDate = () => {
    return moment.tz("America/New_York").format("YYYY-MM-DD");
  };

  useEffect(() => {
    const fetchData = async () => {
      const date = getEasternTimeDate();
      console.log(date);
      const data = await fetchLatestData(deviceId, date);
      setLatestData(data);
    };

    fetchData();
  }, [deviceId]);

  const handleClick = () => {
    navigate(`/${buildingName}/${room}`);
  };

  const renderCircle = (label, value, unit) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
      }}
    >
      <Typography variant="body2" sx={{ textAlign: 'center' }}>{label}</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 50,
          height: 50,
          borderRadius: '50%',
          border: '1px solid #000',
          margin: 0.25,
        }}
      >
        <Typography variant="body2" sx={{ textAlign: 'center' }}>{value}</Typography>
      </Box>
      <Typography variant="body2" sx={{ textAlign: 'center' }}>{unit}</Typography>
    </Box>
  );  

  return (
    <Card onClick={handleClick} style={{ cursor: 'pointer', margin: '10px' }}>
      <CardContent>
        <Typography variant="h5">{room}</Typography>
        {latestData && (
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
            {renderCircle('Score', latestData.score?.N || 'Score', '%')}
            {renderCircle('Temp', latestData.temp?.N || 'Temperature', '°C')}
            {renderCircle('Humidity', latestData.humid?.N || 'Humidity', '%')}
            {renderCircle('CO2', latestData.co2?.N || 'CO2', 'ppm')}
            {renderCircle('Noise', latestData.noise?.N || 'Noise', 'dB')}
            {renderCircle('Light', latestData.light?.N || 'Light', 'lx')}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
