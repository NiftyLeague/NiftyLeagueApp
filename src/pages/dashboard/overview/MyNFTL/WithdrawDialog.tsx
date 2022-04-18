import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  Link,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import * as yup from 'yup';

interface WithdrawDialogProps {
  onWithdrawEarnings?: (b: number) => void;
  isOpen: boolean;
  onClose?: () => void;
  balance: number;
}

interface IFormInput {
  amountSelected: number;
  amountInput: string;
  isCheckedTerm: boolean;
}

const amountSelects: number[] = [25, 50, 75, 100];

const validationSchema = yup.object({
  isCheckedTerm: yup.bool().oneOf([true]),
});

const WithdrawDialog = ({
  onWithdrawEarnings,
  isOpen,
  onClose,
  balance,
}: WithdrawDialogProps): JSX.Element => {
  const [balanceWithdraw, setBalanceWithdraw] = useState(0);
  const {
    handleSubmit,
    control,
    resetField,
    getValues,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      amountSelected: 0,
      amountInput: '',
      isCheckedTerm: false,
    },
  });
  const theme = useTheme();

  const resetForm = () => {
    onClose?.();
    reset();
    setBalanceWithdraw(0);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (balanceWithdraw === 0) {
      setError('amountInput', {
        type: 'custom',
        message: 'Please enter the amount you like to withdraw.',
      });
      return;
    }
    onWithdrawEarnings?.(balanceWithdraw);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
  };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        Withdraw Game & Rental Earnings
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ borderBottom: 'none', textAlign: 'center' }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack alignItems="center" gap={2}>
            <Typography variant="h4">Game & Rental Balance</Typography>
            <Typography variant="h2" sx={{ opacity: 0.7 }}>
              {balance.toLocaleString('en-US')}
              <Typography variant="body1">Available to Claim</Typography>
            </Typography>
            <Typography variant="h4">
              How much would you like to widthdraw?
            </Typography>
            <Controller
              name="amountSelected"
              control={control}
              render={({ field }) => (
                <ToggleButtonGroup
                  {...field}
                  size="large"
                  exclusive
                  color="primary"
                  onChange={(e, value) => {
                    clearErrors();
                    if (getValues('amountInput') !== '') {
                      resetField('amountInput');
                    }
                    field.onChange(value);
                    setBalanceWithdraw(value * (balance / 100));
                  }}
                  sx={{
                    bgcolor: theme.palette.secondary.light,
                  }}
                >
                  {amountSelects.map((amount) => (
                    <ToggleButton
                      key={amount}
                      value={amount}
                      sx={{
                        [theme.breakpoints.up('sm')]: {
                          px: 4,
                          py: 1,
                        },
                      }}
                    >
                      {amount !== 100 ? `${amount}%` : 'ALL'}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )}
            />

            <Typography variant="h4">or enter amount manually</Typography>

            <Box sx={{ width: '100%', '&>div': { width: '80%' } }}>
              <Controller
                name="amountInput"
                control={control}
                render={({ field }) => (
                  <NumberFormat
                    {...field}
                    isAllowed={({ value }) => Number(value) <= Number(balance)}
                    label="Amount of NFTL to withdraw"
                    thousandSeparator
                    customInput={TextField}
                    onValueChange={(e) => {
                      clearErrors();
                      if (getValues('amountSelected') !== 0) {
                        resetField('amountSelected');
                      }
                      field.onChange(e.value);
                      setBalanceWithdraw(Number(e.value));
                    }}
                  />
                )}
              />
            </Box>
            <Typography sx={{ display: 'inline-flex' }} variant="h4">
              You are withdrawing
              <Typography
                sx={{ mx: '4px', fontWeight: 600, fontSize: 16, opacity: 0.7 }}
                variant="body1"
              >
                {balanceWithdraw.toLocaleString('en-US')}
              </Typography>
              NFTL
            </Typography>
            <Controller
              name="isCheckedTerm"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    sx={{ m: 0, justifyContent: 'center' }}
                    control={
                      <Checkbox
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    }
                    label={
                      <Typography
                        textAlign="left"
                        variant="body1"
                        sx={{ opacity: 0.7 }}
                      >
                        I have read the
                        <Link
                          color="inherit"
                          sx={{ mx: '4px' }}
                          variant="body1"
                          href="#"
                        >
                          terms & conditions
                        </Link>
                        regarding withdrawing earnings.
                      </Typography>
                    }
                  />
                </FormGroup>
              )}
            />
            {errors.amountInput && (
              <Alert severity="error">{errors.amountInput.message}</Alert>
            )}
            <Button
              size="large"
              type="submit"
              variant="contained"
              fullWidth
              disabled={!getValues('isCheckedTerm') || balanceWithdraw === 0}
            >
              Withdraw earnings
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawDialog;