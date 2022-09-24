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
      id: false ? 'games' : '',
      title: 'Games',
      type: 'item',
      url: false ? '/games' : '/',
      icon: icons.IconDeviceGamepad,
      breadcrumbs: false,
    },
    /*
    {
      id: '',
      title: 'Nifty League App',
      type: 'item',
      url: '/',
      icon: icons.IconLayoutGrid,
      breadcrumbs: false,
    },
*/
    {
      id: 'all-degens',
      title: 'All DEGENs',
      type: 'item',
      url: '/all-degens',
      icon: icons.IconTag,
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
