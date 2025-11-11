import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import DataTable from './pages/DataTable';
import Login from './pages/Login';
import FileUpload from './pages/FileUpload';
import { Box } from '@mui/material'; // For basic layout

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Box sx={{ p: 3 }}> {/* Add some padding around content */}
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            {/* Make DataTable public */}
            <Route path="/" element={<DataTable />} />

            {/* Routes requiring login (Now only protected routes go here) */}
            {/* <Route element={<ProtectedRoute />}> */}
              {/* Add any routes here that need login but NOT admin */}
            {/* </Route> */}

            {/* Routes requiring admin privileges */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/upload" element={<FileUpload />} />
              {/* Editing within DataTable is handled internally by checking isAdmin */}
            </Route>

            {/* Optional: Catch-all or 404 route */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;
