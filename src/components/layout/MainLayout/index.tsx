import React, { useContext, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useLocation, useNavigate } from 'react-router-dom';
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
  Icon,
  Typography,
  Button,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import BurnIcon from '@mui/icons-material/Whatshot';

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
import NetworkContext from 'contexts/NetworkContext';
import { capitalize } from 'utils/string';

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
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);
  const { container } = useConfig();

  const { address, targetNetwork, selectedChainId, switchToNetwork } =
    useContext(NetworkContext);

  React.useEffect(() => {
    dispatch(openDrawer(!matchDownMd));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  const header = useMemo(
    () => (
      <Toolbar sx={{ py: { xs: 1, lg: 2 } }}>
        <Header />
      </Toolbar>
    ),
    [],
  );
  const isNoFilterPage =
    location && /(all-degens|dashboard\/degens)/.test(location.pathname);

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
      case '/all-degens':
        return pageMeta.allDegens.title;
      case '/games':
        return pageMeta.games.title;
      case '/leaderboards':
        return pageMeta.leaderboards.title;
      case '/dashboard':
        return pageMeta.dashboard.title;
      case '/dashboard/degens':
        return pageMeta.dashboard.degens.title;
      case '/dashboard/items':
        return pageMeta.dashboard.items.title;
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
        {address &&
          targetNetwork?.name &&
          targetNetwork.chainId !== selectedChainId && (
            <Box
              sx={{
                display: 'flex',
                backgroundColor: theme.palette.error.light,
                width: '100%',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              height={50}
              zIndex={1}
            >
              <Icon sx={{ width: 24, height: 24 }}>
                <WarningIcon />
              </Icon>
              <Typography px={2} fontSize={20} fontWeight={600}>
                Please switch to {capitalize(targetNetwork.name)}
              </Typography>
              <Button
                sx={{ padding: '2px 16px' }}
                variant="contained"
                onClick={() => switchToNetwork(targetNetwork.chainId)}
              >
                Switch
              </Button>
            </Box>
          )}
        {address &&
          targetNetwork?.name &&
          targetNetwork.chainId === selectedChainId &&
          location.pathname === '/' && (
            <Box
              sx={{
                display: 'flex',
                backgroundColor: theme.palette.success.light,
                width: '100%',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
              }}
              height={40}
              zIndex={1}
            >
              <Icon sx={{ width: 24, height: 24 }}>
                <BurnIcon />
              </Icon>
              <Typography px={2} fontSize={20} fontWeight={600}>
                Comic Burner is now live!!
              </Typography>
              <Button
                sx={{ padding: '2px 16px' }}
                variant="contained"
                onClick={() => {
                  navigate('/dashboard/items/burner');
                }}
              >
                Check it out
              </Button>
            </Box>
          )}
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
              height: !matchUpMd
                ? 'calc(100vh - 120px)'
                : 'calc(100vh - 100px)',
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
