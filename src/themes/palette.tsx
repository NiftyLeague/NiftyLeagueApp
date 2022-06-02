// material-ui
import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// assets
import defaultColor from 'assets/scss/_themes-vars.module.scss';
import theme from 'assets/scss/_theme.module.scss';
import theme2 from 'assets/scss/_theme2.module.scss';
import theme3 from 'assets/scss/_theme3.module.scss';
import theme4 from 'assets/scss/_theme4.module.scss';
import theme5 from 'assets/scss/_theme5.module.scss';
import theme6 from 'assets/scss/_theme6.module.scss';

// types
import { ColorProps } from 'types';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (navType: PaletteMode, presetColor: string) => {
  let colors: ColorProps;
  switch (presetColor) {
    case 'theme1':
      colors = theme;
      break;
    case 'theme2':
      colors = theme2;
      break;
    case 'theme3':
      colors = theme3;
      break;
    case 'theme4':
      colors = theme4;
      break;
    case 'theme5':
      colors = theme5;
      break;
    case 'theme6':
      colors = theme6;
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
        200: colors.primaryLight,
        800: colors.primaryDark,
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
        300: colors.grey300,
        500: colors.grey500,
        600: colors.grey600,
        700: colors.grey700,
        800: colors.grey800,
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
