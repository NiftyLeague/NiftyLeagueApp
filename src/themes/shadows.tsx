import { alpha, Theme } from '@mui/material/styles';

const createCustomShadow = (theme: Theme, color: string) => {
  const transparent = alpha(color, 0.05);
  return {
    xSmall: `0px 1px 2px 0px ${transparent}`,
  };
};

export default function customShadows(navType: string, theme: Theme) {
  return createCustomShadow(theme, theme.palette.shades.main);
}
