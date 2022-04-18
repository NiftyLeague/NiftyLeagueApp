// assets
import { IconDeviceGamepad, IconTag, IconLayoutGrid } from '@tabler/icons';

// constant
const icons = {
  IconDeviceGamepad,
  IconTag,
  IconLayoutGrid,
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
      url: '/',
      icon: icons.IconLayoutGrid,
      breadcrumbs: false,
    },
    {
      id: 'outline-chip-menu',
      title: 'Degen Rentals',
      type: 'item',
      url: '/degen-rentals',
      icon: icons.IconTag,
      breadcrumbs: false,
    },
    {
      id: 'outline-chip-menu',
      title: 'Games',
      type: 'item',
      url: '/games',
      icon: icons.IconDeviceGamepad,
      breadcrumbs: false,
    },
  ],
};

export default DefaultItems;
