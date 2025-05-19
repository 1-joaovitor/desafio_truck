import React from 'react';

interface BaseSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const BaseSelect: React.FC<BaseSelectProps> = ({ children, ...props }) => (
  <select
    {...props}
    className={`border rounded-md p-2 ${props.className ?? ''}`}
  >
    {children}
  </select>
);

export default BaseSelect;