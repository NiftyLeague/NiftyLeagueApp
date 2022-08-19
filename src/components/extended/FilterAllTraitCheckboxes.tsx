import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { TRAIT_VALUE_MAP } from 'constants/cosmeticsFilters';
import { FilterSource } from 'constants/filters';
import { ChangeEvent, Dispatch, FC, SetStateAction, memo } from 'react';

interface FilterAllTraitCheckboxesProps {
  cosmeticsValue: string[];
  traitGroup: string[];
  categoryKey: string;
  inputCheckBoxStyle: any;
  inputCheckFormControlStyle: any;
  setCosmeticsValue: Dispatch<SetStateAction<string[]>>;
  onCheckboxChange: (
    e: ChangeEvent<HTMLInputElement>,
    source: FilterSource,
    state: string[],
    setState: Dispatch<SetStateAction<string[]>>,
  ) => void;
}

const FilterAllTraitCheckboxes: FC<FilterAllTraitCheckboxesProps> = ({
  cosmeticsValue,
  onCheckboxChange,
  setCosmeticsValue,
  traitGroup,
  categoryKey,
  inputCheckBoxStyle,
  inputCheckFormControlStyle,
}: FilterAllTraitCheckboxesProps) => (
  <FormGroup
    sx={{
      flexDirection: 'row',
      rowGap: 0.5,
    }}
  >
    {traitGroup.map((traitKey) => {
      const traitValue = TRAIT_VALUE_MAP[categoryKey][traitKey];
      return (
        <FormControlLabel
          key={traitKey}
          control={
            <Checkbox
              name={traitValue}
              value={traitKey}
              checked={cosmeticsValue.includes(traitKey)}
              className={inputCheckBoxStyle}
              onChange={(e) =>
                onCheckboxChange(
                  e,
                  'cosmetics',
                  cosmeticsValue,
                  setCosmeticsValue,
                )
              }
            />
          }
          label={traitValue}
          className={inputCheckFormControlStyle}
          sx={{ flex: '0 0 50%' }}
        />
      );
    })}
  </FormGroup>
);

// Making sure that the component is only re-rendered if the cosmesticsValue prop changes
// since this is component renders 900+ checkboxes, it matters here
export default memo(
  FilterAllTraitCheckboxes,
  (prevProps, nextProps) =>
    prevProps.cosmeticsValue === nextProps.cosmeticsValue,
);
