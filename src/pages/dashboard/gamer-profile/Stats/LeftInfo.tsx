import { useContext, useMemo } from 'react';
import { Stack } from '@mui/material';
import { getHours } from 'date-fns';

import { ProfileTotal } from 'types/account';
import { formatNumberToDisplay } from 'utils/numbers';

import Item from './Item';
import { GamerProfileContext } from '../index';

interface LeftInfoProps {
  total: ProfileTotal | undefined;
}

const LeftInfo = ({ total }: LeftInfoProps): JSX.Element => {
  const leftDataMapper: {
    label: string;
    value: string | number | undefined;
  }[] = useMemo(() => {
    return [
      {
        label: 'Rank',
        value: `#${total?.rank}`,
      },
      {
        label: 'XP',
        value: formatNumberToDisplay(total?.xp || 0.0),
      },
      {
        label: 'Matches',
        value: total?.matches,
      },
      {
        label: 'Wins',
        value: total?.wins,
      },
      {
        label: 'Win Rate',
        value: `${
          (total?.wins &&
            total?.matches &&
            formatNumberToDisplay((total?.wins / total?.matches) * 100)) ||
          0
        }%`,
      },
      {
        label: 'Time Played',
        value: `${
          total?.time_played && getHours(new Date(total?.time_played))
        } Hours`,
      },
    ];
  }, [total]);

  const { isLoadingProfile } = useContext(GamerProfileContext);
  return (
    <Stack flex={1} spacing={1}>
      {leftDataMapper.map((child) => (
        <Item key={child.label} {...child} isLoading={isLoadingProfile} />
      ))}
    </Stack>
  );
};

export default LeftInfo;
