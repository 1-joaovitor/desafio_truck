import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../components/Layout/AuthLayout';
import PublicLayout from '../components/Layout/PublicLayout';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
    
      <Route 
        path="/" 
        element={
          <PublicLayout>
            <HomeScreen />
          </PublicLayout>
        } 
      />
      
      <Route 
        path="/login" 
        element={
          <PublicLayout restricted>
            <LoginScreen />
          </PublicLayout>
        } 
      />
      
    
      <Route 
        path="/dashboard" 
        element={
          <AuthLayout>
            <DashboardScreen />
          </AuthLayout>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <AuthLayout>
            <ProfileScreen />
          </AuthLayout>
        } 
      />
      
     
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;