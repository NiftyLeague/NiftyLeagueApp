/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Stack,
  Typography,
  IconButton,
  Link,
  FormGroup,
} from '@mui/material';
import useRentalPassCount from 'hooks/useRentalPassCount';
import useRentalRenameFee from 'hooks/useRentalRenameFee';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Degen } from 'types/degens';
import { getErrorForName } from 'utils/name';
import { ethers } from 'ethers';
import useRent from 'hooks/useRent';
import useRentalRename from 'hooks/useRentalRename';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import DegenImage from 'components/cards/DegenCard/DegenImage';
import { NetworkContext } from 'NetworkProvider';
import { sendEvent } from 'utils/google-analytics';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import IOSSwitch from 'components/extended/IOSSwitch';

export interface RentDegenDialogV3Props {
  degen?: Degen;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RentDegenDialogV3 = ({ degen, onClose }: RentDegenDialogV3Props) => {
  const { web3Modal } = useContext(NetworkContext);
  const [agreement, setAgreement] = useState<boolean>(false);
  const [rentFor, setRentFor] = useState<string>('recruit');
  const [renameEnabled, setRenameEnabled] = useState<boolean>(false);
  const [ethAddress, setEthAddress] = useState<string>('');
  const [newDegenName, setNewDegenName] = useState<string>('');
  const [isUseRentalPass, setIsUseRentalPass] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>('');
  const [addressError, setAddressError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
        onClose?.(event);

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
    sendEvent('add_to_cart', 'ecommerce');
  }, []);
  return (
    <Stack gap={3} sx={{ p: '12px', background: '#FAFAFA' }}>
      {/* Header */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap={3}
      >
        <IconButton
          color="inherit"
          aria-label="Back"
          component="div"
          sx={{ p: 0 }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Stack
          flexDirection="row"
          alignContent="flex-start"
          alignItems="center"
          flex={1}
          gap={2}
          sx={{
            '& img': {
              height: '24px',
              width: '24px',
            },
          }}
        >
          {degen?.id && <DegenImage tokenId={degen?.id} />}
          <Typography variant="paragraphP2XXXSmall">
            {degen?.name || 'No Name Degen'}
          </Typography>
        </Stack>
        <Link
          href={
            degen?.id
              ? `https://opensea.io/assets/0x986aea67c7d6a15036e18678065eb663fc5be883/${degen?.id}`
              : '#'
          }
          target="_blank"
          rel="nofollow"
          variant="paragraphXXSmall"
        >
          {`#${degen?.id}`}
        </Link>
        <IconButton
          color="inherit"
          aria-label="Fullscreen"
          component="div"
          sx={{ p: 0 }}
        >
          <OpenInFullIcon />
        </IconButton>
      </Stack>
      <Divider />
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
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="paragraphXXSmall" fontWeight="500">
            Sponsorship
          </Typography>
          {/* <RadioGroup row onChange={handleChangeRentingFor} value={rentFor}>
            <FormControlLabel
              value="recruit"
              control={<Radio />}
              label="Recruit"
            />
            <FormControlLabel
              value="myself"
              control={<Radio />}
              label="Myself"
            />
          </RadioGroup> */}
          <Stack gap={2} flexDirection="row" justifyItems="center">
            <Typography variant="paragraphXXXSmall">No</Typography>
            <IOSSwitch
              // checked={Boolean(rentFor)}
              // onChange={handleChangeRentingFor}
              inputProps={{ 'aria-label': 'controlled-direction' }}
            />
          </Stack>
          {/* Inpout */}
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="paragraphXXSmall" fontWeight="500">
            Rename Rental
          </Typography>
          <FormGroup>
            <Typography variant="paragraphXXXSmall">No</Typography>
            <IOSSwitch
              // checked={Boolean(rentFor)}
              // onChange={handleChangeRentingFor}
              inputProps={{ 'aria-label': 'controlled-direction' }}
            />
          </FormGroup>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="paragraphXXSmall" fontWeight="500">
            Rental Pass
          </Typography>
          <FormGroup>
            <Typography variant="paragraphXXXSmall">No</Typography>
            <IOSSwitch
              // checked={Boolean(rentFor)}
              // onChange={handleChangeRentingFor}
              inputProps={{ 'aria-label': 'controlled-direction' }}
            />
          </FormGroup>
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
              <Typography variant="caption">
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
        disabled={
          !agreement ||
          Boolean(nameError) ||
          Boolean(addressError) ||
          (rentFor === 'recruit' && !ethAddress)
        }
        loading={loading}
      >
        Rent Degen
      </LoadingButton>
    </Stack>
  );
};

export default RentDegenDialogV3;
