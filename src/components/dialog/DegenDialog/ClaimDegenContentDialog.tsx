/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
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

export interface ClaimDegenContentDialogProps {
  degen?: Degen;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ClaimDegenContentDialog = ({
  degen,
  onClose,
}: ClaimDegenContentDialogProps) => {
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

  return <div>Claim</div>;
};

export default ClaimDegenContentDialog;
