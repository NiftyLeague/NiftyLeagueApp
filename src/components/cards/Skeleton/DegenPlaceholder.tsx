import { Skeleton, Stack } from '@mui/material';

const DegenPlaceholder = () => (
  <Stack sx={{ p: '12px' }} gap={3}>
    <Skeleton variant="rectangular" height={40} />
    <Stack gap={3}>
      <Skeleton variant="rectangular" height={294} />
      <Stack direction="row" justifyContent="space-between">
        <Skeleton variant="rectangular" width="40%" height={20} />
        <Skeleton variant="rectangular" width="20%" height={20} />
      </Stack>
      <Skeleton variant="rectangular" width="100%" height={36.5} />
    </Stack>
    <Skeleton variant="rectangular" height={40} />
  </Stack>
);

export default DegenPlaceholder;
