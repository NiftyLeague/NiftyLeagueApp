import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useQuery } from '@apollo/client';
import useRentalPassCount from 'hooks/useRentalPassCount';
import useRentalRenameFee from 'hooks/useRentalRenameFee';
import { Degen } from 'types/degens';
import { getErrorForName } from 'utils/name';
import { ethers } from 'ethers';
import useRent from 'hooks/useRent';
import useRentalRename from 'hooks/useRentalRename';
import { toast } from 'react-toastify';
import DegenImage from 'components/cards/DegenCard/DegenImage';
import { NetworkContext } from 'NetworkProvider';
import { sendEvent } from 'utils/google-analytics';
import TermsOfServiceDialog from '../TermsOfServiceDialog';
import { Owner } from 'types/graph';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { CHARACTERS_SUBGRAPH_INTERVAL } from '../../../constants';
import {
  ADD_TO_CART_EVENT,
  BEGIN_CHECKOUT_EVENT,
  ECOMMERCE_CATEGORY,
  PURCHASE_EVENT,
} from 'constants/analytics';

export interface RentDegenContentDialogProps {
  degen?: Degen;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RentDegenContentDialog = ({
  degen,
  onClose,
}: RentDegenContentDialogProps) => {
  const { address, web3Modal } = useContext(NetworkContext);
  const [agreement, setAgreement] = useState<boolean>(
    localStorage.getItem('aggreement-accepted') === 'ACCEPTED',
  );
  const [rentFor, setRentFor] = useState<string>('recruit');
  const [renameEnabled, setRenameEnabled] = useState<boolean>(false);
  const [ethAddress, setEthAddress] = useState<string>('');
  const [newDegenName, setNewDegenName] = useState<string>('');
  const [isUseRentalPass, setIsUseRentalPass] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>('');
  const [addressError, setAddressError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
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
  const rentDisabled =
    degen?.owner !== address.toLowerCase() && !degen?.is_active;

  useEffect(() => {
    if (!degen || degen?.background === 'common') return;
    if (!isDegenOwner) {
      setRentFor('myself');
      setDisabledRentFor(true);
    } else {
      // Once api is ready,
      // need to check if user has reached out to max Sponsorship cap, then disable RentFor option
    }
  }, [degen, isDegenOwner]);

  const [, , rentalPassCount] = useRentalPassCount(degen?.id);
  const [, , renameFee = 1000] = useRentalRenameFee(degen?.id);
  const rent = useRent(
    degen?.id,
    degen?.rental_count || 0,
    degen?.price,
    ethAddress,
    isUseRentalPass,
  );

  const theme = useTheme();

  const handleChangeRentingFor = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setRentFor(value);
  };

  const handleChangeRenameDegen = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setRenameEnabled(value === 'yes');
  };

