import { format } from 'date-fns';
import { Rentals, RentalType } from 'types/rentals';
import { areEqualArrays } from 'utils/array';
import { capitalize } from 'utils/string';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line import/prefer-default-export
export const transformRentals = (
  rows: Rentals[],
  userId: string,
  filterCategory?: RentalType,
) =>
  rows.map(
    ({
      id,
      renter_id,
      user_id,
      degen_id,
      name,
      degen: { multiplier, tribe, background },
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
      entry_price,
      daily_price,
      is_daily,
      shares,
      item_used,
    }) => {
      const amIRenter = userId === renter_id;
      const amIOwner = userId === accounts.owner.id;
      const amIPlayer = userId === accounts.player.id;
      const whoAmI = [amIRenter, amIOwner, amIPlayer];

      const isRecruit = areEqualArrays(whoAmI, [false, false, true]); // Recruited
      const isPersonal = areEqualArrays(whoAmI, [true, false, true]); // Direct Rental
      const isOwnedSponsor = areEqualArrays(whoAmI, [true, true, false]);
      const isNonOwnedSponsor = areEqualArrays(whoAmI, [true, false, false]);
      const isDirectRenter = areEqualArrays(whoAmI, [false, true, false]); // Direct Renter

      let yourEarnings = 0;
      let rentalFeeEarning = 0;
      let netEarning = 0;
      let netGameEarning = 0;
      let category: string = 'direct-renter';
      let rentalCategory: string = 'Direct Renter';
      let player: string = 'Myself';
      let roi = 0;
      let isEditable = false;
      let weeklyFee = entry_price;
      let dailyFee = is_daily ? daily_price : 0;

      let netEarningCharge = 0;
      const shareRenter = shares?.renter || 0;

      if (charges && charges === entry_price) {
        if (!isPersonal || !isRecruit || !isNonOwnedSponsor) {
          rentalFeeEarning = entry_price * 0.45;
        }

        netEarningCharge = entry_price * 0.45;
      } else {
        if (!isPersonal || !isRecruit || !isNonOwnedSponsor) {
          rentalFeeEarning = entry_price * 0.45 + (charges - entry_price) * 0.1;
        }

        netEarningCharge = entry_price * 0.45 + (charges - entry_price) * 0.1;
      }

      if (isPersonal) {
        category = 'direct-rental';
        rentalCategory = 'Direct Rental';
        player = 'Myself';
        netEarning = earnings * (shares.player + shares.owner) - charges;
        netGameEarning = earnings * (shares.owner + shareRenter);
        roi =
          ((earnings * (shares.player + shareRenter) - charges) / charges) *
          100;
        isEditable = false;
      } else if (isOwnedSponsor) {
        category = 'owned-sponsorship';
        rentalCategory = 'Owned Sponsorship';
        player = 'Recruit';
        netEarning =
          earnings * (shares.owner + shareRenter) + netEarningCharge - charges;
        netGameEarning = earnings * (shares.owner + shareRenter);
        roi =
          ((earnings * (shares.owner + shareRenter) - charges) / charges) * 100;
        isEditable = true;
      } else if (isNonOwnedSponsor) {
        category = 'non-owned-sponsorship';
        rentalCategory = 'Non-Owned Sponsorship';
        player = 'Recruit';
        netEarning = earnings * shareRenter - charges;
        netGameEarning = earnings * shareRenter;
        roi = ((earnings * shareRenter - charges) / charges) * 100;
        isEditable = true;
      } else if (isRecruit) {
        category = 'recruited';
        rentalCategory = 'Recruited';
        player = 'Myself';
        netEarning = earnings * shares.player;
        netGameEarning = earnings * shares.player;
        roi = 0;
        isEditable = false;
      } else if (isDirectRenter) {
        category = 'direct-renter';
        rentalCategory = 'Direct Renter';
        player = 'Renter';
        netEarning = earnings * shares.owner + netEarningCharge;
        netGameEarning = earnings * shares.owner;
        roi = 0;
        isEditable = true;
      }

      if (!isPersonal || !isRecruit || !isNonOwnedSponsor) {
        if (charges && charges === entry_price) {
          rentalFeeEarning = entry_price * 0.45;
        } else {
          rentalFeeEarning = entry_price * 0.45 + (charges - entry_price) * 0.1;
        }
      }

      if (item_used && item_used === 'rental-pass-base') {
        weeklyFee = 0;
      }

      if (weeklyFee === 0 && dailyFee === 0) {
        roi = 0;
      }

      return {
        id: uuidv4(), // Change the id to uuid because it is not unique
        rentalId: id,
        renter: accounts?.player?.name || 'No address',
        nickname: isPersonal ? 'Myself' : name || 'No nickname',
        category,
        rentalCategory,
        player,
        degenId: degen_id,
        multiplier,
        background: capitalize(background) || '',
        tribe: capitalize(tribe) || '',
        matches: matches || 0,
        wins: wins || 0,
        winRate:
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
        roi: roi || 'N/A',
        rentalRenewsIn: next_charge_at || 'N/A',
        action: is_terminated,
        weeklyFee,
        dailyFee,
        dailyFeesToDate: charges ? charges - entry_price : 0,
        rentalFeeEarning,
        netEarning,
        netGameEarning,
        isEditable,
      };
    },
  );
