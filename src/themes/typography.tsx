import { Theme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

const Typography = (
  theme: Theme,
  borderRadius: number,
  fontFamily: string,
): TypographyOptions => ({
  fontFamily: `'Press Start 2P', cursive`,
  h1: {
    fontSize: '40px',
    lineHeight: '48px',
    letterSpacing: '-0.02em',
    [theme.breakpoints.down('md')]: {
      fontSize: '36px',
      lineHeight: '44px',
    },
  },
  h2: {
    fontSize: '36px',
    lineHeight: '44px',
    letterSpacing: '-0.02em',
    [theme.breakpoints.down('md')]: {
      fontSize: '32px',
      lineHeight: '40px',
    },
  },
  h3: {
    fontSize: '32px',
    lineHeight: '40px',
    letterSpacing: '-0.02em',
    [theme.breakpoints.down('md')]: {
      fontSize: '28px',
      lineHeight: '36px',
    },
  },
  h4: {
    fontSize: '28px',
    lineHeight: '36px',
    letterSpacing: '-0.02em',
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  h5: {
    fontSize: '24px',
    lineHeight: '32px',
    letterSpacing: '-0.02em',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
      lineHeight: '28px',
    },
  },
  h6: {
    fontSize: '20px',
    lineHeight: '28px',
    letterSpacing: '-0.02em',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.dark,
  },
  subtitle2: {
    fontSize: '0.75rem',
    fontWeight: 400,
    color: theme.palette.text.secondary,
  },
  caption: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    fontWeight: 400,
  },
  body1: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.334em',
  },
  body2: {
    letterSpacing: '0em',
    fontWeight: 400,
    lineHeight: '1.5em',
    color: theme.palette.text.primary,
  },
  button: {
    textTransform: 'capitalize',
  },
  customInput: {
    marginTop: 1,
    marginBottom: 1,
    '& > label': {
      top: 23,
      left: 0,
      color: theme.palette.grey[500],
      '&[data-shrink="false"]': {
        top: 5,
      },
    },
    '& > div > input': {
      padding: '30.5px 14px 11.5px !important',
    },
    '& legend': {
      display: 'none',
    },
    '& fieldset': {
      top: 0,
    },
  },
  mainContent: {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.dark[800]
        : theme.palette.primary.light,
    width: '100%',
    minHeight: 'calc(100vh - 88px)',
    flexGrow: 1,
    marginTop: '88px',
    borderRadius: `${borderRadius}px`,
  },
  menuCaption: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.grey[600],
    padding: '6px',
    textTransform: 'capitalize',
    marginTop: '10px',
  },
  subMenuCaption: {
    fontSize: '0.6875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    textTransform: 'capitalize',
  },
  commonAvatar: {
    cursor: 'pointer',
    borderRadius: '8px',
  },
  smallAvatar: {
    width: '22px',
    height: '22px',
    fontSize: '1rem',
  },
  mediumAvatar: {
    width: '34px',
    height: '34px',
    fontSize: '1.2rem',
  },
  largeAvatar: {
    width: '44px',
    height: '44px',
    fontSize: '1.5rem',
  },
  displayLarge: {
    fontSize: '52px',
    lineHeight: '56px',
    letterSpacing: '-0.02em',
  },
  displaySmall: {
    fontSize: '44px',
    lineHeight: '48px',
    letterSpacing: '-0.02em',
  },
  paragraphLarge: {
    fontSize: '18px',
    lineHeight: '28px',
    fontFamily: `'IBM Plex Mono', monospace`,
  },
  paragraphMedium: {
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: `'IBM Plex Mono', monospace`,
  },
  paragraphSmall: {
    fontSize: '14px',
    lineHeight: '20px',
    fontFamily: `'IBM Plex Mono', monospace`,
  },
  paragraphXSmall: {
    fontSize: '12px',
    lineHeight: '20px',
    fontFamily: `'IBM Plex Mono', monospace`,
  },
  paragraphXXSmall: {
    fontSize: '10px',
    lineHeight: '20px',
    fontFamily: `'IBM Plex Mono', monospace`,
  },
  paragraphXXXSmall: {
    fontSize: '8px',
    lineHeight: '20px',
    fontFamily: `'IBM Plex Mono', monospace`,
  },
  paragraphP2Large: {
    fontSize: '18px',
    lineHeight: '28px',
  },
  paragraphP2Medium: {
    fontSize: '16px',
    lineHeight: '24px',
  },
  paragraphP2Small: {
    fontSize: '14px',
    lineHeight: '20px',
  },
  paragraphP2XSmall: {
    fontSize: '12px',
    lineHeight: '20px',
  },
  paragraphP2XXSmall: {
    fontSize: '10px',
    lineHeight: '20px',
  },
  paragraphP2XXXSmall: {
    fontSize: '8px',
    lineHeight: '20px',
  },
});

export default Typography;
