import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  Typography,
  useTheme,
  Input,
  FormHelperText,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { NetworkContext } from 'NetworkProvider';

import useRentalPassCount from 'hooks/useRentalPassCount';
import useRentalRenameFee from 'hooks/useRentalRenameFee';
import useRent from 'hooks/useRent';
import useRentalRename from 'hooks/useRentalRename';

import { Degen } from 'types/degens';
import { getErrorForName } from 'utils/name';
import { sendEvent } from 'utils/google-analytics';

import HeaderDegen from './HeaderDegen';
import IOSSwitch from 'components/extended/IOSSwitch';

export interface DegenRentProps {
  degen?: Degen;
  isDialog?: boolean;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  onBack?: React.MouseEventHandler<HTMLDivElement>;
  onFullScreen?: React.MouseEventHandler<HTMLDivElement>;
}

const DegenRent = ({
  degen,
  isDialog,
  onClose,
  onBack,
  onFullScreen,
}: DegenRentProps) => {
  const { web3Modal } = useContext(NetworkContext);
  const [agreement, setAgreement] = useState<boolean>(false);
  const [rentFor, setRentFor] = useState<boolean>(false);
  const [isUseRentalPass, setIsUseRentalPass] = useState<boolean>(false);
  const [renameEnabled, setRenameEnabled] = useState<boolean>(false);
  const [ethAddress, setEthAddress] = useState<string>('');
  const [newDegenName, setNewDegenName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [addressError, setAddressError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { palette } = useTheme();

  const [, , rentalPassCount] = useRentalPassCount(degen?.id);
  const [, , renameFee = 1000] = useRentalRenameFee(degen?.id);
  const rent = useRent(
    degen?.id,
    degen?.rental_count || 0,
    degen?.price,
    ethAddress,
    isUseRentalPass,
  );

  const handleChangeRentingFor = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: boolean,
  ) => {
    setRentFor(value);
    setAddressError('');
    setEthAddress('');
  };

  const handleChangeRenameDegen = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: boolean,
  ) => {
    setRenameEnabled(value);
    setNewDegenName('');
    setNameError('');
  };

  const handleChangeUseRentalPass = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: boolean,
  ) => {
    setIsUseRentalPass(value);
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

      sendEvent('begin_checkout', 'ecommerce');

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
        onClose?.(event as any);

        sendEvent('purchase', 'ecommerce');
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
      if (rentFor && !ethAddress) {
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
  // const isShowRentalPassOption = rentalPassCount > 0 && !degen?.rental_count;
  const isButtonDisabled =
    !agreement ||
    Boolean(nameError) ||
    Boolean(addressError) ||
    (rentFor && !ethAddress);

  useEffect(() => {
    sendEvent('add_to_cart', 'ecommerce');
  }, []);

  // TODO: @Brian double check requirements. Errors should not popup everytime someone opens the rental dialog.
  // If this feedback below is required we should disable the radio buttons and show these messages on tooltip
  //
  // useEffect(() => {
  //   if (!isShowRentalPassOption() && !rentalPassCountloading) {
  //     if (rentalPassCount > 0)
  //       toast.error(
  //         "Rental passes can't be added to Degens with an active rental",
  //         { theme: 'dark' },
  //       );
  //     else
  //       toast.error(
  //         "You can't use rental pass option because you have no remaining rental pass",
  //         { theme: 'dark' },
  //       );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [rentalPassCount, rentalPassCountloading]);

  return (
    <Stack gap={3} sx={{ p: '12px', background: palette.background.paper }}>
      <HeaderDegen
        degen={degen}
        isDialog={isDialog}
        onBack={onBack}
        onFullScreen={onFullScreen}
        onClose={onClose}
      />
      <Stack gap={4}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="paragraphXXSmall" fontWeight="500">
            Rental Term
          </Typography>
          <Typography variant="paragraphXXSmall">1 Week</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="paragraphXXSmall" fontWeight="500">
            Week 1 Fee
          </Typography>
          <Typography variant="paragraphXXSmall">{degenPrice}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="paragraphXXSmall" fontWeight="500">
            Daily Fee After Week 1
          </Typography>
          <Typography variant="paragraphXXSmall">
            {degen?.price_daily} NFTL
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="paragraphXXSmall" fontWeight="500">
            O/S/R Game Earning Splits
          </Typography>
          <Typography variant="paragraphXXSmall">10%/50%/40%</Typography>
        </Stack>
        <Stack gap={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="paragraphXXSmall" fontWeight="500">
              Sponsorship
            </Typography>
            <Stack gap={2} flexDirection="row" alignItems="center">
              <Typography variant="labelIOSSwitch">
                {rentFor ? 'Yes' : 'No'}
              </Typography>
              <IOSSwitch
                checked={Boolean(rentFor)}
                onChange={handleChangeRentingFor}
                inputProps={{ 'aria-label': 'controlled-direction' }}
              />
            </Stack>
          </Stack>
          {rentFor && (
            <FormControl>
              <Input
                name="address"
                placeholder="Enter recruits ETH wallet address here..."
                value={ethAddress}
                error={addressError !== ''}
                onChange={(event) => validateAddress(event.target.value)}
                aria-describedby="helper-address"
              />
              <FormHelperText
                sx={{ color: palette.error.main }}
                id="helper-address"
              >
                {addressError}
              </FormHelperText>
            </FormControl>
          )}
        </Stack>
        <Stack gap={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="paragraphXXSmall" fontWeight="500">
              Rename Rental
            </Typography>
            <Stack gap={2} flexDirection="row" alignItems="center">
              <Typography variant="labelIOSSwitch">
                {renameEnabled ? 'Yes' : 'No'}
              </Typography>
              <IOSSwitch
                checked={Boolean(renameEnabled)}
                onChange={handleChangeRenameDegen}
                inputProps={{ 'aria-label': 'controlled-direction' }}
              />
            </Stack>
          </Stack>
          {renameEnabled && (
            <FormControl>
              <Input
                name="degen_name"
                placeholder="Enter the DEGEN name you’d like here..."
                value={newDegenName}
                error={nameError !== ''}
                onChange={(event) => validateName(event.target.value)}
                aria-describedby="helper-rename"
              />
              <FormHelperText
                sx={{ color: palette.error.main }}
                id="helper-rename"
              >
                {nameError}
              </FormHelperText>
            </FormControl>
          )}
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="paragraphXXSmall" fontWeight="500">
            Rental Pass
          </Typography>
          <Stack gap={2} flexDirection="row" alignItems="center">
            <Typography variant="labelIOSSwitch">
              {isUseRentalPass ? `Yes / ${rentalPassCount} Remaining` : 'No'}
            </Typography>
            <IOSSwitch
              checked={Boolean(isUseRentalPass)}
              onChange={handleChangeUseRentalPass}
              inputProps={{ 'aria-label': 'controlled-direction' }}
            />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="paragraphXXSmall" fontWeight="500">
            Total Due Now
          </Typography>
          <Typography variant="paragraphXXSmall">{`${
            renameEnabled ? degenPrice + renameFee : degenPrice
          } NFTL`}</Typography>
        </Stack>
        <FormControl>
          <FormControlLabel
            label={
              <Typography variant="termsCondition">
                I understand all the information regarding this rental and its
                fees.
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
      </Stack>
      <LoadingButton
        variant="contained"
        fullWidth
        onClick={precheckRent}
        disabled={isButtonDisabled}
        loading={loading}
      >
        {isButtonDisabled ? 'Accept Terms to Continue' : 'Confirm'}
      </LoadingButton>
    </Stack>
  );
};

export default DegenRent;
