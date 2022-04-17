// project imports
import MainLayout from 'components/layout/MainLayout';
import Loadable from 'components/Loadable';
import { lazy } from 'react';
import AuthGuard from 'utils/route-guard/AuthGuard';

// sample page routing
const NiftyLeagueAppPage = Loadable(
  lazy(() => import('pages/nifty-league-app')),
);
const DashboardOverviewPage = Loadable(
  lazy(() => import('pages/dashboard/overview')),
);
const DashboardRentalPage = Loadable(
  lazy(() => import('pages/dashboard/rentals')),
);
const GamesPage = Loadable(lazy(() => import('pages/games')));
const DegenRentalsPage = Loadable(lazy(() => import('pages/degen-rentals')));
const DashboardComicsPage = Loadable(
  lazy(() => import('pages/dashboard/comics')),
);
const DashboardDegensPage = Loadable(
  lazy(() => import('pages/dashboard/degens')),
);
const SidebarTest = Loadable(lazy(() => import('pages/sidebar-test')));

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
      path: '/degen-rentals',
      element: <DegenRentalsPage />,
    },
    {
      path: '/games',
      element: <GamesPage />,
    },
    {
      path: '/sidebar-test',
      element: <SidebarTest />,
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
        {
          path: 'degens',
          element: <DashboardDegensPage />,
        },
      ],
    },
  ],
};

export default MainRoutes;
