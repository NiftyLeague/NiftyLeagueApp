import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
} from '@mui/material';
import { DialogProps } from 'types/dialog';
import { sendEvent } from 'utils/google-analytics';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import { NetworkContext } from 'NetworkProvider';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import { useQuery } from 'react-query';
import { useQuery as useGraphQuery } from '@apollo/client';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { CHARACTERS_SUBGRAPH_INTERVAL } from '../../constants';
import { Owner } from 'types/graph';
import { formatNumberToDisplay } from 'utils/numbers';
import { GET_PRODUCT, PURCHASE_ARCADE_TOKEN_BALANCE_API } from 'constants/url';
import arcadeToken from 'assets/images/icons/arcade_token.png';

const PRODUCT_ID = 'arcade-token-four-pack';

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
  const [showError, setShowError] = useState<boolean>(false);
  const [isPending /*, setIsPending*/] = useState<boolean>(false);
  const [tokenCount, setTokenCount] = useState<number>(1);
  const { address, writeContracts } = useContext(NetworkContext);
  const { /*loading,*/ data }: { loading: boolean; data?: { owner: Owner } } =
    useGraphQuery(OWNER_QUERY, {
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

  const fetchArcadeTokenDetails = useCallback(async () => {
    const response = await fetch(GET_PRODUCT(PRODUCT_ID, 'nftl'), {
      method: 'GET',
      headers: {
        authorizationToken: window.localStorage.getItem(
          'authentication-token',
        ) as string,
      },
    });
    const body = await response.json();
    return body;
  }, []);

  useEffect(() => {
    if (totalAccumulated) setMockAccumulated(totalAccumulated);
  }, [totalAccumulated]);
  useEffect(() => {
    if (open) {
      sendEvent('Buy Arcade Token Started', 'marketplace');
    }
  }, [open]);

  const {
    data: details,
    isLoading: isDetailsPending,
    error,
  } = useQuery<any>('arcade-token-details', fetchArcadeTokenDetails, {
    enabled: open,
  });

  const updateTokenCount = (v: number | string) => {
    const value = Number(v);
    if (!Number.isNaN(value) && value > 0) {
      setTokenCount(value);
    }
  };

  const purchaseArcadeToken = useCallback(async () => {
    try {
      const response = await fetch(PURCHASE_ARCADE_TOKEN_BALANCE_API, {
        method: 'post',
        headers: {
          authorizationToken: window.localStorage.getItem(
            'authentication-token',
          ) as string,
        },
        body: JSON.stringify({
          id: PRODUCT_ID,
          currency: details.currency,
          price: details.price,
          quantity: tokenCount,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      sendEvent('Buy Arcade Token Complete', 'marketplace');
      onClose();
    } catch {
      setShowError(true);
    }
  }, [tokenCount, details, onClose]);
  const handleHideError = () => {
    setShowError(false);
  };

  return (
    <Dialog open={open} {...rest} maxWidth="xs">
      <Container>
        <>
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
          {(isDetailsPending || error) && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              width="390px"
              height="300px"
            >
              <>
                {isDetailsPending && <CircularProgress />}
                {error && (
                  <Typography variant="h4">Something went wrong!</Typography>
                )}
              </>
            </Stack>
          )}
          {!error && !isDetailsPending && details && (
            <>
              <Typography textAlign="center" mt={2}>
                <Typography>
                  To play an arcade game, you need at least 1 arcade token.
                  Arcade tokens are sold in packs containing{' '}
                  {details.items['arcade-token']} tokens (i.e 1 pack ={' '}
                  {details.items['arcade-token']} tokens)
                </Typography>
                <Typography my={2}>{details.price} NFTL Each</Typography>
              </Typography>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                mb={3}
              >
                <RemoveIcon
                  sx={{
                    fontSize: 50,
                    fill: palette.grey[400],
                    cursor: 'pointer',
                  }}
                  onClick={() => updateTokenCount(tokenCount - 1)}
                />
                <TextField
                  variant="outlined"
                  sx={{
                    width: '100px',
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">PACK</InputAdornment>
                    ),
                    inputProps: {
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      style: {
                        textAlign: 'center',
                      },
                    },
                  }}
                  value={tokenCount}
                  onChange={(e) => updateTokenCount(e.target.value)}
                />
                <AddIcon
                  sx={{
                    fontSize: 50,
                    fill: palette.grey[400],
                    cursor: 'pointer',
                  }}
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
                    mockAccumulated &&
                    mockAccumulated > tokenCount * details.price
                      ? palette.success.main
                      : palette.dark.light
                  }
                  fontWeight="500"
                >
                  Bal:{' '}
                  {mockAccumulated
                    ? formatNumberToDisplay(mockAccumulated)
                    : '0.00'}{' '}
                  NFTL
                </Typography>
                <Typography fontWeight="500" display="flex">
                  Total:{' '}
                  <Box
                    component="img"
                    src={arcadeToken}
                    alt=""
                    width="16px"
                    mx={0.5}
                  />{' '}
                  {tokenCount * details.items['arcade-token']} Arcade Tokens
                </Typography>
                {mockAccumulated > 0 &&
                  mockAccumulated < tokenCount * details.price && (
                    <Typography
                      variant="caption"
                      color={palette.warning.main}
                      my={1}
                    >
                      Balance is too low, <Link>buy NFTL</Link>
                    </Typography>
                  )}
                {!mockAccumulated && (
                  <Typography
                    variant="caption"
                    color={palette.error.main}
                    my={1}
                  >
                    You have zero balance; <Link>buy NFTL</Link>
                  </Typography>
                )}
              </Box>
              <FormControl sx={{ my: 2 }}>
                <FormControlLabel
                  label={
                    <Typography variant="caption">
                      I understand all the information above about the arcade
                      token purchase
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
                onClick={purchaseArcadeToken}
                disabled={
                  !agreement ||
                  !mockAccumulated ||
                  mockAccumulated < tokenCount * details.price
                }
                loading={isPending}
                sx={{ mb: 2 }}
              >
                {!agreement ? 'Accept Terms to Continue' : 'Buy'}
              </LoadingButton>
            </>
          )}
          <Snackbar
            open={showError}
            autoHideDuration={6000}
            onClose={handleHideError}
          >
            <Alert
              onClose={handleHideError}
              severity="error"
              sx={{ width: '100%' }}
            >
              Something went wrong!
            </Alert>
          </Snackbar>
        </>
      </Container>
    </Dialog>
  );
};

export default BuyArcadeTokensDialog;
