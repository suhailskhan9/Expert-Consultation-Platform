import React from 'react';
import { Navigate } from 'react-router-dom';

// Dummy authentication check (you should replace this with real authentication logic)
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true'; // Check your authentication logic
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/user/login" />;
};

export default ProtectedRoute;
