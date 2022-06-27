import { useContext, useMemo } from 'react';
import { Stack } from '@mui/material';
import { getHours } from 'date-fns';

import { ProfileWenGame } from 'types/account';

import Item from './Item';
import { GamerProfileContext } from '../index';

interface WenGameContentProps {
  data: ProfileWenGame | undefined;
}

const WenGameContent = ({ data }: WenGameContentProps): JSX.Element => {
  const leftDataMapper: {
    label: string;
    value: string | number | undefined;
  }[] = useMemo(() => {
    return [
      {
        label: 'XP Rank',
        value: data?.rank || 0,
      },
      {
        label: 'XP',
        value: Math.round(data?.xp || 0),
      },
      {
        label: 'High Score',
        value: data?.score,
      },
      {
        label: 'Games',
        value: data?.matches,
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

export default WenGameContent;