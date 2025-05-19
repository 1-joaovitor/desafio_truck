import React from 'react';

interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default BaseCard;