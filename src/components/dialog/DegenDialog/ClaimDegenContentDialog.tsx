import { Button, Stack, Typography, Link, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { useCallback, useState, useContext, useEffect } from 'react';
import { Degen } from 'types/degens';
import { NetworkContext } from 'NetworkProvider';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import { NFTL_CONTRACT } from 'constants/contracts';
import { DEBUG } from 'constants/index';
import { formatNumberToDisplay } from 'utils/numbers';
import DegenImage from 'components/cards/DegenCard/DegenImage';
import HeaderDegenDialog from './HeaderDegenDialog';

const useStyles = makeStyles({
  root: {
    width: 438,
    height: 230,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    padding: '0px 24px',
  },
  header: {
    fontFamily: 'Press Start 2P',
    display: 'flex',
    flexDirection: 'row',
    padding: '12px 0px 24px 0px',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: '#777 solid 1px',
  },
  subHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSubHeader: {
    marginBottom: 0,
    marginLeft: 24,
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
    width: '100%',
  },
  amount: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wFull: {
    width: '100%',
  },
});

export interface ClaimDegenContentDialogProps {
  degen?: Degen;
  onClose?: (event: React.MouseEvent) => void;
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
    async (event: React.MouseEvent) => {
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
  const handleClose = useCallback(
    (event: React.MouseEvent) => {
      onClose?.(event);
    },
    [onClose],
  );
  const amountParsed = formatNumberToDisplay(mockAccumulated);
  const classes = useStyles();
  const { palette } = useTheme();
  return (
    <Stack className={classes.root}>
      <Stack gap={1}>
        <HeaderDegenDialog degen={degen} />
      </Stack>
      <Stack className={classes.header}>
        <Stack className={classes.subHeader}>
          {tokenId && <DegenImage tokenId={tokenId} imageHeight={29} />}
          <Typography
            gutterBottom
            variant="h3"
            className={classes.leftSubHeader}
          >
            {degen?.name || 'No Name DEGEN'}
          </Typography>
        </Stack>
        <Stack className={classes.subHeader}>
          <Link
            href={
              tokenId
                ? `https://opensea.io/assets/0x986aea67c7d6a15036e18678065eb663fc5be883/${tokenId}`
                : '#'
            }
            target="_blank"
            rel="nofollow"
            variant="body2"
            color={palette.text.secondary}
          >
            {`#${tokenId}`}
          </Link>
          <CloseFullscreenIcon
            className={classes.leftSubHeader}
            onClick={handleClose}
            fontSize="small"
          />
        </Stack>
      </Stack>
      <Stack className={classes.body}>
        <Stack className={classes.amount}>
          <Typography
            align="center"
            variant="h2"
          >{`${amountParsed} NFTL`}</Typography>
          <Typography>Available to Claim</Typography>
        </Stack>

        <Stack gap={1} className={classes.wFull}>
          <Button
            disabled={!(mockAccumulated > 0.0 && writeContracts[NFTL_CONTRACT])}
            variant="contained"
            onClick={handleClaimNFTL}
          >
            Claim NFTL
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ClaimDegenContentDialog;
