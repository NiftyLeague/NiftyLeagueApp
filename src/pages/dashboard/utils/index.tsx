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
      stats: {
        total: { wins, matches, earnings, charges, time_played },
      },
      next_charge_at,
      is_terminated,
      name,
    }) => ({
      id,
      renter: name || `Rental #${degen_id}`,
      degenId: degen_id,
      multiplier,
      winLoss:
        Number(wins) > 0 && Number(matches) > 0
          ? Number(wins) / Number(matches)
          : 0,
      timePlayed: time_played
        ? format(new Date(time_played), 'HH:mm:ss')
        : 'N/A',
      totalEarnings: earning_cap,
      yourEarnings: earning_cap_daily,
      costs: charges,
      profits: earnings,
      roi:
        Number(earnings) > 0 && Number(charges) > 0
          ? (Number(earnings) / Number(charges)) * 100
          : 0,
      rentalRenewsIn: next_charge_at
        ? format(new Date(next_charge_at - Date.now()), 'HH:mm:ss')
        : 'N/A',
      action: is_terminated,
    }),
  );
