import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import { Home } from '@mui/icons-material';
import './Sidebar.css';

const Sidebar = ({ open, onClose }) => {
  const buildings = [
    { name: 'Atwater Kent Laboratories', icon: <Home /> },
    { name: 'Olin Hall', icon: <Home /> },
    { name: 'Unity Hall', icon: <Home /> },
    { name: 'Salisbury Laboratories', icon: <Home /> },
    { name: 'Fuller Labs', icon: <Home /> },
  ];

  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem button component={Link} to="/" key="Home" onClick={handleListItemClick}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {buildings.map((building) => (
          <ListItem button component={Link} to={`/${building.name}`} key={building.name} onClick={handleListItemClick}>
            <ListItemIcon>
              {building.icon}
            </ListItemIcon>
            <ListItemText primary={building.name} />
          </ListItem>
        ))}
        <ListItem button component={Link} to="/Test" key="Test" onClick={handleListItemClick}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Test" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;