import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Theme,
  Tooltip,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useQuery } from '@apollo/client';
import useRentalPassCount from 'hooks/useRentalPassCount';
import useAccount from 'hooks/useAccount';
import { Degen } from 'types/degens';
import { ethers } from 'ethers';
import useRent from 'hooks/useRent';
import { toast } from 'react-toastify';
import DegenImage from 'components/cards/DegenCard/DegenImage';
import { NetworkContext } from 'NetworkProvider';
import { sendEvent } from 'utils/google-analytics';
import TermsOfServiceDialog from '../TermsOfServiceDialog';
import { Owner } from 'types/graph';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { CHARACTERS_SUBGRAPH_INTERVAL } from '../../../constants';
import { GOOGLE_ANALYTICS } from 'constants/google-analytics';
import RentStepper from './RentStepper';
import { NFTL_PURCHASE_URL } from 'constants/url';
import { formatNumberToDisplay } from 'utils/numbers';

export interface RentDegenContentDialogProps {
  degen?: Degen;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& button': {
      height: 28,
      borderRadius: '2px',
    },
    '& h5': {
      fontSize: '13px',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    '& p,span': {
      fontSize: '13px',
      lineHeight: 1.2,
    },
  },
  greyText: {
    color: '#4C4F52',
  },
  input: {
    padding: '8px 8px 4px 8px',
    fontSize: '11px',
    '&::placeholder': {
      fontSize: '11px',
    },
  },
  formHelper: {
    marginLeft: 0,
  },
  inputCheck: {
    padding: 4,
    '& .MuiSvgIcon-root': {
      width: '0.75em',
      height: '0.75em',
    },
  },
  inputCheckFormControl: {
    marginLeft: -4,
    marginRight: 0,
  },
  successInfo: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: 1.25,
  },
  closeBtn: {
    position: 'absolute',
    right: 12,
    top: 6,
    color: '#5820D6',
    border: '1px solid #5820D6',
    borderRadius: '50% !important',
    width: '20px',
    height: '20px !important',
    zIndex: 1,
    '& .MuiSvgIcon-root': {
      width: 16,
      height: 16,
    },
    [theme.breakpoints.down('md')]: {
      right: 20,
      top: 20,
    },
  },
}));

