import { memo, useContext } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import { PublicItems, PrivateItems } from 'constants/menu-items';
import { NetworkContext } from 'NetworkProvider';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const getMenuItemsByLoginStatus = (loginStatus: boolean) => {
  if (loginStatus) {
    return { items: [...PublicItems.items, ...PrivateItems.items] };
  }

  return { items: [...PublicItems.items] };
};

const MenuList = () => {
  const { web3Modal } = useContext(NetworkContext);

  const navItems = getMenuItemsByLoginStatus(
    Boolean(web3Modal.cachedProvider),
  ).items.map((item) => {
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
