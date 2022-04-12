// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  IconBrandChrome,
  IconHelp,
  IconSitemap,
  IconDashboard,
} from '@tabler/icons';

// constant
const icons = {
  IconBrandChrome,
  IconHelp,
  IconSitemap,
  IconDashboard,
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'main-menu',
  type: 'group',
  children: [
    {
      id: 'nifty-league-app',
      title: <FormattedMessage id="nifty-league-app" />,
      type: 'item',
      url: '/',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: 'documentation',
      title: <FormattedMessage id="documentation" />,
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true,
    },
    {
      id: 'roadmap',
      title: <FormattedMessage id="roadmap" />,
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/roadmap',
      icon: icons.IconSitemap,
      external: true,
      target: true,
    },
  ],
};

export default other;
