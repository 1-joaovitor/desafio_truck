import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  background-color: ${({ theme }) => theme.colors.card};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FilmImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin: 8px 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const Info = styled.p`
  margin: 4px 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const Button = styled.button<{ isActive?: boolean }>`
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.secondary)};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const Skeleton = styled.div`
  background: linear-gradient(90deg, #f3f3f3 25%, #e2e8f0 50%, #f3f3f3 75%);
  background-size: 200% 100%;
  animation: skeleton 1.2s ease-in-out infinite;
  border-radius: 8px;
  margin-bottom: 12px;
  width: 100%;

  @keyframes skeleton {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

export const Synopsis = styled.p<{ expanded: boolean }>`
  margin: 4px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? 'unset' : 4)};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.text};
  
  .highlight {
    background-color: ${({ theme }) => theme.colors.accent}40;
    padding: 0 2px;
    border-radius: 2px;
  }
  
  .more-link {
    color: ${({ theme }) => theme.colors.primary};
    margin-left: 4px;
    font-weight: 500;
  }
`;