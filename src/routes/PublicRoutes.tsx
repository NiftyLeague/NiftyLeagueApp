// project imports
import MainLayout from 'components/layout/MainLayout';
import Loadable from 'components/Loadable';
import { lazy } from 'react';
import GuestGuard from 'utils/route-guard/GuestGuard';

// sample page routing
const NiftyLeagueAppPage = Loadable(
  lazy(() => import('pages/nifty-league-app')),
);
const GamesPage = Loadable(lazy(() => import('pages/games')));
const DegenRentalsPage = Loadable(lazy(() => import('pages/degen-rentals')));

// ==============================|| MAIN ROUTING ||============================== //

const PublicRoutes = {
  path: '/',
  element: (
    <GuestGuard>
      <MainLayout />
    </GuestGuard>
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
  ],
};

export default PublicRoutes;
