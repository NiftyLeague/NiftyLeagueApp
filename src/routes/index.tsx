import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import MaintenanceRoutes from './MaintenanceRoutes';

// hooks
import useGoogleAnalytics from 'hooks/useGoogleAnalytics';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  useGoogleAnalytics();
  return useRoutes([
    MainRoutes,
    LoginRoutes,
    AuthenticationRoutes,
    MaintenanceRoutes,
  ]);
}
