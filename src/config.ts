// types
import { ConfigProps } from '@/types/config';

export const JWT_API = {
  secret: 'SECRET-KEY',
  timeout: '1 days',
};

export const AUTH0_API = {
  client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
  domain: 'dev-w0-vxep3.us.auth0.com',
};

export const AWS_API = {
  poolId: 'us-east-1_AOfOTXLvD',
  appClientId: '3eau2osduslvb7vks3vsh9t7b0',
};

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = '';

export const DASHBOARD_PATH = '/';

const config: ConfigProps = {
  // fontFamily: `'Roboto', sans-serif`,
  borderRadius: 8,
  outlinedFilled: true,
  navType: 'dark', // light, dark
  presetColor: 'theme1', // default, theme1, theme2, theme3, theme4, theme5, theme6
  locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
  rtlLayout: false,
  container: false,
};

export default config;
