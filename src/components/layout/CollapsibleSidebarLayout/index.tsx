import { Drawer, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, ReactNode, SetStateAction, useCallback } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

interface Props {
  drawerWidth?: number;
  renderDrawer: () => ReactNode;
  renderMain: () => ReactNode;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<SetStateAction<boolean>>;
}

const CollapsibleSidebarLayout = ({
  drawerWidth = 320,
  renderDrawer,
  renderMain,
  isDrawerOpen,
  setIsDrawerOpen,
}: Props): JSX.Element => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownSm = useMediaQuery(theme.breakpoints.down('md'));
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  // toggle sidebar
  const handleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((prevState) => !prevState);
  }, [setIsDrawerOpen]);

  // close sidebar when widow size below 'md' breakpoint
  useEffect(() => {
    setIsDrawerOpen(!matchDownLG);
  }, [matchDownLG, setIsDrawerOpen]);

  return (
    <Stack direction="row" position="relative" alignItems="start">
      {/* Filter drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: isDrawerOpen ? 1100 : -1,
          ...(!matchDownLG && {
            position: 'fixed',
            // Follows how mainLayout sets the marginTop value
            top: theme.typography.mainContent.marginTop || 108,
          }),
          '& .MuiDrawer-paper': {
            height: matchDownLG ? '100%' : 'auto',
            backgroundColor: theme.palette.dark.main,
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'relative',
            border: 'none',
          },
        }}
        variant={matchDownLG ? 'temporary' : 'persistent'}
        anchor="left"
        open={isDrawerOpen}
        ModalProps={{ keepMounted: true }}
        onClose={handleDrawerOpen}
      >
        <PerfectScrollbar
          style={{
            height: matchDownLG ? '100vh' : 'calc(100vh - 88px)',
            padding: '16px',
          }}
        >
          {renderDrawer()}
        </PerfectScrollbar>
      </Drawer>

      {/* Main grid */}
      <Stack
        component="main"
        sx={{
          flexGrow: 1,
          paddingLeft: isDrawerOpen ? theme.spacing(3) : 0,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isDrawerOpen && {
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.shorter,
            }),
            marginLeft: `${drawerWidth}px`,
          }),
          [theme.breakpoints.down('lg')]: {
            paddingLeft: 0,
            marginLeft: 0,
          },
        }}
      >
        <PerfectScrollbar
          style={{
            padding: matchDownSm ? '10px 20px' : '20px 40px',
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
          }}
        >
          {renderMain()}
        </PerfectScrollbar>
      </Stack>
    </Stack>
  );
};

export default CollapsibleSidebarLayout;
