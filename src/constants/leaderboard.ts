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

export const MtRugmanTables = [
  {
    key: 'burnings',
    display: 'NFTL BURNED',
    rows: [{ key: 'score', display: 'NFTL BURNED' }],
  },
];

export enum Game {
  NiftySmashers = 'NIFTY SMASHERS',
  WenGame = 'WEN GAME',
  MtRugman = 'MT. RUGMAN',
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
  { key: 'nftl_burner', display: Game.MtRugman, tables: MtRugmanTables },
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
