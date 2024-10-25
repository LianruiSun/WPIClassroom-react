import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFoundPage = () => (
  <Box sx={{ textAlign: 'center', padding: '40px' }}>
    <Typography
      variant="h2"
      color="#AC2B37"
      gutterBottom
      sx={{ userSelect: 'none' }}
    >
      404
    </Typography>
    <Typography variant="h5"
      sx={{ userSelect: 'none' }}
    >
      Page Not Found
    </Typography>
  </Box>
);

export default NotFoundPage;
