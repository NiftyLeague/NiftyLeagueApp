import { Drawer, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useState, useEffect, ReactNode, SetStateAction } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

interface State {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<SetStateAction<boolean>>;
}

interface Props {
  drawerWidth?: number;
  renderDrawer: (props: State) => ReactNode;
  renderMain: (props: State) => ReactNode;
}

const CollapsibleSidebarLayout = ({
  drawerWidth = 320,
  renderDrawer,
  renderMain,
}: Props): JSX.Element => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownSm = useMediaQuery(theme.breakpoints.down('md'));
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  // toggle sidebar
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const handleDrawerOpen = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  // close sidebar when widow size below 'md' breakpoint
  useEffect(() => {
    setIsDrawerOpen(!matchDownLG);
  }, [matchDownLG]);

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
          {renderDrawer && renderDrawer({ isDrawerOpen, setIsDrawerOpen })}
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
            padding: '20px',
            paddingRight: matchDownSm ? '30px' : '40px',
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
          }}
        >
          {renderMain && renderMain({ isDrawerOpen, setIsDrawerOpen })}
        </PerfectScrollbar>
      </Stack>
    </Stack>
  );
};

export default CollapsibleSidebarLayout;
