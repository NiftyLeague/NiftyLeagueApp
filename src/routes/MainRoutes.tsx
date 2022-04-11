import { lazy } from 'react';

// project imports
import MainLayout from 'components/layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// sample page routing
const SamplePage = Loadable(lazy(() => import('pages/sample-page')));
const DashboardOverviewPage = Loadable(lazy(() => import('pages/dashboard')));
const DashboardRentalPage = Loadable(
  lazy(() => import('pages/dashboard/rentals')),
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <SamplePage />,
    },
    {
      path: '/sample-page',
      element: <SamplePage />,
    },
    {
      path: '/dashboard',
      children: [
        {
          path: '',
          element: <DashboardOverviewPage />,
        },
        {
          path: 'rentals',
          element: <DashboardRentalPage />,
        },
      ],
    },
  ],
};

export default MainRoutes;
