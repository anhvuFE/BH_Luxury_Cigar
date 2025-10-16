import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('auth_token');
  const userRole = localStorage.getItem('userRole');

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && allowedRoles.length > 0) {
    if (!userRole || !allowedRoles.includes(userRole)) {
      // Redirect to appropriate page based on role
      if (userRole === 'admin' || userRole === 'staff') {
        return <Navigate to="/admin" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;