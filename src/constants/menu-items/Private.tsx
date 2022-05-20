// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = {
  IconDashboard,
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const PrivateItems = {
  id: 'private-items',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'My Dashboard',
      type: 'collapse',
      icon: icons.IconDashboard,
      children: [
        {
          id: 'dashboard',
          title: 'Overview',
          type: 'item',
          url: '/dashboard',
        },
        {
          id: 'degens',
          title: 'DEGENs',
          type: 'item',
          url: '/dashboard/degens',
        },
        {
          id: 'comics',
          title: 'Comics & Items',
          type: 'item',
          url: '/dashboard/comics',
        },
        {
          id: 'rentals',
          title: 'Rentals',
          type: 'item',
          url: '/dashboard/rentals',
        },
        // {
        //   id: 'gamer-profile',
        //   title: 'Gamer Profile',
        //   type: 'item',
        //   url: '/dashboard/gamer-profile',
        // },
      ],
    },
  ],
};

export default PrivateItems;
