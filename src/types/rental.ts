export interface Rental {
  id?: string | number;
  renter?: string;
  degenId?: string;
  multiplier?: string;
  winLoss?: string;
  timePlayed?: string;
  totalEarnings?: string;
  yourEarnings?: string;
  costs?: string;
  profits?: string;
  roi: number;
  rentalRenewsIn: string;
}