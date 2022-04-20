// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = {
  IconDashboard,
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const LoggedInItems = {
  id: 'logged-in',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'My Dashboard',
      type: 'collapse',
      icon: icons.IconDashboard,
      children: [
        {
          id: 'dashboard-overview',
          title: 'Overview',
          type: 'item',
          url: '/dashboard',
        },
        {
          id: 'dashboard-degens',
          title: 'Degens',
          type: 'item',
          url: '/dashboard/degens',
        },
        {
          id: 'dashboard-comics',
          title: 'Comics',
          type: 'item',
          url: '/dashboard/comics',
        },
        {
          id: 'dashboard-rentals',
          title: 'Rentals',
          type: 'item',
          url: '/dashboard/rentals',
        },
      ],
    },
  ],
};

export default LoggedInItems;
