import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { useTheme } from '@mui/system';
import { backgrounds, tribes } from 'constants/filters';
import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { updateFilterValue } from './utils';
import { useSearchParams } from 'react-router-dom';
import defaultFilterValues from './constants';
import FilterAccordion from './FilterAccordion';
import FilterRangeSlider from './FilterRangeSlider';
import { DegenFilter } from 'types/degenFilter';

type FilterSource =
  | 'prices'
  | 'multipliers'
  | 'rentals'
  | 'tribes'
  | 'backgrounds';

interface DegensFilterProps {
  handleFilter: (filter: DegenFilter) => void;
}

const DegensFilter = ({ handleFilter }: DegensFilterProps): JSX.Element => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const params = Object.fromEntries(searchParams.entries()) as {
    [key in FilterSource]?: string;
  };
  const isParamsEmpty = isEmpty(params);

  // Filter states
  const [pricesRangeValue, setPricesRangeValue] = useState<number[]>(
    defaultFilterValues.prices,
  );
  const [multipliersRangeValue, setMultipliersRangeValue] = useState<number[]>(
    defaultFilterValues.multipliers,
  );
  const [rentalsRangeValue, setRentalsRangeValue] = useState<number[]>(
    defaultFilterValues.rentals,
  );
  const [tribesValue, setTribesValue] = useState<string[]>(
    defaultFilterValues.tribes,
  );
  const [backgroundsValue, setBackgroundsValue] = useState<string[]>(
    defaultFilterValues.backgrounds,
  );
  const actions = {
    prices: setPricesRangeValue,
    multipliers: setMultipliersRangeValue,
    rentals: setRentalsRangeValue,
    tribes: setTribesValue,
    backgrounds: setBackgroundsValue,
  };

  // For checkbox filter
  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    source: FilterSource,
    state: string[],
    setState: React.Dispatch<SetStateAction<string[]>>,
  ) => {
    const { checked, value } = e.target;
    let newState = null;
    if (checked) {
      newState = [...state, value];
    } else {
      newState = state.filter((item) => item !== value);
    }
    setState(newState);
    handleChangeCommitted(
      source,
      newState.length > 0 ? newState.join('-') : '',
    );
  };

  // Set search params from filter values
  // Use value to manually set the source's value
  // Useful for checkbox filters since using setState won't update the value fast enough
  // Previously tried useEffect but it was unreliable since tribe and backgrounds will overwrite each other
  const handleChangeCommitted = (
    source: FilterSource,
    value: string | null = null,
  ) => {
    let keyValue = {};
    switch (source) {
      case 'prices':
        keyValue = { prices: pricesRangeValue.join('-') };
        break;
      case 'multipliers':
        keyValue = { multipliers: multipliersRangeValue.join('-') };
        break;
      case 'rentals':
        keyValue = { rentals: rentalsRangeValue.join('-') };
        break;
      case 'tribes':
        keyValue = { tribes: value };
        break;
      case 'backgrounds':
        keyValue = { backgrounds: value };
        break;
    }
    const newParams = {
      ...params,
      ...keyValue,
    };
    if (value?.length === 0) {
      delete newParams[source];
    }
    setSearchParams(newParams);
  };

  const handleReset = () => {
    if (isParamsEmpty) return;
    setPricesRangeValue(defaultFilterValues.prices);
    setMultipliersRangeValue(defaultFilterValues.multipliers);
    setRentalsRangeValue(defaultFilterValues.rentals);
    setTribesValue(defaultFilterValues.tribes);
    setBackgroundsValue(defaultFilterValues.backgrounds);
    setSearchParams({});
  };

  // Update local state on mounted
  useEffect(() => {
    updateFilterValue(params, actions);
    handleFilter({
      prices: pricesRangeValue,
      multipliers: multipliersRangeValue,
      rentals: rentalsRangeValue,
      tribes: tribesValue,
      backgrounds: backgroundsValue,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
          <Button
            variant="outlined"
            disabled={isParamsEmpty}
            onClick={handleReset}
          >
            Reset
          </Button>
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
              onChangeCommitted={() => handleChangeCommitted('prices')}
            />
            <FilterRangeSlider
              value={multipliersRangeValue}
              max={15}
              unit="x"
              label="Multipliers"
              onChange={(_, value) =>
                setMultipliersRangeValue(value as number[])
              }
              onChangeCommitted={() => handleChangeCommitted('multipliers')}
            />
            <FilterRangeSlider
              value={rentalsRangeValue}
              max={40}
              label="Rentals"
              onChange={(_, value) => setRentalsRangeValue(value as number[])}
              onChangeCommitted={() => handleChangeCommitted('rentals')}
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
                    onChange={(e) =>
                      handleCheckboxChange(
                        e,
                        'tribes',
                        tribesValue,
                        setTribesValue,
                      )
                    }
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
                    onChange={(e) =>
                      handleCheckboxChange(
                        e,
                        'backgrounds',
                        backgroundsValue,
                        setBackgroundsValue,
                      )
                    }
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
