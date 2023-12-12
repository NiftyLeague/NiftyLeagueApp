import { memo } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './_NavGroup';
import { PublicItems, PrivateItems } from '@/constants/menu-items';
import useAuth from '@/hooks/useAuth';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const getMenuItemsByLoginStatus = (loginStatus: boolean) => {
  if (loginStatus) {
    return { items: [...PublicItems.items, ...PrivateItems.items] };
  }

  return { items: [...PublicItems.items] };
};

const MenuList = () => {
  const { isLoggedIn } = useAuth();
  let lastItems: any = getMenuItemsByLoginStatus(isLoggedIn).items;
  if (lastItems.length > 1) {
    let item = lastItems[1].children[0].children;
    if (lastItems[1] && !item.find((t) => t.id === 'gamer-profile')) {
      lastItems[1].children[0].children.splice(1, 0, {
        id: 'gamer-profile',
        title: 'Gamer Profile',
        type: 'item',
        url: '/dashboard/gamer-profile',
      });
    }
  }

  const navItems = lastItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default memo(MenuList);
