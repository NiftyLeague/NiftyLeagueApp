import { Skeleton, Stack } from '@mui/material';
import MainCard from '../MainCard';

const ComicPlaceholder = ({ sx, imageWidth, imageHeight }: any) => (
  <MainCard
    sx={{ maxWidth: '425px', flexDirection: 'row', display: 'flex', ...sx }}
    content={false}
    boxShadow={false}
    border={false}
  >
    <Stack flex="50%">
      <Skeleton
        variant="rectangular"
        height={imageHeight || 211}
        width={imageWidth || 211}
      />
    </Stack>
    <Stack
      justifyContent="space-between"
      sx={{ width: '100%', padding: '12px' }}
      flex="50%"
    >
      <Stack gap={1}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Skeleton variant="rectangular" width="100%" height={32} />
        </Stack>
        <Stack justifyContent="flex-start">
          <Skeleton variant="rectangular" width={100} height={32} />
        </Stack>
      </Stack>
      <Stack gap={1} width="100%">
        <Skeleton variant="rectangular" width="100%" height={36.5} />
        <Skeleton variant="rectangular" width="100%" height={36.5} />
      </Stack>
    </Stack>
  </MainCard>
);

export default ComicPlaceholder;
