import { memo, useContext } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';

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
  const { displayGamerProfile } = useFlags();
  let lastItems: any = getMenuItemsByLoginStatus(
    Boolean(web3Modal.cachedProvider),
  ).items;
  if (displayGamerProfile) {
    if (lastItems.length < 2) {
      return <></>;
    }

    let item = lastItems[1].children[0].children;
    if (lastItems[1] && !item.find((t) => t.id === 'gamer-profile')) {
      lastItems[1].children[0].children = [
        ...item,
        {
          id: 'gamer-profile',
          title: 'Gamer Profile',
          type: 'item',
          url: '/dashboard/gamer-profile',
        },
      ];
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
