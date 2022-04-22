export interface Degen {
  id: string;
  stats: Object;
  rental_count: number;
  is_active: boolean;
  last_rented_at: number;
  total_rented: number;
  price: number;
  price_daily: number;
  tribe: string;
  background: string;
  traits_string: string;
  multiplier: number;
  multipliers: {
    background: number;
  };
  name: string;
  owner: string;
}
