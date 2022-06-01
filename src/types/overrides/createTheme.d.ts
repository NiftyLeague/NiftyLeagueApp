// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as createTheme from '@mui/material/styles';
import { customShadows } from 'themes/shadows';

declare module '@mui/material/styles' {
  export interface ThemeOptions {
    customShadows?: customShadows;
    customization?:
      | TypographyOptions
      | ((palette: Palette) => TypographyOptions);
    darkTextSecondary?: string;
    textDark?: string;
    darkTextPrimary?: string;
    grey500?: string;
  }
  interface Theme {
    customShadows: customShadows;
    customization: Typography;
    darkTextSecondary: string;
    textDark: string;
    grey500: string;
    darkTextPrimary: string;
  }
  interface TypographyVariants {
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    bodyIBM1: React.CSSProperties;
    bodyIBM2: React.CSSProperties;
    bodyIBM3: React.CSSProperties;
    bodyIBM4: React.CSSProperties;
    bodyIBM5: React.CSSProperties;
    bodyIBM6: React.CSSProperties;
    bodyP1: React.CSSProperties;
    bodyP2: React.CSSProperties;
    bodyP3: React.CSSProperties;
    bodyP4: React.CSSProperties;
    bodyP5: React.CSSProperties;
    bodyP6: React.CSSProperties;
  }
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title1?: React.CSSProperties;
    title2?: React.CSSProperties;
    bodyIBM1: React.CSSProperties;
    bodyIBM2: React.CSSProperties;
    bodyIBM3: React.CSSProperties;
    bodyIBM4: React.CSSProperties;
    bodyIBM5: React.CSSProperties;
    bodyIBM6: React.CSSProperties;
    bodyP1: React.CSSProperties;
    bodyP2: React.CSSProperties;
    bodyP3: React.CSSProperties;
    bodyP4: React.CSSProperties;
    bodyP5: React.CSSProperties;
    bodyP6: React.CSSProperties;
  }
}

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
