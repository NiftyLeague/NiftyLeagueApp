import { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  Stack,
  Typography,
  TextField,
  DialogActions,
} from '@mui/material';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RentalDataGrid } from 'types/rentalDataGrid';
import DegenImage from 'components/cards/DegenCard/DegenImage';

interface Props {
  rental: RentalDataGrid;
  updateNickname: (name: string, id: string) => void;
}
interface IFormInput {
  name: string;
  isCheckedTerm: boolean;
}

const validationSchema = yup.object({
  name: yup.string().required(),
});

const ChangeNicknameDialog = ({
  rental,
  updateNickname,
}: Props): JSX.Element => {
  const authToken = window.localStorage.getItem('authentication-token');

  const [isLoadingRename, setLoadingRename] = useState(false);
  const { rentalId, degenId, renter, playerAddress } = rental;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!rentalId && !degenId && !data.name && !authToken) {
      return;
    }
    setLoadingRename(true);
    const nicknames: { [address: string]: string } = JSON.parse(
      window.localStorage.getItem('player-nicknames') || '{}',
    );
    window.localStorage.setItem(
      'player-nicknames',
      JSON.stringify({ ...nicknames, [playerAddress as string]: data.name }),
    );
    setLoadingRename(false);
    onRenameRentalSuccess(data.name);
  };

  const onRenameRentalSuccess = (newName: string) => {
    toast.success('Rename Rental Successful!', { theme: 'dark' });
    updateNickname(newName, rentalId);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle sx={{ textAlign: 'center' }}>Assign a Nickname</DialogTitle>
      <DialogContent dividers sx={{ maxWidth: '380px' }}>
        <Stack rowGap={2}>
          <Stack rowGap={1}>
            {degenId && <DegenImage tokenId={degenId} />}
            <Typography
              variant="caption"
              component="p"
              sx={{ textAlign: 'center' }}
            >
              Recruit
            </Typography>
            <Typography
              variant="caption"
              component="p"
              sx={{ textAlign: 'center' }}
            >
              {renter}
            </Typography>
          </Stack>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter nickname for recruit wallet"
                variant="outlined"
                size="small"
                fullWidth
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
                disabled={isLoadingRename}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={isLoadingRename}
          disabled={isLoadingRename}
          type="submit"
          variant="contained"
          fullWidth
          onClick={() => handleSubmit(onSubmit)}
        >
          Add Nickname
        </LoadingButton>
      </DialogActions>
    </form>
  );
};

export default ChangeNicknameDialog;
