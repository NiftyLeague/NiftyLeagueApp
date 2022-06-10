import { FC, useContext, useEffect, useMemo, useState } from 'react';
import {
  Container,
  Dialog,
  Stack,
  DialogTitle,
  Icon,
  Typography,
  Divider,
  TextField,
  useTheme,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  Link,
} from '@mui/material';
import { DialogProps } from 'types/dialog';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import { NetworkContext } from 'NetworkProvider';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import { useQuery } from '@apollo/client';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { CHARACTERS_SUBGRAPH_INTERVAL } from '../../constants';
import { Owner } from 'types/graph';
import { formatNumberToDisplay } from 'utils/numbers';

interface BuyArcadeTokensDialogProps extends DialogProps {
  open: boolean;
  onClose: any;
}

const BuyArcadeTokensDialog: FC<BuyArcadeTokensDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  const { palette } = useTheme();
  const [agreement, setAgreement] = useState<boolean>(false);
  const [isPending /*, setIsPending*/] = useState<boolean>(false);
  const [tokenCount, setTokenCount] = useState<number>(1);
  const { address, writeContracts } = useContext(NetworkContext);
  const { /*loading,*/ data }: { loading: boolean; data?: { owner: Owner } } =
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
  // const [refreshKey, setRefreshKey] = useState(0);
  const totalAccumulated = useClaimableNFTL(
    writeContracts,
    tokenIndices,
    0,
    // refreshKey,
  );

  useEffect(() => {
    if (totalAccumulated) setMockAccumulated(totalAccumulated);
  }, [totalAccumulated]);

  const updateTokenCount = (v: number | string) => {
    const value = Number(v);
    if (!Number.isNaN(value) && value > 0) {
      setTokenCount(value);
    }
  };

  return (
    <Dialog open={open} {...rest} maxWidth="xs">
      <Container>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          position="relative"
        >
          <DialogTitle>Buy Arcade Token</DialogTitle>
          <Icon
            sx={{
              position: 'absolute',
              right: 0,
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </Icon>
        </Stack>
        <Divider />
        <Typography textAlign="center" mt={2}>
          <Typography>
            Arcade tokens give you an all-access pass to play arcade games. This
            is a one-way purchase. Arcade tokens{' '}
            <span
              style={{
                color: palette.error.main,
              }}
            >
              cannot
            </span>{' '}
            be redeemed back for NFTL
          </Typography>
          <Typography my={2}>1000 NFTL Each</Typography>
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <RemoveIcon
            sx={{ fontSize: 50, fill: palette.grey[400] }}
            onClick={() => updateTokenCount(tokenCount - 1)}
          />
          <TextField
            variant="outlined"
            sx={{
              width: '100px',
            }}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              style: {
                textAlign: 'center',
              },
            }}
            value={tokenCount}
            onChange={(e) => updateTokenCount(e.target.value)}
          />
          <AddIcon
            sx={{ fontSize: 50, fill: palette.grey[400] }}
            onClick={() => updateTokenCount(tokenCount + 1)}
          />
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
          }}
        >
          <Typography
            color={
              mockAccumulated && mockAccumulated > tokenCount * 1000
                ? palette.success.main
                : palette.dark.light
            }
          >
            Bal:{' '}
            {mockAccumulated ? formatNumberToDisplay(mockAccumulated) : '0.00'}{' '}
            NFTL
          </Typography>
          <Typography>Total: {tokenCount} AT</Typography>
          {mockAccumulated > 0 && mockAccumulated < tokenCount * 1000 && (
            <Typography variant="caption" color={palette.warning.main}>
              Balance is too low, <Link color="#2f80ed">buy NFTL</Link>
            </Typography>
          )}
          {!mockAccumulated && (
            <Typography variant="caption" color={palette.error.main}>
              You have zero balance; <Link color="#2f80ed">buy NFTL</Link>
            </Typography>
          )}
        </Box>
        <FormControl sx={{ my: 2 }}>
          <FormControlLabel
            label={
              <Typography variant="caption">
                I understand all the information above about the arcade token
                purchase
              </Typography>
            }
            control={
              <Checkbox
                value={agreement}
                onChange={(event) => setAgreement(event.target.checked)}
              />
            }
          />
        </FormControl>
        <LoadingButton
          variant="contained"
          fullWidth
          onClick={() => {}}
          disabled={
            !agreement ||
            !mockAccumulated ||
            mockAccumulated < tokenCount * 1000
          }
          loading={isPending}
        >
          {!agreement ? 'Accept Terms to Continue' : 'Buy'}
        </LoadingButton>
      </Container>
    </Dialog>
  );
};

export default BuyArcadeTokensDialog;
