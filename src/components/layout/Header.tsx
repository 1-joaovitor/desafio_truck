import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import BaseButton from '../Base/BaseButton';
import { LogIn, LogOut, User, Home, LayoutDashboard, FilmIcon, Menu, X, Moon, Sun, Monitor } from 'lucide-react';

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  
  const isHome = location.pathname === '/';
  const isDashboard = location.pathname === '/dashboard';
  const isProfile = location.pathname === '/profile';
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  const toggleThemeMenu = () => {
    setThemeMenuOpen(prev => !prev);
  };
  
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setThemeMenuOpen(false);
  };
  
 
  const themeIcons = {
    light: <Sun size={20} className="text-amber-400" />,
    dark: <Moon size={20} className="text-indigo-300" />,
    system: <Monitor size={20} className="text-gray-300" />
  };
  
  return (
    <header 
      className={`py-5 ${transparent 
        ? 'bg-transparent' 
        : 'bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg dark:from-gray-800 dark:to-gray-900'}`}
    >
      <div className="container mx-auto px-4">
     
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-10">
            <Link to="/" className="text-white text-xl font-bold flex items-center">
              <FilmIcon className="h-6 w-6 mr-2" />
              Studio Ghibli
            </Link>
            
          
            {isAuthenticated && (
              <nav className="hidden md:flex space-x-6">
                <Link 
                  to="/" 
                  className={`text-sm font-medium flex items-center ${isHome 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-indigo-100 hover:text-white'}`}
                >
                  <Home size={16} className="mr-1" />
                  Catálogo
                </Link>
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium flex items-center ${isDashboard 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-indigo-100 hover:text-white'}`}
                >
                  <LayoutDashboard size={16} className="mr-1" />
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className={`text-sm font-medium flex items-center ${isProfile 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-indigo-100 hover:text-white'}`}
                >
                  <User size={16} className="mr-1" />
                  Perfil
                </Link>
              </nav>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
         
            <div className="relative">
              <button 
                onClick={toggleThemeMenu}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-indigo-700/50 text-white hover:bg-indigo-700/70 transition-colors"
                aria-label="Alterar tema"
                title="Alterar tema"
              >
                {themeIcons[theme]}
              </button>
              
              {themeMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                        theme === 'light' 
                          ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Sun size={16} className="mr-2 text-amber-500" />
                      Tema Claro
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                        theme === 'dark' 
                          ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Moon size={16} className="mr-2 text-indigo-400" />
                      Tema Escuro
                    </button>
                    <button
                      onClick={() => handleThemeChange('system')}
                      className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                        theme === 'system' 
                          ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Monitor size={16} className="mr-2 text-gray-500" />
                      Sistema
                    </button>
                  </div>
                </div>
              )}
            </div>
       
            {isAuthenticated && (
              <div className="hidden sm:flex items-center px-4 py-2 bg-indigo-700/70 text-white rounded-lg">
                <User size={16} className="mr-2" />
                Olá, {user?.name?.split(' ')[0]}
              </div>
            )}
            
          
            <div className="hidden sm:block">
              {isAuthenticated ? (
                <BaseButton 
                  variant="primary" 
                  size="sm" 
                  onClick={logout}
                  className="bg-transparent border border-white text-white hover:bg-white hover:text-indigo-600 dark:hover:text-gray-800"
                >
                  <LogOut size={16} className="mr-1" />
                  Sair
                </BaseButton>
              ) : (
                <Link to="/login">
                  <BaseButton 
                    variant="primary" 
                    size="sm" 
                    className="bg-white hover:bg-white/90 text-indigo-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                  >
                    <LogIn size={16} className="mr-1" />
                    Entrar
                  </BaseButton>
                </Link>
              )}
            </div>
            
          
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden text-white focus:outline-none"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
      
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-indigo-500/30 dark:border-gray-700/50 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-sm font-medium flex items-center ${isHome 
                  ? 'text-white font-bold' 
                  : 'text-indigo-100'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home size={16} className="mr-2" />
                Catálogo
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`text-sm font-medium flex items-center ${isDashboard 
                      ? 'text-white font-bold' 
                      : 'text-indigo-100'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard size={16} className="mr-2" />
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`text-sm font-medium flex items-center ${isProfile 
                      ? 'text-white font-bold' 
                      : 'text-indigo-100'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={16} className="mr-2" />
                    Perfil
                  </Link>
                  
                 
                  <div className="pt-2 border-t border-indigo-500/30 dark:border-gray-700/50">
                    <p className="text-white text-sm font-medium mb-2">Tema</p>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => {
                          handleThemeChange('light');
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${
                          theme === 'light' 
                            ? 'bg-indigo-700/50 text-white' 
                            : 'text-indigo-100 hover:bg-indigo-700/30'
                        }`}
                      >
                        <Sun size={16} className="mr-2 text-amber-300" />
                        Tema Claro
                      </button>
                      <button
                        onClick={() => {
                          handleThemeChange('dark');
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${
                          theme === 'dark' 
                            ? 'bg-indigo-700/50 text-white' 
                            : 'text-indigo-100 hover:bg-indigo-700/30'
                        }`}
                      >
                        <Moon size={16} className="mr-2 text-indigo-300" />
                        Tema Escuro
                      </button>
                      <button
                        onClick={() => {
                          handleThemeChange('system');
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${
                          theme === 'system' 
                            ? 'bg-indigo-700/50 text-white' 
                            : 'text-indigo-100 hover:bg-indigo-700/30'
                        }`}
                      >
                        <Monitor size={16} className="mr-2 text-gray-300" />
                        Sistema
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-2 flex items-center text-white text-sm">
                    <User size={16} className="mr-2" />
                    Olá, {user?.name?.split(' ')[0]}
                  </div>
                  
                  <div className="pt-2">
                    <BaseButton 
                      variant="primary" 
                      size="sm" 
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="bg-transparent border border-white text-white hover:bg-white/10"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sair
                    </BaseButton>
                  </div>
                </>
              ) : (
                <>
                
                  <div className="pt-2 border-t border-indigo-500/30 dark:border-gray-700/50">
                    <p className="text-white text-sm font-medium mb-2">Tema</p>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => {
                          handleThemeChange('light');
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${
                          theme === 'light' 
                            ? 'bg-indigo-700/50 text-white' 
                            : 'text-indigo-100 hover:bg-indigo-700/30'
                        }`}
                      >
                        <Sun size={16} className="mr-2 text-amber-300" />
                        Tema Claro
                      </button>
                      <button
                        onClick={() => {
                          handleThemeChange('dark');
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${
                          theme === 'dark' 
                            ? 'bg-indigo-700/50 text-white' 
                            : 'text-indigo-100 hover:bg-indigo-700/30'
                        }`}
                      >
                        <Moon size={16} className="mr-2 text-indigo-300" />
                        Tema Escuro
                      </button>
                      <button
                        onClick={() => {
                          handleThemeChange('system');
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${
                          theme === 'system' 
                            ? 'bg-indigo-700/50 text-white' 
                            : 'text-indigo-100 hover:bg-indigo-700/30'
                        }`}
                      >
                        <Monitor size={16} className="mr-2 text-gray-300" />
                        Sistema
                      </button>
                    </div>
                  </div>
                
                  <div className="pt-2">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <BaseButton 
                        variant="ghost" 
                        size="sm" 
                        className="bg-white hover:bg-white/90 text-indigo-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                      >
                        <LogIn size={16} className="mr-2" />
                        Entrar
                      </BaseButton>
                    </Link>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;