'use client';

// third party
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi';

// Redux
import { Provider as ReduxProvider } from 'react-redux';
import { openDrawer } from '@/store/slices/menu';
import { store, persister } from '@/store';
import { useDispatch, useSelector } from '@/store';

// material-ui
import { IconChevronRight } from '@tabler/icons-react';
import { styled, useTheme, Theme } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Icon,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';

// app context
import { AuthTokenProvider } from '@/contexts/AuthTokenContext';
import { BalanceProvider } from '@/contexts/BalanceContext';
import { FeatureFlagProvider } from '@/contexts/FeatureFlagsContext';
import { LocalStorageProvider } from '@/contexts/LocalStorageContext';
import { NetworkProvider } from '@/contexts/NetworkContext';
import { ThemeConfigProvider } from '@/contexts/ThemeConfigContext';
import { Web3ModalProvider } from '@/contexts/Web3Modal';

// project imports
import { capitalize } from '@/utils/string';
import { drawerWidth } from '@/themes/constant';
import { SUBGRAPH_URI } from '@/constants';
import navigation from '@/constants/menu-items';
import ThemeCustomization from '@/themes';
import useThemeConfig from '@/hooks/useThemeConfig';
import useGoogleAnalytics from '@/hooks/useGoogleAnalytics';
import { TARGET_NETWORK } from '@/constants/networks';

// components
import Breadcrumbs from '@/components/extended/Breadcrumbs';
import Locales from '@/components/wrapper/Locales';
import Snackbar from '@/components/extended/Snackbar';
import Header from './_Header';
import Sidebar from './_Sidebar';

const client = new ApolloClient({
  uri: SUBGRAPH_URI,
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient();

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

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  useGoogleAnalytics();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();

  const theme = useTheme();
  const { container } = useThemeConfig();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownSm = useMediaQuery(theme.breakpoints.down('md'));
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const { drawerOpen } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(openDrawer(!matchDownMd));
  }, [matchDownMd, dispatch]);

  const header = useMemo(
    () => (
      <Toolbar sx={{ py: { xs: 1, lg: 2 } }}>
        <Header />
      </Toolbar>
    ),
    [],
  );
  const isNoFilterPage =
    pathname && /(degens|dashboard\/degens)/.test(pathname);

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
          {children}
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
        {children}
      </>
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
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
            TARGET_NETWORK?.name &&
            TARGET_NETWORK.chainId !== chain?.id && (
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
                  Please switch to {capitalize(TARGET_NETWORK.name)}
                </Typography>
                <Button
                  sx={{ padding: '2px 16px' }}
                  variant="contained"
                  onClick={() => switchNetwork?.(TARGET_NETWORK.chainId)}
                >
                  Switch
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
      <Snackbar />
    </>
  );
};

const MainLayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <LocalStorageProvider>
          <Web3ModalProvider>
            <NetworkProvider>
              <ThemeConfigProvider>
                <ThemeCustomization>
                  <Locales>
                    <PersistGate loading={null} persistor={persister}>
                      <AuthTokenProvider>
                        <BalanceProvider>
                          <FeatureFlagProvider>
                            <MainLayout>{children}</MainLayout>
                          </FeatureFlagProvider>
                        </BalanceProvider>
                      </AuthTokenProvider>
                    </PersistGate>
                  </Locales>
                </ThemeCustomization>
              </ThemeConfigProvider>
            </NetworkProvider>
          </Web3ModalProvider>
        </LocalStorageProvider>
      </ReduxProvider>
    </QueryClientProvider>
  </ApolloProvider>
);

export default MainLayoutWrapper;
