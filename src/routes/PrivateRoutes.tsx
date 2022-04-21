// project imports
import MainLayout from 'components/layout/MainLayout';
import Loadable from 'components/Loadable';
import { lazy } from 'react';
import AuthGuard from 'utils/route-guard/AuthGuard';

// sample page routing
const DashboardOverviewPage = Loadable(
  lazy(() => import('pages/dashboard/overview')),
);
const DashboardRentalPage = Loadable(
  lazy(() => import('pages/dashboard/rentals')),
);
const DashboardComicsPage = Loadable(
  lazy(() => import('pages/dashboard/comics')),
);
const DashboardDegensPage = Loadable(
  lazy(() => import('pages/dashboard/degens')),
);

// ==============================|| MAIN ROUTING ||============================== //

const PrivateRoutes = {
  path: '/dashboard',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '',
      element: <DashboardOverviewPage />,
    },
    {
      path: 'rentals',
      element: <DashboardRentalPage />,
    },
    {
      path: 'comics',
      element: <DashboardComicsPage />,
    },
    {
      path: 'degens',
      element: <DashboardDegensPage />,
    },
  ],
};

export default PrivateRoutes;