import { Skeleton, Stack, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const ProfileItemSketeton = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Skeleton variant="rectangular" width="30%" height="18.67px" />
      <Skeleton variant="rectangular" width="30%" height="18.67px" />
    </Stack>
  );
};
const ProfileTopSkeleton = () => (
  <Grid item container spacing={3}>
    <Grid item xs={12} md={3.5}>
      <Skeleton variant="rectangular" width="100%" height="320px" />
    </Grid>
    <Grid item xs={12} md={8.5}>
      <Stack spacing={1}>
        <Stack direction="row" spacing={5}>
          <Skeleton variant="rectangular" width="50%" height="32px" />
          <Skeleton variant="rectangular" width="50%" height="32px" />
        </Stack>
        <Stack direction="row" spacing={5}>
          <Skeleton variant="rectangular" width="50%" height="32px" />
          <Skeleton variant="rectangular" width="50%" height="32px" />
        </Stack>
      </Stack>
      <hr />
      <Stack spacing={1}>
        <Stack>
          <Skeleton variant="rectangular" width="25%" height="23.34px" />
        </Stack>
        <Stack direction="row" spacing={5}>
          <Stack flex={1} spacing={1}>
            {[...Array(6)].map(() => (
              <ProfileItemSketeton key={uuidv4()} />
            ))}
          </Stack>
          <Stack flex={1} spacing={1}>
            {[...Array(6)].map(() => (
              <ProfileItemSketeton key={uuidv4()} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  </Grid>
);

export default ProfileTopSkeleton;
