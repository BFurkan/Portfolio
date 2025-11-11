import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App'; // Your main App component

const container = document.getElementById('root');
const root = createRoot(container); // Create a root for React 18

const theme = createTheme({
  palette: {
    mode: 'light', // Change to 'dark' for dark mode
  },
});
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);