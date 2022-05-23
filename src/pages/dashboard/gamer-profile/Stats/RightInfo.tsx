import { useContext, useMemo } from 'react';
import { Stack } from '@mui/material';

import Item from './Item';
import { GamerProfileContext } from '../index';

const commonValue = {
  value: 'N/A',
  isDisable: true,
  isLoading: false,
};
interface RightInfoProps {
  degenCount: number;
  comicCount: number;
}
const RightInfo = ({ degenCount, comicCount }: RightInfoProps): JSX.Element => {
  const { isLoadingDegens, isLoadingComics } = useContext(GamerProfileContext);
  const rightDataMapper: {
    label: string;
    value: string | number | undefined;
    isLoading?: boolean;
    isDisable?: boolean;
  }[] = useMemo(() => {
    return [
      {
        label: 'Degens Owned',
        value: degenCount,
        isLoading: isLoadingDegens,
      },
      {
        label: 'Comics Owned',
        value: comicCount,
        isLoading: isLoadingComics,
      },
      {
        label: 'Wearable Owned',
        ...commonValue,
      },
      {
        label: 'Pets Owned',
        ...commonValue,
      },
      {
        label: 'Land Owned',
        ...commonValue,
      },
      {
        label: 'Land Items Owned',
        ...commonValue,
      },
    ];
  }, [degenCount, comicCount, isLoadingDegens, isLoadingComics]);
  return (
    <Stack flex={1} spacing={1}>
      {rightDataMapper.map((child) => (
        <Item key={child.label} {...child} />
      ))}
    </Stack>
  );
};

export default RightInfo;
