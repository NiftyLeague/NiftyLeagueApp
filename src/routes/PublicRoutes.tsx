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
const SmashersGamePage = Loadable(
  lazy(() => import('pages/games/PlayOnGame/SmashersGame')),
);
const WenGamePage = Loadable(
  lazy(() => import('pages/games/PlayOnGame/WenGame')),
);
const MtGawxGamePage = Loadable(
  lazy(() => import('pages/games/PlayOnGame/MtGawxGame')),
);
const CryptoWinterGamePage = Loadable(
  lazy(() => import('pages/games/PlayOnGame/CryptoWinterGame')),
);
const AllRentalsPage = Loadable(lazy(() => import('pages/all-degens')));
const GameVerification = Loadable(lazy(() => import('pages/GameVerification')));
const Mint = Loadable(lazy(() => import('pages/mint')));

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
      path: false ? '/games' : '/',
      element: <GamesPage />,
    },
    /*    
    {
      path: '/',
      element: <NiftyLeagueAppPage />,
    },
*/
    {
      path: '/leaderboards',
      element: <LeaderboardPage />,
    },
    {
      path: '/all-degens',
      element: <AllRentalsPage />,
    },
    {
      path: '/degens/:id',
      element: <DegenTraitsDetailsPage />,
    },
    {
      path: '/all-degens/:walletAddress',
      element: <AllRentalsPage />,
    },
    {
      path: '/games/smashers',
      element: <SmashersGamePage />,
    },
    {
      path: '/games/wen-game',
      element: <WenGamePage />,
    },
    {
      path: '/games/mt-gawx',
      element: <MtGawxGamePage />,
    },
    {
      path: '/games/crypto-winter',
      element: <CryptoWinterGamePage />,
    },
    {
      path: '/verification',
      element: <GameVerification />,
    },
    {
      path: '/mint-o-matic',
      element: <Mint />,
    },
  ],
};

export default PublicRoutes;
