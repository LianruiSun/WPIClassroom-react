import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchLatestData } from '../dynamoDB/dynamodbService';

const RoomCard = ({ room, buildingName, deviceId }) => {
  const [latestData, setLatestData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date().toISOString().split('T')[0];
      const data = await fetchLatestData(deviceId, date);
      setLatestData(data);
    };

    fetchData();
  }, [deviceId]);

  const handleClick = () => {
    navigate(`/${buildingName}/${room}`);
  };

  return (
    <Card onClick={handleClick} style={{ cursor: 'pointer', margin: '10px' }}>
      <CardContent>
        <Typography variant="h5">{room}</Typography>
        {latestData && (
          <>
            <Typography variant="body1">CO2: {latestData.co2?.N || 'N/A'}</Typography>
            <Typography variant="body1">Humidity: {latestData.humid?.N || 'N/A'}</Typography>
            <Typography variant="body1">Temperature: {latestData.temp?.N || 'N/A'}</Typography>
            {/* Add other data points as needed */}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
