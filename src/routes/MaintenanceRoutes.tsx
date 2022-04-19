// project imports
import Loadable from 'components/Loadable';
import { lazy } from 'react';

// sample page routing
const NotFoundPage = Loadable(lazy(() => import('pages/errors/404')));

// ==============================|| MAIN ROUTING ||============================== //

const MaintenanceRoutes = {
  path: '*',
  element: <NotFoundPage />,
};

export default MaintenanceRoutes;
