import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { TRAIT_VALUE_MAP } from 'constants/cosmeticsFilters';
import { memo } from 'react';

const FilterAllTraitCheckboxes = ({
  cosmeticsValue,
  onCheckboxChange,
  setCosmeticsValue,
  traitGroup,
  categoryKey,
}) => (
  <FormGroup
    sx={{
      flexDirection: 'row',
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
    prevProps.cosmeticsValue === nextProps.cosmeticsValue &&
    prevProps.onCheckboxChange === nextProps.onCheckboxChange,
);
