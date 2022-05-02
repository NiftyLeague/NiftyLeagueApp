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
  Typography,
} from '@mui/material';
import useRentalPassCount from 'hooks/useRentalPassCount';
import useRentalRenameFee from 'hooks/useRentalRenameFee';
import { useCallback, useState } from 'react';
import { Degen } from 'types/degens';
import { getErrorForName } from 'utils/name';
import { ethers } from 'ethers';
import useRent from 'hooks/useRent';
import useRentalRename from 'hooks/useRentalRename';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import DegenImage from 'components/cards/DegenCard/DegenImage';

export interface RentDegenContentDialogProps {
  degen?: Degen;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RentDegenContentDialog = ({
  degen,
  onClose,
}: RentDegenContentDialogProps) => {
  const [agreement, setAgreement] = useState<boolean>(false);
  const [rentFor, setRentFor] = useState<string>('scholar');
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
        toast.success('Rent successfully!');
        onClose?.(event);
      } catch (err: any) {
        setLoading(false);
        toast.error(err.message);
      }
    },
    [newDegenName, onClose, renameEnabled, rent, degen?.id],
  );

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} sx={{ py: 1, px: 2 }}>
        <Stack direction="row" justifyContent="center">
          {degen && <DegenImage tokenId={degen.id} />}
        </Stack>
        <Stack direction="column" alignItems="center" gap={1} sx={{ my: 2 }}>
          <Typography color="gray">
            Owned by {degen?.owner?.substring(0, 5)}
          </Typography>
        </Stack>
        <Stack direction="column" alignItems="center" sx={{ my: 2 }}>
          <Typography>What are you renting for?</Typography>
          <RadioGroup row onChange={handleChangeRentingFor} value={rentFor}>
            <FormControlLabel
              value="scholar"
              control={<Radio />}
              label="Scholar"
            />
            <FormControlLabel
              value="myself"
              control={<Radio />}
              label="Myself"
            />
          </RadioGroup>
        </Stack>
        <Stack direction="column" alignItems="center" gap={2} sx={{ my: 2 }}>
          <Typography>What is your scholars ETH wallet address?</Typography>
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
        <Stack direction="column" alignItems="center" sx={{ my: 2 }}>
          <Typography>Do you want to rename the degen?</Typography>
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
          <Stack direction="column" alignItems="center" gap={1} sx={{ my: 2 }}>
            <Typography color="gray">
              There is a {renameFee} NFTL fee for renaming
            </Typography>
          </Stack>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{ py: 1, px: 2, position: 'relative' }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2">Rental Overview</Typography>
        </Box>
        <Stack gap={1} sx={{ my: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Degen Being Rented</Typography>
            <Typography color="gray">
              {degen?.name || 'No Name Degen'}
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
            <Typography>Scholarship?</Typography>
            <Typography color="gray">
              {rentFor === 'scholar' ? 'Yes' : 'No'}
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
        <Stack gap={1} sx={{ my: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>First Week Rental Cost:</Typography>
            <Typography color="gray">{degen?.price} NFTL</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Renews Daily After Week 1 at:</Typography>
            <Typography color="gray">{degen?.price_daily} NFTL</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Rental Passes Remaining</Typography>
            <Typography color="gray">{rentalPassCount}</Typography>
          </Stack>
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
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Renaming Fee</Typography>
            <Typography color="gray">{renameFee} NFTL</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Total Due Now</Typography>
            <Typography color="gray">{`${
              degen?.price || 0 + (renameEnabled ? renameFee : 0)
            } NFTL`}</Typography>
          </Stack>
        </Stack>
        <Divider />
        <FormControl sx={{ mt: 1 }}>
          <FormControlLabel
            label={
              <Typography variant="caption">
                I have read the <Link href="#">terms & conditions</Link>{' '}
                regarding disabling a rental
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
        <Stack direction="column" gap={1} width="100%" sx={{ mt: 2 }}>
          <LoadingButton
            variant="contained"
            fullWidth
            onClick={handleRent}
            disabled={!agreement || Boolean(nameError) || Boolean(addressError)}
            loading={loading}
          >
            Rent Degen
          </LoadingButton>
          <Button fullWidth onClick={onClose} disabled={loading}>
            Close
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default RentDegenContentDialog;