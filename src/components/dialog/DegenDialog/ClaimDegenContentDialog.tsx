'use client';

import { Button, Stack, Typography } from '@mui/material';
import { useCallback, useState, useContext, useEffect, useMemo } from 'react';
import type { Degen } from '@/types/degens';
import NetworkContext from '@/contexts/NetworkContext';
import useClaimableNFTL from '@/hooks/useClaimableNFTL';
import { NFTL_CONTRACT } from '@/constants/contracts';
import { DEBUG } from '@/constants/index';
import { formatNumberToDisplay } from '@/utils/numbers';

export interface ClaimDegenContentDialogProps {
  degen?: Degen;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ClaimDegenContentDialog = ({
  degen,
  onClose,
}: ClaimDegenContentDialogProps) => {
  const { tx, writeContracts } = useContext(NetworkContext);
  const tokenId: any = degen?.id;
  const tokenIndices = useMemo(() => [parseInt(tokenId, 10)], [tokenId]);
  const { totalAccrued, refetch } = useClaimableNFTL(tokenIndices);
  const [mockAccumulated, setMockAccumulated] = useState(0);
  useEffect(() => setMockAccumulated(totalAccrued), [totalAccrued]);

  const handleClaimNFTL = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      // eslint-disable-next-line no-console
      if (DEBUG) console.log('claim', tokenIndices, totalAccrued);
      await tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
      setMockAccumulated(0);
      setTimeout(() => refetch(), 5000);
      onClose?.(event);
    },
    [onClose, refetch, tokenIndices, totalAccrued, tx, writeContracts],
  );

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClose?.(event);
    },
    [onClose],
  );

  const amountParsed = formatNumberToDisplay(mockAccumulated);

  return (
    <Stack padding={3} gap={2}>
      <Typography
        align="center"
        variant="h4"
      >{`${amountParsed} claimable for this DEGEN`}</Typography>
      <Stack gap={1}>
        <Button
          disabled={!(mockAccumulated > 0.0 && writeContracts[NFTL_CONTRACT])}
          variant="contained"
          onClick={handleClaimNFTL}
        >
          Claim
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </Stack>
    </Stack>
  );
};

export default ClaimDegenContentDialog;
