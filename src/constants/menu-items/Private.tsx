// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const PrivateItems = {
  id: 'private-items',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'collapse',
      // icon: icons.IconDashboard,
      children: [
        {
          id: 'dashboard',
          title: 'Overview',
          type: 'item',
          url: '/dashboard',
        },
        {
          id: 'degens',
          // title: 'DEGENs',
          title: 'Rental Stats',
          type: 'item',
          url: '/dashboard/degens',
        },
        {
          id: 'comics',
          // title: 'Comics & Items',
          title: 'Gamer Profile',
          type: 'item',
          url: '/dashboard/comics',
        },
        {
          id: 'rentals',
          // title: 'Rentals',
          title: 'Inventory',
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
