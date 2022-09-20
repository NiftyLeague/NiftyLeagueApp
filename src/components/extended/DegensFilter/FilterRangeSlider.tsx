import { Slider, SliderProps, Stack, Typography } from '@mui/material';
import { memo } from 'react';

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
    <Stack gap={0.5}>
      <Typography variant="h6">{`${value[0].toLocaleString()} - ${value[1].toLocaleString()} ${
        unit || ''
      }`}</Typography>
      <Slider
        {...props}
        value={value}
        sx={{
          ml: 1,
          width: 'calc(100% - 16px)',
          '& .MuiSlider-thumb': {
            background: 'rgb(30, 32, 35)',
            border: '1px solid rgb(98, 14, 223)',
          },
        }}
      />
    </Stack>
  </Stack>
);

export default memo(
  FilterRangeSlider,
  (prevProps, nextProps) => prevProps.value === nextProps.value,
);
