import { Stack } from '@mui/material';
import { getHours } from 'date-fns';

import { ProfileTotal } from 'types/account';
import Item from './Item';

interface LeftInfoProps {
  total: ProfileTotal | undefined;
}

const LeftInfo = ({ total }: LeftInfoProps): JSX.Element => {
  return (
    <Stack flex={1} spacing={1}>
      <Item label="Rank" value={`#${total?.rank}`} />
      <Item label="XP" value={total?.xp} />
      <Item label="Matches" value={total?.matches} />
      <Item label="Wins" value={total?.wins} />
      <Item
        label="Win Rate"
        value={`${
          (total?.wins &&
            total?.matches &&
            (total?.wins / total?.matches) * 100) ||
          0
        }%`}
      />
      <Item
        label="Time Played"
        value={`${
          total?.time_played && getHours(new Date(total?.time_played))
        } Hours`}
      />
    </Stack>
  );
};

export default LeftInfo;
