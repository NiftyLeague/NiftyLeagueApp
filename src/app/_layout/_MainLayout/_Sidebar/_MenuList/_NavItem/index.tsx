import {
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
  useEffect,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';

// project imports
import useThemeConfig from '@/hooks/useThemeConfig';
import { useDispatch, useSelector } from '@/store';
import { activeItem, openDrawer } from '@/store/slices/menu';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// types
import type { LinkTarget, NavItemType } from '@/types';

interface NavItemProps {
  item: NavItemType;
  level: number;
}

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }: NavItemProps) => {
  const pathname = usePathname();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const { borderRadius } = useThemeConfig();
  const dispatch = useDispatch();
  const { openItem } = useSelector((state) => state.menu);

  const Icon = item?.icon!;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="20px" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: openItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: openItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget: LinkTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps: {
    component:
      | ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement>>
      | string;
    href?: string;
    target?: LinkTarget;
  } = {
    // eslint-disable-next-line react/display-name
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} href={item.url!} target={itemTarget} />
    )),
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id: string) => {
    dispatch(activeItem([id]));
    matchesSM && dispatch(openDrawer(false));
  };

  // active menu item when page load and route is changed
  useEffect(() => {
    if (pathname.toString().split('/').includes(item.id!)) {
      dispatch(activeItem([item.id!]));
    }
  }, [item.id, pathname, dispatch]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${borderRadius}px`,
        border: '1px solid transparent',
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: 'transparent !important',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
        '&:hover': {
          border: '1px solid',
          borderColor: theme.palette.secondary.main,
        },
      }}
      selected={openItem?.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id!)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={
              openItem?.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'
            }
            color="inherit"
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.subMenuCaption }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;
