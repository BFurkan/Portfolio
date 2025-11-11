import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login'); // Redirect to login after sign out
  };

  // Extract username prefix
  const displayUsername = user?.email?.split('@')[0] || 'User';

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Data Management
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Data Table
          </Button>
          {/* Always show Upload CSV link, route protection handles access */}
          <Button color="inherit" component={RouterLink} to="/upload">
            Upload CSV
          </Button>
          {user ? (
            <>
              <Typography component="span" sx={{ mr: 2, verticalAlign: 'middle' }}>
                {displayUsername} {isAdmin ? '(Admin)' : ''} {/* Show username prefix */}
              </Typography>
              <Button color="inherit" onClick={handleSignOut}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Admin Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
