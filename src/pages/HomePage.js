import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: '100vh',
        p: 3,
      }}
    >
      <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            p: 3,
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
