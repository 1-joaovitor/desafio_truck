import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      primary: string;
      secondary: string;
      accent: string;
      card: string;
      border: string;
      gradientStart: string;
      gradientEnd: string;
    };
  }
}