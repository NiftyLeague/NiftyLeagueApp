import { useContext, useMemo } from 'react';
import { Stack } from '@mui/material';
import { getHours } from 'date-fns';

import { ProfileTotal, ProfileNiftySmsher } from 'types/account';
import { formatNumberToDisplay } from 'utils/numbers';

import Item from './Item';
import { GamerProfileContext } from '../index';

interface LeftInfoProps {
  data: ProfileTotal | ProfileNiftySmsher | undefined;
}

const LeftInfo = ({ data }: LeftInfoProps): JSX.Element => {
  const leftDataMapper: {
    label: string;
    value: string | number | undefined;
  }[] = useMemo(() => {
    return [
      {
        label: 'Rank',
        value: `#${data?.rank || 0}`,
      },
      {
        label: 'XP',
        value: formatNumberToDisplay(data?.xp || 0.0),
      },
      {
        label: 'Matches',
        value: data?.matches,
      },
      {
        label: 'Wins',
        value: data?.wins,
      },
      {
        label: 'Win Rate',
        value: `${
          (data?.wins &&
            data?.matches &&
            formatNumberToDisplay((data?.wins / data?.matches) * 100)) ||
          0
        }%`,
      },
      {
        label: 'Time Played',
        value: `${
          (data?.time_played && getHours(new Date(data?.time_played))) || 0
        } Hours`,
      },
    ];
  }, [data]);

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
