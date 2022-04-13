import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { backgrounds, tribes } from 'constants/filters';
import useQuery from 'hooks/useQuery';
import { ChangeEvent, SetStateAction, useState } from 'react';
import { Degen } from 'types/degens';
import FilterAccordion from './FilterAccordion';
import FilterRangeSlider from './FilterRangeSlider';

interface Props {
  degens: Degen[];
  setDegens: React.Dispatch<SetStateAction<Degen[]>>;
}

const DegensFilter = ({ degens, setDegens }: Props): JSX.Element => {
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const [pricesRangeValue, setPricesRangeValue] = useState<number[]>([
    300, 1500,
  ]);
  const [multipliersRangeValue, setMultipliersRangeValue] = useState<number[]>([
    3, 12,
  ]);
  const [rentalsRangeValue, setRentalsRangeValue] = useState<number[]>([
    15, 26,
  ]);
  const [tribesValue, setTribesValue] = useState<string[]>([]);

  const handleTribeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    // eslint-disable-next-line no-console
    console.log({ checked, value });
    if (checked) {
      setTribesValue([...tribesValue, value]);
    } else {
      setTribesValue(tribesValue.filter((tribe) => tribe !== value));
    }
  };

  const [backgroundsValue, setBackgroundsValue] = useState<string[]>([]);

  const handleBackgroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    // eslint-disable-next-line no-console
    console.log({ checked, value });
    if (checked) {
      setBackgroundsValue([...backgroundsValue, value]);
    } else {
      setBackgroundsValue(backgroundsValue.filter((tribe) => tribe !== value));
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const query = useQuery();
  return (
    <Stack gap={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: matchDownLG ? theme.spacing(2) : '' }}
      >
        <Typography variant="h4">Filter Rentals</Typography>
        <Stack direction="row" gap={2}>
          <Button variant="outlined">Reset</Button>
        </Stack>
      </Stack>
      <Stack>
        <FilterAccordion
          summary={<Typography variant="h5">Overview</Typography>}
        >
          <Stack gap={4}>
            <FilterRangeSlider
              value={pricesRangeValue}
              max={2000}
              unit=" NFTL"
              label="Price"
              onChange={(_, value) => setPricesRangeValue(value as number[])}
            />
            <FilterRangeSlider
              value={multipliersRangeValue}
              max={15}
              unit="x"
              label="Multipliers"
              onChange={(_, value) =>
                setMultipliersRangeValue(value as number[])
              }
            />
            <FilterRangeSlider
              value={rentalsRangeValue}
              max={40}
              label="Rentals"
              onChange={(_, value) => setRentalsRangeValue(value as number[])}
            />
          </Stack>
        </FilterAccordion>
        <FilterAccordion summary={<Typography variant="h5">Tribe</Typography>}>
          <FormGroup sx={{ flexDirection: 'row' }}>
            {tribes.map((tribe) => (
              <FormControlLabel
                key={tribe}
                control={
                  <Checkbox
                    name={tribe}
                    value={tribe}
                    checked={tribesValue.includes(tribe)}
                    onChange={handleTribeChange}
                  />
                }
                label={tribe}
              />
            ))}
          </FormGroup>
        </FilterAccordion>
        <FilterAccordion
          summary={<Typography variant="h5">Background</Typography>}
        >
          <FormGroup sx={{ flexDirection: 'row' }}>
            {backgrounds.map((background) => (
              <FormControlLabel
                key={background}
                control={
                  <Checkbox
                    name={background}
                    value={background}
                    checked={backgroundsValue.includes(background)}
                    onChange={handleBackgroundChange}
                  />
                }
                label={background}
              />
            ))}
          </FormGroup>
        </FilterAccordion>
      </Stack>
    </Stack>
  );
};

export default DegensFilter;
