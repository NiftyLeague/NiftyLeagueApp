import { useContext } from 'react';
import {
  Stack,
  Typography,
  useTheme,
  Box,
  IconButton,
  Skeleton,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import useCopyToClipboard from 'hooks/useCopyToClipboard';
import { ProfileTotal } from 'types/account';
import { formatNumberToDisplay } from 'utils/numbers';

import ProgressGamer from './ProgressGamer';
import { GamerProfileContext } from '../index';

interface TopInfoProps {
  total?: ProfileTotal;
  walletAddress: string;
}
const TopInfo = ({ total, walletAddress }: TopInfoProps): JSX.Element => {
  const theme = useTheme();
  const { isLoadingProfile } = useContext(GamerProfileContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, copy] = useCopyToClipboard();
  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={5}>
        <Typography width="50%" variant="h2" component="div">
          Unknown{' '}
          <IconButton
            sx={{
              cursor: 'pointer',
            }}
            aria-label="edit"
            onClick={() => null}
          >
            <EditOutlinedIcon
              fontSize="small"
              sx={{
                color: theme.palette.grey[400],
              }}
            />
          </IconButton>
        </Typography>
        <Box width="50%">
          {isLoadingProfile && (
            <Skeleton variant="rectangular" width="100%" height="25px" />
          )}
          {!isLoadingProfile && total && <ProgressGamer total={total} />}
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={5}>
        <Typography
          width="50%"
          variant="h4"
          component="div"
          color={theme.palette.grey[400]}
        >
          {walletAddress ? (
            <>
              {`${walletAddress.slice(0, 5)}...${walletAddress.slice(
                walletAddress.length - 5,
                walletAddress.length - 1,
              )}`}{' '}
              <IconButton
                sx={{
                  cursor: 'pointer',
                }}
                aria-label="copy"
                onClick={() => walletAddress && copy(walletAddress)}
              >
                <ContentCopyOutlinedIcon
                  fontSize="small"
                  sx={{
                    color: theme.palette.grey[400],
                  }}
                />
              </IconButton>
            </>
          ) : (
            <Skeleton variant="rectangular" width="15%" height="36px" />
          )}
        </Typography>
        <Typography width="50%" variant="h4" component="div">
          {isLoadingProfile ? (
            <Skeleton
              variant="rectangular"
              sx={{ display: 'inline-block' }}
              width="15%"
              height="19.76px"
            />
          ) : (
            `${formatNumberToDisplay(total?.xp || 0)}/${total?.rank_xp_next}`
          )}
          <Typography
            variant="h4"
            component="div"
            color={theme.palette.grey[400]}
            display="inline"
            ml="4px"
          >
            XP
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default TopInfo;
