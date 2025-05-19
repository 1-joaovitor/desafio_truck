import React from 'react';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const BaseInput: React.FC<BaseInputProps> = (props) => (
  <input
  type={props.type ?? 'text'}
    {...props}
    className={`p-2 border border-gray-300 rounded ${props.className ?? ''}`}
  />
);

export default BaseInput;