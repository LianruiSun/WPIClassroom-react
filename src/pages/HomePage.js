import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/homepage.jpg';

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src={backgroundImage}
        alt="background"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          padding: '20px',
          zIndex: 1,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to WPI Healthy Classroom Dashboard
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Monitor and Maintain Healthy Classroom Environments
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/Atwater%20Kent%20Laboratories"
          sx={{ mt: 3 }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
