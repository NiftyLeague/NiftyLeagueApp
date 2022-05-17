// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  Stack,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { providers } from 'ethers';
import { useState, useContext, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { DialogContext } from 'components/dialog';
import { formatNumberToDisplay } from 'utils/numbers';
import useWithdrawalHistory from 'hooks/useWithdrawalHistory';
import useFetch from 'hooks/useFetch';
import { WithdrawalHistory } from 'types/account';
import { WITHDRAW_NFTL_AVAILABILITY } from 'constants/url';
import { formatDateTime } from 'helpers/dateTime';

const useWithdrawalDisabled = (history: WithdrawalHistory[]) => {
  const [withdrawDisabled, setWithdrawDisabled] = useState(false);
  const [availableIn, setAvailableIn] = useState(0);
  const [availableAt, setAvailableAt] = useState<number | undefined>();
  const authToken = window.localStorage.getItem('authentication-token');
  let headers;
  if (authToken) headers = { authorizationToken: authToken };
  const { loading, data } = useFetch<{
    is_available: boolean;
    available_in: number;
    available_at?: number;
  }>(WITHDRAW_NFTL_AVAILABILITY, {
    headers,
  });

  useEffect(() => {
    if (!loading && data) {
      setWithdrawDisabled(!data?.is_available);
      setAvailableIn(data.available_in);
      setAvailableAt(data.available_at);
    }
  }, [loading, data]);

  return { withdrawDisabled, availableIn, availableAt };
};

interface WithdrawFormProps {
  onWithdrawEarnings: (
    amount: number,
  ) => Promise<{ txRes: providers.TransactionResponse | null; error?: Error }>;
  balance: number;
}

interface IFormInput {
  amountSelected: number;
  amountInput: string;
  isCheckedTerm: boolean;
}

const amountSelects: number[] = [25, 50, 75, 100];

// const validationSchema = yup.object({
//   isCheckedTerm: yup.bool().oneOf([true]),
// });

const WithdrawForm = ({
  onWithdrawEarnings,
  balance,
}: WithdrawFormProps): JSX.Element => {
  const [balanceWithdraw, setBalanceWithdraw] = useState(0);
  const [, setIsOpen] = useContext(DialogContext);
  const [loading, setLoading] = useState(false);
  const { withdrawalHistory } = useWithdrawalHistory('pending');
  const { withdrawDisabled, availableAt } =
    useWithdrawalDisabled(withdrawalHistory);
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
    // resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      amountSelected: 0,
      amountInput: '',
      // isCheckedTerm: false,
    },
  });
  const theme = useTheme();

  const resetForm = () => {
    setLoading(false);
    reset();
    setBalanceWithdraw(0);
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (balanceWithdraw === 0) {
      setError('amountInput', {
        type: 'custom',
        message: 'Please enter the amount you like to withdraw.',
      });
      return;
    }
    setLoading(true);
    const { error } = await onWithdrawEarnings(balanceWithdraw);
    if (error?.message) {
      setError('amountInput', {
        type: 'custom',
        message: error.message.replaceAll('"', ''),
      });
      setLoading(false);
      return;
    }
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems="center" gap={2}>
        <Typography variant="h4">Game &amp; Rental Balance</Typography>
        <Typography variant="h2" sx={{ opacity: 0.7 }}>
          {formatNumberToDisplay(balance)}
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
                allowNegative={false}
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
            {formatNumberToDisplay(balanceWithdraw)}
          </Typography>
          NFTL
        </Typography>
        {/* <Controller
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
                      terms &amp; conditions
                    </Link>
                    regarding withdrawing earnings.
                  </Typography>
                }
              />
            </FormGroup>
          )}
        /> */}
        {errors.amountInput && (
          <Alert severity="error">{errors.amountInput.message}</Alert>
        )}
        {withdrawDisabled && availableAt ? (
          <Alert severity="error">
            Next withdrawal for your account is available after{' '}
            {formatDateTime(availableAt)}
          </Alert>
        ) : (
          <Alert severity="info">
            Only 1 withdrawal per week is allowed at this time
          </Alert>
        )}
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          fullWidth
          loading={loading}
          disabled={
            // !getValues('isCheckedTerm') ||
            balanceWithdraw === 0 || withdrawDisabled
          }
        >
          Withdraw earnings
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default WithdrawForm;
