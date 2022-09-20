import { useRoutes } from 'react-router-dom';
import { useFlags } from 'launchdarkly-react-client-sdk';

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
  const { displayGamerProfile } = useFlags();
  if (displayGamerProfile === false) {
    privateRoutes = {
      ...PrivateRoutes,
      children: PrivateRoutes.children.filter(
        (child) => child.path !== 'gamer-profile',
      ),
    };
  }

  return useRoutes([PublicRoutes, privateRoutes, MaintenanceRoutes]);
}
