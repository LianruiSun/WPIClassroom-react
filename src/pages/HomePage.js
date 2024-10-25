import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import backgroundImage from '../assets/images/home_background.jpg';

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 64px)',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Left Area: Content with Fade-in Effect */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '50%',
          padding: '100px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.9))',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
          animation: 'fadeIn 1.5s ease-out', // Fade-in animation applied here
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#AC2B37',
            marginBottom: '20px',
          }}
        >
          Welcome to
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#AC2B37',
            textAlign: 'left',
            marginTop: '20px',
          }}
        >
          WPI Healthy Classroom Dashboard
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            color: '#333',
            marginBottom: '30px',
          }}
        >
          Monitor and Maintain Healthy Classroom Environments
        </Typography>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/Atwater%20Kent%20Laboratories"
          sx={{
            mt: 3,
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#AC2B37',
            '&:hover': {
              backgroundColor: '#8E2330',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          Get Started
        </Button>

        {/* Know More link with arrow icon */}
        <Button
          component={Link}
          to="/more-info"
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            color: '#AC2B37',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '16px',
          }}
          endIcon={<ArrowForwardIcon />}
        >
          Know More
        </Button>
      </Box>

      {/* Right Area: Background Image */}
      <Box
        sx={{
          width: '50%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={backgroundImage}
          alt="background"
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
