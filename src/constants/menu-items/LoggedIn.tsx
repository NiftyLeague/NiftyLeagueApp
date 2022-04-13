// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
  IconBrandChrome,
  IconHelp,
  IconSitemap,
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const LoggedInItems = {
  id: 'logged-in',
  type: 'group',
  children: [
    {
      id: 'menu-level-subtitle',
      title: 'My Dashboard',
      type: 'collapse',
      icon: icons.IconHelp,
      children: [
        {
          id: 'mydashboard-submenu-1.1',
          title: 'Overview',
          type: 'item',
          url: '/overview',
        },
        {
          id: 'mydashboard-submenu-1.2',
          title: 'Degens',
          type: 'item',
          url: '/degens',
        },
        {
          id: 'mydashboard-submenu-1.3',
          title: 'Comics',
          type: 'item',
          url: '/comics',
        },
        {
          id: 'mydashboard-submenu-1.4',
          title: 'Rentals',
          type: 'item',
          url: '/rentals',
        },
      ],
    },
  ],
};

export default LoggedInItems;
