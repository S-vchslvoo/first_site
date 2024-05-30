import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
