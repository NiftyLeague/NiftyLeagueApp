export interface Rentals {
  stats: {
    charges: number;
    earnings: number;
    matches_total: number;
    time_played: number;
    matches_won: number;
  };
  next_charge_at: number;
  created_at: number;
  last_charge_at: number;
  entry_price: number;
  earning_cap: number;
  degen: {
    id: string;
    traits: string;
    background: string;
    tribe: string;
    multiplier: number;
  };
  renter_id: string;
  user_id: string;
  is_daily: boolean;
  is_terminated: boolean;
  earning_cap_daily: number;
  charge_txs: string[];
  degen_id: string;
  entry_position: number;
  is_active: boolean;
  id: string;
  shares: {
    owner: number;
    player: number;
  };
}