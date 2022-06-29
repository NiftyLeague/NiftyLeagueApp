// assets
import {
  IconDeviceGamepad,
  IconTag,
  IconLayoutGrid,
  IconListNumbers,
} from '@tabler/icons';

// constant
const icons = {
  IconDeviceGamepad,
  IconTag,
  IconLayoutGrid,
  IconListNumbers,
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const PublicItems = {
  id: 'public-items',
  type: 'group',
  children: [
    {
      id: 'games',
      title: 'Games',
      type: 'item',
      url: '/games',
      // icon: icons.IconDeviceGamepad,
      breadcrumbs: false,
    },
    {
      id: '',
      // title: 'Nifty League App',
      title: 'Rentals',
      type: 'item',
      url: '/',
      // icon: icons.IconLayoutGrid,
      breadcrumbs: false,
    },
    {
      id: 'degen-rentals',
      // title: 'DEGEN Rentals',
      title: 'Degen Rentals',
      type: 'item',
      url: '/degen-rentals',
      // icon: icons.IconTag,
      breadcrumbs: false,
    },
    {
      id: 'leaderboards',
      title: 'Leaderboards',
      type: 'item',
      url: '/leaderboards',
      icon: icons.IconListNumbers,
      breadcrumbs: false,
    },
  ],
};

export default PublicItems;
