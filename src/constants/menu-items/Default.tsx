// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
  IconBrandChrome,
  IconHelp,
  IconSitemap,
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const DefaultItems = {
  id: 'default',
  type: 'group',
  children: [
    {
      id: 'avatar-chip-menu',
      title: 'Nifty League App',
      type: 'item',
      url: '#',
      icon: icons.IconHelp,
    },
    {
      id: 'outline-chip-menu',
      title: 'Degen Rentals',
      type: 'item',
      url: '#',
      icon: icons.IconHelp,
    },
    {
      id: 'outline-chip-menu',
      title: 'Games',
      type: 'item',
      url: '#',
      icon: icons.IconHelp,
    },
  ],
};

export default DefaultItems;
