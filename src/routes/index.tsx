import { useRoutes } from 'react-router-dom';

// routes
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import MaintenanceRoutes from './MaintenanceRoutes';

// hooks
import useGoogleAnalytics from 'hooks/useGoogleAnalytics';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  let privateRoutes = PrivateRoutes;
  useGoogleAnalytics();
  return useRoutes([PublicRoutes, privateRoutes, MaintenanceRoutes]);
}
