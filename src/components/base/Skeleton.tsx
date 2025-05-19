import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const SkeletonBlock = styled.div<{ width?: string; height?: string }>`
  background: #e2e8f0;
  border-radius: 4px;
  margin: 4px 0;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '16px'};
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #e2e8f0 0%, #f8fafc 50%, #e2e8f0 100%);
    background-size: 400px 100%;
    animation: ${shimmer} 1.2s infinite;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

interface SkeletonProps {
  width?: string;
  height?: string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, style }) => (
  <SkeletonBlock width={width} height={height} style={style} />
);

export default Skeleton;