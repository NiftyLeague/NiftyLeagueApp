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
          id: 'items',
          title: 'Comics & Items',
          type: 'item',
          url: '/dashboard/items',
        },
        {
          id: 'hydra-claim',
          title: 'Hydra Claim',
          type: 'item',
          url: '/dashboard/hydra-claim',
        },
        // {
        //   id: 'rentals',
        //   title: 'Rentals',
        //   type: 'item',
        //   url: '/dashboard/rentals',
        // },
      ],
    },
  ],
};

export default PrivateItems;
