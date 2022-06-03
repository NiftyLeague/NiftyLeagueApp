import { Button, Stack, Typography } from '@mui/material';
import { useCallback, useState, useContext, useEffect } from 'react';
import { Degen } from 'types/degens';
import { NetworkContext } from 'NetworkProvider';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import { NFTL_CONTRACT } from 'constants/contracts';
import { DEBUG } from 'constants/index';
import { useTheme } from '@mui/material/styles';
import { formatNumberToDisplay } from 'utils/numbers';

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

  const theme = useTheme();
  const amountParsed = formatNumberToDisplay(mockAccumulated);

  return (
    <Stack
      sx={{
        minWidth: '292px',
        minHeight: '457.7px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.default,
        padding: '0px 12px',
      }}
      padding={3}
      gap={2}
    >
      <Stack></Stack>
      <Stack
        sx={{
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
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
