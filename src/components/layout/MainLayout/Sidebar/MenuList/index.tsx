import { memo } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import {
  DefaultItems,
  LoggedInItems,
  LoggedOutItems,
} from 'constants/menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const getMenuItemsByLoginStatus = (loginStatus: boolean) => {
  if (loginStatus) {
    return { items: [...DefaultItems.items, ...LoggedInItems.items] };
  }

  return { items: [...DefaultItems.items, ...LoggedOutItems.items] };
};

const MenuList = () => {
  // TODO: replace with hook to get login status
  const navItems = getMenuItemsByLoginStatus(true).items.map((item) => {
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
