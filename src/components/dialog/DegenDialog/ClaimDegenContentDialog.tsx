import { Button, Stack, Typography } from '@mui/material';
import { useCallback, useState, useContext, useEffect } from 'react';
import { Degen } from 'types/degens';
import { NetworkContext } from 'NetworkProvider';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import { NFTL_CONTRACT } from 'constants/contracts';
import { DEBUG } from 'constants/index';
import { useTheme } from '@mui/material/styles';
import { formatNumberToDisplay } from 'utils/numbers';
import HeaderDegenDialog from './HeaderDegenDialog';
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

  const { palette } = useTheme();
  const amountParsed = formatNumberToDisplay(mockAccumulated);
  return (
    <Stack
      sx={{
        backgroundColor: palette.background.default,
        padding: '0px 12px',
      }}
      direction="column"
      justifyContent="space-between"
      padding={3}
      gap={3}
      minWidth="292px"
      minHeight="457.7px"
      height="100%"
    >
      <Stack gap={1}>
        <HeaderDegenDialog degen={degen} />
      </Stack>
      <Stack
        sx={{
          color: palette.mode === 'dark' ? palette.grey[50] : palette.grey[900],
        }}
      >
        <Typography
          align="center"
          variant="paragraphMedium"
        >{`${amountParsed} NFTL`}</Typography>
        <Typography
          align="center"
          variant="paragraphXSmall"
        >{`Available to Claim`}</Typography>
      </Stack>
      <Stack gap={1}>
        <Button
          disabled={!(mockAccumulated > 0.0 && writeContracts[NFTL_CONTRACT])}
          variant="contained"
          onClick={handleClaimNFTL}
        >
          <Typography align="center" variant="paragraphP2XXSmall">
            Claim NFTL
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default ClaimDegenContentDialog;
