'use client';

/* eslint-disable no-nested-ternary */
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import NetworkContext from '@/contexts/NetworkContext';
import { parseEther } from 'ethers6';
import { NFTL_CONTRACT, NFTL_RAFFLE_CONTRACT } from '@/constants/contracts';
import { submitTxWithGasEstimate } from '@/utils/Notifier';
import { DEBUG } from '@/constants/index';
import TicketStepper from './TicketStepper';
import BalanceContext from '@/contexts/BalanceContext';

interface Props {
  onSuccess: (amount: number) => void;
}

const TicketDialogContext = ({ onSuccess }: Props): JSX.Element => {
  const { address, tx, writeContracts } = useContext(NetworkContext);
  const { userNFTLBalance } = useContext(BalanceContext);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [allowance, setAllowance] = useState<bigint>(0n);
  const [isProcessingPurchase, setProcessingPurchase] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const insufficientAllowance = allowance < 1000n;
  const insufficientBalance = userNFTLBalance < 1000;

  useEffect(() => {
    setPurchaseSuccess(false);
    if (insufficientBalance) {
      setError('Insignificant NFTL balance in wallet');
    } else {
      setError('');
    }
  }, [insufficientBalance]);

  useEffect(() => {
    const getAllowance = async () => {
      const raffleContract = writeContracts[NFTL_RAFFLE_CONTRACT];
      const nftl = writeContracts[NFTL_CONTRACT];
      const raffleAddress = await raffleContract.getAddress();
      const allowanceBN = (await nftl.allowance(
        address,
        raffleAddress,
      )) as bigint;
      setAllowance(allowanceBN);
    };
    if (
      writeContracts &&
      writeContracts[NFTL_CONTRACT] &&
      writeContracts[NFTL_RAFFLE_CONTRACT]
    )
      void getAllowance();
  }, [address, writeContracts]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInput(value);
  };

  const handlePurchase = useCallback(async () => {
    setProcessingPurchase(true);
    if (
      !error &&
      writeContracts &&
      writeContracts[NFTL_RAFFLE_CONTRACT] &&
      writeContracts[NFTL_CONTRACT]
    ) {
      const raffleContract = writeContracts[NFTL_RAFFLE_CONTRACT];
      const nftl = writeContracts[NFTL_CONTRACT];
      if (insufficientAllowance) {
        // eslint-disable-next-line no-console
        if (DEBUG) console.log('Current allowance too low');
        await tx(
          nftl.increaseAllowance(
            raffleContract.address,
            parseEther('10000000'),
          ),
        );
        setAllowance(10000000n);
      }
      const args = [parseEther(input)];
      const result = await submitTxWithGasEstimate(
        tx,
        raffleContract,
        'deposit',
        args,
      );
      if (result) {
        setPurchaseSuccess(true);
        setProcessingPurchase(false);
        onSuccess(Number(input));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, onSuccess, input, insufficientAllowance, tx, writeContracts]);

  return (
    <>
      <DialogTitle sx={{ textAlign: 'center' }}>
        Purchase Mega Raffle Tickets
      </DialogTitle>
      <DialogContent dividers sx={{ maxWidth: '820px' }}>
        <Stack rowGap={2} textAlign="center" alignItems="center">
          <TextField
            variant="outlined"
            sx={{
              width: '200px',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">NFTL</InputAdornment>
              ),
              inputProps: {
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 1000,
                max: userNFTLBalance,
                style: {
                  textAlign: 'center',
                },
              },
            }}
            value={input}
            error={!!error}
            helperText={error}
            onChange={handleChange}
          />
          <TicketStepper
            insufficientAllowance={insufficientAllowance}
            purchaseSuccess={purchaseSuccess}
            insufficientBalance={insufficientBalance}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4">1 Ticket Cost</Typography>
          <Typography>1,000 NFTL</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          onClick={handlePurchase}
          disabled={!input || Boolean(error) || isProcessingPurchase}
        >
          Purchase
        </Button>
      </DialogActions>
    </>
  );
};

const TicketDialog = ({ refreshTicketBalance }): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const { writeContracts } = useContext(NetworkContext);
  const { userNFTLBalance, refreshNFTLBalance } = useContext(BalanceContext);

  const handleSuccess = useCallback(
    async (amount) => {
      setOpen(false);
      refreshNFTLBalance();
      refreshTicketBalance(amount);
    },
    [refreshNFTLBalance, refreshTicketBalance],
  );

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        disabled={!(userNFTLBalance > 0.0 && writeContracts[NFTL_CONTRACT])}
        onClick={() => setOpen(true)}
      >
        Buy Tickets
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <TicketDialogContext onSuccess={handleSuccess} />
      </Dialog>
    </>
  );
};

export default TicketDialog;
