import { lazy } from 'react';

// project imports
import MainLayout from 'components/layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// sample page routing
const NiftyLeagueAppPage = Loadable(
  lazy(() => import('pages/nifty-league-app')),
);
const DashboardOverviewPage = Loadable(lazy(() => import('pages/dashboard')));
const DashboardRentalPage = Loadable(
  lazy(() => import('pages/dashboard/rentals')),
);
const GamesPage = Loadable(lazy(() => import('pages/games')));
const DashboardComicsPage = Loadable(
  lazy(() => import('pages/dashboard/comics')),
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
      element: <NiftyLeagueAppPage />,
    },
    {
      path: '/games',
      element: <GamesPage />,
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
        {
          path: 'comics',
          element: <DashboardComicsPage />,
        },
      ],
    },
  ],
};

export default MainRoutes;
