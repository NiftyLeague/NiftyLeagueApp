// project imports
import MainLayout from 'components/layout/MainLayout';
import MinimalLayout from 'components/layout/MinimalLayout';
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

const PlayOnGamePage = Loadable(lazy(() => import('pages/games/PlayOnGame')));

// ==============================|| MAIN ROUTING ||============================== //

export const PrivateDashBoardRoutes = {
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

export const PrivatePlayOnGameRoutes = {
  path: '/play-on-game',
  element: <MinimalLayout />,
  children: [
    {
      path: '',
      element: <PlayOnGamePage />,
    },
  ],
};
