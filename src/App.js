import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Box, IconButton, AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './components/Sidebar';
import BuildingPage from './pages/BuildingPage';
import RoomDetailPage from './pages/RoomDetailPage';
import HomePage from './pages/HomePage';
import './App.css';
import '@fontsource/poppins';
import WpiLogo from './components/WpiLogo';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: '#AC2B37',
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleToggleSidebar}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 64,
                  marginRight: 7,
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    maxHeight: 50,
                  }}
                >
                  <WpiLogo sx={{ height: '100%', width: 'auto' }} />
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              marginLeft: sidebarOpen ? '240px' : '0',
              transition: 'margin-left 0.3s',
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/:buildingName" element={<BuildingPage />} />
              <Route path="/:buildingName/:room" element={<RoomDetailPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
