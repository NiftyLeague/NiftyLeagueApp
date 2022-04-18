import { Drawer, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useState, useEffect, ReactNode, SetStateAction } from 'react';

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
          zIndex: { xs: 1100, lg: 0 },
          ...(!matchDownLG && {
            position: 'sticky',
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
        {renderDrawer && renderDrawer({ isDrawerOpen, setIsDrawerOpen })}
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
          marginLeft: `-${drawerWidth}px`,
          [theme.breakpoints.down('lg')]: {
            paddingLeft: 0,
            marginLeft: 0,
          },
          ...(isDrawerOpen && {
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.shorter,
            }),
            marginLeft: 0,
          }),
        }}
      >
        {renderMain && renderMain({ isDrawerOpen, setIsDrawerOpen })}
      </Stack>
    </Stack>
  );
};

export default CollapsibleSidebarLayout;
