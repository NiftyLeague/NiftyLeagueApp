import { useRoutes } from 'react-router-dom';
import { useFlags } from 'launchdarkly-react-client-sdk';
import Loadable from 'components/Loadable';
import { lazy } from 'react';

// routes
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import MaintenanceRoutes from './MaintenanceRoutes';

// hooks
import useGoogleAnalytics from 'hooks/useGoogleAnalytics';

// ==============================|| ROUTING RENDER ||============================== //

const DashboardGamerProfilePage = Loadable(
  lazy(() => import('pages/dashboard/gamer-profile')),
);

export default function ThemeRoutes() {
  let privateRoutes = PrivateRoutes;
  useGoogleAnalytics();
  const { displayGamerProfile } = useFlags();

  if (displayGamerProfile) {
    privateRoutes = {
      ...PrivateRoutes,
      children: [
        ...PrivateRoutes.children,
        {
          path: 'gamer-profile',
          element: <DashboardGamerProfilePage />,
        },
      ],
    };
  }

  return useRoutes([PublicRoutes, privateRoutes, MaintenanceRoutes]);
}