  const handleChangeUseRentalPass = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setIsUseRentalPass(value === 'yes');
  };

  const validateName = (value: string) => {
    setNewDegenName(value);
    const errorMsg = getErrorForName(value);
    setNameError(errorMsg);
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

  const handleRent = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!web3Modal.cachedProvider) {
        toast.error(
          'Your wallet is not connected, please connect your wallet to attempt to rent a DEGEN',
          { theme: 'dark' },
        );
        return;
      }

      sendEvent(BEGIN_CHECKOUT_EVENT, ECOMMERCE_CATEGORY);

      setLoading(true);
      try {
        const myRental = await rent();

        // useRentalRename is actually not a hook, so we can safely use it here
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const renameRental = useRentalRename(
          degen?.id,
          myRental?.id,
          newDegenName,
        );

        if (renameEnabled) {
          await renameRental();
        }
        setLoading(false);
        toast.success('Rent successfully!', { theme: 'dark' });
        onClose?.(event);

        sendEvent(PURCHASE_EVENT, ECOMMERCE_CATEGORY);
      } catch (err: any) {
        setLoading(false);
        toast.error(err.message, { theme: 'dark' });
      }
    },
    [
      web3Modal.cachedProvider,
      rent,
      degen?.id,
      newDegenName,
      renameEnabled,
      onClose,
    ],
  );

  const precheckRent = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (rentFor === 'recruit' && !ethAddress) {
        setAddressError('Please input an address.');
        return;
      }

      if (renameEnabled && !newDegenName) {
        setNameError('Please input a name.');
        return;
      }

      handleRent(event);
    },
    [ethAddress, handleRent, newDegenName, renameEnabled, rentFor],
  );

  const degenPrice = isUseRentalPass ? 0 : degen?.price || 0;
  const isShowRentalPassOption = () =>
    rentalPassCount > 0 && !degen?.rental_count;

  useEffect(() => {
    sendEvent(ADD_TO_CART_EVENT, ECOMMERCE_CATEGORY);
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

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      <Grid item xs={12} sm={12} md={6}>
        <Stack direction="row" justifyContent="center">
          {degen?.id && (
            <DegenImage sx={{ objectFit: 'contain' }} tokenId={degen.id} />
          )}
        </Stack>
        <Stack direction="column" alignItems="center" gap={1} sx={{ my: 2 }}>
          <Typography color="gray">
            Owned by {degen?.owner?.substring(0, 5)}
          </Typography>
        </Stack>
        {rentDisabled ? (
          <Stack direction="column" alignItems="center" sx={{ my: 2 }}>
            <Typography>Owner has disabled this DEGEN from renting.</Typography>
          </Stack>
        ) : (
          <>
            <Stack direction="column" alignItems="center" sx={{ my: 2 }}>
              <Typography>Who are you renting for?</Typography>
              <RadioGroup row onChange={handleChangeRentingFor} value={rentFor}>
                <FormControlLabel
                  value="recruit"
                  control={<Radio />}
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
                <FormControlLabel
                  value="myself"
                  control={<Radio />}
                  label="Myself"
                />
              </RadioGroup>
            </Stack>
            {rentFor === 'recruit' && (
              <Stack
                direction="column"
                alignItems="center"
                gap={2}
                sx={{ my: 2 }}
              >
                <Typography textAlign="center">
                  What is your recruit&#39;s ETH wallet address?
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    placeholder="0xunkown"
                    name="address"
                    variant="outlined"
                    fullWidth
                    value={ethAddress}
                    error={addressError !== ''}
                    helperText={addressError}
                    onChange={(event) => validateAddress(event.target.value)}
                  />
                </FormControl>
              </Stack>
            )}
            <Stack direction="column" alignItems="center" sx={{ my: 2 }}>
              <Typography textAlign="center">
                Do you want to rename the degen for your rental?
              </Typography>
              <RadioGroup
                row
                onChange={handleChangeRenameDegen}
                value={renameEnabled ? 'yes' : 'no'}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
              {renameEnabled && (
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter a degen name"
                    name="degen_name"
                    variant="outlined"
                    fullWidth
                    value={newDegenName}
                    error={nameError !== ''}
                    helperText={nameError}
                    onChange={(event) => validateName(event.target.value)}
                  />
                </FormControl>
              )}
            </Stack>
            {renameEnabled && (
              <Stack
                direction="column"
                alignItems="center"
                gap={1}
                sx={{ my: 2 }}
              >
                <Typography color="gray">
                  There is a {renameFee} NFTL fee for renaming
                </Typography>
              </Stack>
            )}
          </>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Stack sx={{ justifyContent: 'space-between', height: '100%' }} gap={2}>
          <Stack sx={{ flex: 1 }}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h2">Rental Overview</Typography>
            </Box>
            <Stack gap={1} sx={{ flex: 1, my: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Degen Being Rented</Typography>
                <Typography color="gray">
                  {degen?.name || 'No Name DEGEN'}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="flex-end">
                <Typography color="gray">Degen #{degen?.id}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Rental Term</Typography>
                <Typography color="gray">1 week</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Sponsorship?</Typography>
                <Typography color="gray">
                  {rentFor === 'recruit' ? 'Yes' : 'No'}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Total Multipliers</Typography>
                <Typography color="gray">{degen?.multiplier}x</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Rental Queue</Typography>
                <Typography color="gray">{degen?.rental_count}</Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack gap={1} sx={{ flex: 1, my: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>First Week Rental Cost:</Typography>
                <Typography color="gray">{degenPrice} NFTL</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Renews Daily After Week 1 at:</Typography>
                <Typography color="gray">{degen?.price_daily} NFTL</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Rental Passes Remaining</Typography>
                <Typography color="gray">{rentalPassCount}</Typography>
              </Stack>
              {isShowRentalPassOption() && (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="caption" color="gray">
                    Use a rental pass?
                  </Typography>
                  <RadioGroup
                    row
                    onChange={handleChangeUseRentalPass}
                    value={isUseRentalPass ? 'yes' : 'no'}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Stack>
              )}

              {renameEnabled && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Renaming Fee</Typography>
                  <Typography color="gray">{renameFee} NFTL</Typography>
                </Stack>
              )}
              <Stack direction="row" justifyContent="space-between">
                <Typography>Total Due Now</Typography>
                <Typography color="gray">{`${
                  renameEnabled ? degenPrice + renameFee : degenPrice
                } NFTL`}</Typography>
              </Stack>
            </Stack>
            <Divider />
            <FormControl sx={{ mt: 1 }}>
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
                      variant="body2"
                      onClick={openTOSDialog}
                    >
                      terms &amp; conditions
                    </Link>
                    regarding rentals
                  </Typography>
                }
                control={
                  <Checkbox
                    checked={agreement}
                    onChange={handleAgreementChange}
                  />
                }
              />
            </FormControl>
            <TermsOfServiceDialog
              open={openTOS}
              onClose={handleTOSDialogClose}
            />
          </Stack>
          <Stack direction="column" gap={1} width="100%">
            <LoadingButton
              variant="contained"
              fullWidth
              onClick={precheckRent}
              disabled={
                !agreement ||
                Boolean(nameError) ||
                Boolean(addressError) ||
                (rentFor === 'recruit' && !ethAddress) ||
                rentDisabled
              }
              loading={loading}
            >
              Rent Degen
            </LoadingButton>
            <Button fullWidth onClick={onClose} disabled={loading}>
              Close
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default RentDegenContentDialog;
