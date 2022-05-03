import { Button, Stack, Typography } from '@mui/material';
import { useCallback, useState, useContext, useEffect } from 'react';
import { Degen } from 'types/degens';
import { NetworkContext } from 'NetworkProvider';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import { NFTL_CONTRACT } from 'constants/contracts';
import { DEBUG } from 'constants/index';

export interface ClaimDegenContentDialogProps {
  degen?: Degen;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ClaimDegenContentDialog = ({
  degen,
  onClose,
}: ClaimDegenContentDialogProps) => {
  const { tx, writeContracts } = useContext(NetworkContext);
  const [mockAccumulated, setMockAccumulated] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const tokenId: any = degen?.id;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tokenIndices = [parseInt(tokenId, 10)];
  const totalAccumulated = useClaimableNFTL(
    writeContracts,
    tokenIndices,
    refreshKey,
  );
  useEffect(() => {
    if (totalAccumulated) setMockAccumulated(totalAccumulated);
  }, [totalAccumulated]);

  const handleClaimNFTL = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      // eslint-disable-next-line no-console
      if (DEBUG) console.log('claim', tokenIndices, totalAccumulated);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
      setMockAccumulated(0);
      setTimeout(() => setRefreshKey(Math.random() + 1), 5000);
      onClose?.(event);
    },
    [totalAccumulated, tx, writeContracts, onClose, tokenIndices],
  );

  const amountParsed = mockAccumulated.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Stack padding={3} gap={2}>
      <Typography>{`${amountParsed} claimable for this DEGEN`}</Typography>

      <Button
        disabled={!(mockAccumulated > 0.0 && writeContracts[NFTL_CONTRACT])}
        variant="contained"
        onClick={handleClaimNFTL}
      >
        Claim
      </Button>
    </Stack>
  );
};

export default ClaimDegenContentDialog;
