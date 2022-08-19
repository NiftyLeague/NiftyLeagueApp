import React, {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { isEmpty } from 'lodash';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/system';
import {
  FilterSource,
  backgrounds,
  multipliers,
  rentals,
  tribes,
  wearables,
} from 'constants/filters';
import * as CosmeticsFilter from 'constants/cosmeticsFilters';
import { DegenFilter } from 'types/degenFilter';
import { updateFilterValue } from './utils';
import FilterAccordion from './FilterAccordion';
import FilterRangeSlider from './FilterRangeSlider';
import FilterAllTraitCheckboxes from '../FilterAllTraitCheckboxes';

interface DegensFilterProps {
  onFilter: (filter: DegenFilter) => void;
  defaultFilterValues: DegenFilter;
  isDegenOwner?: boolean;
  searchTerm?: string;
}

const useStyles = makeStyles(() => ({
  inputCheck: {
    padding: 4,
    color: '#4D4D4D',
    '& .MuiSvgIcon-root': {
      width: '0.75em',
      height: '0.75em',
    },
  },
  inputCheckFormControl: {
    marginLeft: -8,
    marginRight: 0,
    '& .MuiFormControlLabel-label': {
      fontSize: '0.75rem',
      lineHeight: '0.75rem',
    },
  },
}));

const DegensFilter = ({
  onFilter,
  defaultFilterValues,
  isDegenOwner,
  searchTerm,
}: DegensFilterProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const mountedRef = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(
    () =>
      Object.fromEntries(searchParams.entries()) as {
        [key in FilterSource]?: string;
      },
    [searchParams],
  );

  const isParamsEmpty = isEmpty(params);
  const { displayMyItems } = useFlags();

  // Filter states
  const [showMore, setShowMore] = useState(false);
  const [pricesRangeValue, setPricesRangeValue] = useState<number[]>(
    defaultFilterValues.prices,
  );
  const [multipliersValue, setMultipliersValue] = useState<string[]>(
    defaultFilterValues.multipliers,
  );
  const [rentalsValue, setRentalsValue] = useState<string[]>(
    defaultFilterValues.rentals,
  );
  const [tribesValue, setTribesValue] = useState<string[]>(
    defaultFilterValues.tribes,
  );
  const [backgroundsValue, setBackgroundsValue] = useState<string[]>(
    isDegenOwner ? defaultFilterValues.backgrounds : ['Common'],
  );
  const [cosmeticsValue, setCosmeticsValue] = useState<string[]>(
    defaultFilterValues.cosmetics,
  );
  const [wearablesValue, setWearablesValue] = useState<string[]>(
    defaultFilterValues.wearables,
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
          keyValue = { multipliers: value };
          break;
        case 'rentals':
          keyValue = { rentals: value };
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
        case 'wearables':
          keyValue = { wearables: value };
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
    [params, pricesRangeValue, setSearchParams],
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
    setMultipliersValue(defaultFilterValues.multipliers);
    setRentalsValue(defaultFilterValues.rentals);
    setTribesValue(defaultFilterValues.tribes);
    setBackgroundsValue(
      isDegenOwner ? defaultFilterValues.backgrounds : ['Common'],
    );
    setCosmeticsValue(defaultFilterValues.cosmetics);
    setWearablesValue(defaultFilterValues.wearables);
  }, [defaultFilterValues, isDegenOwner]);

  const handleReset = () => {
    if (isParamsEmpty) return;
    setAllFilterValues();
    setSearchParams({});
  };

  useEffect(() => {
    if (searchTerm === undefined) return;
    handleChangeCommitted('searchTerm', searchTerm);
  }, [handleChangeCommitted, searchTerm]);

  // Updates local filter state on defaultFilterValues change
  useEffect(() => {
    setAllFilterValues();
  }, [setAllFilterValues]);

  // Update local state on mount & on filter params update
  useEffect(() => {
    // Once mounted, show only DEGENs with Common backgrounds if non DEGEN owner
    const newFilters = updateFilterValue(
      !params.backgrounds && !mountedRef.current
        ? {
            ...defaultFilterValues,
            backgrounds: isDegenOwner
              ? defaultFilterValues.backgrounds
              : ['Common'],
          }
        : defaultFilterValues,
      params,
      {
        prices: setPricesRangeValue,
        multipliers: setMultipliersValue,
        rentals: setRentalsValue,
        tribes: setTribesValue,
        backgrounds: setBackgroundsValue,
        cosmetics: setCosmeticsValue,
        wearables: setWearablesValue,
      },
    );
    if (!params.backgrounds && !mountedRef.current && !isDegenOwner) {
      setSearchParams({
        ...params,
        backgrounds: ['Common'],
      });
    }
    mountedRef.current = true;
    onFilter({
      prices: newFilters.prices,
      multipliers: newFilters.multipliers,
      rentals: newFilters.rentals,
      tribes: newFilters.tribes,
      backgrounds: newFilters.backgrounds,
      cosmetics: newFilters.cosmetics,
      wearables: newFilters.wearables,
      searchTerm: newFilters.searchTerm,
    });
  }, [defaultFilterValues, isDegenOwner, onFilter, params, setSearchParams]);

  return (
    <Stack
      gap={1.5}
      sx={{
        overflowX: 'hidden',
        [theme.breakpoints.down('sm')]: {
          paddingY: 2,
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Filter Rentals</Typography>
        <Stack direction="row" gap={2}>
          <Button
            variant="outlined"
            disabled={isParamsEmpty}
            onClick={handleReset}
            sx={{ height: 28, color: '#620EDF' }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
      <Stack py={1.5} borderRadius="10px" sx={{ background: '#1E2023' }}>
        <FilterAccordion
          summary={<Typography variant="h4">Tribe</Typography>}
          expanded={false}
          length={tribes.length}
        >
          <FormGroup sx={{ flexDirection: 'row' }}>
            {tribes.map((tribe) => (
              <FormControlLabel
                key={tribe.name}
                control={
                  <Checkbox
                    size="small"
                    name={tribe.name}
                    value={tribe.name}
                    checked={tribesValue.includes(tribe.name)}
                    className={classes.inputCheck}
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
                className={classes.inputCheckFormControl}
                sx={{ flex: '0 0 33.333333%' }}
              />
            ))}
          </FormGroup>
        </FilterAccordion>
        <FilterAccordion
          summary={<Typography variant="h4">Price</Typography>}
          expanded={false}
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
          </Stack>
        </FilterAccordion>
        <FilterAccordion
          summary={<Typography variant="h4">Queue</Typography>}
          expanded={false}
          length={rentals.length}
        >
          <FormGroup sx={{ flexDirection: 'column' }}>
            {rentals.map((item) => (
              <FormControlLabel
                key={`Queue${item}`}
                control={
                  <Checkbox
                    size="small"
                    name={`Queue${item}`}
                    value={item}
                    checked={rentalsValue.includes(item)}
                    className={classes.inputCheck}
                    onChange={(e) =>
                      handleCheckboxChange(
                        e,
                        'rentals',
                        rentalsValue,
                        setRentalsValue,
                      )
                    }
                  />
                }
                label={item}
                className={classes.inputCheckFormControl}
              />
            ))}
          </FormGroup>
        </FilterAccordion>
        <FilterAccordion
          summary={<Typography variant="h4">Multiplier</Typography>}
          expanded={false}
          length={multipliers.length}
        >
          <FormGroup sx={{ flexDirection: 'column' }}>
            {multipliers.map((item) => (
              <FormControlLabel
                key={`Multiplier${item}`}
                control={
                  <Checkbox
                    size="small"
                    name={`Multiplier${item}`}
                    value={item}
                    checked={multipliersValue.includes(item)}
                    className={classes.inputCheck}
                    onChange={(e) =>
                      handleCheckboxChange(
                        e,
                        'multipliers',
                        multipliersValue,
                        setMultipliersValue,
                      )
                    }
                  />
                }
                label={item}
                className={classes.inputCheckFormControl}
              />
            ))}
          </FormGroup>
        </FilterAccordion>
        {displayMyItems && (
          <FilterAccordion
            summary={<Typography variant="h4">Wearable</Typography>}
            expanded={false}
            length={wearables.length}
          >
            <FormGroup sx={{ flexDirection: 'row' }}>
              {wearables.map((wearable) => (
                <FormControlLabel
                  key={wearable}
                  control={
                    <Checkbox
                      size="small"
                      name={wearable}
                      value={wearable}
                      checked={wearablesValue.includes(wearable)}
                      className={classes.inputCheck}
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          'wearables',
                          wearablesValue,
                          setWearablesValue,
                        )
                      }
                    />
                  }
                  label={wearable}
                  className={classes.inputCheckFormControl}
                  sx={{ flex: '0 0 50%' }}
                />
              ))}
            </FormGroup>
          </FilterAccordion>
        )}
        {!showMore ? (
          <Typography
            variant="body1"
            sx={{
              textDecoration: 'underline',
              cursor: 'pointer',
              margin: '0 14px',
              lineHeight: '36px',
            }}
            onClick={() => setShowMore(true)}
          >
            More
          </Typography>
        ) : (
          <>
            <FilterAccordion
              summary={<Typography variant="h4">Background</Typography>}
              length={backgrounds.length}
              expanded={false}
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
                        className={classes.inputCheck}
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
                    className={classes.inputCheckFormControl}
                    sx={{ flex: '0 0 50%' }}
                  />
                ))}
              </FormGroup>
            </FilterAccordion>
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
                        <Typography variant="h4">{categoryKey}</Typography>
                      }
                      length={traitGroup.length}
                      expanded={false}
                    >
                      <FilterAllTraitCheckboxes
                        traitGroup={traitGroup}
                        categoryKey={categoryKey}
                        cosmeticsValue={cosmeticsValue}
                        onCheckboxChange={handleCheckboxChange}
                        setCosmeticsValue={setCosmeticsValue}
                        inputCheckBoxStyle={classes.inputCheck}
                        inputCheckFormControlStyle={
                          classes.inputCheckFormControl
                        }
                      />
                    </FilterAccordion>
                  </FormGroup>
                );
              })}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default DegensFilter;
