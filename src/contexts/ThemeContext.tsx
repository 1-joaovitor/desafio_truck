import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider, DefaultTheme } from 'styled-components';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  currentTheme: 'light' | 'dark'; 
}


export const lightTheme: DefaultTheme = {
  colors: {
    background: '#f8fafc',
    text: '#334155',
    primary: '#4f46e5',
    secondary: '#7c3aed',
    accent: '#06b6d4',
    card: '#ffffff',
    border: '#e2e8f0',
    gradientStart: '#4f46e5',
    gradientEnd: '#7c3aed'
  }
};

export const darkTheme: DefaultTheme = {
  colors: {
    background: '#0f172a',
    text: '#e2e8f0',
    primary: '#818cf8',
    secondary: '#a78bfa',
    accent: '#22d3ee',
    card: '#1e293b',
    border: '#334155',
    gradientStart: '#4338ca',
    gradientEnd: '#6d28d9'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(storedTheme);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

 
  useEffect(() => {
    const updateTheme = () => {
      if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setCurrentTheme(prefersDark ? 'dark' : 'light');
      } else {
        setCurrentTheme(theme);
      }
    };

    updateTheme();
    
    
    localStorage.setItem('theme', theme);
    
   
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateTheme();
      }
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
     
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme]);


  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
      <StyledThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};