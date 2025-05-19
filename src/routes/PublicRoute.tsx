import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
  restricted?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, restricted = false }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
 
  const from = location.state?.from?.pathname || '/dashboard';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

 
  if (restricted && isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;