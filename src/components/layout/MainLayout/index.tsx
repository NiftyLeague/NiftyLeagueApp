import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from '@mui/material';

// project imports
import Breadcrumbs from 'components/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import navigation from 'constants/menu-items';
import useConfig from 'hooks/useConfig';
import { drawerWidth } from 'store/constant';
import { openDrawer } from 'store/slices/menu';
import { useDispatch, useSelector } from 'store';

// assets
import { IconChevronRight } from '@tabler/icons';
import { pageMeta } from 'constants/page-meta';

interface MainStyleProps {
  theme: Theme;
  open: boolean;
}

// styles
const Main = styled<any>('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: MainStyleProps) => ({
  ...theme.typography.mainContent,
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
    marginTop: '80px',
    [theme.breakpoints.up('md')]: {
      marginLeft: -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '60px',
      marginLeft: '10px',
      width: `calc(100% - ${drawerWidth}px)`,
    },
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter,
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${drawerWidth}px)`,
    marginTop: '80px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '60px',
      marginLeft: '10px',
    },
  }),
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownSm = useMediaQuery(theme.breakpoints.down('md'));
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);
  const { container } = useConfig();

  React.useEffect(() => {
    dispatch(openDrawer(!matchDownMd));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  const header = useMemo(
    () => (
      <Toolbar>
        <Header />
      </Toolbar>
    ),
    [],
  );
  const isNoFilterPage =
    location && /(degen-rentals|dashboard\/degens)/.test(location.pathname);

  const getContent = () => {
    if (container) {
      return (
        <Container maxWidth="lg">
          <Breadcrumbs
            separator={IconChevronRight}
            navigation={navigation}
            icon
            title
            rightAlign
          />
          <Outlet />
        </Container>
      );
    }
    return (
      <>
        <Breadcrumbs
          separator={IconChevronRight}
          navigation={navigation}
          icon
          title
          rightAlign
        />
        <Outlet />
      </>
    );
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return pageMeta.main.title;
      case '/degen-rentals':
        return pageMeta.degenRentals.title;
      case '/games':
        return pageMeta.games.title;
      case '/leaderboards':
        return pageMeta.leaderboards.title;
      case '/dashboard':
        return pageMeta.dashboard.title;
      case '/dashboard/degens':
        return pageMeta.dashboard.degens.title;
      case '/dashboard/comics':
        return pageMeta.dashboard.comics.title;
      case '/dashboard/rentals':
        return pageMeta.dashboard.rentals.title;
      default:
        return pageMeta.main.title;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Helmet>
        <title>{getPageTitle()}</title>
      </Helmet>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: drawerOpen ? theme.transitions.create('width') : 'none',
        }}
      >
        {header}
      </AppBar>

      {/* drawer */}
      <Sidebar />

      {/* main content */}
      <Main theme={theme} open={drawerOpen}>
        {!isNoFilterPage ? (
          <PerfectScrollbar
            style={{
              padding: matchDownSm ? '10px 20px' : '20px 40px',
              height: !matchUpMd ? 'calc(100vh - 120px)' : 'calc(100vh - 88px)',
            }}
          >
            {getContent()}
          </PerfectScrollbar>
        ) : (
          getContent()
        )}
      </Main>
    </Box>
  );
};

export default MainLayout;
