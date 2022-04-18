import { Slider, SliderProps, Stack, Typography } from '@mui/material';

interface Props extends Omit<SliderProps, 'value'> {
  value: number[];
  unit?: string;
  label?: string;
}

const FilterRangeSlider = ({
  value,
  unit,
  label,
  ...props
}: Props): JSX.Element => (
  <Stack>
    <Stack gap={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Min {label || ''}</Typography>
        <Typography variant="h6">Max {label || ''}</Typography>
      </Stack>
      <Slider {...props} value={value} />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="caption">
          {value[0]}
          {unit || ''}
        </Typography>
        <Typography variant="caption">
          {value[1]}
          {unit || ''}
        </Typography>
      </Stack>
    </Stack>
  </Stack>
);

export default FilterRangeSlider;
