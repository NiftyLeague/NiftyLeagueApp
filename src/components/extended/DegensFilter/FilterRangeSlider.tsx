import {
  Slider,
  SliderProps,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
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
}: Props): JSX.Element => {
  const theme = useTheme();
  return (
    <Stack>
      <Stack>
        <Typography sx={{ mb: 1 }} variant="paragraphXXSmall">
          {label}
        </Typography>
        <Stack
          gap={4}
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Typography
            sx={{ color: theme.palette.grey[600] }}
            variant="paragraphXXXSmall"
          >
            Min
          </Typography>
          <Slider sx={{ p: 0 }} size="small" {...props} value={value} />
          <Typography
            sx={{ color: theme.palette.grey[600] }}
            variant="paragraphXXXSmall"
          >
            Max
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={{ color: theme.palette.grey[600] }}
            variant="paragraphXXXSmall"
          >
            {value[0]}
            {/* {unit || ''} */}
          </Typography>
          <Typography
            sx={{ color: theme.palette.grey[600] }}
            variant="paragraphXXXSmall"
          >
            {value[1]}
            {/* {unit || ''} */}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(
  FilterRangeSlider,
  (prevProps, nextProps) => prevProps.value === nextProps.value,
);
