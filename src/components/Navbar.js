import { Link as RouterLink } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Arithmetic Calculator
        </Typography>
        {auth.isAuthenticated && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">Welcome, {auth.username}</Typography>
            <Button color="inherit" component={RouterLink} to="/dashboard">
              Calculator
            </Button>
            <Button color="inherit" component={RouterLink} to="/history">
              Records History
            </Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
