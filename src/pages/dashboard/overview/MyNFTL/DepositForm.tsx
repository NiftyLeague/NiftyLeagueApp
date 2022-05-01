import {
  Alert,
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  Stack,
} from '@mui/material';
import { useState, useContext } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { DialogContext } from 'components/dialog';

interface DepositFormProps {
  onDeposit: (amount: number) => Promise<void>;
  balance: number;
}

interface IFormInput {
  amountSelected: number;
  amountInput: string;
}

const amountSelects: number[] = [25, 50, 75, 100];

const DepositForm = ({ onDeposit, balance }: DepositFormProps): JSX.Element => {
  const [balanceDeposit, setBalanceDeposit] = useState(0);
  const [, setIsOpen] = useContext(DialogContext);
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
    mode: 'onChange',
    defaultValues: {
      amountSelected: 0,
      amountInput: '',
    },
  });
  const theme = useTheme();

  const resetForm = () => {
    reset();
    setBalanceDeposit(0);
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (balanceDeposit === 0) {
      setError('amountInput', {
        type: 'custom',
        message: 'Please enter the amount you like to deposit.',
      });
      return;
    }
    await onDeposit(balanceDeposit);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems="center" gap={2}>
        <Typography variant="h4">NFTL in Wallet</Typography>
        <Typography variant="h2" sx={{ opacity: 0.7 }}>
          {balance.toLocaleString('en-US')}
          <Typography variant="body1">Available to Deposit</Typography>
        </Typography>
        <Typography variant="h4">
          How much would you like to deposit?
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
                setBalanceDeposit(value * (balance / 100));
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
                  setBalanceDeposit(Number(e.value));
                }}
              />
            )}
          />
        </Box>
        <Typography sx={{ display: 'inline-flex' }} variant="h4">
          You are depositing
          <Typography
            sx={{ mx: '4px', fontWeight: 600, fontSize: 16, opacity: 0.7 }}
            variant="body1"
          >
            {balanceDeposit.toLocaleString('en-US')}
          </Typography>
          NFTL
        </Typography>
        {errors.amountInput && (
          <Alert severity="error">{errors.amountInput.message}</Alert>
        )}
        <Button
          size="large"
          type="submit"
          variant="contained"
          fullWidth
          disabled={balanceDeposit === 0}
        >
          Deposit NFTL
        </Button>
      </Stack>
    </form>
  );
};

export default DepositForm;
