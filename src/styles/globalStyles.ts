import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    transition: background-color 0.3s, color 0.3s;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
    
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    font: inherit;
  }

  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }


  html.dark {
    .bg-white {
      background-color: #1e293b !important;
    }
    
    .text-gray-800 {
      color: #e2e8f0 !important;
    }
    
    .text-gray-700, .text-gray-600 {
      color: #cbd5e1 !important;
    }
    
    .border-gray-200, .border-gray-100 {
      border-color: #334155 !important;
    }
    
    .from-blue-50, .to-indigo-100 {
      --tw-gradient-from: #1e293b !important;
      --tw-gradient-to: #0f172a !important;
    }
    
    input, textarea, select {
      background-color: #334155 !important;
      border-color: #475569 !important;
      color: #e2e8f0 !important;
      
      &::placeholder {
        color: #94a3b8 !important;
      }
    }
  }
`;

export default GlobalStyle;