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
import DegenContainer from './DegenContainer';
import ContentWithTwoLabels from './ContentWithTwoLabels';
import FormControlDegen from './FormControlDegen';

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
  let containerGap: number = rentFor || renameEnabled ? 2.5 : 4;
  if (isDialog) {
    containerGap = rentFor || renameEnabled ? 7 : 9;
  }
  return (
    <DegenContainer isDialog={isDialog}>
      <HeaderDegen
        degen={degen}
        isDialog={isDialog}
        onBack={onBack}
        onFullScreen={onFullScreen}
        onClose={onClose}
      />
      <Stack gap={containerGap} flex="1" justifyContent="space-between">
        <ContentWithTwoLabels firstText="Rental Term" secondText="1 Week" />
        <ContentWithTwoLabels
          firstText="Week 1 Fee"
          secondText={`${degenPrice} NFTL`}
        />
        <ContentWithTwoLabels
          firstText="Daily Fee After Week 1"
          secondText={`${degen?.price_daily} NFTL`}
        />
        <ContentWithTwoLabels
          firstText="O/S/R Game Earning Splits"
          secondText="10%/50%/40%"
        />
        <Stack gap={1}>
          <ContentWithTwoLabels
            firstText="Sponsorship"
            secondText={
              <Stack gap={2} flexDirection="row" alignItems="center">
                <Typography
                  variant={isDialog ? 'formTextMedium' : 'formTextSmall'}
                >
                  {rentFor ? 'Yes' : 'No'}
                </Typography>
                <IOSSwitch
                  size={isDialog ? 'medium' : 'small'}
                  checked={Boolean(rentFor)}
                  onChange={handleChangeRentingFor}
                  inputProps={{ 'aria-label': 'controlled-direction' }}
                />
              </Stack>
            }
          />
          {rentFor && (
            <FormControlDegen>
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
            </FormControlDegen>
          )}
        </Stack>
        <Stack gap={1}>
          <ContentWithTwoLabels
            firstText="Rename Rental"
            secondText={
              <Stack gap={2} flexDirection="row" alignItems="center">
                <Typography
                  variant={isDialog ? 'formTextMedium' : 'formTextSmall'}
                >
                  {renameEnabled ? 'Yes' : 'No'}
                </Typography>
                <IOSSwitch
                  size={isDialog ? 'medium' : 'small'}
                  checked={Boolean(renameEnabled)}
                  onChange={handleChangeRenameDegen}
                  inputProps={{ 'aria-label': 'controlled-direction' }}
                />
              </Stack>
            }
          />
          {renameEnabled && (
            <FormControlDegen>
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
            </FormControlDegen>
          )}
        </Stack>
        <ContentWithTwoLabels
          firstText="Rental Pass"
          secondText={
            <Stack gap={2} flexDirection="row" alignItems="center">
              <Typography
                variant={isDialog ? 'formTextMedium' : 'formTextSmall'}
              >
                {isUseRentalPass ? `Yes / ${rentalPassCount} Remaining` : 'No'}
              </Typography>
              <IOSSwitch
                checked={Boolean(isUseRentalPass)}
                onChange={handleChangeUseRentalPass}
                inputProps={{ 'aria-label': 'controlled-direction' }}
              />
            </Stack>
          }
        />
        <ContentWithTwoLabels
          firstText="Total Due Now"
          secondText={`${`${
            renameEnabled ? degenPrice + renameFee : degenPrice
          } NFTL`}`}
        />
        <FormControl>
          <FormControlLabel
            label={
              <Typography
                variant={
                  isDialog ? 'termsConditionMedium' : 'termsConditionSmall'
                }
              >
                I accept and understand the above terms, conditions, and
                information.
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
    </DegenContainer>
  );
};

export default DegenRent;
