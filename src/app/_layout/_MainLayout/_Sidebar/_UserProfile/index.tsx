'use client';

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useEnsAvatar, useEnsName } from 'wagmi';
import {
  Avatar,
  Box,
  Button,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { DEBUG } from '@/constants/index';
import { formatNumberToDisplay } from '@/utils/numbers';
import { NFTL_CONTRACT } from '@/constants/contracts';
import { sendUserId } from '@/utils/google-analytics';
import { useGamerProfile } from '@/hooks/useGamerProfile';
import type { ProfileAvatar } from '@/types/account';
import BalanceContext from '@/contexts/BalanceContext';
import ConnectWrapper from '@/components/wrapper/ConnectWrapper';
import NetworkContext from '@/contexts/NetworkContext';
import useAuth from '@/hooks/useAuth';

const ClaimNFTLView = () => {
  const { writeContracts, tx } = useContext(NetworkContext);
  const { totalAccrued, tokenIndices, loading, refreshClaimableNFTL } =
    useContext(BalanceContext);
  const [mockAccumulated, setMockAccumulated] = useState(0);

  useEffect(() => {
    if (totalAccrued) setMockAccumulated(totalAccrued);
  }, [totalAccrued]);

  const handleClaimNFTL = useCallback(async () => {
    // eslint-disable-next-line no-console
    if (DEBUG) console.log('CLAIM NFTL', tokenIndices, totalAccrued);
    await tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
    setMockAccumulated(0);
    setTimeout(refreshClaimableNFTL, 5000);
  }, [refreshClaimableNFTL, tokenIndices, totalAccrued, tx, writeContracts]);

  return (
    <>
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

      <Button
        variant="contained"
        fullWidth
        disabled={!(mockAccumulated > 0.0 && writeContracts[NFTL_CONTRACT])}
        onClick={handleClaimNFTL}
      >
        Claim NFTL
      </Button>
    </>
  );
};

const UserProfile = () => {
  const { palette } = useTheme();
  const { address } = useContext(NetworkContext);
  const ensName = useEnsName({ address, chainId: 1 });
  const ensAvatar = useEnsAvatar({ name: ensName.data, chainId: 1 });
  const [username, setUserName] = useState<string | undefined>();
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

  const displayName = useMemo(() => {
    if (username?.length) return username;
    if (!address) return 'Login to view dashboards';
    const addressSubstring = `${address?.slice(0, 5)}...${address?.slice(
      address.length - 5,
      address.length - 1,
    )}`;
    if (ensName.isError || ensName.isLoading) return addressSubstring;
    return ensName.data || addressSubstring;
  }, [ensName, username, address]);

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
      <Avatar
        alt="avatar"
        src={ensAvatar.data || avatar?.url}
        sx={{ height: 80, width: 80 }}
      />
      <Stack direction="column" alignItems="center" marginY={2}>
        <Typography>{displayName}</Typography>
      </Stack>
      <ConnectWrapper fullWidth>
        <ClaimNFTLView />
      </ConnectWrapper>
    </Box>
  );
};

export default UserProfile;
