import { format } from 'date-fns';
import { Rentals } from 'types/rentals';

// eslint-disable-next-line import/prefer-default-export
export const transformRentals = (rows: Rentals[], userId: string) =>
  rows.map(
    ({
      id,
      renter_id,
      user_id,
      degen_id,
      degen: { multiplier },
      earning_cap,
      earning_cap_daily,
      stats: {
        total: {
          wins,
          matches,
          earnings,
          charges,
          time_played,
          earnings_owner,
          earnings_player,
          earnings_renter,
        },
      },
      next_charge_at,
      is_terminated,
      accounts,
    }) => {
      const isPlayer = userId === user_id;
      const isSponsor = userId === renter_id;

      let walletAddress: string | undefined = '';
      let yourEarnings = 0;
      if (isSponsor) {
        yourEarnings = earnings_renter;
        walletAddress = accounts?.renter?.name || accounts?.owner?.name;
      } else if (isPlayer) {
        yourEarnings = earnings_player;
        walletAddress = accounts?.player?.name;
      } else {
        yourEarnings = earnings_renter;
        walletAddress = accounts?.owner?.name;
      }

      return {
        id,
        renter: walletAddress || 'No address',
        degenId: degen_id,
        multiplier,
        winLoss:
          Number(wins) > 0 && Number(matches) > 0
            ? (Number(wins) / Number(matches)) * 100
            : 0,
        timePlayed: time_played
          ? format(new Date(time_played), 'HH:mm:ss')
          : '00:00:00',
        totalEarnings: earnings,
        yourEarnings: yourEarnings || 0,
        costs: charges,
        profits: earnings,
        roi:
          Number(earnings) > 0 && Number(charges) > 0
            ? (Number(earnings) / Number(charges)) * 100
            : 0,
        rentalRenewsIn: next_charge_at || 'N/A',
        action: is_terminated,
        weeklyRentalFee: earning_cap,
        dailyRentalFee: earning_cap_daily,
      };
    },
  );
