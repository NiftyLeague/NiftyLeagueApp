export interface Account {
  address: string;
  balance?: number;
  created_at: number;
  id: string;
  update_counter?: number;
  updated_at?: number;
}

export interface Profile {
  id: string;
  updated_at: number;
  stats: {
    nifty_smasher: {
      hits: number;
      kills: number;
      win: number;
      earnings: number;
      suicides: number;
      round_wins: number;
      xp: number;
      matchs: number;
      time_played: number;
      deaths: number;
      rounds: number;
    };
    total: {
      xp: number;
      rental_earnings: number;
      rental_royalty_earnings: number;
      earnings: number;
      matches: number;
      time_played: number;
    };
  };
}
