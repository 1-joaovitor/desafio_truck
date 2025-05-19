import React from 'react';
import styled, { css } from 'styled-components';

interface StyledButtonProps {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: css`
    font-size: 0.85rem;
    padding: 0.35rem 0.75rem;
  `,
  md: css`
    font-size: 1rem;
    padding: 0.5rem 1.1rem;
  `,
  lg: css`
    font-size: 1.15rem;
    padding: 0.75rem 1.5rem;
  `,
};

const variants = {
  primary: css`
    background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
    color: #fff;
    border: none;
    &:hover { background: #6366f1; }
  `,
  success: css`
    background: #38a169;
    color: #fff;
    border: none;
    &:hover { background: #2f855a; }
  `,
  warning: css`
    background: #ecc94b;
    color: #2d3748;
    border: none;
    &:hover { background: #d69e2e; }
  `,
  danger: css`
    background: #e53e3e;
    color: #fff;
    border: none;
    &:hover { background: #c53030; }
  `,
  ghost: css`
    background: transparent;
    color: #4f46e5;
    border: 1px solid #e2e8f0;
    &:hover { background: #f7fafc; }
  `,
};

const StyledButton = styled.button<StyledButtonProps>`
  border-radius: 6px;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  outline: none;
  transition: all 0.18s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  ${({ size = 'sm' }) => sizes[size]}
  ${({ variant = 'primary' }) => variants[variant]}
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, StyledButtonProps {
  children: React.ReactNode;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  ...props
}) => (
  <StyledButton variant={variant} size={size} {...props}>
    {children}
  </StyledButton>
);

export default BaseButton;