const RentDegenContentDialog = ({
  degen,
  onClose,
}: RentDegenContentDialogProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loadWeb3Modal, address, web3Modal } = useContext(NetworkContext);
  const [refreshAccKey, setRefreshAccKey] = useState(0);
  const { account } = useAccount(refreshAccKey);
  const [agreement, setAgreement] = useState<boolean>(
    localStorage.getItem('aggreement-accepted') === 'ACCEPTED',
  );
  const [rentFor, setRentFor] = useState<string>('myself');
  const [ethAddress, setEthAddress] = useState<string>('');
  const [isUseRentalPass, setIsUseRentalPass] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [checkBalance, setCheckBalance] = useState<boolean>(false);
  const [rentSuccess, setRentSuccess] = useState<boolean>(false);
  const [openTOS, setOpenTOS] = useState<boolean>(false);
  const [disabledRentFor, setDisabledRentFor] = useState<boolean>(false);
  const { data: userDegens }: { loading: boolean; data?: { owner: Owner } } =
    useQuery(OWNER_QUERY, {
      pollInterval: CHARACTERS_SUBGRAPH_INTERVAL,
      variables: { address: address?.toLowerCase() },
      skip: !address,
    });

  const isDegenOwner = useMemo(
    () => (userDegens?.owner?.characterCount ?? 0) > 0,
    [userDegens?.owner?.characterCount],
  );

  const accountBalance = account?.balance ?? 0;
  const sufficientBalance = useMemo(
    () => accountBalance >= (degen?.price || 0),
    [accountBalance, degen?.price],
  );

  useEffect(() => {
    if (!degen || degen?.background === 'common') return;
    if (!isDegenOwner) {
      setRentFor('myself');
      setDisabledRentFor(true);
    } else {
      setDisabledRentFor(false);
      // Once api is ready,
      // need to check if user has reached out to max Sponsorship cap, then disable RentFor option
    }
  }, [degen, isDegenOwner]);

  const [, , rentalPassCount] = useRentalPassCount(degen?.id);
  const rent = useRent(
    degen?.id,
    degen?.rental_count || 0,
    degen?.price || 0,
    ethAddress,
    isUseRentalPass,
  );

  const theme = useTheme();

  const handleChangeRentingFor = (
    _: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (value === 'recruit') {
      sendEvent(
        GOOGLE_ANALYTICS.EVENTS.RENTAL_RECRUIT_CLICKED,
        GOOGLE_ANALYTICS.CATEGORIES.ECOMMERCE,
      );
    }
    setRentFor(value);
  };

  const handleChangeUseRentalPass = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      sendEvent(
        GOOGLE_ANALYTICS.EVENTS.RENTAL_PASS_CLICKED,
        GOOGLE_ANALYTICS.CATEGORIES.ECOMMERCE,
      );
    }
    setIsUseRentalPass(event.target.checked);
  };

  const validateAddress = (value: string) => {
    setEthAddress(value);
    if (!ethers.utils.isAddress(value)) {
      setAddressError('Address is invalid!');
    } else if (!value) {
      setAddressError('Please input an address');
    } else {
      setAddressError('');
    }
  };

  const handleRent = useCallback(async () => {
    if (!web3Modal.cachedProvider) {
      toast.error(
        'Your wallet is not connected, please connect your wallet to attempt to rent a DEGEN',
        { theme: 'dark' },
      );
      return;
    }

    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.BEGIN_CHECKOUT,
      GOOGLE_ANALYTICS.CATEGORIES.ECOMMERCE,
    );

    setLoading(true);
    try {
      await rent();
      setLoading(false);
      setRentSuccess(true);

      sendEvent(
        GOOGLE_ANALYTICS.EVENTS.PURCHASE,
        GOOGLE_ANALYTICS.CATEGORIES.ECOMMERCE,
      );
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message, { theme: 'dark' });
    }
  }, [web3Modal.cachedProvider, rent]);

  const isShowRentalPassOption = () =>
    rentalPassCount > 0 && !degen?.rental_count;

  useEffect(() => {
    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.ADD_TO_CART,
      GOOGLE_ANALYTICS.CATEGORIES.ECOMMERCE,
    );
  }, []);

  const openTOSDialog = (event) => {
    event.preventDefault();
    setOpenTOS(true);
  };

  const handleTOSDialogClose = (event, reason) => {
    if (reason === 'accepted') {
      setAgreement(true);
      localStorage.setItem('aggreement-accepted', 'ACCEPTED');
    }
    setOpenTOS(false);
  };

  const handleAgreementChange = (event) => {
    setAgreement(event.target.checked);
    if (event.target.checked) {
      localStorage.setItem('aggreement-accepted', 'ACCEPTED');
    } else {
      localStorage.removeItem('aggreement-accepted');
    }
  };

  const handleConnectWallet = useCallback(() => {
    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.RENTAL_CONNECT_WALLET_CLICKED,
      GOOGLE_ANALYTICS.CATEGORIES.ENGAGEMENT,
      'method',
    );
    loadWeb3Modal();
  }, [loadWeb3Modal]);

  const handleRefreshBalance = () => {
    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.RENTAL_REFRESH_BALANCE_CLICKED,
      GOOGLE_ANALYTICS.CATEGORIES.ECOMMERCE,
      'method',
    );
    setRefreshAccKey(Math.random());
  };

  const handleGoCheckBalance = () => {
    if (rentFor === 'recruit' && !ethAddress) {
      setAddressError('Please input an address.');
      return;
    }

    if (rentFor === 'recruit' && Boolean(addressError)) {
      return;
    }

    if (rentFor === 'myself') {
      setEthAddress('');
    }

    setCheckBalance(true);
    setRefreshAccKey(Math.random());
  };

  const handleClickPlay = useCallback(() => {
    navigate('/games/smashers');
  }, [navigate]);

  const handleBuyNFTL = () => {
    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.RENTAL_BUY_NFTL_CLICKED,
      GOOGLE_ANALYTICS.CATEGORIES.ECOMMERCE,
    );
  };

  return (
    <>
      <Stack
        rowGap={{ xs: 6, lg: 2 }}
        mx={{ xs: 2, sm: 7.5 }}
        className={classes.root}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={classes.closeBtn}
        >
          <CloseIcon />
        </IconButton>
        <RentStepper rentSuccess={rentSuccess} checkBalance={checkBalance} />
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          width="100%"
          p={1}
          sx={{ backgroundColor: '#262930' }}
        >
          <Typography variant="h5">Rental Overview</Typography>
        </Box>
        <Stack direction="row" spacing={1.6} mt={0.5}>
          <Stack direction="column">
            <Stack direction="row" justifyContent="center">
              {degen?.id && (
                <DegenImage
                  sx={{
                    objectFit: 'contain',
                    width: 108,
                    height: 120,
                    borderRadius: '10px',
                    border: '1px solid #000000',
                  }}
                  tokenId={degen.id}
                />
              )}
            </Stack>
            <Stack direction="column" alignItems="center" mt={0.5}>
              <Typography
                sx={{ fontSize: '10px', lineHeight: 2, color: '#535659' }}
              >
                Owned by {degen?.owner?.substring(0, 5)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="column" width="100%">
            {rentSuccess ? (
              <Stack
                direction="column"
                width="100%"
                spacing={1}
                height="120px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" className={classes.successInfo} mt={2}>
                  Congratulations!
                </Typography>
                <Typography variant="h6" className={classes.successInfo}>
                  Your rental is active.
                </Typography>
                <Button variant="contained" fullWidth onClick={handleClickPlay}>
                  Play Nifty Smasher Now
                </Button>
              </Stack>
            ) : (
              <Stack
                direction="column"
                width="100%"
                spacing={1}
                height="120px"
                justifyContent="space-between"
              >
                <Stack
                  direction="column"
                  display={checkBalance ? 'none' : 'flex'}
                >
                  <Typography sx={{ fontSize: '10px', lineHeight: 2 }}>
                    Who are you renting for?
                  </Typography>
                  <RadioGroup
                    row
                    onChange={handleChangeRentingFor}
                    value={rentFor}
                  >
                    <FormControlLabel
                      value="myself"
                      control={<Radio size="small" sx={{ py: 0.5 }} />}
                      label="Myself"
                    />
                    <FormControlLabel
                      value="recruit"
                      control={<Radio size="small" sx={{ py: 0.5 }} />}
                      label={
                        <Box display="flex" alignItems="center">
                          <Typography>Recruit</Typography>
                          {disabledRentFor && (
                            <Tooltip title="DEGEN ownership is required to sponsor Recruits on this DEGEN.">
                              <InfoOutlinedIcon
                                fontSize="small"
                                sx={{
                                  ml: 0.5,
                                  mt: -1.5,
                                  width: '16px',
                                  height: '16px',
                                }}
                              />
                            </Tooltip>
                          )}
                        </Box>
                      }
                      disabled={disabledRentFor}
                    />
                  </RadioGroup>
                  {rentFor === 'recruit' && (
                    <Stack direction="column" alignItems="center">
                      <FormControl fullWidth>
                        <TextField
                          placeholder="Paste your recruit’s eth address"
                          name="address"
                          variant="outlined"
                          fullWidth
                          value={ethAddress}
                          error={addressError !== ''}
                          helperText={addressError}
                          onChange={(event) =>
                            validateAddress(event.target.value)
                          }
                          inputProps={{
                            className: classes.input,
                          }}
                          FormHelperTextProps={{
                            className: classes.formHelper,
                          }}
                        />
                      </FormControl>
                    </Stack>
                  )}
                </Stack>
                <Stack direction="column" spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Rental Cost:</Typography>
                    <Typography
                      sx={{
                        textDecoration: isUseRentalPass
                          ? 'line-through'
                          : 'none',
                      }}
                    >{`${formatNumberToDisplay(
                      degen?.price || 0,
                    )} NFTL`}</Typography>
                  </Stack>
                  {checkBalance && (
                    <Stack direction="column">
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>Balance:</Typography>
                        <Typography
                          color={sufficientBalance ? '#007B60' : '#B51424'}
                        >{`${
                          accountBalance
                            ? formatNumberToDisplay(accountBalance)
                            : '0.00'
                        } NFTL`}</Typography>
                      </Stack>
                      {!sufficientBalance && (
                        <Typography variant="caption" mt={0.5} ml="auto">
                          Balance low.{' '}
                          <Link
                            href={NFTL_PURCHASE_URL}
                            target="_blank"
                            rel="noreferrer"
                            onClick={handleBuyNFTL}
                          >
                            Buy NFTL now
                          </Link>
                        </Typography>
                      )}
                    </Stack>
                  )}
                </Stack>
                <Stack direction="column" spacing={1}>
                  {checkBalance && isShowRentalPassOption() && (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <FormControl>
                        <FormControlLabel
                          label={
                            <Typography variant="caption">
                              Rental Pass
                            </Typography>
                          }
                          control={
                            <Checkbox
                              size="small"
                              checked={isUseRentalPass}
                              onChange={handleChangeUseRentalPass}
                              className={classes.inputCheck}
                            />
                          }
                          className={classes.inputCheckFormControl}
                        />
                      </FormControl>
                      {isUseRentalPass && (
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          width="100px"
                        >
                          <Typography>Balance:</Typography>
                          <Typography color="#5820D6">
                            {rentalPassCount}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  )}
                  {web3Modal.cachedProvider ? (
                    !checkBalance ? (
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleGoCheckBalance}
                      >
                        Next
                      </Button>
                    ) : sufficientBalance || isUseRentalPass ? (
                      <Stack direction="column" spacing={1}>
                        <LoadingButton
                          variant="contained"
                          fullWidth
                          onClick={handleRent}
                          loading={loading}
                          disabled={!agreement}
                        >
                          Rent
                        </LoadingButton>
                        <FormControl fullWidth>
                          <FormControlLabel
                            label={
                              <Typography variant="caption">
                                I have read the
                                <Link
                                  sx={{
                                    mx: '4px',
                                    textDecoration: 'none',
                                    fontWeight: theme.typography.fontWeightBold,
                                  }}
                                  onClick={openTOSDialog}
                                >
                                  terms &amp; conditions
                                </Link>
                                regarding rentals
                              </Typography>
                            }
                            control={
                              <Checkbox
                                size="small"
                                checked={agreement}
                                onChange={handleAgreementChange}
                                className={classes.inputCheck}
                              />
                            }
                            className={classes.inputCheckFormControl}
                          />
                        </FormControl>
                        <TermsOfServiceDialog
                          open={openTOS}
                          onClose={handleTOSDialogClose}
                        />
                      </Stack>
                    ) : (
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleRefreshBalance}
                      >
                        Refresh Balance
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleConnectWallet}
                    >
                      Connect Wallet
                    </Button>
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
        <Stack direction="column" mb={6}>
          <Typography variant="h5" mt={4} mb={1.5}>
            Stats
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={6}>
              <Stack gap={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Multipliers</Typography>
                  <Typography className={classes.greyText}>
                    {degen?.multiplier}x
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Queue</Typography>
                  <Typography className={classes.greyText}>
                    {degen?.rental_count}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stack gap={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Rental period</Typography>
                  <Typography className={classes.greyText}>1 week</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Renewal Cost</Typography>
                  <Typography className={classes.greyText}>
                    {degen?.price_daily}/Day
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};

export default RentDegenContentDialog;
