import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFoundPage = () => (
  <Box sx={{ textAlign: 'center', padding: '40px' }}>
    <Typography variant="h2" color="error" gutterBottom>
      404
    </Typography>
    <Typography variant="h5">Page Not Found</Typography>
  </Box>
);

export default NotFoundPage;
