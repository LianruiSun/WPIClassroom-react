import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import backgroundImage0 from '../assets/images/home_background0.jpg';
import backgroundImage1 from '../assets/images/home_background1.jpg';
import backgroundImage2 from '../assets/images/home_background2.jpg';
import backgroundImage3 from '../assets/images/home_background3.jpg';

const images = [backgroundImage0, backgroundImage1, backgroundImage2, backgroundImage3];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoSwitch(); // Start automatic switching on component mount

    return () => clearInterval(intervalRef.current); // Clear interval on component unmount
  }, []);

  const startAutoSwitch = () => {
    intervalRef.current = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsAnimating(false);
      }, 250); // Duration of the animation
    }, 5000); // Switch image every 5 seconds
  };

  const handleIndicatorClick = (index) => {
    if (index !== currentImageIndex) {
      clearInterval(intervalRef.current); // Stop automatic switching
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setIsAnimating(false);
      }, 25);

      // Restart automatic switching after 5 seconds delay
      setTimeout(() => {
        startAutoSwitch();
      }, 5000);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 64px)',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
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
          animation: 'fadeIn 1.5s ease-out',
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
            textAlign: 'left',
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

      {/* Right Area: Animated Image Slider */}
      <Box
        sx={{
          width: '50%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`background-${index}`}
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: currentImageIndex === index ? 1 : 0,
              transform:
                currentImageIndex === index
                  ? 'translateX(0)'
                  : isAnimating && index === (currentImageIndex - 1 + images.length) % images.length
                    ? 'translateX(-100%)'
                    : 'translateX(100%)',
              transition: 'transform 0.5s ease, opacity 0.5s ease',
            }}
          />
        ))}
      </Box>

      {/* Image Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '75%', // Center of the right section
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleIndicatorClick(index)}
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentImageIndex === index ? '#AC2B37' : '#ddd',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              userSelect: "none",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;
