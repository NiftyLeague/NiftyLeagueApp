// assets
import {
  IconDeviceGamepad,
  IconLayoutGrid,
  IconListNumbers,
  IconSquarePlus,
  IconTag,
  IconMoodCrazyHappy,
} from '@tabler/icons';

// constant
const icons = {
  IconDeviceGamepad,
  IconLayoutGrid,
  IconListNumbers,
  IconSquarePlus,
  IconTag,
  IconMoodCrazyHappy,
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
      id: 'mint-o-matic',
      title: 'Mint-O-Matic',
      type: 'item',
      url: '/mint-o-matic',
      icon: icons.IconSquarePlus,
      breadcrumbs: false,
    },
    {
      id: 'degens',
      title: 'All DEGENs',
      type: 'item',
      url: '/degens',
      icon: icons.IconMoodCrazyHappy,
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
