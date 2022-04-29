import { useRoutes } from 'react-router-dom';

// routes
import {
  PrivateDashBoardRoutes,
  PrivatePlayOnGameRoutes,
} from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import MaintenanceRoutes from './MaintenanceRoutes';

// hooks
import useGoogleAnalytics from 'hooks/useGoogleAnalytics';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  useGoogleAnalytics();
  return useRoutes([
    PublicRoutes,
    PrivateDashBoardRoutes,
    PrivatePlayOnGameRoutes,
    MaintenanceRoutes,
  ]);
}
