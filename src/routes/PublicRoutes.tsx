// project imports
import MainLayout from 'components/layout/MainLayout';
import Loadable from 'components/Loadable';
import DegenTraitsDetailsPage from 'pages/degen-traits-details';
import { lazy } from 'react';
import GuestGuard from 'utils/route-guard/GuestGuard';

// sample page routing
const NiftyLeagueAppPage = Loadable(
  lazy(() => import('pages/nifty-league-app')),
);
const LeaderboardPage = Loadable(lazy(() => import('pages/leaderboard')));
const GamesPage = Loadable(lazy(() => import('pages/games')));
const PlayOnGamePage = Loadable(
  lazy(() => import('pages/games/PlayOnGame/SmashersGame')),
);
const WenGamePage = Loadable(
  lazy(() => import('pages/games/PlayOnGame/WenGame')),
);
const DegenRentalsPage = Loadable(lazy(() => import('pages/degen-rentals')));
const GameVerification = Loadable(lazy(() => import('pages/GameVerification')));

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
      path: '/leaderboards',
      element: <LeaderboardPage />,
    },
    {
      path: '/degen-rentals',
      element: <DegenRentalsPage />,
    },
    {
      path: '/degens/:id',
      element: <DegenTraitsDetailsPage />,
    },
    {
      path: '/degen-rentals/:walletAddress',
      element: <DegenRentalsPage />,
    },
    {
      path: '/games',
      element: <GamesPage />,
    },
    {
      path: '/games/play-on-game',
      element: <PlayOnGamePage />,
    },
    {
      path: '/games/play-on-game/wen-game',
      element: <WenGamePage />,
    },
    {
      path: '/verification',
      element: <GameVerification />,
    },
  ],
};

export default PublicRoutes;
