import { GOOGLE_ANALYTICS } from './google-analytics';

export const NiftySmashersTables = [
  {
    key: 'win_rate',
    display: 'WIN RATE',
    rows: [
      { key: 'win_rate', display: 'WIN RATE' },
      { key: 'matches', display: 'MATCHES PLAYED' },
    ],
  },
  {
    key: 'earnings',
    display: 'TOP EARNERS',
    rows: [
      { key: 'earnings', display: 'TOTAL NFTL EARNED' },
      { key: 'matches', display: 'MATCHES PLAYED' },
      { key: 'avg_NFTL/match', display: 'AVG, NFTL/MATCH' },
      { key: 'kills', display: 'KILLS' },
    ],
  },
  {
    key: 'kills',
    display: 'TOP KILLS',
    rows: [
      { key: 'matches', display: 'MATCHES PLAYED' },
      { key: 'kills', display: 'KILLS' },
    ],
  },
];

export const WenGameTables = [
  {
    key: 'score',
    display: 'HIGH SCORE',
    rows: [{ key: 'score', display: 'HIGH SCORE' }],
  },
];

export const MtGawxTables = [
  {
    key: 'burnings',
    display: 'NFTL BURNED',
    rows: [{ key: 'score', display: 'NFTL BURNED' }],
  },
];

export enum Game {
  NiftySmashers = 'NIFTY SMASHERS',
  WenGame = 'WEN GAME',
  MtGawx = 'MT. GAWX',
}

export enum TimeFilter {
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  AllTime = 'All Time',
}

export const LEADERBOARD_GAME_LIST = [
  {
    key: 'nifty_smashers',
    display: Game.NiftySmashers,
    tables: NiftySmashersTables,
  },
  { key: 'wen_game', display: Game.WenGame, tables: WenGameTables },
  { key: 'nftl_burner', display: Game.MtGawx, tables: MtGawxTables },
];

export const LEADERBOARD_TIME_FILTERS = [
  {
    key: 'weekly',
    display: TimeFilter.Weekly,
  },
  {
    key: 'monthly',
    display: TimeFilter.Monthly,
  },
  {
    key: 'all_time',
    display: TimeFilter.AllTime,
  },
];

export const getGameLeaderboardViewedAnalyticsEventName = (
  selectedGame: string,
) => {
  let eventName = '';
  switch (selectedGame) {
    case 'nifty_smashers':
      eventName = GOOGLE_ANALYTICS.EVENTS.NIFTY_SMASHERS_LEADERBOARD_VIEWED;
      break;
    case 'wen_game':
      eventName = GOOGLE_ANALYTICS.EVENTS.WEN_GAME_LEADERBOARD_VIEWED;
      break;
    case 'nftl_burner':
      eventName = GOOGLE_ANALYTICS.EVENTS.MT_GAWX_LEADERBOARD_VIEWED;
      break;
    default:
      break;
  }
  return eventName;
};

export const getLeaderboardRankAnalyticsEventName = (selectedGame: string) => {
  let eventName = '';
  switch (selectedGame) {
    case 'nifty_smashers':
      eventName =
        GOOGLE_ANALYTICS.EVENTS.LEADERBOARD_CHECK_YOUR_RANK_CLICKED_SMASHERS;
      break;
    case 'wen_game':
      eventName =
        GOOGLE_ANALYTICS.EVENTS.LEADERBOARD_CHECK_YOUR_RANK_CLICKED_WEN;
      break;
    case 'nftl_burner':
      eventName =
        GOOGLE_ANALYTICS.EVENTS.LEADERBOARD_CHECK_YOUR_RANK_CLICKED_MT_GAWX;
      break;
    default:
      break;
  }
  return eventName;
};
