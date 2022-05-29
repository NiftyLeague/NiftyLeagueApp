import React, {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
  useMediaQuery,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { backgrounds, tribes } from 'constants/filters';
import * as CosmeticsFilter from 'constants/cosmeticsFilters';
import { DegenFilter } from 'types/degenFilter';
import { updateFilterValue } from './utils';
import FilterAccordion from './FilterAccordion';
import FilterRangeSlider from './FilterRangeSlider';
import FilterAllTraitCheckboxes from '../FilterAllTraitCheckboxes';

type FilterSource =
  | 'prices'
  | 'multipliers'
  | 'rentals'
  | 'tribes'
  | 'backgrounds'
  | 'cosmetics'
  | 'searchTerm';

interface DegensFilterProps {
  onFilter: (filter: DegenFilter) => void;
  defaultFilterValues: DegenFilter;
}

const DegensFilter = ({
  onFilter,
  defaultFilterValues,
}: DegensFilterProps): JSX.Element => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const params = useMemo(
    () =>
      Object.fromEntries(searchParams.entries()) as {
        [key in FilterSource]?: string;
      },
    [searchParams],
  );

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
  const [cosmeticsValue, setCosmeticsValue] = useState<string[]>(
    defaultFilterValues.cosmetics,
  );
  const [searchTermValue, setSearchTermValue] = useState<string[]>(
    defaultFilterValues.searchTerm,
  );

  // Set search params from filter values
  // Use value to manually set the source's value
  // Useful for checkbox filters since using setState won't update the value fast enough
  // Previously tried useEffect but it was unreliable since tribe and backgrounds will overwrite each other
  const handleChangeCommitted = useCallback(
    (source: FilterSource, value: string | null = null) => {
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
        case 'cosmetics':
          keyValue = { cosmetics: value };
          break;
        case 'searchTerm':
          keyValue = { searchTerm: [value] };
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
    },
    [
      multipliersRangeValue,
      params,
      pricesRangeValue,
      rentalsRangeValue,
      setSearchParams,
    ],
  );

  // For checkbox filter
  const handleCheckboxChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      source: FilterSource,
      state: string[],
      setState: React.Dispatch<SetStateAction<string[]>>,
    ) => {
      const { checked, value } = e.target;
      let newState: string[] = [];
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
    },
    [handleChangeCommitted],
  );

  const setAllFilterValues = useCallback(() => {
    setPricesRangeValue(defaultFilterValues.prices);
    setMultipliersRangeValue(defaultFilterValues.multipliers);
    setRentalsRangeValue(defaultFilterValues.rentals);
    setTribesValue(defaultFilterValues.tribes);
    setBackgroundsValue(defaultFilterValues.backgrounds);
    setCosmeticsValue(defaultFilterValues.cosmetics);
    setSearchTermValue(defaultFilterValues.searchTerm);
  }, [defaultFilterValues]);

  const handleReset = () => {
    if (isParamsEmpty) return;
    setAllFilterValues();
    setSearchParams({});
  };

  const handleChangeSearchTerm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchTermValue([value]);
      handleChangeCommitted('searchTerm', value);
    },
    [handleChangeCommitted],
  );

  // Updates local filter state on defaultFilterValues change
  useEffect(() => {
    setAllFilterValues();
  }, [setAllFilterValues]);

  // Update local state on mount & on filter params update
  useEffect(() => {
    const newFilters = updateFilterValue(defaultFilterValues, params, {
      prices: setPricesRangeValue,
      multipliers: setMultipliersRangeValue,
      rentals: setRentalsRangeValue,
      tribes: setTribesValue,
      backgrounds: setBackgroundsValue,
      cosmetics: setCosmeticsValue,
      searchTerm: setSearchTermValue,
    });

    onFilter({
      prices: newFilters.prices,
      multipliers: newFilters.multipliers,
      rentals: newFilters.rentals,
      tribes: newFilters.tribes,
      backgrounds: newFilters.backgrounds,
      cosmetics: newFilters.cosmetics,
      searchTerm: newFilters.searchTerm,
    });
  }, [defaultFilterValues, onFilter, params]);

  return (
    <Stack
      gap={1}
      sx={{
        overflowX: 'hidden',
        [theme.breakpoints.down('sm')]: {
          paddingX: 2,
        },
      }}
    >
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
      <TextField
        label="Search degens by token # or name"
        name="search-degen-by-token-id-name"
        variant="outlined"
        size="small"
        fullWidth
        value={searchTermValue}
        onChange={handleChangeSearchTerm}
        sx={{ margin: '6px 0px 10px 0px' }}
      />
      <Stack>
        <FilterAccordion
          summary={<Typography variant="h5">Overview</Typography>}
          expanded
        >
          <Stack gap={4}>
            <FilterRangeSlider
              value={pricesRangeValue}
              min={defaultFilterValues.prices[0]}
              max={defaultFilterValues.prices[1]}
              unit=" NFTL"
              label="Price"
              onChange={(_, value) => setPricesRangeValue(value as number[])}
              onChangeCommitted={() => handleChangeCommitted('prices')}
            />
            <FilterRangeSlider
              value={multipliersRangeValue}
              min={defaultFilterValues.multipliers[0]}
              max={defaultFilterValues.multipliers[1]}
              unit="x"
              label="Multipliers"
              onChange={(_, value) =>
                setMultipliersRangeValue(value as number[])
              }
              onChangeCommitted={() => handleChangeCommitted('multipliers')}
            />
            <FilterRangeSlider
              value={rentalsRangeValue}
              min={defaultFilterValues.rentals[0]}
              max={defaultFilterValues.rentals[1]}
              label="Rentals"
              onChange={(_, value) => setRentalsRangeValue(value as number[])}
              onChangeCommitted={() => handleChangeCommitted('rentals')}
            />
          </Stack>
        </FilterAccordion>
        <FilterAccordion
          summary={<Typography variant="h5">Tribe</Typography>}
          expanded
        >
          <FormGroup sx={{ flexDirection: 'row' }}>
            {tribes.map((tribe) => (
              <FormControlLabel
                key={tribe.name}
                control={
                  <Checkbox
                    name={tribe.name}
                    value={tribe.name}
                    checked={tribesValue.includes(tribe.name)}
                    icon={<tribe.icon />}
                    checkedIcon={<tribe.icon />}
                    disableRipple
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
                label={tribe.name}
                sx={{
                  svg: {
                    height: '22px',
                    width: '22px',
                  },
                  background: tribesValue.includes(tribe.name)
                    ? theme.palette.primary.main
                    : theme.palette.dark[800],
                  borderRadius: '16px',
                  pl: 1,
                  pr: 2,
                  ml: 0,
                  mb: '12px',
                  '& .MuiCheckbox-root:': {
                    padding: 0,
                    mr: '8px',
                  },
                }}
              />
            ))}
          </FormGroup>
        </FilterAccordion>
        <FilterAccordion
          summary={<Typography variant="h5">Background</Typography>}
          expanded
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
        <FilterAccordion
          summary={<Typography variant="h5">Cosmetics</Typography>}
          expanded={false}
        >
          {Object.keys(CosmeticsFilter.TRAIT_VALUE_MAP)
            .sort()
            .map((categoryKey) => {
              const traitGroup = Object.entries(
                CosmeticsFilter.TRAIT_VALUE_MAP[categoryKey],
              )
                .sort((a: [string, string], b: [string, string]) =>
                  a[1].localeCompare(b[1]),
                )
                .map((item) => item[0]);
              return (
                <FormGroup key={categoryKey} sx={{ flexDirection: 'row' }}>
                  <FilterAccordion
                    summary={
                      <Typography variant="h5">
                        {categoryKey} ({traitGroup.length})
                      </Typography>
                    }
                    expanded={false}
                  >
                    <FilterAllTraitCheckboxes
                      traitGroup={traitGroup}
                      categoryKey={categoryKey}
                      cosmeticsValue={cosmeticsValue}
                      onCheckboxChange={handleCheckboxChange}
                      setCosmeticsValue={setCosmeticsValue}
                      params={params}
                    />
                  </FilterAccordion>
                </FormGroup>
              );
            })}
        </FilterAccordion>
      </Stack>
    </Stack>
  );
};

export default DegensFilter;
