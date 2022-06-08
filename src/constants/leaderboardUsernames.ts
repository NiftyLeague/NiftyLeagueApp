export const LEADERBOARD_USERNAMES_API_URL =
  'https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/profiles/profiles';
export const tables = [
  {
    key: 'win_rate',
    display: 'WIN RATE',
    rows: [
      { key: 'win_rate', display: 'WIN RATE' },
      { key: 'matches', display: 'MATCHES PLAYED' },
    ],
  },
  {
    key: 'xp',
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