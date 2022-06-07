import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

// project imports
import NavItem from '../NavItem';
import { NavGroupProps } from '../NavGroup';

// assets
import { IconChevronDown, IconChevronUp } from '@tabler/icons';

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

interface NavCollapseProps {
  menu: NavGroupProps['item'];
  level: number;
}

const NavCollapse = ({ menu, level }: NavCollapseProps) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null | undefined>(null);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const childrens = menu.children ? menu.children : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    childrens.forEach((item: any) => {
      if (pathname && pathname.includes('product-details')) {
        if (item.url && item.url.includes('product-details')) {
          setOpen(true);
        }
      }
      if (item.url === pathname) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children]);

  // menu collapse & item
  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <ListItemButton
        sx={{
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: `${(level - 1) * 12}px`,
          pr: '0',
          borderBottom: `1px solid ${theme.palette.grey[100]} !important`,
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        {/* <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>
          {menuIcon}
        </ListItemIcon> */}
        <ListItemText
          primary={
            <Typography variant="body1" color="inherit" sx={{ my: 'auto' }}>
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography
                variant="caption"
                sx={{ ...theme.typography.subMenuCaption }}
                display="block"
                gutterBottom
              >
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <IconChevronUp
            stroke={1.5}
            size="1rem"
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        ) : (
          <IconChevronDown
            stroke={1.5}
            size="1rem"
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {open && (
          <List component="div" disablePadding sx={{ position: 'relative' }}>
            {menus}
          </List>
        )}
      </Collapse>
    </>
  );
};

export default NavCollapse;
