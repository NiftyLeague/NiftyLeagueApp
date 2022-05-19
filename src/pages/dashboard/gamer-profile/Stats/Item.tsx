import { Stack, Typography, useTheme } from '@mui/material';

interface ItemProps {
  label?: string;
  value?: string | number;
  isDisable?: boolean;
}

const Item = ({ label, value, isDisable = false }: ItemProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography color={isDisable ? theme.palette.grey[400] : 'white'}>
        {label}:
      </Typography>
      <Typography
        color={isDisable ? theme.palette.grey[400] : theme.palette.warning.main}
        fontWeight="bold"
      >
        {value}
      </Typography>
    </Stack>
  );
};

export default Item;
