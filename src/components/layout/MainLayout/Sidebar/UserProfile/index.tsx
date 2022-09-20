import {
  Avatar,
  Box,
  Button,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import NetworkContext from 'contexts/NetworkContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { NFTL_CONTRACT } from 'constants/contracts';
import { sendUserId } from 'utils/google-analytics';
import { formatNumberToDisplay } from 'utils/numbers';
import { DEBUG } from 'constants/index';

import { useGamerProfile } from 'hooks/useGamerProfile';
import { ProfileAvatar } from 'types/account';
import useAuth from 'hooks/useAuth';
import ConnectWrapper from 'components/wrapper/ConnectWrapper';
import BalanceContext from 'contexts/BalanceContext';

export interface UserProfileProps {}

const UserProfile: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<UserProfileProps>>
> = () => {
  const { palette } = useTheme();
  const { address, writeContracts, tx } = useContext(NetworkContext);
  const { totalAccrued, tokenIndices, loading, refreshClaimableNFTL } =
    useContext(BalanceContext);

  const [mockAccumulated, setMockAccumulated] = useState(0);
  const [username, setUserName] = useState<string | undefined>('');
  const [avatar, setAvatar] = useState<ProfileAvatar | undefined>(undefined);
  const { fetchUserProfile } = useGamerProfile();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const res: any = await fetchUserProfile();
      if (res) {
        setUserName(res?.name_cased);
        setAvatar(res?.avatar);
        sendUserId(res?.id);
        return;
      }
    };
    if (isLoggedIn) {
      void fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    if (totalAccrued) setMockAccumulated(totalAccrued);
  }, [totalAccrued]);

  const handleClaimNFTL = useCallback(async () => {
    // eslint-disable-next-line no-console
    if (DEBUG) console.log('claim', tokenIndices, totalAccrued);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
    setMockAccumulated(0);
    setTimeout(refreshClaimableNFTL, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenIndices, totalAccrued, tx, writeContracts]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor={palette.background.default}
      borderRadius={2}
      p={4}
      sx={{ border: `1px solid ${palette.grey[800]}` }}
    >
      <Avatar alt="avatar" src={avatar?.url} sx={{ height: 80, width: 80 }} />
      <Stack direction="column" alignItems="center" marginY={2}>
        <Typography>
          {username ||
            `${address.slice(0, 5)}...${address.slice(
              address.length - 5,
              address.length - 1,
            )}`}
        </Typography>
      </Stack>
      <Stack direction="column" alignItems="center" marginY={2}>
        {loading ? (
          <Skeleton variant="text" animation="wave" width={80} />
        ) : (
          <Typography variant="h4">
            {mockAccumulated ? formatNumberToDisplay(mockAccumulated) : '0.00'}{' '}
            NFTL
          </Typography>
        )}
        <Typography>Available to Claim</Typography>
      </Stack>
      <ConnectWrapper fullWidth>
        <Button
          variant="contained"
          fullWidth
          disabled={!(mockAccumulated > 0.0 && writeContracts[NFTL_CONTRACT])}
          onClick={handleClaimNFTL}
        >
          Claim NFTL
        </Button>
      </ConnectWrapper>
    </Box>
  );
};

export default UserProfile;
