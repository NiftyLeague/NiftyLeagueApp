import {
  Avatar,
  Box,
  Button,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Blockies from 'react-blockies';
import { NetworkContext } from 'NetworkProvider';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Owner } from 'types/graph';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import { NFTL_CONTRACT } from 'constants/contracts';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { sendEvent } from 'utils/google-analytics';
import { formatNumberToDisplay } from 'utils/numbers';
import { CHARACTERS_SUBGRAPH_INTERVAL, DEBUG } from '../../../../../constants';
import { ENGAGEMENT_CATEGORY, LOGIN_EVENT } from 'constants/analytics';

export interface UserProfileProps {}

const UserProfile: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<UserProfileProps>>
> = () => {
  const { palette } = useTheme();
  const { address, loadWeb3Modal, web3Modal, writeContracts, tx } =
    useContext(NetworkContext);

  const { loading, data }: { loading: boolean; data?: { owner: Owner } } =
    useQuery(OWNER_QUERY, {
      pollInterval: CHARACTERS_SUBGRAPH_INTERVAL,
      variables: { address: address?.toLowerCase() },
      skip: !address,
    });

  const characters = useMemo(() => {
    const characterList = data?.owner?.characters
      ? [...data.owner.characters]
      : [];
    return characterList.sort(
      (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10),
    );
  }, [data]);

  const tokenIndices = useMemo(
    () => characters.map((char) => parseInt(char.id, 10)),
    [characters],
  );

  const [mockAccumulated, setMockAccumulated] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const totalAccumulated = useClaimableNFTL(
    writeContracts,
    tokenIndices,
    refreshKey,
  );

  useEffect(() => {
    if (totalAccumulated) setMockAccumulated(totalAccumulated);
  }, [totalAccumulated]);

  const handleClaimNFTL = useCallback(async () => {
    // eslint-disable-next-line no-console
    if (DEBUG) console.log('claim', tokenIndices, totalAccumulated);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
    setMockAccumulated(0);
    setTimeout(() => setRefreshKey(Math.random() + 1), 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenIndices, totalAccumulated, tx, writeContracts]);

  const handleConnectWallet = useCallback(() => {
    sendEvent(LOGIN_EVENT, ENGAGEMENT_CATEGORY, 'method');
    loadWeb3Modal();
  }, [loadWeb3Modal]);

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
      <Avatar alt="avatar" sx={{ height: 80, width: 80 }}>
        <Blockies seed={address.toLowerCase()} size={80} className="blockies" />
      </Avatar>
      <Stack direction="column" alignItems="center" marginY={2}>
        {/* Hidden the name */}
        {/* <Typography variant="h4">Unkown</Typography> */}
        <Typography>{address.substring(0, 6)}</Typography>
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
      {web3Modal.cachedProvider ? (
        <Button
          variant="contained"
          fullWidth
          disabled={!(mockAccumulated > 0.0 && writeContracts[NFTL_CONTRACT])}
          onClick={handleClaimNFTL}
        >
          Claim NFTL
        </Button>
      ) : (
        <Button variant="contained" fullWidth onClick={handleConnectWallet}>
          Connect Wallet
        </Button>
      )}
    </Box>
  );
};

export default UserProfile;
