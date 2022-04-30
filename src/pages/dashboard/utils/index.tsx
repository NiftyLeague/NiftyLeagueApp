import { format } from 'date-fns';
import { Rentals } from 'types/rentals';

// eslint-disable-next-line import/prefer-default-export
export const transformRentals = (rows: Rentals[]) =>
  rows.map(
    ({
      id,
      renter_id,
      degen_id,
      degen: { multiplier },
      earning_cap,
      earning_cap_daily,
      stats: { matches_won, matches_total, earnings, charges, time_played },
      next_charge_at,
      is_terminated,
    }) => ({
      id,
      renter: renter_id,
      degenId: degen_id,
      multiplier,
      winLoss:
        matches_won > 0 && matches_total > 0
          ? Number(matches_won) / Number(matches_total)
          : 0,
      timePlayed: time_played
        ? format(new Date(time_played), 'HH:mm:ss')
        : 'N/A',
      totalEarnings: earning_cap,
      yourEarnings: earning_cap_daily,
      costs: charges,
      profits: earnings,
      roi: earnings > 0 && charges > 0 ? Number(earnings) / Number(charges) : 0,
      rentalRenewsIn: next_charge_at
        ? format(new Date(next_charge_at - Date.now()), 'HH:mm:ss')
        : 'N/A',
      action: is_terminated,
    }),
  );
