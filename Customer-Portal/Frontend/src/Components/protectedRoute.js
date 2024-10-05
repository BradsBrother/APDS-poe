// src/Components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Services/authContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the child components (protected content)
  return children;
};

export default ProtectedRoute;
