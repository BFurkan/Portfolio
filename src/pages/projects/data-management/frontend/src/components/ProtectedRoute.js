import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Logged in but not admin, redirect to home or show an error
    // For simplicity, redirecting to home
    console.warn('Admin access required for this route.');
    return <Navigate to="/" replace />;
  }

  // User is logged in and has required permissions
  return <Outlet />; // Renders the nested child route (e.g., FileUpload)
};

export default ProtectedRoute;
