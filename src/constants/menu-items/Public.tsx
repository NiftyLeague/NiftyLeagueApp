// assets
import { IconDeviceGamepad, IconTag, IconLayoutGrid } from '@tabler/icons';

// constant
const icons = {
  IconDeviceGamepad,
  IconTag,
  IconLayoutGrid,
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const PublicItems = {
  id: 'public-items',
  type: 'group',
  children: [
    {
      id: 'nifty-league-app',
      title: 'Nifty League App',
      type: 'item',
      url: '/',
      icon: icons.IconLayoutGrid,
      breadcrumbs: false,
    },
    {
      id: 'degen-rentals',
      title: 'DEGEN Rentals',
      type: 'item',
      url: '/degen-rentals',
      icon: icons.IconTag,
      breadcrumbs: false,
    },
    {
      id: 'games',
      title: 'Games',
      type: 'item',
      url: '/games',
      icon: icons.IconDeviceGamepad,
      breadcrumbs: false,
    },
  ],
};

export default PublicItems;
