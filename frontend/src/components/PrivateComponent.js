
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateComponent = () => {
  const auth = localStorage.getItem('user'); // Check if user is authenticated
  const location = useLocation();

  // If the user isn't logged in, redirect to the signup/login page
  return auth ? <Outlet /> : <Navigate to="/signup" state={{ from: location }} replace />;
};

export default PrivateComponent;



