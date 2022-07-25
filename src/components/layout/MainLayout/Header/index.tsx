// react
import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Stack, Link } from '@mui/material';

// project imports
import ExternalIcon from 'components/ExternalIcon';
import LogoSection from '../LogoSection';

import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';

// assets
import { IconMenu2 } from '@tabler/icons';
import AddNFTL from './AddNFTLToMetamask';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const pages = [
  {
    name: 'Website',
    link: 'https://niftyleague.com/',
  },
  {
    name: 'Docs',
    link: 'https://niftyleague.com/docs',
  },
] as {
  name: string;
  link: string;
}[];

const Header = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        [theme.breakpoints.up('sm')]: {
          height: 60,
        },
        width: '100%',
      }}
    >
      {/* logo & toggler button */}
      <Box
        sx={{
          width: drawerOpen ? 228 : 80,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
        alignItems="center"
      >
        <Box
          component="span"
          sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            overflow: 'hidden',
            transition: 'all .2s ease-in-out',
            background:
              theme.palette.mode === 'dark'
                ? theme.palette.dark.main
                : theme.palette.secondary.light,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.secondary.main
                : theme.palette.secondary.dark,
            '&:hover': {
              background:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.main
                  : theme.palette.secondary.dark,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.light
                  : theme.palette.secondary.light,
            },
          }}
          onClick={() => dispatch(openDrawer(!drawerOpen))}
          color="inherit"
        >
          <IconMenu2 stroke={1.5} size="1.3rem" />
        </Avatar>
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'space-between',
          gap: 4,
          alignItems: 'center',
        }}
      >
        <AddNFTL />
        {pages.map((page) => (
          <Link
            key={page.name}
            href={page.link}
            target="_blank"
            color="inherit"
            underline="hover"
          >
            {page.name} <ExternalIcon />
          </Link>
        ))}
      </Box>
    </Stack>
  );
};

export default Header;
