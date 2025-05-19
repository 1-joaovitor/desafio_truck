import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import MainLayout from './MainLayout';

interface PublicLayoutProps {
  children: React.ReactNode;
  restricted?: boolean;
  headerTransparent?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ 
  children, 
  restricted = false,
  headerTransparent = false
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (restricted && isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <MainLayout headerTransparent={headerTransparent}>
      {children}
    </MainLayout>
  );
};

export default PublicLayout;