// material-ui
import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// assets
import defaultColor from 'assets/scss/_themes-vars.module.scss';
import themeV3 from 'assets/scss/_themeV3.module.scss';

// types
import { ColorProps } from 'types';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (navType: PaletteMode, presetColor: string) => {
  let colors: ColorProps;
  switch (presetColor) {
    case 'themeV3':
      colors = themeV3;
      break;
    case 'default':
    default:
      colors = defaultColor;
  }

  return createTheme({
    palette: {
      mode: navType,
      common: {
        black: colors.darkPaper,
      },
      primary: {
        light: colors.primaryLight,
        main: colors.primaryMain,
        dark: colors.primaryDark,
      },
      error: {
        main: colors.errorMain,
      },
      warning: {
        main: colors.warningMain,
      },
      success: {
        main: colors.successMain,
      },
      dark: {
        main: colors.primaryDark,
      },
      orange: {
        main: colors.orangeMain,
      },
      grey: {
        50: colors.grey50,
        100: colors.grey100,
        200: colors.grey200,
        500: colors.grey500,
        600: colors.grey600,
        700: colors.grey700,
        800: colors.grey800,
      },
      text: {
        primary: navType === 'dark' ? colors.shade00 : colors.shade100,
        secondary: navType === 'dark' ? colors.grey50 : colors.shade100,
      },
      background: {
        paper: navType === 'dark' ? colors.shade100 : colors.shade00,
        default:
          navType === 'dark' ? colors.darkBackground : colors.lightBackground,
      },
    },
  });
};

export default Palette;
