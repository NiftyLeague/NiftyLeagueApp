// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SidebarTest = () => (
  <MainCard title="Sample Card">
    <Typography variant="body2">Sidebar only</Typography>
  </MainCard>
);

export default SidebarTest;
