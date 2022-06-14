import { Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useCallback, useState, useContext, useEffect } from 'react';
import { NetworkContext } from 'NetworkProvider';

import useClaimableNFTL from 'hooks/useClaimableNFTL';
import { NFTL_CONTRACT } from 'constants/contracts';
import { DEBUG } from 'constants/index';
import { formatNumberToDisplay } from 'utils/numbers';

import { Degen } from 'types/degens';
import HeaderDegen from './HeaderDegen';

import DegenContainer from './DegenContainer';

export interface DegenClaimProps {
  degen?: Degen;
  isDialog?: boolean;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  onBack?: React.MouseEventHandler<HTMLDivElement>;
  onFullScreen?: React.MouseEventHandler<HTMLDivElement>;
}

const DegenClaim = ({
  degen,
  isDialog,
  onClose,
  onBack,
  onFullScreen,
}: DegenClaimProps) => {
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
    async (event: React.MouseEvent) => {
      // eslint-disable-next-line no-console
      if (DEBUG) console.log('claim', tokenIndices, totalAccumulated);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
      setMockAccumulated(0);
      setTimeout(() => setRefreshKey(Math.random() + 1), 5000);
      onClose?.(event as any);
    },
    [totalAccumulated, tx, writeContracts, onClose, tokenIndices],
  );
  const amountParsed = formatNumberToDisplay(mockAccumulated);

  return (
    <DegenContainer
      isDialog={isDialog}
      sx={{
        minHeight: isDialog ? '230px' : '466px',
        width: isDialog ? '390px' : '100%',
      }}
    >
      <HeaderDegen
        degen={degen}
        isDialog={isDialog}
        onBack={onBack}
        onFullScreen={onFullScreen}
        onClose={onClose}
      />
      <Stack flex="1" justifyContent="center" alignItems="center">
        <Typography
          variant={isDialog ? 'paragraphLarge' : 'paragraphMedium'}
          fontWeight={isDialog ? '600' : '500'}
        >
          {`${amountParsed} NFTL`}
        </Typography>
        <Typography variant={isDialog ? 'paragraphSmall' : 'paragraphXSmall'}>
          Available to Claim
        </Typography>
      </Stack>
      <LoadingButton
        variant="contained"
        fullWidth
        onClick={handleClaimNFTL}
        disabled={!(mockAccumulated > 0.0 && writeContracts[NFTL_CONTRACT])}
      >
        Claim NFTL
      </LoadingButton>
    </DegenContainer>
  );
};

export default DegenClaim;
