import { Box } from '@mui/material';
import { SetStateAction } from 'react';
import { Degen } from 'types/degens';

interface Props {
  degens: Degen[];
  setDegens: React.Dispatch<SetStateAction<Degen[]>>;
}

const DegensFilter = ({ degens, setDegens }: Props): JSX.Element => {
  // eslint-disable-next-line no-console
  console.log('hi');
  return <Box width="240px">Filter here</Box>;
};

export default DegensFilter;
