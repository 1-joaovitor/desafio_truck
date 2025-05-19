import React from 'react';

import Toast from '../Toast/Toast';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  headerTransparent?: boolean;
  hideFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  headerTransparent = false,
  hideFooter = false 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header transparent={headerTransparent} />
      
      <main className="flex-grow">
        {children}
      </main>
      
      {!hideFooter && <Footer />}
      <Toast />
    </div>
  );
};

export default MainLayout;